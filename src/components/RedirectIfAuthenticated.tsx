/**
 * RedirectIfAuthenticated — Route guard for auth pages.
 *
 * Prevents logged-in users from seeing signup/login pages.
 * If the user is already authenticated, redirects them to /dashboard.
 *
 * Usage in App.tsx:
 *   <Route path="/signup/designer" element={
 *     <RedirectIfAuthenticated>
 *       <DesignerSignupPage />
 *     </RedirectIfAuthenticated>
 *   } />
 */

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
  /** Where to redirect authenticated users (default: /dashboard) */
  redirectTo?: string;
}

export default function RedirectIfAuthenticated({
  children,
  redirectTo = "/dashboard",
}: RedirectIfAuthenticatedProps) {
  const { user, loading } = useAuth();

  // Still checking auth state — show loading indicator
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-darkslategray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-wheat-100 border-t-transparent rounded-full animate-spin" />
          <span className="text-wheat-100 font-inter text-num-16">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // Already logged in — redirect away from auth pages
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Not authenticated — show the auth page
  return <>{children}</>;
}
