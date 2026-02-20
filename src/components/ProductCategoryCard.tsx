import type { FunctionComponent } from "react";

/**
 * ProductCategoryCard — Card for the "Products" section grid.
 * Displays a product category with a background image, category title, and description.
 */

interface ProductCategoryCardProps {
  className?: string;
  title: string;
  description: string;
  backgroundImage: string;
}

const ProductCategoryCard: FunctionComponent<ProductCategoryCardProps> = ({
  className = "",
  title,
  description,
  backgroundImage,
}) => {
  return (
    <div
      className={`flex flex-col items-start pt-[140px] sm:pt-[220px] pb-4 sm:pb-[25px] pl-3 sm:pl-5 pr-3 sm:pr-[39px] box-border gap-1.5 sm:gap-2.5 bg-cover bg-no-repeat bg-top min-w-0 w-full min-h-[200px] sm:min-h-[280px] text-left text-num-12 text-wheat-100 font-inter-28pt ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <b className="self-stretch relative uppercase shrink-0">{title}</b>
      <p className="m-0 self-stretch relative font-light shrink-0">
        {description}
      </p>
    </div>
  );
};

export default ProductCategoryCard;
