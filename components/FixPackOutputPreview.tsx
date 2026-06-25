import { fixPackOutputs } from "@/lib/fix-pack-sample-data";

export function FixPackOutputPreview() {
  return (
    <div className="grid gap-3">
      {fixPackOutputs.map((output, index) => (
        <article key={output.title} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70">
          <div className="flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-black tracking-tight text-slate-950">{output.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{output.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
