import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits text into words that rise out of a mask when scrolled into view.
 * Screen readers get the plain text via aria-label.
 */
export function SplitText({
  text,
  className,
  itemClassName,
  delay = 0,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  itemClassName?: string;
  delay?: number;
  startIndex?: number;
}) {
  const words = text.split(" ");
  return (
    <span
      suppressHydrationWarning
      className={cn("split", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
      aria-label={text}
      role="text"
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="split-mask">
            <span className={cn("split-item", itemClassName)} style={{ "--i": i + startIndex } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
