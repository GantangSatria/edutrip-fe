type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-7 flex w-full max-w-[24rem] flex-col items-center px-4 text-center sm:mb-8 sm:max-w-[32rem]">
      <h2 className="text-[1.45rem] leading-tight font-semibold tracking-tight text-slate-900 sm:text-[1.7rem] lg:text-[1.9rem]">
        {title}
      </h2>
      <p className="mt-2 text-[0.72rem] text-muted sm:text-xs">{subtitle}</p>
    </div>
  );
}