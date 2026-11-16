"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 px-4 pt-[max(1rem,env(safe-area-inset-top))] md:px-8">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-border bg-surface/75 pl-2 pr-2 shadow-soft backdrop-blur-xl backdrop-saturate-150">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="press flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold tracking-tight text-background">
            {site.monogram}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-accent" : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={`mailto:${site.email}`}
            className="press hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-accent md:inline-flex"
          >
            Work with me
          </a>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="press flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-accent-soft md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-3xl border border-border bg-surface shadow-lift md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                      active ? "bg-accent-soft text-accent" : "text-foreground/80 hover:bg-accent-soft/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex items-center gap-2 border-t border-border px-1 pt-3">
                <a
                  href={`mailto:${site.email}`}
                  className="press flex-1 rounded-full bg-foreground px-4 py-3 text-center text-base font-medium text-background"
                >
                  Work with me
                </a>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
