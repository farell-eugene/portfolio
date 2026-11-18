"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Briefcase, Users } from "lucide-react";
import { organizations, work, type ExperienceItem } from "@/data/portfolio";
import { LiquidCard } from "@/components/liquid-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

type Entry = ExperienceItem & { kind: "work" | "org" };

const entries: Entry[] = [
  ...work.map((w) => ({ ...w, kind: "work" as const })),
  ...organizations.map((o) => ({ ...o, kind: "org" as const })),
];

function DateBlock({ item, align }: { item: Entry; align: "left" | "right" }) {
  const Icon = item.kind === "work" ? Briefcase : Users;
  return (
    <div className={cn("tl-date", align === "right" ? "lg:text-right" : "lg:text-left")}>
      <p className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">{item.period}</p>
      <p
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
          align === "right" && "lg:flex-row-reverse",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
        {item.kind === "work" ? "Work experience" : "Leadership"}
        {item.current && (
          <span className="rounded-full bg-highlight-soft px-2 py-0.5 text-xs font-semibold text-highlight">Now</span>
        )}
      </p>
    </div>
  );
}

function Card({ item }: { item: Entry }) {
  return (
    <LiquidCard className="rounded-[1.75rem] p-5 sm:p-7">
      <h3 className="text-xl font-semibold leading-snug">{item.role}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{item.org}</p>

      {item.highlight && (
        <p className="mt-4 flex items-baseline gap-2">
          <span className="text-liquid font-mono text-2xl font-semibold tracking-tight">{item.highlight.value}</span>
          <span className="text-sm text-muted-foreground">{item.highlight.label}</span>
        </p>
      )}

      <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground">
        {item.points.map((p) => (
          <li key={p} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-muted-foreground/50" />
            <span className="text-left hyphens-auto sm:text-justify">{p}</span>
          </li>
        ))}
      </ul>

      {item.tags && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <li key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      )}
    </LiquidCard>
  );
}

/**
 * Centre-line timeline (side line on mobile). The line fills with the theme
 * gradient as you scroll, and each node lights up when the fill reaches it.
 */
export function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = wrap.current;
    if (!box) return;
    const rows = Array.from(box.querySelectorAll<HTMLElement>(".tl-row"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const line = window.innerHeight * 0.55; // the "reading line" on screen
      const reached = Math.min(Math.max(line - r.top, 0), r.height);
      if (fill.current) fill.current.style.transform = `scaleY(${r.height ? reached / r.height : 0})`;
      if (head.current) {
        head.current.style.transform = `translate(-50%, ${reached}px)`;
        head.current.style.opacity = reached > 0 && reached < r.height ? "1" : "0";
      }
      for (const row of rows) {
        const node = row.querySelector<HTMLElement>(".tl-node");
        if (!node) continue;
        const y = node.getBoundingClientRect().top + node.offsetHeight / 2 - r.top;
        const on = reached >= y;
        row.toggleAttribute("data-active", on);
        node.toggleAttribute("data-active", on);
      }
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
    <section suppressHydrationWarning id="experience" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've applied"
        accent="the work."
        description="Two companies where I worked with real business data, and the student organizations where I learned to lead a team."
      />

      <div ref={wrap} className="relative">
        {/* track + gradient fill + glowing head */}
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[11px] w-0.5 rounded-full bg-border lg:left-1/2 lg:-translate-x-1/2">
          <div ref={fill} className="tl-fill absolute inset-0 rounded-full" style={{ transform: "scaleY(0)" }} />
        </div>
        <div
          ref={head}
          aria-hidden="true"
          className="tl-head pointer-events-none absolute top-0 left-[12px] size-4 rounded-full opacity-0 lg:left-1/2"
          style={{ transform: "translate(-50%, 0)" }}
        />

        <ol className="space-y-16 lg:space-y-24">
          {entries.map((item, i) => {
            const cardLeft = i % 2 === 1;
            return (
              <li
                key={item.org + item.role}
                className="tl-row reveal relative grid gap-5 pl-10 lg:grid-cols-[1fr_4rem_1fr] lg:items-center lg:gap-0 lg:pl-0"
                style={{ "--d": "80ms" } as CSSProperties}
                suppressHydrationWarning
              >
                {/* node */}
                <span
                  aria-hidden="true"
                  className="tl-node absolute top-2 left-[3px] size-[18px] rounded-full lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto"
                />
                <div className={cn("lg:row-start-1", cardLeft ? "lg:col-start-3 lg:pl-10" : "lg:col-start-1 lg:pr-10")}>
                  <DateBlock item={item} align={cardLeft ? "left" : "right"} />
                </div>
                <div className={cn("lg:row-start-1", cardLeft ? "lg:col-start-1" : "lg:col-start-3")}>
                  <Card item={item} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
