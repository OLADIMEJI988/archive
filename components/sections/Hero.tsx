"use client";
import { useRef } from "react";
import { CursorImageTrail } from "@/components/archive/CursorImageTrail";
import { useHeroRecede } from "@/hooks/useHeroRecede";
import { trailImages } from "@/data/archive";
export function Hero() {
  const host = useRef<HTMLElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  useHeroRecede(host, layer);
  return (
    <section
      ref={host}
      id="top"
      aria-labelledby="hero-title"
      className="sticky top-0 z-0 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-[var(--page-margin)] py-20"
    >
      <CursorImageTrail host={host} images={trailImages} avoid={text} />
      <div ref={layer} className="relative z-10 will-change-[transform,filter]">
        <div
          ref={text}
          className="flex flex-col items-center gap-4.5 text-center"
        >
          <h1
            id="hero-title"
            className="hero-reveal text-[clamp(40px,8vw,79.2px)] font-medium uppercase leading-none tracking-display"
          >
            Nigerian creative history
          </h1>
          <p
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="hero-reveal min-[200px]:max-[500px]:leading-[1.4] sm:text-[12px] text-[16px] min-[200px]:max-[500px]:text-[14px] min-[200px]:max-[500px]:w-[340px] uppercase leading-[11.5px]"
          >
            A digital museum of photography, music, fashion, and design.
          </p>
        </div>
      </div>
    </section>
  );
}
