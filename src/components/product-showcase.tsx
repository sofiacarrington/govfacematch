"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Landmark,
  Network,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Highlight = {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  points: string[];
} & ({ video: string; image?: never } | { image: string; video?: never });

// TODO: replace each `video` path with the corresponding clip per highlight
const HIGHLIGHTS: Highlight[] = [
  {
    id: "ai",
    icon: Cpu,
    title: "AI that adapts faster than fraud",
    intro: "Real-time adaptation to evolving fraud.",
    points: [
      "Incode builds its core AI, with 35+ fully automated models",
      "Learns from every new fraud vector in real time",
    ],
    image: "/highlights/ai-adapts-v2.png",
  },
  {
    id: "gov-backed",
    icon: Landmark,
    title: "Government-backed verification",
    intro: "Deterministic verification.",
    points: [
      "Direct integrations with government systems of record",
      "Biometric match against government records with a deterministic result",
    ],
    video: "/highlights/government-backed.mp4",
  },
  {
    id: "ux",
    icon: Zap,
    title: "Frictionless UX",
    intro: "Low-friction user experience.",
    points: [
      "2x faster than the next best solution",
      "90% of users verified on the first attempt",
      "Eliminates abandonment from complex ID flows",
    ],
    video: "/highlights/frictionless-ux.mp4",
  },
  {
    id: "network",
    icon: Network,
    title: "Self-learning intelligence network",
    intro: "Network-powered fraud intelligence.",
    points: [
      "Shared fraud signals across a trusted ecosystem",
      "Fraudsters blocked in one system are flagged across the network",
      "Trusted users move faster across the network",
    ],
    image: "/highlights/intelligence-network.png",
  },
];

const ROTATE_MS = 6000;

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % HIGHLIGHTS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = HIGHLIGHTS[active];
  const goTo = (i: number) => setActive((i + HIGHLIGHTS.length) % HIGHLIGHTS.length);

  return (
    <Section tone="light">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow tone="light">Platform</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl leading-[1.15] text-balance text-foreground">
            Why enterprises choose Incode
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-grey-on-white leading-relaxed">
            Incode delivers the accuracy, speed, and scale to stop AI-driven fraud without
            compromising user experience.
          </p>
        </Reveal>
      </div>

      <div
        className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col">
          {HIGHLIGHTS.map((h, i) => {
            const isActive = active === i;
            const Icon = h.icon;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "group/tab relative text-left py-5 pl-5 border-l-2 transition-colors cursor-pointer outline-none focus-visible:border-blue",
                  isActive
                    ? "border-blue"
                    : "border-border-light hover:border-foreground/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-blue"
                        : "text-foreground/40 group-hover/tab:text-foreground/65",
                    )}
                    aria-hidden
                  />
                  <h3
                    className={cn(
                      "font-display text-lg md:text-xl font-medium leading-tight tracking-tight transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/45 group-hover/tab:text-foreground/75",
                    )}
                  >
                    {h.title}
                  </h3>
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm font-medium text-blue">
                        {h.intro}
                      </p>
                      <ul className="mt-4 space-y-2 text-[13.5px] text-foreground/75 leading-relaxed">
                        {h.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-blue"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      {!paused && (
                        <motion.span
                          key={`progress-${i}-${active}`}
                          aria-hidden
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                          className="mt-5 block h-px origin-left bg-blue/60"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-light bg-off-white">
            <AnimatePresence mode="wait">
              {"video" in current && current.video ? (
                <motion.video
                  key={current.id}
                  src={current.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image as string}
                    alt={current.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous highlight"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-light bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background hover:border-foreground/30"
            >
              <ChevronLeft size={16} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next highlight"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-light bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background hover:border-foreground/30"
            >
              <ChevronRight size={16} strokeWidth={2.25} />
            </button>

            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5">
              {HIGHLIGHTS.map((h, i) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${h.title}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    active === i
                      ? "w-6 bg-blue"
                      : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
