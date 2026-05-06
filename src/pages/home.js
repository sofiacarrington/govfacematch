/**
 * Home page content
 * This file will contain all the page sections
 */

export function renderPageContent() {
  const main = document.getElementById('main-content');
  if (!main) return;
  
  // Placeholder - will be populated in Phase 6
  main.innerHTML = `
    <section class="py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-5xl font-display mb-4 reveal" data-delay="0">
          GovFaceMatch
        </h1>
        <p class="text-xl text-grey-on-white reveal" data-delay="0.1">
          Placeholder content - will be populated in Phase 6
        </p>
      </div>
    </section>
  `;
}
