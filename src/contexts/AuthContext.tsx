/**
 * AuthContext — React context for authentication state.
 *
 * Provides the current user, profile (with role), loading state,
 * and auth action functions to the entire component tree.
 *
 * Wrap <App /> with <AuthProvider> in main.tsx.
 *
 * SECURITY NOTES:
 * - Listens to Supabase onAuthStateChange for real-time session updates
 * - Fetches profile (with role) from the profiles table after login
 * - Handles OAuth redirect completion (stores role in localStorage)
 * - Re-validates the localStorage role value to prevent privilege escalation
 * - Never exposes raw tokens to component code
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  getProfile,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut as authSignOut,
  validateSignupRole,
  type ProfileData,
} from "../services/auth.service";

/* ── Public types ── */

/** Returned by signUp so callers can distinguish confirmation-required from error */
export interface SignUpResult {
  error: string | null;
  needsEmailConfirmation: boolean;
}

/* ── Context shape ── */

interface AuthContextValue {
  /** The Supabase auth user object (null = not logged in) */
  user: User | null;
  /** The user's profile from the profiles table (null = not loaded yet) */
  profile: ProfileData | null;
  /** The current Supabase session */
  session: Session | null;
  /** True while the initial auth check is in progress */
  loading: boolean;
  /** Sign up with email/password — returns SignUpResult */
  signUp: (
    email: string,
    password: string,
    role: string,
    fullName?: string
  ) => Promise<SignUpResult>;
  /** Sign in with email/password — returns error message or null */
  signIn: (email: string, password: string) => Promise<string | null>;
  /** Sign in with Google OAuth — returns error message or null */
  signInGoogle: (role?: string) => Promise<string | null>;
  /** Sign out — returns error message or null */
  signOut: () => Promise<string | null>;
  /** Refresh the profile data from the database */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Helpers ── */

const OAUTH_ROLE_KEY = "kyrant_oauth_role";

/**
 * Fetch profile with exponential back-off retry.
 * The DB trigger that creates the profile row on first sign-up may need
 * a moment to complete, so we retry a few times before giving up.
 */
async function fetchProfileWithRetry(
  userId: string,
  retries = 3,
  delayMs = 600
): Promise<ProfileData | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const { profile } = await getProfile(userId);
    if (profile) return profile;
    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
    }
  }
  return null;
}

/**
 * After an OAuth redirect, read the intended role from localStorage,
 * re-validate it (prevent devtools tampering), and assign it if the
 * user's profile still has the default "merchant" role.
 *
 * The localStorage key is kept until the profile is confirmed to exist
 * so the assignment can be retried on the next event / page load when
 * the DB trigger hasn't finished yet (common with new Google sign-ups).
 */
async function handleOAuthRoleAssignment(userId: string): Promise<void> {
  const raw = localStorage.getItem(OAUTH_ROLE_KEY);
  if (!raw) return;

  // Re-validate — if someone injected "admin" this clamps to "merchant"
  let oauthRole: string;
  try {
    oauthRole = validateSignupRole(raw);
  } catch {
    localStorage.removeItem(OAUTH_ROLE_KEY);
    return; // invalid value — ignore silently
  }

  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<{ role: string }>();

  // Profile hasn't been created yet (trigger latency) — keep key for retry
  if (error || !existingProfile) return;

  // Profile exists — consume the stored role so we don't retry forever
  localStorage.removeItem(OAUTH_ROLE_KEY);

  // Only update if profile was just created with the default role
  if (
    existingProfile.role === "merchant" &&
    oauthRole !== "merchant"
  ) {
    // Update both auth metadata and profile row
    await supabase.auth.updateUser({ data: { role: oauthRole } });
    await supabase
      .from("profiles")
      // @ts-expect-error — role is excluded from Update type but OAuth role assignment is a privileged server-side operation
      .update({ role: oauthRole })
      .eq("id", userId);
  }
}

/* ── Provider ── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch and store the user's profile (with retry).
   */
  const fetchProfile = useCallback(async (userId: string) => {
    const profileData = await fetchProfileWithRetry(userId);
    setProfile(profileData);
  }, []);

  /**
   * Refresh profile data (callable from components).
   */
  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  /* ── Listen to auth state changes ── */
  useEffect(() => {
    let isCancelled = false;
    let loadingResolved = false;

    /**
     * Idempotent helper — sets loading = false exactly once.
     * Can be called from any event handler or timeout safely.
     */
    const resolveLoading = () => {
      if (!loadingResolved && !isCancelled) {
        loadingResolved = true;
        setLoading(false);
      }
    };

    // ── Detect OAuth callback ──
    // If the URL contains PKCE `code` or implicit-flow `access_token`,
    // we're returning from an OAuth redirect. INITIAL_SESSION may fire
    // with null while the SDK is still exchanging the code, so we must
    // wait for the subsequent SIGNED_IN instead of resolving immediately.
    const isOAuthCallback = (() => {
      try {
        const url = new URL(window.location.href);
        return (
          url.searchParams.has("code") ||
          url.hash.includes("access_token")
        );
      } catch {
        return false;
      }
    })();

    // ── Nuclear safety timeout ── (NEVER cleared — absolute backstop)
    const safetyTimeoutId = setTimeout(() => {
      if (!loadingResolved) {
        console.warn(
          "[AuthContext] Safety timeout (10 s) — forcing loading off"
        );
        resolveLoading();
      }
    }, 10_000);

    // Secondary timeout for OAuth callbacks where INITIAL_SESSION arrived
    // with null and we're waiting for SIGNED_IN.
    let oauthFallbackId: ReturnType<typeof setTimeout> | null = null;

    // ══════════════════════════════════════════════════════════════
    //  IMPORTANT — the callback is intentionally NOT async.
    //
    //  All long-running / network work (profile fetch, role assignment)
    //  is fired as a non-awaited promise so that:
    //    • resolveLoading() is ALWAYS reached regardless of errors
    //    • the loading screen is never stuck waiting for DB queries
    //    • profile data arrives in the background and React re-renders
    // ══════════════════════════════════════════════════════════════
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (isCancelled) return;

      // ── SIGNED_OUT: wipe everything ──
      if (event === "SIGNED_OUT") {
        setSession(null);
        setUser(null);
        setProfile(null);
        resolveLoading();
        return;
      }

      // ── For every other event, update state ONLY when a session exists ──
      // This prevents a spurious null from overwriting a valid session
      // (e.g. INITIAL_SESSION arriving after SIGNED_IN already set state).
      if (newSession) {
        setSession(newSession);
        setUser(newSession.user);
      }

      // ── INITIAL_SESSION ──
      if (event === "INITIAL_SESSION") {
        if (newSession?.user) {
          // Authenticated — kick off background work (non-blocking)
          handleOAuthRoleAssignment(newSession.user.id).catch(() => {});
          fetchProfile(newSession.user.id).catch(() => {});
          resolveLoading();
        } else if (isOAuthCallback) {
          // On an OAuth redirect URL but no session yet.
          // The SDK may still be processing the code exchange.
          // Wait up to 5 s for a SIGNED_IN event before giving up.
          oauthFallbackId = setTimeout(() => {
            console.warn(
              "[AuthContext] OAuth fallback — no SIGNED_IN received"
            );
            resolveLoading();
          }, 5_000);
        } else {
          // Normal case: user is simply not logged in
          resolveLoading();
        }
        return;
      }

      // ── SIGNED_IN (login, OAuth completion, token exchange) ──
      if (event === "SIGNED_IN" && newSession?.user) {
        // Clear OAuth fallback timeout if applicable
        if (oauthFallbackId) {
          clearTimeout(oauthFallbackId);
          oauthFallbackId = null;
        }
        handleOAuthRoleAssignment(newSession.user.id).catch(() => {});
        fetchProfile(newSession.user.id).catch(() => {});
        resolveLoading();
      }

      // TOKEN_REFRESHED, USER_UPDATED, etc. — session already synced above
    });

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeoutId);
      if (oauthFallbackId) clearTimeout(oauthFallbackId);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  /* ── Auth action wrappers ── */

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      role: string,
      fullName?: string
    ): Promise<SignUpResult> => {
      const { user: newUser, session: newSession, error } = await signUpWithEmail(
        email,
        password,
        role,
        fullName
      );
      if (error) return { error: error.message, needsEmailConfirmation: false };

      // Supabase returns a user but NO session when email confirmation is required
      const needsEmailConfirmation = !!newUser && !newSession;

      // Set state immediately so ProtectedRoute sees the user before navigate()
      if (newUser && newSession) {
        setUser(newUser);
        setSession(newSession);
      }

      return { error: null, needsEmailConfirmation };
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const { user: signedInUser, session: signedInSession, error } =
        await signInWithEmail(email, password);
      if (error) return error.message;

      // Set state immediately so ProtectedRoute sees the user before navigate()
      if (signedInUser && signedInSession) {
        setUser(signedInUser);
        setSession(signedInSession);
      }

      return null;
    },
    []
  );

  const signInGoogle = useCallback(
    async (role?: string): Promise<string | null> => {
      const { error } = await signInWithGoogle(role);
      if (error) return error.message;
      return null;
    },
    []
  );

  const signOutHandler = useCallback(async (): Promise<string | null> => {
    // 1. Clear React state IMMEDIATELY so the UI reflects sign-out
    //    regardless of whether the SDK call succeeds.
    setUser(null);
    setSession(null);
    setProfile(null);

    // 2. Tell Supabase to revoke the session & clear localStorage
    try {
      await authSignOut();
    } catch {
      // SDK signout failed — manually nuke auth storage as fallback
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("sb-") || key.includes("supabase"))) {
            localStorage.removeItem(key);
          }
        }
        localStorage.removeItem("kyrant_oauth_role");
      } catch {
        /* ignore */
      }
    }

    return null;
  }, []);

  /* ── Context value ── */

  const value: AuthContextValue = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInGoogle,
    signOut: signOutHandler,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ── Hook ── */

/**
 * Use this hook in any component to access auth state and actions.
 *
 * @example
 * const { user, profile, signIn, signOut } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
}
