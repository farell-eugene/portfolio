import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades + rises content in when it scrolls into view.
 * The observer lives in <MotionRoot/>; this is a plain server component.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  effect = "reveal",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "p" | "span" | "dl" | "ul";
  effect?: "reveal" | "pop" | "unveil";
}) {
  return (
    <Tag suppressHydrationWarning className={cn(effect, className)} style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
