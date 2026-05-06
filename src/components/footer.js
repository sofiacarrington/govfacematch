/**
 * Site footer component
 */

export function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  
  // Footer will be populated in Phase 2
  footer.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="text-center text-sm text-grey-on-white">
        © ${new Date().getFullYear()} GovFaceMatch. All rights reserved.
      </div>
    </div>
  `;
}
