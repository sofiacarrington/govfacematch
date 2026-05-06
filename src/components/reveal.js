/**
 * Reveal animation using Intersection Observer
 * Vanilla JS replacement for Framer Motion's scroll animations
 */

export function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  
  if (!elements.length) return;
  
  // Intersection Observer for scroll-triggered animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseFloat(delay) * 1000);
          
          // Unobserve after animation triggers (once: true behavior)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-80px'
    }
  );
  
  elements.forEach(el => observer.observe(el));
}
