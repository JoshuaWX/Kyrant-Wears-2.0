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
 * - Handles OAuth redirect completion (stores role for new Google signups)
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
  type ProfileData,
} from "../services/auth.service";

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
  /** Sign up with email/password — returns error message or null */
  signUp: (
    email: string,
    password: string,
    role: string,
    fullName?: string
  ) => Promise<string | null>;
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

/* ── Provider ── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch the user's profile from the profiles table.
   * Called after login/signup and on auth state changes.
   */
  const fetchProfile = useCallback(async (userId: string) => {
    const { profile: profileData } = await getProfile(userId);
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
        // Small delay to allow the DB trigger to create the profile row
        setTimeout(async () => {
          await fetchProfile(newSession.user.id);
        }, 500);

        // Handle OAuth role assignment for new users
        const oauthRole = sessionStorage.getItem("kyrant_oauth_role");
        if (oauthRole) {
          sessionStorage.removeItem("kyrant_oauth_role");
          // The DB trigger handles role assignment from raw_user_meta_data
          // For Google OAuth, we update metadata if needed
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", newSession.user.id)
            .single<{ role: string }>();

          // Only update if profile was just created (matching default role)
          if (existingProfile && existingProfile.role === "merchant" && oauthRole !== "merchant") {
            // Profile was just created with default role, update to intended role
            await supabase.auth.updateUser({
              data: { role: oauthRole },
            });
          }
        }
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
    ): Promise<string | null> => {
      const { error } = await signUpWithEmail(email, password, role, fullName);
      if (error) return error.message;
      return null;
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
    signInGoogle: signInGoogle,
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
