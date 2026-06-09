import type { ProductIssue } from "@/lib/types";

type AffectedProductsTableProps = {
  issues: ProductIssue[];
};

const severityClassName: Record<ProductIssue["severity"], string> = {
  critical: "bg-red-50 text-red-700 ring-red-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  info: "bg-emerald-50 text-emerald-800 ring-emerald-200"
};

export function AffectedProductsTable({ issues }: AffectedProductsTableProps) {
  if (issues.length === 0) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black text-slate-950">Affected products</h3>
        <p className="mt-2 text-slate-700">No supported V1 product issues were detected.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-black text-slate-950">Affected products</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Row</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Product</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Issue</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Severity</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Field</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Current value</th>
              <th className="min-w-72 px-3 py-2 font-semibold">Suggested fix</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Manual review</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={`${issue.rowNumber}-${issue.issueCode}-${issue.field}`} className="border-b border-slate-100">
                <td className="px-3 py-3 text-slate-700">{issue.rowNumber || "-"}</td>
                <td className="px-3 py-3 text-slate-900">{issue.productTitle || "Untitled product"}</td>
                <td className="px-3 py-3 text-slate-700">{issue.issueCode.replace(/_/g, " ")}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${severityClassName[issue.severity]}`}>
                    {issue.severity}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-700">{issue.field || "csv"}</td>
                <td className="px-3 py-3 text-slate-700">{issue.currentValue || "-"}</td>
                <td className="px-3 py-3 text-slate-700">{issue.suggestedFix}</td>
                <td className="px-3 py-3 font-semibold text-slate-800">
                  {issue.manualReviewRequired ? "Manual review required" : "Not required"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
