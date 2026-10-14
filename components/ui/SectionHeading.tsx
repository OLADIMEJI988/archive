export function SectionHeading({
  id,
  children,
  action,
}: {
  id?: string;
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2
        id={id}
        data-reveal-title
        className="text-[clamp(30px,5vw,48px)] font-medium uppercase leading-none tracking-display"
      >
        {children}
      </h2>
      {action && (
        <span className="border-b-[0.67px] border-white pb-1 text-[16px] uppercase leading-[19px]">
          {action}
        </span>
      )}
    </div>
  );
}
