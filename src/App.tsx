import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import DesignerSignupPage from "./pages/DesignerSignupPage";
import DesignerLoginPage from "./pages/DesignerLoginPage";
import MerchantSignupPage from "./pages/MerchantSignupPage";
import MerchantLoginPage from "./pages/MerchantLoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup/designer" element={<DesignerSignupPage />} />
        <Route path="/login/designer" element={<DesignerLoginPage />} />
        <Route path="/signup/merchant" element={<MerchantSignupPage />} />
        <Route path="/login/merchant" element={<MerchantLoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
