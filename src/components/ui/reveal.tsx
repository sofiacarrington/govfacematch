"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const INTRO_STORAGE_KEY = "incode-intro-played";
const INTRO_EVENT = "incode:intro-dismissed";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  waitForIntro = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  waitForIntro?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [introReady, setIntroReady] = useState(!waitForIntro);

  useEffect(() => {
    if (!waitForIntro) return;
    if (sessionStorage.getItem(INTRO_STORAGE_KEY)) {
      setIntroReady(true);
      return;
    }
    const handler = () => setIntroReady(true);
    window.addEventListener(INTRO_EVENT, handler);
    return () => window.removeEventListener(INTRO_EVENT, handler);
  }, [waitForIntro]);

  const animate = inView && introReady;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
