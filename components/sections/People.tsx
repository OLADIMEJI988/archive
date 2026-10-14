import { PersonCard } from "@/components/archive/PersonCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { people } from "@/data/archive";
export function People() {
  return (
    <section
      id="people"
      aria-labelledby="people-h"
      className="px-[var(--page-margin)] py-[var(--section-pad)]"
    >
      <div className="container-archive flex flex-col gap-5">
        <SectionHeading id="people-h" action="Suggest a creator">
          People behind the culture
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-5 gap-y-[60px] sm:grid-cols-2">
          {people.map((p) => (
            <PersonCard
              key={p.caption}
              {...p}
              alt={`${p.caption}, ${p.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
