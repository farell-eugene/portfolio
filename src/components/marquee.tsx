import { toolRows } from "@/data/tools";
import { ToolLogo } from "@/components/tool-logo";
import { cn } from "@/lib/utils";

function Row({ items, reverse }: { items: (typeof toolRows)[number]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <ul
      className={cn(
        "flex w-max gap-3 py-1.5 group-hover:[animation-play-state:paused] sm:gap-4",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {loop.map((tool, i) => (
        <li
          key={`${tool.name}-${i}`}
          aria-hidden={i >= items.length ? "true" : undefined}
          className="tool-chip flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-2.5 sm:px-5 sm:py-3"
        >
          <ToolLogo tool={tool} size={26} eager />
          <span className="text-sm font-semibold whitespace-nowrap sm:text-[15px]">{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two rows of tool logos drifting in opposite directions. Pauses on hover. */
export function ToolMarquee() {
  return (
    <section suppressHydrationWarning aria-label="Tools I work with" className="relative border-y bg-card/40 py-6 sm:py-8">
      <div className="group flex flex-col gap-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:gap-3">
        <Row items={toolRows[0]} />
        <Row items={toolRows[1]} reverse />
      </div>
    </section>
  );
}
