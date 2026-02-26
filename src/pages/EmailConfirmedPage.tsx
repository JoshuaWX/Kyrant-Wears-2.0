import type { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * EmailConfirmedPage — Shown after a user clicks the email confirmation
 * link in their inbox and Supabase redirects them back to the app.
 *
 * Layout (1280 × 910.2):
 *   Dark green background (#16302b) with "Kyrant" wordmark top-left.
 *   Centered purple rounded card containing:
 *     - Email confirmation illustration (message-sent-1@2x.png)
 *     - "Email Confirmed" heading (Bricolage Grotesque, 56.9px)
 *     - Instructional text with user's email address
 *     - "Continue to next page" button → navigates to /dashboard
 *
 * The user's email is read from the authenticated session (Supabase
 * establishes a session upon confirmation link click).
 *
 * Route: /email-confirmed
 */

const EmailConfirmedPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /* User's email — available once the session is established */
  const email = user?.email || "your email";

  return (
    <div className="w-full min-h-screen relative bg-darkslategray-100 overflow-hidden flex flex-col items-center pt-[39px] px-4 sm:px-[30px] pb-[107px] box-border text-center text-wheat-100 font-inter">
      {/* ── Top-left brand wordmark ── */}
      <div className="w-full max-w-[1102px] flex items-start mb-4">
        <Link
          to="/"
          className="no-underline text-inherit"
          aria-label="Go to landing page"
        >
          <span className="text-[28.4px] font-pacifico text-wheat-100">
            Kyrant
          </span>
        </Link>
      </div>

      {/* ── Main confirmed card ── */}
      <main
        className="w-full max-w-[1102px] relative shadow-[-7.1px_7.1px_0px_rgba(105,_72,_115,_0.75)] rounded-[67px] bg-darkslateblue flex flex-col items-center pt-[100px] sm:pt-[140px] pb-[45px] sm:pb-[175px] px-6 sm:px-[35px] box-border gap-[47px]"
        aria-label="Email confirmed"
      >
        {/* Illustration — positioned inside the card */}
        <img
          className="w-[280px] sm:w-[360px] md:w-[431px] h-auto object-contain"
          loading="eager"
          alt="Email confirmed illustration"
          src="/assets/message-sent-1@2x.png"
        />

        {/* Heading */}
        <h1 className="m-0 w-full max-w-[427px] text-[36px] sm:text-[48px] md:text-[57px] font-normal font-bricolage-grotesque text-wheat-100 leading-tight">
          Email Confirmed
        </h1>

        {/* Body text */}
        <div className="w-full max-w-[643px] text-[15px] sm:text-[17.8px] font-semibold text-wheat-100 leading-[1.6]">
          Your email &ldquo;{email}&rdquo; has been confirmed. Proceed
          to the next page.
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer border-none w-full max-w-[409px] h-[50px] sm:h-[60px] shadow-[-4px_4px_0px_rgba(22,_48,_43,_0.75)] rounded-[30px] bg-darkslategray-100 flex items-center justify-center box-border transition-opacity duration-150 hover:opacity-90 active:opacity-80"
          aria-label="Continue to dashboard"
        >
          <span className="text-[24px] sm:text-[32px] font-bricolage-grotesque text-wheat-100 text-center">
            Continue to next page
          </span>
        </button>
      </main>
    </div>
  );
};

export default EmailConfirmedPage;
