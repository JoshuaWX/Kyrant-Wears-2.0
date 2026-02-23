import { useCallback } from "react";
import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import PopularProducts from "../components/PopularProducts";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

/**
 * LandingPage - Main landing page for Kyrant Wears, a print-on-demand platform.
 *
 * Sections:
 * 1. Header - Navigation with brand logo, links, and auth buttons
 * 2. Hero - Tagline "Design, Order, EARN" with decorative product images
 * 3. How It Works - Step-by-step guide for Shoppers and Designers
 * 4. Popular Products - Product category cards (T-shirts, Hoodies, etc.)
 * 5. FAQ - Expandable frequently asked questions
 * 6. Footer - Links, social media, and legal information
 */

const LandingPage: FunctionComponent = () => {
  const navigate = useNavigate();

  /* Navigate to the onboarding page when signing up */
  const onSignUpClick = useCallback(() => {
    navigate("/onboarding");
  }, [navigate]);

  /* Navigate to merchant login page */
  const onLoginClick = useCallback(() => {
    navigate("/login/merchant");
  }, [navigate]);

  /* Navigate to dashboard page via LogoBadge */
  const onLogoClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  /* Navigation callbacks — wire these to React Router when routes are added */
  const onProductsClick = useCallback(() => {
    console.log("Navigate to Products page");
  }, []);

  const onDesignsClick = useCallback(() => {
    console.log("Navigate to Designs page");
  }, []);

  const onBrandsClick = useCallback(() => {
    console.log("Navigate to Brands page");
  }, []);

  return (
    <div className="w-full relative bg-darkslategray-100 flex flex-col items-end pt-6 sm:pt-[46px] px-0 pb-0 box-border isolate gap-12 sm:gap-16 md:gap-[109px] leading-[normal] tracking-[normal] overflow-x-hidden">
      {/* Navigation header */}
      <Header
        onProductsClick={onProductsClick}
        onDesignsClick={onDesignsClick}
        onBrandsClick={onBrandsClick}
        onSignUpClick={onSignUpClick}
        onLoginClick={onLoginClick}
        onLogoClick={onLogoClick}
      />

      {/* Hero section with tagline and CTA */}
      <HeroSection onSignUpClick={onSignUpClick} />

      {/* How It Works - process steps for shoppers and designers */}
      <HowItWorks />

      {/* Popular Products showcase */}
      <PopularProducts />

      {/* FAQ accordion section */}
      <FaqSection />

      {/* Site footer with links and legal info */}
      <Footer />
    </div>
  );
};

export default LandingPage;
