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
      className="self-stretch flex items-start justify-center py-0 pl-4 sm:pl-[21px] pr-4 sm:pr-5 box-border max-w-full shrink-0 text-center text-[36px] sm:text-[48px] md:text-[64px] text-wheat-100 font-bricolage-grotesque"
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
          <div className="self-stretch flex items-start justify-center flex-wrap content-start gap-[30px]">
            {/* PICK A DESIGN - with decorative tote bag overlay */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[30px] px-[30px] pb-5 box-border relative isolate gap-[15px] min-w-[194px]">
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

            {/* CUSTOMIZE - with decorative organic shapes overlay */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[30px] pb-5 pl-[30px] pr-7 box-border relative isolate gap-3 min-w-[194px] overflow-hidden">
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
              {/* Decorative organic shapes background */}
              <img
                className="w-[336.9px] absolute top-[-143px] right-[-224.9px] max-h-full object-contain z-[2] shrink-0 pointer-events-none"
                alt=""
                src="/assets/vecteezy-hand-drawn-abstract-organic-shapes-background-24289943-1@2x.png"
              />
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
          <div className="self-stretch flex items-start justify-center flex-wrap content-start gap-[30px]">
            {/* REGISTER YOUR SHOP */}
            <StepCard
              icon="/assets/Vector5.svg"
              title="REGISTER YOUR SHOP"
              description={`Create your free Creator profile and\nset up your commission preferences.`}
            />

            {/* UPLOAD & PRICE - with decorative shirt overlay */}
            <div className="flex-1 shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-10 bg-darkslateblue flex flex-col items-start pt-[30px] pb-5 pl-[30px] pr-6 box-border relative isolate gap-[15px] min-w-[194px] overflow-hidden">
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
              {/* Decorative shirt image */}
              <div className="w-[426.6px] h-[426.6px] absolute right-[-248.6px] bottom-[-258.6px] z-[2] shrink-0 pointer-events-none">
                <img
                  className="absolute h-full w-full top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-contain"
                  loading="lazy"
                  alt=""
                  src="/assets/visualelectric-1753142908143-1@2x.png"
                />
              </div>
            </div>
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
