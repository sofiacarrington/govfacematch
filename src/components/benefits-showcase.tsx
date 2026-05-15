"use client";

import { Brain, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Benefit = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Eliminate fraud",
    body: "Keep bad actors out with advanced AI-powered prevention. Safeguard every step of the verification journey with end-to-end fraud signal monitoring.",
  },
  {
    icon: Brain,
    title: "Stay ahead of new threats",
    body: "Anticipate and defeat deepfakes, synthetic identities, and other AI-driven fraud attacks with continuously evolving machine learning models.",
  },
  {
    icon: TrendingUp,
    title: "Optimize conversion",
    body: "Provide users with effortless, seamless and secure identity verification. Customize your experience to blend seamlessly with your brand.",
  },
];

export function BenefitsShowcase() {
  return (
    <div
      role="group"
      aria-label="Platform benefits"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {BENEFITS.map((b, i) => (
        <Reveal key={b.title} delay={0.1 + i * 0.08}>
          <BenefitItem benefit={b} />
        </Reveal>
      ))}
    </div>
  );
}

function BenefitItem({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;

  return (
    <div className="h-full rounded-xl border border-border-light bg-background p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
        <Icon size={22} strokeWidth={1.75} className="text-blue" />
      </div>
      <h3 className="mt-6 font-display text-base text-black">{benefit.title}</h3>
      <p className="mt-3 text-sm text-grey-on-white leading-relaxed">
        {benefit.body}
      </p>
    </div>
  );
}
