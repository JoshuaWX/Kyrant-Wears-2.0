import type { FunctionComponent } from "react";

/**
 * DesignCard — Card for the "Best-Selling Designs" and "Designs" sections.
 * Displays an anime/design artwork with shadow, wishlist icon, designer info, price, and colour options.
 */

interface DesignCardProps {
  className?: string;
  imageSrc: string;
  title: string;
  designer: string;
  price: string;
  colourOptions: string;
  showWishlist?: boolean;
}

const DesignCard: FunctionComponent<DesignCardProps> = ({
  className = "",
  imageSrc,
  title,
  designer,
  price,
  colourOptions,
  showWishlist = true,
}) => {
  return (
    <div
      className={`flex flex-col items-start gap-2 sm:gap-3 min-w-0 w-full text-left text-num-14 sm:text-num-16 text-wheat-100 font-inter-28pt ${className}`}
    >
      {/* Design artwork with optional wishlist icon */}
      <div className="self-stretch relative h-[180px] sm:h-[273px]">
        <img
          className="absolute top-0 left-0 sm:left-[-7.5px] shadow-[-8px_8px_0px_rgba(105,_72,_115,_0.75)] w-full sm:w-[260px] h-[180px] sm:h-[273px] object-cover"
          loading="lazy"
          alt={title}
          src={imageSrc}
        />
        {showWishlist && (
          <button
            type="button"
            className="cursor-pointer border-none p-0 bg-transparent absolute top-[57px] right-[8px] w-9 h-[35px] z-[1]"
            aria-label={`Add ${title} to wishlist`}
          >
            <img
              className="w-full h-full"
              alt="Wishlist"
              src="/assets/Vector.svg"
            />
          </button>
        )}
      </div>

      {/* Design details */}
      <div className="self-stretch flex flex-col items-start gap-1 sm:gap-2.5 shrink-0">
        <span className="self-stretch relative font-medium text-num-12 sm:text-num-16">{title}</span>
        <span className="self-stretch relative font-extralight text-num-12 sm:text-num-16">{designer}</span>
        <span className="self-stretch relative font-medium text-num-12 sm:text-num-16">{price}</span>
        <span className="self-stretch relative font-extralight text-num-12 sm:text-num-16">
          {colourOptions}
        </span>
      </div>
    </div>
  );
};

export default DesignCard;
