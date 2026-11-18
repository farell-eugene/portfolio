import { BarChart3, Brain, Code2, Database, Users, Workflow } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { toolFor } from "@/data/tools";
import { IconBubble } from "@/components/icon-bubble";
import { LiquidCard } from "@/components/liquid-card";
import { ToolLogo } from "@/components/tool-logo";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const icons = {
  brain: Brain,
  database: Database,
  chart: BarChart3,
  workflow: Workflow,
  code: Code2,
  users: Users,
} as const;

export function Skills() {
  return (
    <section suppressHydrationWarning id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="The toolkit"
        accent="behind the numbers."
        description="The tools I actually reach for, whether it's for work, a class or a side project."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon];
          return (
            <Reveal as="li" key={g.title} delay={(i % 2) * 90}>
              <LiquidCard className="h-full rounded-[1.75rem] p-6">
                <div className="flex items-center gap-4">
                  <IconBubble icon={Icon} />
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => {
                    const tool = toolFor(s);
                    return (
                      <li
                        key={s}
                        className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] py-1.5 pr-3.5 pl-2.5 text-sm ring-1 ring-border/70 transition-[box-shadow,color] duration-500 hover:text-foreground hover:ring-[color-mix(in_srgb,var(--g2)_55%,transparent)]"
                      >
                        {tool && <ToolLogo tool={tool} size={18} />}
                        {s}
                      </li>
                    );
                  })}
                </ul>
              </LiquidCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
