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
 */
function validateSignupRole(role: string): UserRole {
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
    },
  });

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
 * For signup: the role is stored in metadata.
 * For login: metadata is ignored (user already exists).
 *
 * IMPORTANT: Google OAuth must be configured in:
 *   Supabase Dashboard → Authentication → Providers → Google
 *
 * The redirectTo URL must match your app's domain.
 *
 * @param role - Role to assign if this is a new user signup
 */
export async function signInWithGoogle(role?: string): Promise<{
  error: AuthError | null;
}> {
  const validatedRole = role ? validateSignupRole(role) : "merchant";

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
      queryParams: {
        // These get stored in raw_user_meta_data for new users
        access_type: "offline",
        prompt: "consent",
      },
      // Pass role in scopes metadata
      // The handle_new_user trigger reads this from raw_user_meta_data
      skipBrowserRedirect: false,
    },
  });

  // For Google OAuth, we also need to store the role in metadata
  // This is handled by updating the user after OAuth completes
  // via the onAuthStateChange listener in AuthContext

  // Store intended role in sessionStorage for post-OAuth pickup
  if (!error && role) {
    sessionStorage.setItem("kyrant_oauth_role", validatedRole);
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
  sessionStorage.removeItem("kyrant_oauth_role");
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
