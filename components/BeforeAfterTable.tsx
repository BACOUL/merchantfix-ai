import { beforeAfterRows } from "@/lib/fix-pack-sample-data";

export function BeforeAfterTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <table className="w-full min-w-[680px] border-separate border-spacing-y-2 text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="px-3 py-2 font-black">Before MerchantFix</th>
            <th className="px-3 py-2 font-black">After MerchantFix</th>
          </tr>
        </thead>
        <tbody>
          {beforeAfterRows.map((row) => (
            <tr key={row.before} className="bg-slate-50 font-semibold leading-6 text-slate-700">
              <td className="rounded-l-lg px-3 py-3 text-slate-950">{row.before}</td>
              <td className="rounded-r-lg px-3 py-3">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
