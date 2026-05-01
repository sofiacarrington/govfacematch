import Link from "next/link";
import Image from "next/image";

export function AnnouncementBar() {
  return (
    <div className="bg-blue text-white text-sm">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-2.5 flex items-center justify-center gap-3 flex-wrap text-center">
        <Image
          src="/new-badge.svg"
          alt="NEW"
          width={41}
          height={16}
          className="h-4 w-auto shrink-0"
        />
        <span>
          <strong className="font-medium">Introducing GovFaceMatch.</strong>{" "}
          A new standard in identity verification.
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
