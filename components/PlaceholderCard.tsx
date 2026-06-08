type PlaceholderCardProps = {
  label: string;
  value: string;
};

export function PlaceholderCard({ label, value }: PlaceholderCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
