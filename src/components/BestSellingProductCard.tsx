import type { FunctionComponent } from "react";

/**
 * BestSellingProductCard — Card for the "Best-Selling Products" section.
 * Displays a product image with shadow, product name, seller, price, and variant info.
 */

interface BestSellingProductCardProps {
  className?: string;
  imageSrc: string;
  name: string;
  seller: string;
  price: string;
  variants: string;
}

const BestSellingProductCard: FunctionComponent<BestSellingProductCardProps> = ({
  className = "",
  imageSrc,
  name,
  seller,
  price,
  variants,
}) => {
  return (
    <section
      className={`flex-1 flex flex-col items-end gap-2 sm:gap-3 min-w-[150px] sm:min-w-[265px] max-w-full sm:max-w-[265.1px] text-left text-num-14 sm:text-num-16 text-wheat-100 font-inter-28pt ${className}`}
    >
      {/* Product image */}
      <img
        className="w-full sm:w-[273px] h-[200px] sm:h-[308px] relative shadow-[-8px_8px_0px_rgba(105,_72,_115,_0.75)] object-cover shrink-0"
        loading="lazy"
        alt={name}
        src={imageSrc}
      />

      {/* Product details */}
      <div className="self-stretch flex flex-col items-start gap-1 sm:gap-[9px] shrink-0">
        <h3 className="m-0 self-stretch relative text-num-14 sm:text-num-20 font-semibold font-inter-28pt">
          {name}
        </h3>
        <div className="self-stretch flex items-start pt-0 px-0 pb-[3px]">
          <span className="flex-1 relative font-extralight shrink-0">
            {seller}
          </span>
        </div>
        <div className="self-stretch flex items-start pt-0 px-0 pb-[3px]">
          <span className="flex-1 relative font-medium shrink-0">{price}</span>
        </div>
        <span className="self-stretch relative font-extralight">{variants}</span>
      </div>
    </section>
  );
};

export default BestSellingProductCard;
