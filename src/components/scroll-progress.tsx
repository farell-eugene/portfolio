"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { LiquidLink } from "@/components/liquid";
import { cn } from "@/lib/utils";

/** Thin reading-progress bar at the top plus a back-to-top button. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 900);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-[var(--g1)] via-[var(--g2)] to-[var(--g3)]" />
      </div>
      <div
        className={cn(
          "fixed right-5 bottom-5 z-50 transition-[opacity,transform] duration-700 ease-smooth",
          showTop ? "opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0",
        )}
      >
        <LiquidLink href="#top" aria-label="Back to top" tabIndex={showTop ? 0 : -1} size="icon-lg" liquid={{ press: 1.2 }}>
          <ArrowUp className="size-5" aria-hidden="true" />
        </LiquidLink>
      </div>
    </>
  );
}
