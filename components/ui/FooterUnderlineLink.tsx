"use client";

import type { MouseEvent, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function FooterUnderlineLink({ href, children }: Props) {
  const restartUnderline = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.classList.remove("is-animating");
    void el.offsetWidth; // force reflow so the animation restarts from 0%
    el.classList.add("is-animating");
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-underline-link cursor-pointer"
      onMouseEnter={restartUnderline}
      onMouseLeave={restartUnderline}
    >
      {children}
    </a>
  );
}