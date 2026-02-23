-- ============================================================
-- Kyrant Wears 2.0 — FINAL trigger fix + cleanup
-- ============================================================
-- Run this in Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Fix the trigger (NULL role → defaults to 'merchant')
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

-- 2. Re-wire the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 3. Clean up orphaned auth.users (no profile row) from failed attempts
-- This creates profiles for any users that are missing one
INSERT INTO profiles (id, full_name, role, avatar_url)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data ->> 'full_name', ''),
  'merchant'::user_role,
  COALESCE(u.raw_user_meta_data ->> 'avatar_url', '')
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 4. Drop the debug log table
DROP TABLE IF EXISTS public._debug_log;
