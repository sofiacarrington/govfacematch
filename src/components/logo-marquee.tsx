import Image from "next/image";

const LOGOS = [
  { src: "/clients/citi.svg", alt: "Citi", width: 36 },
  { src: "/clients/chime.svg", alt: "Chime", width: 75 },
  { src: "/clients/amazon.svg", alt: "Amazon", width: 78 },
  { src: "/clients/tiktok.svg", alt: "TikTok", width: 103 },
  { src: "/clients/fanduel.svg", alt: "FanDuel", width: 128 },
  { src: "/clients/betmgm.svg", alt: "BetMGM", width: 86 },
  { src: "/clients/att.svg", alt: "AT&T", width: 59 },
  { src: "/clients/experian.svg", alt: "Experian", width: 70 },
  { src: "/clients/equifax.svg", alt: "Equifax", width: 119 },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden mask-fade">
      <div className="flex items-center gap-20 animate-[marquee_35s_linear_infinite] whitespace-nowrap will-change-transform">
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-6"
            style={{ width: logo.width }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={24}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </div>
      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
