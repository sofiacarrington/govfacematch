/**
 * Animated counter using requestAnimationFrame
 * Vanilla JS replacement for Framer Motion's animated values
 */

export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (!counters.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-60px'
    }
  );
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.counter);
  const duration = parseFloat(element.dataset.duration || 1.6) * 1000;
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';
  const decimals = parseInt(element.dataset.decimals || 0);
  
  const startTime = performance.now();
  const startValue = 0;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function: cubic-bezier(0.16, 1, 0.3, 1)
    const eased = 1 - Math.pow(1 - progress, 3);
    
    const currentValue = startValue + (target - startValue) * eased;
    const formatted = currentValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    element.textContent = `${prefix}${formatted}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
