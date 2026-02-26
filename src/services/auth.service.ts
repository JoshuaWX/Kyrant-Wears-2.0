/**
 * Auth Service — Thin wrapper around Supabase Auth.
 *
 * All authentication logic lives here. Pages import these functions
 * instead of calling supabase.auth directly. This keeps auth logic
 * centralized, testable, and easy to swap if the provider changes.
 *
 * SECURITY NOTES:
 * - Passwords are NEVER stored or hashed locally — Supabase handles it
 * - The role is validated server-side by the DB trigger (handle_new_user)
 * - Admin role cannot be self-assigned (blocked in the trigger)
 * - Google OAuth redirect URL is configured in Supabase Dashboard
 */

import { supabase } from "../lib/supabase";
import type { UserRole } from "../types/database.types";
import type { AuthError, User, Session } from "@supabase/supabase-js";

/* ── Type definitions ── */

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface ProfileData {
  id: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/* ── Allowed roles for signup (admin excluded) ── */
const ALLOWED_SIGNUP_ROLES: UserRole[] = ["designer", "merchant"];

/**
 * Validate that a role string is a permitted signup role.
 * Prevents privilege escalation at the frontend layer.
 * Exported so AuthContext can re-validate localStorage values.
 */
export function validateSignupRole(role: string): UserRole {
  if (ALLOWED_SIGNUP_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }
  // Default to merchant if invalid role is somehow passed
  return "merchant";
}

/* ══════════════════════════════════════════════════════════════
   EMAIL / PASSWORD AUTH
   ══════════════════════════════════════════════════════════════ */

/**
 * Sign up a new user with email + password.
 *
 * The role is passed via user_metadata so the DB trigger (handle_new_user)
 * can read it and insert the correct profile row.
 *
 * @param email     - User's email address
 * @param password  - User's chosen password (min 6 chars enforced by Supabase)
 * @param role      - "designer" or "merchant"
 * @param fullName  - Optional display name
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  role: string,
  fullName?: string
): Promise<AuthResult> {
  const validatedRole = validateSignupRole(role);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: validatedRole,
        full_name: fullName ?? "",
      },
      emailRedirectTo: `${window.location.origin}/email-confirmed`,
    },
  });

  // Supabase anti-enumeration: when a confirmed user already exists,
  // signUp returns a fake user with an EMPTY identities array, no
  // session, and no error. Detect this and return a clear error so
  // the caller doesn't navigate to the confirmation page.
  if (
    !error &&
    data.user &&
    (!data.user.identities || data.user.identities.length === 0)
  ) {
    return {
      user: null,
      session: null,
      error: { message: "User already registered" } as AuthError,
    };
  }

  return {
    user: data.user ?? null,
    session: data.session ?? null,
    error,
  };
}

/**
 * Sign in an existing user with email + password.
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user ?? null,
    session: data.session ?? null,
    error,
  };
}

/* ══════════════════════════════════════════════════════════════
   GOOGLE OAUTH
   ══════════════════════════════════════════════════════════════ */

/**
 * Sign in / sign up with Google OAuth.
 *
 * For signup: the role is persisted in localStorage so it survives
 * the full-page redirect through Google → Supabase → your app.
 * After the redirect, AuthContext picks it up and assigns it.
 *
 * For login: localStorage role is ignored if the user already has a profile.
 *
 * IMPORTANT — you must configure Google OAuth in:
 *   Supabase Dashboard → Authentication → Providers → Google
 *   AND add your redirect URL to the allowed list:
 *   Supabase Dashboard → Authentication → URL Configuration → Redirect URLs
 *   Add: http://localhost:5173/dashboard  (dev)
 *        https://yourdomain.com/dashboard (prod)
 *
 * @param role - Role to assign if this is a new user signup
 */
export async function signInWithGoogle(role?: string): Promise<{
  error: AuthError | null;
}> {
  const validatedRole = role ? validateSignupRole(role) : "merchant";

  // Persist the intended role BEFORE the redirect — localStorage survives
  // the full Google → Supabase → app redirect cycle (sessionStorage may not).
  if (role) {
    localStorage.setItem("kyrant_oauth_role", validatedRole);
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      skipBrowserRedirect: false,
    },
  });

  // If the OAuth call itself fails, clean up the stored role
  if (error) {
    localStorage.removeItem("kyrant_oauth_role");
  }

  return { error };
}

/* ══════════════════════════════════════════════════════════════
   SESSION MANAGEMENT
   ══════════════════════════════════════════════════════════════ */

/**
 * Sign out the current user. Clears the session from localStorage.
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  localStorage.removeItem("kyrant_oauth_role");
  return { error };
}

/**
 * Get the current session (or null if not logged in).
 */
export async function getSession(): Promise<{
  session: Session | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

/**
 * Get the current authenticated user (server-validated).
 */
export async function getUser(): Promise<{
  user: User | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user ?? null, error };
}

/* ══════════════════════════════════════════════════════════════
   PROFILE OPERATIONS
   ══════════════════════════════════════════════════════════════ */

/**
 * Fetch the current user's profile from the `profiles` table.
 * RLS ensures users can only read their own profile.
 */
export async function getProfile(userId: string): Promise<{
  profile: ProfileData | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url, created_at, updated_at")
    .eq("id", userId)
    .single();

  if (error) {
    return { profile: null, error: error.message };
  }

  return { profile: data as ProfileData, error: null };
}

/**
 * Update the current user's profile.
 * RLS prevents users from changing their own role.
 */
export async function updateProfile(
  userId: string,
  updates: { full_name?: string; avatar_url?: string }
): Promise<{ error: string | null }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("profiles") as any)
    .update(updates)
    .eq("id", userId);

  return { error: error?.message ?? null };
}
