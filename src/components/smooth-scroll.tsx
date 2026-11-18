"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Inertia smooth scrolling (Lenis). Off for reduced motion; anchors glide with the navbar offset. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: { offset: -88, duration: 1.4 },
      autoRaf: true,
    });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
