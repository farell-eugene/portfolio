"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useLiquid } from "@/hooks/use-liquid";
import { cn } from "@/lib/utils";

/**
 * Content card with a gentle liquid-glass hover: it leans toward the cursor,
 * swells a touch, a glass sheen follows the pointer and the rim lights up.
 * Pressing gives a soft squish and a jelly release.
 */
export function LiquidCard({ className, children, ...props }: ComponentPropsWithoutRef<"article">) {
  const ref = useRef<HTMLElement>(null);
  useLiquid(ref, { hover: 1.012, press: 0.992, stretch: 0.015, travel: 8, magnet: 0.025 });
  return (
    <article ref={ref} className={cn("liquid-card will-change-[scale,translate]", className)} {...props}>
      {children}
    </article>
  );
}
