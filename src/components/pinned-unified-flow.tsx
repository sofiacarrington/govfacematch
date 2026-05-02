"use client";

import { useEffect, useRef, useState } from "react";
import { UnifiedFlow } from "./unified-flow";

const STAGES = ["govfacematch", "govdatamatch", "govmatch"] as const;
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
    <div ref={wrapperRef} className="relative mt-12 h-[280vh]">
      <div className="sticky top-20 flex h-[calc(100vh-80px)] items-center">
        <div className="w-full">
          <UnifiedFlow controlledId={stage} />
        </div>
      </div>
    </div>
  );
}
