type SectionProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function Section({ title, eyebrow, children }: SectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-5 text-slate-700">{children}</div>
    </section>
  );
}
