"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Workflow = {
  id: "govmatch" | "govfacematch" | "govdatamatch";
  tab: string;
  title: string;
  body: string[];
  coverage: string;
  diagram: string;
  emphasized?: boolean;
};

const WORKFLOWS: Workflow[] = [
  {
    id: "govmatch",
    tab: "Unified offering: GovMatch",
    title: "GovMatch",
    body: [
      "Combines GovFaceMatch and GovDataMatch, seamlessly routing verifications based on the issuing state.",
      "Automatically expands coverage as new states go live.",
    ],
    coverage: "95%+ combined population coverage",
    diagram: "/GovMatch.png",
    emphasized: true,
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
  const [activeId, setActiveId] = useState<Workflow["id"]>(WORKFLOWS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id as Workflow["id"]);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );
    WORKFLOWS.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <nav>
          <ul className="flex flex-col gap-2">
            {WORKFLOWS.map((w) => {
              const isActive = activeId === w.id;
              return (
                <li key={w.id}>
                  <a
                    href={`#${w.id}`}
                    className={cn(
                      "block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-white/25 bg-[linear-gradient(120deg,#006aff_0%,#000_100%)] text-white"
                        : w.emphasized
                          ? "border-blue/40 bg-blue/5 text-white hover:bg-blue/10"
                          : "border-border-dark bg-rich-black text-grey-on-black hover:text-white",
                    )}
                  >
                    {w.tab}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col gap-6">
        {WORKFLOWS.map((w) => (
          <article
            key={w.id}
            id={w.id}
            className="scroll-mt-24 rounded-2xl border border-border-dark bg-off-black p-6 lg:p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl text-white">{w.title}</h3>
            <div className="mt-2 max-w-3xl text-sm text-grey-on-black space-y-1">
              {w.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <p
              className={cn(
                "mt-2 text-xs",
                w.emphasized ? "text-blue-eyebrow" : "text-grey-on-black",
              )}
            >
              {w.coverage}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border-dark bg-rich-black p-6 lg:p-8">
              <div className="mx-auto max-w-4xl">
                <Image
                  src={w.diagram}
                  alt={`${w.title} flow diagram`}
                  width={2516}
                  height={436}
                  priority={w.id === "govmatch"}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
