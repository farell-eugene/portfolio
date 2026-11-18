import Image from "next/image";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

/** A tool's logo (or brand-coloured monogram), sized for chips. */
export function ToolLogo({
  tool,
  size = 24,
  className,
  eager = false,
}: {
  tool: Tool;
  size?: number;
  className?: string;
  /** load immediately (moving marquee: lazy loading would pop in late) */
  eager?: boolean;
}) {
  if (tool.mono) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-flex shrink-0 items-center justify-center rounded-md font-mono font-bold tracking-tight", className)}
        style={{
          width: size,
          height: size,
          background: tool.mono.bg,
          color: tool.mono.fg,
          fontSize: size * (tool.mono.text.length > 2 ? 0.34 : 0.44),
        }}
      >
        {tool.mono.text}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        tool.lightTile && "rounded-full bg-white p-[3px] shadow-sm",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={tool.logo!}
        alt=""
        width={size}
        height={size}
        unoptimized
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
