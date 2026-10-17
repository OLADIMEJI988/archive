"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { featured, people, showcase } from "@/data/archive";
import { LogoMark } from "@/components/archive/Logo";

/* ---------------------------------------------------------------------------------------------
   Cinematic Showcase
   A small wide window sits in the page, grows with scroll into a dark 3D room, and the camera then
   travels down that room past angled walls carrying the five images and Archive's own copy.

   One scroll value drives everything:
     p (0..1)  = progress through the pinned section
     e         = window expansion, eased, over the first EXPAND share of p
     g         = camera journey along the room, over the rest of p
   Every frame writes transforms straight to the DOM (no React state while scrolling).

   Coordinate system: world units are CSS px in a "reference viewport" (cfg.ref). The whole scene
   is one element of that size, scaled to fit the real viewport, so layout is identical everywhere.
   World axes: +x right, +y down, +z toward the viewer. The room runs along -z.
   --------------------------------------------------------------------------------------------- */

const EXPAND = 0.22; // share of scroll spent growing the window
const JOURNEY: [number, number] = [0.05, 0.92]; // camera moves over this p range, then holds
const FADE_FROM = 0.94; // the last stretch dims to the page colour so the footer arrives quietly

// Logo opening. All three ranges are shares of the expansion (q = p / EXPAND, 0..1), so the logo and
// the window growth are the same scroll-driven motion and run in reverse together.
const LOGO_END = 0.55; // the logo's three shapes have finished scattering by here
const ROOM_FROM = 0.1; // the room starts to emerge from the black as the shapes begin to leave...
const ROOM_TO = 0.6; // ...and is fully present here
const LOGO_FILL = 0.5; // logo size as a share of the preview window's shorter side
const FLY = 0.55; // each shape travels this share of the preview window (height for top, width for sides)

type Wall = "L" | "R" | "F" | "C" | "B"; // left, right, floor, ceiling, back

const IMAGES = [
  { src: showcase[1].image, alt: "Memorial bust of a queen mother, Edo" },
  { src: showcase[2].image, alt: "Queen mother pendant mask (Iyoba), Kingdom of Benin" },
  { src: showcase[5].image, alt: "Visual artist Njideka Akunyili Crosby" },
  { src: showcase[3].image, alt: "Musician Davido" },
  { src: showcase[0].image, alt: "Weirdass Artifact" },
  // Third image of the closing composition (left wall, mirroring the right-hand one).
  { src: showcase[4].image, alt: "Bronze warrior figure, Edo" },
];

// Category words shown on the right wall.
const CATEGORIES = ["Photography", "Fashion", "Artifacts", "Paintings", "Art"];

type Cfg = {
  ref: { w: number; h: number }; // reference viewport (world px)
  P: number; // perspective distance
  W: number; H: number; D: number; // room width, height, depth
  q: number; // size multiplier for panels and type
  k0: number; // starting scale of the scene inside the window
  window: { w: number; h: number }; // starting window, as a share of the viewport
  cam: { x: number[]; z: number[]; yaw: number[]; pitch: number[] }; // keyframes, evenly spaced over g
  gap: number; // gap between the two overlay words
  stack: boolean; // overlay words stacked vertically (portrait)
  tilt: number; // degrees each side-wall image turns from its wall toward the camera (0 = flush with the wall)
};

const WIDE: Cfg = {
  ref: { w: 1600, h: 900 }, P: 900, W: 1100, H: 860, D: 2500, q: 1.25, k0: 0.28,
  window: { w: 0.28, h: 0.28 },
  cam: {
    x: [30, -50, 50, -40, 30, 0],
    z: [200, -200, -600, -1000, -1400, -1800],
    yaw: [-6, 6, -7, 6, -3, 0],
    pitch: [2, -1, 2, -1, 1, 0],
  },
  gap: 520, stack: false,
  tilt: 0, // desktop: unchanged, images sit flush on the walls
};
const TALL: Cfg = {
  ref: { w: 640, h: 1100 }, P: 950, W: 560, H: 1000, D: 2500, q: 0.9, k0: 0.62,
  window: { w: 0.8, h: 0.34 },
  cam: {
    x: [15, -25, 25, -15, 15, 0],
    z: [200, -200, -600, -1000, -1400, -1800],
    yaw: [-4, 4, -5, 4, -2, 0],
    pitch: [2, -1, 2, -1, 1, 0],
  },
  gap: 520, stack: true,
  tilt: 6, // mobile: the narrow room makes the walls read almost edge-on, so angle images slightly toward the viewer
};

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

// Uniform Catmull-Rom through evenly spaced keyframes: continuous velocity, no corners in the path.
function spline(a: number[], g: number) {
  const n = a.length - 1;
  const f = clamp(g) * n;
  const i = Math.min(n - 1, Math.floor(f));
  const t = f - i;
  const p0 = a[Math.max(0, i - 1)], p1 = a[i], p2 = a[i + 1], p3 = a[Math.min(n, i + 2)];
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
}

// A surface fixed to one wall of the room. `along` is the z position (x for the back wall).
type Surface = {
  key: string; wall: Wall; along: number; across: number; // across: y on side walls, x on floor/ceiling, y on back wall
  w: number; h: number; z: number; // z = world depth used for distance fading
  node: React.ReactNode;
};

function transformFor(c: Cfg, s: Surface) {
  const { W, H, D } = c;
  // Only the pictures tilt (not the category list). With tilt = 0 the strings below are identical to before.
  const t = s.key.startsWith("img") ? c.tilt : 0;
  switch (s.wall) {
    case "L": return `translate3d(${-W / 2}px, ${s.across}px, ${s.along}px) rotateY(${90 - t}deg)`;
    case "R": return `translate3d(${W / 2}px, ${s.across}px, ${s.along}px) rotateY(${-90 + t}deg)`;
    case "F": return `translate3d(${s.across}px, ${H / 2}px, ${s.along}px) rotateX(90deg)`;
    case "C": return `translate3d(${s.across}px, ${-H / 2}px, ${s.along}px) rotateX(-90deg)`;
    default: return `translate3d(${s.along}px, ${s.across}px, ${-D}px)`;
  }
}

const display = "font-medium uppercase leading-none tracking-display text-white";
// Room words are wider than the room (~1360px of type at desktop size). Their panels must be at least as
// wide as the text, otherwise text-center can't centre the overflow and the word sits off to the right.
const WORD_W = 1600;

function buildSurfaces(c: Cfg): Surface[] {
  const q = c.q;
  const pw = 340 * q, ph = pw * (1379 / 1103); // portrait panel
  const cap = 64 * q; // former caption strip; kept so pictures stay exactly where they were
  const panel = (i: number) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={IMAGES[i].src} alt={IMAGES[i].alt} decoding="async" className="block h-full w-full object-cover" draggable={false} />
  );
  const word = (t: string, size: number) => (
    <span style={{ fontSize: size * q * (q < 1 ? 1.1 : 1), whiteSpace: "nowrap" }} className={`${display} block text-center text-white/40`}>{t}</span>
  );
  const S: Surface[] = [];
  const add = (key: string, wall: Wall, along: number, across: number, w: number, h: number, node: React.ReactNode) =>
    S.push({ key, wall, along, across, w, h, z: wall === "B" ? -c.D : along, node });

  // Left wall, facing the room's centre. A surface is at its most prominent roughly 1000 units ahead
  // of the camera, so z positions are the camera's journey shifted back by that distance.
  // Image panels are exactly the picture (4:5). The -cap/2 keeps each picture where it sat before
  // the captions were removed.
  const yImg = 10 - cap / 2;
  // Both walls use the same even rhythm (750 units between neighbours) and finish at the same depth,
  // so the closing view reads as one mirrored trio: left panel, back-wall image, right panel.
  add("img0", "L", -750, yImg, pw, ph, panel(0));
  add("img2", "L", -1500, yImg, pw, ph, panel(2));
  add("img5", "L", -2250, yImg, pw, ph, panel(5));
  // Right wall
  add("list", "R", -750, -20, 560 * q, 400 * q, (
    <ul style={{ fontSize: 56 * q * (q < 1 ? 1.1 : 1) }} className={`${display} flex flex-col gap-[6px] text-white/90`}>
      {CATEGORIES.map((t) => <li key={t}>{t}</li>)}
    </ul>
  ));
  add("img1", "R", -1500, yImg, pw, ph, panel(1));
  add("img3", "R", -2250, yImg, pw, ph, panel(3));
  // Floor and ceiling: large type running across the room
  add("floor", "F", -1000, 0, WORD_W, 300 * q, word("Nigerian", 250));
  add("ceil", "C", -1700, 0, WORD_W, 300 * q, word("Display", 250));
  add("floor2", "F", -2200, 0, WORD_W, 300 * q, word("Creative", 250));
  // Back wall: the fifth image, framed by the overlay words
  const bw = 340 * q, bh = bw * (1379 / 1103);
  add("img4", "B", 0, -cap / 2, bw, bh, panel(4));
  return S;
}

export function CinematicShowcase() {
  const [tall, setTall] = useState(false);
  const cfg = tall ? TALL : WIDE;
  const surfaces = useRef<Surface[]>([]);
  surfaces.current = buildSurfaces(cfg);

  const host = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);

  // Portrait phones and tablets get their own room proportions instead of a squeezed desktop one.
  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 11/10)");
    const set = () => setTall(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const hostEl = host.current, frameEl = frame.current, sceneEl = scene.current, worldEl = world.current;
    const wordsEl = words.current, fadeEl = fade.current, logoEl = logo.current;
    if (!hostEl || !frameEl || !sceneEl || !worldEl || !wordsEl || !fadeEl || !logoEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // static version shown instead
    const c = cfg;
    let raf = 0, vw = 0, vh = 0, s = 1, range = 1, k0 = 1, ww = 0, wh = 0;
    // The existing coded logo (LogoMark) supplies the three shapes; they are moved in the SVG's own
    // 120-unit space, so travel distances are converted from px with `unit`.
    const part = (n: string) => logoEl.querySelector<SVGElement>(`[data-logo-part="${n}"]`);
    const top = part("top"), left = part("left"), right = part("right");
    let unit = 1; // px per SVG unit

    const measure = () => {
      vw = window.innerWidth; vh = window.innerHeight;
      s = Math.max(vw / c.ref.w, vh / c.ref.h); // scale that lets the reference scene cover the viewport
      ww = vw * c.window.w;
      wh = c.stack ? vh * c.window.h : ww * (vh / vw); // wide window keeps the viewport's shape
      k0 = Math.max(ww / (c.ref.w * s), wh / (c.ref.h * s)); // smallest scene scale that still fills the window
      range = Math.max(1, hostEl.offsetHeight - vh);
      const size = Math.round(Math.min(ww, wh) * LOGO_FILL);
      logoEl.style.width = logoEl.style.height = `${size}px`;
      unit = size / 120;
      schedule();
    };

    const apply = () => {
      raf = 0;
      const p = clamp(-hostEl.getBoundingClientRect().top / range);
      const q = clamp(p / EXPAND);
      const e = smoother(q);
      // Window: grows from its starting size to the full viewport; the scene inside grows with it.
      const w = ww + (vw - ww) * e, h = wh + (vh - wh) * e;
      // Once the window is fully open the clip is a no-op, so drop it: a permanent (even 0px) clip-path
      // keeps a mask layer over the whole 3D scene, which some mobile GPUs draw as black rectangles.
      frameEl.style.clipPath = e >= 0.999
        ? "none"
        : `inset(${((vh - h) / 2).toFixed(1)}px ${((vw - w) / 2).toFixed(1)}px round ${(4 * (1 - e)).toFixed(2)}px)`;
      sceneEl.style.transform = `translate(-50%,-50%) scale(${((k0 + (1 - k0) * e) * s).toFixed(4)})`;
      wordsEl.style.opacity = smoother(clamp((e - 0.6) / 0.35)).toFixed(3);

      // Logo opening: the three shapes scatter outward (up / left / right) and fade while the room
      // emerges from the same black. Pure function of p, so scrolling back rebuilds the logo exactly.
      const o = smoother(clamp(q / LOGO_END));
      const alpha = 1 - smoother(clamp(o / 0.85));
      const fly = (el: SVGElement | null, dx: number, dy: number) => {
        if (!el) return;
        if (o < 0.0005) { el.style.transform = ""; el.style.opacity = ""; return; } // exact original logo
        el.style.transform = `translate(${((dx * o) / unit).toFixed(2)}px, ${((dy * o) / unit).toFixed(2)}px)`;
        el.style.opacity = alpha.toFixed(3);
      };
      fly(top, 0, -wh * FLY);
      fly(left, -ww * FLY, 0);
      fly(right, ww * FLY, 0);
      logoEl.style.visibility = o >= 1 ? "hidden" : "";
      sceneEl.style.opacity = smoother(clamp((q - ROOM_FROM) / (ROOM_TO - ROOM_FROM))).toFixed(3);

      // Camera: one point travelling a smooth path down the room.
      const g = clamp((p - JOURNEY[0]) / (JOURNEY[1] - JOURNEY[0]));
      const cz = spline(c.cam.z, g);
      worldEl.style.transform =
        `rotateX(${spline(c.cam.pitch, g).toFixed(3)}deg) rotateY(${spline(c.cam.yaw, g).toFixed(3)}deg) ` +
        `translate3d(${(-spline(c.cam.x, g)).toFixed(1)}px,0,${(-cz).toFixed(1)}px)`;

      // Depth: surfaces emerge from the dark as they approach and clear the lens before they reach it.
      const list = surfaces.current;
      for (let i = 0; i < list.length; i++) {
        const el = els.current[i]; if (!el) continue;
        const d = cz - list[i].z; // distance ahead of the camera
        const near = clamp((d - 120) / 380);
        const far = 0.3 + 0.7 * clamp((3300 - d) / 2300);
        el.style.opacity = (near * far).toFixed(3);
      }
      // fadeEl.style.opacity = smoother(clamp((p - FADE_FROM) / (1 - FADE_FROM))).toFixed(3);
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const ro = new ResizeObserver(measure);
    ro.observe(hostEl);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      cancelAnimationFrame(raf);
    };
  }, [cfg]);

  const wordSize = cfg.stack ? 62 : 84;
  return (
    <>
      {/* Pinned, scroll-driven version. Hidden entirely under prefers-reduced-motion. */}
      <section
        ref={host}
        aria-label="Archive showcase"
        className="pointer-events-none relative -mt-[20vh] h-[calc(100vh+var(--sc-extra))] [--sc-extra:620vh] supports-[height:100svh]:-mt-[20svh] supports-[height:100svh]:h-[calc(100svh+var(--sc-extra))] max-lg:[--sc-extra:500vh] motion-reduce:hidden"
      >
        <div className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-[100svh]">
          <div ref={frame} className="absolute inset-0 bg-[#080808]" style={{ clipPath: "inset(40% 38% round 4px)" }}>
            <div
              ref={scene}
              className="absolute left-1/2 top-1/2"
              style={{ width: cfg.ref.w, height: cfg.ref.h, perspective: cfg.P, transform: "translate(-50%,-50%) scale(0.3)", opacity: 0 }}
            >
              <div ref={world} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                {surfaces.current.map((sf, i) => (
                  <div
                    key={sf.key}
                    ref={(el) => { els.current[i] = el; }}
                    className="absolute"
                    style={{
                      left: "50%", top: "50%", width: sf.w, height: sf.h, marginLeft: -sf.w / 2, marginTop: -sf.h / 2,
                      transform: transformFor(cfg, sf), opacity: 0,
                    } as CSSProperties}
                  >
                    {sf.node}
                  </div>
                ))}
              </div>
              {/* Flat title in front of the room. Its gap is where the back-wall image shows through. */}
              <div ref={words} aria-hidden="true" className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
                <div className={`${display} flex items-center ${cfg.stack ? "flex-col" : "flex-row"}`} style={{ gap: cfg.gap, fontSize: wordSize }}>
                  {/* <span>Creative</span>
                  <span>History</span> */}
                </div>
              </div>
            </div>
            {/* Opening logo: the existing LogoMark, centred in the preview window. Its three shapes
                (data-logo-part) are driven from the same scroll progress as the window. */}
            <div
              ref={logo}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
              style={{ width: "min(14vw, 14vh)", height: "min(14vw, 14vh)" }}
            >
              <LogoMark size={120} className="block h-full w-full overflow-visible" />
            </div>
            <div ref={fade} aria-hidden="true" className="absolute inset-0 bg-[#080808]" style={{ opacity: 0 }} />
          </div>
        </div>
      </section>

      {/* Reduced-motion alternative: no pinning and no scroll-linked motion; the five scenes simply
          stack as ordinary pictures. */}
      <section
        aria-label="Archive showcase"
        className="hidden bg-[#080808] px-[var(--page-margin)] py-[var(--section-pad)] motion-reduce:block"
      >
        <div className="container-archive flex flex-col gap-10">
          {IMAGES.map((im) => (
            <figure key={im.src} className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.alt} loading="lazy" decoding="async" className="h-auto max-h-[85svh] w-auto max-w-full object-contain" />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
