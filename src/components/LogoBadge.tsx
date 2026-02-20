import type { FunctionComponent } from "react";

/**
 * LogoBadge - Circular brand badge displaying the "K" initial.
 * Used in the navigation bar alongside the brand wordmark.
 */

interface LogoBadgeProps {
  className?: string;
  onClick?: () => void;
}

const LogoBadge: FunctionComponent<LogoBadgeProps> = ({ className = "", onClick }) => {
  return (
    <div
      className={`h-10 w-10 flex items-start z-[2] text-center text-num-18 text-wheat-100 font-pacifico ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="Kyrant logo badge"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Circular purple background */}
      <div className="h-10 w-10 relative shadow-[0px_2px_0px_rgba(105,_72,_115,_0.85)] rounded-num-50 bg-darkslateblue z-[1]" />
      {/* "K" letter overlay */}
      <div className="h-9 w-[17px] flex flex-col items-start pt-num-4 px-0 pb-0 box-border z-[2] ml-[-29px] relative">
        <span className="m-0 w-[17px] h-8 relative text-[length:inherit] font-normal font-[inherit] inline-block">
          K
        </span>
      </div>
    </div>
  );
};

export default LogoBadge;
