import type { FunctionComponent } from "react";
import LogoBadge from "../components/LogoBadge";
import NavButton from "../components/NavButton";

/**
 * Header - Top navigation bar with brand wordmark, navigation links,
 * and Login/Sign Up buttons. Features a warm wheat-colored pill nav.
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
  return (
    <header className="self-stretch flex items-start justify-end pt-0 px-4 sm:px-6 md:px-10 lg:px-[75px] pb-8 md:pb-[68px] box-border max-w-full shrink-0 text-left text-num-32 text-darkslateblue font-pacifico">
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-5 max-w-full">
        {/* Brand wordmark */}
        <div className="w-auto md:w-52 flex flex-col items-start py-0 pl-0 pr-0 md:pr-5 box-border">
          <h1 className="m-0 relative text-[length:inherit] font-normal font-[inherit]">
            Kyrant
          </h1>
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
              <a
                className="m-0 self-stretch relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque inline-block min-w-0 sm:min-w-[100px] cursor-pointer z-[1] no-underline text-darkslateblue"
                onClick={onProductsClick}
                role="button"
                tabIndex={0}
              >
                PRODUCTS
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start pt-[11px] px-0 pb-0 shrink-0">
            <a
              className="m-0 relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque cursor-pointer z-[1] no-underline text-darkslateblue"
              onClick={onDesignsClick}
              role="button"
              tabIndex={0}
            >
              DESIGNS
            </a>
          </div>

          <div className="flex flex-col items-start pt-[11px] px-0 pb-0 shrink-0">
            <a
              className="m-0 relative text-num-14 sm:text-num-18 font-bold font-bricolage-grotesque cursor-pointer z-[1] no-underline text-darkslateblue"
              onClick={onBrandsClick}
              role="button"
              tabIndex={0}
            >
              BRANDS
            </a>
          </div>
        </nav>

        {/* Authentication buttons */}
        <div className="h-[49px] w-auto md:w-52 relative flex items-start gap-3 md:gap-4">
          <NavButton label="LOGIN" variant="outline" onClick={onLoginClick} />
          <NavButton label="SIGN UP" variant="primary" onClick={onSignUpClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
