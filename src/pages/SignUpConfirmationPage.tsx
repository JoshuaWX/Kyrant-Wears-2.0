import type { FunctionComponent } from "react";
import { useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * SignUpConfirmationPage — Shown after a user signs up with email.
 *
 * Layout (1280 × 910):
 *   Dark green background with "Kyrant" wordmark top-left.
 *   Centered purple rounded card containing:
 *     - Email confirmation illustration (message-sent-1@2x.png)
 *     - "Confirm your Email" heading (Bricolage Grotesque)
 *     - Instructional text with user's email address
 *     - "Resend confirmation email" link
 *
 * Receives the email via `?email=...` query parameter so it can
 * display it in the message and use it for resend.
 *
 * Routes here from: DesignerSignupPage / MerchantSignupPage after
 * successful email signup that requires confirmation.
 */

const SignUpConfirmationPage: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [resendError, setResendError] = useState<string | null>(null);

  /** Resend the confirmation email via Supabase */
  const handleResend = useCallback(async () => {
    if (resendStatus === "sending" || resendStatus === "sent") return;

    setResendStatus("sending");
    setResendError(null);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      setResendStatus("error");
      setResendError(error.message);
    } else {
      setResendStatus("sent");
    }
  }, [email, resendStatus]);

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

      {/* ── Main confirmation card ── */}
      <main
        className="w-full max-w-[1102px] relative shadow-[-7.1px_7.1px_0px_rgba(105,_72,_115,_0.75)] rounded-[67px] bg-darkslateblue flex flex-col items-center pt-[100px] sm:pt-[140px] pb-[21px] px-6 sm:px-[35px] box-border"
        aria-label="Email confirmation"
      >
        {/* Illustration — positioned overlapping the top of the card */}
        <img
          className="w-[280px] sm:w-[360px] md:w-[431px] h-auto object-contain mb-4"
          loading="eager"
          alt="Confirmation email sent illustration"
          src="/assets/message-sent-1@2x.png"
        />

        {/* Heading */}
        <h1 className="m-0 w-full max-w-[487px] text-[36px] sm:text-[48px] md:text-[57px] font-normal font-bricolage-grotesque text-wheat-100 leading-tight">
          Confirm your Email
        </h1>

        {/* Instructional text */}
        <div className="w-full max-w-[701px] mt-9 pb-[65px] text-[15px] sm:text-[17.8px] font-semibold text-wheat-100 leading-[1.6]">
          We have sent an email to &ldquo;{email}&rdquo; to confirm the validity
          of your email address. Click the link provided in the email to complete
          your registration with us.
        </div>

        {/* Resend section */}
        <div className="w-full max-w-[401px] text-[15px] sm:text-[17.8px] pb-4">
          <span className="font-semibold text-wheat-100">
            Didn&apos;t get an email?{" "}
          </span>
          <button
            type="button"
            className={`cursor-pointer border-none bg-transparent p-0 font-extrabold text-[15px] sm:text-[17.8px] font-inter transition-opacity duration-150 ${
              resendStatus === "sending"
                ? "opacity-50 cursor-wait text-darkslategray-100"
                : resendStatus === "sent"
                  ? "text-green-400"
                  : "text-darkslategray-100 hover:opacity-80"
            }`}
            onClick={handleResend}
            disabled={resendStatus === "sending" || resendStatus === "sent"}
            aria-label="Resend confirmation email"
          >
            {resendStatus === "idle" && "Resend confirmation email"}
            {resendStatus === "sending" && "Sending..."}
            {resendStatus === "sent" && "Email sent!"}
            {resendStatus === "error" && "Retry sending"}
          </button>

          {/* Error message */}
          {resendError && (
            <p className="mt-2 text-sienna text-[13px] font-semibold">
              {resendError}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SignUpConfirmationPage;
