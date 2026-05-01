"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) =>
    `${prefix}${v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`,
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
  }, [inView, to, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
    </span>
  );
}
