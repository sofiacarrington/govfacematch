"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { AnnouncementBar } from "./announcement-bar";
import { ButtonLink } from "@/components/ui/button";

type NavItem = { href: string; label: string; hasMenu?: boolean };

const NAV: NavItem[] = [
  { href: "#platform", label: "Platform", hasMenu: true },
  { href: "#benefits", label: "Solutions", hasMenu: true },
  { href: "#why-incode", label: "Why Incode" },
  { href: "#what-changes", label: "Technology" },
  { href: "#", label: "Resources", hasMenu: true },
  { href: "#", label: "Company", hasMenu: true },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <AnnouncementBar />

      <header
        className={cn(
          "bg-background/95 backdrop-blur transition-shadow",
          scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "",
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex h-[68px] items-center justify-between gap-6">
            <Link href="/" aria-label="Home" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 px-3 py-2 text-[15px] text-foreground hover:text-blue transition-colors"
                >
                  {item.label}
                  {item.hasMenu && (
                    <ChevronDown size={14} className="text-foreground/60" strokeWidth={2.25} />
                  )}
                </a>
              ))}
            </nav>

            <ButtonLink href="/contact" className="hidden lg:inline-flex">
              Request a demo
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </ButtonLink>

            <button
              aria-label="Toggle menu"
              className="lg:hidden text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden pb-4"
            >
              <div className="flex flex-col gap-1 pt-2">
                {NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-[15px] text-foreground hover:bg-off-white"
                  >
                    {item.label}
                    {item.hasMenu && <ChevronDown size={14} className="text-foreground/60" />}
                  </a>
                ))}
                <ButtonLink
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2"
                >
                  Request a demo
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </ButtonLink>
              </div>
            </motion.nav>
          )}
        </div>
      </header>
    </motion.div>
  );
}
