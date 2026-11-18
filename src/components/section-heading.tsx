import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  const titleWords = title.split(" ").length;
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <span className="font-mono text-xs text-highlight">{index}</span>
          <span suppressHydrationWarning className="grow-x h-px w-10 bg-highlight/60" style={{ "--d": "200ms" } as React.CSSProperties} aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText
              text={accent}
              startIndex={titleWords}
              itemClassName="font-serif text-[1.1em] font-normal tracking-normal text-primary"
            />
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={250}>
          <p className="mt-5 text-justify text-lg leading-relaxed hyphens-auto text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
