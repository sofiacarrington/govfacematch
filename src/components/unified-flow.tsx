"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Workflow = {
  id: "govmatch" | "govfacematch" | "govdatamatch";
  tab: string;
  title: string;
  body: string[];
  coverage: string;
  diagram: string;
  diagramWidth: number;
  diagramHeight: number;
  emphasized?: boolean;
};

const WORKFLOWS: Workflow[] = [
  {
    id: "govmatch",
    tab: "Unified offering: GovMatch",
    title: "GovMatch",
    body: [
      "Combines GovFaceMatch and GovDataMatch to route verifications based on the issuing state.",
      "Coverage expands automatically as new states go live, with no additional integration required.",
    ],
    coverage: "95%+ combined population coverage",
    diagram: "/GovMatch.png",
    diagramWidth: 2568,
    diagramHeight: 992,
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
    diagramWidth: 1832,
    diagramHeight: 808,
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
    diagramWidth: 1944,
    diagramHeight: 616,
  },
];

export function UnifiedFlow() {
  const [activeId, setActiveId] = useState<Workflow["id"]>(WORKFLOWS[0].id);
  const [zoomed, setZoomed] = useState<Workflow | null>(null);

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

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
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
            <p
              className={cn(
                "lg:hidden text-xs font-medium uppercase tracking-wider",
                w.emphasized ? "text-blue-eyebrow" : "text-grey-on-black",
              )}
            >
              {w.tab}
            </p>
            <h3 className="mt-1 lg:mt-0 font-display text-2xl md:text-3xl text-white">{w.title}</h3>
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
            <button
              type="button"
              onClick={() => setZoomed(w)}
              className="group relative mt-6 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border-dark bg-rich-black p-6 lg:p-8"
              aria-label={`Open ${w.title} flow diagram in full screen`}
            >
              <span className="pointer-events-none absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-grey-on-black opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 size={14} />
              </span>
              <div className="mx-auto max-w-4xl">
                <Image
                  src={w.diagram}
                  alt={`${w.title} flow diagram`}
                  width={w.diagramWidth}
                  height={w.diagramHeight}
                  priority={w.id === "govmatch"}
                  className="h-auto w-full"
                />
              </div>
            </button>
          </article>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomed.title} flow diagram`}
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1500px] rounded-2xl border border-border-dark bg-off-black p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] md:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg text-white md:text-xl">{zoomed.title}</h3>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center rounded-xl border border-border-dark bg-rich-black p-4 md:mt-8 md:p-8">
              <Image
                src={zoomed.diagram}
                alt={`${zoomed.title} flow diagram`}
                width={zoomed.diagramWidth}
                height={zoomed.diagramHeight}
                priority
                className="h-auto max-h-[78vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
