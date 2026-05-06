/**
 * Main entry point for GovFaceMatch landing page
 * Pure vanilla JavaScript - no frameworks
 */

// Import styles
import './styles.css';

// Import components (will be created in Phase 2)
import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';
import { initRevealAnimations } from './components/reveal.js';
import { initCounters } from './components/counter.js';
import { initVideoModal } from './components/video-modal.js';
import { initMarquee } from './components/marquee.js';
import { initTabs } from './components/tabs.js';
import { initAccordion } from './components/accordion.js';

// Import page content
import { renderPageContent } from './pages/home.js';

/**
 * Initialize the application
 */
function init() {
  // Render static components
  initHeader();
  initFooter();
  renderPageContent();
  
  // Initialize interactive components
  initRevealAnimations();
  initCounters();
  initVideoModal();
  initMarquee();
  initTabs();
  initAccordion();
  
  console.log('🚀 GovFaceMatch loaded');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is hidden
    document.body.classList.add('page-hidden');
  } else {
    // Resume animations when tab is visible
    document.body.classList.remove('page-hidden');
  }
});
