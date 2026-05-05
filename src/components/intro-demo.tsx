"use client";

import { useEffect, useRef } from "react";
import { IdCard, ScanFace, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PLAYBACK_RATE = 1.75;
const VIDEO_ASPECT = "1000 / 914";

const STEPS = [
  {
    icon: IdCard,
    title: "ID barcode scan + selfie",
    body: "Users scan the back of their government ID and take a live selfie in two simple guided steps.",
  },
  {
    icon: ScanFace,
    title: "Verify against DMV records",
    body: "The selfie is matched to the issuing DMV's official record within a secure environment.",
  },
  {
    icon: ShieldCheck,
    title: "Real-time result",
    body: "A verification result is returned instantly, delivering a fast, defensible, and auditable outcome.",
  },
];

export function IntroDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 items-center">
      <div
        className="relative overflow-hidden rounded-2xl bg-off-white"
        style={{ aspectRatio: VIDEO_ASPECT }}
      >
        <video
          ref={videoRef}
          src="/GFM_Flow.mp4"
          poster="/GFM_Flow_poster.jpg"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = PLAYBACK_RATE;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className={cn("py-5", i > 0 && "border-t border-border-light")}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-blue/25 bg-blue/10 text-blue shrink-0">
                  <Icon size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base md:text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm text-grey-on-white">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
