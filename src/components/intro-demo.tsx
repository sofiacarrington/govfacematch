"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Check, IdCard, Loader2, ScanFace, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = {
  id: "scan" | "verify" | "result";
  icon: typeof IdCard;
  title: string;
  body: string;
  phone: PhoneScreen;
};

type PhoneScreen = {
  title: string;
  subtitle: string;
  hint?: string;
  cta?: string;
  status?: { label: string; tone: "info" | "success" };
  visual: "id" | "scan" | "match";
};

const STEPS: Step[] = [
  {
    id: "scan",
    icon: IdCard,
    title: "ID Barcode Scan + Selfie",
    body: "User scans the back of their government ID and captures a live selfie — both in a single guided flow.",
    phone: {
      title: "Show the back of your ID",
      subtitle: "Ensure your ID is readable",
      hint: "The photo will be taken automatically",
      cta: "Let's scan",
      visual: "id",
    },
  },
  {
    id: "verify",
    icon: ScanFace,
    title: "Verify against DMV record",
    body: "The selfie is matched to the issuing DMV's official record, in real time, inside the DMV's secure environment.",
    phone: {
      title: "Verifying with the DMV",
      subtitle: "Matching against the issuing state record",
      status: { label: "Real-time match · DMV · CA", tone: "info" },
      visual: "scan",
    },
  },
  {
    id: "result",
    icon: ShieldCheck,
    title: "Real time result",
    body: "A signed verification receipt is returned in milliseconds — defensible, auditable, and bound to the issuer.",
    phone: {
      title: "Match confirmed",
      subtitle: "Identity verified by the issuing DMV",
      status: { label: "score 0.987 · 184ms", tone: "success" },
      cta: "Continue",
      visual: "match",
    },
  },
];

const STEP_DURATION_MS = 5500;

export function IntroDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(performance.now());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / STEP_DURATION_MS);
      setProgress(p);
      if (p >= 1) {
        setActive((i) => (i + 1) % STEPS.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused]);

  const handleStepClick = (i: number) => {
    setActive(i);
    setProgress(0);
    startRef.current = performance.now();
  };

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 items-stretch"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-2xl bg-off-white border border-border-light p-6 md:p-8 flex items-center justify-center">
        <PhoneFrame screen={STEPS[active].phone} stepId={STEPS[active].id} />
      </div>

      <div className="flex flex-col">
        {STEPS.map((step, i) => {
          const isActive = i === active;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleStepClick(i)}
              className="group text-left relative flex-1 py-5 cursor-pointer"
              aria-current={isActive ? "step" : undefined}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-border-light overflow-hidden">
                {isActive && (
                  <motion.div
                    className="h-full bg-blue origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress }}
                    transition={{ duration: 0, ease: "linear" }}
                    style={{ width: "100%" }}
                  />
                )}
              </div>

              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-md border shrink-0 transition-colors",
                    isActive
                      ? "border-blue/25 bg-blue/10 text-blue"
                      : "border-border-light bg-background text-grey-on-white",
                  )}
                >
                  <Icon size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "font-display text-lg md:text-xl transition-colors",
                      isActive ? "text-foreground" : "text-foreground/70",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 max-w-md text-sm transition-colors",
                      isActive ? "text-grey-on-white" : "text-grey-on-white/70",
                    )}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PhoneFrame({ screen, stepId }: { screen: PhoneScreen; stepId: string }) {
  return (
    <div className="relative w-[220px] md:w-[240px] aspect-[9/17] rounded-[28px] bg-background border border-border-light overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]">
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-foreground/10" />

      <div className="px-4 pt-7 pb-3 h-full flex flex-col">
        <div className="flex justify-center">
          <span className="font-display text-blue text-sm font-medium">incode</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col mt-3"
          >
            <h4 className="text-center font-display text-sm text-foreground leading-tight">
              {screen.title}
            </h4>
            <p className="text-center text-[11px] text-grey-on-white mt-1">{screen.subtitle}</p>

            <div className="flex-1 flex items-center justify-center my-3">
              <PhoneVisual variant={screen.visual} />
            </div>

            {screen.hint && (
              <p className="text-center text-[10px] text-grey-on-white mb-2">{screen.hint}</p>
            )}

            {screen.status && (
              <div
                className={cn(
                  "mb-2 rounded-md border px-2 py-1.5 text-[10px] flex items-center gap-1.5",
                  screen.status.tone === "success"
                    ? "border-green/30 bg-green/10 text-green"
                    : "border-blue/25 bg-blue/10 text-blue",
                )}
              >
                {screen.status.tone === "success" ? (
                  <Check size={11} />
                ) : (
                  <Loader2 size={11} className="animate-spin" />
                )}
                <span className="tabular-nums">{screen.status.label}</span>
              </div>
            )}

            {screen.cta && (
              <Button type="button" size="sm" className="w-full">
                {screen.cta}
              </Button>
            )}

            <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-grey-on-white">
              <ShieldCheck size={9} className="text-blue" />
              verified by <span className="text-blue font-medium">incode</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhoneVisual({ variant }: { variant: "id" | "scan" | "match" }) {
  if (variant === "id") {
    return (
      <div className="relative h-24 w-24 rounded-full bg-blue/10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-blue/20" />
        <div className="relative h-16 w-24 rounded-md bg-background border border-border-light overflow-hidden">
          <div className="absolute top-1.5 left-1.5 h-1 w-6 rounded-full bg-foreground/40" />
          <div className="absolute top-3.5 left-1.5 h-0.5 w-12 rounded-full bg-foreground/20" />
          <div className="absolute top-5 left-1.5 h-0.5 w-10 rounded-full bg-foreground/20" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-2 rounded-sm bg-foreground/10" />
        </div>
      </div>
    );
  }
  if (variant === "scan") {
    return (
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-2 border-blue/30 border-dashed animate-spin [animation-duration:8s]" />
        <div className="absolute inset-3 rounded-full bg-blue/5 flex items-center justify-center">
          <Camera size={28} className="text-blue/70" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-24 w-24 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-green/15"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative h-16 w-16 rounded-full bg-green/15 border-2 border-green/40 flex items-center justify-center">
        <Check size={24} className="text-green" strokeWidth={3} />
      </div>
    </div>
  );
}
