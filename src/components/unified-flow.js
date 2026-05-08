/**
 * Unified Flow — Progressive Enhancement
 * Adds scroll-spy and zoom modal behavior to static HTML
 */

import { ASSET_BASE } from '../lib/config.js';

const WORKFLOW_IDS = ['govmatch', 'govfacematch', 'govdatamatch'];

const WORKFLOW_META = {
  govmatch: { title: 'GovMatch', diagram: `${ASSET_BASE}/GovMatch.png`, diagramWidth: 2568, diagramHeight: 992, emphasized: true },
  govfacematch: { title: 'GovFaceMatch', diagram: `${ASSET_BASE}/GovFaceMatch.png`, diagramWidth: 1832, diagramHeight: 808 },
  govdatamatch: { title: 'GovDataMatch', diagram: `${ASSET_BASE}/GovDataMatch.png`, diagramWidth: 1944, diagramHeight: 616 },
};

let activeId = WORKFLOW_IDS[0];
let zoomedWorkflow = null;

export function initUnifiedFlow() {
  initScrollSpy();
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

  WORKFLOW_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function updateNav() {
  WORKFLOW_IDS.forEach((id) => {
    const link = document.querySelector(`[data-workflow-link="${id}"]`);
    if (!link) return;

    const meta = WORKFLOW_META[id];
    const isActive = activeId === id;

    if (isActive) {
      link.className = "block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors border-white/25 bg-[linear-gradient(120deg,#006aff_0%,#000_100%)] text-white";
    } else {
      link.className = `block rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
        meta.emphasized
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

  WORKFLOW_IDS.forEach((id) => {
    const btn = document.querySelector(`[data-zoom-diagram="${id}"]`);
    if (btn) {
      btn.addEventListener('click', () => openZoomModal(WORKFLOW_META[id]));
    }
  });

  closeBtn.addEventListener('click', closeZoomModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeZoomModal();
  });

  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });

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
