/**
 * Site header component
 */

import { renderAnnouncementBar } from './announcement-bar.js';

let scrolled = false;
let hidden = false;
let prevScroll = 0;

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  
  renderHeader(header);
  initScrollBehavior();
  initMobileMenu();
}

function renderHeader(header) {
  header.innerHTML = `
    ${renderAnnouncementBar()}
    <div id="main-header" class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300">
      <div id="header-bg" class="border-b transition-[background-color,border-color,box-shadow] duration-300">
        <div class="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-4">
          <!-- Logo -->
          <a href="/" aria-label="Home" class="shrink-0">
            <img
              src="/incode-logo.svg"
              alt="Incode"
              width="100"
              height="40"
              class="h-7 w-auto transition-[filter] duration-300"
              id="header-logo"
            />
          </a>
          
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-1 rounded-2xl px-2 py-2">
            <a href="#platform" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Platform
            </a>
            <a href="#benefits" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Solutions
            </a>
            <a href="#why-incode" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Why Incode
            </a>
            <a href="#technology" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Technology
            </a>
            <a href="#resources" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Resources
            </a>
            <a href="#company" class="nav-link inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors">
              Company
            </a>
          </nav>
          
          <!-- CTA Button -->
          <a
            href="/contact"
            id="header-cta"
            class="hidden lg:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-colors duration-300"
          >
            Request a demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25">
              <path d="M7 7h10v10M7 17 17 7"/>
            </svg>
          </a>
          
          <!-- Mobile Menu Button -->
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
            class="lg:hidden text-foreground"
          >
            <svg id="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
            <svg id="close-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="fixed inset-0 z-40 bg-background lg:hidden" style="display: none; padding-top: 60px;">
      <nav class="flex flex-col p-6 gap-4">
        <a href="#platform" class="text-lg font-medium">Platform</a>
        <a href="#benefits" class="text-lg font-medium">Solutions</a>
        <a href="#why-incode" class="text-lg font-medium">Why Incode</a>
        <a href="#technology" class="text-lg font-medium">Technology</a>
        <a href="#resources" class="text-lg font-medium">Resources</a>
        <a href="#company" class="text-lg font-medium">Company</a>
        <a href="/contact" class="mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white bg-blue">
          Request a demo
        </a>
      </nav>
    </div>
  `;
}

function initScrollBehavior() {
  const mainHeader = document.getElementById('main-header');
  const headerBg = document.getElementById('header-bg');
  const logo = document.getElementById('header-logo');
  const navLinks = document.querySelectorAll('.nav-link');
  const cta = document.getElementById('header-cta');
  
  if (!mainHeader || !headerBg) return;
  
  function updateHeader() {
    const y = window.scrollY;
    const newScrolled = y > 8;
    const direction = y > prevScroll ? 'down' : 'up';
    
    // Update scrolled state
    if (newScrolled !== scrolled) {
      scrolled = newScrolled;
      
      if (scrolled) {
        // Bright state
        headerBg.classList.add('border-border-light/60', 'bg-background', 'shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]');
        headerBg.classList.remove('border-transparent');
        logo.style.filter = 'none';
        cta.classList.add('bg-blue', 'hover:bg-[#0058d9]');
        cta.classList.remove('hover:bg-white/10');
        navLinks.forEach(link => {
          link.classList.add('text-foreground', 'hover:bg-foreground/5');
          link.classList.remove('text-white', 'hover:bg-white/10');
        });
      } else {
        // Transparent state
        headerBg.classList.remove('border-border-light/60', 'bg-background', 'shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]');
        headerBg.classList.add('border-transparent');
        logo.style.filter = 'brightness(0) invert(1)';
        cta.classList.remove('bg-blue', 'hover:bg-[#0058d9]');
        cta.classList.add('hover:bg-white/10');
        navLinks.forEach(link => {
          link.classList.remove('text-foreground', 'hover:bg-foreground/5');
          link.classList.add('text-white', 'hover:bg-white/10');
        });
      }
    }
    
    // Hide/show on scroll
    if (y < 80) {
      hidden = false;
      mainHeader.style.transform = 'translateY(0)';
    } else if (direction === 'down' && y > 80) {
      if (!hidden) {
        hidden = true;
        mainHeader.style.transform = 'translateY(-100%)';
      }
    } else if (direction === 'up') {
      if (hidden) {
        hidden = false;
        mainHeader.style.transform = 'translateY(0)';
      }
    }
    
    prevScroll = y;
  }
  
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Initial call
}

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  if (!toggle || !menu) return;
  
  let isOpen = false;
  
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      menu.style.display = 'block';
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      menu.style.display = 'none';
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Close on link click
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.style.display = 'none';
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      document.body.style.overflow = '';
    });
  });
}
