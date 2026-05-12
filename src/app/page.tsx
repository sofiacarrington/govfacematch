import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { LoadingIntro } from "@/components/loading-intro";
import { HeroSection } from "@/components/hero-section";
import { LogoMarquee } from "@/components/logo-marquee";
import { UseCaseTabs } from "@/components/use-case-tabs";
import { TrustScale } from "@/components/trust-scale";
import { ProductShowcase } from "@/components/product-showcase";
import { BenefitsShowcase } from "@/components/benefits-showcase";

const PILLARS = [
  {
    icon: Database,
    title: "A data advantage",
    body: "With 4.1B+ identity checks annually and 400M identity profiles worldwide, Incode has a massive data set to train models that fight fraud.",
  },
  {
    icon: Sparkles,
    title: "Superior AI",
    body: "Our proprietary, frontier AI models deliver consistent performance at the top of industry benchmarks and the adaptability to stay ahead of fraud.",
  },
  {
    icon: Layers,
    title: "Enterprise focus",
    body: "End-to-end identity solutions with a modular core platform, easily orchestrated and integrated tools, deep partnerships, and 99.99% reliability.",
  },
  {
    icon: BadgeCheck,
    title: "High-trust decisions",
    body: "We help you secure trust in the AI era. The ultimate outcome we deliver is the protection of every surface area against AI-driven fraud threats.",
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

const COMPLIANCE_BADGES = [
  "SOC 2 Type II",
  "ISO 27001",
  "FedRAMP",
  "iBeta Level 3",
  "Kantara",
  "GDPR",
  "CCPA",
  "HIPAA",
  "BIPA",
];

export default function HomePage() {
  return (
    <>
      <LoadingIntro />
      <HeroSection />
      <TrustedBy />
      <TrustScale />
      <ProductShowcase />
      <Benefits />
      <WhyIncode />
      <UseCases />
      <Testimonials />
      <Compliance />
      <ClosingCta />
    </>
  );
}

function TrustedBy() {
  return (
    <section className="bg-background border-y border-border-light">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8 py-16">
        <p className="text-center text-sm text-grey-on-white mb-10">
          Securing the largest organizations in the world
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <Section id="platform" tone="rich">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Platform</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
            Your AI-driven security challenges, solved
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-grey-on-black">
            Safeguard trust by leveraging our in-house AI technology that secures every transaction.
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        <BenefitsShowcase />
      </div>
    </Section>
  );
}

function WhyIncode() {
  return (
    <Section id="why-incode" tone="light">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow tone="light">Why Incode</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
            Why leading enterprises choose Incode
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-grey-on-white">
            Incode delivers the accuracy, speed, and scale to stop AI-driven fraud without
            compromising user experience.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={0.05 * i}>
              <div className="h-full rounded-xl border border-border-light bg-background p-6">
                <div className="flex items-center justify-between">
                  <Icon size={20} strokeWidth={2} className="text-blue" />
                  <span className="font-display text-sm text-grey-on-white tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-base">{p.title}</h3>
                <p className="mt-3 text-sm text-grey-on-white leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function UseCases() {
  return (
    <Section id="use-cases" tone="light" className="border-t border-border-light">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow tone="light">Use cases</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
            One platform, limitless applications
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-grey-on-white">
            Incode powers every identity moment with zero friction and total trust.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.3}>
        <div className="mt-12">
          <UseCaseTabs />
        </div>
      </Reveal>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section tone="rich">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Customer stories</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
            Maximum growth without compromise
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-grey-on-black max-w-2xl">
            Power your business with AI-driven identity verification that stops fraud and ensures
            compliance.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
              <Image
                src={t.logo}
                alt={t.logoAlt}
                width={t.logoWidth}
                height={28}
                className="h-7 w-auto object-contain object-left [filter:brightness(0)_invert(1)] opacity-90"
              />
              <blockquote className="mt-6 flex-1 font-display-regular text-lg leading-snug text-white">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10">
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
    <Section tone="light">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow tone="light">Trust & standards</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-balance">
            Customers and industry leaders trust Incode
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-grey-on-white">
            Verified reviews, certifications, and customer stories show the impact of Incode&rsquo;s
            technology.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-9">
        {COMPLIANCE_BADGES.map((badge, i) => (
          <Reveal key={badge} delay={0.02 * i}>
            <div className="flex h-20 items-center justify-center rounded-xl border border-border-light bg-background px-3 text-center transition-colors hover:border-blue/30">
              <div className="flex flex-col items-center gap-1.5">
                <Award size={16} strokeWidth={1.75} className="text-blue" />
                <span className="text-xs font-medium text-foreground leading-tight">{badge}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <section className="relative bg-rich-black text-white overflow-hidden">
      <div className="absolute inset-x-0 -top-32 h-80 glow-blue blur-2xl opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mx-auto max-w-3xl text-balance">
            Ready to power trust at scale?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-grey-on-black max-w-xl mx-auto">
            See how Incode helps the world&rsquo;s leading enterprises stay ahead of fraud without
            adding friction.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">
              Request a demo
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </ButtonLink>
            <Link
              href="/products/govfacematch"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Explore GovFaceMatch
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
