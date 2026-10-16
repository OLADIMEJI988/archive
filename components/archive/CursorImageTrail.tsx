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
        <div
          key={i.id}
          style={{ left: i.x, top: i.y, width: i.w, aspectRatio: "4/5" }}
          className="trail-img film-grain absolute -translate-x-1/2 -translate-y-1/2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={i.src}
            alt=""
            width={i.w}
            className="block h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
