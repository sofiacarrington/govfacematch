/**
 * Unified Flow Component - Vanilla JS
 * Complex interactive component with scroll-spy, sticky nav, and zoom modal
 */

import { ASSET_BASE } from '../lib/config.js';

const WORKFLOWS = [
  {
    id: "govmatch",
    tab: "Unified offering: GovMatch",
    title: "GovMatch",
    body: [
      "Combines GovFaceMatch and GovDataMatch to route verifications based on the issuing state.",
      "Coverage expands automatically as new states go live, with no additional integration required.",
    ],
    coverage: "95%+ combined population coverage",
    diagram: `${ASSET_BASE}/GovMatch.png`,
    diagramWidth: 2568,
    diagramHeight: 992,
    emphasized: true,
  },
  {
    id: "govfacematch",
    tab: "GovFaceMatch",
    title: "GovFaceMatch",
    body: [
      "Matches a live biometric directly against the government portrait at the issuing DMV.",
      "Confirms the person, not just the identity.",
    ],
    coverage: "~20% U.S. population coverage",
    diagram: `${ASSET_BASE}/GovFaceMatch.png`,
    diagramWidth: 1832,
    diagramHeight: 808,
  },
  {
    id: "govdatamatch",
    tab: "GovDataMatch",
    title: "GovDataMatch",
    body: [
      "Matches identity data attributes against DMV issuing records across 46 states.",
      "Confirms the identity exists in the government record.",
    ],
    coverage: "~85% U.S. population coverage",
    diagram: `${ASSET_BASE}/GovDataMatch.png`,
    diagramWidth: 1944,
    diagramHeight: 616,
  },
];

let activeId = WORKFLOWS[0].id;
let zoomedWorkflow = null;

export function renderUnifiedFlow() {
  return `
    <div class="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      <!-- Sticky Sidebar Nav -->
      <aside class="hidden lg:block lg:sticky lg:top-24 lg:self-start">
        <nav>
          <ul class="flex flex-col gap-2" id="unified-flow-nav">
            ${WORKFLOWS.map((w) => `
              <li>
                <a
                  href="#${w.id}"
                  data-workflow-link="${w.id}"
                  class="block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    w.emphasized
                      ? 'border-blue/40 bg-blue/5 text-white hover:bg-blue/10'
                      : 'border-border-dark bg-rich-black text-grey-on-black hover:text-white'
                  }"
                >
                  ${w.tab}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </aside>

      <!-- Workflow Cards -->
      <div class="flex flex-col gap-6">
        ${WORKFLOWS.map((w) => `
          <article
            id="${w.id}"
            class="scroll-mt-24 rounded-2xl border border-border-dark bg-off-black p-6 lg:p-8"
          >
            ${w.emphasized ? `
              <p class="lg:hidden text-xs font-medium text-blue-eyebrow">
                Unified offering
              </p>
            ` : ''}
            <h3 class="font-display text-2xl md:text-3xl text-white ${w.emphasized ? 'mt-1 lg:mt-0' : ''}">
              ${w.title}
            </h3>
            <div class="mt-2 max-w-3xl text-sm text-grey-on-black space-y-1">
              ${w.body.map(line => `<p>${line}</p>`).join('')}
            </div>
            <p class="mt-2 text-xs ${w.emphasized ? 'text-blue-eyebrow' : 'text-grey-on-black'}">
              ${w.coverage}
            </p>
            <button
              type="button"
              data-zoom-diagram="${w.id}"
              class="group relative mt-6 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border-dark bg-rich-black p-6 lg:p-8"
              aria-label="Open ${w.title} flow diagram in full screen"
            >
              <span class="pointer-events-none absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-grey-on-black opacity-0 transition-opacity group-hover:opacity-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
                </svg>
              </span>
              <div class="mx-auto max-w-4xl">
                <img
                  src="${w.diagram}"
                  alt="${w.title} flow diagram"
                  width="${w.diagramWidth}"
                  height="${w.diagramHeight}"
                  class="h-auto w-full"
                  loading="${w.id === 'govmatch' ? 'eager' : 'lazy'}"
                />
              </div>
            </button>
          </article>
        `).join('')}
      </div>
    </div>

    <!-- Zoom Modal (initially hidden) -->
    <div
      id="zoom-modal"
      role="dialog"
      aria-modal="true"
      class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-6"
      style="display: none;"
    >
      <div
        id="zoom-modal-content"
        class="relative w-full max-w-[1500px] rounded-2xl border border-border-dark bg-off-black p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] md:p-10"
      >
        <div class="flex items-center justify-between gap-4">
          <h3 id="zoom-modal-title" class="font-display text-lg text-white md:text-xl"></h3>
          <button
            type="button"
            id="zoom-modal-close"
            aria-label="Close"
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="mt-6 flex items-center justify-center rounded-xl border border-border-dark bg-rich-black p-4 md:mt-8 md:p-8">
          <img
            id="zoom-modal-image"
            alt=""
            class="h-auto max-h-[78vh] w-full object-contain"
          />
        </div>
      </div>
    </div>
  `;
}

export function initUnifiedFlow() {
  // Initialize scrollspy
  initScrollSpy();
  
  // Initialize zoom functionality
  initZoomModal();
}

function initScrollSpy() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const newActiveId = visible[0].target.id;
        
        if (newActiveId !== activeId) {
          activeId = newActiveId;
          updateNav();
        }
      }
    },
    { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
  );
  
  WORKFLOWS.forEach((w) => {
    const el = document.getElementById(w.id);
    if (el) observer.observe(el);
  });
}

function updateNav() {
  WORKFLOWS.forEach((w) => {
    const link = document.querySelector(`[data-workflow-link="${w.id}"]`);
    if (!link) return;
    
    const isActive = activeId === w.id;
    
    if (isActive) {
      link.className = "block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors border-white/25 bg-[linear-gradient(120deg,#006aff_0%,#000_100%)] text-white";
    } else {
      link.className = `block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
        w.emphasized
          ? 'border-blue/40 bg-blue/5 text-white hover:bg-blue/10'
          : 'border-border-dark bg-rich-black text-grey-on-black hover:text-white'
      }`;
    }
  });
}

function initZoomModal() {
  const modal = document.getElementById('zoom-modal');
  const modalContent = document.getElementById('zoom-modal-content');
  const modalTitle = document.getElementById('zoom-modal-title');
  const modalImage = document.getElementById('zoom-modal-image');
  const closeBtn = document.getElementById('zoom-modal-close');
  
  if (!modal || !modalContent || !modalTitle || !modalImage || !closeBtn) return;
  
  // Click handlers for zoom buttons
  WORKFLOWS.forEach((w) => {
    const btn = document.querySelector(`[data-zoom-diagram="${w.id}"]`);
    if (btn) {
      btn.addEventListener('click', () => openZoomModal(w));
    }
  });
  
  // Close button
  closeBtn.addEventListener('click', closeZoomModal);
  
  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeZoomModal();
  });
  
  // Stop propagation on content
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomedWorkflow) {
      closeZoomModal();
    }
  });
}

function openZoomModal(workflow) {
  zoomedWorkflow = workflow;
  
  const modal = document.getElementById('zoom-modal');
  const modalTitle = document.getElementById('zoom-modal-title');
  const modalImage = document.getElementById('zoom-modal-image');
  
  if (!modal || !modalTitle || !modalImage) return;
  
  modalTitle.textContent = workflow.title;
  modalImage.src = workflow.diagram;
  modalImage.alt = `${workflow.title} flow diagram`;
  modalImage.width = workflow.diagramWidth;
  modalImage.height = workflow.diagramHeight;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeZoomModal() {
  const modal = document.getElementById('zoom-modal');
  if (!modal) return;
  
  modal.style.display = 'none';
  document.body.style.overflow = '';
  zoomedWorkflow = null;
}
