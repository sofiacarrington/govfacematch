"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";

export function HeroVideo({
  src = "/hero.mp4",
  poster = "/GFMExplainer_Thumbnail.png",
}: {
  src?: string;
  poster?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10">
        <div className="absolute inset-0 glow-blue blur-[80px] opacity-70" />
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play explainer video"
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-rich-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/60"
      >
        <Image
          src={poster}
          alt="GovFaceMatch explainer"
          fill
          priority
          className="object-cover blur-[2px] scale-105 transition-transform duration-500 group-hover:scale-[1.07]"
          sizes="(min-width: 1024px) 640px, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
        <div className="pointer-events-none absolute inset-0 bg-rich-black/30 transition-colors group-hover:bg-rich-black/40" />

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="relative inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.04]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-rich-black">
              <Play size={11} className="ml-0.5" fill="currentColor" strokeWidth={0} />
            </span>
            Play video
          </span>
        </span>
      </button>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 inset-x-8 h-16 rounded-[3rem] bg-blue/30 blur-3xl opacity-60 -z-10"
      />

      <VideoModal open={open} onClose={() => setOpen(false)} src={src} />
    </div>
  );
}

function VideoModal({
  open,
  onClose,
  src,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-rich-black/85 backdrop-blur-md p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="GovFaceMatch explainer"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-2 text-sm text-white border border-white/10 backdrop-blur transition-colors"
            >
              <X size={16} />
              Close
              <span className="hidden md:inline text-white/50 ml-1 text-xs">esc</span>
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-inset ring-white/10">
              <video
                key={src}
                className="h-full w-full"
                src={src}
                autoPlay
                controls
                playsInline
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
