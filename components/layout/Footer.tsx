"use client";

import { useState } from "react";
import { LogoMark } from "@/components/archive/Logo";
import FooterUnderlineLink from "@/components/ui/FooterUnderlineLink";
export function Footer() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [leavingNavItem, setLeavingNavItem] = useState<string | null>(null);

  return (
    <footer className="border-t-[0.67px] border-ink-850 px-[var(--page-margin)] pb-10 pt-[60px]">
      <div className="container-archive flex flex-col gap-20">
        <div className="flex flex-col gap-4">
          <LogoMark size={40} />
          <h2
            data-reveal-title
            className="text-[clamp(32px,6vw,79.2px)] font-medium uppercase leading-none tracking-display"
          >
            Contribute to the archive
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 text-[16px] uppercase leading-4">
          <ul
            data-reveal="fade"
            style={{ "--d": "140ms" } as React.CSSProperties}
            className="flex flex-wrap gap-6"
          >
            {["Photography", "Music", "Fashion", "Design"].map((label) => {
              const isHovered = hoveredNavItem === label;
              const isLeaving = leavingNavItem === label;

              return (
                <li
                  key={label}
                  className={[
                    "group",
                    isHovered ? "is-hovered" : "",
                    isLeaving ? "is-leaving" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => {
                    setLeavingNavItem(null);
                    setHoveredNavItem(label);
                  }}
                  onMouseLeave={() => {
                    setHoveredNavItem(null);
                    setLeavingNavItem(label);
                  }}
                  onAnimationEnd={(event) => {
                    if (
                      event.animationName === "underline-undraw" &&
                      leavingNavItem === label
                    ) {
                      setLeavingNavItem(null);
                    }
                  }}
                >
                  <a href="#collections" className="nav-link-underline">
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <span
            data-reveal="fade"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            Designed and developed by{" "}
            <FooterUnderlineLink href="https://www.linkedin.com/in/sholanke-oladimeji/?isSelfProfile=true">
              Oladimeji
            </FooterUnderlineLink>
          </span>
        </div>
      </div>
    </footer>
  );
}
