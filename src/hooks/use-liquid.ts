"use client";

import { useEffect, type RefObject } from "react";
import { createSpring, rubberband, springs } from "@/lib/spring";

export type LiquidOptions = {
  /** scale on hover (pointer devices) */
  hover?: number;
  /** scale while pressed: iOS glass swells under the finger */
  press?: number;
  /** how much the bubble stretches toward the drag direction */
  stretch?: number;
  /** max elastic travel in px while dragging */
  travel?: number;
  /** while hovering, drift toward the cursor by this fraction of its offset from the centre */
  magnet?: number;
  disabled?: boolean;
};

/**
 * iOS "liquid glass" bubble behaviour for any element:
 * hover lift → press swell → elastic drag stretch → jelly release.
 * Also feeds --mx / --my so the glass highlight follows the pointer.
 */
export function useLiquid<T extends HTMLElement>(ref: RefObject<T | null>, opts: LiquidOptions = {}) {
  const { hover = 1.04, press = 1.1, stretch = 0.14, travel = 10, magnet = 0, disabled = false } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const v = { sx: 1, sy: 1, tx: 0, ty: 0 };
    const apply = () => {
      el.style.scale = `${v.sx.toFixed(4)} ${v.sy.toFixed(4)}`;
      el.style.translate = `${v.tx.toFixed(2)}px ${v.ty.toFixed(2)}px`;
    };
    const sx = createSpring(1, springs.lift, (x) => ((v.sx = x), apply()));
    const sy = createSpring(1, springs.lift, (x) => ((v.sy = x), apply()));
    const tx = createSpring(0, springs.drag, (x) => ((v.tx = x), apply()));
    const ty = createSpring(0, springs.drag, (x) => ((v.ty = x), apply()));

    let hovering = false;
    let pressed = false;
    let ox = 0;
    let oy = 0;
    const finePointer = window.matchMedia("(hover: hover)").matches;

    const setLight = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const rest = (cfg = springs.jelly) => {
      const s = hovering && finePointer ? hover : 1;
      sx.to(s, cfg);
      sy.to(s, cfg);
      tx.to(0, springs.jelly);
      ty.to(0, springs.jelly);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      if (!pressed) rest(springs.lift);
    };
    const onLeave = () => {
      hovering = false;
      if (!pressed) rest(springs.jelly);
    };
    const onMoveLocal = (e: PointerEvent) => {
      setLight(e);
      if (!magnet || pressed || !hovering) return;
      // lean toward the cursor (measure without our own translate)
      const r = el.getBoundingClientRect();
      const cx = r.left - v.tx + r.width / 2;
      const cy = r.top - v.ty + r.height / 2;
      tx.to((e.clientX - cx) * magnet, springs.lift);
      ty.to((e.clientY - cy) * magnet, springs.lift);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pressed = true;
      ox = e.clientX;
      oy = e.clientY;
      el.dataset.pressed = "";
      setLight(e);
      sx.to(press, springs.press);
      sy.to(press, springs.press);
      window.addEventListener("pointermove", onDrag, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    const onDrag = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - ox;
      const dy = e.clientY - oy;
      tx.to(rubberband(dx, travel), springs.drag);
      ty.to(rubberband(dy, travel), springs.drag);
      const ax = Math.min(1, Math.abs(dx) / 80);
      const ay = Math.min(1, Math.abs(dy) / 80);
      // stretch along the drag axis, thin out across it (volume-preserving feel)
      sx.to(press * (1 + stretch * ax - stretch * 0.5 * ay), springs.drag);
      sy.to(press * (1 + stretch * ay - stretch * 0.5 * ax), springs.drag);
      setLight(e);
    };

    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      delete el.dataset.pressed;
      window.removeEventListener("pointermove", onDrag);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      rest(springs.jelly);
    };

    // keyboard activation gets the same squish-and-wobble
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      sx.to(1, springs.jelly);
      sy.to(1, springs.jelly);
      sx.impulse(1.6);
      sy.impulse(-1.2);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointermove", onMoveLocal, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", onMoveLocal);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onDrag);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      [sx, sy, tx, ty].forEach((s) => s.stop());
      el.style.scale = "";
      el.style.translate = "";
    };
  }, [ref, hover, press, stretch, travel, magnet, disabled]);
}
