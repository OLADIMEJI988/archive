"use client";

import type { MouseEvent } from "react";

export function SectionHeading({
  id,
  children,
  action,
}: {
  id?: string;
  children: React.ReactNode;
  action?: string;
}) {
  const restartUnderline = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.classList.remove("is-animating");
    void el.offsetWidth; // force reflow so the animation restarts from 0%
    el.classList.add("is-animating");
  };

  return (
    <div className="flex items-end justify-between gap-6">
      <h2
        id={id}
        data-reveal-title
        className="text-[clamp(30px,5vw,48px)] font-medium uppercase leading-none tracking-display"
      >
        {children}
      </h2>
      {action && (
        <span
          className="footer-underline-link cursor-pointer border-white pb-1 text-[16px] uppercase leading-[19px]"
          onMouseEnter={restartUnderline}
          onMouseLeave={restartUnderline}
        >
          {action}
        </span>
      )}
    </div>
  );
}
