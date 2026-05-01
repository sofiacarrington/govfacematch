import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Lock,
  Network,
  ShieldCheck,
  ShieldHalf,
  ShieldOff,
  Sparkles,
  UserX,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { HeroVideo } from "@/components/hero-video";
import { IntroDemo } from "@/components/intro-demo";
import { LogoMarquee } from "@/components/logo-marquee";
import { ConversionAccuracyTabs } from "@/components/conversion-accuracy-tabs";
import { UnifiedFlow } from "@/components/unified-flow";

const REALITY_STATS: Array<{
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  source: string;
}> = [
  {
    value: 40,
    suffix: "%",
    label: "of legitimate users drop off due to verification friction",
    source: "Source: Incode customer data",
  },
  {
    value: 95,
    suffix: "%",
    label: "of synthetic identities go undetected during onboarding",
    source: "Source: Thomson Reuters",
  },
  {
    value: 20,
    prefix: "$",
    suffix: "B+",
    label: "projected losses from synthetic identity fraud by 2030",
    source: "Source: Deloitte",
  },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Lower user friction",
    body: "Complete verification in a single step with a barcode scan and selfie. No document capture required.",
  },
  {
    icon: ShieldHalf,
    title: "Stronger protection",
    body: "Verify the person, not just the data. Stops synthetic identities and AI-assisted fraud that bypass traditional checks.",
  },
  {
    icon: Lock,
    title: "Built-in privacy",
    body: "Matching occurs within the DMV’s secure environment. No biometric data is stored and no government PII is shared.",
  },
];

const WHY_TILES = [
  { icon: Network, label: "Direct integrations with state DMVs" },
  { icon: Zap, label: "Real-time verification at the source" },
  { icon: ShieldCheck, label: "Matching occurs within secure DMV systems" },
  { icon: BadgeCheck, label: "Deterministic confirmation from the issuing authority" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Testimonial />
      <Problem />
      <Reality />
      <Introducing />
      <WhatChanges />
      <UnifiedOffering />
      <WhyIncode />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-rich-black text-white md:min-h-[calc(100svh-110px)]">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="relative w-full mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow>GovFaceMatch</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                A new standard in
                <br />
                identity verification
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-grey-on-black text-balance">
                The first identity solution to match biometrics against DMV records. Higher
                conversion and stronger fraud prevention, with no tradeoff.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-blue hover:bg-[#0058d9] px-5 py-2.5 text-[15px] font-medium text-white transition-colors"
                >
                  Request a demo
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <HeroVideo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="bg-background border-y border-border-light">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-12">
        <p className="text-center text-sm text-grey-on-white mb-8">
          Global enterprises and partners trust Incode
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-rich-black min-h-[460px] md:min-h-[480px] flex">
            <div aria-hidden className="absolute inset-0">
              <Image
                src="/GFM-Illus.png"
                alt=""
                fill
                quality={75}
                priority={false}
                className="object-contain object-right"
                sizes="(min-width: 1280px) 1216px, 100vw"
              />
            </div>

            <div className="relative w-full p-6 md:p-10 lg:p-14 flex items-center">
              <div className="w-full max-w-xl rounded-2xl bg-background border border-border-light p-7 md:p-9">
                <Image
                  src="/clients/dmv.png"
                  alt="State of California Department of Motor Vehicles"
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain"
                />
                <blockquote className="mt-6 font-display text-xl md:text-2xl text-foreground leading-snug text-balance">
                  &ldquo;Our work with Incode brings their Deepsight deepfake detection directly into
                  Experian&rsquo;s identity and fraud solutions, giving our clients market-leading
                  protection and keeping them one step ahead of AI-powered attacks.&rdquo;
                </blockquote>

                <div className="mt-8 pt-6 border-t border-border-light flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">Keir Breitenfeld</div>
                    <div className="mt-0.5 text-xs text-grey-on-white">
                      SVP Identity &amp; Fraud · Experian
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-foreground hover:border-blue/40 hover:text-blue transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next testimonial"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-foreground hover:border-blue/40 hover:text-blue transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const cards = [
    {
      icon: UserX,
      tag: "Hurts conversion",
      title: "Document-based verification",
      body: "Catches more fraud, but adds friction that drives users away. Up to 40% never complete the process.",
    },
    {
      icon: ShieldOff,
      tag: "Weakens fraud prevention",
      title: "Non-document verification",
      body: "Keeps users moving, but allows synthetic and stolen identities to pass undetected.",
    },
  ];
  return (
    <section className="relative bg-rich-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-problem-glow pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-balance">
              Identity verification has always meant choosing between friction and fraud
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-grey-on-black text-lg">
              Most solutions rely on either data or documents. Neither can deliver both high conversion
              and strong fraud prevention.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={0.1 + i * 0.1}>
                <div className="h-full rounded-xl border border-red-500/15 bg-off-black/80 backdrop-blur p-6 md:p-8 transition-colors hover:border-red-500/30">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400 shrink-0">
                      <Icon size={18} />
                    </span>
                    <div className="flex-1">
                      <span className="inline-flex items-center rounded-md border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-medium text-red-300">
                        {c.tag}
                      </span>
                      <h3 className="mt-3 font-display text-lg md:text-xl text-white">{c.title}</h3>
                      <p className="mt-2 text-grey-on-black">{c.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reality() {
  return (
    <Section tone="light">
      <Reveal>
        <Eyebrow tone="light">The reality</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl md:text-4xl max-w-3xl text-balance">
          Conversion and security no longer require a tradeoff
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-2xl text-lg text-grey-on-white">
          Identity is verified directly against official DMV records
        </p>
      </Reveal>
      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {REALITY_STATS.map((s, i) => (
          <Reveal key={s.label} delay={0.1 + i * 0.1}>
            <div className="border-t border-border-light pt-6">
              <div className="font-display text-4xl md:text-5xl bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-grey-on-white max-w-xs">{s.label}</p>
              <p className="mt-2 text-xs text-grey-on-white/70">{s.source}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Introducing() {
  return (
    <section id="platform" className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-14 md:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex">
              <Eyebrow tone="light">Introducing GovFaceMatch</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
              The only solution that delivers higher conversion without compromising identity assurance
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-grey-on-white">
              Built in partnership with state DMVs, GovFaceMatch verifies identity directly against
              official government records. A real-time biometric match confirms the person, not just
              the identity, stopping sophisticated AI-assisted fraud
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10">
            <IntroDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatChanges() {
  return (
    <Section id="what-changes" tone="light">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-stretch">
        <div id="benefits">
          <Reveal>
            <Eyebrow tone="light">Benefits</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
              What changes when identity is verified against DMV records
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-grey-on-white">
              Direct verification at the source transforms conversion and fraud performance.
            </p>
          </Reveal>

          <ul className="mt-12 flex max-w-md flex-col gap-7">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={0.3 + i * 0.08}>
                  <li className="flex gap-3">
                    <Icon size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-blue" />
                    <div>
                      <h3 className="font-display text-lg leading-snug">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-grey-on-white">{b.body}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.3} className="lg:pt-2 h-full">
          <ConversionAccuracyTabs />
        </Reveal>
      </div>
    </Section>
  );
}

function UnifiedOffering() {
  return (
    <Section tone="rich">
      <Reveal>
        <Eyebrow>GovMatch</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl md:text-4xl max-w-3xl text-balance">
          Verify more users with the same level of trust
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-2xl text-grey-on-black">
          GovFaceMatch is part of the broader GovMatch offering, combining biometric verification
          and data validation against government records to deliver the highest assurance possible
          in every state.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-12">
          <UnifiedFlow />
        </div>
      </Reveal>
    </Section>
  );
}

function WhyIncode() {
  return (
    <Section id="why-incode" tone="light">
      <Reveal>
        <Eyebrow tone="light">Why Incode</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl md:text-4xl max-w-4xl text-balance">
          The first and only identity platform to partner directly with state DMVs for real-time
          biometric verification
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-2xl text-grey-on-white">
          No other vendor can improve both conversion and fraud outcomes at the same time.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_TILES.map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.label} delay={0.05 * i}>
              <div className="h-full rounded-xl border border-border-light bg-background p-6">
                <div className="flex items-center justify-between">
                  <Icon size={20} strokeWidth={2} className="text-blue" />
                  <span className="font-display text-sm text-grey-on-white tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-6 font-display text-base text-balance">{t.label}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <section className="relative bg-rich-black text-white overflow-hidden">
      <div className="absolute inset-x-0 -top-32 h-80 glow-blue blur-2xl opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl text-balance max-w-3xl mx-auto">
            A new standard in identity verification
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-grey-on-black max-w-xl mx-auto">
            Stop losing customers to verification.
            <br />
            Increase conversion without increasing fraud.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-blue hover:bg-[#0058d9] px-5 py-2.5 text-[15px] font-medium text-white transition-colors"
            >
              Request a demo
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
