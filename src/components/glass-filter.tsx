"use client";

import { useEffect, useRef } from "react";

/*
 * Lens refraction for liquid glass (Chromium only: it supports SVG filters in
 * backdrop-filter, so html.lg-refract is added there; others keep frosted glass).
 *
 * Each filter displaces what's behind the glass using a "displacement map":
 * red = horizontal shift, green = vertical shift, 50% grey = no shift.
 * The maps are computed once on a canvas for a pill-shaped lens:
 *   - a gentle uniform zoom (magnifier) that grows toward the edge, plus
 *   - a rim bend with a smoothstep falloff, so letters near the edge curve
 *     smoothly instead of tearing.
 * (The first version used steep linear ramps + 3-way colour splitting, which is
 * what made the held lens look "glitchy".)
 */

/* Resting glass (navbar, buttons): the original edge-only refraction the site launched with.
   Red ramps horizontally, green vertically; neutral in the middle, bending only near the rim. */
const restX = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g"><stop offset="0" stop-color="#f00"/><stop offset=".2" stop-color="#800000"/><stop offset=".8" stop-color="#800000"/><stop offset="1" stop-color="#000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;
const restY = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#0f0"/><stop offset=".25" stop-color="#008000"/><stop offset=".75" stop-color="#008000"/><stop offset="1" stop-color="#000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;

const NEUTRAL = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="#808080"/></svg>`,
)}`;

/** Builds a displacement map PNG for a pill (fully rounded rectangle) of the given canvas size. */
function lensMap(zoom: number, rim: number, bezel: number, W = 256, H = 128) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return NEUTRAL;
  const img = ctx.createImageData(W, H);
  const hw = W / 2;
  const hh = H / 2;
  const r = hh; // pill radius
  const band = r * bezel; // width of the bending rim, in px
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      // signed distance to a rounded rectangle (negative inside)
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const dist = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
      const depth = -dist; // distance from the edge, inside
      // outward normal of the nearest edge
      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(qx, qy) || 1;
        nx = (qx / l) * Math.sign(px);
        ny = (qy / l) * Math.sign(py);
      } else if (qx > qy) nx = Math.sign(px);
      else ny = Math.sign(py);
      // smoothstep falloff of the rim bend
      const t = Math.min(Math.max(1 - depth / band, 0), 1);
      const bend = t * t * (3 - 2 * t);
      let dx = -(px / hw) * zoom - nx * rim * bend;
      let dy = -(py / hh) * zoom - ny * rim * bend;
      if (depth < 0) dx = dy = 0;
      dx = Math.max(-1, Math.min(1, dx));
      dy = Math.max(-1, Math.min(1, dy));
      const i = (y * W + x) * 4;
      img.data[i] = Math.round(128 + dx * 127);
      img.data[i + 1] = Math.round(128 + dy * 127);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL("image/png");
}

export function GlassFilter() {
  const liftMap = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    // lite mode (weaker devices / data saver) keeps plain frosted glass, no lens
    if (document.documentElement.classList.contains("lite")) return;
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
    if (!brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand))) return;
    // held lens: soft ~1.15x magnifier with a smooth curved rim
    liftMap.current?.setAttribute("href", lensMap(0.45, 0.55, 0.5));
    document.documentElement.classList.add("lg-refract");
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
      <filter
        id="lg-lens"
        x="0"
        y="0"
        width="1"
        height="1"
        filterUnits="objectBoundingBox"
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feImage href={restX} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="mx" />
        <feImage href={restY} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="my" />
        <feComposite in="mx" in2="my" operator="arithmetic" k2="1" k3="1" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.12" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* held lens: smooth magnifier, lightly softened so the bent text doesn't shimmer */}
      <filter
        id="lg-magnify"
        x="0"
        y="0"
        width="1"
        height="1"
        filterUnits="objectBoundingBox"
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feImage ref={liftMap} href={NEUTRAL} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.3" xChannelSelector="R" yChannelSelector="G" result="bent" />
        <feGaussianBlur in="bent" stdDeviation="0.0012 0.003" />
      </filter>
    </svg>
  );
}
