type Props = {
  title: string;
  caption: string;
  image: string;
  alt: string;
  short?: boolean;
  zoom?: boolean;
};
export function WorkCard({ title, caption, image, alt, short, zoom }: Props) {
  return (
    <figure className="flex flex-col gap-5">
      <div
        className={`${short ? "img-short" : "aspect-[4/5]"} overflow-hidden bg-ink-850${zoom ? " group" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover${zoom ? " transition-transform duration-[750ms] ease-[cubic-bezier(.4,0,.2,1)] will-change-transform motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:[@media(hover:hover)]:group-hover:scale-100" : ""}`}
        />
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
