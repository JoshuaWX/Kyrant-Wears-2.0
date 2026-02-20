import type { FunctionComponent } from "react";

/**
 * NavButton - Reusable navigation button used for Login and Sign Up in the header.
 *
 * @param label - Button text (e.g., "LOGIN", "SIGN UP")
 * @param variant - "primary" for solid purple, "outline" for bordered transparent
 * @param onClick - Click handler
 */

interface NavButtonProps {
  className?: string;
  label: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

const NavButton: FunctionComponent<NavButtonProps> = ({
  className = "",
  label,
  variant = "primary",
  onClick,
}) => {
  const isPrimary = variant === "primary";

  return (
    <button
      className={`cursor-pointer border-none pt-[13px] px-4 pb-[14px] bg-transparent relative flex items-center justify-center box-border isolate ${className}`}
      onClick={onClick}
      type="button"
      aria-label={label}
    >
      {/* Button background shape */}
      <div
        className={`absolute inset-0 rounded-num-30 z-0 shrink-0 ${
          isPrimary
            ? "shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] bg-darkslateblue"
            : "shadow-[0px_4px_0px_rgba(236,_228,_183,_0.85)] bg-darkslategray-300 border-wheat-100 border-solid border-[1px] box-border"
        }`}
      />
      {/* Button label */}
      <b className="relative text-num-18 font-bricolage-grotesque text-wheat-100 text-center z-[1]">
        {label}
      </b>
    </button>
  );
};

export default NavButton;
