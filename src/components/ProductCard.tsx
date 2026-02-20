import type { FunctionComponent } from "react";

/**
 * ProductCard - Displays a product image with its name and starting price.
 * Used within the Popular Products section.
 *
 * @param image - Path to the product image
 * @param name - Product category name (e.g., "T-SHIRTS")
 * @param price - Starting price string (e.g., "N1,999")
 */

interface ProductCardProps {
  className?: string;
  image: string;
  name: string;
  price: string;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
  className = "",
  image,
  name,
  price,
}) => {
  return (
    <div
      className={`h-auto sm:h-[294px] w-full sm:w-[299px] flex items-start pt-4 sm:pt-[23px] pb-4 px-4 sm:px-[27px] box-border relative isolate ${className}`}
    >
      {/* Card background */}
      <div className="absolute inset-0 shadow-[0px_4px_0px_rgba(145,_66,_42,_0.65)] rounded-num-10 bg-sienna z-0 shrink-0" />

      {/* Card content */}
      <div className="h-auto sm:h-64 w-full sm:w-[246px] flex flex-col items-center relative isolate gap-4 sm:gap-[25px] z-[1] shrink-0 text-center text-num-13 text-sandybrown font-bricolage-grotesque">
        {/* Product image with wheat background */}
        <div className="relative w-full sm:w-[246px] h-[160px] sm:h-[196px]">
          <div className="absolute inset-0 rounded-num-7 bg-wheat-100 z-[1]" />
          <img
            className="w-full sm:w-[246px] h-[160px] sm:h-[196px] relative object-cover z-[3]"
            alt={name}
            src={image}
            loading="lazy"
          />
        </div>

        {/* Product name and price */}
        <div className="flex flex-col items-center gap-0.5">
          <b className="tracking-num-0_07 text-num-13">{name}</b>
          <span className="font-light font-inter text-num-13 whitespace-pre-wrap">
            Starting at  {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
