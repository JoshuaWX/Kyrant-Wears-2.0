import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import DesignerSignupPage from "./pages/DesignerSignupPage";
import DesignerLoginPage from "./pages/DesignerLoginPage";
import MerchantSignupPage from "./pages/MerchantSignupPage";
import MerchantLoginPage from "./pages/MerchantLoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import LoadingScreen from "./components/LoadingScreen";
import PageAnimator from "./components/PageAnimator";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { loading: authLoading } = useAuth();

  // Keep the loader for a minimum aesthetic duration (3s).
  // If auth takes longer, the loader will remain until authLoading is false.
  const MIN_MS = 3000;
  const SLIDE_MS = 600;

  const [minElapsed, setMinElapsed] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), MIN_MS);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    // When both min duration passed and auth not loading, start slide-in of content.
    if (minElapsed && !authLoading) {
      // Ensure the viewport is at the top of the page before the content slides in
      try {
        window.scrollTo({ top: 0, left: 0 });
        // also reset any potential smooth-scroll on html/body
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch {}

      setExiting(true);
      const t = setTimeout(() => setMounted(false), SLIDE_MS + 20);
      return () => clearTimeout(t);
    }
  }, [minElapsed, authLoading]);

  // Render the app content underneath the loader so we can animate it sliding in from
  // outside the viewport. While `mounted` is true the loader overlays the page and the
  // app content starts translated down (off-screen). When `exiting` becomes true the
  // content translates to its normal position over `SLIDE_MS`.
  const contentTransform = mounted ? (exiting ? "translateY(0)" : "translateY(100vh)") : "translateY(0)";

  return (
    <BrowserRouter>
      <div style={{ transition: `transform ${SLIDE_MS}ms ease`, transform: contentTransform }}>
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={
          <RedirectIfAuthenticated>
            <OnboardingPage />
          </RedirectIfAuthenticated>
        } />

        {/* Auth routes — redirect to dashboard if already logged in */}
        <Route path="/signup/designer" element={
          <RedirectIfAuthenticated>
            <DesignerSignupPage />
          </RedirectIfAuthenticated>
        } />
        <Route path="/login/designer" element={
          <RedirectIfAuthenticated>
            <DesignerLoginPage />
          </RedirectIfAuthenticated>
        } />
        <Route path="/signup/merchant" element={
          <RedirectIfAuthenticated>
            <MerchantSignupPage />
          </RedirectIfAuthenticated>
        } />
        <Route path="/login/merchant" element={
          <RedirectIfAuthenticated>
            <MerchantLoginPage />
          </RedirectIfAuthenticated>
        } />

        {/* Protected routes — require authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        {/* Products catalog */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Legal pages */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>

      {mounted && <LoadingScreen exiting={exiting} />}
      <PageAnimator trigger={exiting} />
    </BrowserRouter>
  );
}

export default App;
