"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
export type TrailItem = {
  id: number;
  x: number;
  y: number;
  w: number;
  src: string;
};
type Opts = {
  images: string[];
  minDistance?: number;
  lifetime?: number;
  max?: number;
  avoid?: RefObject<HTMLElement | null>;
};
export function useCursorImageTrail(
  host: RefObject<HTMLElement | null>,
  { images, minDistance = 90, lifetime = 1200, max = 10, avoid }: Opts,
) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const n = useRef(0);
  const cursor = useRef(0);
  const frame = useRef(0);
  const timers = useRef<number[]>([]);
  const spawn = useCallback(
    (x: number, y: number) => {
      const w = 120 + Math.round(Math.random() * 60);
      const id = ++n.current;
      const src = images[cursor.current++ % images.length];
      setItems((p) => [...p.slice(-(max - 1)), { id, x, y, w, src }]);
      timers.current.push(
        window.setTimeout(
          () => setItems((p) => p.filter((i) => i.id !== id)),
          lifetime,
        ),
      );
    },
    [images, lifetime, max],
  );
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = { current: fine.matches && !calm.matches };
    const sync = () => {
      enabled.current = fine.matches && !calm.matches;
      if (!enabled.current) setItems([]);
    };
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    const onMove = (e: PointerEvent) => {
      if (!enabled.current || frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left,
          y = e.clientY - r.top;
        const a = avoid?.current?.getBoundingClientRect();
        if (
          a &&
          e.clientX > a.left - 40 &&
          e.clientX < a.right + 40 &&
          e.clientY > a.top - 30 &&
          e.clientY < a.bottom + 30
        ) {
          last.current = { x, y };
          return;
        }
        if (
          last.current &&
          Math.hypot(x - last.current.x, y - last.current.y) < minDistance
        )
          return;
        last.current = { x, y };
        spawn(x, y);
      });
    };
    const onLeave = () => {
      last.current = null;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [host, avoid, minDistance, spawn]);
  return items;
}
