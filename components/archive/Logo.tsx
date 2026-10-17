export function LogoMark({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <polygon data-logo-part="top" points="17.07,10 102.93,10 60,52.93" />
      <polygon data-logo-part="left" points="10,17.07 55,62.07 55,110 10,110" />
      <polygon data-logo-part="right" points="110,17.07 65,62.07 65,110 110,110" />
    </svg>
  );
}
export function Logo({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-medium uppercase tracking-display text-[15px] leading-[18px]">
      <LogoMark size={size} />
      <span>Archive</span>
    </span>
  );
}
