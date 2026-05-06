/**
 * Video modal component
 * Vanilla JS replacement for AnimatePresence modal
 */

import { ASSET_BASE } from '../lib/config.js';

let modalElement = null;

export function initVideoModal() {
  const trigger = document.querySelector('[data-video-trigger]');
  if (!trigger) return;
  
  trigger.addEventListener('click', openModal);
}

function openModal() {
  const videoSrc = `${ASSET_BASE}/hero.mp4`;
  
  // Create modal
  modalElement = document.createElement('div');
  modalElement.className = 'modal-backdrop';
  modalElement.setAttribute('role', 'dialog');
  modalElement.setAttribute('aria-modal', 'true');
  modalElement.setAttribute('aria-label', 'GovFaceMatch explainer');
  
  modalElement.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div class="modal-content relative w-full max-w-6xl">
        <button
          type="button"
          class="absolute -top-12 right-0 inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-2 text-sm text-white border border-white/10 backdrop-blur transition-colors"
          data-modal-close
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          Close
          <span class="hidden md:inline text-white/50 ml-1 text-xs">esc</span>
        </button>
        
        <div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-inset ring-white/10">
          <video
            class="h-full w-full"
            src="${videoSrc}"
            autoplay
            controls
            playsinline
          ></video>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalElement);
  document.body.style.overflow = 'hidden';
  
  // Trigger animation
  requestAnimationFrame(() => {
    modalElement.classList.add('active');
  });
  
  // Event listeners
  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) closeModal();
  });
  
  const closeBtn = modalElement.querySelector('[data-modal-close]');
  closeBtn.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', handleEscape);
}

function handleEscape(e) {
  if (e.key === 'Escape') closeModal();
}

function closeModal() {
  if (!modalElement) return;
  
  modalElement.classList.remove('active');
  
  setTimeout(() => {
    if (modalElement) {
      modalElement.remove();
      modalElement = null;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    }
  }, 300);
}
