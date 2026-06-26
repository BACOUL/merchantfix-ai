import { sampleReportRows } from "@/lib/fix-pack-sample-data";

const severityTone: Record<string, string> = {
  Critical: "border-red-200 bg-red-50 text-red-800",
  Warning: "border-amber-200 bg-amber-50 text-amber-900",
  "Manual review": "border-blue-200 bg-blue-50 text-blue-800"
};

const guardrailTone: Record<string, string> = {
  safe_note: "border-emerald-200 bg-emerald-50 text-emerald-800",
  manual_review: "border-blue-200 bg-blue-50 text-blue-800",
  blocked: "border-red-200 bg-red-50 text-red-800"
};

export function SampleReportTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-950 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Demo report table</p>
          <p className="mt-1 font-black">Five-row preview from a full fictional diagnostic</p>
        </div>
        <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-slate-200">Fictional data</span>
      </div>
      <div className="overflow-x-auto p-2">
        <table className="w-full min-w-[1500px] border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="px-3 py-2 font-black">Row</th>
              <th className="px-3 py-2 font-black">Product handle</th>
              <th className="px-3 py-2 font-black">Google issue</th>
              <th className="px-3 py-2 font-black">Severity</th>
              <th className="px-3 py-2 font-black">Current value</th>
              <th className="px-3 py-2 font-black">Detected problem</th>
              <th className="px-3 py-2 font-black">merchantfix_status</th>
              <th className="px-3 py-2 font-black">merchantfix_action</th>
              <th className="px-3 py-2 font-black">Evidence needed</th>
            </tr>
          </thead>
          <tbody>
            {sampleReportRows.map((row) => (
              <tr key={`${row.row}-${row.handle}`} className="bg-slate-50 font-semibold leading-6 text-slate-700 shadow-sm">
                <td className="rounded-l-xl px-3 py-4 text-slate-950">{row.row}</td>
                <td className="px-3 py-4 font-black text-slate-950">{row.handle}</td>
                <td className="px-3 py-4">{row.googleIssue}</td>
                <td className="px-3 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black ${severityTone[row.severity] ?? "border-slate-200 bg-white text-slate-700"}`}>
                    {row.severity}
                  </span>
                </td>
                <td className="px-3 py-4 text-slate-950">{row.currentValue}</td>
                <td className="px-3 py-4">{row.detectedProblem}</td>
                <td className="px-3 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-xs font-black ${guardrailTone[row.guardrailStatus] ?? "border-slate-200 bg-white text-slate-700"}`}>
                    {row.guardrailStatus}
                  </span>
                </td>
                <td className="px-3 py-4 font-mono text-xs font-black text-slate-950">{row.merchantfixAction}</td>
                <td className="rounded-r-xl px-3 py-4">{row.evidenceNeeded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
