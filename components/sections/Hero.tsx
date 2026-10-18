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
            className="hero-reveal text-[clamp(46px,9.5vw,100px)] font-medium uppercase leading-none tracking-display"
          >
            Nigerian creative history
          </h1>
          <p
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="hero-reveal min-[200px]:max-[500px]:leading-[1.4] sm:text-[15px] text-[19px] min-[200px]:max-[500px]:text-[16px] min-[200px]:max-[500px]:w-[min(300px,100%)] uppercase leading-[14.5px]"
          >
            A digital museum of photography, music, fashion, and design.
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center max-sm:bottom-6"
      >
        <div
          style={{ "--d": "180ms" } as React.CSSProperties}
          className="hero-reveal flex items-center gap-3 text-[12px] uppercase leading-none"
        >
          <span>Scroll</span>

          <img
            src="/images/scroll-icon.png"
            alt=""
            width={265}
            height={561}
            className="h-[28px] w-auto max-sm:h-[24px]"
          />
        </div>
      </div>
    </section>
  );
}
