import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ToolMarquee } from "@/components/marquee";
import { Navbar } from "@/components/navbar";
import { ProjectStats } from "@/components/project-stats";
import { Projects } from "@/components/projects";
import { SectionHeading } from "@/components/section-heading";
import { Skills } from "@/components/skills";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

const footerLinks = [
  { label: "GitHub", href: profile.github, icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <ToolMarquee />
        <About />
        <Experience />
        <section suppressHydrationWarning id="projects" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <SectionHeading
            index="03"
            eyebrow="Projects"
            title="Selected work,"
            accent="measured in results."
            description="Eleven projects, all public on GitHub. The big number on each card is the main result, and the link takes you to the code."
          />
          <ProjectStats />
          <Projects />
        </section>
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer suppressHydrationWarning className="border-t">
        {/* extra bottom/right space keeps the floating back-to-top button off the links */}
        <div className="mx-auto grid max-w-6xl items-center gap-4 px-4 pt-8 pb-24 text-sm text-muted-foreground sm:grid-cols-[1fr_auto_1fr] sm:px-6 sm:pb-8 lg:pr-24">
          <a
            href="#top"
            className="justify-self-center font-mono font-semibold text-foreground transition-colors hover:text-primary sm:justify-self-start"
          >
            Farell Eugene
          </a>
          <p className="justify-self-center">© 2026 {profile.name}</p>
          <ul className="flex items-center justify-center gap-5 sm:justify-self-end">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <l.icon className="size-4 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5" aria-hidden="true" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
