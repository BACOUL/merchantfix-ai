type RecommendedActionsProps = {
  actions: string[];
};

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm md:p-6">
      <div className="grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Priority action plan</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">What to do next</h3>
          <p className="mt-3 leading-7 text-slate-700">
            Follow these steps before changing your feed or resubmitting affected products.
          </p>
        </div>
        <ol className="grid gap-3 text-sm font-semibold text-slate-700">
          {actions.map((action, index) => (
            <li key={action} className="grid gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:grid-cols-[auto_1fr]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">
                {index + 1}
              </span>
              <span className="leading-7">{action}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
