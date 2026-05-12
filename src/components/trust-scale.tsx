"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Building,
  Landmark,
  Plane,
  ShoppingBag,
  Smartphone,
  Tv,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

type Org = {
  icon: LucideIcon;
  title: string;
  lines: string[];
  image?: string;
  imageAlt?: string;
};

const ORGANIZATIONS: Org[] = [
  {
    icon: Building,
    title: "Global banks",
    lines: [
      "8 of the top 10 U.S. banks",
      "2 of the top 3 European neobanks",
      "8 of the top 10 Mexican banks",
    ],
    image: "/industries/global-banks.png",
    imageAlt: "Global banks illustration",
  },
  {
    icon: Tv,
    title: "Entertainment",
    lines: ["Top video and gaming companies"],
    image: "/industries/entertainment.png",
    imageAlt: "Entertainment illustration",
  },
  {
    icon: Smartphone,
    title: "Telcos",
    lines: ["7 of the top 8 U.S. telcos", "2 of the top Mexican telcos"],
    image: "/industries/telcos.png",
    imageAlt: "Telcos illustration",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    lines: [
      "2 of the largest global retailers",
      "6 of the 8 top retailers in SS LATAM",
    ],
    image: "/industries/retail.png",
    imageAlt: "Retail illustration",
  },
  {
    icon: Plane,
    title: "Travel",
    lines: ["2 of the top global travel companies"],
    image: "/industries/travel.png",
    imageAlt: "Travel illustration",
  },
  {
    icon: Landmark,
    title: "Government",
    lines: ["Federal and state"],
    image: "/industries/government.png",
    imageAlt: "Government illustration",
  },
];

const ROTATE_MS = 3500;

export function TrustScale() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (pinned !== null || hovered !== null) return;
    const id = window.setInterval(() => {
      setAuto((a) => (a + 1) % ORGANIZATIONS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pinned, hovered]);

  const displayIndex = hovered ?? pinned ?? auto;
  const displayed = ORGANIZATIONS[displayIndex];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  const handleMouseLeaveCard = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "30%");
  };

  const togglePin = (i: number) => {
    setPinned((p) => (p === i ? null : i));
  };

  return (
    <Section tone="rich">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 items-stretch">
        <Reveal>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveCard}
            style={
              {
                "--mx": "50%",
                "--my": "30%",
                backgroundImage:
                  "radial-gradient(620px circle at var(--mx) var(--my), rgba(0,106,255,0.22), transparent 45%)",
              } as React.CSSProperties
            }
            className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-off-black border border-white/[0.08] flex flex-col items-center justify-center text-center transition-[background-position] duration-200"
          >
            <div
              aria-hidden
              className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue/30 blur-[100px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue/15 blur-[100px]"
            />

            <AnimatePresence mode="sync">
              <motion.div
                key={`img-${displayIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {displayed.image && (
                  <Image
                    src={displayed.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    aria-hidden
                  />
                )}
                <div aria-hidden className="absolute inset-0 bg-black/45" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center justify-center px-10 py-14 md:px-14">
              <div className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
                <Counter to={7.1} suffix="B+" decimals={1} duration={1.8} />
              </div>
              <p className="mt-6 text-base md:text-lg text-grey-on-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                trust checks in 2025
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.15] text-balance text-white">
              Securing the largest organizations in the world
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {ORGANIZATIONS.map((org, i) => {
              const Icon = org.icon;
              const isDisplayed = displayIndex === i;
              const isPinned = pinned === i;
              const isAutoRotating =
                isDisplayed && pinned === null && hovered === null;
              return (
                <Reveal key={org.title} delay={0.05 + i * 0.05} className="h-full">
                  <button
                    type="button"
                    onClick={() => togglePin(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    aria-pressed={isPinned}
                    className={cn(
                      "group/card relative h-full w-full overflow-hidden text-left rounded-xl border p-5 transition-all duration-300 outline-none focus-visible:border-blue/60 cursor-pointer",
                      isPinned
                        ? "border-blue/55 bg-white/[0.06] -translate-y-0.5 shadow-[0_18px_40px_-22px_rgba(0,106,255,0.6)]"
                        : isDisplayed
                          ? "border-blue/30 bg-white/[0.035]"
                          : "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.025]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Icon
                        size={20}
                        strokeWidth={1.75}
                        className={cn(
                          "transition-colors duration-300",
                          isPinned || isDisplayed
                            ? "text-blue-eyebrow"
                            : "text-white",
                        )}
                      />
                      {isPinned && (
                        <span className="inline-flex h-2 w-2 rounded-full bg-blue shadow-[0_0_8px_rgba(0,106,255,0.8)]" />
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-base font-medium text-white">
                      {org.title}
                    </h3>
                    <ul className="mt-1.5 text-sm text-grey-on-black leading-snug">
                      {org.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>

                    {isAutoRotating && (
                      <motion.span
                        key={`rot-${i}-${auto}`}
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left bg-blue/70"
                      />
                    )}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
