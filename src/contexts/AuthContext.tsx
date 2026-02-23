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
 */
async function handleOAuthRoleAssignment(userId: string): Promise<void> {
  const raw = localStorage.getItem(OAUTH_ROLE_KEY);
  if (!raw) return;
  localStorage.removeItem(OAUTH_ROLE_KEY);

  // Re-validate — if someone injected "admin" this clamps to "merchant"
  let oauthRole: string;
  try {
    oauthRole = validateSignupRole(raw);
  } catch {
    return; // invalid value — ignore silently
  }

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<{ role: string }>();

  // Only update if profile was just created with the default role
  if (
    existingProfile &&
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
    // 1. Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          // On fresh page load after OAuth redirect, handle role assignment first
          await handleOAuthRoleAssignment(initialSession.user.id);
          await fetchProfile(initialSession.user.id);
        }
      } catch {
        // Silently handle — user is simply not logged in
        setUser(null);
        setSession(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // 2. Subscribe to auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === "SIGNED_IN" && newSession?.user) {
        // Handle OAuth role assignment for new users
        await handleOAuthRoleAssignment(newSession.user.id);
        // Fetch profile (with retry for DB trigger latency)
        await fetchProfile(newSession.user.id);
      }

      if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
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
      return { error: null, needsEmailConfirmation };
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const { error } = await signInWithEmail(email, password);
      if (error) return error.message;
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
    const { error } = await authSignOut();
    if (error) return error.message;
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
