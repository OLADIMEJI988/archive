
type Props = {
  title: string;
  sentence: string;
  active: boolean;
  onActivate: () => void;
  revealDelay?: number;
};

export function ArchiveCategoryRow({
  title,
  sentence,
  active,
  onActivate,
  revealDelay = 0,
}: Props) {
  return (
    <li
      data-reveal="rise"
      style={{ "--d": `${revealDelay}ms` } as React.CSSProperties}
    >
      <button
        type="button"
        data-active={active}
        aria-pressed={active}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        className="flex w-full flex-col items-start gap-2 py-5 text-left transition-opacity duration-300 data-[active=false]:opacity-70 sm:flex-row sm:gap-1"
      >
        <span className="w-full text-[16px] uppercase leading-[19.2px] text-[#A6A6A6] sm:w-[160px] sm:shrink-0 lg:w-[225px]">
          {title}
        </span>

        <span className="w-full min-w-0 max-w-[450px] flex-1 text-[18px] leading-[21.6px] sm:w-auto min-[1400px]:max-[1900px]:!w-[590px] min-[1400px]:max-[1900px]:!max-w-none min-[1400px]:max-[1900px]:!flex-none">
          {sentence}
        </span>
      </button>
    </li>
  );
}
