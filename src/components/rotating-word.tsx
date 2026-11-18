"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a masked rise animation. */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    // padding (cancelled by negative margin) gives descenders like "g" room inside the clipping box
    <span className="relative -my-[0.2em] inline-grid overflow-hidden py-[0.2em] align-bottom" aria-live="off">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w, i) => {
        const active = i === index;
        const leaving = i === (index - 1 + words.length) % words.length;
        return (
          <span
            key={w}
            aria-hidden="true"
            className="col-start-1 row-start-1 whitespace-nowrap"
            style={{
              translate: active ? "0 0" : leaving ? "0 -150%" : "0 150%",
              opacity: active ? 1 : 0,
              // the old word fades out quickly so the two never stack up; the new one rises in just after
              transition: active
                ? "translate 900ms var(--ease-out) 120ms, opacity 500ms ease 160ms"
                : leaving
                  ? "translate 700ms var(--ease-out), opacity 220ms ease"
                  : "none",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}
