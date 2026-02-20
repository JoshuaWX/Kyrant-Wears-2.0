import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import DesignerSignupPage from "./pages/DesignerSignupPage";
import DesignerLoginPage from "./pages/DesignerLoginPage";
import MerchantSignupPage from "./pages/MerchantSignupPage";
import MerchantLoginPage from "./pages/MerchantLoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
