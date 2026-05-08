/**
 * GovFaceMatch — Progressive Enhancement
 * HTML is pre-rendered in Webflow Embed elements (SEO-friendly).
 * This script adds animations, counters, video modal, and interactivity.
 */

// Import styles
import './styles.css';

// Import enhancement modules
import { initRevealAnimations } from './components/reveal.js';
import { initCounters } from './components/counter.js';
import { initVideoModal } from './components/video-modal.js';
import { initUnifiedFlow } from './components/unified-flow.js';

/**
 * Enhance the static HTML with interactivity
 */
function enhance() {
  initRevealAnimations();
  initCounters();
  initVideoModal();
  initUnifiedFlow();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhance);
} else {
  enhance();
}

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});
