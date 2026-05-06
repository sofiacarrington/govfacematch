/**
 * Logo marquee animation
 * Pure CSS animation with vanilla JS rendering
 */

import { ASSET_BASE } from '../lib/config.js';

const LOGOS = [
  { src: `${ASSET_BASE}/clients/citi.svg`, alt: "Citi", width: 36 },
  { src: `${ASSET_BASE}/clients/chime.svg`, alt: "Chime", width: 75 },
  { src: `${ASSET_BASE}/clients/amazon.svg`, alt: "Amazon", width: 78 },
  { src: `${ASSET_BASE}/clients/tiktok.svg`, alt: "TikTok", width: 103 },
  { src: `${ASSET_BASE}/clients/fanduel.svg`, alt: "FanDuel", width: 128 },
  { src: `${ASSET_BASE}/clients/betmgm.svg`, alt: "BetMGM", width: 86 },
  { src: `${ASSET_BASE}/clients/att.svg`, alt: "AT&T", width: 59 },
  { src: `${ASSET_BASE}/clients/experian.svg`, alt: "Experian", width: 70 },
  { src: `${ASSET_BASE}/clients/equifax.svg`, alt: "Equifax", width: 119 },
];

export function renderLogoMarquee() {
  // Triple the logos for seamless loop
  const allLogos = [...LOGOS, ...LOGOS, ...LOGOS];
  
  const logosHtml = allLogos.map((logo, i) => `
    <div
      class="flex items-center justify-center shrink-0 h-6"
      style="width: ${logo.width}px"
    >
      <img
        src="${logo.src}"
        alt="${logo.alt}"
        width="${logo.width}"
        height="24"
        class="h-full w-auto object-contain"
        loading="lazy"
      />
    </div>
  `).join('');
  
  return `
    <div class="relative overflow-hidden mask-fade">
      <div class="flex items-center gap-20 animate-[marquee_35s_linear_infinite] whitespace-nowrap will-change-transform">
        ${logosHtml}
      </div>
    </div>
  `;
}

export function initMarquee() {
  // No initialization needed - CSS handles the animation
  console.log('✓ Marquee initialized (CSS-driven)');
}
