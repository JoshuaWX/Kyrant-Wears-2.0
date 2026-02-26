import type { FunctionComponent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoBadge from "../components/LogoBadge";
import NavButton from "../components/NavButton";

/**
 * Header — Unified top navigation bar used across all pages.
 *
 * Layout matches the DashboardPage header:
 *   Kyrant wordmark | pill nav (K · PRODUCTS · DESIGNS · BRANDS) | avatar / auth buttons
 *
 * Props:
 *  - activeLink: which nav item is currently active ("products" | "designs" | "brands")
 *  - onSignUpClick / onLoginClick: only used when not authenticated
 *  - className: extra wrapper classes (e.g. bottom padding per page)
 */

type ActiveLink = "products" | "designs" | "brands" | null;

interface HeaderProps {
  /** Which nav link should be underlined (current page indicator) */
  activeLink?: ActiveLink;
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
  className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({
  activeLink = null,
  onSignUpClick,
  onLoginClick,
  className = "",
}) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const roleLabel = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "";

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await signOut();
    navigate("/onboarding");
  };

  /** Shared link classes; adds underline when active */
  const navLinkClass = (link: ActiveLink) =>
    `m-0 relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque cursor-pointer z-[1] no-underline text-darkslateblue ${
      activeLink === link ? "underline" : ""
    }`;

  return (
    <header
      className={`self-stretch flex items-start justify-center py-0 px-4 sm:px-[30px] text-left text-num-20 sm:text-num-32 text-darkslateblue font-pacifico ${className}`}
    >
      <div className="flex-1 flex items-center sm:items-start justify-between flex-wrap content-start gap-x-4 gap-y-2.5 max-w-[1290px]">
        {/* ── Brand wordmark ── */}
        <Link
          to="/"
          className="no-underline text-inherit flex items-start"
          aria-label="Go to landing page"
        >
          <h2 className="m-0 w-auto sm:w-[104px] relative text-num-20 sm:text-num-32 font-normal font-pacifico inline-block shrink-0">
            Kyrant
          </h2>
        </Link>

        {/* ── Pill navigation bar ── */}
        <div className="flex-1 flex items-start py-0 pl-0 pr-0 sm:pr-[54px] box-border min-w-[240px] sm:min-w-[310px] max-w-[492px] text-center text-num-14 sm:text-num-18 font-bricolage-grotesque">
          <nav
            className="flex-1 shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] rounded-[30px] bg-wheat-100 flex items-center flex-wrap content-center pt-[3px] px-[5.9px] pb-[2.1px] gap-2 sm:gap-[16.5px] shrink-0"
            aria-label="Main navigation"
          >
            {/* Logo badge */}
            <div className="flex items-start pt-0 px-0 pb-[3.9px]">
              <LogoBadge onClick={() => navigate("/")} />
            </div>

            {/* PRODUCTS */}
            <div className="flex-1 flex items-start min-w-[70px] sm:min-w-[97px] max-w-[132px]">
              <Link to="/products" className={navLinkClass("products")}>
                PRODUCTS
              </Link>
            </div>

            {/* DESIGNS */}
            <div className="flex-1 flex items-start min-w-[60px] sm:min-w-[80px] max-w-[113.5px]">
              <Link to="/designs" className={navLinkClass("designs")}>
                DESIGNS
              </Link>
            </div>

            {/* BRANDS */}
            <Link to="/about" className={navLinkClass("brands")}>
              BRANDS
            </Link>
          </nav>
        </div>

        {/* ── Auth area: avatar dropdown when signed in, buttons when not ── */}
        {user ? (
          <div className="relative">
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 flex items-center gap-2"
              onClick={() => setShowUserMenu((prev) => !prev)}
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              <div className="h-10 w-10 sm:h-[54px] sm:w-[50px] shadow-[0px_4px_0px_rgba(236,_228,_183,_0.75)] rounded-full bg-darkslateblue flex items-center justify-center text-wheat-100 font-bold text-num-16 sm:text-num-20 font-inter uppercase select-none">
                {displayName.charAt(0)}
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-darkslateblue rounded-xl shadow-lg border border-solid border-wheat-100/20 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-solid border-wheat-100/10">
                  <p className="m-0 text-num-14 font-semibold font-inter text-wheat-100 truncate">
                    {displayName}
                  </p>
                  {user.email && (
                    <p className="m-0 mt-0.5 text-[12px] font-inter text-wheat-100/60 truncate">
                      {user.email}
                    </p>
                  )}
                  {roleLabel && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-wheat-100/15 text-[11px] font-semibold font-inter text-wheat-100 uppercase tracking-wide">
                      {roleLabel}
                    </span>
                  )}
                </div>
                <Link
                  to="/dashboard"
                  className="block w-full bg-transparent border-none px-4 py-3 text-left text-num-14 font-semibold font-inter text-wheat-100 hover:bg-wheat-100/10 transition-colors duration-150 no-underline"
                  onClick={() => setShowUserMenu(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="cursor-pointer w-full bg-transparent border-none px-4 py-3 text-left text-num-14 font-semibold font-inter text-sienna hover:bg-wheat-100/10 transition-colors duration-150"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[49px] w-auto md:w-52 relative flex items-start gap-3 md:gap-4">
            <NavButton label="LOGIN" variant="outline" onClick={onLoginClick} />
            <NavButton label="SIGN UP" variant="primary" onClick={onSignUpClick} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
