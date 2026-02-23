import type { FunctionComponent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoBadge from "../components/LogoBadge";
import NavButton from "../components/NavButton";

/**
 * Header - Top navigation bar with brand wordmark, navigation links,
 * and Login/Sign Up buttons (or user dropdown when signed in).
 */

interface HeaderProps {
  onProductsClick?: () => void;
  onDesignsClick?: () => void;
  onBrandsClick?: () => void;
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
  onLogoClick?: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({
  onProductsClick,
  onDesignsClick,
  onBrandsClick,
  onSignUpClick,
  onLoginClick,
  onLogoClick,
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

  return (
    <header className="self-stretch flex items-start justify-end pt-0 px-4 sm:px-6 md:px-10 lg:px-[75px] pb-8 md:pb-[68px] box-border max-w-full shrink-0 text-left text-num-32 text-darkslateblue font-pacifico">
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-5 max-w-full">
        {/* Brand wordmark */}
        <div className="w-auto md:w-52 flex flex-col items-start py-0 pl-0 pr-0 md:pr-5 box-border">
          <Link to="/" className="no-underline text-inherit">
            <h1 className="m-0 relative text-[length:inherit] font-normal font-[inherit]">
              Kyrant
            </h1>
          </Link>
        </div>

        {/* Navigation pill bar */}
        <nav
          className="w-full sm:w-auto md:w-[438px] shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] rounded-num-30 bg-wheat-100 flex items-center sm:items-start pt-[3px] px-1.5 pb-1.5 box-border gap-3 sm:gap-[42px] max-w-full text-center text-num-14 sm:text-num-18 font-bricolage-grotesque"
          aria-label="Main navigation"
        >
          {/* Logo badge + nav links */}
          <div className="flex items-center sm:items-start gap-2 sm:gap-[15px] shrink-0">
            <LogoBadge onClick={onLogoClick} />
            <div className="flex-1 flex flex-col items-start pt-[11px] px-0 pb-0">
              <Link
                to="/products"
                className="m-0 self-stretch relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque inline-block min-w-0 sm:min-w-[100px] cursor-pointer z-[1] no-underline text-darkslateblue underline"
                onClick={onProductsClick}
              >
                PRODUCTS
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start pt-[11px] px-0 pb-0 shrink-0">
            <Link
              to="/designs"
              className="m-0 relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque cursor-pointer z-[1] no-underline text-darkslateblue"
              onClick={onDesignsClick}
            >
              DESIGNS
            </Link>
          </div>

          <div className="flex flex-col items-start pt-[11px] px-0 pb-0 shrink-0">
            <Link
              to="/about"
              className="m-0 relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque cursor-pointer z-[1] no-underline text-darkslateblue"
              onClick={onBrandsClick}
            >
              ABOUT
            </Link>
          </div>
        </nav>

        {/* Authentication area — avatar dropdown when signed in, buttons when not */}
        {user ? (
          <div className="relative h-[49px] flex items-center">
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 flex items-center gap-2"
              onClick={() => setShowUserMenu((prev) => !prev)}
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              <div className="h-10 w-10 shadow-[0px_4px_0px_rgba(236,_228,_183,_0.75)] rounded-full bg-darkslateblue flex items-center justify-center text-wheat-100 font-bold text-num-16 font-inter uppercase select-none">
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
