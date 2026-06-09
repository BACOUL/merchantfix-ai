type SectionProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
};

export function Section({ title, eyebrow, description, children }: SectionProps) {
  return (
    <section className="py-10 md:py-14">
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
      ) : null}
      <div className="grid min-w-0 gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
        <div className="min-w-0">
          <h2 className="break-words text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h2>
          {description ? <p className="mt-4 max-w-xl leading-7 text-slate-600">{description}</p> : null}
        </div>
        <div className="min-w-0 text-slate-700">{children}</div>
      </div>
    </section>
  );
}
