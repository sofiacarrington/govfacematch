"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const HIGHLIGHTS = [
  {
    eyebrow: "Compliance",
    title: "First to achieve iBeta Level 3 on iOS and Android",
    body: "Validated under real-world attack scenarios.",
    cta: "Learn more",
  },
  {
    eyebrow: "Product launch",
    title: "Introducing Deepsight for Documents",
    body: "Multi-layer defense against synthetic IDs.",
    cta: "Read more",
  },
  {
    eyebrow: "Recognition",
    title: "Named a Leader in the Gartner® Magic Quadrant™",
    body: "Identity Verification — second consecutive year.",
    cta: "Download the report",
  },
];

export function HeroSection() {
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const dismiss = () => setAnnouncementOpen(false);
  const reopen = () => setAnnouncementOpen(true);
  const goPrev = () =>
    setActive((a) => (a - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length);
  const goNext = () => setActive((a) => (a + 1) % HIGHLIGHTS.length);

  useEffect(() => {
    if (!announcementOpen) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % HIGHLIGHTS.length);
    }, 5000);
    return () => window.clearTimeout(id);
  }, [announcementOpen, active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/Gradientbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/25"
      />
      <section
        aria-hidden={scrolled}
        className={`relative w-full border-b border-white/10 bg-white/[0.04] pt-16 backdrop-blur-xl transition-opacity duration-300 md:pt-20 ${
          scrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
          <div className="flex h-[60px] items-center justify-between md:h-16">
            <button
              type="button"
              onClick={announcementOpen ? dismiss : reopen}
              aria-label={announcementOpen ? "Hide highlights" : "Show highlights"}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-[12.5px] font-medium text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Highlights
              <ChevronDown
                size={13}
                strokeWidth={2.25}
                className={`transition-transform duration-200 ${
                  announcementOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {announcementOpen && (
              <div className="flex items-center gap-3">
                <span className="text-[12px] tabular-nums text-white/55">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(HIGHLIGHTS.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous highlight"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft size={15} strokeWidth={2.25} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next highlight"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight size={15} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <AnimatePresence initial={false}>
            {announcementOpen && (
              <motion.div
                key="highlights-carousel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    opacity: { duration: 0.2, ease: "easeOut" },
                  },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid pt-1 pb-8 md:pb-10">
                  {HIGHLIGHTS.map((h, i) => {
                    const isActive = i === active;
                    return (
                      <motion.a
                        key={h.title}
                        href="#"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        aria-hidden={!isActive}
                        tabIndex={isActive ? 0 : -1}
                        className={`group col-start-1 row-start-1 flex flex-col rounded-xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md transition-colors md:p-6 ${
                          isActive
                            ? "hover:border-white/30 hover:bg-white/[0.1]"
                            : "pointer-events-none"
                        }`}
                      >
                        <span className="inline-flex w-fit items-center rounded-full border border-blue-eyebrow/30 bg-blue-eyebrow/15 px-2.5 py-0.5 text-[10.5px] font-medium text-blue-eyebrow">
                          {h.eyebrow}
                        </span>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-white md:text-[26px]">
                          {h.title}
                        </h3>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-grey-on-black">
                          {h.body}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-eyebrow">
                          {h.cta}
                          <ArrowUpRight
                            size={13}
                            strokeWidth={2.25}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="relative flex flex-1 items-end">
        <div className="mx-auto w-full max-w-[1280px] px-5 pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14 lg:px-8">
          <div className="-mt-0.5 grid gap-8 sm:gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal duration={0.35} waitForIntro>
                <p className="text-sm font-medium text-white sm:text-base md:text-lg">
                  Power a world of trust
                </p>
              </Reveal>
              <Reveal delay={0.05} duration={0.35} waitForIntro>
                <h1 className="mt-4 font-display text-[40px] leading-[1.02] tracking-tight text-white sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">
                  AI-Powered
                  <br />
                  Identity Platform
                </h1>
              </Reveal>
            </div>

            <div className="lg:pt-3">
              <Reveal delay={0.1} duration={0.35} waitForIntro>
                <p className="text-[15px] leading-relaxed text-white sm:text-base md:text-lg">
                  Incode is an enterprise-grade platform that verifies identity
                  and evaluates user risk, helping businesses decide who to
                  trust in real time.
                </p>
              </Reveal>
              <Reveal delay={0.15} duration={0.35} waitForIntro>
                <div className="mt-6 sm:mt-8">
                  <ButtonLink href="/contact" variant="outline-white">
                    Request a demo
                    <ArrowUpRight size={16} strokeWidth={2.25} />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
