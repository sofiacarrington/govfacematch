import {
  ArrowUpRight,
  Brain,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { LoadingIntro } from "@/components/loading-intro";
import { HeroSection } from "@/components/hero-section";
import { LogoMarquee } from "@/components/logo-marquee";
import { UseCasesSection } from "@/components/use-cases-section";
import { TrustScale } from "@/components/trust-scale";
import { ProductShowcase } from "@/components/product-showcase";

const PLATFORM_OUTCOMES = [
  {
    icon: ShieldCheck,
    title: "Eliminate fraud",
    body: "Keep bad actors out with advanced AI-powered prevention. Safeguard every step of the verification journey with end-to-end fraud signal monitoring.",
  },
  {
    icon: Brain,
    title: "Stay ahead of new threats",
    body: "Anticipate and defeat deepfakes, synthetic identities, and other AI-driven fraud attacks with continuously evolving machine learning models.",
  },
  {
    icon: TrendingUp,
    title: "Optimize conversion",
    body: "Provide users with effortless, seamless and secure identity verification. Customize your experience to blend seamlessly with your brand.",
  },
];

const TESTIMONIALS = [
  {
    logo: "/clients/citi.svg",
    logoWidth: 48,
    logoAlt: "Citi",
    quote:
      "Six months of rigorous testing proved Incode indispensable for our stringent security and compliance benchmarks.",
    name: "Miguel Lavalle",
    role: "Head of Account Opening, Citi",
  },
  {
    logo: "/clients/equifax.svg",
    logoWidth: 110,
    logoAlt: "Equifax",
    quote:
      "Our partnership with Incode enables a seamless digital experience for legitimate customers, while effectively preventing sophisticated fraud.",
    name: "Ajay Guru",
    role: "SVP and GM of Digital Solutions, Equifax",
  },
  {
    logo: "/clients/experian.svg",
    logoWidth: 90,
    logoAlt: "Experian",
    quote:
      "By integrating Incode's identity verification into the Ascend Platform, we're empowering organizations to make faster, smarter decisions with unprecedented agility.",
    name: "Marika Vilen",
    role: "SVP Global Partnerships & Commercialization, Experian",
  },
];

export default function HomePage() {
  return (
    <>
      <LoadingIntro />
      <div className="relative">
        <div className="sticky top-0 z-0 h-screen overflow-hidden">
          <HeroSection />
        </div>
        <div className="relative z-10">
          <PlatformOutcomes />
          <TrustedBy />
          <TrustScale />
          <ProductShowcase />
          <UseCasesSection />
          <Testimonials />
          <Compliance />
          <ClosingCta />
        </div>
      </div>
    </>
  );
}

function TrustedBy() {
  return (
    <section className="bg-background border-y border-border-light">
      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:py-14 md:py-16 lg:px-8">
        <p className="text-center text-sm text-grey-on-white mb-6 sm:mb-10">
          Securing the largest organizations in the world
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

function PlatformOutcomes() {
  return (
    <Section
      tone="light"
      className="rounded-t-[40px] shadow-[0_-20px_40px_-30px_rgba(38,40,49,0.25)] md:rounded-t-[56px]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-[26px] leading-tight text-balance sm:text-3xl md:text-4xl">
            Our AI-powered identity platform enables organizations to grow
            without increasing fraud risk
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_OUTCOMES.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={0.05 * i}>
              <div className="h-full rounded-xl border border-border-light bg-background p-5 sm:p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#CCE1FF] sm:h-12 sm:w-12">
                  <Icon size={20} strokeWidth={1.75} className="text-blue" />
                </div>
                <h3 className="mt-5 font-display text-base sm:mt-6">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-on-white leading-relaxed sm:mt-3">
                  {p.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section tone="rich">
      <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.08}>
            <figure className="flex h-full flex-col">
              <Image
                src={t.logo}
                alt={t.logoAlt}
                width={t.logoWidth}
                height={28}
                className="h-6 w-auto object-contain object-left opacity-90 [filter:brightness(0)_invert(1)] sm:h-7"
              />
              <blockquote className="mt-5 flex-1 font-display-regular text-[15px] leading-snug text-white sm:mt-6 sm:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="mt-0.5 text-xs text-grey-on-black">{t.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Compliance() {
  return (
    <Section tone="rich">
      <Reveal>
        <p className="text-center text-sm text-grey-on-black">
          Verified reviews and certifications
        </p>
      </Reveal>

      <div className="mt-8 relative overflow-hidden compliance-mask-fade sm:mt-10">
        <div className="flex items-center gap-6 animate-[marquee_40s_linear_infinite] will-change-transform sm:gap-10 md:gap-14">
          {[0, 1, 2].map((i) => (
            <Image
              key={i}
              src="/Globalrecognition.svg"
              alt="Verified compliance and certifications"
              width={1131}
              height={82}
              className="h-10 w-auto shrink-0 opacity-80 [filter:brightness(0)_invert(1)] sm:h-14 md:h-20"
            />
          ))}
        </div>
        <style>{`
          .compliance-mask-fade {
            mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          }
        `}</style>
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <section className="relative bg-[#F9F9F9] text-foreground overflow-hidden">
      <div className="relative mx-auto max-w-[1280px] px-5 py-14 text-center sm:py-16 md:py-20 lg:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-3xl text-balance sm:text-4xl md:text-5xl">
            Ready to power trust at scale?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] text-grey-on-white sm:mt-6 sm:text-base">
            See how Incode helps the world&rsquo;s leading enterprises stay ahead of fraud without
            adding friction.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8">
            <ButtonLink href="/contact">
              Request a demo
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
