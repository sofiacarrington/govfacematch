/**
 * Accordion component for unified flow section
 */

export function initAccordion() {
  const accordions = document.querySelectorAll('[data-accordion-trigger]');
  
  accordions.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.dataset.accordionTrigger;
      const panel = document.querySelector(`[data-accordion-panel="${targetId}"]`);
      
      if (!panel) return;
      
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions in the same group (optional)
      const group = trigger.closest('[data-accordion-group]');
      if (group) {
        const allTriggers = group.querySelectorAll('[data-accordion-trigger]');
        const allPanels = group.querySelectorAll('[data-accordion-panel]');
        
        allTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
        allPanels.forEach(p => p.hidden = true);
      }
      
      // Toggle current accordion
      trigger.setAttribute('aria-expanded', !isOpen);
      panel.hidden = isOpen;
    });
  });
}
