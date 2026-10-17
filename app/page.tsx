import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Featured } from "@/components/sections/Featured";
import { Collections } from "@/components/sections/Collections";
import { People } from "@/components/sections/People";
import { AcrossArchive } from "@/components/sections/AcrossArchive";
import { AboutMuseum } from "@/components/sections/AboutMuseum";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { RevealObserver } from "@/components/layout/RevealObserver";
export default function Home() {
  // The hero is sticky; this opaque, higher-stacked wrapper is what scrolls up and over it.
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <div className="relative z-10 bg-ink-950">
          <Featured />
          <Collections />
          <People />
          <AcrossArchive />
          <CinematicShowcase />
          <AboutMuseum />
        </div>
      </main>
      <Footer />
    </>
  );
}
