import type { FunctionComponent } from "react";
import CtaButton from "../components/CtaButton";

/**
 * HeroSection - Main hero area with tagline, description, CTA button,
 * and decorative product images (tote bag, hoodie, shirt on sides).
 */

interface HeroSectionProps {
  onSignUpClick?: () => void;
}

const HeroSection: FunctionComponent<HeroSectionProps> = ({ onSignUpClick }) => {
  return (
    <section className="w-full lg:w-[1385px] flex items-start justify-center pt-0 px-4 sm:px-5 pb-8 sm:pb-[54px] box-border max-w-full shrink-0 text-center text-[40px] sm:text-[55px] md:text-[70px] lg:text-[85px] text-darkslateblue font-pacifico relative">
      {/* Decorative product image - top left (tote bag) */}
      <div className="hidden md:block w-[250px] lg:w-[369.7px] h-[250px] lg:h-[369.7px] absolute top-[-100px] lg:top-[-150px] left-[-40px] lg:left-[-80px] z-[2] pointer-events-none">
        <img
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] max-w-full overflow-hidden max-h-full object-contain"
          alt="Decorative tote bag"
          src="/assets/visualelectric-1754182789652-1@2x.png"
        />
      </div>

      {/* Decorative product image - right side (green hoodie) */}
      <div className="hidden md:block w-[280px] lg:w-[420px] h-[380px] lg:h-[569px] absolute top-[-20px] right-[-40px] lg:right-[-80px] z-[1] pointer-events-none">
        <img
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt="Decorative green hoodie"
          src="/assets/visualelectric-1754181872365-2@2x.png"
        />
      </div>

      {/* Decorative product image - left side (pants) */}
      <div className="hidden lg:block w-[625.9px] h-[625.9px] absolute top-[-100px] left-[-250px] z-[2] pointer-events-none">
        <img
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] max-w-full overflow-hidden max-h-full object-contain"
          loading="lazy"
          alt="Decorative pants"
          src="/assets/visualelectric-1753143208821-2@2x.png"
        />
      </div>

      {/* Main hero content */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-full z-[3]">
        {/* Main tagline */}
        <h1 className="m-0 relative text-[length:inherit] font-[inherit] text-center">
          <b className="font-bricolage-grotesque text-wheat-100">
            Design, Order,
          </b>
          <span className="font-bricolage-grotesque text-white">{" "}</span>
          <span className="uppercase font-pacifico text-darkslateblue">
            Earn
          </span>
          <br />
          <b className="font-bricolage-grotesque text-wheat-100">
            Your Creativity, Our Canvas
          </b>
        </h1>

        {/* Description text */}
        <div className="w-full lg:w-[1110px] flex items-start justify-center py-0 px-4 sm:px-5 box-border max-w-full text-num-14 sm:text-num-17 md:text-num-20 text-wheat-300 font-inter">
          <div className="w-full md:w-[844px] flex flex-col items-center gap-[13px] max-w-full">
            <p className="m-0 relative text-[length:inherit] tracking-[0.06em] font-normal font-[inherit] text-center">
              The first print-on-demand biz made just for you! Whether you're a
              young creator
              <br className="hidden sm:inline" />
              or a growing brand, we make printing your designs as easy as
              posting a meme.
              <br className="hidden sm:inline" />
              Just upload, chill, and let us do the magic.
            </p>

            {/* CTA Button */}
            <div className="flex items-start py-0 box-border max-w-full">
              <CtaButton label="Sign up" onClick={onSignUpClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
