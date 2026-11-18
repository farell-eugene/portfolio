"use client";

import { useEffect } from "react";

/*
 * Lens refraction for liquid glass.
 * Two gradient maps (red = horizontal, green = vertical) are neutral in the
 * middle and ramp near the edges, so feDisplacementMap bends whatever is
 * behind the glass only around its rim, like a real lens.
 * Only Chromium supports SVG filters in backdrop-filter, so the class
 * html.lg-refract is added there; other browsers keep frosted glass.
 */
const mapX = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g"><stop offset="0" stop-color="#f00"/><stop offset=".2" stop-color="#800000"/><stop offset=".8" stop-color="#800000"/><stop offset="1" stop-color="#000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;
const mapY = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#0f0"/><stop offset=".25" stop-color="#008000"/><stop offset=".75" stop-color="#008000"/><stop offset="1" stop-color="#000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;

/* Magnifier maps: a full-width ramp (uniform zoom) that gets steeper at the rim (lens bend). */
const magX = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g"><stop offset="0" stop-color="#f00"/><stop offset=".14" stop-color="#c00000"/><stop offset=".5" stop-color="#800000"/><stop offset=".86" stop-color="#400000"/><stop offset="1" stop-color="#000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;
const magY = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#00c000"/><stop offset=".25" stop-color="#009800"/><stop offset=".5" stop-color="#008000"/><stop offset=".75" stop-color="#006800"/><stop offset="1" stop-color="#004000"/></linearGradient><rect width="100" height="100" fill="url(#g)"/></svg>`,
)}`;

export function GlassFilter() {
  useEffect(() => {
    // lite mode (weaker devices / data saver) keeps plain frosted glass, no lens
    if (document.documentElement.classList.contains("lite")) return;
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
    if (brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand))) {
      document.documentElement.classList.add("lg-refract");
    }
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
        <feImage href={mapX} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="mx" />
        <feImage href={mapY} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="my" />
        <feComposite in="mx" in2="my" operator="arithmetic" k2="1" k3="1" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.12" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* held lens: magnifies what's under it, with slight chromatic dispersion at the rim */}
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
        <feImage href={magX} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="mx" />
        <feImage href={magY} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="my" />
        <feComposite in="mx" in2="my" operator="arithmetic" k2="1" k3="1" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.2" xChannelSelector="R" yChannelSelector="G" result="d1" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.21" xChannelSelector="R" yChannelSelector="G" result="d2" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0.22" xChannelSelector="R" yChannelSelector="G" result="d3" />
        <feColorMatrix in="d1" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
        <feColorMatrix in="d2" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
        <feColorMatrix in="d3" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
        <feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg" />
        <feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1" />
      </filter>
    </svg>
  );
}
