/**
 * Home page content
 * All page sections converted from React to vanilla HTML - EXACT MATCH
 */

import { renderLogoMarquee } from '../components/marquee.js';
import { renderUnifiedFlow } from '../components/unified-flow.js';
import { ICONS } from '../lib/icons.js';
import { ASSET_BASE } from '../lib/config.js';

const REALITY_STATS = [
  {
    value: 40,
    suffix: "%",
    label: "of legitimate users drop off due\nto verification friction",
    source: "Source: Incode customer data",
  },
  {
    value: 95,
    suffix: "%",
    label: "of synthetic identities go undetected\nduring onboarding",
    source: "Source: Thomson Reuters",
  },
  {
    value: 20,
    prefix: "$",
    suffix: "B+",
    label: "projected losses from synthetic identity\nfraud by 2030",
    source: "Source: Deloitte",
  },
];

const INTRO_STEPS = [
  {
    icon: ICONS.idCard,
    title: "ID barcode scan + selfie",
    body: "Users scan the back of their government ID and take a live selfie in two simple guided steps.",
  },
  {
    icon: ICONS.scanFace,
    title: "Verify against DMV records",
    body: "The selfie is matched to the issuing DMV's official record within a secure environment.",
  },
  {
    icon: ICONS.shieldCheck,
    title: "Real-time result",
    body: "A verification result is returned instantly, delivering a fast, defensible, and auditable outcome.",
  },
];

const BENEFITS = [
  {
    icon: ICONS.sparkles,
    title: "Lower user friction",
    body: "Complete verification with a barcode scan and selfie. No document capture required.",
  },
  {
    icon: ICONS.shieldHalf,
    title: "Stronger protection",
    body: "Verify the person, not just the data. Stops synthetic identities and AI-assisted fraud that bypass traditional checks.",
  },
  {
    icon: ICONS.lock,
    title: "Built-in privacy",
    body: "Matching occurs within the DMV's secure environment. No biometric data is stored and no government PII is shared.",
  },
];

const CONVERSION_STATS = [
  {
    value: 6,
    suffix: "x",
    title: "faster verification",
    sub: "vs document-based verification",
  },
  {
    value: 20,
    prefix: "+",
    suffix: "%",
    title: "higher conversion",
    sub: "vs document-based verification",
  },
  {
    value: 1000,
    suffix: "x",
    title: "stronger fraud prevention",
    sub: "vs non-document checks",
  },
  {
    value: 150,
    suffix: "x",
    title: "more accurate",
    sub: "vs document-based verification",
  },
];

const WHY_TILES = [
  { icon: ICONS.network, label: "Direct integrations with state DMVs" },
  { icon: ICONS.zap, label: "Real-time verification at the source" },
  { icon: ICONS.shieldCheck, label: "Matching occurs within secure DMV systems" },
  { icon: ICONS.badgeCheck, label: "Deterministic confirmation from the issuing authority" },
];

export function renderPageContent() {
  const main = document.getElementById('main-content');
  if (!main) return;
  
  main.innerHTML = `
    ${renderHero()}
    ${renderTrustedBy()}
    ${renderProblem()}
    ${renderReality()}
    ${renderIntroducing()}
    ${renderWhatChanges()}
    ${renderTestimonial()}
    ${renderUnifiedOffering()}
    ${renderWhyIncode()}
    ${renderClosingCta()}
  `;
  
  // Initialize video autoplay for intro demo
  initIntroVideo();
}

function renderHero() {
  return `
    <section class="relative flex items-center overflow-hidden bg-rich-black text-white min-h-[100svh]">
      <img
        src="${ASSET_BASE}/background.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover animate-hero-drift pointer-events-none"
        loading="eager"
      />
      <div class="absolute inset-0 bg-hero-glow pointer-events-none opacity-60"></div>
      <div class="relative w-full mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-24">
        <div class="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-center">
          <div>
            <div class="reveal" data-delay="0">
              <div class="t-eyebrow inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium border-blue/25 bg-blue/10 text-blue-eyebrow">
                GovFaceMatch
              </div>
            </div>
            <h1 class="t-hero-title reveal mt-6 font-display text-[33px] md:text-[42px] lg:text-[54px] leading-[1.05] text-balance" data-delay="0.1">
              A new standard in<br />identity verification
            </h1>
            <p class="t-hero-subtitle reveal mt-6 max-w-xl text-lg text-grey-on-black text-balance" data-delay="0.2">
              The first identity solution to match biometrics against DMV records. Higher conversion and stronger fraud prevention, with no tradeoff.
            </p>
            <div class="reveal mt-8 flex flex-wrap gap-3" data-delay="0.3">
              <a href="/contact" class="t-button inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors bg-blue text-white hover:bg-[#0058d9] px-5 py-2.5 text-[15px]">
                Request a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25">
                  <path d="M7 7h10v10M7 17 17 7"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="reveal" data-delay="0.2">
            <!-- Hero Video Component -->
            <div class="relative w-full">
              <div class="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10">
                <div class="absolute inset-0 glow-blue blur-[80px] opacity-70"></div>
              </div>

              <button
                type="button"
                data-video-trigger
                aria-label="Play explainer video"
                class="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-rich-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/60"
              >
                <img
                  src="${ASSET_BASE}/GFMExplainer_Thumbnail.png"
                  alt="GovFaceMatch explainer"
                  class="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105 transition-transform duration-500 group-hover:scale-[1.07]"
                  loading="eager"
                />
                <div class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
                <div class="pointer-events-none absolute inset-0 bg-rich-black/30 transition-colors group-hover:bg-rich-black/40"></div>

                <span class="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span class="relative inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.04]">
                    <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-rich-black">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </span>
                    Play video
                  </span>
                </span>
              </button>

              <div aria-hidden class="pointer-events-none absolute -bottom-12 inset-x-8 h-16 rounded-[3rem] bg-blue/30 blur-3xl opacity-60 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTrustedBy() {
  return `
    <section class="bg-background border-y border-border-light">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20">
        <p class="t-section-label text-center text-sm text-grey-on-white mb-10">
          Global enterprises and partners trust Incode
        </p>
        ${renderLogoMarquee()}
      </div>
    </section>
  `;
}

function renderProblem() {
  const cards = [
    {
      icon: ICONS.userX,
      tag: "Impacts conversion",
      title: "Document-based verification",
      body: "Catches more fraud, but adds friction that drives users away. Up to 40% never complete the process.",
    },
    {
      icon: ICONS.shieldOff,
      tag: "Weakens fraud prevention",
      title: "Non-document verification",
      body: "Keeps users moving, but allows synthetic and stolen identities to pass undetected.",
    },
  ];
  
  return `
    <section class="relative bg-rich-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-problem-glow pointer-events-none"></div>
      <div class="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div class="reveal">
            <h2 class="t-section-heading font-display text-3xl md:text-4xl text-balance text-white">
              Identity verification has always meant choosing between friction and fraud
            </h2>
          </div>
          <div class="reveal" data-delay="0.1">
            <p class="t-body-lg text-grey-on-black text-lg">
              Most solutions rely on either data or documents. Neither can deliver both high conversion and strong fraud prevention.
            </p>
          </div>
        </div>
        <div class="mt-14 grid gap-4 md:grid-cols-2">
          ${cards.map((c, i) => `
            <div class="reveal h-full rounded-xl border border-red-500/15 bg-off-black/80 backdrop-blur p-6 md:p-8 transition-colors hover:border-red-500/30" data-delay="${0.1 + i * 0.1}">
              <div class="flex items-start gap-4">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400 shrink-0">
                  ${c.icon}
                </span>
                <div class="flex-1">
                  <span class="inline-flex items-center rounded-md border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-medium text-red-300">
                    ${c.tag}
                  </span>
                  <h3 class="t-card-title mt-3 font-display text-lg md:text-xl text-white">${c.title}</h3>
                  <p class="t-body-dark mt-2 text-grey-on-black">${c.body}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderReality() {
  return `
    <section class="bg-background">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="max-w-3xl">
          <div class="reveal">
            <div class="flex">
              <div class="t-eyebrow inline-flex items-centers rounded-md border px-3 py-1 text-sm font-medium border-blue/20 bg-blue/10 text-blue">
                The problem
              </div>
            </div>
          </div>
          <h2 class="t-section-heading reveal mt-5 font-display text-3xl md:text-4xl text-balance text-foreground" data-delay="0.1">
            The tradeoff has become too costly to ignore
          </h2>
          <p class="t-body-sm reveal mt-4 text-grey-on-white" data-delay="0.2">
            Added friction continues to drive legitimate users away, while record-high data breaches have made high-quality synthetic and stolen identities easy to create at scale. Data and document checks were never meant to stop real stolen PII.
          </p>
        </div>
        <div class="mt-14 grid gap-10 sm:grid-cols-3">
          ${REALITY_STATS.map((s, i) => `
            <div class="reveal border-t border-border-light pt-6" data-delay="${0.1 + i * 0.1}">
              <div class="t-stat-number font-display text-4xl md:text-5xl bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                <span class="tabular-nums" data-counter="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix}" data-decimals="0">0${s.suffix}</span>
              </div>
              <p class="t-stat-label mt-3 text-sm text-grey-on-white max-w-xs whitespace-pre-line">${s.label}</p>
              <p class="t-stat-source mt-2 text-xs text-grey-on-white/70">${s.source}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderIntroducing() {
  return `
    <section id="platform" class="relative w-full bg-background text-foreground">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-14 md:py-20">
        <div class="max-w-3xl">
          <div class="reveal">
            <div class="flex">
              <div class="t-eyebrow inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium border-blue/20 bg-blue/10 text-blue">
                Introducing GovFaceMatch
              </div>
            </div>
          </div>
          <h2 class="t-section-heading reveal mt-5 font-display text-3xl md:text-4xl text-balance text-foreground" data-delay="0.1">
            The only solution that delivers higher conversion without compromising identity assurance
          </h2>
          <p class="t-body-sm reveal mt-4 text-grey-on-white" data-delay="0.2">
            Built with state DMVs, enabling real-time biometric matching against official government records to confirm identity and stop AI-assisted fraud.
          </p>
        </div>

        <div class="reveal mt-10" data-delay="0.3">
          <!-- Intro Demo Component -->
          <div class="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 items-center">
            <div class="relative overflow-hidden rounded-2xl bg-off-white" style="aspect-ratio: 1000 / 914">
              <video
                id="intro-demo-video"
                src="${ASSET_BASE}/GFM_Flow.mp4"
                poster="${ASSET_BASE}/GFM_Flow_poster.jpg"
                autoplay
                muted
                playsinline
                loop
                preload="auto"
                class="absolute inset-0 h-full w-full object-cover"
              ></video>
            </div>

            <div class="flex flex-col">
              ${INTRO_STEPS.map((step, i) => `
                <div class="py-5 ${i > 0 ? 'border-t border-border-light' : ''}">
                  <div class="flex items-start gap-4">
                    <span class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-blue/25 bg-blue/10 text-blue shrink-0">
                      ${step.icon}
                    </span>
                    <div class="flex-1 min-w-0">
                      <h3 class="t-card-title-sm font-display text-base md:text-lg text-foreground">
                        ${step.title}
                      </h3>
                      <p class="t-body-sm mt-1.5 max-w-md text-sm text-grey-on-white">
                        ${step.body}
                      </p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderWhatChanges() {
  return `
    <section id="what-changes" class="bg-background">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-stretch">
          <div id="benefits">
            <div class="reveal">
              <div class="flex">
                <div class="t-eyebrow inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium border-blue/20 bg-blue/10 text-blue">
                  Benefits
                </div>
              </div>
            </div>
            <h2 class="t-section-heading reveal mt-5 font-display text-3xl md:text-4xl text-balance text-foreground" data-delay="0.1">
              What changes when identity is verified against DMV records
            </h2>
            <p class="t-body-sm reveal mt-4 text-grey-on-white" data-delay="0.2">
              Direct verification at the source transforms conversion and fraud performance.
            </p>

            <ul class="mt-12 flex max-w-md flex-col gap-7">
              ${BENEFITS.map((b, i) => `
                <li class="reveal flex gap-3" data-delay="${0.3 + i * 0.08}">
                  <span class="mt-0.5 shrink-0 text-blue">
                    ${b.icon}
                  </span>
                  <div>
                    <h3 class="t-benefit-title font-display text-lg leading-snug">${b.title}</h3>
                    <p class="t-body-sm mt-1.5 text-sm leading-relaxed text-grey-on-white">${b.body}</p>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="reveal lg:pt-2 h-full" data-delay="0.3">
            <!-- Conversion Accuracy Stats -->
            <div class="grid h-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 content-end">
              ${CONVERSION_STATS.map((s) => `
                <div class="border-t border-border-light pt-6">
                  <div class="t-stat-number font-display text-4xl md:text-5xl leading-none bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                    <span class="tabular-nums" data-counter="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix}" data-decimals="0">0${s.suffix}</span>
                  </div>
                  <div class="t-tile-label mt-3 font-display text-base text-foreground">${s.title}</div>
                  <div class="t-body-sm mt-1 text-sm text-grey-on-white">${s.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTestimonial() {
  return `
    <section class="relative bg-background overflow-hidden">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="reveal">
          <div class="relative rounded-3xl overflow-hidden bg-rich-black min-h-[460px] md:min-h-[480px] flex">
            <div aria-hidden class="absolute inset-0 bg-black md:bg-transparent">
              <img
                src="${ASSET_BASE}/GFM-Illus.png"
                alt=""
                class="hidden md:block absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="relative w-full p-6 md:p-10 lg:p-14 flex items-center">
              <div class="w-full max-w-xl rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-7 md:p-9 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
                <img
                  src="${ASSET_BASE}/virginiadmv.png"
                  alt="Virginia Department of Motor Vehicles"
                  width="220"
                  height="64"
                  class="h-12 w-auto object-contain"
                  loading="lazy"
                />
                <blockquote class="t-quote mt-6 font-display-regular text-xl md:text-2xl text-white leading-snug text-balance">
                  "The partnership with Incode allows us to stay focused on our core mission of serving the public, while responsibly extending trusted identity verification capabilities to the private sector with customers' consent. By enabling secure, reliable identity checks across industries such as banking and automotive, we're helping strengthen the broader digital identity ecosystem."
                </blockquote>

                <div class="mt-8 pt-6 border-t border-white/15">
                  <div class="t-quote-name text-sm font-medium text-white">Dr. Gerald F. Lackey</div>
                  <div class="t-quote-role mt-0.5 text-xs text-grey-on-black">
                    Former Commissioner of the Virginia Department of Motor Vehicles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderUnifiedOffering() {
  return `
    <section class="relative w-full bg-rich-black text-white">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="reveal">
          <div class="t-eyebrow inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium border-blue/25 bg-blue/10 text-blue-eyebrow">
            Unified offering
          </div>
        </div>
        <h2 class="t-section-heading reveal mt-4 font-display text-3xl md:text-4xl max-w-3xl text-balance text-white" data-delay="0.1">
          Verify more users with the same level of trust
        </h2>
        <p class="t-body-dark reveal mt-6 max-w-2xl text-grey-on-black" data-delay="0.2">
          GovFaceMatch is part of the broader GovMatch offering, combining biometric and data validation against government records to deliver high assurance across every state.
        </p>
        <div class="mt-10">
          ${renderUnifiedFlow()}
        </div>
      </div>
    </section>
  `;
}

function renderWhyIncode() {
  return `
    <section id="why-incode" class="bg-background">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="reveal">
          <div class="t-eyebrow inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium border-blue/20 bg-blue/10 text-blue">
            Why Incode
          </div>
        </div>
        <h2 class="t-section-heading reveal mt-4 font-display text-3xl md:text-4xl max-w-4xl text-balance text-foreground" data-delay="0.1">
          The first and only identity platform to partner directly with state DMVs for real-time biometric verification
        </h2>
        <p class="t-body-sm reveal mt-6 max-w-2xl text-grey-on-white" data-delay="0.2">
          No other vendor can improve both conversion and fraud outcomes at the same time.
        </p>
        <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${WHY_TILES.map((t, i) => `
            <div class="reveal h-full rounded-xl border border-border-light bg-background p-6" data-delay="${0.05 * i}">
              <div class="flex items-center justify-between">
                <span class="text-blue">
                  ${t.icon}
                </span>
                <span class="t-tab-number font-display text-sm text-grey-on-white tabular-nums">
                  0${i + 1}
                </span>
              </div>
              <div class="t-tile-label mt-6 font-display text-base text-balance">${t.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderClosingCta() {
  return `
    <section class="relative bg-rich-black text-white overflow-hidden">
      <div class="absolute inset-x-0 -top-32 h-80 glow-blue blur-2xl opacity-70 pointer-events-none"></div>
      <div class="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-24 text-center">
        <h2 class="t-cta-heading reveal font-display text-3xl sm:text-4xl md:text-5xl md:whitespace-nowrap mx-auto">
          A new standard in identity verification
        </h2>
        <p class="t-body-dark reveal mt-6 text-grey-on-black max-w-xl mx-auto" data-delay="0.1">
          Stop losing customers to verification.<br />
          Increase conversion without increasing fraud.
        </p>
        <div class="reveal mt-8 flex flex-wrap justify-center gap-3" data-delay="0.2">
          <a href="/contact" class="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors bg-blue text-white hover:bg-[#0058d9] px-5 py-2.5 text-[15px]">
            Request a demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25">
              <path d="M7 7h10v10M7 17 17 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

function initIntroVideo() {
  const video = document.getElementById('intro-demo-video');
  if (!video) return;
  
  video.playbackRate = 1.75;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        }
      });
    },
    { threshold: 0.1 }
  );
  
  observer.observe(video);
}
