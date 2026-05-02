import { Counter } from "@/components/ui/counter";

type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  title: string;
  sub: string;
};

const STATS: Stat[] = [
  {
    value: 6,
    suffix: "x",
    title: "faster verification",
    sub: "vs. document-based verification",
  },
  {
    value: 20,
    prefix: "+",
    suffix: "%",
    title: "higher conversion",
    sub: "vs. document-based verification",
  },
  {
    value: 1000,
    suffix: "x",
    title: "stronger fraud prevention",
    sub: "vs. non-document checks",
  },
  {
    value: 150,
    suffix: "x",
    title: "more accurate",
    sub: "than document-based verification",
  },
];

export function ConversionAccuracyTabs() {
  return (
    <div className="grid h-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 content-end">
      {STATS.map((s) => (
        <div key={s.title} className="border-t border-border-light pt-6">
          <div className="font-display text-4xl md:text-5xl leading-none bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
            <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
          </div>
          <div className="mt-3 font-display text-base text-foreground">{s.title}</div>
          <div className="mt-1 text-sm text-grey-on-white">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
