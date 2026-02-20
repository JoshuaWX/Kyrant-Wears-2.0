import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

/**
 * RoleCard - Clickable card used on the Onboarding page for role selection.
 * Styled with the dark green (darkslategray) background, rounded corners,
 * and a press-shadow effect consistent with the Kyrant brand.
 *
 * @param title - Role question heading (e.g., "Are you a Designer?")
 * @param description - Brief role explanation text
 * @param navigateTo - Route path to navigate when clicked
 */

interface RoleCardProps {
  className?: string;
  title: string;
  description: string;
  navigateTo: string;
}

const RoleCard: FunctionComponent<RoleCardProps> = ({
  className = "",
  title,
  description,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <button
      className={`flex-1 shadow-[-4px_4px_0px_rgba(22,_48,_43,_0.75)] rounded-[30px] sm:rounded-[50px] bg-darkslategray-100 flex flex-col items-start pt-10 sm:pt-[81px] pb-8 sm:pb-[71px] px-6 sm:px-[52px] box-border gap-4 sm:gap-5 min-w-[200px] sm:min-w-[250px] max-w-[420px] cursor-pointer border-none text-left transition-transform duration-200 hover:scale-[1.02] hover:shadow-[-6px_6px_0px_rgba(22,_48,_43,_0.85)] active:scale-[0.98] ${className}`}
      onClick={() => navigate(navigateTo)}
      type="button"
      aria-label={title}
    >
      {/* Role question heading */}
      <h2 className="m-0 self-stretch relative text-xl sm:text-2xl font-normal font-bricolage-grotesque text-wheat-100 flex items-center min-w-[200px] sm:min-w-[250px] shrink-0">
        {title}
      </h2>

      {/* Role description */}
      <p className="m-0 w-full relative text-base sm:text-xl font-semibold font-inter text-wheat-100 flex items-center max-w-[300px] shrink-0">
        {description}
      </p>
    </button>
  );
};

export default RoleCard;
