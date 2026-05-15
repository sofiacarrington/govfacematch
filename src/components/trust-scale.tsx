"use client";

import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Film,
  Landmark,
  Plane,
  Radio,
  ShoppingBag,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/section";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type Industry = {
  name: string;
  stat: string;
  body: string;
  icon: IconType;
  bgImage?: string;
};

const INDUSTRIES: Industry[] = [
  {
    name: "Global banks",
    stat: "8 of top 10",
    body: "U.S. banks trust Incode for identity at scale.",
    icon: Landmark,
    bgImage: "/industries/financial-services.png",
  },
  {
    name: "Entertainment",
    stat: "Top 5",
    body: "Video and gaming platforms protect creators and players.",
    icon: Film,
    bgImage: "/industries/gaming.png",
  },
  {
    name: "Telcos",
    stat: "7 of top 8",
    body: "U.S. carriers secured against SIM swap and ATO.",
    icon: Radio,
    bgImage: "/industries/telco.png",
  },
  {
    name: "Retail",
    stat: "6 of 8",
    body: "LATAM retailers verified across marketplace journeys.",
    icon: ShoppingBag,
    bgImage: "/industries/marketplaces.png",
  },
  {
    name: "Travel",
    stat: "Top 2",
    body: "Global travel brands verify travelers in seconds.",
    icon: Plane,
    bgImage: "/industries/travel.png",
  },
  {
    name: "Government",
    stat: "Federal",
    body: "Trusted by federal and state government programs.",
    icon: Building2,
    bgImage: "/industries/gov.png",
  },
];

const COPIES = 4;
const LOOPED = Array.from({ length: COPIES }).flatMap(() => INDUSTRIES);

export function TrustScale() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const getStep = () => {
      const card = el.querySelector("[data-card]") as HTMLElement | null;
      if (!card) return 0;
      return card.getBoundingClientRect().width + 16; // gap-4
    };

    const reposition = () => {
      const step = getStep();
      if (step === 0) return;
      const loopLen = step * INDUSTRIES.length;
      el.scrollLeft = loopLen;
    };

    reposition();

    const onScroll = () => {
      const step = getStep();
      if (step === 0) return;
      const loopLen = step * INDUSTRIES.length;
      if (el.scrollLeft >= loopLen * 3) {
        el.scrollLeft -= loopLen;
      } else if (el.scrollLeft < loopLen) {
        el.scrollLeft += loopLen;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", reposition);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", reposition);
    };
  }, []);

  const scrollByOne = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return;
    const step = card.getBoundingClientRect().width + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F9F9F9]">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10 sm:gap-6">
          <div className="min-w-0">
            <Eyebrow tone="light">Industries</Eyebrow>
            <h2 className="mt-3 font-display text-[26px] leading-tight text-black sm:mt-4 sm:text-3xl md:text-4xl">
              7.1B+ trust checks in 2025
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              aria-label="Previous industries"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-background text-foreground transition-colors hover:border-foreground/40 active:bg-foreground/[0.04] sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              aria-label="Next industries"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-background text-foreground transition-colors hover:border-foreground/40 active:bg-foreground/[0.04] sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-12 pt-2"
        >
          {LOOPED.map((ind, i) => {
            const Icon = ind.icon;
            const slug = ind.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                data-card
                key={`${ind.name}-${i}`}
                href={`/industries/${slug}`}
                className="group relative flex aspect-[5/4] w-full shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-rich-black p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(38,40,49,0.5)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                style={
                  ind.bgImage
                    ? {
                        backgroundImage: `url(${ind.bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.85))] transition-opacity duration-300 group-hover:opacity-30"
                />
                <div className="relative flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur">
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <span className="text-[13.5px] font-medium">{ind.name}</span>
                </div>

                <div className="relative mt-auto">
                  <div className="flex items-start gap-1.5 font-display text-3xl leading-[1.05] tracking-tight md:text-4xl">
                    <span>{ind.stat}</span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2.25}
                      className="mt-1 text-blue-eyebrow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-white/75">
                    {ind.body}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
