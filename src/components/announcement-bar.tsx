import Link from "next/link";
import Image from "next/image";

export function AnnouncementBar() {
  return (
    <div className="bg-blue text-white text-[13px] sm:text-sm">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-2 px-5 py-2.5 text-center sm:gap-3 lg:px-8">
        <Image
          src="/new-badge.svg"
          alt="NEW"
          width={41}
          height={16}
          className="h-4 w-auto shrink-0"
        />
        <span>
          <strong className="font-medium">Introducing GovFaceMatch.</strong>
          <span className="hidden sm:inline">
            {" "}A new standard in identity verification.
          </span>
        </span>
        <Link
          href="/contact"
          className="underline underline-offset-4 hover:opacity-80 transition-opacity font-medium shrink-0"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
