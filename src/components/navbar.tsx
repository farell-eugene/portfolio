"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { AccentSwitcher } from "@/components/accent-switcher";
import { LiquidButton, LiquidLink } from "@/components/liquid";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLiquidIndicator } from "@/hooks/use-liquid-indicator";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);

  useLiquidIndicator(listRef, dropRef, active ? `a[href="${active}"]` : null, { interactive: true, items: "a" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const hero = document.querySelector("#top");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (hero) heroIo.observe(hero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "glass glass-frosted nav-glass lens mx-auto flex h-14 items-center justify-between rounded-full px-2 pl-5 transition-[max-width] duration-700 ease-smooth",
          scrolled || open ? "max-w-4xl" : "max-w-6xl",
        )}
      >
        <a href="#top" className="relative shrink-0 font-mono text-sm font-semibold tracking-tight whitespace-nowrap" aria-label="Farell Eugene, back to top">
          Farell Eugene
        </a>

        <ul ref={listRef} className="lg-track relative hidden items-center lg:flex">
          {/* liquid droplet that glides to the active link */}
          <span
            ref={dropRef}
            aria-hidden="true"
            className="lg-drop glass lens glass-bubble glass-tinted absolute top-0 left-0 h-full rounded-full opacity-0"
            style={{ width: 0 }}
          />
          {navLinks.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={cn(
                  "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-500",
                  active === l.href ? "font-semibold text-white" : "text-foreground/85 hover:text-foreground",
                  "dark:[text-shadow:0_1px_2px_rgb(0_0_0/0.45)]",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative flex items-center gap-1.5">
          <AccentSwitcher />
          <ThemeToggle />
          <LiquidLink href={profile.cv} download variant="tinted" size="md" lens className="hidden sm:inline-flex">
            <Download className="size-4" aria-hidden="true" />
            CV
          </LiquidLink>
          <LiquidButton
            size="icon"
            lens
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </LiquidButton>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="glass glass-frosted mx-auto mt-2 max-w-4xl origin-top animate-in rounded-[1.75rem] p-2 duration-500 ease-smooth fade-in zoom-in-95 slide-in-from-top-3 lg:hidden"
      >
        <ul className="relative flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-white/30 dark:hover:bg-white/10",
                  active === l.href &&
                    "bg-[linear-gradient(120deg,var(--tint-a),var(--tint-b))] font-semibold text-white shadow-[0_8px_20px_-10px_rgb(var(--tint-glow)/0.7)] hover:bg-[linear-gradient(120deg,var(--tint-a),var(--tint-b))]",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-1 flex items-center justify-between gap-3 px-4 py-2">
            <span className="text-sm font-medium text-muted-foreground">Accent colour</span>
            <AccentSwitcher variant="full" className="w-48" />
          </li>
          <li className="mt-1">
            <LiquidLink
              href={profile.cv}
              download
              variant="tinted"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </LiquidLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
