type Props = {
  title: string;
  caption: string;
  image: string;
  alternate?: string;
  alt: string;
};
// Fixed-size frame; original and alternate are stacked and crossfaded with opacity (no layout change).
// If `alternate` is not provided the card renders the single image and nothing swaps.
export function PersonCard({ title, caption, image, alternate, alt }: Props) {
  return (
    <figure className="flex flex-col gap-5">
      <div className="group img-short relative overflow-hidden bg-ink-850">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {alternate && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={alternate}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[800ms] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="text-[18px] font-medium uppercase leading-[18px] tracking-display">
          {title}
        </span>
        <span className="text-[18px] leading-[21.6px] text-[#A6A6A6]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
