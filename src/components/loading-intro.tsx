"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "incode-intro-played";
const LOADER_DURATION = 1.2;

export function LoadingIntro() {
  const [show, setShow] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!show || !hydrated) return;
    const start = performance.now();
    const totalMs = LOADER_DURATION * 1000;
    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, 50 + Math.floor((elapsed / totalMs) * 50));
      setProgress(pct);
      if (elapsed < totalMs) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [show, hydrated]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!show || !hydrated) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [show, hydrated]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(false);
    window.dispatchEvent(new CustomEvent("incode:intro-dismissed"));
  };

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{
            duration: LOADER_DURATION,
            times: [0, 0.85, 1],
            ease: [0.4, 0, 0.6, 1],
          }}
          onAnimationComplete={() => {
            if (show) dismiss();
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <video
            ref={videoRef}
            src="/loader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-[0.05em] text-white/80 tabular-nums">
              {String(progress).padStart(3, "0")}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-16 flex items-center justify-center">
            <span className="font-display inline-flex items-baseline text-2xl font-medium text-white">
              Loading
              <span className="ml-1 inline-flex">
                <span className="animate-[loading-dot_1.4s_ease-in-out_infinite]">.</span>
                <span
                  className="animate-[loading-dot_1.4s_ease-in-out_infinite]"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="animate-[loading-dot_1.4s_ease-in-out_infinite]"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:border-white/50 hover:text-white"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
