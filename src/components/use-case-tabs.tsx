"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type UseCase = { title: string; body: string };
type Tab = { id: string; label: string; subhead: string; cases: UseCase[] };

const TABS: Tab[] = [
  {
    id: "customer",
    label: "Customer trust",
    subhead:
      "Verify true identities at onboarding to protect your business and customers from fraud.",
    cases: [
      {
        title: "Customer verification",
        body: "Secure high-risk assets and transactions with quick and easy step-up protection.",
      },
      {
        title: "KYC/AML compliance",
        body: "Meet compliance requirements with zero-friction checks against biometric sources of truth.",
      },
      {
        title: "Customer authentication",
        body: "Let onboarded customers log in securely with a quick selfie.",
      },
    ],
  },
  {
    id: "business",
    label: "Business trust",
    subhead:
      "Screen and verify businesses to build compliant and trusted business relationships from the start.",
    cases: [
      {
        title: "KYC/AML compliance",
        body: "Verify businesses and their owners (KYC) to guarantee compliant business onboarding.",
      },
      {
        title: "UBO verification",
        body: "Confirm the identity of the true business owners to limit your risk exposure.",
      },
      {
        title: "Watchlist screening",
        body: "Automatically check against global sanctions and risk lists to stay compliant.",
      },
    ],
  },
  {
    id: "workforce",
    label: "Workforce trust",
    subhead:
      "Protect internal systems and workflows by confirming true employee identity before granting critical access or processing credential resets.",
    cases: [
      {
        title: "Employee verification",
        body: "Prevent unauthorized access with identity checks at onboarding and key access points.",
      },
      {
        title: "Help desk & self-serve resets",
        body: "Reduce support costs and resolution time by letting employees verify their identities and reset credentials without IT intervention.",
      },
      {
        title: "Candidate verification",
        body: "Block deepfakes early to reduce hiring risk and prevent fraud.",
      },
    ],
  },
  {
    id: "agentic",
    label: "Agentic trust",
    subhead:
      "Verify the identity of autonomous AI systems to prevent fraud, ensure compliance, and build trust in digital interactions.",
    cases: [
      {
        title: "Verified owner identity",
        body: "Authenticate agent owners using high-assurance ID verification with liveness detection that blocks deepfakes.",
      },
      {
        title: "Agent detection & classification",
        body: "Detect agent activity across apps and protocols, classifying humans vs anonymous and authenticated agents.",
      },
      {
        title: "Tokenization & audit trail",
        body: "Issue agents a secure token that links actions to verified owners, enabling attribution and regulatory traceability.",
      },
    ],
  },
];

export function UseCaseTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Use cases"
        className="flex flex-wrap gap-2 border-b border-border-light pb-4"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-grey-on-white hover:bg-off-white hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
        >
          <p className="font-display text-xl md:text-2xl text-balance leading-snug">
            {active.subhead}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {active.cases.map((c) => (
              <a
                key={c.title}
                href="#"
                className="group flex h-full flex-col justify-between rounded-xl border border-border-light bg-background p-6 transition-colors hover:border-blue/40 hover:bg-off-white/40"
              >
                <div>
                  <h4 className="font-display text-base leading-snug">{c.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-grey-on-white">{c.body}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="mt-6 text-grey-on-white transition-colors group-hover:text-blue"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
