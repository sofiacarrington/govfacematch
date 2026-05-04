"use client";

import { useEffect, useRef, useState } from "react";
import { UnifiedFlow } from "./unified-flow";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const STAGES = ["govmatch", "govfacematch", "govdatamatch"] as const;
type Stage = (typeof STAGES)[number];

export function PinnedUnifiedFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>(STAGES[0]);

  useEffect(() => {
    const handler = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const wrapperH = el.offsetHeight;
      const scrollable = wrapperH - viewportH;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.max(0, Math.min(0.999, scrolled / scrollable));
      const idx = Math.floor(progress * STAGES.length);
      setStage(STAGES[idx]);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[280vh]">
      <div className="sticky top-24">
        <Reveal>
          <Eyebrow>Unified offering</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-3xl md:text-4xl max-w-3xl text-balance">
            Verify more users with the same level of trust
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-grey-on-black">
            Part of the broader GovMatch offering, combining biometric and data validation against
            government records to deliver high assurance across every state.
          </p>
        </Reveal>
        <div className="mt-8">
          <UnifiedFlow
            controlledId={stage}
            onSelectId={(id) => setStage(id as Stage)}
          />
        </div>
      </div>
    </div>
  );
}
