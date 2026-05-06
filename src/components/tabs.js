/**
 * Tab component for conversion accuracy section
 */

export function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');
  
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('[data-tab-button]');
    const panels = container.querySelectorAll('[data-tab-panel]');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.tabButton;
        
        // Update buttons
        buttons.forEach(btn => {
          btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
        });
        
        // Update panels
        panels.forEach(panel => {
          panel.hidden = panel.dataset.tabPanel !== targetId;
        });
      });
    });
  });
}
