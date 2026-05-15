import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "rich";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        tone === "light" && "bg-background text-foreground",
        tone === "dark" && "bg-off-black text-white",
        tone === "rich" && "bg-rich-black text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:py-16 md:py-20 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-medium",
        tone === "dark"
          ? "border-blue/25 bg-blue/10 text-blue-eyebrow"
          : "border-blue/20 bg-blue/10 text-blue",
        className,
      )}
    >
      {children}
    </div>
  );
}
