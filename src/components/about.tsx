import { Briefcase, GraduationCap, Languages, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import { about } from "@/data/portfolio";
import { IconBubble } from "@/components/icon-bubble";
import { LiquidCard } from "@/components/liquid-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const factIcons: Record<string, LucideIcon> = {
  "Based in": MapPin,
  Currently: Briefcase,
  Studying: GraduationCap,
  Languages: Languages,
  "Open to": Sparkles,
};
/** bento order: long values span the full width so the grid has no gaps */
const factOrder = ["Open to", "Currently", "Based in", "Languages", "Studying"];
const wideFacts = new Set(["Open to", "Currently", "Studying"]);

function Chip({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "highlight" }) {
  return (
    <span
      className={
        tone === "primary"
          ? "rounded-md bg-primary-soft px-1.5 py-0.5 font-medium text-primary [box-decoration-break:clone]"
          : "rounded-md bg-highlight-soft px-1.5 py-0.5 font-medium text-highlight [box-decoration-break:clone]"
      }
    >
      {children}
    </span>
  );
}

/** Plain emphasis for numbers and names (no chip, so the paragraph doesn't get crowded). */
function Strong({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>;
}

export function About() {
  return (
    <section suppressHydrationWarning id="about" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading index="01" eyebrow="About" title="Curious about data," accent="driven by decisions." />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-justify text-lg leading-relaxed text-pretty hyphens-auto text-muted-foreground">
          {/* Same wording as about.paragraphs in src/data/portfolio.ts, with the key terms highlighted:
              primary chips = data science / ML / AI, highlight chips = BI tools, bold = numbers & names */}
          <p>
            I study <Strong>Information Systems</Strong> at Universitas Multimedia Nusantara, and most of my work sits
            somewhere between <Chip>data science</Chip>, <Chip>machine learning</Chip>, <Chip>deep learning</Chip>,{" "}
            <Chip>AI</Chip> and <Chip tone="highlight">business intelligence</Chip>. I like the messy start of a problem:
            a spreadsheet nobody fully trusts, or a manual task that eats a whole afternoon. I figure out what the data
            is saying, then build something people can actually use. At Adaro, that meant a <Chip>Python</Chip> script
            that cut contract processing time by <Strong>70%</Strong>.
          </p>
          <p>
            My thesis predicts <Chip>customer lifetime value</Chip> with a <Chip>stacking ensemble</Chip>. Along the way
            I&apos;ve classified cloud photos with a <Chip>CNN</Chip>, analyzed a rural bank&apos;s financial ratios,
            built dashboards in <Chip tone="highlight">Tableau</Chip>, <Chip tone="highlight">Power BI</Chip> and{" "}
            <Chip tone="highlight">SAS Viya</Chip>, and put together a small <Chip tone="highlight">data warehouse</Chip>{" "}
            in Pentaho. I&apos;m also drawn to <Chip>artificial intelligence</Chip> and <Chip>deep learning</Chip>, and
            I&apos;d like to grow into <Chip>AI engineering</Chip>, building on the CNN work I&apos;ve done so far.
            Outside class I spend a lot of time organizing things. As supervisor of <Strong>ISFEST 2025</Strong> I worked
            with a committee of <Strong>more than 140 people</Strong>, and that&apos;s where I learned to explain things
            clearly and keep a big team on schedule.
          </p>
        </Reveal>

        <dl className="grid grid-cols-1 gap-3 self-start sm:grid-cols-2">
          {factOrder
            .map((label) => about.facts.find((f) => f.label === label))
            .filter((f): f is (typeof about.facts)[number] => !!f)
            .map((f, i) => {
            const Icon = factIcons[f.label] ?? MapPin;
            return (
              <Reveal key={f.label} delay={120 + i * 90} className={wideFacts.has(f.label) ? "sm:col-span-2" : ""}>
                <LiquidCard className="flex h-full items-start gap-4 rounded-[1.5rem] p-4 sm:p-5">
                  <IconBubble icon={Icon} />
                  <div className="min-w-0">
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{f.label}</dt>
                    <dd className="mt-1 text-[15px] leading-snug font-semibold">{f.value}</dd>
                  </div>
                </LiquidCard>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
