/**
 * Home page content
 * All page sections converted from React to vanilla HTML
 */

import { renderLogoMarquee } from '../components/marquee.js';

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
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>`,
    title: "ID barcode scan + selfie",
    body: "Users scan the back of their government ID and take a live selfie in two simple guided steps.",
  },
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>`,
    title: "Verify against DMV records",
    body: "The selfie is matched to the issuing DMV's official record within a secure environment.",
  },
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
    title: "Real-time result",
    body: "A verification result is returned instantly, delivering a fast, defensible, and auditable outcome.",
  },
];

const BENEFITS = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>`,
    title: "Lower user friction",
    body: "Complete verification with a barcode scan and selfie. No document capture required.",
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 12h0"/></svg>`,
    title: "Stronger protection",
    body: "Verify the person, not just the data. Stops synthetic identities and AI-assisted fraud that bypass traditional checks.",
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
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
  { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/></svg>`, label: "Direct integrations with state DMVs" },
  { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`, label: "Real-time verification at the source" },
  { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`, label: "Matching occurs within secure DMV systems" },
  { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`, label: "Deterministic confirmation from the issuing authority" },
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
      <picture>
        <source srcset="/background.webp" type="image/webp">
        <source srcset="/background.avif" type="image/avif">
        <img
          src="/background.png"
          alt=""
          class="absolute inset-0 w-full h-full object-cover animate-hero-drift pointer-events-none"
          loading="eager"
        />
      </picture>
      <div class="absolute inset-0 bg-hero-glow pointer-events-none opacity-60"></div>
      <div class="relative w-full mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-24">
        <div class="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-center">
          <div>
            <div class="reveal" data-delay="0">
              <span class="inline-flex items-center gap-2 rounded-full border border-blue-eyebrow/30 bg-blue-eyebrow/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-eyebrow">
                GovFaceMatch
              </span>
            </div>
            <h1 class="reveal mt-6 font-display text-[33px] md:text-[42px] lg:text-[54px] leading-[1.05] text-balance" data-delay="0.1">
              A new standard in<br />identity verification
            </h1>
            <p class="reveal mt-6 max-w-xl text-lg text-grey-on-black text-balance" data-delay="0.2">
              The first identity solution to match biometrics against DMV records. Higher conversion and stronger fraud prevention, with no tradeoff.
            </p>
            <div class="reveal mt-8 flex flex-wrap gap-3" data-delay="0.3">
              <a href="/contact" class="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors bg-blue text-white hover:bg-[#0058d9] px-5 py-2.5 text-[15px]">
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
                <picture>
                  <source srcset="/GFMExplainer_Thumbnail.webp" type="image/webp">
                  <img
                    src="/GFMExplainer_Thumbnail.png"
                    alt="GovFaceMatch explainer"
                    class="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105 transition-transform duration-500 group-hover:scale-[1.07]"
                    loading="eager"
                  />
                </picture>
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
        <p class="text-center text-sm text-grey-on-white mb-10">
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
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-2-2"/></svg>`,
      tag: "Impacts conversion",
      title: "Document-based verification",
      body: "Catches more fraud, but adds friction that drives users away. Up to 40% never complete the process.",
    },
    {
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M8 11h8M9 14h6"/></svg>`,
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
            <h2 class="font-display text-3xl md:text-4xl text-balance">
              Identity verification has always meant choosing between friction and fraud
            </h2>
          </div>
          <div class="reveal" data-delay="0.1">
            <p class="text-grey-on-black text-lg">
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
                  <h3 class="mt-3 font-display text-lg md:text-xl text-white">${c.title}</h3>
                  <p class="mt-2 text-grey-on-black">${c.body}</p>
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
            <span class="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue">
              The problem
            </span>
          </div>
          <h2 class="reveal mt-5 font-display text-3xl md:text-4xl text-balance" data-delay="0.1">
            The tradeoff has become too costly to ignore
          </h2>
          <p class="reveal mt-4 text-grey-on-white" data-delay="0.2">
            Added friction continues to drive legitimate users away, while record-high data breaches have made high-quality synthetic and stolen identities easy to create at scale. Data and document checks were never meant to stop real stolen PII.
          </p>
        </div>
        <div class="mt-14 grid gap-10 sm:grid-cols-3">
          ${REALITY_STATS.map((s, i) => `
            <div class="reveal border-t border-border-light pt-6" data-delay="${0.1 + i * 0.1}">
              <div class="font-display text-4xl md:text-5xl bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                <span class="tabular-nums" data-counter="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix}" data-decimals="0">0${s.suffix}</span>
              </div>
              <p class="mt-3 text-sm text-grey-on-white max-w-xs whitespace-pre-line">${s.label}</p>
              <p class="mt-2 text-xs text-grey-on-white/70">${s.source}</p>
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
            <span class="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue">
              Introducing GovFaceMatch
            </span>
          </div>
          <h2 class="reveal mt-5 font-display text-3xl md:text-4xl text-balance" data-delay="0.1">
            The only solution that delivers higher conversion without compromising identity assurance
          </h2>
          <p class="reveal mt-4 text-grey-on-white" data-delay="0.2">
            Built with state DMVs, enabling real-time biometric matching against official government records to confirm identity and stop AI-assisted fraud.
          </p>
        </div>

        <div class="reveal mt-10" data-delay="0.3">
          <!-- Intro Demo Component -->
          <div class="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 items-center">
            <div class="relative overflow-hidden rounded-2xl bg-off-white" style="aspect-ratio: 1000 / 914">
              <video
                id="intro-demo-video"
                src="/GFM_Flow.mp4"
                poster="/GFM_Flow_poster.jpg"
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
                      <h3 class="font-display text-base md:text-lg text-foreground">
                        ${step.title}
                      </h3>
                      <p class="mt-1.5 max-w-md text-sm text-grey-on-white">
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
              <span class="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue">
                Benefits
              </span>
            </div>
            <h2 class="reveal mt-5 font-display text-3xl md:text-4xl text-balance" data-delay="0.1">
              What changes when identity is verified against DMV records
            </h2>
            <p class="reveal mt-4 text-grey-on-white" data-delay="0.2">
              Direct verification at the source transforms conversion and fraud performance.
            </p>

            <ul class="mt-12 flex max-w-md flex-col gap-7">
              ${BENEFITS.map((b, i) => `
                <li class="reveal flex gap-3" data-delay="${0.3 + i * 0.08}">
                  <span class="mt-0.5 shrink-0 text-blue">
                    ${b.icon}
                  </span>
                  <div>
                    <h3 class="font-display text-lg leading-snug">${b.title}</h3>
                    <p class="mt-1.5 text-sm leading-relaxed text-grey-on-white">${b.body}</p>
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
                  <div class="font-display text-4xl md:text-5xl leading-none bg-[linear-gradient(120deg,#006aff_0%,#000_55%)] bg-clip-text text-transparent">
                    <span class="tabular-nums" data-counter="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix}" data-decimals="0">0${s.suffix}</span>
                  </div>
                  <div class="mt-3 font-display text-base text-foreground">${s.title}</div>
                  <div class="mt-1 text-sm text-grey-on-white">${s.sub}</div>
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
              <picture>
                <source srcset="/GFM-Illus.webp" type="image/webp">
                <img
                  src="/GFM-Illus.png"
                  alt=""
                  class="hidden object-cover md:block w-full h-full"
                  loading="lazy"
                />
              </picture>
            </div>

            <div class="relative w-full p-6 md:p-10 lg:p-14 flex items-center">
              <div class="w-full max-w-xl rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-7 md:p-9 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
                <img
                  src="/virginiadmv.png"
                  alt="Virginia Department of Motor Vehicles"
                  width="220"
                  height="64"
                  class="h-12 w-auto object-contain"
                  loading="lazy"
                />
                <blockquote class="mt-6 font-display-regular text-xl md:text-2xl text-white leading-snug text-balance">
                  "The partnership with Incode allows us to stay focused on our core mission of serving the public, while responsibly extending trusted identity verification capabilities to the private sector with customers' consent. By enabling secure, reliable identity checks across industries such as banking and automotive, we're helping strengthen the broader digital identity ecosystem."
                </blockquote>

                <div class="mt-8 pt-6 border-t border-white/15">
                  <div class="text-sm font-medium text-white">Dr. Gerald F. Lackey</div>
                  <div class="mt-0.5 text-xs text-grey-on-black">
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
    <section class="relative bg-rich-black text-white overflow-hidden">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-20 md:py-28">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-eyebrow/30 bg-blue-eyebrow/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-eyebrow">
            Unified offering
          </span>
        </div>
        <h2 class="reveal mt-4 font-display text-3xl md:text-4xl max-w-3xl text-balance" data-delay="0.1">
          Verify more users with the same level of trust
        </h2>
        <p class="reveal mt-6 max-w-2xl text-grey-on-black" data-delay="0.2">
          GovFaceMatch is part of the broader GovMatch offering, combining biometric and data validation against government records to deliver high assurance across every state.
        </p>
        
        <div class="reveal mt-10" data-delay="0.3">
          <div class="rounded-2xl border border-border-dark bg-off-black p-6 lg:p-8">
            <h3 class="font-display text-2xl md:text-3xl text-white">GovMatch</h3>
            <div class="mt-2 max-w-3xl text-sm text-grey-on-black space-y-1">
              <p>Combines GovFaceMatch and GovDataMatch to route verifications based on the issuing state.</p>
              <p>Coverage expands automatically as new states go live, with no additional integration required.</p>
            </div>
            <p class="mt-2 text-xs text-blue-eyebrow">95%+ combined population coverage</p>
            
            <div class="mt-6 rounded-2xl border border-border-dark bg-rich-black p-6 lg:p-8">
              <div class="mx-auto max-w-4xl">
                <picture>
                  <source srcset="/GovMatch.webp" type="image/webp">
                  <img
                    src="/GovMatch.png"
                    alt="GovMatch flow diagram"
                    width="2568"
                    height="992"
                    class="h-auto w-full"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
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
          <span class="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue">
            Why Incode
          </span>
        </div>
        <h2 class="reveal mt-4 font-display text-3xl md:text-4xl max-w-4xl text-balance" data-delay="0.1">
          The first and only identity platform to partner directly with state DMVs for real-time biometric verification
        </h2>
        <p class="reveal mt-6 max-w-2xl text-grey-on-white" data-delay="0.2">
          No other vendor can improve both conversion and fraud outcomes at the same time.
        </p>
        <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${WHY_TILES.map((t, i) => `
            <div class="reveal h-full rounded-xl border border-border-light bg-background p-6" data-delay="${0.05 * i}">
              <div class="flex items-center justify-between">
                <span class="text-blue">
                  ${t.icon}
                </span>
                <span class="font-display text-sm text-grey-on-white tabular-nums">
                  0${i + 1}
                </span>
              </div>
              <div class="mt-6 font-display text-base text-balance">${t.label}</div>
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
        <h2 class="reveal font-display text-3xl sm:text-4xl md:text-5xl md:whitespace-nowrap mx-auto">
          A new standard in identity verification
        </h2>
        <p class="reveal mt-6 text-grey-on-black max-w-xl mx-auto" data-delay="0.1">
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
