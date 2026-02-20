import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";

/**
 * OnboardingPage - Role selection screen shown after signup click.
 *
 * The user chooses between two roles:
 *   1. Designer — creates designs for merchants to use on products
 *   2. Merchant — uses designs on products they sell
 *
 * Each card navigates to the respective sign-up flow.
 * Layout: Full-screen dark green background with a centered purple container
 * featuring the brand wordmark, an "Onboarding Process" heading, and two role cards.
 */

const OnboardingPage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative bg-darkslategray-100 overflow-hidden flex flex-col items-center justify-center py-10 sm:py-[120px] px-4 sm:px-[30px] box-border">
      {/* Main onboarding card container */}
      <main className="w-full shadow-[-8px_8px_0px_rgba(105,_72,_115,_0.75)] rounded-[30px] sm:rounded-[75px] bg-darkslateblue flex flex-col items-center pt-6 sm:pt-[49px] px-4 sm:px-[30px] pb-10 sm:pb-[178px] box-border gap-8 sm:gap-[70px] max-w-[1240px]">
        {/* Top bar: Brand wordmark + Language selector */}
        <div className="w-full flex items-start justify-between flex-wrap content-start pt-0 pb-[18.1px] pl-0 pr-0 sm:pr-[30.3px] box-border gap-x-0 gap-y-2.5 max-w-[1137.8px]">
          {/* Kyrant brand wordmark — links back to landing page */}
          <div className="flex items-start pt-[1.9px] px-0 pb-0">
            <h2
              className="m-0 w-[104px] relative text-num-32 font-normal font-pacifico text-wheat-100 flex items-center cursor-pointer shrink-0"
              onClick={() => navigate("/")}
              role="link"
              tabIndex={0}
              aria-label="Go back to landing page"
            >
              Kyrant
            </h2>
          </div>

          {/* Language selector button */}
          <button
            className="cursor-pointer border-wheat-100 border-solid border-[3px] py-0 pl-[22.7px] pr-[25.9px] bg-transparent rounded-[45px] flex items-center justify-center gap-[2.9px]"
            type="button"
            aria-label="Select language"
          >
            <span className="w-[22px] relative text-base font-pacifico text-black text-left flex items-center">
              🗃️
            </span>
            <div className="flex items-start pt-0 px-0 pb-[1.5px]">
              <span className="relative text-xs leading-[8.9px] font-semibold font-inter text-wheat-100 text-left flex items-center shrink-0">
                ENG
              </span>
            </div>
          </button>
        </div>

        {/* Main heading */}
        <h1 className="m-0 w-full relative text-[36px] sm:text-[52px] md:text-[76px] font-normal font-bricolage-grotesque text-wheat-100 text-center max-w-[690.2px]">
          Onboarding Process
        </h1>

        {/* Role selection cards */}
        <section
          className="self-stretch flex items-start justify-center flex-wrap content-start gap-x-8 sm:gap-x-[100px] gap-y-[30px]"
          aria-label="Choose your role"
        >
          {/* Designer role card */}
          <RoleCard
            title="Are you a Designer?"
            description="You make designs available for merchants to use on their products."
            navigateTo="/signup/designer"
          />

          {/* Merchant role card */}
          <RoleCard
            title="Are you a Merchant?"
            description="You use designs made available to use on products."
            navigateTo="/signup/merchant"
          />
        </section>
      </main>
    </div>
  );
};

export default OnboardingPage;
