"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck,
  IdCard,
  Landmark,
  Network,
  ScanFace,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = { icon: LucideIcon; label: string };

type Workflow = {
  id: "govmatch" | "govfacematch" | "govdatamatch";
  tab: string;
  tag: string;
  title: string;
  body: string;
  coverage: string;
  steps: Step[];
};

const WORKFLOWS: Workflow[] = [
  {
    id: "govmatch",
    tab: "GovMatch",
    tag: "Unified offering",
    title: "GovMatch",
    body: "Combines GovFaceMatch and GovDataMatch and seamlessly routes verifications based on the issuing state, automatically expanding coverage as new states go live.",
    coverage: "95%+ combined population coverage",
    steps: [
      { icon: IdCard, label: "Identity capture" },
      { icon: Network, label: "State-aware routing" },
      { icon: Landmark, label: "Issuing DMV" },
      { icon: ShieldCheck, label: "Verified" },
    ],
  },
  {
    id: "govfacematch",
    tab: "GovFaceMatch",
    tag: "Biometric route",
    title: "GovFaceMatch",
    body: "Matches a live biometric directly against the government portrait at the issuing DMV. Confirms the person, not just the identity.",
    coverage: "~20% U.S. population coverage",
    steps: [
      { icon: ScanFace, label: "Live selfie" },
      { icon: Landmark, label: "Issuing DMV" },
      { icon: BadgeCheck, label: "Biometric match" },
    ],
  },
  {
    id: "govdatamatch",
    tab: "GovDataMatch",
    tag: "Data route",
    title: "GovDataMatch",
    body: "Matches identity data attributes against DMV issuing records across 46 states. Confirms the identity exists in the government record.",
    coverage: "~85% U.S. population coverage",
    steps: [
      { icon: IdCard, label: "Identity data" },
      { icon: Landmark, label: "Issuing DMV" },
      { icon: FileCheck, label: "Record verified" },
    ],
  },
];

export function UnifiedFlow() {
  const [activeId, setActiveId] = useState<Workflow["id"]>("govmatch");
  const active = WORKFLOWS.find((w) => w.id === activeId) ?? WORKFLOWS[0];
  const isFeatured = active.id === "govmatch";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 lg:p-10 transition-colors",
        isFeatured
          ? "border-blue/40 bg-gradient-to-br from-blue/12 via-off-black to-off-black"
          : "border-border-dark bg-off-black",
      )}
    >
      {isFeatured && (
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-blue/25 blur-3xl" />
      )}

      <div className="relative">
        <div className="inline-flex rounded-lg border border-border-dark bg-rich-black p-1">
          {WORKFLOWS.map((w) => {
            const isActive = w.id === activeId;
            return (
              <button
                key={w.id}
                onClick={() => setActiveId(w.id)}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-grey-on-black hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="uf-tab-bg"
                    className="absolute inset-0 rounded-md bg-[linear-gradient(120deg,#006aff_0%,#000_100%)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{w.tab}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-14"
          >
            <div>
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-medium text-blue-eyebrow",
                  isFeatured ? "border-blue/40 bg-blue/15" : "border-blue/25 bg-blue/10",
                )}
              >
                {active.tag}
              </span>
              <h3
                className={cn(
                  "mt-3 font-display text-white",
                  isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
                )}
              >
                {active.title}
              </h3>
              <p className="mt-3 text-sm text-grey-on-black md:text-base">{active.body}</p>
              <div
                className={cn(
                  "mt-5 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs",
                  isFeatured
                    ? "bg-blue font-medium text-white"
                    : "border border-border-dark bg-rich-black text-grey-on-black",
                )}
              >
                {isFeatured ? (
                  <ShieldCheck size={14} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-eyebrow" />
                )}
                {active.coverage}
              </div>
            </div>

            <Steps steps={active.steps} featured={isFeatured} />
          </motion.div>
        </AnimatePresence>

        <div className="relative mt-10 border-t border-border-dark pt-5 text-xs text-grey-on-black">
          <span className="text-blue-eyebrow">GovMatch</span> is the unified offering — it routes
          to <span className="text-white">GovFaceMatch</span> when biometric verification is
          available, and falls back to <span className="text-white">GovDataMatch</span> for the
          remaining issuing states.
        </div>
      </div>
    </div>
  );
}

function Steps({ steps, featured }: { steps: Step[]; featured?: boolean }) {
  return (
    <div className="flex flex-wrap items-start gap-x-2 gap-y-4 lg:flex-nowrap lg:gap-3">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="flex items-start gap-2 lg:gap-3">
            <div className="flex w-20 flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg border",
                  featured
                    ? "border-blue/40 bg-blue/15 text-white"
                    : "border-border-dark bg-rich-black text-blue-eyebrow",
                )}
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <div className="text-center text-[11px] leading-tight text-grey-on-black">
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight size={16} className="mt-5 shrink-0 text-blue/60" />
            )}
          </div>
        );
      })}
    </div>
  );
}
