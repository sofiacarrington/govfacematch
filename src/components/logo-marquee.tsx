import Image from "next/image";

const LOGOS = [
  { src: "/clients/pnc.png", alt: "PNC Bank", width: 80 },
  { src: "/clients/scotiabank.png", alt: "Scotiabank", width: 92 },
  { src: "/clients/chime.png", alt: "Chime", width: 80 },
  { src: "/clients/nu.png", alt: "Nu", width: 48 },
  { src: "/clients/tiktok.png", alt: "TikTok", width: 80 },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden mask-fade">
      <div className="flex items-center gap-28 animate-[marquee_35s_linear_infinite] whitespace-nowrap will-change-transform">
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-5"
            style={{ width: logo.width }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={20}
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
