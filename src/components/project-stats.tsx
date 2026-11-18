import { projectStats } from "@/data/portfolio";
import { CountUp } from "@/components/count-up";
import { LiquidCard } from "@/components/liquid-card";
import { Reveal } from "@/components/reveal";

/** Headline numbers across the projects, shown at the top of the Projects section. */
export function ProjectStats() {
  return (
    <dl className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {projectStats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90}>
          <LiquidCard className="flex h-full flex-col-reverse justify-end overflow-hidden rounded-[1.5rem] px-5 py-5 sm:px-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-[radial-gradient(circle,var(--g2),transparent_70%)] opacity-15"
            />
            <dt className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</dt>
            <dd className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
              {s.prefix && <span className="mr-1.5 align-top text-sm font-normal text-muted-foreground">{s.prefix}</span>}
              <span className="text-liquid">
                <CountUp value={s.value} delay={200 + i * 90} />
              </span>
            </dd>
          </LiquidCard>
        </Reveal>
      ))}
    </dl>
  );
}
