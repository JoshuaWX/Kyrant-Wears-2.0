import type { FunctionComponent } from "react";
import FaqItem from "../components/FaqItem";

/**
 * FaqSection - Frequently Asked Questions accordion section.
 * Contains 7 questions covering orders, commissions, returns,
 * copyright, quality, file requirements, and fees.
 */

const FAQ_DATA = [
  {
    question: "How long will it take to receive my order?",
    answer: "Delivery typically takes about a day or two.",
  },
  {
    question: "How much commission do i earn, and when do i get paid?",
    answer:
      "You get to keep 90% and we only take 10% and you get paid every 10th of the month.",
  },
  {
    question: "Can i return or exchange my custom-printed item?",
    answer:
      "Since items are custom-made just for you, we can only offer returns or exchanges if the product is damaged or defective.",
  },
  {
    question: "Who owns the copyright to the designs i upload?",
    answer:
      "You fully own the rights to every design you upload here as long as you are the creator of the design.",
  },
  {
    question: "What is the quality of the products and the print?",
    answer:
      "We use pro-grade tech for vibrant, fade-resistant prints on premium, durable fabrics.",
  },
  {
    question: "What are the requirements for design file uploads?",
    answer:
      "Upload high-res PNG or JPEG (300 DPI). Use PNG for transparent backgrounds. Max file size: 20MB.",
  },
  {
    question: "Are there any hidden fees at checkout?",
    answer:
      "No surprises here. Shipping and taxes are calculated upfront before you hit pay.",
  },
];

const FaqSection: FunctionComponent = () => {
  return (
    <section
      className="self-stretch flex flex-col items-center py-0 px-5 box-border max-w-full"
      aria-labelledby="faq-heading"
    >
      {/* FAQ Title */}
      <h2
        id="faq-heading"
        className="m-0 relative text-[36px] sm:text-[48px] md:text-[64px] font-extrabold font-bricolage-grotesque text-wheat-100 text-center mb-0 mt-50"
      >
        FAQ
      </h2>

      {/* Subtitle */}
      <p className="relative text-num-14 sm:text-num-20 font-normal font-inter text-wheat-300 text-center mt-4 mb-8 sm:mb-[60px]">
        Got questions?
      </p>

      {/* FAQ Items list */}
      <div className="w-full sm:w-[735px] flex flex-col items-start gap-4 sm:gap-5 max-w-full">
        {FAQ_DATA.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
