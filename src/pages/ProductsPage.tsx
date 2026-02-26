import { useCallback } from "react";
import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * ProductsPage — Product catalog page displaying all available
 * product categories (iPhone Cases, Tote Bags, Caps, Hoodies,
 * Sweatshirts, Mugs) in a responsive card grid.
 *
 * Layout:
 * 1. Header — Shared navigation with "PRODUCTS" link active/underlined
 * 2. Hero banner — Full-width decorative banner image
 * 3. Product Catalog title — Uppercase heading with brand text shadow
 * 4. Product grid — 4-column responsive card layout (6 categories)
 * 5. Footer — Shared site footer
 */

/* ── Product category data ── */

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "iphone-cases",
    title: "SLEEK IPHONE CASE",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/iphone-case@3x.png",
  },
  {
    id: "tote-bags",
    title: "TOTE BAGS",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/Tote-bags@3x.png",
  },
  {
    id: "caps",
    title: "CAPS",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/Caps@3x.png",
  },
  {
    id: "hoodies",
    title: "HOODIES",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/Hoodies@3x.png",
  },
  {
    id: "sweatshirts",
    title: "SWEATSHIRTS",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/Tshirts@3x.png",
  },
  {
    id: "mugs",
    title: "MUGS",
    description:
      "Custom durable iPhone cases for your phone with high quality prints",
    image: "/assets/iphone-case1@3x.png",
  },
];

/* ── Component ── */

const ProductsPage: FunctionComponent = () => {
  const navigate = useNavigate();

  /* Navigation callbacks */
  const onSignUpClick = useCallback(() => navigate("/onboarding"), [navigate]);
  const onLoginClick = useCallback(
    () => navigate("/login/merchant"),
    [navigate]
  );

  const onCategoryClick = useCallback(
    (categoryId: string) => {
      /* Navigate to individual category — future route */
      navigate(`/products/${categoryId}`);
    },
    [navigate]
  );

  return (
    <div className="w-full relative bg-darkslategray-100 flex flex-col items-end pt-6 sm:pt-11.5 px-0 pb-0 box-border gap-0 leading-[normal] tracking-[normal] overflow-x-hidden">
      {/* ── Header ── */}
      <Header
        activeLink="products"
        onSignUpClick={onSignUpClick}
        onLoginClick={onLoginClick}
      />

      {/* ── Main content ── */}
      <main className="self-stretch flex flex-col items-center gap-0">
        {/* Hero banner */}
        <section
          className="self-stretch h-50 sm:h-75 md:h-91 relative overflow-hidden"
          aria-label="Products hero banner"
        >
          <img
            className="w-full h-full object-cover"
            alt="Product catalog banner"
            src="/assets/top@2x.png"
          />
        </section>

        {/* Product Catalog heading */}
        <section className="self-stretch flex flex-col items-center pt-12 sm:pt-18 px-4 sm:px-7.5 pb-6 sm:pb-6.75">
          <h1
            className="m-0 relative text-[28px] sm:text-[32px] md:text-[36px] uppercase font-extrabold font-inter text-wheat-100 inline-block"
            style={{
              textShadow: "-3.6px 3.6px 0px rgba(105, 72, 115, 0.75)",
            }}
          >
            Product Catalog
          </h1>
        </section>

        {/* ── Product category grid ── */}
        <section
          className="self-stretch flex flex-col items-center px-4 sm:px-7.5 pb-16 sm:pb-24 md:pb-47.5 gap-[17.5px]"
          aria-label="Product categories"
        >
          {/* Row 1 — 4 cards */}
          <div className="w-full flex items-stretch justify-center flex-wrap gap-[17.5px] max-w-304">
            {PRODUCT_CATEGORIES.slice(0, 4).map((category) => (
              <button
                key={category.id}
                type="button"
                className="cursor-pointer border-none p-0 bg-transparent text-left flex-1 min-w-65 max-w-72.5"
                onClick={() => onCategoryClick(category.id)}
                aria-label={`View ${category.title}`}
              >
                <div
                  className="w-full h-89 flex flex-col justify-end items-start pb-7.75 pl-5 pr-10.5 gap-[12.7px] bg-cover bg-no-repeat bg-top rounded-[22px] shadow-[-9.5px_9.5px_0px_rgba(105,72,115,0.75)] transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                  }}
                >
                  <b className="relative text-[14.2px] font-inter text-wheat-100 uppercase">
                    {category.title}
                  </b>
                  <p className="m-0 relative text-[14.2px] font-light font-inter text-wheat-100 max-w-55">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Row 2 — 2 cards */}
          <div className="w-full flex items-stretch justify-start flex-wrap gap-[17.5px] max-w-304">
            {PRODUCT_CATEGORIES.slice(4).map((category) => (
              <button
                key={category.id}
                type="button"
                className="cursor-pointer border-none p-0 bg-transparent text-left flex-1 min-w-65 max-w-72.5"
                onClick={() => onCategoryClick(category.id)}
                aria-label={`View ${category.title}`}
              >
                <div
                  className="w-full h-89 flex flex-col justify-end items-start pb-7.75 pl-5 pr-10.5 gap-[12.7px] bg-cover bg-no-repeat bg-top rounded-[22px] shadow-[-9.5px_9.5px_0px_rgba(105,72,115,0.75)] transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                  }}
                >
                  <b className="relative text-[14.2px] font-inter text-wheat-100 uppercase">
                    {category.title}
                  </b>
                  <p className="m-0 relative text-[14.2px] font-light font-inter text-wheat-100 max-w-55">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default ProductsPage;
