# Webflow Integration - Technical Notes

## Overview

Deployed a Vite + vanilla JS landing page into Webflow via S3-hosted assets. The page renders inside a `<main id="main-content">` container using custom code embeds (head + footer). No header/footer — body content only.

## Architecture

- **Build tool:** Vite 6.4.2 with terser minification and manual chunk splitting
- **CSS:** Tailwind CSS v4.2.4 with `@import "tailwindcss" important` directive
- **Hosting:** S3 bucket `incode-videos`, folder `govfacematch-v5/`
- **Embed method:** Webflow Project Settings → Custom Code (head + footer)

## The Core Problem: CSS Isolation in Webflow

Webflow injects global CSS that targets bare HTML elements:

```css
body { font-family: Arial; font-size: 14px; color: #333; }
h1 { font-size: 38px; font-weight: 700; }
h2 { ... }
p { margin-bottom: 10px; }
ul { padding-left: 40px; }
blockquote { border-left: 5px solid #e2e2e2; padding: 10px 20px; }
img { display: inline-block; }
```

These are **unlayered** styles with element-level specificity. Our content renders inside Webflow's DOM, so every element is affected.

## Solution: Multi-Layer Defense

### 1. Tailwind `important` Directive

```css
@import "tailwindcss" important;
```

Forces all Tailwind utilities to output with `!important`. This beats Webflow's element selectors regardless of cascade layer ordering.

### 2. Semantic Text Classes

Every text element gets an explicit class that declares font-family, font-size, line-height, color, and weight with `!important`. No relying on inheritance.

**Light background classes** (color: #111111):
- `.t-section-heading` (used on both — no forced color, relies on utility)
- `.t-card-title-sm`, `.t-benefit-title`, `.t-tile-label`

**Dark background classes** (color: white):
- `.t-hero-title`, `.t-cta-heading`, `.t-card-title`, `.t-button`

**Grey text classes** (explicit grey values):
- `.t-body-sm` → `#6e6e6e` (grey-on-white, light bg)
- `.t-body-dark` → `#a9a9a9` (grey-on-black, dark bg)
- `.t-body-lg` → `#a9a9a9`
- `.t-stat-label`, `.t-stat-source`, `.t-quote-role`

### 3. Element Resets (scoped to `#main-content`)

```css
#main-content ul, #main-content ol {
  list-style: none !important;
  padding-left: 0 !important;
  margin: 0 !important;
}
#main-content blockquote {
  border-left: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
#main-content p {
  margin-bottom: 0 !important;
}
#main-content img {
  display: block !important;
  max-width: 100% !important;
}
```

### 4. Inline Styles on Container

```html
<main id="main-content" style="background-color:#010101;color:#ffffff;"></main>
```

Sets the base dark background and white text directly, independent of any stylesheet.

## Bugs Encountered and Root Causes

### Bug 1: All Tailwind utilities lose to Webflow CSS

**Symptom:** Nothing styled correctly — Webflow wins everything.
**Root cause:** Tailwind v4 outputs inside `@layer`, and unlayered CSS always beats layered CSS in the cascade.
**Fix:** `@import "tailwindcss" important` — all utilities get `!important`.

### Bug 2: Tailwind not scanning JS template literals

**Symptom:** Classes missing from CSS output.
**Root cause:** Tailwind v4 content scanning doesn't auto-detect `.js` files with template literals.
**Fix:** `@source "../src/**/*.js";` directive in styles.css.

### Bug 3: Headings showing wrong color

**Symptom:** `h2` elements on dark backgrounds showing Webflow's dark color instead of white.
**Root cause:** Headings relied on `color` inheritance from parent section, but Webflow's `h2 { color: ... }` element selector overrides inheritance.
**Fix:** Added explicit `text-white` or `text-foreground` utility to every heading element.

### Bug 4: Paragraph text wrong color in unified-flow cards

**Symptom:** Card body text showing `#6e6e6e` instead of `#a9a9a9`.
**Root cause:** Used `.t-body-sm` (light-bg class) on dark-background cards. Also, the class was on the wrapper `<div>` but not on the child `<p>` elements — Webflow's `p` selector beats inheritance.
**Fix:** Created `.t-body-dark` class with correct color, applied directly to each `<p>`.

### Bug 5: `<ul>` has unexpected left padding

**Symptom:** Benefits list indented.
**Root cause:** Webflow's `ul { padding-left: 40px }`.
**Fix:** `#main-content ul { padding-left: 0 !important; }`.

### Bug 6: `<blockquote>` has border and padding

**Symptom:** Testimonial quote has left border and indentation.
**Root cause:** Webflow's `blockquote { border-left: 5px solid #e2e2e2; padding: 10px 20px; }`.
**Fix:** Reset on both `.t-quote` class and `#main-content blockquote`.

### Bug 7: Body text showing at wrong font-size

**Symptom:** Paragraphs appearing at 14px instead of 16px.
**Root cause:** Initially set `.t-body-sm` to 14px (matching Tailwind's `text-sm` literally) instead of the actual intended 16px rendered size.
**Fix:** Changed `.t-body-sm` to `font-size: 16px !important`.

### Bug 8: Video modal not playing

**Symptom:** Modal opens but video doesn't load.
**Root cause:** Video src was `/hero.mp4` (relative path), which resolves to Webflow's domain in production.
**Fix:** Changed to `${ASSET_BASE}/hero.mp4` pointing to S3.

### Bug 9: `#main-content p` using `inherit` hack

**Symptom:** Fragile — if any parent doesn't set color, it falls back to Webflow's default.
**Root cause:** Attempted to use `color: inherit !important` on all `<p>` as a shortcut instead of applying classes directly.
**Fix:** Removed the inherit hack. Every `<p>` now has its own semantic class declaring the correct color.

## Key Lessons

1. **Never rely on CSS inheritance in Webflow** — Webflow targets elements directly, so inheritance is always overridden.
2. **Every text element needs an explicit color** — either via utility class or semantic class.
3. **One semantic class cannot serve both light and dark backgrounds** — need separate variants.
4. **Classes must go on the element itself**, not just on a wrapper — Webflow's element selectors beat parent inheritance.
5. **Audit ALL HTML element types** Webflow styles (h1-h6, p, ul, ol, li, blockquote, img, a, figure) — not just typography.
6. **Tailwind class names ≠ intended design** — `text-sm` = 14px in Tailwind, but the design may need 16px. Always verify against the rendered output.

## File Map

| File | Purpose |
|------|---------|
| `webflow-embed/head-code.html` | Webflow head custom code (modulepreloads + CSS) |
| `webflow-embed/body-code.html` | Webflow footer custom code (container + entry JS) |
| `s3-upload/govfacematch-v5/assets/` | Built files ready for S3 upload |
| `src/styles.css` | All styles: Tailwind config, theme, resets, semantic classes |
| `src/pages/home.js` | Page content as HTML template literals |
| `src/components/unified-flow.js` | Interactive workflow cards component |
| `src/components/video-modal.js` | Video modal (click-to-play hero video) |
| `src/lib/config.js` | S3 base URL constant |
