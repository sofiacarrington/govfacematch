"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { IdCard, ScanFace, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: "scan" | "verify" | "result";
  icon: typeof IdCard;
  title: string;
  body: string;
  video: string;
  poster: string;
};

const PLAYBACK_RATE = 1.75;
const VIDEO_ASPECT = "1473 / 1346";

const STEPS: Step[] = [
  {
    id: "scan",
    icon: IdCard,
    title: "ID barcode scan + selfie",
    body: "Users scan the back of their government ID and take a live selfie in a single guided step.",
    video: "/GFM_Flow_Step1.mp4",
    poster: "/GFM_Flow_Step1_poster.jpg",
  },
  {
    id: "verify",
    icon: ScanFace,
    title: "Verify against DMV records",
    body: "The selfie is matched to the issuing DMV's official record in real time within a secure environment.",
    video: "/GFM_Flow_Step2.mp4",
    poster: "/GFM_Flow_Step2_poster.jpg",
  },
  {
    id: "result",
    icon: ShieldCheck,
    title: "Real time result",
    body: "A signed verification result is returned in milliseconds, delivering a defensible and auditable outcome.",
    video: "/GFM_Flow_Step3.mp4",
    poster: "/GFM_Flow_Step3_poster.jpg",
  },
];

export function IntroDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const progress = useMotionValue(0);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.playbackRate = PLAYBACK_RATE;
      if (i === active) {
        if (paused) v.pause();
        else v.play().catch(() => {});
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [active, paused]);

  useEffect(() => {
    progress.set(0);
    let raf = 0;
    const tick = () => {
      const v = videoRefs.current[active];
      if (v && v.duration > 0) {
        progress.set(Math.min(1, v.currentTime / v.duration));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, progress]);

  const handleStepClick = (i: number) => {
    setActive(i);
  };

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 items-stretch"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-off-white"
        style={{ aspectRatio: VIDEO_ASPECT }}
      >
        {STEPS.map((step, i) => (
          <video
            key={step.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={step.video}
            poster={step.poster}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = PLAYBACK_RATE;
            }}
            onEnded={() => {
              if (i === active) setActive((idx) => (idx + 1) % STEPS.length);
            }}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-150",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
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
                    className="h-full w-full bg-blue origin-left"
                    style={{ scaleX: progress }}
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
                      "font-display text-base md:text-lg transition-colors",
                      isActive ? "text-foreground" : "text-foreground/70",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 max-w-md text-sm transition-colors",
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
