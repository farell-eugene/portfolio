import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const frames: Record<Project["category"], string> = {
  ml: "frame-ml",
  bi: "frame-bi",
  desktop: "frame-desktop",
};

/** Small deterministic pseudo-random series so each card gets a stable chart. */
function series(seed: string, n: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(0.25 + ((h >>> 8) % 1000) / 1000 * 0.7);
  }
  return out;
}

function MiniChart({ type, seed, tall = false }: { type: Project["chart"]; seed: string; tall?: boolean }) {
  const w = 220;
  const h = tall ? 130 : 72;
  const cls = "text-primary";

  if (type === "bars") {
    const d = series(seed, 9);
    const bw = w / d.length - 6;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-full w-full", cls)} aria-hidden="true" preserveAspectRatio="none">
        {d.map((v, i) => (
          <rect
            key={i}
            x={i * (bw + 6) + 3}
            y={h - v * h}
            width={bw}
            height={v * h}
            rx={2}
            className={i === d.indexOf(Math.max(...d)) ? "fill-highlight" : "fill-current opacity-70"}
          />
        ))}
      </svg>
    );
  }

  if (type === "line") {
    const d = series(seed, 12);
    const pts = d.map((v, i) => `${(i / (d.length - 1)) * w},${h - v * (h - 8) - 4}`).join(" ");
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-full w-full", cls)} aria-hidden="true" preserveAspectRatio="none">
        <polyline points={`0,${h} ${pts} ${w},${h}`} className="fill-current opacity-15" stroke="none" />
        <polyline points={pts} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }

  if (type === "scatter") {
    const a = series(seed, 28);
    const b = series(seed + "y", 28);
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-full w-full", cls)} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {a.map((v, i) => {
          const cluster = i % 2 === 0;
          const x = cluster ? v * w * 0.45 + 8 : w * 0.5 + v * w * 0.45;
          const y = cluster ? h - b[i] * h * 0.5 - 6 : b[i] * h * 0.55 + 4;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={tall ? 4 : 3.2}
              className={cluster ? "fill-current opacity-75" : "fill-highlight opacity-90"}
            />
          );
        })}
      </svg>
    );
  }

  // grid: table / heatmap motif (data warehouse, image dataset, database apps)
  const d = series(seed, 24);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-full w-full", cls)} aria-hidden="true" preserveAspectRatio="none">
      {d.map((v, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return (
          <rect
            key={i}
            x={col * (w / 8) + 2}
            y={row * (h / 3) + 2}
            width={w / 8 - 4}
            height={h / 3 - 4}
            rx={3}
            className="fill-current"
            opacity={0.15 + v * 0.7}
          />
        );
      })}
    </svg>
  );
}

/**
 * Card cover. Renders a screenshot when project.image is set,
 * otherwise a mini "dashboard" showing the key result.
 */
export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={cn(
        // thin glossy bezel: 6–8px of accent gradient around the window
        "cover-frame relative overflow-hidden rounded-[1.35rem] p-1.5 sm:p-2",
        frames[project.category],
        large ? "aspect-[16/11] lg:aspect-auto lg:h-full" : "aspect-[16/10]",
      )}
    >
      {project.image ? (
        <div className="relative h-full overflow-hidden rounded-[1rem] ring-1 ring-white/10">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-[scale] duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="cover-window relative flex h-full flex-col rounded-[1rem] p-4 transition-[translate,scale] duration-700 ease-smooth group-hover:scale-[1.01] sm:p-5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
              {project.repo.split("/").pop()}
            </span>
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-between gap-3">
            <div>
              <p className={cn("tabular font-mono font-semibold tracking-tight text-foreground", large ? "text-3xl sm:text-4xl" : "text-2xl")}>
                {project.result.value}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{project.result.label}</p>
            </div>
            <div className={large ? "flex min-h-28 flex-1 items-center sm:min-h-36" : "h-12 sm:h-14"}>
              <MiniChart type={project.chart} seed={project.slug} tall={large} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
