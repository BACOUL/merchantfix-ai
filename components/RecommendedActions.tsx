type RecommendedActionsProps = {
  actions: string[];
};

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-950">Recommended actions</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        {actions.map((action) => (
          <li key={action}>{action}</li>
        ))}
      </ul>
    </section>
  );
}
