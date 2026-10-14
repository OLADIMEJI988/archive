"use client";
import { useEffect } from "react";

// One shared IntersectionObserver for every [data-reveal-title] (section titles: scale + blur) and
// [data-reveal] (footer supporting content: fade) element.
// Each element is revealed once (data-revealed) and then left alone. Mounted once in page.tsx.
const MARGIN = 40; // px: reveal when an element is this far inside the bottom of the viewport

export function RevealObserver() {
  useEffect(() => {
    const pending = new Set(
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reveal-title]:not([data-revealed]), [data-reveal]:not([data-revealed])",
        ),
      ),
    );

    if (!pending.size) return;
    const revealAll = () => {
      pending.forEach((el) => el.setAttribute("data-revealed", ""));
      pending.clear();
    };
    if (typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    let timer = 0;
    const done = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
    const reveal = (el: HTMLElement) => {
      if (!pending.delete(el)) return;
      el.setAttribute("data-revealed", "");
      io.unobserve(el);
      if (!pending.size) done();
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0)
            reveal(e.target as HTMLElement);
        }),
      { rootMargin: `0px 0px -${MARGIN}px 0px` },
    );
    // An observer misses elements that are jumped past in a single frame (End key, anchor jump, very
    // fast flick). Once scrolling settles, reveal anything already at or above the trigger line.
    const sweep = () => {
      const limit = window.innerHeight - MARGIN;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) reveal(el);
      });
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(sweep, 120);
    };
    pending.forEach((el) => io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    return done;
  }, []);
  return null;
}
