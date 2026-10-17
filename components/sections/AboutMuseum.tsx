import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutImage, aboutRows } from "@/data/archive";

export function AboutMuseum() {
  return (
    <section
      id="about"
      aria-labelledby="about-h"
      className="px-[var(--page-margin)] py-[var(--section-pad)] pt-[90px]"
    >
      <div className="container-archive flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <SectionHeading id="about-h">About the museum</SectionHeading>

          <dl className="flex flex-col gap-10">
            {aboutRows.map(([k, v], i) => (
              <div
                key={k}
                data-reveal="rise"
                style={{ "--d": `${Math.min(i, 4) * 80}ms` } as React.CSSProperties}
                className="flex flex-col gap-2 sm:flex-row sm:gap-1"
              >
                <dt className="w-full text-[16px] uppercase leading-[19.2px] text-[#A6A6A6] sm:w-[160px] sm:shrink-0 lg:w-[225px]">
                  {k}
                </dt>

                <dd className="min-w-0 max-w-[450px] flex-1 text-[18px] leading-[21.6px] sm:w-auto min-[1400px]:max-[1900px]:!w-[590px] min-[1400px]:max-[1900px]:!max-w-none min-[1400px]:max-[1900px]:!flex-none">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="film-grain relative aspect-[280.83/349.02] w-full max-w-none shrink-0 sm:max-w-[290.83px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aboutImage}
            alt="Archive exhibition view"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
