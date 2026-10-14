"use client";
import { useEffect, type RefObject } from "react";

// Scroll-linked "recede" for the hero. One normalized progress value (0 -> 1) drives scale, blur
// and (reduced motion only) opacity on the layer. The overlap itself is plain layout: the hero is
// sticky and the next sections scroll over it, so nothing here moves the following section.
// Styles are written straight to the element (no React state) and recomputed on scroll/resize.
const RANGE = 0.7; // progress completes after 70% of the hero's height has scrolled past
const MAX_SCALE_LOSS = { desktop: 0.15, mobile: 0.14 }; // 1 -> 0.95 / 0.96
const MAX_BLUR_PX = { desktop: 5, mobile: 3 };
const REDUCED_MIN_OPACITY = 0.5;

export function useHeroRecede(host: RefObject<HTMLElement | null>, layer: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hostEl = host.current; const layerEl = layer.current;
    if (!hostEl || !layerEl) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 639.98px)");
    let frame = 0;
    let height = hostEl.offsetHeight;

    const apply = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, height * RANGE)));
      if (calm.matches) {
        layerEl.style.transform = ""; layerEl.style.filter = "";
        layerEl.style.opacity = p === 0 ? "" : String(1 - p * (1 - REDUCED_MIN_OPACITY));
        return;
      }
      const k = small.matches ? "mobile" : "desktop";
      layerEl.style.opacity = "";
      layerEl.style.transform = p === 0 ? "" : `scale(${(1 - p * MAX_SCALE_LOSS[k]).toFixed(4)})`;
      layerEl.style.filter = p === 0 ? "" : `blur(${(p * MAX_BLUR_PX[k]).toFixed(2)}px)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(apply); };
    const measure = () => { height = hostEl.offsetHeight; schedule(); };

    const ro = new ResizeObserver(measure); ro.observe(hostEl);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    calm.addEventListener("change", schedule); small.addEventListener("change", schedule);
    apply();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure); window.removeEventListener("pageshow", measure);
      calm.removeEventListener("change", schedule); small.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      layerEl.style.transform = ""; layerEl.style.filter = ""; layerEl.style.opacity = "";
    };
  }, [host, layer]);
}
