"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

type TabId = "conversion" | "accuracy";

const TABS: Array<{
  id: TabId;
  label: string;
  stats: Array<{ value: number; prefix?: string; suffix: string; title: string; sub: string }>;
}> = [
  {
    id: "conversion",
    label: "Conversion",
    stats: [
      {
        value: 6,
        suffix: "x",
        title: "faster verification",
        sub: "vs. document-based verification",
      },
      {
        value: 20,
        prefix: "+",
        suffix: "%",
        title: "higher conversion",
        sub: "vs. document-based verification",
      },
    ],
  },
  {
    id: "accuracy",
    label: "Accuracy",
    stats: [
      {
        value: 1000,
        suffix: "x",
        title: "stronger fraud prevention",
        sub: "vs. non-document checks",
      },
      {
        value: 150,
        suffix: "x",
        title: "more accurate",
        sub: "than document-based verification",
      },
    ],
  },
];

export function ConversionAccuracyTabs() {
  const [active, setActive] = useState<TabId>("conversion");
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="flex h-full flex-col">
      <div className="inline-flex self-start rounded-lg border border-border-light bg-background p-1">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative rounded-md px-5 py-2 text-sm font-medium transition-colors",
                isActive ? "text-background" : "text-grey-on-white hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="ca-tab-bg"
                  className="absolute inset-0 rounded-md bg-[linear-gradient(120deg,#006aff_0%,#000_100%)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col justify-around gap-10"
          >
            {tab.stats.map((s) => (
              <div key={s.title} className="border-t border-border-light pt-8">
                <div className="font-display text-5xl md:text-6xl leading-none bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-4 font-display text-base md:text-lg text-foreground">{s.title}</div>
                <div className="mt-1.5 text-sm text-grey-on-white">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
