import type { FunctionComponent } from "react";

/**
 * Footer - Full-width site footer with brand info, navigation links organized
 * in columns (Learn, Start Selling, Kyrant), social media icons, and legal links.
 * Uses the sienna (dark orange-brown) background color.
 */

interface FooterProps {
  onProductsClick?: () => void;
  onDesignsClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const Footer: FunctionComponent<FooterProps> = ({
  onProductsClick,
  onDesignsClick,
  onPrivacyClick,
  onTermsClick,
}) => {
  return (
    <footer className="self-stretch bg-sienna flex flex-col items-start pt-8 sm:pt-[51px] px-4 sm:px-6 md:px-[50px] pb-5 sm:pb-[29px] box-border gap-10 sm:gap-[84px] max-w-full shrink-0 text-center text-num-20 text-chocolate font-tanker">
      {/* Main footer content */}
      <div className="w-full lg:w-[1239px] flex items-start py-0 px-0 sm:px-[49px] box-border max-w-full shrink-0 text-num-13 text-darkslategray-100 font-inter lg:pl-6 lg:pr-6 lg:box-border">
        <div className="flex-1 flex flex-col items-end gap-[9.5px] max-w-full">
          {/* Top row: Brand + Column headers */}
          <div className="self-stretch flex items-start justify-end py-0 pl-0 pr-0 sm:pr-[9px] box-border max-w-full text-left text-num-17">
            <div className="flex-1 flex flex-col items-end gap-px max-w-full">
              {/* Column headers row */}
              <div className="w-full lg:w-[1093px] flex flex-col sm:flex-row items-start justify-between gap-5 max-w-full flex-wrap">
                {/* Brand wordmark */}
                <div className="w-full sm:w-[185px] flex flex-col items-start pt-[1px] pb-0 pl-0 pr-0 sm:pr-5 box-border text-[40px] font-pacifico">
                  <h2 className="m-0 relative text-[length:inherit] font-normal font-[inherit] z-[1]">
                    Kyrant
                  </h2>
                </div>

                {/* LEARN column header */}
                <div className="flex flex-col items-start pt-[7px] pb-0 pl-0 pr-0 sm:pr-10 text-center">
                  <div className="flex flex-col items-start gap-[22px]">
                    <b className="w-[75px] h-9 relative inline-block shrink-0 z-[1]">
                      LEARN
                    </b>
                    <div className="flex items-start py-0 pl-[9px] pr-0 text-num-13">
                      <b className="relative z-[1]">HOW IT WORKS</b>
                    </div>
                  </div>
                </div>

                {/* START SELLING column header */}
                <div className="flex flex-col items-start gap-[29px]">
                  <b className="h-9 relative flex items-center shrink-0 z-[1]">
                    START SELLING
                  </b>
                  <b
                    className="relative text-num-13 text-center cursor-pointer z-[1]"
                    onClick={onDesignsClick}
                    role="button"
                    tabIndex={0}
                  >
                    DESIGNS
                  </b>
                </div>

                {/* KYRANT column header */}
                <div className="w-[87px] flex flex-col items-start gap-[29px] text-center">
                  <b className="self-stretch h-9 relative flex items-center justify-center shrink-0 z-[1]">
                    KYRANT
                  </b>
                  <div className="flex items-start py-0 px-[7px] text-num-13">
                    <b className="relative z-[1]">ABOUT</b>
                  </div>
                </div>
              </div>

              {/* Second row: Tagline + Sub-links */}
              <div className="self-stretch flex items-start justify-end py-0 pl-0 pr-0 sm:pr-[19px] box-border max-w-full text-center text-num-13">
                <div className="flex-1 flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-5 max-w-full flex-wrap">
                  {/* Brand tagline */}
                  <div className="w-full sm:w-[267px] flex flex-col items-start shrink-0 text-[16px]">
                    <span className="w-[209px] relative font-black flex items-center justify-center z-[1]">
                      DESIGN, ORDER, EARN.
                    </span>
                  </div>

                  <div className="flex flex-col items-start pt-0 sm:pt-[14px] px-0 pb-0 shrink-0">
                    <b className="relative z-[1]">START A CLOTHING BRAND</b>
                  </div>

                  <div className="w-full sm:w-[177px] flex flex-col items-start pt-0 sm:pt-[14px] px-0 pb-0 box-border shrink-0">
                    <b
                      className="relative cursor-pointer z-[1]"
                      onClick={onProductsClick}
                      role="button"
                      tabIndex={0}
                    >
                      PRODUCTS
                    </b>
                  </div>

                  <div className="flex flex-col items-start pt-0 sm:pt-[14px] px-0 pb-0 shrink-0">
                    <b className="relative z-[1]">CAREERS</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social icons + more links row */}
          <div className="self-stretch flex items-start justify-start sm:justify-end py-0 pl-0 sm:pl-3 pr-0 sm:pr-8 box-border max-w-full">
            <div className="flex-1 flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-5 max-w-full flex-wrap">
              {/* Social media icons */}
              <nav
                className="self-stretch flex items-center gap-[12.5px] z-[3]"
                aria-label="Social media links"
              >
                <a href="#" aria-label="TikTok">
                  <img
                    className="h-[27px] w-[27px] relative"
                    alt="TikTok"
                    src="/assets/Tiktok.svg"
                  />
                </a>
                <a href="#" aria-label="Instagram">
                  <img
                    className="h-[27px] w-[27px] relative"
                    alt="Instagram"
                    src="/assets/Instagram.svg"
                  />
                </a>
                <a href="#" aria-label="Facebook">
                  <img
                    className="h-[27px] w-[27px] relative"
                    alt="Facebook"
                    src="/assets/Facebook.svg"
                  />
                </a>
                <a href="#" aria-label="Twitter">
                  <img
                    className="h-[27px] w-[27px] relative"
                    alt="Twitter"
                    src="/assets/Twitter.svg"
                  />
                </a>
                <a href="#" aria-label="YouTube">
                  <img
                    className="h-[27px] w-[27px] relative"
                    alt="YouTube"
                    src="/assets/Youtube.svg"
                  />
                </a>
              </nav>

              <div className="w-full sm:w-[102px] flex flex-col items-start pt-1 pb-0 pl-0 pr-0 sm:pr-[41px] box-border">
                <b className="relative z-[1]">PRICING</b>
              </div>

              <div className="w-full sm:w-[378px] flex flex-col items-start pt-1 px-0 pb-0 box-border max-w-full">
                <div className="self-stretch flex items-start justify-between gap-5 flex-wrap">
                  <b className="relative z-[1]">CUSTOM T-SHIRTS</b>
                  <b
                    className="relative cursor-pointer z-[1]"
                    onClick={onPrivacyClick}
                    role="button"
                    tabIndex={0}
                  >
                    PRIVACY
                  </b>
                </div>
              </div>
            </div>
          </div>

          {/* Additional links rows */}
          <div className="w-full sm:w-[412px] flex flex-col items-start gap-[15px] max-w-full">
            <div className="w-full sm:w-[371px] flex items-start py-0 px-0.5 box-border max-w-full">
              <div className="flex-1 flex items-start justify-between gap-5 max-w-full flex-wrap">
                <b className="relative z-[1]">CUSTOM HOODIES</b>
                <b
                  className="relative cursor-pointer z-[1]"
                  onClick={onTermsClick}
                  role="button"
                  tabIndex={0}
                >
                  TERMS
                </b>
              </div>
            </div>

            <div className="self-stretch flex items-start py-0 pl-[1px] pr-0 box-border max-w-full">
              <div className="flex-1 flex items-start justify-between gap-5 max-w-full">
                <b className="relative z-[1]">CUSTOM SWEATSHIRTS</b>
                <b className="relative z-[1]">HELP CENTER</b>
              </div>
            </div>

            <div className="self-stretch flex items-start justify-between gap-5">
              <b className="relative z-[1]">BULK ORDERS</b>
              <b className="relative z-[1]">CONTACT US</b>
            </div>

            <div className="flex items-start">
              <b className="relative z-[1] shrink-0">CUSTOM BRANDING</b>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider + legal links */}
      <div className="w-full lg:w-[1328px] flex flex-col items-start gap-[26px] max-w-full shrink-0 text-num-13 text-darkslategray-200 font-inter-28pt">
        {/* Horizontal rule */}
        <div className="self-stretch h-px flex items-start py-0 pl-3 pr-0 box-border max-w-full">
          <div className="self-stretch flex-1 relative border-darkslategray-100 border-solid border-t-[1px] box-border max-w-full z-[1]" />
        </div>

        {/* Legal links and copyright */}
        <div className="w-full sm:w-[426px] flex flex-col items-start gap-[15px] max-w-full">
          <div className="self-stretch flex items-start gap-[15px] flex-wrap">
            <b
              className="relative underline inline-block min-w-[123px] whitespace-nowrap cursor-pointer z-[1]"
              onClick={onTermsClick}
              role="button"
              tabIndex={0}
            >
              TERMS OF SERVICE
            </b>
            <b
              className="relative underline inline-block min-w-[106px] whitespace-nowrap cursor-pointer z-[1]"
              onClick={onPrivacyClick}
              role="button"
              tabIndex={0}
            >
              PRIVACY POLICY
            </b>
            <b className="relative underline whitespace-nowrap z-[1]">
              INTELLECTUAL PROPERTY
            </b>
          </div>

          {/* Copyright */}
          <b className="relative z-[1]">
            {`2026, `}
            <span className="uppercase">All rights reserved</span>
          </b>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
