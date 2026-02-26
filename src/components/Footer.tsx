import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

/**
 * Footer - Full-width site footer with brand info, navigation links organized
 * in columns (Learn, Start Selling, Kyrant), social media icons, and legal links.
 * Uses the sienna (dark orange-brown) background color #91422A.
 */

const Footer: FunctionComponent = () => {
  return (
    <footer className="w-full bg-sienna flex flex-col items-center pt-12 md:pt-16 px-4 md:px-8 lg:px-12 pb-8 box-border text-center text-darkslategray-100 font-inter">
      {/* Main footer content */}
      <div className="w-full max-w-7xl flex flex-col items-center gap-12 md:gap-16">
        
        {/* Top section: Brand + 3 Columns */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-20 lg:gap-32">
          
          {/* Brand Column */}
          <div className="w-full md:w-auto flex flex-col items-start gap-6 md:gap-8">
            <Link to="/" className="no-underline text-inherit">
              <h2 className="m-0 text-[116px] md:text-[62px] leading-[1.1] font-normal font-pacifico text-darkslategray-100">
                Kyrant
              </h2>
            </Link>
            <p className="m-0 text-base md:text-lg font-black text-darkslategray-100">
              DESIGN, ORDER, EARN.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                className="w-7 h-7 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" fill="#16302B"/>
                  <path d="M19.1243 7.07255C18.4165 6.26302 18.0231 5.22427 18.0232 4.14794H14.8236V17.0074C14.7996 17.7034 14.5017 18.3631C14.0002 18.8465C13.4988 19.33 12.8301 19.6006 12.1332 19.6002C10.6608 19.6002 9.43695 18.3972 9.43695 16.9046C9.43695 15.1201 11.1584 13.7823 13.0145 14.3323V11.0549C9.35365 10.5782 6.2233 13.357 6.2233 16.9046C6.2233 20.357 9.08402 22.8149 12.4561 22.8149C15.8791 22.8149 18.523 20.1709 18.523 16.9046V10.3807C19.8234 11.3142 21.3831 11.8147 23.0 11.8119V8.60736C23.0 8.60736 20.8665 8.7003 19.1243 7.07255Z" fill="#91422A"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-7 h-7 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" fill="#16302B"/>
                  <path d="M14 5.77783H9.29412C6.91176 5.77783 4.98042 7.70915 4.98042 10.0916V14.7974C4.98042 17.1798 6.91176 19.1112 9.29412 19.1112H14C16.3824 19.1112 18.3137 17.1798 18.3137 14.7974V10.0916C18.3137 7.70915 16.3824 5.77783 14 5.77783Z" fill="#16302B" stroke="#91422A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.2065 15.2729C12.7685 15.2729 14.0348 14.0067 14.0348 12.4447C14.0348 10.8827 12.7685 9.61646 11.2065 9.61646C9.64453 9.61646 8.37827 10.8827 8.37827 12.4447C8.37827 14.0067 9.64453 15.2729 11.2065 15.2729Z" fill="#16302B" stroke="#91422A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.0448 8.24268C15.2454 8.24268 15.408 8.40536 15.4081 8.60596C15.4081 8.80666 15.2455 8.96924 15.0448 8.96924C14.8442 8.96912 14.6815 8.80658 14.6815 8.60596C14.6816 8.40544 14.8443 8.2428 15.0448 8.24268Z" fill="#233D4D" stroke="#91422A" strokeWidth="0.888889"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-7 h-7 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" fill="#16302B"/>
                  <path d="M15.2378 15.6446H17.1758L17.9377 12.4446H15.2378V10.8446C15.2378 10.0206 15.2378 9.24458 16.7949 9.24458H17.9377V6.55658C17.6894 6.52218 16.7515 6.44458 15.761 6.44458C13.6924 6.44458 12.2235 7.77018 12.2235 10.2046V12.4446H9.93774V15.6446H12.2235V22.4446H15.2378V15.6446Z" fill="#91422A"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X (Twitter)"
                className="w-7 h-7 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" fill="#16302B"/>
                  <path d="M9.22222 18.8891L13.916 12.4162M13.916 12.4162L9.22222 4.22241H12.1852L15.416 10.6953M13.916 12.4162L17.148 18.8891H20.111L15.416 10.6953M20.111 4.22241L15.416 10.6953" stroke="#91422A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-7 h-7 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" fill="#16302B"/>
                  <path d="M12.7555 16.7304L16.855 12.4447L12.7555 8.15892V16.7304ZM21.668 10.7647C21.766 11.1228 21.834 11.6028 21.879 12.2123C21.932 12.8218 21.955 13.3475 21.955 13.8047L22 14.4447C22 16.1132 21.879 17.3399 21.668 18.1247C21.479 18.8104 21.04 19.2523 20.36 19.4428C20.005 19.5418 19.356 19.6104 18.358 19.6561C17.376 19.7094 16.477 19.7323 15.646 19.7323L14.444 19.778C11.279 19.778 9.30698 17.6561 8.52798 17.4428C7.84798 17.2523 7.40998 16.8104 7.22098 16.1247C7.12298 15.7666 7.05498 15.2866 7.00998 14.677C6.95698 14.0675 6.93398 13.5418 6.93398 13.0847L6.88898 12.4447C6.88898 10.7761 7.00998 9.54942 7.22098 8.76466C7.40998 8.07895 7.84798 7.63704 8.52798 7.44657C8.88398 7.34752 9.53298 7.27895 10.531 7.23323C11.513 7.1799 12.412 7.15704 13.243 7.15704L14.444 7.11133C17.61 7.11133 19.582 7.23323 20.36 7.44657C21.04 7.63704 21.479 8.07895 21.668 8.76466Z" fill="#91422A"/>
                </svg>
              </a>
            </div>
          </div>

          {/* LEARN Column */}
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h3 className="m-0 text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider text-darkslategray-100">
              Learn
            </h3>
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <Link to="/how-it-works" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">HOW IT WORKS</span>
              </Link>
              <Link to="/pricing" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">PRICING</span>
              </Link>
              <Link to="/products?category=t-shirts" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CUSTOM T-SHIRTS</span>
              </Link>
              <Link to="/products?category=hoodies" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CUSTOM HOODIES</span>
              </Link>
              <Link to="/products?category=sweatshirts" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CUSTOM SWEATSHIRTS</span>
              </Link>
            </div>
          </div>

          {/* START SELLING Column */}
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h3 className="m-0 text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider text-darkslategray-100">
              Start Selling
            </h3>
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <Link to="/start-a-brand" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">START A CLOTHING BRAND</span>
              </Link>
              <Link to="/designs" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">DESIGNS</span>
              </Link>
              <Link to="/products" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">PRODUCTS</span>
              </Link>
              <Link to="/bulk-orders" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">BULK ORDERS</span>
              </Link>
              <Link to="/custom-branding" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CUSTOM BRANDING</span>
              </Link>
            </div>
          </div>

          {/* KYRANT Column */}
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h3 className="m-0 text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider text-darkslategray-100">
              Kyrant
            </h3>
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <Link to="/about" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">ABOUT</span>
              </Link>
              <Link to="/careers" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CAREERS</span>
              </Link>
              <Link to="/privacy" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">PRIVACY</span>
              </Link>
              <Link to="/terms" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">TERMS</span>
              </Link>
              <Link to="/help" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">HELP CENTER</span>
              </Link>
              <Link to="/contact" className="no-underline text-darkslategray-100 hover:opacity-80 transition-opacity text-sm md:text-base">
                <span className="font-bold">CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-darkslategray-100 opacity-30" />

        {/* Bottom legal row */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="flex flex-wrap items-start gap-4 md:gap-6">
            <Link to="/terms" className="no-underline text-darkslategray-100 text-xs md:text-sm hover:opacity-80 transition-opacity">
              <span className="font-bold underline" style={{ opacity: 0.65 }}>TERMS OF SERVICE</span>
            </Link>
            <Link to="/privacy" className="no-underline text-darkslategray-100 text-xs md:text-sm hover:opacity-80 transition-opacity">
              <span className="font-bold underline" style={{ opacity: 0.65 }}>PRIVACY POLICY</span>
            </Link>
            <Link to="/ip-policy" className="no-underline text-darkslategray-100 text-xs md:text-sm hover:opacity-80 transition-opacity">
              <span className="font-bold underline" style={{ opacity: 0.65 }}>INTELLECTUAL PROPERTY</span>
            </Link>
          </div>
          <p className="m-0 text-xs md:text-sm font-bold text-darkslategray-100" style={{ opacity: 0.65 }}>
            2026, ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
