"use client";
import type { RefObject } from "react";
import { useCursorImageTrail } from "@/hooks/useCursorImageTrail";
export function CursorImageTrail({
  host,
  images,
  avoid,
}: {
  host: RefObject<HTMLElement | null>;
  images: string[];
  avoid?: RefObject<HTMLElement | null>;
}) {
  const items = useCursorImageTrail(host, { images, avoid });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {items.map((i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i.id}
          src={i.src}
          alt=""
          width={i.w}
          style={{ left: i.x, top: i.y, width: i.w, aspectRatio: "4/5" }}
          className="trail-img absolute -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      ))}
    </div>
  );
}
