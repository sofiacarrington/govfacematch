import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { Check } from "lucide-react";

export const metadata = {
  title: "Request a demo — GovFaceMatch",
  description: "See GovFaceMatch in your environment.",
};

const POINTS = [
  "Working demo against real DMV records",
  "Architecture review with your security team",
  "Indicative latency + accuracy benchmarks for your region",
  "Integration plan tailored to your stack",
];

export default function ContactPage() {
  return (
    <Section tone="rich">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
        <div>
          <Reveal>
            <Eyebrow>Request a demo</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-3xl md:text-4xl text-balance">
              See GovFaceMatch in your environment.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-grey-on-black">
              A 30-minute working session — no slideware. Bring a laptop and we&apos;ll match a real
              face against a real DMV record together.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-off-white">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green/15 text-green border border-green/30 shrink-0">
                    <Check size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
