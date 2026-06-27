"use client";

import type { MerchantFixReportModel, ReportDecisionStatus, ReportReadinessLabel, ReportRowFinding } from "@/lib/reportDataModel";

type MerchantFixReportPanelProps = {
  report: MerchantFixReportModel;
};

type Tone = "slate" | "blue" | "amber" | "red" | "emerald";

const scoreTone: Record<ReportReadinessLabel, Tone> = {
  ready: "emerald",
  review_needed: "amber",
  high_risk: "red",
  invalid_input: "slate"
};

const decisionTone: Record<ReportDecisionStatus, Tone> = {
  safe_note: "blue",
  manual_review: "amber",
  blocked: "red"
};

const toneClassNames: Record<Tone, string> = {
  slate: "border-slate-200 bg-slate-50 text-slate-900",
  blue: "border-blue-200 bg-blue-50 text-blue-900",
  amber: "border-amber-200 bg-amber-50 text-amber-950",
  red: "border-red-200 bg-red-50 text-red-900",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-900"
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function MetricCard({ label, value, detail, tone = "slate" }: { label: string; value: string | number; detail: string; tone?: Tone }) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${toneClassNames[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.14em] opacity-75">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-2 text-sm font-semibold leading-6 opacity-80">{detail}</p>
    </div>
  );
}

function DecisionCard({ label, title, items, tone }: { label: string; title: string; items: string[]; tone: Tone }) {
  return (
    <section className={`rounded-xl border p-5 shadow-sm ${toneClassNames[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em] opacity-75">{label}</p>
      <h3 className="mt-3 text-2xl font-black tracking-tight">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm font-bold leading-6">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-white/70 px-3 py-2 shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function severityRank(finding: ReportRowFinding) {
  if (finding.decisionStatus === "blocked") return 0;
  if (finding.severity === "critical") return 1;
  if (finding.decisionStatus === "manual_review") return 2;
  if (finding.severity === "warning") return 3;
  return 4;
}

function getPriorityFindings(report: MerchantFixReportModel) {
  return [...report.rowFindings].sort((a, b) => {
    const rankDiff = severityRank(a) - severityRank(b);
    if (rankDiff !== 0) return rankDiff;
    return a.rowNumber - b.rowNumber;
  });
}

function buildDoFirstActions(report: MerchantFixReportModel, priorityFindings: ReportRowFinding[]) {
  if (report.score.label === "invalid_input") {
    return [
      "Upload a fresh Shopify product CSV export before interpreting product-data results.",
      "Use the original Shopify export with standard columns. Do not upload feed-app, order, or customer exports.",
      "Run the diagnostic again after the CSV upload issue is fixed."
    ];
  }

  const actions = report.recommendedActions.slice(0, 3);
  if (actions.length >= 3) return actions;

  const fallback = priorityFindings.slice(0, 3).map((finding) => {
    const row = finding.rowNumber > 0 ? `Row ${finding.rowNumber}` : "CSV file";
    return `${row}: ${finding.suggestedAction}`;
  });

  return [...actions, ...fallback].slice(0, 3).length > 0
    ? [...actions, ...fallback].slice(0, 3)
    : ["Review the report summary, then inspect any rows marked manual_review or blocked before editing Shopify."];
}

function buildDoNotTouchYet(report: MerchantFixReportModel) {
  const items = new Set<string>();

  if (report.counts.blockedCount > 0) {
    items.add("Do not treat blocked rows as automatic fixes. They need a fresh file, broader review, or manual decision.");
  }

  if (report.counts.manualReviewCount > 0) {
    items.add("Do not edit manual_review rows until product facts are verified with real evidence.");
  }

  if (report.rowFindings.some((finding) => finding.issueCode.includes("gtin"))) {
    items.add("Do not invent, guess, replace, or copy GTIN values from SKU or unrelated products.");
  }

  if (report.rowFindings.some((finding) => finding.issueCode.includes("mpn") || finding.issueCode === "sku_same_as_mpn")) {
    items.add("Do not copy SKU into MPN unless it is truly the manufacturer part number.");
  }

  if (report.rowFindings.some((finding) => finding.issueCode.includes("brand"))) {
    items.add("Do not invent a brand or bulk-apply a store name without checking product truth.");
  }

  if (report.rowFindings.some((finding) => finding.issueCode === "identifier_exists_conflict" || finding.issueCode === "possible_custom_product")) {
    items.add("Do not change identifier_exists in bulk until custom-product status and identifier availability are verified.");
  }

  return Array.from(items).slice(0, 4).length > 0
    ? Array.from(items).slice(0, 4)
    : ["Do not resubmit products blindly. Keep a backup CSV and verify any unclear product fact first."];
}

function buildEvidenceChecklist(report: MerchantFixReportModel) {
  const evidence = report.rowFindings
    .filter((finding) => finding.decisionStatus !== "safe_note")
    .flatMap((finding) => finding.evidenceNeeded)
    .filter(Boolean);

  const uniqueEvidence = Array.from(new Set(evidence)).slice(0, 6);

  return uniqueEvidence.length > 0
    ? uniqueEvidence
    : ["Shopify admin product data", "Live storefront product page", "Supplier or manufacturer product data"];
}

function buildNextSafeStep(report: MerchantFixReportModel) {
  if (report.score.label === "invalid_input") {
    return ["Fix the CSV upload first, then rerun the diagnosis before making product-data changes."];
  }

  if (report.counts.blockedCount > 0) {
    return ["Start with blocked rows because they are not safe to automate from CSV data alone."];
  }

  if (report.counts.manualReviewCount > 0) {
    return ["Start with manual_review rows and collect the evidence listed in the report before editing Shopify."];
  }

  if (report.counts.totalFindings > 0) {
    return ["Review safe_note rows, keep a backup CSV, and apply only deterministic changes you understand."];
  }

  return ["Keep the report as a baseline. No major supported CSV issue was detected, but approval is not guaranteed."];
}

export function MerchantFixReportPanel({ report }: MerchantFixReportPanelProps) {
  const scoreCardTone = scoreTone[report.score.label];
  const priorityFindings = getPriorityFindings(report);
  const visibleFindings = priorityFindings.slice(0, 12);
  const doFirstActions = buildDoFirstActions(report, priorityFindings);
  const doNotTouchYet = buildDoNotTouchYet(report);
  const evidenceChecklist = buildEvidenceChecklist(report);
  const nextSafeStep = buildNextSafeStep(report);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Decision report</p>
          <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Product Data Readiness report
          </h2>
          <p className="mt-4 leading-7 text-slate-700">{report.summary}</p>
          <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600">
            <p>Report ID: <span className="font-mono text-slate-950">{report.reportId}</span></p>
            <p>Generated: {formatDate(report.generatedAt)}</p>
            {report.csvFilename ? <p>CSV file: {report.csvFilename}</p> : null}
            <p>Method: {report.methodVersion}</p>
          </div>
        </div>

        <aside className={`rounded-2xl border p-5 shadow-sm ${toneClassNames[scoreCardTone]}`}>
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-75">Internal readiness score</p>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-6xl font-black tracking-tight">{report.score.score}</p>
            <p className="pb-2 text-xl font-black">/100</p>
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-tight">{report.score.title}</h3>
          <p className="mt-3 font-semibold leading-7 opacity-90">{report.score.explanation}</p>
          <p className="mt-4 rounded-xl bg-white/70 px-3 py-2 text-sm font-black">
            This is a MerchantFix product-data readiness score, not a Google score.
          </p>
        </aside>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <DecisionCard label="Do this first" title="Top priority actions" items={doFirstActions} tone="blue" />
        <DecisionCard label="Do not touch yet" title="Unsafe shortcuts to avoid" items={doNotTouchYet} tone={report.counts.blockedCount > 0 ? "red" : "amber"} />
        <DecisionCard label="Evidence checklist" title="Proof to collect" items={evidenceChecklist} tone="amber" />
        <DecisionCard label="Next safe step" title="What to do next" items={nextSafeStep} tone="emerald" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Products analyzed" value={report.counts.totalProducts} detail="Rows processed from the Shopify CSV" />
        <MetricCard label="Findings" value={report.counts.totalFindings} detail="Detected product-data issues" tone={report.counts.totalFindings > 0 ? "amber" : "emerald"} />
        <MetricCard label="Manual review" value={report.counts.manualReviewCount} detail="Rows that need evidence" tone={report.counts.manualReviewCount > 0 ? "amber" : "emerald"} />
        <MetricCard label="Blocked" value={report.counts.blockedCount} detail="Not safe to automate" tone={report.counts.blockedCount > 0 ? "red" : "emerald"} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Top issues</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">What appears most often</h3>
          {report.topIssues.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {report.topIssues.map((issue) => (
                <div key={issue.issueCode} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-black text-slate-950">{issue.label}</p>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{issue.count}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    Severity: {issue.severity} · Category: {issue.category}
                  </p>
                  {issue.affectedRows.length > 0 ? (
                    <p className="mt-2 text-xs font-bold text-slate-500">Rows: {issue.affectedRows.slice(0, 10).join(", ")}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 leading-7 text-slate-600">No supported top issue was detected.</p>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Credibility rules</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Why this is not vague advice</h3>
          <div className="mt-4 grid gap-3">
            {report.credibilityRules.map((rule) => (
              <div key={rule.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-black text-slate-950">{rule.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{rule.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Priority row findings</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Rows sorted by decision risk</h3>
          </div>
          <p className="text-sm font-bold text-slate-500">Showing first {visibleFindings.length} of {report.rowFindings.length} findings</p>
        </div>

        {visibleFindings.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-[1080px] w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Row</th>
                  <th className="px-4 py-3 font-black">Product</th>
                  <th className="px-4 py-3 font-black">Issue</th>
                  <th className="px-4 py-3 font-black">Decision</th>
                  <th className="px-4 py-3 font-black">Action</th>
                  <th className="px-4 py-3 font-black">Evidence needed</th>
                </tr>
              </thead>
              <tbody>
                {visibleFindings.map((finding, index) => (
                  <tr key={`${finding.rowNumber}-${finding.issueCode}-${index}`} className="border-t border-slate-200 align-top">
                    <td className="px-4 py-3 font-mono font-black text-slate-900">{finding.rowNumber || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {finding.productTitle || (finding.source === "system" ? "CSV file" : "Unknown product")}
                      {finding.productHandle ? <span className="block text-xs text-slate-500">{finding.productHandle}</span> : null}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-black text-slate-950">{finding.issueLabel}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{finding.field || "csv"} · {finding.severity}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${toneClassNames[decisionTone[finding.decisionStatus]]}`}>
                        {finding.decisionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold leading-6 text-slate-700">{finding.suggestedAction}</td>
                    <td className="px-4 py-3 font-semibold leading-6 text-slate-700">
                      {finding.evidenceNeeded.slice(0, 3).join(" · ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-900">
            No row-level finding was generated for the supported checks.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <p className="text-xs font-black uppercase tracking-[0.18em]">Report limits</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight">What this report must not pretend</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {report.limitations.map((limitation) => (
            <div key={limitation} className="rounded-lg border border-amber-200 bg-white px-4 py-3 text-sm font-bold leading-6">
              {limitation}
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-black leading-6">{report.disclaimer}</p>
      </section>

      <section className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <p className="text-xs font-black uppercase tracking-[0.18em]">Later delivery layer</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight">PDF export comes after this report page.</h3>
        <p className="mt-3 font-semibold leading-7">
          This HTML report is the source that a later PDF export can convert into a clean customer deliverable. The current launch scope is the on-screen report plus annotated CSV when safe output is available.
        </p>
      </section>
    </section>
  );
}
