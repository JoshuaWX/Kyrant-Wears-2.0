import { useState } from "react";
import type { FunctionComponent } from "react";

/**
 * FaqItem - Expandable FAQ accordion item.
 * Displays a question with a toggle button that reveals the answer.
 *
 * @param question - The FAQ question text
 * @param answer - The FAQ answer text (shown when expanded)
 */

interface FaqItemProps {
  className?: string;
  question: string;
  answer: string;
}

const FaqItem: FunctionComponent<FaqItemProps> = ({
  className = "",
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`self-stretch shadow-[0px_4px_0px_rgba(105,_72,_115,_0.65)] rounded-num-20 bg-darkslateblue flex flex-col items-start py-3 sm:py-[15px] px-4 sm:px-5 gap-[7px] text-left text-num-14 sm:text-num-20 text-wheat-100 font-bricolage-grotesque ${className}`}
      role="region"
    >
      {/* Question row with toggle button */}
      <button
        className="self-stretch flex items-center justify-between shrink-0 cursor-pointer bg-transparent border-none p-0 text-left gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="flex-1 relative font-extrabold text-num-14 sm:text-num-20 text-wheat-100 font-bricolage-grotesque">
          {question}
        </span>
        <img
          className={`h-[23px] w-[23px] relative object-cover transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          alt={isOpen ? "Collapse answer" : "Expand answer"}
          src="/assets/button@2x.png"
        />
      </button>

      {/* Answer (collapsible) */}
      <div
        className={`w-full relative font-inter text-num-14 sm:text-num-20 text-wheat-100 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="m-0">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
