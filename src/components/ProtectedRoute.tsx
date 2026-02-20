/**
 * ProtectedRoute — Route guard component for authenticated routes.
 *
 * Wraps any route that requires authentication. Optionally restricts
 * access to specific roles.
 *
 * Usage in App.tsx:
 *   <Route path="/dashboard" element={
 *     <ProtectedRoute>
 *       <DashboardPage />
 *     </ProtectedRoute>
 *   } />
 *
 *   <Route path="/admin" element={
 *     <ProtectedRoute allowedRoles={["admin"]}>
 *       <AdminPage />
 *     </ProtectedRoute>
 *   } />
 *
 * Behavior:
 * - Shows a loading spinner while auth state is being determined
 * - Redirects to /onboarding if user is not authenticated
 * - Redirects to /dashboard if user is authenticated but lacks the required role
 * - Renders children if all checks pass
 */

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "../types/database.types";

interface ProtectedRouteProps {
  children: ReactNode;
  /** If specified, only users with one of these roles can access the route */
  allowedRoles?: UserRole[];
  /** Where to redirect unauthenticated users (default: /onboarding) */
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/onboarding",
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

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

  // Not authenticated — redirect to login/onboarding
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role check (if allowedRoles is specified)
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  // All checks passed — render the protected content
  return <>{children}</>;
}
