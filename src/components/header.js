/**
 * Site header component
 */

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  
  // Header will be populated in Phase 2
  header.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="font-display text-xl font-medium">GovFaceMatch</div>
        <nav>
          <a href="#" class="text-sm hover:text-blue transition-colors">Contact</a>
        </nav>
      </div>
    </div>
  `;
}
