"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useLiquid } from "@/hooks/use-liquid";
import { createSpring, springs } from "@/lib/spring";
import { cn } from "@/lib/utils";

type BubbleSpec = {
  label: string;
  /** position inside the photo card's box, in % */
  x: number;
  y: number;
  size: number;
  tone?: "clear" | "blue" | "amber" | "violet";
  bob: number;
  delay: number;
  hideOnMobile?: boolean;
};

const bubbles: BubbleSpec[] = [
  { label: "Python", x: -10, y: 14, size: 84, tone: "blue", bob: 6.5, delay: 0 },
  { label: "ML", x: 34, y: -9, size: 60, tone: "clear", bob: 7, delay: 1.2 },
  { label: "AI", x: 64, y: -6, size: 66, tone: "violet", bob: 7.8, delay: 2.4 },
  { label: "SQL", x: 88, y: 22, size: 66, tone: "clear", bob: 7.5, delay: 0.8 },
  { label: "Power BI", x: 90, y: 56, size: 80, tone: "amber", bob: 6, delay: 1.6, hideOnMobile: true },
  { label: "Tableau", x: -16, y: 50, size: 74, tone: "violet", bob: 8, delay: 0.4, hideOnMobile: true },
  { label: "SAS", x: 74, y: 90, size: 56, tone: "clear", bob: 6.8, delay: 2, hideOnMobile: true },
];

const tones = {
  clear: "",
  blue: "glass-tint-1",
  amber: "glass-tint-2",
  violet: "glass-tint-3",
};

function Bubble({ spec, index }: { spec: BubbleSpec; index: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useLiquid(inner, { hover: 1.08, press: 1.16, stretch: 0.22, travel: 46 });

  // drift away from the cursor, then spring back
  useEffect(() => {
    const el = outer.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const p = { x: 0, y: 0 };
    const apply = () => (el.style.translate = `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`);
    const sx = createSpring(0, springs.float, (v) => ((p.x = v), apply()));
    const sy = createSpring(0, springs.float, (v) => ((p.y = v), apply()));
    let raf = 0;
    let mx = 0;
    let my = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - p.x;
      const cy = r.top + r.height / 2 - p.y;
      const dx = cx - mx;
      const dy = cy - my;
      const d = Math.hypot(dx, dy) || 1;
      const radius = 170;
      const push = d < radius ? (1 - d / radius) * 34 : 0;
      sx.to((dx / d) * push, springs.float);
      sy.to((dy / d) * push, springs.float);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(compute);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      sx.stop();
      sy.stop();
    };
  }, []);

  return (
    <div
      className={cn("pop absolute z-10", spec.hideOnMobile && "hidden sm:block")}
      style={
        {
          left: `${spec.x}%`,
          top: `${spec.y}%`,
          "--d": `${900 + index * 110}ms`,
        } as CSSProperties
      }
      suppressHydrationWarning
    >
      <div ref={outer}>
      <div className="bob" style={{ animationDuration: `${spec.bob}s`, animationDelay: `-${spec.delay}s` }}>
        <div
          ref={inner}
          className={cn(
            "glass glass-bubble glass-label flex cursor-grab touch-none items-center justify-center rounded-full text-center text-[13px] font-bold tracking-tight select-none active:cursor-grabbing",
            tones[spec.tone ?? "clear"],
          )}
          style={{ width: spec.size, height: spec.size }}
        >
          <span className="relative px-2 leading-tight">{spec.label}</span>
        </div>
      </div>
      </div>
    </div>
  );
}

/** Draggable glass bubbles floating around the profile card. Decorative only. */
export function FloatingBubbles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [&_.glass]:pointer-events-auto">
      {bubbles.map((b, i) => (
        <Bubble key={b.label} spec={b} index={i} />
      ))}
    </div>
  );
}
