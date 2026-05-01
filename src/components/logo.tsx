import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/incode-logo.svg"
      alt="Incode"
      width={100}
      height={40}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
