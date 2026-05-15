"use client";

import { useEffect, useRef } from "react";
import {
  Cpu,
  Landmark,
  Network,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Highlight = {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  points: string[];
} & ({ video: string; image?: never } | { image: string; video?: never });

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
      "Biometric match against government records",
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
      "Trusted users move faster across the network",
    ],
    image: "/highlights/intelligence-network.png",
  },
];

function HighlightCard({ highlight }: { highlight: Highlight }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  const Icon = highlight.icon;

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  // On touch devices (no hover), auto-play videos when the card is in view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (supportsHover) return;
    const v = videoRef.current;
    const card = articleRef.current;
    if (!v || !card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={articleRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-background"
    >
      <div className="relative aspect-[21/9] bg-off-white">
        {"video" in highlight && highlight.video ? (
          <video
            ref={videoRef}
            src={highlight.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={highlight.image as string}
            alt={highlight.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Icon
          size={18}
          strokeWidth={1.75}
          className="text-blue"
          aria-hidden
        />
        <h3 className="mt-3 font-display text-lg leading-tight md:text-xl">
          {highlight.title}
        </h3>
        <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-foreground/75">
          {highlight.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-blue"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProductShowcase() {
  return (
    <section className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-5 pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 lg:px-8">
        <Reveal>
          <Eyebrow tone="light">Platform</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-[26px] leading-tight text-foreground sm:mt-5 sm:text-3xl md:text-4xl">
            Why enterprises choose Incode
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.id} delay={0.1 + i * 0.05}>
              <HighlightCard highlight={h} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
