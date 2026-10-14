"use client";
import { useState } from "react";
import { ArchiveCategoryRow } from "@/components/archive/ArchiveCategoryRow";
import { FeaturedArchiveImage } from "@/components/archive/FeaturedArchiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { acrossDefaultImage, categories } from "@/data/archive";
const DEFAULT = "default";
const images = [
  { key: DEFAULT, src: acrossDefaultImage, alt: "Archive featured image" },
  ...categories.map((c) => ({
    key: c.title,
    src: c.image,
    alt: `${c.title} collection`,
  })),
];
export function AcrossArchive() {
  const [active, setActive] = useState(DEFAULT);
  return (
    <section
      id="across"
      aria-labelledby="across-h"
      className="px-[var(--page-margin)] py-[var(--section-pad)]"
    >
      <div
        className="container-archive flex flex-col justify-between gap-10 md:flex-row"
        onMouseLeave={() => setActive(DEFAULT)}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <SectionHeading id="across-h">Across the archive</SectionHeading>
          <ul className="-my-5 flex flex-col">
            {categories.map((c) => (
              <ArchiveCategoryRow
                key={c.title}
                title={c.title}
                sentence={c.sentence}
                active={active === c.title}
                onActivate={() => setActive(c.title)}
              />
            ))}
          </ul>
        </div>
        <FeaturedArchiveImage images={images} activeKey={active} />
      </div>
    </section>
  );
}
