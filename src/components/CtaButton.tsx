import type { FunctionComponent } from "react";

/**
 * CtaButton - Large call-to-action button used in the hero section.
 * Displays "Sign up" text with a rounded purple pill shape.
 */

interface CtaButtonProps {
  className?: string;
  label?: string;
  onClick?: () => void;
}

const CtaButton: FunctionComponent<CtaButtonProps> = ({
  className = "",
  label = "Sign up",
  onClick,
}) => {
  return (
    <button
      className={`cursor-pointer border-none p-0 bg-transparent h-[50px] sm:h-[67px] w-40 sm:w-52 flex items-center justify-center relative isolate ${className}`}
      onClick={onClick}
      type="button"
      aria-label={label}
    >
      {/* Pill-shaped purple background */}
      <div className="absolute inset-0 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-501 bg-darkslateblue z-0" />
      {/* Button text */}
      <span className="relative text-num-20 sm:text-num-32 font-semibold font-bricolage-grotesque text-wheat-100 text-center z-[1]">
        {label}
      </span>
    </button>
  );
};

export default CtaButton;
