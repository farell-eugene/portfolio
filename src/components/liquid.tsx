"use client";

import { forwardRef, useImperativeHandle, useRef, type ComponentPropsWithoutRef } from "react";
import { useLiquid, type LiquidOptions } from "@/hooks/use-liquid";
import { cn } from "@/lib/utils";

type Variant = "clear" | "tinted" | "amber";
type Size = "md" | "lg" | "icon" | "icon-lg";

const variants: Record<Variant, string> = {
  clear: "glass text-foreground",
  tinted: "glass glass-tinted text-white",
  amber: "glass glass-amber text-[#1f1300]",
};

const sizes: Record<Size, string> = {
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-sm",
  icon: "size-10",
  "icon-lg": "size-12",
};

export const liquidBase =
  "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap select-none outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3 focus-visible:ring-ring/60 will-change-[scale,translate]";

type LinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  liquid?: LiquidOptions;
  /** use the SVG lens refraction (key controls only, it is GPU-heavy) */
  lens?: boolean;
};

/** Anchor styled as an iOS liquid-glass bubble. */
export const LiquidLink = forwardRef<HTMLAnchorElement, LinkProps>(function LiquidLink(
  { variant = "clear", size = "lg", liquid, lens = false, className, children, ...props },
  forwarded,
) {
  const ref = useRef<HTMLAnchorElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLAnchorElement);
  useLiquid(ref, liquid);
  return (
    <a ref={ref} className={cn(liquidBase, variants[variant], sizes[size], lens && "lens", className)} {...props}>
      {children}
    </a>
  );
});

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
  liquid?: LiquidOptions;
  /** use the SVG lens refraction (key controls only, it is GPU-heavy) */
  lens?: boolean;
};

/** Button styled as an iOS liquid-glass bubble. */
export const LiquidButton = forwardRef<HTMLButtonElement, ButtonProps>(function LiquidButton(
  { variant = "clear", size = "lg", liquid, lens = false, className, children, type = "button", ...props },
  forwarded,
) {
  const ref = useRef<HTMLButtonElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLButtonElement);
  useLiquid(ref, liquid);
  return (
    <button ref={ref} type={type} className={cn(liquidBase, variants[variant], sizes[size], lens && "lens", className)} {...props}>
      {children}
    </button>
  );
});
