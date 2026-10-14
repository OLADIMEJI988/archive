import { CollectionCard } from "@/components/archive/CollectionCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/data/archive";
export function Collections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-h"
      className="px-[var(--page-margin)] py-[var(--section-pad)]"
    >
      <div className="container-archive flex flex-col gap-5">
        <SectionHeading id="collections-h">Collections</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
