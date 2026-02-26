import { useCallback, useState } from "react";
import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DesignCard from "../components/DesignCard";
import Footer from "../components/Footer";

/**
 * DesignsPage — Full designs catalog page.
 *
 * Layout:
 * 1. Header — Shared nav with "DESIGNS" link active/underlined
 * 2. Hero banner — Full-width decorative banner image
 * 3. Bestsellers — Horizontal row of top-selling design cards
 * 4. Designs grid — 4-column grid of all designs with sort dropdown
 * 5. Pagination — Page navigation (Prev 1 2 3 4 5 Next)
 * 6. Footer — Shared site footer
 */

/* ── Bestselling designs data ── */

interface DesignItem {
  imageSrc: string;
  title: string;
  designer: string;
  price: string;
  colourOptions: string;
}

const BESTSELLING_DESIGNS: DesignItem[] = [
  {
    imageSrc: "/assets/merged-asset-5@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-6@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-7@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-8@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-4@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
];

/* ── All designs grid data (12 cards, 3 rows × 4 columns) ── */

const ALL_DESIGNS: DesignItem[] = [
  {
    imageSrc: "/assets/Frame@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame1@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame2@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame3@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame4@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame5@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame6@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/Frame7@3x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-9@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-10@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-11@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
  {
    imageSrc: "/assets/merged-asset-4@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
];

/* ── Sort options ── */

const SORT_OPTIONS = [
  "Most Popular",
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
] as const;

/* ── Component ── */

const DesignsPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 5;

  /* Navigation callbacks (only for unauthenticated header buttons) */
  const onSignUpClick = useCallback(() => navigate("/onboarding"), [navigate]);
  const onLoginClick = useCallback(
    () => navigate("/login/merchant"),
    [navigate]
  );

  return (
    <div className="w-full relative bg-darkslategray-100 flex flex-col items-end pt-6 sm:pt-11.5 px-0 pb-0 box-border gap-0 leading-[normal] tracking-[normal] overflow-x-hidden">
      {/* ── Header ── */}
      <Header
        activeLink="designs"
        onSignUpClick={onSignUpClick}
        onLoginClick={onLoginClick}
      />

      {/* ── Main content ── */}
      <main className="self-stretch flex flex-col items-center gap-0">
        {/* Hero banner */}
        <section
          className="self-stretch h-50 sm:h-75 md:h-91 relative overflow-hidden"
          aria-label="Designs hero banner"
        >
          <img
            className="w-full h-full object-cover"
            alt="Designs catalog banner"
            src="/assets/top@2x.png"
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════
            Bestsellers section
            ═══════════════════════════════════════════════════════════ */}
        <section
          className="self-stretch flex flex-col items-center pt-12 sm:pt-18 px-4 sm:px-7.5 pb-10 sm:pb-16 gap-6 sm:gap-10"
          aria-label="Bestselling designs"
        >
          <h2
            className="m-0 w-full max-w-[1328px] relative text-[28px] sm:text-[32px] md:text-[36px] uppercase font-extrabold font-bricolage-grotesque text-wheat-100 inline-block"
            style={{
              textShadow: "-3.6px 3.6px 0px rgba(105, 72, 115, 0.75)",
            }}
          >
            Bestsellers
          </h2>

          {/* Bestseller design cards — horizontal scroll on mobile, 5-col grid on desktop */}
          <div className="w-full max-w-[1328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-[30.2px]">
            {BESTSELLING_DESIGNS.map((design, index) => (
              <DesignCard
                key={`bestseller-${index}`}
                imageSrc={design.imageSrc}
                title={design.title}
                designer={design.designer}
                price={design.price}
                colourOptions={design.colourOptions}
              />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            All Designs section with sort + grid + pagination
            ═══════════════════════════════════════════════════════════ */}
        <section
          className="self-stretch flex flex-col items-center px-4 sm:px-7.5 pb-16 sm:pb-24 md:pb-32 gap-6 sm:gap-10"
          aria-label="All designs"
        >
          {/* Heading + Sort dropdown row */}
          <div className="w-full max-w-[1328px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2
              className="m-0 relative text-[28px] sm:text-[32px] md:text-[36px] uppercase font-extrabold font-bricolage-grotesque text-wheat-100 inline-block"
              style={{
                textShadow: "-3.6px 3.6px 0px rgba(105, 72, 115, 0.75)",
              }}
            >
              Designs
            </h2>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                type="button"
                className="cursor-pointer border-none shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] rounded-[30px] bg-wheat-100 flex items-center gap-2 px-5 py-2.5 text-num-14 sm:text-num-16 font-semibold font-bricolage-grotesque text-darkslateblue"
                onClick={() => setShowSortDropdown((prev) => !prev)}
                aria-expanded={showSortDropdown}
                aria-haspopup="listbox"
              >
                <span>Sort by:</span>
                <span className="font-normal">{sortBy}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showSortDropdown && (
                <ul
                  className="absolute right-0 top-full mt-2 w-52 bg-wheat-100 rounded-xl shadow-lg border border-solid border-darkslateblue/10 overflow-hidden z-50 list-none p-0 m-0"
                  role="listbox"
                  aria-label="Sort options"
                >
                  {SORT_OPTIONS.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={`cursor-pointer w-full bg-transparent border-none px-4 py-3 text-left text-num-14 font-bricolage-grotesque transition-colors duration-150 ${
                          sortBy === option
                            ? "font-bold text-darkslateblue bg-darkslateblue/5"
                            : "font-normal text-darkslateblue hover:bg-darkslateblue/5"
                        }`}
                        role="option"
                        aria-selected={sortBy === option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Design cards grid — 4 per row, 3 rows = 12 cards */}
          <div className="w-full max-w-[1328px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[30.2px]">
            {ALL_DESIGNS.map((design, index) => (
              <DesignCard
                key={`design-${index}`}
                imageSrc={design.imageSrc}
                title={design.title}
                designer={design.designer}
                price={design.price}
                colourOptions={design.colourOptions}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          <nav
            className="flex items-center justify-center gap-0 mt-6 sm:mt-10"
            aria-label="Pagination"
          >
            <div className="shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] rounded-[30px] bg-darkslateblue flex items-center overflow-hidden">
              {/* Previous button */}
              <button
                type="button"
                className={`cursor-pointer border-none px-4 sm:px-5 py-2.5 text-num-14 sm:text-num-16 font-semibold font-bricolage-grotesque transition-colors duration-150 ${
                  currentPage === 1
                    ? "text-wheat-100/30 bg-transparent cursor-not-allowed"
                    : "text-wheat-100 bg-transparent hover:bg-wheat-100/10"
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    className={`cursor-pointer border-none w-9 sm:w-10 py-2.5 text-num-14 sm:text-num-16 font-bricolage-grotesque transition-colors duration-150 ${
                      currentPage === page
                        ? "font-bold text-darkslateblue bg-wheat-100 rounded-full"
                        : "font-normal text-wheat-100 bg-transparent hover:bg-wheat-100/10"
                    }`}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next button */}
              <button
                type="button"
                className={`cursor-pointer border-none px-4 sm:px-5 py-2.5 text-num-14 sm:text-num-16 font-semibold font-bricolage-grotesque transition-colors duration-150 ${
                  currentPage === totalPages
                    ? "text-wheat-100/30 bg-transparent cursor-not-allowed"
                    : "text-wheat-100 bg-transparent hover:bg-wheat-100/10"
                }`}
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </nav>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default DesignsPage;
