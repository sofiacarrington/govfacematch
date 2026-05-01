import Image from "next/image";

const LOGOS = [
  { src: "/clients/pnc.png", alt: "PNC Bank", width: 110 },
  { src: "/clients/scotiabank.png", alt: "Scotiabank", width: 130 },
  { src: "/clients/chime.png", alt: "Chime", width: 110 },
  { src: "/clients/nu.png", alt: "Nu", width: 70 },
  { src: "/clients/tiktok.png", alt: "TikTok", width: 110 },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden mask-fade">
      <div className="flex items-center gap-16 animate-[marquee_35s_linear_infinite] whitespace-nowrap will-change-transform">
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ width: logo.width }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={32}
              className="h-auto max-h-8 w-auto object-contain"
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
