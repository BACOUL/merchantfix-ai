type RecommendedActionsProps = {
  actions: string[];
};

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  return (
    <section className="rounded-lg border border-blue-200 bg-blue-50/70 p-5">
      <h3 className="text-lg font-black text-slate-950">Recommended actions</h3>
      <ul className="mt-3 grid gap-2 text-sm font-medium text-slate-700">
        {actions.map((action) => (
          <li key={action} className="rounded-lg border border-blue-100 bg-white px-3 py-2">
            {action}
          </li>
        ))}
      </ul>
    </section>
  );
}
