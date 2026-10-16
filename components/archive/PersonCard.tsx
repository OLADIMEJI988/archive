type Props = {
  title: string;
  caption: string;
  image: string;
  alternate?: string;
  alt: string;
};

export function PersonCard({ title, caption, image, alternate, alt }: Props) {
  return (
    <figure className="flex flex-col gap-5">
      <div className="group img-short film-grain relative overflow-hidden bg-ink-850">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full cursor-pointer object-cover object-top"
        />
        {alternate && (
          <img
            src={alternate}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full cursor-pointer object-cover object-top opacity-0 transition-opacity duration-[800ms] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
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
