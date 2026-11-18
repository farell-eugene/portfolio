import { Award, BookOpen, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/portfolio";
import { IconBubble } from "@/components/icon-bubble";
import { LiquidCard } from "@/components/liquid-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section suppressHydrationWarning id="education" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading index="05" eyebrow="Education" title="Learning" accent="never stops." />
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <LiquidCard className="h-full overflow-hidden rounded-[2rem] p-6 sm:p-8">
            {/* soft theme glow in the corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-[radial-gradient(circle,var(--g2),transparent_65%)] opacity-20"
            />
            <div className="flex items-start gap-4">
              <IconBubble icon={GraduationCap} size="lg" />
              <div>
                <h3 className="text-xl leading-snug font-semibold">{education.school}</h3>
                <p className="mt-1 font-medium text-primary">{education.degree}</p>
                <p className="mt-1 text-sm text-muted-foreground">{education.period}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[auto_1fr]">
              <div className="rounded-[1.25rem] bg-white/[0.03] px-5 py-4 ring-1 ring-border/70">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">GPA</p>
                <p className="mt-1 font-mono text-4xl font-semibold tracking-tight">
                  <span className="text-liquid">3.65</span>
                  <span className="text-base font-normal text-muted-foreground"> / 4.00</span>
                </p>
              </div>
              <div className="flex gap-3 rounded-[1.25rem] bg-white/[0.03] px-5 py-4 ring-1 ring-border/70">
                <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Thesis</p>
                  <p className="mt-1 text-sm leading-relaxed">{education.thesis}</p>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Areas of interest</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {education.interests.map((i) => (
                  <li
                    key={i}
                    className="rounded-full bg-[linear-gradient(135deg,color-mix(in_srgb,var(--g1)_16%,transparent),color-mix(in_srgb,var(--g2)_16%,transparent))] px-3.5 py-1.5 text-sm ring-1 ring-white/10 transition-[box-shadow] duration-500 hover:ring-[color-mix(in_srgb,var(--g2)_55%,transparent)]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </LiquidCard>
        </Reveal>

        <Reveal delay={120}>
          <LiquidCard className="h-full rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <IconBubble icon={Award} size="sm" />
              <h3 className="font-semibold">Certifications</h3>
            </div>
            <ol className="relative mt-6 space-y-1">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="group/cert flex items-start justify-between gap-4 rounded-2xl px-3 py-3 transition-colors duration-500 hover:bg-white/[0.04]"
                >
                  <div className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))] shadow-[0_0_10px_color-mix(in_srgb,var(--g2)_60%,transparent)]"
                    />
                    <div>
                      <p className="text-sm leading-snug font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.issuer}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/[0.04] px-2.5 py-0.5 text-xs text-muted-foreground tabular ring-1 ring-border/60">
                    {c.date}
                  </span>
                </li>
              ))}
            </ol>
          </LiquidCard>
        </Reveal>
      </div>
    </section>
  );
}
