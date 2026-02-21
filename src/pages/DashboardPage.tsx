import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import LogoBadge from "../components/LogoBadge";
import BestSellingProductCard from "../components/BestSellingProductCard";
import DesignCard from "../components/DesignCard";
import ProductCategoryCard from "../components/ProductCategoryCard";
import Footer from "../components/Footer";

/**
 * DashboardPage — Main storefront dashboard (1440 × 3868).
 *
 * Sections:
 * 1. Header – Kyrant wordmark, pill nav (K, PRODUCTS, DESIGNS, BRANDS), user avatar
 * 2. Hero Banner – "NEW Collection" with background image, "UP TO 20%"
 * 3. Best-Selling Products – 4 product cards (1 featured + 3 sweatpants)
 * 4. Best-Selling Designs – 5 anime design cards with wishlist icons
 * 5. Products – 5 product category cards (iPhone Case, Tote Bags, Caps, Hoodies, Sweatshirts)
 * 6. Designs – 5 more design cards
 * 7. Bottom Banner – full-width decorative image
 * 8. Footer – brand info, link columns, social icons, legal
 *
 * Routes here from: LogoBadge (K) click on landing page → `/dashboard`
 */

/* ── Static data ── */

const bestSellingProducts = [
  {
    imageSrc: "/assets/merged-asset-1@2x.png",
    name: "Male Sweatpants",
    seller: "By Kyrant",
    price: "₦ 2499",
    variants: "6 sizes • 7 colours • 3 suppliers",
  },
  {
    imageSrc: "/assets/merged-asset-2@2x.png",
    name: "Male Sweatpants",
    seller: "By Kyrant",
    price: "₦ 2499",
    variants: "6 sizes • 7 colours • 3 suppliers",
  },
  {
    imageSrc: "/assets/merged-asset-3@2x.png",
    name: "Male Sweatpants",
    seller: "By Kyrant",
    price: "₦ 2499",
    variants: "6 sizes • 7 colours • 3 suppliers",
  },
];

const bestSellingDesigns = [
  {
    imageSrc: "/assets/merged-asset-4@2x.png",
    title: "Jujitsu Kaisen - Gojo x Mahito",
    designer: "By AnimeL0ver0032",
    price: "₦ 249",
    colourOptions: "7 colour options",
  },
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
];

const productCategories = [
  {
    title: "SLEEK IPHONE CASE",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    backgroundImage: "/assets/iphone-case@3x.png",
  },
  {
    title: "Tote Bags",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    backgroundImage: "/assets/Tote-bags@3x.png",
  },
  {
    title: "Caps",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    backgroundImage: "/assets/Caps@3x.png",
  },
  {
    title: "Hoodies",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    backgroundImage: "/assets/Hoodies@3x.png",
  },
  {
    title: "SWEATSHIRTS",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    backgroundImage: "/assets/Tshirts@3x.png",
  },
];

const designsData = [
  {
    imageSrc: "/assets/merged-asset-8@2x.png",
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
];

const DashboardPage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative bg-darkslategray-100 flex flex-col items-start pt-4 sm:pt-[25px] px-0 pb-0 box-border gap-4 sm:gap-[26px] text-left text-num-14 sm:text-num-16 text-wheat-100 font-inter-28pt">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — Dashboard Header
          ═══════════════════════════════════════════════════════════ */}
      <header className="self-stretch flex items-start justify-center py-0 px-4 sm:px-[30px] text-left text-num-20 sm:text-num-32 text-darkslateblue font-pacifico">
        <div className="flex-1 flex items-center sm:items-start justify-between flex-wrap content-start gap-x-4 gap-y-2.5 max-w-[1290px]">
          {/* Kyrant wordmark — navigates to landing page */}
          <div
            className="flex items-start cursor-pointer"
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to landing page"
          >
            <h2 className="m-0 w-auto sm:w-[104px] relative text-num-20 sm:text-num-32 font-normal font-pacifico inline-block shrink-0">
              Kyrant
            </h2>
          </div>

          {/* Pill navigation bar */}
          <div className="flex-1 flex items-start py-0 pl-0 pr-0 sm:pr-[54px] box-border min-w-[240px] sm:min-w-[310px] max-w-[492px] text-center text-num-14 sm:text-num-18 font-bricolage-grotesque">
            <nav
              className="flex-1 shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] rounded-[30px] bg-wheat-100 flex items-center flex-wrap content-center pt-[3px] px-[5.9px] pb-[2.1px] gap-2 sm:gap-[16.5px] shrink-0"
              aria-label="Main navigation"
            >
              {/* K logo badge */}
              <div className="flex items-start pt-0 px-0 pb-[3.9px]">
                <LogoBadge />
              </div>

              {/* PRODUCTS link */}
              <div className="flex-1 flex items-start min-w-[70px] sm:min-w-[97px] max-w-[132px]">
                <b className="relative cursor-pointer text-num-14 sm:text-num-18">PRODUCTS</b>
              </div>

              {/* DESIGNS link */}
              <div className="flex-1 flex items-start min-w-[60px] sm:min-w-[80px] max-w-[113.5px]">
                <b className="relative cursor-pointer text-num-14 sm:text-num-18">DESIGNS</b>
              </div>

              {/* BRANDS link */}
              <b className="relative cursor-pointer text-num-14 sm:text-num-18">BRANDS</b>
            </nav>
          </div>

          {/* User avatar */}
          <img
            className="h-10 w-10 sm:h-[54px] sm:w-[50px] relative shadow-[0px_4px_0px_rgba(236,_228,_183,_0.75)] object-cover rounded-full"
            loading="lazy"
            alt="User avatar"
            src="/assets/merged-asset-12@2x.png"
          />
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — Hero Banner ("NEW Collection")
          ═══════════════════════════════════════════════════════════ */}
      <section className="self-stretch flex flex-col items-start gap-12 sm:gap-[100px] text-left text-num-14 text-wheat-100 font-inter-28pt">
        <div className="self-stretch bg-darkslateblue flex items-start shrink-0 text-[36px] sm:text-[52px] md:text-[64px] font-inter">
          <div
            className="flex-1 flex flex-col items-start pt-4 sm:pt-[25px] pb-8 sm:pb-[66px] px-4 sm:px-[30px] gap-4 sm:gap-[25.1px] bg-cover bg-no-repeat bg-top"
            style={{ backgroundImage: "url('/assets/BANNER@3x.png')" }}
          >
            {/* Banner inner content — centered */}
            <div className="self-stretch flex items-start justify-center shrink-0">
              <div className="flex-1 flex items-start justify-between flex-wrap content-start gap-x-0 gap-y-4 sm:gap-y-[30px] max-w-[332px] mx-auto">
                {/* "NEW" heading */}
                <div className="flex items-start pt-10 sm:pt-[88.9px] px-0 pb-0">
                  <h2 className="m-0 w-auto sm:w-[152px] relative text-[36px] sm:text-[52px] md:text-[64px] leading-[40px] sm:leading-[47px] font-medium font-inter inline-block shrink-0">
                    NEW
                  </h2>
                </div>
                {/* Kyrant script */}
                <div className="flex-1 relative text-num-20 font-pacifico inline-block min-w-[64px] max-w-[65px]">
                  Kyrant
                </div>
              </div>
            </div>

            {/* "Collection" heading */}
            <div className="self-stretch flex items-start justify-center pt-0 px-0 pb-2 sm:pb-[9.9px] shrink-0 text-[56px] sm:text-[80px] md:text-[128px] font-bricolage-grotesque">
              <h1 className="m-0 relative text-[56px] sm:text-[80px] md:text-[128px] font-normal font-bricolage-grotesque shrink-0">
                Collection
              </h1>
            </div>

            {/* "UP TO 20%" badge */}
            <div className="self-stretch flex items-start justify-center py-0 px-[4.8px] shrink-0 text-num-20">
              <b className="w-[61px] relative inline-block shrink-0">
                UP TO
                <br />
                20%
              </b>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — Best-Selling Products
            ═══════════════════════════════════════════════════════════ */}
        <div className="self-stretch flex flex-col items-center py-0 px-4 sm:px-[30px] gap-6 sm:gap-10 shrink-0 text-num-20 sm:text-num-40 font-bricolage-grotesque">
          {/* Section heading */}
          <h2 className="m-0 w-full relative text-num-20 sm:text-num-32 md:text-num-40 uppercase font-extrabold font-bricolage-grotesque inline-block [text-shadow:-4px_4px_0px_rgba(105,_72,_115,_0.75)] max-w-[1328px]">
            best-selling Products
          </h2>

          {/* Products grid: 1 featured + 3 cards */}
          <div className="w-full flex items-start flex-wrap content-start gap-4 sm:gap-[19.9px] max-w-[1328px]">
            {/* Featured product banner image */}
            <img
              className="h-[200px] sm:h-[300px] flex-1 relative shadow-[-8px_8px_0px_rgba(105,_72,_115,_0.75)] max-w-full overflow-hidden object-cover min-w-[260px] sm:min-w-[310px]"
              loading="lazy"
              alt="Featured product"
              src="/assets/rect-1@2x.png"
            />

            {/* Best-selling product cards */}
            {bestSellingProducts.map((product, index) => (
              <BestSellingProductCard
                key={index}
                imageSrc={product.imageSrc}
                name={product.name}
                seller={product.seller}
                price={product.price}
                variants={product.variants}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — Best-Selling Designs + Products + Designs
          ═══════════════════════════════════════════════════════════ */}
      <main className="self-stretch flex flex-col items-center pt-8 sm:pt-[77px] px-4 sm:px-[30px] pb-8 sm:pb-[74px] gap-12 sm:gap-[100px] text-left text-num-20 sm:text-num-40 text-wheat-100 font-bricolage-grotesque">
        {/* ── Best-Selling Designs ── */}
        <div className="w-full flex flex-col items-start gap-6 sm:gap-10 max-w-[1325px]">
          <h2 className="m-0 self-stretch relative text-num-20 sm:text-num-32 md:text-num-40 uppercase font-extrabold font-bricolage-grotesque [text-shadow:-4px_4px_0px_rgba(105,_72,_115,_0.75)]">
            best-Selling Designs
          </h2>

          <div className="self-stretch flex flex-col items-end gap-8 sm:gap-[62px] text-num-14 sm:text-num-16 font-inter-28pt">
            {/* Design cards row */}
            <div className="self-stretch grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[30.2px]">
              {bestSellingDesigns.map((design, index) => (
                <DesignCard
                  key={index}
                  imageSrc={design.imageSrc}
                  title={design.title}
                  designer={design.designer}
                  price={design.price}
                  colourOptions={design.colourOptions}
                />
              ))}
            </div>

            {/* "See more" link */}
            <div className="flex items-start py-0 pl-0 pr-[1.9px]">
              <button
                className="cursor-pointer border-none p-0 bg-transparent w-[113px] relative text-[27px] underline font-light font-inter-28pt text-darkslategray-100 text-left inline-block shrink-0"
                type="button"
                aria-label="See more best-selling designs"
              >
                See more
              </button>
            </div>
          </div>
        </div>

        {/* ── Products (Category Cards) ── */}
        <div className="w-full flex flex-col items-start gap-6 sm:gap-10 max-w-[1325px]">
          <h2 className="m-0 self-stretch relative text-num-20 sm:text-num-32 md:text-num-40 uppercase font-extrabold font-bricolage-grotesque [text-shadow:-4px_4px_0px_rgba(105,_72,_115,_0.75)]">
            Products
          </h2>

          <section
            className="self-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-[25px] text-left text-num-12 text-wheat-100 font-inter-28pt"
            aria-label="Product categories"
          >
            {productCategories.map((category, index) => (
              <ProductCategoryCard
                key={index}
                title={category.title}
                description={category.description}
                backgroundImage={category.backgroundImage}
              />
            ))}
          </section>
        </div>

        {/* ── Designs ── */}
        <div className="w-full flex flex-col items-start py-0 pl-0 pr-0 sm:pr-2 box-border gap-6 sm:gap-10 max-w-[1325px]">
          <h2 className="m-0 self-stretch relative text-num-20 sm:text-num-32 md:text-num-40 uppercase font-extrabold font-bricolage-grotesque [text-shadow:-4px_4px_0px_rgba(105,_72,_115,_0.75)]">
            Designs
          </h2>

          {/* Design cards row */}
          <div className="self-stretch grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[30.2px]">
            {designsData.map((design, index) => (
              <DesignCard
                key={index}
                imageSrc={design.imageSrc}
                title={design.title}
                designer={design.designer}
                price={design.price}
                colourOptions={design.colourOptions}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — Bottom Banner
          ═══════════════════════════════════════════════════════════ */}
      <section className="self-stretch flex items-start pt-0 px-0 pb-4 sm:pb-[39px]">
        <img
          className="h-[200px] sm:h-[300px] md:h-[410px] flex-1 relative max-w-full overflow-hidden object-cover shrink-0"
          loading="lazy"
          alt="Promotional banner"
          src="/assets/top-banner@2x.png"
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — Footer (reused from landing page)
          ═══════════════════════════════════════════════════════════ */}
      <Footer onTermsClick={() => navigate('/terms')} onPrivacyClick={() => navigate('/privacy')} />
    </div>
  );
};

export default DashboardPage;
