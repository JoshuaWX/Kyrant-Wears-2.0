import type { FunctionComponent } from "react";

/**
 * StepCard - Displays a single step in the "How It Works" section.
 * Each card contains an icon, step title, divider, and description.
 *
 * @param icon - Path to the step icon SVG
 * @param title - Step title (e.g., "PICK A DESIGN")
 * @param description - Step description text
 */

interface StepCardProps {
  className?: string;
  icon: string;
  title: string;
  description: string;
}

const StepCard: FunctionComponent<StepCardProps> = ({
  className = "",
  icon,
  title,
  description,
}) => {
  return (
    <div
      className={`flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-5 sm:pt-[30px] pb-4 sm:pb-5 pl-4 sm:pl-[30px] pr-4 sm:pr-7 box-border gap-3 min-w-[160px] sm:min-w-[194px] text-num-14 sm:text-num-17 text-wheat-100 font-bricolage-grotesque ${className}`}
    >
      {/* Icon and title row */}
      <div className="flex items-start gap-5 shrink-0">
        <img className="w-5 relative max-h-full z-[1]" alt="" src={icon} />
        <span className="relative tracking-num-0_02 font-extrabold z-[1]">
          {title}
        </span>
      </div>

      {/* Divider line */}
      <div className="self-stretch h-[3px] relative border-wheat-100 border-solid border-t-[3px] box-border z-[1] shrink-0" />

      {/* Description text */}
      <p className="relative text-num-14 font-light font-inter text-left z-[1] shrink-0 m-0">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
