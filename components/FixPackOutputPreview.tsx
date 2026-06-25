import { fixPackOutputs } from "@/lib/fix-pack-sample-data";

export function FixPackOutputPreview() {
  return (
    <div className="grid gap-3">
      {fixPackOutputs.map((output) => (
        <article key={output.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-black text-slate-950">{output.title}</h3>
          <p className="mt-2 leading-7 text-slate-600">{output.description}</p>
        </article>
      ))}
    </div>
  );
}
