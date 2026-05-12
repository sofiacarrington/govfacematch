"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Copy = {
  title: ReactNode;
  subtitle: string;
};

const OPTIONS: Copy[] = [
  {
    title: (
      <>
        A new standard in
        <br />
        identity verification
      </>
    ),
    subtitle:
      "The first identity solution to match biometrics against DMV records. Higher conversion and stronger fraud prevention, with no tradeoff.",
  },
  {
    title: "The first identity solution to match biometrics against DMV records",
    subtitle:
      "A new standard in identity verification. Higher conversion and stronger fraud prevention, with no tradeoff.",
  },
];

export function HeroCopy() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Reveal>
        <div
          role="tablist"
          aria-label="Hero copy variant"
          className="mb-12 inline-flex rounded-full border border-white/15 bg-white/5 p-1 text-xs backdrop-blur-sm"
        >
          {OPTIONS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition-colors",
                index === i
                  ? "bg-blue text-white"
                  : "text-grey-on-black hover:text-white"
              )}
            >
              Op {i + 1}
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <Eyebrow>GovFaceMatch</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-6">
          {OPTIONS.map((opt, i) => (
            <div
              key={i}
              aria-hidden={index !== i}
              className={cn(
                "transition-opacity duration-200",
                index === i
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0"
              )}
            >
              <h1 className="font-display text-[33px] md:text-[42px] lg:text-[54px] leading-[1.05] text-balance">
                {opt.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-grey-on-black text-balance">
                {opt.subtitle}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">
            Request a demo
            <ArrowUpRight size={16} strokeWidth={2.25} />
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
