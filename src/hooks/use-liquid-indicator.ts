"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { createSpring, rubberband, springPreset, springs, type Spring } from "@/lib/spring";

const follow = springPreset(0.2, 0.82); // lens tracking the pointer while held
const liftUp = springPreset(0.26, 0.7); // lens swelling up on hold

type Options = {
  /** enable press-and-hold → drag → release-to-select (iOS 26 tab bar) */
  interactive?: boolean;
  /** selector for the selectable items inside the container */
  items?: string;
};

/**
 * A glass "droplet" that glides between items of a segmented control / nav.
 * It stretches with speed and squashes vertically while moving.
 * With `interactive`, holding the pointer lifts it into a magnifying lens you
 * can drag across the items; releasing snaps it to the nearest one and clicks it.
 */
export function useLiquidIndicator(
  container: RefObject<HTMLElement | null>,
  indicator: RefObject<HTMLElement | null>,
  activeSelector: string | null,
  { interactive = false, items = "a, button" }: Options = {},
) {
  const sp = useRef<{ x: Spring; w: Spring; o: Spring; lift: Spring } | null>(null);
  const shown = useRef(false);
  const dragging = useRef(false);

  // springs + render
  useEffect(() => {
    const ind = indicator.current;
    if (!ind) return;
    const s = { x: 0, w: 0, o: 0, vx: 0, lift: 0 };
    const apply = () => {
      const speed = Math.min(1, Math.abs(s.vx) / 2500);
      const stretchW = s.w + speed * 26;
      ind.style.width = `${stretchW}px`;
      ind.style.translate = `${s.x - (stretchW - s.w) / 2}px 0`;
      const sx = 1 + s.lift * 0.14;
      const sy = (1 + s.lift * 0.5) * (1 - speed * 0.2 * (1 - s.lift * 0.6));
      ind.style.scale = `${sx} ${sy}`;
      ind.style.opacity = String(s.o);
      // lens sits above the labels only while lifted, so it can magnify them
      ind.style.zIndex = s.lift > 0.04 ? "20" : "0";
      if (s.lift > 0.04) ind.dataset.lifted = "";
      else delete ind.dataset.lifted;
    };
    sp.current = {
      x: createSpring(0, springs.glide, (x, v) => ((s.x = x), (s.vx = v), apply())),
      w: createSpring(0, springs.glide, (w) => ((s.w = w), apply())),
      o: createSpring(0, springs.lift, (o) => ((s.o = o), apply())),
      lift: createSpring(0, liftUp, (l) => ((s.lift = l), apply())),
    };
    return () => {
      if (sp.current) Object.values(sp.current).forEach((x) => x.stop());
    };
  }, [indicator]);

  const measure = (item: HTMLElement) => {
    const box = container.current!;
    const boxRect = box.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    const scale = box.offsetWidth ? boxRect.width / box.offsetWidth : 1;
    return { x: (r.left - boxRect.left) / scale + box.scrollLeft, w: item.offsetWidth };
  };

  const update = () => {
    const s = sp.current;
    const box = container.current;
    if (!s || !box || dragging.current) return;
    const item = activeSelector ? box.querySelector<HTMLElement>(activeSelector) : null;
    if (!item || item.offsetWidth === 0) {
      s.o.to(0);
      shown.current = false;
      return;
    }
    const { x, w } = measure(item);
    if (!shown.current) {
      s.x.snap(x);
      s.w.snap(w);
      shown.current = true;
    } else {
      s.x.to(x, springs.glide);
      s.w.to(w, springs.glide);
    }
    s.o.to(1);
  };

  useLayoutEffect(update);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });

  // press-and-hold lens
  useEffect(() => {
    const box = container.current;
    if (!box || !interactive) return;

    let startX = 0;
    let moved = false;
    let pressedItem: HTMLElement | null = null;
    let lensW = 0;

    const itemsList = () => Array.from(box.querySelectorAll<HTMLElement>(items)).filter((el) => el.offsetWidth > 0);
    const nearest = (clientX: number) => {
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const el of itemsList()) {
        const r = el.getBoundingClientRect();
        const d = Math.abs(clientX - (r.left + r.width / 2));
        if (d < bestD) {
          bestD = d;
          best = el;
        }
      }
      return best;
    };

    const moveLens = (clientX: number) => {
      const s = sp.current;
      if (!s) return;
      const boxRect = box.getBoundingClientRect();
      const raw = clientX - boxRect.left - lensW / 2;
      const max = box.offsetWidth - lensW;
      // rubber-band past both ends
      const x = raw < 0 ? rubberband(raw, 24) : raw > max ? max + rubberband(raw - max, 24) : raw;
      s.x.to(x, follow);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !sp.current) return;
      const target = (e.target as HTMLElement).closest<HTMLElement>(items);
      if (!target || !box.contains(target)) return;
      dragging.current = true;
      moved = false;
      startX = e.clientX;
      pressedItem = target;
      const s = sp.current;
      const m = measure(target);
      lensW = Math.max(m.w, 44);
      if (!shown.current) {
        s.x.snap(m.x);
        s.w.snap(m.w);
        shown.current = true;
      }
      s.o.to(1);
      s.w.to(lensW, follow);
      s.lift.to(1, liftUp);
      moveLens(e.clientX);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      if (Math.abs(e.clientX - startX) > 4) moved = true;
      // lens takes the width of the item it hovers, so it feels magnetic
      const near = nearest(e.clientX);
      if (near) {
        lensW = Math.max(near.offsetWidth, 44);
        sp.current?.w.to(lensW, follow);
      }
      moveLens(e.clientX);
    };

    const finish = (clientX: number | null) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      dragging.current = false;
      const s = sp.current;
      if (!s) return;
      s.lift.to(0, springs.jelly);
      const target = clientX === null ? null : nearest(clientX);
      if (target) {
        const { x, w } = measure(target);
        s.x.to(x, springs.jelly);
        s.w.to(w, springs.jelly);
        // dragged onto another item: select it (a plain click is handled natively)
        if (moved && target !== pressedItem) target.click();
      } else {
        update();
      }
    };
    const onUp = (e: PointerEvent) => finish(e.clientX);
    const onCancel = () => finish(null);

    box.addEventListener("pointerdown", onDown);
    return () => {
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, interactive, items]);
}
