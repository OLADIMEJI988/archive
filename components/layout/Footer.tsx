import { LogoMark } from "@/components/archive/Logo";
export function Footer() {
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
        <div className="flex flex-wrap items-center justify-between gap-6 text-[16px] uppercase">
          <ul
            data-reveal="fade"
            style={{ "--d": "140ms" } as React.CSSProperties}
            className="flex flex-wrap gap-6"
          >
            {["Photography", "Music", "Fashion", "Design"].map((l) => (
              <li key={l}>
                <a href="#collections">{l}</a>
              </li>
            ))}
          </ul>
          <span
            data-reveal="fade"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            ©2026
          </span>
        </div>
      </div>
    </footer>
  );
}
