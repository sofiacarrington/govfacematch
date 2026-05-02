"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Building,
  Building2,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Compass,
  Cpu,
  Dice5,
  FileQuestion,
  Fingerprint,
  Gamepad2,
  Gauge,
  HeartPulse,
  IdCard,
  Landmark,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Network,
  Palette,
  Plug,
  ScanFace,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserCheck,
  Workflow,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
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

type MenuLink = { icon: LucideIcon; title: string; sub?: string; href: string };
type MenuColumn = { heading: string; links: MenuLink[]; columns?: 1 | 2 };

const PLATFORM_MENU: MenuColumn[] = [
  {
    heading: "Platform",
    columns: 2,
    links: [
      { icon: Compass, title: "Explore Platform", href: "#" },
      { icon: LayoutDashboard, title: "Orchestration Dashboard", sub: "Everything in one place", href: "#" },
      { icon: Workflow, title: "Workflow Builder", sub: "No-code flow builder", href: "#" },
      { icon: Palette, title: "UI Customization", sub: "Brand-aligned journeys", href: "#" },
      { icon: Gauge, title: "Decisioning & Results", sub: "Transparency on every session", href: "#" },
      { icon: TrendingUp, title: "Fraud Analytics", sub: "Monitor performance and trends", href: "#" },
      { icon: ClipboardList, title: "Case Management", sub: "Smarter case reviews", href: "#" },
      { icon: Plug, title: "Platform Integrations", sub: "APIs and SDKs", href: "#" },
    ],
  },
  {
    heading: "Featured Products",
    links: [
      { icon: ShieldCheck, title: "Deepsight", href: "#" },
      { icon: BadgeCheck, title: "Workforce (KYE)", href: "#" },
      { icon: Brain, title: "Risk AI Agent", href: "#" },
      { icon: Sparkles, title: "Agentic Identity", href: "#" },
    ],
  },
  {
    heading: "Featured Modules",
    links: [
      { icon: ScanFace, title: "Facial Recognition", href: "#" },
      { icon: IdCard, title: "Document Verification", href: "#" },
      { icon: ScanLine, title: "OCR", href: "#" },
      { icon: Fingerprint, title: "Deepfake Detection", href: "#" },
      { icon: Network, title: "Network", href: "#" },
      { icon: Cpu, title: "Face Age Estimation", href: "#" },
    ],
  },
];

const SOLUTIONS_MENU: MenuColumn[] = [
  {
    heading: "Use cases",
    columns: 2,
    links: [
      { icon: UserCheck, title: "KYC/AML compliance", href: "#" },
      { icon: IdCard, title: "Identity Verification (IDV)", href: "#" },
      { icon: FileQuestion, title: "Non-Document Verification", href: "#" },
      { icon: Building2, title: "Know Your Business (KYB)", href: "#" },
      { icon: CalendarCheck, title: "Age Verification", href: "#" },
      { icon: ScanFace, title: "Candidate Verification", href: "#" },
      { icon: Smartphone, title: "Digital ID Verification", href: "#" },
    ],
  },
  {
    heading: "Industries",
    columns: 2,
    links: [
      { icon: Landmark, title: "Financial services", href: "#" },
      { icon: HeartPulse, title: "Healthcare", href: "#" },
      { icon: Gamepad2, title: "Online gaming", href: "#" },
      { icon: Dice5, title: "Online gambling", href: "#" },
      { icon: ShoppingBag, title: "E-commerce & marketplaces", href: "#" },
      { icon: Building, title: "Public sector", href: "#" },
      { icon: MessageCircle, title: "Social media", href: "#" },
    ],
  },
];

const MEGA_MENUS: Record<string, MenuColumn[]> = {
  Platform: PLATFORM_MENU,
  Solutions: SOLUTIONS_MENU,
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevScroll = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
    const direction = y > prevScroll.current ? "down" : "up";
    if (y < 80) {
      setHidden(false);
    } else if (direction === "down" && y > 80) {
      setHidden(true);
    } else if (direction === "up") {
      setHidden(false);
    }
    prevScroll.current = y;
  });

  const openMenuFor = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const bright = scrolled || openMenu !== null;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden && !openMenu ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          bright
            ? "border-border-light/60 bg-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]"
            : "border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-4">
          <Link href="/" aria-label="Home" className="shrink-0">
            <Logo
              className={cn(
                "transition-[filter] duration-300 ease-out",
                bright ? "[filter:none]" : "[filter:brightness(0)_invert(1)]",
              )}
            />
          </Link>

          <nav className="hidden lg:flex items-center rounded-2xl px-2 py-2">
            {NAV.map((item) => {
              const hasMega = item.label in MEGA_MENUS;
              const isOpen = openMenu === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => hasMega && openMenuFor(item.label)}
                  onMouseLeave={() => hasMega && scheduleClose()}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[13px] transition-colors",
                    bright
                      ? "text-foreground hover:bg-foreground/5"
                      : "text-white hover:bg-white/10",
                    isOpen && "bg-foreground/5",
                  )}
                >
                  {item.label}
                  {item.hasMenu && (
                    <ChevronDown
                      size={12}
                      strokeWidth={2.25}
                      className={cn(
                        "transition-transform duration-200",
                        bright ? "text-foreground/40" : "text-white/60",
                        isOpen && "rotate-180",
                      )}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className={cn(
              "hidden lg:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-colors duration-300 ease-out",
              bright ? "bg-blue hover:bg-[#0058d9]" : "hover:bg-white/10",
            )}
          >
            Request a demo
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </Link>

          <button
            aria-label="Toggle menu"
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {openMenu && MEGA_MENUS[openMenu] && (
            <motion.div
              key="mega-container"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                opacity: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
              }}
              onMouseEnter={() => openMenuFor(openMenu)}
              onMouseLeave={scheduleClose}
              className="hidden lg:block border-t border-border-light/60 bg-background/95 backdrop-blur-xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]"
            >
              <motion.div
                key={openMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <MegaPanel menu={MEGA_MENUS[openMenu]} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border-light/60 px-4 pb-4"
          >
            <div className="flex flex-col gap-1 pt-2">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-foreground hover:bg-off-white"
                >
                  {item.label}
                  {item.hasMenu && <ChevronDown size={14} className="text-foreground/60" />}
                </a>
              ))}
              <ButtonLink
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full"
              >
                Request a demo
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.div>
  );
}

function MegaPanel({ menu }: { menu: MenuColumn[] }) {
  return (
    <div className="mx-auto grid max-w-[1280px] px-4 py-8 lg:px-8 lg:grid-cols-[1.7fr_1fr_1.05fr]">
      {menu.map((col, idx) => (
        <div
          key={col.heading}
          className={cn(
            idx > 0 && "lg:border-l lg:border-border-light/70 lg:pl-8",
            idx < menu.length - 1 && "lg:pr-8",
            menu.length === 2 && idx === 1 && "lg:col-span-2",
          )}
        >
          <div className="text-xs font-medium text-grey-on-white">{col.heading}</div>
          <div
            className={cn(
              "mt-4 grid gap-x-6",
              col.links.some((l) => l.sub) ? "gap-y-5" : "gap-y-3",
              col.columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
            )}
          >
            {col.links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "group/link flex gap-3",
                    link.sub ? "items-start" : "items-center",
                  )}
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-light/80 bg-off-white text-foreground/70 transition-colors group-hover/link:border-blue/30 group-hover/link:bg-blue/8 group-hover/link:text-blue">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium leading-tight text-foreground transition-colors group-hover/link:text-blue">
                      {link.title}
                    </span>
                    {link.sub && (
                      <span className="mt-0.5 text-xs leading-snug text-grey-on-white">
                        {link.sub}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
