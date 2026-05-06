/**
 * Button utilities
 * Vanilla JS helpers for creating button elements
 */

/**
 * Create a button element with predefined styles
 */
export function createButton({
  text,
  variant = 'primary',
  size = 'md',
  href = null,
  icon = null,
  onClick = null,
  className = ''
}) {
  const variants = {
    primary: 'bg-blue text-white hover:bg-[#0058d9]',
    secondary: 'bg-background text-foreground border border-border-light hover:border-blue/40 hover:text-blue',
    ghost: 'text-foreground hover:text-blue'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-5 py-2.5 text-[15px]'
  };
  
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();
  
  if (href) {
    const link = document.createElement('a');
    link.href = href;
    link.className = classes;
    link.innerHTML = `${text}${icon || ''}`;
    if (onClick) link.addEventListener('click', onClick);
    return link;
  }
  
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classes;
  button.innerHTML = `${text}${icon || ''}`;
  if (onClick) button.addEventListener('click', onClick);
  return button;
}

/**
 * Create an icon SVG element
 */
export function createIcon(name, size = 16) {
  const icons = {
    'arrow-up-right': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10M7 17 17 7"/></svg>`,
    'menu': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`,
    'x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
    'chevron-down': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  };
  
  return icons[name] || '';
}
