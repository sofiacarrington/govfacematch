"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Workflow = {
  id: "govmatch" | "govfacematch" | "govdatamatch";
  tab: string;
  title: string;
  body: string[];
  coverage: string;
  diagram: string;
};

const WORKFLOWS: Workflow[] = [
  {
    id: "govmatch",
    tab: "Unified offering: GovMatch",
    title: "GovMatch",
    body: [
      "Combines GovFaceMatch and GovDataMatch and seamlessly routes verifications based on the issuing state, automatically expanding coverage as new states go live.",
    ],
    coverage: "95%+ combined population coverage",
    diagram: "/GovMatch.png",
  },
  {
    id: "govfacematch",
    tab: "GovFaceMatch",
    title: "GovFaceMatch",
    body: [
      "Matches a live biometric directly against the government portrait at the issuing DMV.",
      "Confirms the person, not just the identity.",
    ],
    coverage: "~20% U.S. population coverage",
    diagram: "/GovFaceMatch.png",
  },
  {
    id: "govdatamatch",
    tab: "GovDataMatch",
    title: "GovDataMatch",
    body: [
      "Matches identity data attributes against DMV issuing records across 46 states.",
      "Confirms the identity exists in the government record.",
    ],
    coverage: "~85% U.S. population coverage",
    diagram: "/GovDataMatch.png",
  },
];

export function UnifiedFlow() {
  const [activeId, setActiveId] = useState<Workflow["id"]>("govmatch");
  const active = WORKFLOWS.find((w) => w.id === activeId) ?? WORKFLOWS[0];
  const isFeatured = active.id === "govmatch";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-dark bg-off-black p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
        <TabButton workflow={WORKFLOWS[1]} activeId={activeId} setActiveId={setActiveId} />
        <Operator>+</Operator>
        <TabButton workflow={WORKFLOWS[2]} activeId={activeId} setActiveId={setActiveId} />
        <Operator className="hidden sm:inline">=</Operator>
        <span className="basis-full sm:hidden" />
        <TabButton
          workflow={WORKFLOWS[0]}
          activeId={activeId}
          setActiveId={setActiveId}
          emphasized
        />
      </div>

      <motion.div
        key={`text-${active.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-8"
      >
        <h3 className="font-display text-2xl md:text-3xl text-white">{active.title}</h3>
        <div className="mt-2 max-w-3xl text-sm text-grey-on-black space-y-1">
          {active.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <p
          className={cn(
            "mt-2 text-xs",
            isFeatured ? "text-blue-eyebrow" : "text-grey-on-black",
          )}
        >
          {active.coverage}
        </p>
      </motion.div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-border-dark bg-rich-black p-6 lg:mt-8 lg:p-8">
        <Image
          src={active.diagram}
          alt={`${active.title} flow diagram`}
          width={2516}
          height={436}
          priority={active.id === "govmatch"}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function TabButton({
  workflow,
  activeId,
  setActiveId,
  emphasized,
}: {
  workflow: Workflow;
  activeId: Workflow["id"];
  setActiveId: (id: Workflow["id"]) => void;
  emphasized?: boolean;
}) {
  const isActive = workflow.id === activeId;
  return (
    <button
      onClick={() => setActiveId(workflow.id)}
      className={cn(
        "relative rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-transparent text-white"
          : emphasized
            ? "border-blue/40 bg-blue/5 text-white hover:bg-blue/10"
            : "border-border-dark bg-rich-black text-grey-on-black hover:text-white",
      )}
    >
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-[linear-gradient(120deg,#006aff_0%,#000_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative">{workflow.tab}</span>
    </button>
  );
}

function Operator({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("select-none font-display text-xl text-grey-on-black", className)}
      aria-hidden
    >
      {children}
    </span>
  );
}
