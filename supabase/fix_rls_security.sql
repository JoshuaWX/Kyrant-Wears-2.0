-- ============================================================
-- Kyrant Wears 2.0 — RLS Security Fix (LIVE APPLY)
-- ============================================================
-- PURPOSE:
--   Supabase flagged that our admin RLS policies used
--   auth.jwt() -> 'user_metadata' to check for admin role.
--   user_metadata is EDITABLE by any authenticated user via
--   supabase.auth.updateUser({ data: { role: 'admin' } }),
--   which means ANY user could bypass admin checks.
--
-- WHAT THIS SCRIPT DOES:
--   1. Creates a SECURITY DEFINER function `is_admin()` that
--      reads the trusted `role` column from the profiles table
--   2. Drops the insecure admin policies
--   3. Recreates them using `is_admin()` (no recursion, no spoofing)
--   4. Adds a role-escalation protection trigger that prevents
--      non-admins from setting role = 'admin' via direct UPDATE
--
-- HOW TO RUN:
--   Supabase Dashboard → SQL Editor → paste this → Run
-- ============================================================

BEGIN;

-- ──────────────────────────────────────────────────────────────
-- 1. Create the is_admin() helper function
-- ──────────────────────────────────────────────────────────────
-- SECURITY DEFINER = runs as the DB owner, bypassing RLS.
-- This avoids the infinite recursion that occurred when admin
-- policies queried the profiles table directly.
-- STABLE = can be cached within a single transaction.

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
-- 2. Drop the insecure admin policies
-- ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;

-- ──────────────────────────────────────────────────────────────
-- 3. Recreate admin policies using is_admin()
-- ──────────────────────────────────────────────────────────────

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- ──────────────────────────────────────────────────────────────
-- 4. Role escalation protection trigger (defense-in-depth)
-- ──────────────────────────────────────────────────────────────
-- If a non-admin user tries to UPDATE their profile and set
-- role = 'admin', this trigger silently reverts the role to
-- its original value. Admins can still promote other users.

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

COMMIT;

-- ============================================================
-- VERIFICATION — Run these after to confirm everything works:
-- ============================================================
--
-- 1. Check is_admin() exists:
--    SELECT proname, prosecdef FROM pg_proc WHERE proname = 'is_admin';
--
-- 2. Check policies no longer reference user_metadata:
--    SELECT policyname, qual FROM pg_policies WHERE tablename = 'profiles';
--
-- 3. Check the escalation trigger exists:
--    SELECT tgname FROM pg_trigger WHERE tgrelid = 'public.profiles'::regclass;
-- ============================================================
