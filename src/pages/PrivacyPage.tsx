import type { FunctionComponent } from "react";
import Footer from "../components/Footer";
import { useCallback } from "react";

interface Section {
  title: string;
  content: string | string[];
}

const SECTIONS: Section[] = [
  {
    title: "Information We Collect",
    content: [
      "When you use Kyrant, we may collect:",
      "- Personal details: Name, email address, phone number, payment details",
      "- Design files you upload",
      "- Account activity data: Pages visited, items sold, earnings",
      "- Technical data: IP address, browser type, cookies, and device information",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use your data to:",
      "- Create and manage your account",
      "- Process orders and payments",
      "- Communicate with you about orders, earnings, or platform updates",
      "- Improve our services and website",
      "- Comply with legal obligations",
    ],
  },
  {
    title: "Sharing Your Information",
    content: [
      "We do not sell your personal data. We may share your information with:",
      "- Payment processors (for payouts)",
      "- Printing and delivery partners (for fulfilment)",
      "- Legal authorities when required by law",
      "- Service providers who help us run the platform",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "We use cookies and similar technologies to:",
      "- Keep you logged in",
      "- Remember your preferences",
      "- Analyse site performance",
      "You can disable cookies in your browser, but some features may not work properly.",
    ],
  },
  {
    title: "Data Storage & Security",
    content: [
      "Your data is stored securely on our servers.",
      "We use encryption and other security measures to protect your information.",
      "While we take precautions, no online service is 100% secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You can:",
      "- Request access to the personal data we hold about you",
      "- Ask us to correct or update your details",
      "- Request deletion of your account and personal data",
      "- Withdraw consent for data processing (where applicable)",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Kyrant is available to users aged 13 and above. We do not knowingly collect personal data from children under 13.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. The \"Last updated\" date will always be shown at the top.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any privacy-related questions, email us at [Your Email].",
    ],
  },
];

const PrivacyPage: FunctionComponent = () => {

  const print = useCallback(() => {
    window.print();
  }, []);

  const download = useCallback(() => {
    const text = `Kyrant
Last updated: ${new Date().toLocaleDateString()}

Kyrant respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.

${SECTIONS.map((section, index) => {
  const content = Array.isArray(section.content) 
    ? section.content.join("\n")
    : section.content;
  return `${index + 1}. ${section.title}\n${content}`;
}).join("\n\n")}`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kyrant-privacy-policy.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-darkslategray-100 text-wheat-100">

      <main className="max-w-[1290px] mx-auto pt-10 sm:pt-16  px-4 md:px-[72px] pb-20 relative">

        {/* Page Title */}
        <h1 
          className="font-bricolage-grotesque font-extrabold text-num-40 uppercase text-wheat-100 tracking-wide m-0 leading-[48px]"
          style={{ textShadow: "-4px 4px 0 rgba(105, 72, 115, 0.75)" }}
        >
          Privacy Policy
        </h1>

        {/* Subtitle */}
        <div className="mt-4 mb-8 font-inter font-light text-num-14 text-wheat-100/80">
          <span className="font-pacifico text-num-20 text-darkslateblue mr-2">Kyrant</span>
          <span>Last updated: January 25, 2026</span>
        </div>

        {/* Intro paragraph */}
        <p className="font-inter font-light text-num-14 leading-[17px] text-wheat-100 mb-8 max-w-[1280px]">
          Kyrant respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
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

export default PrivacyPage;
