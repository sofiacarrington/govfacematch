import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const USE_CASES = [
  {
    label: "Customer trust",
    body: "Verify true identities at onboarding to protect your business and customers from fraud.",
  },
  {
    label: "Business trust",
    body: "Screen and verify businesses to build compliant and trusted relationships from the start.",
  },
  {
    label: "Workforce trust",
    body: "Protect internal systems and workflows by confirming true employee identity before granting critical access.",
  },
  {
    label: "Agentic trust",
    body: "Verify the identity of autonomous AI systems to prevent fraud, ensure compliance, and build trust.",
  },
];

export function UseCasesSection() {
  return (
    <Section id="use-cases" tone="rich">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[26px] leading-[1.1] text-balance sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
              One platform, limitless applications
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.label} delay={0.1 + i * 0.05}>
              <article className="relative py-5 pr-10 sm:py-6 sm:pr-12 md:py-7">
                <span
                  aria-hidden
                  className="absolute right-0 top-5 text-[11px] font-medium tracking-[0.2em] text-white/40 sm:top-6 md:top-7"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-white sm:text-xl md:text-2xl">
                  {u.label}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-grey-on-black md:text-[15px]">
                  {u.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
