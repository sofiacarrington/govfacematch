/**
 * Announcement bar component
 */

export function renderAnnouncementBar() {
  return `
    <div class="bg-blue text-white text-sm">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12 py-2.5 flex items-center justify-center gap-3 flex-wrap text-center">
        <img
          src="/new-badge.svg"
          alt="NEW"
          width="41"
          height="16"
          class="h-4 w-auto shrink-0"
          loading="lazy"
        />
        <span>
          <strong class="font-medium">Introducing GovFaceMatch.</strong>
          A new standard in identity verification.
        </span>
        <a
          href="/contact"
          class="underline underline-offset-4 hover:opacity-80 transition-opacity font-medium shrink-0"
        >
          Get started
        </a>
      </div>
    </div>
  `;
}
