import Link from "next/link";
import { Logo } from "./logo";

const COLS: Array<{ title: string; links: string[] }> = [
  {
    title: "Platform",
    links: [
      "Explore Platform",
      "Orchestration Dashboard",
      "Workflow Builder",
      "UI Customization",
      "Decisioning & Results",
      "Fraud Analytics",
      "Case Management",
      "Platform Integrations",
    ],
  },
  {
    title: "Our technology",
    links: [
      "Facial Recognition",
      "Document Verification",
      "Liveness Detection",
      "OCR",
      "Deepfake Detection",
      "Network",
    ],
  },
  {
    title: "Use cases",
    links: [
      "Identity Verification",
      "Age Verification",
      "KYC/AML Compliance",
      "Know Your Business (KYB)",
      "Workforce (KYE)",
      "Candidate Verification",
      "Agentic Identity",
      "Non-Document Verification",
    ],
  },
  {
    title: "Industries",
    links: [
      "Financial services",
      "Healthcare",
      "Online gaming",
      "Online gambling",
      "E-commerce & marketplaces",
      "Public sector",
    ],
  },
  {
    title: "Resources",
    links: ["Blog", "Press"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Life at Incode",
      "Awards & recognition",
      "Events",
      "Contact us",
    ],
  },
];

const LEGAL = [
  "Security",
  "HIPAA",
  "Privacy policy",
  "Terms of use",
  "Cookie policy",
  "Accessibility",
  "SDK & API",
  "Washington Consumer Health Data Privacy Report",
  "Biometric Data Policy and Notice",
];

export function SiteFooter() {
  return (
    <footer className="relative bg-rich-black text-white overflow-hidden">
      <div className="absolute inset-x-0 -bottom-40 h-80 glow-blue opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(6,1fr)]">
          <div>
            <Logo className="text-white" />
            <address className="not-italic mt-6 text-sm text-grey-on-black leading-relaxed">
              Incode Technologies, Inc.
              <br />
              101 Mission St, Suite 900,
              <br />
              San Francisco, CA 94105, USA
              <br />
              Tel: +1 (650) 446-3444
            </address>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-medium text-white mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="text-sm text-off-white hover:text-blue-eyebrow transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-dark">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-grey-on-black">
            {LEGAL.map((l) => (
              <li key={l}>
                <Link href="#" className="hover:text-white transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-grey-on-black max-w-3xl">
            Incode Technologies has been certified to be SOC 2 Type ii Compliant. Incode Technologies uses 256-bit TLS encryption
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-grey-on-black">
            <p>© Incode Technologies Inc. All rights reserved. Incode Trademark</p>
            <span className="inline-flex items-center gap-2 rounded-md border border-border-dark px-2.5 py-1">
              United States (ENG)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
