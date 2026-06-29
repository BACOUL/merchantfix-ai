import type { IssueFixType, ProductIssue } from "@/lib/types";

type AffectedProductsTableProps = {
  issues: ProductIssue[];
};

const severityClassName: Record<ProductIssue["severity"], string> = {
  critical: "bg-red-50 text-red-700 ring-red-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  info: "bg-emerald-50 text-emerald-800 ring-emerald-200"
};

const fixTypeLabel: Record<IssueFixType, string> = {
  auto_fixable: "Safe fix",
  manual_review: "Manual review",
  not_fixable_from_file: "Not fixable from CSV",
  informational: "Info",
  surface_risk_only: "Surface risk only"
};

const fixTypeClassName: Record<IssueFixType, string> = {
  auto_fixable: "bg-blue-50 text-blue-800 ring-blue-200",
  manual_review: "bg-amber-50 text-amber-900 ring-amber-200",
  not_fixable_from_file: "bg-slate-100 text-slate-700 ring-slate-200",
  informational: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  surface_risk_only: "bg-purple-50 text-purple-800 ring-purple-200"
};

const severityRank: Record<ProductIssue["severity"], number> = {
  critical: 0,
  warning: 1,
  info: 2
};

function formatIssueCode(issueCode: string) {
  return issueCode.replace(/_/g, " ");
}

export function AffectedProductsTable({ issues }: AffectedProductsTableProps) {
  if (issues.length === 0) {
    return (
      <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Affected products</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">No supported V1 product issues detected.</h3>
        <p className="mt-3 leading-7 text-emerald-900">
          MerchantFix.ai did not find supported identifier, title, description, image, price, availability, apparel, or data-quality issues in this CSV.
        </p>
      </section>
    );
  }

  const sortedIssues = [...issues].sort((a, b) => {
    const severityDifference = severityRank[a.severity] - severityRank[b.severity];
    if (severityDifference !== 0) {
      return severityDifference;
    }

    return a.rowNumber - b.rowNumber;
  });

  const criticalCount = issues.filter((issue) => issue.severity === "critical").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  const manualReviewCount = issues.filter((issue) => issue.manualReviewRequired).length;
  const systemOnly = issues.every((issue) => issue.category === "system");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">{systemOnly ? "CSV upload issue" : "Affected products"}</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
            {systemOnly ? "Fix the file first" : "Rows to fix or review first"}
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            {systemOnly
              ? "MerchantFix could not inspect product rows yet. Use the recovery action below, then upload a fresh Shopify product CSV export."
              : "Issues are sorted by severity so critical rows and manual review items are easier to handle before resubmission."}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700">Critical</p>
            <p className="mt-2 text-3xl font-black text-red-800">{criticalCount}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">Warnings</p>
            <p className="mt-2 text-3xl font-black text-amber-900">{warningCount}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">Manual review</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{manualReviewCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[1040px] border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="px-3 py-2 font-black">Priority</th>
              <th className="px-3 py-2 font-black">Row</th>
              <th className="px-3 py-2 font-black">Product</th>
              <th className="px-3 py-2 font-black">Issue</th>
              <th className="px-3 py-2 font-black">Field</th>
              <th className="px-3 py-2 font-black">Current value</th>
              <th className="px-3 py-2 font-black">Fix type</th>
              <th className="px-3 py-2 font-black">Recommended action</th>
            </tr>
          </thead>
          <tbody>
            {sortedIssues.map((issue) => (
              <tr key={`${issue.rowNumber}-${issue.issueCode}-${issue.field}`} className="bg-slate-50 font-semibold text-slate-700">
                <td className="rounded-l-lg px-3 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${severityClassName[issue.severity]}`}>
                    {issue.severity}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-700">{issue.rowNumber || "-"}</td>
                <td className="max-w-64 px-3 py-3 text-slate-950">{issue.productTitle || (systemOnly ? "CSV file" : "Untitled product")}</td>
                <td className="px-3 py-3 text-slate-700">{formatIssueCode(issue.issueCode)}</td>
                <td className="px-3 py-3 text-slate-700">{issue.field || "csv"}</td>
                <td className="max-w-48 px-3 py-3 text-slate-700">{issue.currentValue || "-"}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${fixTypeClassName[issue.fixType]}`}>
                    {fixTypeLabel[issue.fixType]}
                  </span>
                </td>
                <td className="rounded-r-lg px-3 py-3 text-slate-700">{issue.suggestedFix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}