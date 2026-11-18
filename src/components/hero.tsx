import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FloatingBubbles } from "@/components/floating-bubbles";
import { LiquidLink } from "@/components/liquid";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { RotatingWord } from "@/components/rotating-word";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section suppressHydrationWarning id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <Reveal effect="pop" delay={100}>
            <p className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Hi, I&apos;m
            </p>
          </Reveal>

          <h1 suppressHydrationWarning className="split text-[clamp(3.5rem,11vw,7rem)] leading-[0.92] font-extrabold tracking-[-0.035em]" style={d(150)}>
            <span className="split-mask">
              <span className="split-item" style={{ "--i": 0 } as CSSProperties}>
                {profile.firstName}
              </span>
            </span>
            <br />
            <span className="split-mask pr-[0.08em]">
              <span className="split-item text-liquid font-serif font-normal tracking-normal" style={{ "--i": 1.5 } as CSSProperties}>
                {profile.lastName}
                <span className="text-highlight">.</span>
              </span>
            </span>
          </h1>

          <Reveal delay={450}>
            <p className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">
              <RotatingWord words={["Data Analyst", "AI Engineer", "Machine Learning", "Business Intelligence"]} />
            </p>
          </Reveal>
          <Reveal delay={550}>
            <p className="mt-4 max-w-lg text-justify text-lg leading-relaxed hyphens-auto text-muted-foreground">
              I&apos;m an Information Systems student who likes turning messy business{" "}
              <span className="font-medium text-foreground">data</span> into{" "}
              <span className="font-medium text-foreground">models</span> and{" "}
              <span className="font-medium text-foreground">dashboards</span> that people actually use to make
              decisions.
            </p>
          </Reveal>

          <Reveal delay={650} className="mt-10 flex flex-wrap items-center gap-3">
            <LiquidLink href="#projects" variant="tinted" lens className="group px-6">
              View projects
              <ArrowDown className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-y-0.5" aria-hidden="true" />
            </LiquidLink>
            <LiquidLink href={profile.cv} download lens className="px-6">
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </LiquidLink>
            <LiquidLink
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              size="icon-lg"
              lens
              liquid={{ press: 1.18 }}
            >
              <GitHubIcon className="size-5" />
            </LiquidLink>
            <LiquidLink
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              size="icon-lg"
              lens
              liquid={{ press: 1.18 }}
            >
              <LinkedInIcon className="size-5" />
            </LiquidLink>
            <LiquidLink
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.name}`}
              title={profile.email}
              size="icon-lg"
              lens
              liquid={{ press: 1.18 }}
            >
              <Mail className="size-5" aria-hidden="true" />
            </LiquidLink>
          </Reveal>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}

/** Profile photo card. Shows initials until profile.photo is set in src/data/portfolio.ts. */
function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-none">
      <div
        suppressHydrationWarning
        className="unveil relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[7rem] bg-gradient-to-br from-primary-soft via-card to-highlight-soft ring-1 ring-border"
        style={d(300)}
      >
        <div className="settle absolute inset-0">
          {profile.photo ? (
            <>
              {/* The subject stands at ~28% from the left of the original photo,
                  so the image is drawn 185% wide and shifted to put him in the centre. */}
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={1125}
                height={2000}
                priority
                sizes="(min-width: 1024px) 75vw, 170vw"
                className="absolute top-[-95%] left-[-2%] h-auto w-[185%] max-w-none"
              />
              {/* soft theme tint + bottom fade so the floating chips stay readable */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(135deg,var(--g1),var(--g2))] opacity-20 mix-blend-soft-light"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
              <span className="relative font-serif text-[9rem] leading-none text-primary/80" aria-hidden="true">
                {profile.initials}
              </span>
              <span className="sr-only">Profile photo placeholder</span>
            </div>
          )}
        </div>
      </div>

      <Reveal
        effect="pop"
        delay={1100}
        className="absolute -bottom-6 -left-2 z-20 sm:-left-6"
      >
        <div className="glass glass-frosted rounded-[1.25rem] px-4 py-3">
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Currently</p>
        <p className="text-sm font-semibold leading-snug">Marketing Data Analyst Intern</p>
        <p className="text-xs text-muted-foreground">PT Adaro Andalan Indonesia</p>
        </div>
      </Reveal>

      <Reveal
        effect="pop"
        delay={1250}
        className="absolute top-5 left-5 z-20"
      >
        <span className="glass glass-label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
          <MapPin className="size-3.5 text-highlight" aria-hidden="true" />
          {profile.location}
        </span>
      </Reveal>

      <FloatingBubbles />

      <Reveal delay={1350} className="mt-12 hidden justify-end lg:flex">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Explore my GitHub
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  );
}
