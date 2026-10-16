type Props = {
  images: { key: string; src: string; alt: string }[];
  activeKey: string;
};

// All images stay mounted and crossfade; fixed aspect box prevents layout shift.
export function FeaturedArchiveImage({ images, activeKey }: Props) {
  return (
    <div className="film-grain relative aspect-[280.83/349.02] w-full max-w-none shrink-0 overflow-hidden bg-ink-850 sm:max-w-[290.83px]">
      {images.map((i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i.key}
          src={i.src}
          alt={i.alt}
          data-active={i.key === activeKey}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100"
        />
      ))}
    </div>
  );
}