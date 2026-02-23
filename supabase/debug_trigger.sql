-- ============================================================
-- DIAGNOSTIC: Debug the handle_new_user trigger
-- ============================================================
-- Run this ENTIRE script in Supabase Dashboard → SQL Editor.
-- Then retry Google signup. Then run the SELECT at the bottom
-- to see the logs.
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- Step 1: Create a debug log table (visible to you in the dashboard)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public._debug_log (
  id         BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  step       TEXT,
  detail     TEXT
);

-- Allow the trigger (SECURITY DEFINER as postgres) to write to it
ALTER TABLE public._debug_log DISABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────
-- Step 2: Check current state — run these SELECTs to see what exists
-- ──────────────────────────────────────────────────────────────
-- Check if the user_role type exists and its values
SELECT typname, enumlabel
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname = 'user_role'
ORDER BY e.enumsortorder;

-- Check the profiles table structure
SELECT column_name, data_type, udt_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Check existing profiles (to see if any exist already)
SELECT id, full_name, role, avatar_url, created_at FROM public.profiles LIMIT 10;

-- Check if there are any orphaned auth.users without profiles
SELECT u.id, u.email, u.raw_user_meta_data, u.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- ──────────────────────────────────────────────────────────────
-- Step 3: Replace the trigger with a diagnostic version
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _role       user_role;
  _full_name  TEXT;
  _avatar_url TEXT;
  _raw_meta   TEXT;
BEGIN
  -- Log: trigger fired
  INSERT INTO _debug_log (step, detail) VALUES (
    'trigger_fired',
    format('user_id=%s email=%s', NEW.id, NEW.email)
  );

  -- Log: raw metadata
  BEGIN
    _raw_meta := NEW.raw_user_meta_data::TEXT;
    INSERT INTO _debug_log (step, detail) VALUES (
      'raw_metadata',
      left(_raw_meta, 1000)
    );
  EXCEPTION WHEN OTHERS THEN
    INSERT INTO _debug_log (step, detail) VALUES (
      'raw_metadata_error',
      format('SQLSTATE=%s MSG=%s', SQLSTATE, SQLERRM)
    );
  END;

  -- Extract and validate role
  BEGIN
    _role := (NEW.raw_user_meta_data ->> 'role')::user_role;
    INSERT INTO _debug_log (step, detail) VALUES (
      'role_extracted',
      format('role=%s', _role)
    );
  EXCEPTION WHEN OTHERS THEN
    _role := 'merchant';
    INSERT INTO _debug_log (step, detail) VALUES (
      'role_defaulted',
      format('SQLSTATE=%s MSG=%s — defaulting to merchant', SQLSTATE, SQLERRM)
    );
  END;

  -- Block admin self-assignment
  IF _role = 'admin' THEN
    _role := 'merchant';
    INSERT INTO _debug_log (step, detail) VALUES (
      'admin_blocked', 'Attempted admin role — forced to merchant'
    );
  END IF;

  -- Extract full_name and avatar_url
  _full_name  := COALESCE(NEW.raw_user_meta_data ->> 'full_name', '');
  _avatar_url := COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '');

  INSERT INTO _debug_log (step, detail) VALUES (
    'pre_insert',
    format('id=%s name=%s role=%s avatar=%s', NEW.id, _full_name, _role, left(_avatar_url, 100))
  );

  -- Attempt the insert
  BEGIN
    INSERT INTO profiles (id, full_name, role, avatar_url)
    VALUES (NEW.id, _full_name, _role, _avatar_url)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO _debug_log (step, detail) VALUES (
      'insert_success', format('user_id=%s', NEW.id)
    );
  EXCEPTION WHEN OTHERS THEN
    INSERT INTO _debug_log (step, detail) VALUES (
      'insert_failed',
      format('SQLSTATE=%s MSG=%s', SQLSTATE, SQLERRM)
    );
    -- DO NOT re-raise — let the user creation succeed even if
    -- profile insert fails. The profile can be created later.
  END;

  RETURN NEW;
END;
$$;

-- ──────────────────────────────────────────────────────────────
-- Step 4: Verify the trigger is wired up
-- ──────────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────────────────────
-- AFTER retrying Google signup, run this to see the logs:
-- ──────────────────────────────────────────────────────────────
-- SELECT * FROM public._debug_log ORDER BY id;
-- ──────────────────────────────────────────────────────────────
