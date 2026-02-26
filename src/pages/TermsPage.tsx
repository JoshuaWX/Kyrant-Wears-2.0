import type { FunctionComponent } from "react";
import Footer from "../components/Footer";

interface Section {
  title: string;
  content: string | string[];
}

const SECTIONS: Section[] = [
  {
    title: "About Kyrant",
    content: [
      "Kyrant is a print-on-demand platform. We allow individuals and businesses (\"Creators\") to upload their designs, which we print, sell, and distribute. In return, Creators earn a commission from sales.",
      "Kyrant is operated from Nigeria and serves both local and international customers.",
    ],
  },
  {
    title: "Eligibility",
    content: [
      "You must be at least 13 years old to use Kyrant.",
      "If you are under 18, you must have permission from a parent or guardian.",
      "You agree to provide accurate, complete, and up-to-date information when creating an account or using our services.",
    ],
  },
  {
    title: "Creator Accounts",
    content: [
      "You are responsible for keeping your account login details safe.",
      "You are responsible for all activity that happens under your account.",
      "Kyrant reserves the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    title: "Payments to Creators",
    content: [
      "Commissions are paid once every month via bank transfer to Nigerian bank accounts (or other agreed payment methods in the future).",
      "The commission rate will be communicated clearly before your design goes live.",
      "Kyrant is not responsible for delays caused by incorrect payment details provided by you.",
    ],
  },
  {
    title: "Your Content & Intellectual Property",
    content: [
      "You own the copyright to your designs.",
      "By uploading a design, you grant Kyrant a non-exclusive, royalty-free, worldwide license to print, sell, market, and distribute your design on your behalf.",
      "You confirm that you have the legal right to use every element of your design (e.g., images, fonts, logos) and that it does not infringe on the rights of others.",
      "You may request removal of your design from our store at any time, but sales already made will still be honored.",
    ],
  },
  {
    title: "Prohibited Content",
    content: [
      "You must not upload or sell designs that contain:",
      "- Hate speech, violence, or discrimination",
      "- Illegal or copyrighted content you do not own",
      "- Pornographic or sexually explicit material",
      "- Anything harmful, misleading, or offensive",
    ],
  },
  {
    title: "Orders & Fulfilment",
    content: [
      "Kyrant handles all printing, packaging, and delivery for orders.",
      "We aim to meet stated delivery times but cannot guarantee them due to factors outside our control (e.g., courier delays, supply shortages).",
      "Refunds for customers will follow our Return & Refund Policy.",
    ],
  },
  {
    title: "Liability",
    content: [
      "Kyrant is not responsible for any indirect, incidental, or consequential damages.",
      "We do not guarantee that our platform will be uninterrupted or error-free.",
      "You agree to indemnify and hold Kyrant harmless from any claims related to your designs or activities on our platform.",
    ],
  },
  {
    title: "Changes to the Terms",
    content: [
      "We may update these Terms & Conditions from time to time.",
      "If we make major changes, we will notify you via email or on our website.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "For any questions, email us at [Your Email].",
    ],
  },
];

const TermsPage: FunctionComponent = () => {
  return (
    <div className="min-h-screen bg-darkslategray-100 text-wheat-100">
     

      <main className="max-w-[1290px] mx-auto pt-10 sm:pt-16 px-4 md:px-[72px] pb-20 relative">
  
        {/* Page Title */}
        <h1 className="font-bricolage-grotesque font-extrabold text-num-40 uppercase text-wheat-100 tracking-wide m-0 leading-[48px] text-shadow-[-4px_4px_0_rgba(105,72,115,0.75)]">
          Terms of Service
        </h1>

        {/* Subtitle */}
        <div className="mt-4 mb-8 font-inter font-light text-num-14 text-wheat-100/80">
          <span className="font-pacifico text-num-20 text-darkslateblue mr-2">Kyrant</span>
          <span>Last updated: January 25, 2026</span>
        </div>

        {/* Intro paragraph */}
        <p className="font-inter font-light text-num-14 leading-[17px] text-wheat-100 mb-8 max-w-[1280px]">
          Welcome to Kyrant! By accessing or using our website, platform, or services, you agree to these Terms & Conditions. If you do not agree, please do not use our services.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-darkslateblue mb-8 max-w-[1280px]" />

        {/* Content sections */}
        <article className="font-inter font-light text-num-14 leading-[20px] text-wheat-100 max-w-[1280px]">
          {SECTIONS.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="font-inter font-bold text-num-17 text-wheat-100 mb-3">
                {index + 1}. {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <div className="space-y-1">
                  {section.content.map((line, lineIndex) => (
                    <p
                      key={lineIndex}
                      className={`m-0 ${
                        line.startsWith("-") ? "pl-4" : ""
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="m-0">{section.content}</p>
              )}
            </div>
          ))}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
