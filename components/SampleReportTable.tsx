import { sampleReportRows } from "@/lib/fix-pack-sample-data";

const severityTone: Record<string, string> = {
  Critical: "border-red-200 bg-red-50 text-red-800",
  Warning: "border-amber-200 bg-amber-50 text-amber-900",
  "Manual review": "border-blue-200 bg-blue-50 text-blue-800"
};

export function SampleReportTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="px-3 py-2 font-black">Row</th>
            <th className="px-3 py-2 font-black">Product handle</th>
            <th className="px-3 py-2 font-black">Google issue</th>
            <th className="px-3 py-2 font-black">Severity</th>
            <th className="px-3 py-2 font-black">Why it matters</th>
            <th className="px-3 py-2 font-black">Safe action</th>
          </tr>
        </thead>
        <tbody>
          {sampleReportRows.map((row) => (
            <tr key={`${row.row}-${row.handle}`} className="bg-slate-50 font-semibold leading-6 text-slate-700">
              <td className="rounded-l-lg px-3 py-3 text-slate-950">{row.row}</td>
              <td className="px-3 py-3 text-slate-950">{row.handle}</td>
              <td className="px-3 py-3">{row.googleIssue}</td>
              <td className="px-3 py-3">
                <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-black ${severityTone[row.severity] ?? "border-slate-200 bg-white text-slate-700"}`}>
                  {row.severity}
                </span>
              </td>
              <td className="px-3 py-3">{row.whyItMatters}</td>
              <td className="rounded-r-lg px-3 py-3">{row.safeAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
