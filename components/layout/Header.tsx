"use client";

import { useRef, useState } from "react";
import { Logo } from "@/components/archive/Logo";
import { nav } from "@/data/archive";

// Main navigation is intentionally non-functional for now.
const NAV_ENABLED = false;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [leavingNavItem, setLeavingNavItem] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <header className="nav-drop fixed inset-x-0 top-0 z-20 bg-ink-950 px-[var(--page-margin)] text-white">
      <nav
        aria-label="Primary"
        className="container-archive flex min-h-[59px] items-center gap-3 text-[13px] uppercase leading-[19px] sm:gap-10 sm:text-[16px]"
      >
        <a
          href="#top"
          aria-label="Archive — home"
          className="flex-none sm:flex-1"
          onClick={closeMenu}
        >
          <Logo />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden min-w-0 flex-1 flex-wrap justify-center gap-x-6 text-center leading-4 sm:flex">
          {nav.map(([label, href]) => {
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
                  if (leaveTimer.current) {
                    clearTimeout(leaveTimer.current);
                    leaveTimer.current = null;
                  }

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
                {NAV_ENABLED && href ? (
                  <a href={href} className="nav-link-underline cursor-pointer">
                    {label}
                  </a>
                ) : (
                  <span className="nav-link-underline cursor-pointer">
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <span className="hidden flex-1 text-right sm:block">
          Lagos, Nigeria
        </span>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center sm:hidden"
        >
          <span
            aria-hidden="true"
            className={`relative block h-5 w-5 transition-transform duration-300 ease-in-out ${
              menuOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            {/* Horizontal line */}
            <span className="absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 bg-white" />

            {/* Vertical line */}
            <span className="absolute left-1/2 top-1/2 h-5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-white" />
          </span>
        </button>
      </nav>

      {/* Mobile navigation panel */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 bottom-0 top-[58px] z-[-1] overflow-y-auto bg-ink-950 px-[var(--page-margin)] transition-[opacity,visibility] duration-300 ease-in-out sm:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="container-archive flex min-h-full flex-col items-center justify-center py-8">
          <ul className="flex flex-col items-center gap-14 text-center text-[30px] uppercase leading-5">
            {nav.map(([label, href]) => (
              <li key={label}>
                {NAV_ENABLED && href ? (
                  <a
                    href={href}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMenu}
                    className="block"
                  >
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>

          <p className="absolute bottom-8 right-[var(--page-margin)] text-right text-[13px] uppercase leading-4 text-white/60">
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </header>
  );
}
