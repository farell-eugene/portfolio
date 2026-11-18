import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { LiquidLink } from "@/components/liquid";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubHandle, href: profile.github, icon: GitHubIcon, external: true },
];

export function Contact() {
  return (
    <section suppressHydrationWarning id="contact" className="px-4 pt-8 pb-24 sm:px-6 sm:pb-32">
      <Reveal className="dark relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-background px-6 py-14 text-foreground shadow-2xl shadow-black/40 ring-1 ring-border sm:px-12 sm:py-20">
        {/* colour inside the card for the glass rows to refract */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="orb absolute -top-24 -left-20 size-[28rem] bg-[radial-gradient(circle,var(--orb-1),transparent_65%)] opacity-60" />
          <div className="orb absolute -right-24 -bottom-32 size-[30rem] bg-[radial-gradient(circle,var(--orb-2),transparent_65%)] opacity-50 [animation-delay:-9s]" />
          <div className="orb absolute top-10 right-1/3 size-60 bg-[radial-gradient(circle,var(--orb-3),transparent_65%)] opacity-40 [animation-delay:-15s]" />
          <div className="bg-grid absolute inset-0 opacity-40" />
        </div>
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-medium opacity-70">06 · Let&apos;s connect</p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl">
              <SplitText text="Let's turn your data into" delay={200} />{" "}
              <SplitText
                text="decisions."
                delay={200}
                startIndex={5}
                itemClassName="font-serif font-normal tracking-normal text-liquid"
              />
            </h2>
            <p className="mt-5 max-w-md text-justify leading-relaxed hyphens-auto opacity-75">
              I&apos;m looking for my next role in data analytics, data science, AI engineering or business
              intelligence, and I&apos;m always happy to talk about a project. Email or LinkedIn is the quickest way to reach me.
            </p>
            <LiquidLink href={profile.cv} download variant="tinted" className="mt-8 px-6">
              <Download className="size-4" aria-hidden="true" />
              Download CV (PDF)
            </LiquidLink>
          </div>

          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <LiquidLink
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  liquid={{ hover: 1.02, press: 1.04, stretch: 0.06, travel: 14 }}
                  className="group h-auto w-full justify-start gap-4 rounded-[1.25rem] px-5 py-4 text-left font-normal whitespace-normal"
                >
                  <l.icon className="size-5 shrink-0 opacity-80" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs opacity-60">{l.label}</span>
                    <span className="block font-medium break-all">{l.value}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 opacity-60 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </LiquidLink>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
