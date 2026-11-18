"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .split, .unveil, .pop, .grow-x, .grow-y";

/**
 * One shared IntersectionObserver for every animated element on the page.
 * Adds .is-in once an element enters the viewport (animations play once).
 * New elements (e.g. after filtering projects) are picked up automatically.
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.remove("motion");
      return;
    }
    root.classList.add("motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
    );

    // Tracked in memory (not a DOM attribute) so hydration isn't disturbed and
    // a re-run of this effect (React dev double-invoke) re-observes everything.
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-in") && !seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Performance: pause every CSS animation inside a section while it is off screen
  // (logo strip, floating bubbles, gradient text...). They resume as soon as it scrolls back.
  useEffect(() => {
    const vis = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    document.querySelectorAll("main section, footer").forEach((s) => vis.observe(s));
    return () => vis.disconnect();
  }, []);

  return null;
}

