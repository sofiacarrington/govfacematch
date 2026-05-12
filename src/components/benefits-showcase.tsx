"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { motion } from "motion/react";
import { Brain, Check, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type Benefit = {
  icon: LucideIcon;
  title: string;
  body: string;
  capabilities: string[];
};

const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Eliminate fraud",
    body: "Keep bad actors out with advanced AI-powered prevention. Safeguard every step of the verification journey with end-to-end fraud signal monitoring.",
    capabilities: [
      "Document forgery & tampering detection",
      "Liveness and deepfake defense",
      "End-to-end risk signal monitoring",
    ],
  },
  {
    icon: Brain,
    title: "Stay ahead of new threats",
    body: "Anticipate and defeat deepfakes, synthetic identities, and other AI-driven fraud attacks with continuously evolving machine learning models.",
    capabilities: [
      "Continuously evolving models",
      "Synthetic identity detection",
      "Real-time threat intelligence",
    ],
  },
  {
    icon: TrendingUp,
    title: "Optimize conversion",
    body: "Provide users with effortless, seamless and secure identity verification. Customize your experience to blend seamlessly with your brand.",
    capabilities: [
      "Sub-second verification",
      "Branded, white-label UX",
      "Smart drop-off recovery",
    ],
  },
];

const CYCLE_MS = 5500;

export function BenefitsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % BENEFITS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      role="group"
      aria-label="Platform benefits"
      className="grid gap-4 md:grid-cols-3"
      onMouseLeave={() => setPaused(false)}
    >
      {BENEFITS.map((b, i) => (
        <Reveal key={b.title} delay={0.1 + i * 0.08}>
          <BenefitCard
            benefit={b}
            active={i === activeIndex}
            paused={paused}
            onActivate={() => {
              setActiveIndex(i);
              setPaused(true);
            }}
          />
        </Reveal>
      ))}
    </div>
  );
}

function BenefitCard({
  benefit,
  active,
  paused,
  onActivate,
}: {
  benefit: Benefit;
  active: boolean;
  paused: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = benefit.icon;

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      onMouseEnter={onActivate}
      onMouseMove={handleMouseMove}
      onFocus={onActivate}
      onClick={onActivate}
      style={{ "--cursor-x": "-300px", "--cursor-y": "-300px" } as CSSProperties}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-xl border p-7 text-left backdrop-blur transition-colors duration-500",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/60",
        active
          ? "border-blue/40 bg-white/[0.06]"
          : "border-white/10 bg-white/[0.03] hover:border-white/15",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--cursor-x) var(--cursor-y), rgba(0,106,255,0.18), transparent 65%)",
        }}
      />

      <motion.span
        key={active && !paused ? "running" : "idle"}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-blue to-blue-eyebrow"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active && !paused ? 1 : 0 }}
        transition={
          active && !paused
            ? { duration: CYCLE_MS / 1000, ease: "linear" }
            : { duration: 0.3, ease: "easeOut" }
        }
      />

      <div className="relative">
        <motion.span
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg border text-blue-eyebrow",
            active
              ? "border-blue/40 bg-blue/15 shadow-[0_0_28px_rgba(0,106,255,0.35)]"
              : "border-blue/25 bg-blue/10",
          )}
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon size={18} />
        </motion.span>

        <h3 className="mt-6 font-display text-lg md:text-xl text-white">
          {benefit.title}
        </h3>
        <p className="mt-3 text-grey-on-black leading-relaxed">{benefit.body}</p>

        <motion.div
          initial={false}
          animate={{
            height: active ? "auto" : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
            {benefit.capabilities.map((c, i) => (
              <motion.li
                key={c}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  x: active ? 0 : -6,
                }}
                transition={{
                  duration: 0.3,
                  delay: active ? 0.12 + i * 0.06 : 0,
                }}
                className="flex items-start gap-2 text-sm text-grey-on-black"
              >
                <Check
                  size={14}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-blue-eyebrow"
                />
                <span>{c}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </button>
  );
}
