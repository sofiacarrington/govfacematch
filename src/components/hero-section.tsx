"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const SESSION_KEY = "incode-announcement-dismissed";

const HIGHLIGHTS = [
  {
    eyebrow: "Compliance",
    title:
      "First company to achieve iBeta Level 3 compliance on iOS and Android",
    body: "Independent validation under real-world attack scenarios.",
    cta: "Learn more",
  },
  {
    eyebrow: "New",
    title: "Introducing Deepsight for Documents",
    body: "The most accurate multi-layer defense against synthetic IDs.",
    cta: "Read more",
  },
  {
    eyebrow: "Recognition",
    title:
      "Named a Leader in the Gartner® Magic Quadrant™ for Identity Verification for the second consecutive year",
    body: "",
    cta: "Download the report",
  },
];

export function HeroSection() {
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setAnnouncementOpen(false);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setAnnouncementOpen(false);
  };

  const expanded = !announcementOpen;

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section
        className={cn(
          "relative transition-[min-height] duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          expanded && "min-h-screen flex items-end",
        )}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8 pt-36 md:pt-44 pb-10 md:pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal waitForIntro>
                <p className="text-base md:text-lg font-medium text-white">
                  Power a world of trust
                </p>
              </Reveal>
              <Reveal delay={0.1} waitForIntro>
                <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white">
                  AI-Powered
                  <br />
                  Identity Platform
                </h1>
              </Reveal>
            </div>

            <div className="lg:pt-3">
              <Reveal delay={0.2} waitForIntro>
                <p className="text-base md:text-lg text-grey-on-black leading-relaxed">
                  Incode is an enterprise-grade platform that verifies identity
                  and evaluates user risk, helping businesses decide who to
                  trust in real time.
                </p>
              </Reveal>
              <Reveal delay={0.3} waitForIntro>
                <div className="mt-8">
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

      <AnimatePresence initial={false}>
        {announcementOpen && (
          <motion.section
            key="announcement"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.25, ease: "easeOut" },
              },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden border-t border-white/10 bg-white/[0.04] backdrop-blur-xl"
          >
            <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8 pt-6 md:pt-8 pb-12 md:pb-14">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/70">
                  Highlights
                </span>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Close announcement"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {HIGHLIGHTS.map((h, i) => (
                  <Reveal key={h.title} delay={i * 0.08} className="h-full">
                    <a
                      href="#"
                      className="group flex h-full flex-col rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-5 transition-colors hover:border-white/30 hover:bg-white/[0.1]"
                    >
                      <span className="inline-flex w-fit items-center rounded-full border border-blue-eyebrow/30 bg-blue-eyebrow/15 px-2 py-0.5 text-[10.5px] font-medium text-blue-eyebrow">
                        {h.eyebrow}
                      </span>
                      <h3 className="mt-3.5 font-display text-base leading-snug text-balance text-white">
                        {h.title}
                      </h3>
                      {h.body && (
                        <p className="mt-2 text-[13px] text-grey-on-black leading-relaxed">
                          {h.body}
                        </p>
                      )}
                      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-eyebrow">
                        {h.cta}
                        <ArrowUpRight
                          size={13}
                          strokeWidth={2.25}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
