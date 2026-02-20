import type { FunctionComponent } from "react";
import ProductCard from "../components/ProductCard";

/**
 * PopularProducts - Section showcasing popular product categories
 * (T-shirts, Hoodies, Tote Bags, Sweatshirts) with decorative
 * hand-drawn line art in the background.
 */

const PRODUCTS = [
  {
    image: "/assets/popular-product1.png",
    name: "T-SHIRTS",
    price: "N1,999",
  },
  {
    image: "/assets/popular-product2.png",
    name: "HOODIES",
    price: "N1,999",
  },
  {
    image: "/assets/popular-product3.png",
    name: "TOTE BAGS",
    price: "N1,999",
  },
  {
    image: "/assets/popular-product4.png",
    name: "SWEATSHIRTS",
    price: "N1,999",
  },
];

const PopularProducts: FunctionComponent = () => {
  return (
    <section
      className="self-stretch flex flex-col items-center relative py-10 sm:py-[75px] px-4 sm:px-5 box-border"
      aria-labelledby="popular-products-heading"
    >
      {/* Decorative curved line - right */}
      <img
        className="hidden sm:block w-[400px] md:w-[550px] lg:w-[694.7px] absolute right-0 bottom-0 max-h-full object-contain z-0 shrink-0 pointer-events-none"
        alt=""
        src="/assets/vecteezy-hand-drawn-curved-line-shape-curved-line-icon-21999204-2@2x.png"
      />

      {/* Decorative curved line - left */}
      <img
        className="hidden sm:block w-[400px] md:w-[550px] lg:w-[676.2px] absolute top-[71px] left-0 max-h-full object-contain z-[1] shrink-0 pointer-events-none"
        alt=""
        src="/assets/vecteezy-hand-drawn-curved-line-shape-curved-line-icon-21999204-1@2x.png"
      />

      {/* Large wheat-colored background oval */}
      <div className="w-[90%] sm:w-[1200px] h-[600px] sm:h-[856px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-num-501 bg-wheat-100 z-0" />

      {/* Section heading */}
      <div className="flex flex-col items-center gap-4 sm:gap-[25px] z-[6] mb-10 sm:mb-[100px]">
        <h2
          id="popular-products-heading"
          className="m-0 relative text-[36px] sm:text-[48px] md:text-[64px] font-extrabold font-bricolage-grotesque text-black"
        >
          Popular Products
        </h2>
        <p className="m-0 relative text-num-14 sm:text-num-17 md:text-num-20 font-normal font-inter text-gray text-center">
          Pick from a range of apparel, accessories, and home goods
        </p>
      </div>

      {/* Product cards grid */}
      <div className="flex items-start justify-center gap-0 z-[5] flex-wrap">
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
