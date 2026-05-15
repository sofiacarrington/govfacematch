"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

const SESSION_KEY = "incode-intro-played";

// Animation timeline (seconds):
//   0.00 – 0.20  selfie + halo fade in
//   0.20 – 1.60  dwell (selfie + halo on white)
//   1.60 – 1.85  selfie fades out
//   1.60 – 2.55  halo expands outward + white curtain opens a growing hole over the page
//   2.55 – 2.85  loader dismissed
const LOADER_DURATION = 2.85;

export function LoadingIntro() {
  // Start true on SSR + initial client render so markup matches; dismiss in
  // useEffect if the session key is already set (returning visitor).
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false);
      window.dispatchEvent(new CustomEvent("incode:intro-dismissed"));
    }
  }, []);

  const hole = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${hole}px, black calc(${hole}px + 1px))`;

  // Animate the page-reveal hole from 0px → 3000px during the explosion phase,
  // then dismiss the loader. Fire the "intro-dismissed" event the moment the
  // hole starts growing so the hero content animates in during the reveal.
  useEffect(() => {
    if (!show) return;
    let dispatched = false;
    const controls = animate(hole, [0, 0, 3000], {
      duration: LOADER_DURATION,
      times: [0, 1.6 / LOADER_DURATION, 2.55 / LOADER_DURATION],
      ease: [0.4, 0, 0.6, 1],
      onUpdate: (v) => {
        if (!dispatched && v > 1) {
          dispatched = true;
          window.dispatchEvent(new CustomEvent("incode:intro-dismissed"));
        }
      },
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setShow(false);
      },
    });
    return () => controls.stop();
  }, [show, hole]);

  // Drive the "Loading… NN%" counter.
  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const totalMs = LOADER_DURATION * 1000;
    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / totalMs) * 100));
      setProgress(pct);
      if (elapsed < totalMs) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [show]);

  // Lock body scroll while the loader is up.
  useEffect(() => {
    if (!show) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [show]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(false);
    window.dispatchEvent(new CustomEvent("incode:intro-dismissed"));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="pointer-events-auto fixed inset-0 z-[100] overflow-hidden"
        >
          {/* White curtain with a growing transparent hole that reveals the page */}
          <motion.div
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
            }}
            className="absolute inset-0 bg-background"
          />

          {/* Selfie illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: LOADER_DURATION,
              times: [
                0,
                0.2 / LOADER_DURATION,
                1.55 / LOADER_DURATION,
                1.85 / LOADER_DURATION,
              ],
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/Illustration/Selfie (Animated).svg"
              alt=""
              aria-hidden
              width={360}
              height={360}
              priority
              className="h-auto w-[65vw] max-w-[360px]"
            />
          </motion.div>

          {/* Halo — appears around selfie, then expands outward as the page is revealed */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1, 15],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: LOADER_DURATION,
              times: [
                0,
                0.3 / LOADER_DURATION,
                1.6 / LOADER_DURATION,
                2.55 / LOADER_DURATION,
              ],
              ease: [0.32, 0, 0.4, 1],
            }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <Image
              src="/halo.svg"
              alt=""
              aria-hidden
              width={396}
              height={396}
              priority
              className="h-auto w-[72vw] max-w-[396px] animate-[spin_3s_linear_infinite]"
            />
          </motion.div>

          {/* Loading label + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: LOADER_DURATION,
              times: [
                0,
                0.2 / LOADER_DURATION,
                1.55 / LOADER_DURATION,
                1.8 / LOADER_DURATION,
              ],
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex flex-col items-center gap-3"
          >
            <span className="font-display inline-flex items-baseline text-xl font-medium text-foreground sm:text-2xl">
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
            <span className="font-mono text-[11px] tracking-[0.15em] text-grey-on-white tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-border-light bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
