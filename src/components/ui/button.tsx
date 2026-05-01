import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-[#0058d9]",
  secondary:
    "bg-background text-foreground border border-border-light hover:border-blue/40 hover:text-blue",
  ghost: "text-foreground hover:text-blue",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-[15px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & Omit<ComponentProps<typeof Link>, keyof CommonProps>;
type ButtonProps = CommonProps & Omit<ComponentProps<"button">, keyof CommonProps>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}
