"use client";

import { useEffect, useRef } from "react";

/** Animates a number like "0.737", "70.3%" or "11" from 0 when it scrolls into view. */
export function CountUp({ value, duration = 1800, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const grouped = num.includes(",");
    const fmt = (n: number) =>
      pre +
      (grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
      post;
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    el.textContent = fmt(0);
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            el.textContent = fmt(target * easeOutExpo(t));
            if (t < 1) raf = requestAnimationFrame(tick);
            else el.textContent = value;
          };
          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="tabular">
      {value}
    </span>
  );
}
