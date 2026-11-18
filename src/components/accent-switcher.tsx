"use client";

import { useRef, useSyncExternalStore } from "react";
import { useLiquidIndicator } from "@/hooks/use-liquid-indicator";
import { cn } from "@/lib/utils";

export type Accent = "warm" | "blue";

const options: { value: Accent; label: string; swatch: string }[] = [
  { value: "warm", label: "Warm", swatch: "bg-[linear-gradient(135deg,#fb923c,#dc2626_60%,#ec4899)]" },
  { value: "blue", label: "Blue", swatch: "bg-[linear-gradient(135deg,#60a5fa,#8b5cf6)]" },
];

/* The accent lives on <html data-accent>, set before first paint by the
   inline script in layout.tsx. Every switcher instance subscribes to it. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] });
  return () => mo.disconnect();
}
const getAccent = (): Accent => (document.documentElement.getAttribute("data-accent") === "blue" ? "blue" : "warm");
const getServerAccent = (): Accent | null => null;

export function setAccent(a: Accent) {
  document.documentElement.setAttribute("data-accent", a);
  try {
    localStorage.setItem("accent", a);
  } catch {}
}

/**
 * Lets visitors pick the accent palette (Warm or Blue).
 * compact: two colour swatches for the navbar · full: labelled, for the mobile menu.
 */
export function AccentSwitcher({ variant = "compact", className }: { variant?: "compact" | "full"; className?: string }) {
  const accent = useSyncExternalStore(subscribe, getAccent, getServerAccent);
  const box = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLSpanElement>(null);
  useLiquidIndicator(box, drop, accent ? `[data-value="${accent}"]` : null, { interactive: true, items: "button" });
  const compact = variant === "compact";

  return (
    <div
      ref={box}
      role="radiogroup"
      aria-label="Accent colour"
      className={cn("lg-track glass lens relative flex items-center rounded-full p-1", compact ? "gap-0.5" : "gap-1", className)}
    >
      <span
        ref={drop}
        aria-hidden="true"
        className="lg-drop glass lens glass-bubble absolute top-1 bottom-1 left-0 rounded-full opacity-0"
        style={{ width: 0 }}
      />
      {options.map((o) => {
        const selected = accent === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={compact ? `${o.label} accent` : undefined}
            title={compact ? `${o.label} accent` : undefined}
            data-value={o.value}
            onClick={() => setAccent(o.value)}
            className={cn(
              "relative z-10 inline-flex items-center justify-center rounded-full transition-colors duration-500 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
              compact ? "size-8" : "h-10 flex-1 gap-2 px-4 text-sm font-semibold",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "rounded-full ring-1 ring-white/50 transition-transform duration-500 ease-smooth",
                compact ? "size-4" : "size-3.5",
                selected ? "scale-110" : "scale-90 opacity-70",
                o.swatch,
              )}
            />
            {!compact && o.label}
          </button>
        );
      })}
    </div>
  );
}
