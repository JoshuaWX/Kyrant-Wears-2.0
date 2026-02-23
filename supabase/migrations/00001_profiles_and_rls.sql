-- ============================================================
-- Kyrant Wears 2.0 — Supabase Migration: Profiles + RLS
-- ============================================================
-- This migration creates the core `profiles` table linked to
-- Supabase Auth (auth.users) and sets up Row Level Security
-- policies for role-based access control.
--
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- or via the Supabase CLI: supabase db push
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. Create the user_role enum
-- ──────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('designer', 'merchant', 'admin');
  END IF;
END
$$;

-- ──────────────────────────────────────────────────────────────
-- 2. Create the profiles table
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  role        public.user_role NOT NULL DEFAULT 'merchant',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add a comment for documentation
COMMENT ON TABLE public.profiles IS 'User profiles linked 1:1 to auth.users. Stores role and display info.';
COMMENT ON COLUMN public.profiles.role IS 'User role: designer, merchant, or admin.';

-- ──────────────────────────────────────────────────────────────
-- 3. Enable Row Level Security
-- ──────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────
-- 4. SECURITY DEFINER helper — is_admin()
-- ──────────────────────────────────────────────────────────────
-- Reads the trusted `role` column from the profiles table.
-- SECURITY DEFINER means this function runs as the DB owner,
-- bypassing RLS (no infinite recursion).  The result is based
-- on the actual stored role — NOT on user_metadata, which any
-- end-user can edit via supabase.auth.updateUser().
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS
  'Returns true when the authenticated user has the admin role (based on profiles table, not JWT claims).';

-- ──────────────────────────────────────────────────────────────
-- 5. RLS Policies
-- ──────────────────────────────────────────────────────────────

-- 5a. Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 5b. Users can update their own profile.
--     Role-escalation to admin is blocked by the protect_role_escalation
--     trigger below (defense-in-depth).
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 5c. Allow INSERT only for the user's own record (used by trigger).
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5d. Admins can read ALL profiles (secure — uses is_admin())
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

-- 5e. Admins can update ANY profile (secure — uses is_admin())
CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- ──────────────────────────────────────────────────────────────
-- 6. Auto-create profile on user signup (trigger)
-- ──────────────────────────────────────────────────────────────
-- This function fires after a new auth.users row is created.
-- It reads the role from raw_user_meta_data (passed during signUp).
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _role user_role;
BEGIN
  -- Safely extract role from metadata, default to 'merchant'
  BEGIN
    _role := (NEW.raw_user_meta_data ->> 'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    _role := 'merchant';
  END;

  -- NULL check — Google OAuth has no 'role' in metadata,
  -- and NULL::user_role doesn't throw, it just returns NULL
  IF _role IS NULL THEN
    _role := 'merchant';
  END IF;

  -- Prevent 'admin' role from being set via signup
  IF _role = 'admin' THEN
    _role := 'merchant';
  END IF;

  INSERT INTO profiles (id, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    _role,
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────────────────────
-- 7. Auto-update updated_at timestamp
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ──────────────────────────────────────────────────────────────
-- 8. Create indexes for performance
-- ──────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ──────────────────────────────────────────────────────────────
-- 9. Role escalation protection (defense-in-depth)
-- ──────────────────────────────────────────────────────────────
-- Prevents non-admin users from granting themselves (or others)
-- the admin role via a direct UPDATE on the profiles table.
-- If a non-admin tries to set role = 'admin', the role column is
-- silently reverted to its previous value.
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.protect_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only intervene when someone tries to SET role = admin
  IF NEW.role = 'admin' AND OLD.role IS DISTINCT FROM 'admin' THEN
    -- Allow only if the CALLER is already an admin
    IF NOT public.is_admin() THEN
      NEW.role := OLD.role;   -- silently revert
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_role_protect ON public.profiles;
CREATE TRIGGER on_profile_role_protect
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_role_escalation();
