"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { categories, profile, projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { GitHubIcon } from "@/components/icons";
import { LiquidLink } from "@/components/liquid";
import { LiquidCard } from "@/components/liquid-card";
import { ProjectCover } from "@/components/project-cover";
import { useLiquidIndicator } from "@/hooks/use-liquid-indicator";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<ProjectCategory, string>;

function Tools({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tools">
      {tools.map((t) => (
        <li key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  );
}

function RepoLink({ project }: { project: Project }) {
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
    >
      <GitHubIcon className="size-4" />
      View on GitHub
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      <span className="sr-only">: {project.title}</span>
    </a>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
      <span className="text-highlight">{categoryLabel[project.category]}</span>
      <span aria-hidden="true">·</span>
      <span>{project.context}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
    </p>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <LiquidCard className="group grid gap-6 rounded-[1.75rem] p-3 focus-within:ring-3 focus-within:ring-ring/50 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      <ProjectCover project={project} large />
      <div className="flex flex-col gap-4 px-3 pb-4 lg:py-6 lg:pr-6 lg:pl-0">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-highlight-soft px-2.5 py-1 text-xs font-semibold text-highlight">
          <Star className="size-3.5 fill-current" aria-hidden="true" />
          Featured · Thesis
        </span>
        <Meta project={project} />
        <h3 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{project.title}</h3>
        <p className="text-left leading-relaxed hyphens-auto text-muted-foreground sm:text-justify">{project.description}</p>
        {project.extra && (
          <p className="text-sm text-muted-foreground">{project.extra}</p>
        )}
        <Tools tools={project.tools} />
        <div className="mt-auto pt-2">
          <RepoLink project={project} />
        </div>
      </div>
    </LiquidCard>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <LiquidCard className="group flex h-full flex-col gap-5 rounded-[1.75rem] p-3 focus-within:ring-3 focus-within:ring-ring/50">
      <ProjectCover project={project} />
      <div className="flex flex-1 flex-col gap-3 px-3 pb-4">
        <Meta project={project} />
        <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="text-left text-sm leading-relaxed hyphens-auto text-muted-foreground sm:text-justify">{project.description}</p>
        {project.extra && <p className="text-xs text-muted-foreground">{project.extra}</p>}
        <div className="mt-auto flex flex-col gap-4 pt-2">
          <Tools tools={project.tools} />
          <RepoLink project={project} />
        </div>
      </div>
    </LiquidCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.category === f).length);

  const filters: { id: Filter; label: string; short: string }[] = [
    { id: "all", label: "All", short: "All" },
    ...categories.map((c) => ({ id: c.id, label: c.label, short: c.short })),
  ];
  const segRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);
  useLiquidIndicator(segRef, dropRef, "[data-active]", { interactive: true, items: "button" });

  return (
    <>
      <div className="mb-10 flex">
        <div
          ref={segRef}
          role="group"
          aria-label="Filter projects by category"
          className="lg-track glass glass-frosted lens relative flex max-w-full gap-0.5 rounded-full p-1"
        >
          <span
            ref={dropRef}
            aria-hidden="true"
            className="lg-drop glass lens glass-bubble glass-tinted absolute top-1 bottom-1 left-0 rounded-full opacity-0"
            style={{ width: 0 }}
          />
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              data-active={filter === f.id ? "" : undefined}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative z-10 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold sm:gap-2 sm:px-4 whitespace-nowrap transition-colors duration-500 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                filter === f.id ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="sm:hidden">{f.short}</span>
              <span className="hidden sm:inline">{f.label}</span>
              <span className="font-mono text-xs opacity-70">{count(f.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          <div
            key={`${filter}-${p.slug}`}
            suppressHydrationWarning
            className={cn("reveal", p.featured && "md:col-span-2")}
            style={{ "--d": `${(i % 2) * 120}ms` } as CSSProperties}
          >
            {p.featured ? <FeaturedCard project={p} /> : <ProjectCard project={p} />}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <LiquidLink href={profile.github} target="_blank" rel="noopener noreferrer" className="px-5 font-medium">
          <GitHubIcon className="size-4" />
          More on github.com/{profile.githubHandle}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </LiquidLink>
      </div>
    </>
  );
}
