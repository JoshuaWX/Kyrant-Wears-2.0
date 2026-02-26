import type { FunctionComponent } from "react";
import StepCard from "../components/StepCard";

/**
 * HowItWorks - Section explaining the platform process for both
 * Shoppers (4 steps) and Designers (3 steps). Each step is visualized
 * with an icon card showing the action and description.
 */

const HowItWorks: FunctionComponent = () => {
  return (
    <section
      className="self-stretch flex items-start justify-center py-0 pl-4 sm:pl-[21px] pr-4 sm:pr-5 box-border max-w-full shrink-0 text-center text-[36px] sm:text-[48px] md:text-[64px] text-wheat-100 font-bricolage-grotesque mb-50"
      aria-labelledby="how-it-works-heading"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-full">
        {/* Section heading */}
        <div className="self-stretch flex items-start justify-center pt-0 px-4 sm:px-5 pb-2.5 box-border max-w-full">
          <div className="flex flex-col items-center gap-4 sm:gap-[25px] max-w-full">
            <h2
              id="how-it-works-heading"
              className="m-0 relative text-[length:inherit] font-extrabold font-[inherit] [text-shadow:-4px_4px_0px_rgba(105,_72,_115,_0.75)]"
            >
              How It Works
            </h2>
            <p className="m-0 relative text-num-14 sm:text-num-17 md:text-num-20 font-normal font-inter text-wheat-300">
              The easiest way to design and print online
            </p>
          </div>
        </div>

        {/* ===== FOR SHOPPERS ===== */}
        <div className="self-stretch flex flex-col items-center gap-4 sm:gap-[25.5px]">
          <h3 className="m-0 relative text-num-20 sm:text-num-32 underline font-extrabold font-bricolage-grotesque text-wheat-100">
            FOR SHOPPERS
          </h3>

          {/* Row 1: Pick a Design + Customize */}
          <div className="self-stretch flex items-start justify-center flex-wrap content-start gap-[30px] relative">
            {/* Decorative tote bag - floating outside PICK A DESIGN card (increased by 40%) */}
            <div className="w-[392px] h-[392px] absolute top-[-80px] left-[-220px] z-[3] shrink-0 pointer-events-none hidden md:block">
              <img
                className="w-full h-full object-contain animate-float-circle"
                alt="Decorative tote bag"
                src="/assets/visualelectric-1754182789652-1@2x.png"
              />
            </div>

            {/* PICK A DESIGN - increased height by ~20% */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[36px] px-[36px] pb-6 box-border relative isolate gap-[18px] min-w-[194px] overflow-hidden">
              <div className="flex items-start py-0 px-0.5 shrink-0">
                <div className="flex items-start gap-[19px]">
                  <img
                    className="w-5 relative max-h-full z-[1]"
                    alt=""
                    src="/assets/Vector.svg"
                  />
                  <span className="relative tracking-num-0_02 font-extrabold z-[1] text-num-17 text-wheat-100 font-bricolage-grotesque">
                    PICK A DESIGN
                  </span>
                </div>
              </div>
              <div className="self-stretch h-[3px] relative border-wheat-100 border-solid border-t-[3px] box-border z-[1]" />
              <p className="relative text-num-14 font-light font-inter text-left z-[1] text-wheat-100 m-0">
                Upload your design or choose
                <br />
                from the large gallery of designs.
              </p>
            </div>

            {/* CUSTOMIZE - increased height by ~20% */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[36px] pb-6 pl-[36px] pr-8 box-border relative isolate gap-3 min-w-[194px]">
              <div className="flex items-start gap-5 shrink-0">
                <img
                  className="w-5 relative max-h-full z-[1]"
                  alt=""
                  src="/assets/Vector1.svg"
                />
                <span className="relative tracking-num-0_02 font-extrabold z-[1] text-num-17 text-wheat-100 font-bricolage-grotesque">
                  CUSTOMIZE
                </span>
              </div>
              <div className="self-stretch h-[3px] relative border-wheat-100 border-solid border-t-[3px] box-border z-[1] shrink-0" />
              <p className="relative text-num-14 font-light font-inter text-left z-[1] text-wheat-100 m-0 shrink-0">
                Customize colours, sizes, and
                <br />
                placement to match your taste.
              </p>
            </div>
          </div>

          {/* Row 2: Choose a Product + Order */}
          <div className="self-stretch flex items-start justify-center flex-wrap content-start gap-[30px]">
            {/* CHOOSE A PRODUCT */}
            <StepCard
              icon="/assets/Vector2.svg"
              title="CHOOSE A PRODUCT"
              description={`Choose from various products\nranging from T-shirts to Hoodies to\nTote bags.`}
            />

            {/* ORDER */}
            <StepCard
              icon="/assets/Vector4.svg"
              title="ORDER"
              description={`Review your design and place\nyour order.`}
            />
          </div>
        </div>

        {/* ===== FOR DESIGNERS ===== */}
        <div className="self-stretch flex flex-col items-center gap-4 sm:gap-[26px]">
          <h3 className="m-0 relative text-num-20 sm:text-num-32 underline font-extrabold font-bricolage-grotesque text-wheat-100">
            FOR DESIGNERS
          </h3>

          {/* Row 1: Register Your Shop + Upload & Price */}
          <div className="self-stretch flex items-start justify-center flex-wrap content-start gap-[30px] relative">
            {/* REGISTER YOUR SHOP - increased height by ~20% */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[36px] pb-6 pl-[36px] pr-6 box-border relative isolate gap-[18px] min-w-[194px] overflow-hidden">
              <div className="flex items-start gap-5 shrink-0">
                <img
                  className="w-5 relative max-h-full z-[1]"
                  alt=""
                  src="/assets/Vector5.svg"
                />
                <span className="relative tracking-num-0_02 font-extrabold z-[1] text-num-17 text-wheat-100 font-bricolage-grotesque">
                  REGISTER YOUR SHOP
                </span>
              </div>
              <div className="self-stretch h-[3px] relative border-wheat-100 border-solid border-t-[3px] box-border z-[1]" />
              <p className="relative text-num-14 font-light font-inter text-left z-[1] text-wheat-100 m-0">
                Create your free Creator profile and
                <br />
                set up your commission preferences.
              </p>
            </div>

            {/* UPLOAD & PRICE - increased height by ~20% */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[36px] pb-6 pl-[36px] pr-6 box-border relative isolate gap-[18px] min-w-[194px] overflow-hidden">
              <div className="flex items-start gap-5 shrink-0">
                <img
                  className="w-5 relative max-h-full z-[1]"
                  alt=""
                  src="/assets/UPLOAD1.svg"
                />
                <span className="relative tracking-num-0_02 font-extrabold z-[1] text-num-17 text-wheat-100 font-bricolage-grotesque">
                  {`UPLOAD & PRICE`}
                </span>
              </div>
              <div className="self-stretch h-[3px] relative border-wheat-100 border-solid border-t-[3px] box-border z-[1]" />
              <p className="relative text-num-14 font-light font-inter text-left z-[1] text-wheat-100 m-0">
                Upload your high-res design files and
                <br />
                easily set your retail price.
              </p>
            </div>
          </div>

          {/* Decorative organic shapes - floating outside UPLOAD & PRICE card (increased by 40%) */}
          <div className="w-[392px] h-[392px] absolute top-[600px] right-[-180px] z-[4] shrink-0 pointer-events-none hidden md:block">
            <img
              className="w-full h-full object-contain animate-float-circle-delayed"
              alt=""
              src="/assets/vecteezy-hand-drawn-abstract-organic-shapes-background-24289943-1@2x.png"
            />
          </div>

          {/* Row 2: Track Your Progress (centered) */}
          <div className="self-stretch flex items-start justify-center px-4 sm:px-[163px]">
            <StepCard
              icon="/assets/Vector6.svg"
              title="TRACK YOUR PROGRESS"
              description={`Watch your sales grow and receive\nscheduled payouts directly to your\naccount.`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
