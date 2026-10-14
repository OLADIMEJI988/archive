import { WorkCard } from "@/components/archive/WorkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featured } from "@/data/archive";
export function Featured() {
  return (
    <section
      id="featured"
      aria-labelledby="featured-h"
      className="border-t-[0.67px] border-ink-850 px-[var(--page-margin)] py-[var(--section-pad)]"
    >
      <div className="container-archive flex flex-col gap-5">
        <SectionHeading id="featured-h" action="See the archive">
          Featured artifacts
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-5 gap-y-[60px] sm:grid-cols-2">
          {featured.map((f) => (
            <WorkCard
              key={f.title}
              {...f}
              short
              zoom
              alt={`${f.title} — ${f.caption}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
