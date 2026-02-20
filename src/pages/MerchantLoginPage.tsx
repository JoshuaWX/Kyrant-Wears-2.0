import type { FunctionComponent, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * MerchantLoginPage — Login screen for the "Merchant" role.
 *
 * Layout (1440 × 1024):
 *   Cream/wheat full-screen background with a centered purple card.
 *   Left half: hero fashion image (screen-printing scene) with decorative carousel arrows.
 *   Right half: brand wordmark, language selector, heading, email/password form,
 *               Google OAuth option, and login CTA.
 *
 * Routes here from `/login/merchant`
 */

const MerchantLoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { signIn, signInGoogle } = useAuth();

  /* ── Form state ── */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /** Sign in with email/password */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    const error = await signIn(email, password);
    if (error) {
      setErrorMsg(error);
      setIsSubmitting(false);
    } else {
      navigate("/dashboard");
    }
  };

  /** Sign in with Google */
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    const error = await signInGoogle();
    if (error) setErrorMsg(error);
  };

  return (
    <div className="w-full min-h-screen relative bg-wheat-100 overflow-hidden flex flex-col items-center justify-center py-8 sm:py-[120px] px-4 sm:px-[30px] box-border">
      {/* ── Main card container ── */}
      <main className="w-full shadow-[-8px_8px_0px_rgba(105,_72,_115,_0.75)] rounded-[30px] sm:rounded-[75px] bg-darkslateblue flex items-start flex-wrap content-start pt-[24.2px] px-4 sm:px-[24.2px] pb-[25.3px] box-border gap-6 sm:gap-10 max-w-[1240px]">
        {/* ── Left: Hero image with carousel arrows ── */}
        <div className="h-[300px] sm:h-[500px] md:h-[734.4px] flex-1 relative max-w-full md:max-w-[594.7px] min-w-[250px] sm:min-w-[261.5px]">
          <img
            className="w-full h-full rounded-[25px] sm:rounded-[55px] object-cover"
            loading="lazy"
            alt="Merchant screen-printing t-shirts in workshop"
            src="/assets/mask-groupwoman2x.png"
          />

          {/* Carousel arrows — navigate between merchant ↔ designer login */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              type="button"
              aria-label="Go to designer login"
              className="w-9 h-9 rounded-full border-[2.5px] border-solid border-wheat-100 bg-transparent flex items-center justify-center cursor-pointer text-wheat-100 text-lg leading-none"
              onClick={() => navigate("/login/designer")}
            >
              &#8249;
            </button>
            <button
              type="button"
              aria-label="Go to designer login"
              className="w-9 h-9 rounded-full border-[2.5px] border-solid border-wheat-100 bg-transparent flex items-center justify-center cursor-pointer text-wheat-100 text-lg leading-none"
              onClick={() => navigate("/login/designer")}
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* ── Right: Login form section ── */}
        <section className="flex-1 flex flex-col items-end pt-4 sm:pt-[24.7px] px-0 pb-4 sm:pb-[16.6px] box-border gap-[15.1px] min-w-[250px] sm:min-w-[261.5px] max-w-full sm:max-w-[499px] text-left text-wheat-100 font-inter">
          {/* Top bar: Brand wordmark + language selector */}
          <div className="self-stretch flex items-start justify-between pt-0 px-0 pb-[9px] gap-0">
            {/* Kyrant brand wordmark — links back to landing page */}
            <div className="flex items-start pt-[1.9px] px-0 pb-0">
              <h1
                className="m-0 w-[104px] relative text-num-32 font-normal font-pacifico text-wheat-100 flex items-center cursor-pointer shrink-0"
                onClick={() => navigate("/")}
                role="link"
                tabIndex={0}
                aria-label="Go back to landing page"
              >
                Kyrant
              </h1>
            </div>

            {/* Language selector */}
            <button
              className="cursor-pointer border-wheat-100 border-solid border-[3px] py-0 pl-[22.7px] pr-[25.9px] bg-transparent rounded-[45px] flex items-center justify-center gap-[2.9px]"
              type="button"
              aria-label="Select language"
            >
              <span className="w-[22px] relative text-num-16 font-pacifico text-black text-left flex items-center">
                🗃️
              </span>
              <div className="flex items-start pt-0 px-0 pb-[1.5px]">
                <span className="relative text-[12px] leading-[8.9px] font-semibold font-inter text-wheat-100 text-left flex items-center shrink-0">
                  ENG
                </span>
              </div>
            </button>
          </div>

          {/* Heading */}
          <h1 className="m-0 w-full relative text-[36px] sm:text-[48px] md:text-[64px] font-normal font-bricolage-grotesque flex items-center max-w-[401.5px]">
            Hi Merchant
          </h1>

          {/* Sub-heading */}
          <div className="w-full flex items-start pt-0 px-0 pb-[22.8px] box-border max-w-[475.9px] text-center text-num-20">
            <h3 className="m-0 flex-1 relative text-num-20 font-semibold font-inter flex items-center justify-center shrink-0">
              Welcome to Kyrant
            </h3>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="w-full max-w-[439.4px] rounded-[5px] bg-sienna/20 border border-solid border-sienna px-4 py-3 text-num-14 text-wheat-100 font-inter">
              {errorMsg}
            </div>
          )}

          {/* ── Login form ── */}
          <form
            className="w-full flex flex-col items-end gap-[15.1px]"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email input */}
            <div className="w-full flex items-start pt-0 pb-[4.9px] pl-0 pr-[16.4px] box-border max-w-[439.4px]">
              <div className="flex-1 rounded-[5px] border-wheat-100 border-solid border-[3px] flex items-start pt-[21.8px] px-[16.9px] pb-[21.2px] shrink-0">
                <input
                  className="w-full border-none outline-none font-semibold font-inter text-num-16 bg-transparent flex-1 relative leading-[16.5px] text-white text-left flex items-center placeholder:text-wheat-100"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password input */}
            <div className="w-full flex items-start py-0 pl-0 pr-[16.4px] box-border max-w-[439.4px]">
              <div className="flex-1 rounded-[5px] border-wheat-100 border-solid border-[3px] flex items-start pt-[21.8px] px-[16.9px] pb-[21.2px] shrink-0">
                <input
                  className="w-full border-none outline-none font-semibold font-inter text-num-16 bg-transparent flex-1 relative leading-[16.5px] text-white text-left flex items-center placeholder:text-wheat-100"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* ── "or" divider ── */}
            <div className="self-stretch flex items-center justify-center pt-[2.3px] pb-[11.5px] pl-[41.4px] pr-0 gap-[25.4px] text-white">
              <div className="flex-1 flex items-start pt-px px-0 pb-0 box-border max-w-[145.4px] shrink-0">
                <div className="h-0.5 flex-1 relative border-wheat-100 border-solid border-t-[2px] box-border shrink-0" />
              </div>
              <div className="flex items-start py-0 pl-0 pr-[6.2px] shrink-0">
                <span className="w-[17px] relative font-semibold flex items-center shrink-0">
                  or
                </span>
              </div>
              <div className="flex-1 flex items-start pt-px px-0 pb-0 box-border max-w-[145.4px] shrink-0">
                <div className="h-0.5 flex-1 relative border-wheat-100 border-solid border-t-[2px] box-border shrink-0" />
              </div>
            </div>

            {/* Google OAuth button */}
            <div className="w-full flex items-start pt-0 pb-[14.9px] pl-0 pr-[16.4px] box-border max-w-[439.4px]">
              <button
                className="cursor-pointer border-wheat-100 border-solid border-[3px] py-1.5 px-0 bg-transparent flex-1 rounded-[5px] flex items-center justify-center gap-1.5 shrink-0 transition-opacity duration-200 hover:opacity-80"
                type="button"
                aria-label="Login with Google"
                onClick={handleGoogleLogin}
              >
                <span className="relative text-num-16 leading-[17px] font-semibold font-inter text-wheat-100 text-left flex items-center">
                  Login with Google
                </span>
                <img
                  className="w-12 relative max-h-full"
                  alt="Google logo"
                  src="/assets/google-icon-isolated-3d-render-illustration-1.svg"
                />
              </button>
            </div>

            {/* Login submit button */}
            <div className="w-full flex items-start pt-0 pb-[48.9px] pl-0 pr-[16.4px] box-border max-w-[439.4px]">
              <button
                className="cursor-pointer border-none pt-6 px-0 pb-[25px] bg-darkslategray-100 flex-1 shadow-[-4px_4px_0px_rgba(22,_48,_43,_0.75)] rounded-[35px] flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-[1.02] hover:shadow-[-6px_6px_0px_rgba(22,_48,_43,_0.85)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                <span className="flex-1 relative text-num-16 leading-[17px] font-semibold font-inter text-white text-center flex items-center justify-center">
                  {isSubmitting ? "Logging in…" : "Login"}
                </span>
              </button>
            </div>
          </form>

          {/* Don't have an account? Signup */}
          <p className="m-0 w-full relative text-num-16 font-semibold text-center inline-block max-w-[456.3px]">
            <span className="text-wheat-100">Don't have an account?</span>
            <span className="text-white">{" "}</span>
            <span
              className="text-darkslategray-100 cursor-pointer underline"
              onClick={() => navigate("/signup/merchant")}
              role="link"
              tabIndex={0}
              aria-label="Go to merchant sign up page"
            >
              Signup
            </span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default MerchantLoginPage;
