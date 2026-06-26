"use client";

import { AffectedProductsTable } from "./AffectedProductsTable";
import { DiagnosticSummaryCards } from "./DiagnosticSummaryCards";
import { MerchantFixReportPanel } from "./MerchantFixReportPanel";
import { RecommendedActions } from "./RecommendedActions";
import type { MerchantFixReportModel } from "@/lib/reportDataModel";
import type { AnalysisResult, CorrectedCsvResult, IssueCategory } from "@/lib/types";

type DiagnosticResultViewProps = {
  analysis: AnalysisResult;
  correctedCsvResult?: CorrectedCsvResult | null;
  reportModel?: MerchantFixReportModel | null;
};

const categoryLabel: Record<IssueCategory, string> = {
  surface_scan: "Surface scan",
  identifier: "Identifiers",
  brand: "Brand",
  image: "Images",
  price: "Prices",
  data_quality: "Data quality",
  manual_review: "Manual review",
  system: "System"
};

function diagnosticStatus(analysis: AnalysisResult) {
  if (analysis.criticalCount > 0) {
    return {
      label: "Critical cleanup required",
      description: "Fix or manually review critical product data issues before resubmitting affected products.",
      className: "border-red-200 bg-red-50 text-red-800"
    };
  }

  if (analysis.warningCount > 0) {
    return {
      label: "Cleanup recommended",
      description: "Warnings were detected. Review the affected rows before making feed changes.",
      className: "border-amber-200 bg-amber-50 text-amber-900"
    };
  }

  return {
    label: "No major supported issues detected",
    description: "MerchantFix.ai did not detect critical supported V1 product data issues in this CSV.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900"
  };
}

export function DiagnosticResultView({ analysis, correctedCsvResult, reportModel }: DiagnosticResultViewProps) {
  const status = diagnosticStatus(analysis);
  const manualReviewCount = analysis.issues.filter((issue) => issue.manualReviewRequired).length;
  const safeFixCount = analysis.issues.filter((issue) => issue.autoFixable || issue.fixType === "auto_fixable").length;
  const hasAnnotatedCsv = Boolean(correctedCsvResult?.correctedCsv);
  const generatedAt = new Date(analysis.createdAt).toLocaleString();

  function downloadAnnotatedCsv() {
    if (!correctedCsvResult?.correctedCsv) {
      return;
    }

    const blob = new Blob([correctedCsvResult.correctedCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `merchantfix-annotated-${analysis.sessionId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm md:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">MerchantFix.ai diagnostic report</p>
            <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Shopify CSV product data report
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">{analysis.summary}</p>
            <p className="mt-3 text-sm font-semibold text-slate-500">Report ID: {analysis.sessionId} · Generated: {generatedAt}</p>
          </div>

          <aside className={`rounded-xl border p-5 shadow-sm ${status.className}`}>
            <p className="text-xs font-black uppercase tracking-[0.18em] opacity-75">Status</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight">{status.label}</h3>
            <p className="mt-3 leading-7 font-semibold opacity-90">{status.description}</p>
          </aside>
        </div>

        <div className="mt-6">
          <DiagnosticSummaryCards analysis={analysis} />
        </div>
      </div>

      {reportModel ? (
        <div className="mt-5">
          <MerchantFixReportPanel report={reportModel} />
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Issue coverage</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Detected categories</h3>
          {analysis.detectedCategories.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.detectedCategories.map((category) => (
                <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-700">
                  {categoryLabel[category]}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 leading-7 text-slate-600">No supported issue category was detected in this CSV.</p>
          )}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Safe fixes</p>
              <p className="mt-2 text-3xl font-black text-blue-900">{safeFixCount}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Deterministic changes only.</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">Manual review</p>
              <p className="mt-2 text-3xl font-black text-amber-900">{manualReviewCount}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-amber-900">Rows that must not be guessed.</p>
            </div>
          </div>
        </section>

        <RecommendedActions actions={analysis.recommendedActions} />
      </div>

      <div className="mt-5 grid gap-5">
        {manualReviewCount > 0 ? (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em]">Manual review required</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">Do not guess product identifiers.</h3>
            <p className="mt-3 leading-7 font-semibold">
              MerchantFix.ai cannot safely verify or invent GTIN, MPN, brand, price, or product identifiers. Review flagged rows before resubmitting products.
            </p>
          </section>
        ) : null}

        {hasAnnotatedCsv ? (
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Annotated CSV available</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">Download CSV notes and safe deterministic changes.</h3>
                <p className="mt-3 leading-7 text-emerald-900">
                  The annotated CSV preserves original product data, adds MerchantFix.ai notes, and only applies deterministic changes when safe. It does not invent GTIN, MPN, brand, or price values.
                </p>
                <div className="mt-4 grid gap-3 text-sm font-bold text-emerald-950 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/70 px-3 py-2">Notes/changes: {correctedCsvResult?.changes.length ?? 0}</div>
                  <div className="rounded-lg bg-white/70 px-3 py-2">Manual rows: {correctedCsvResult?.manualReviewRows.length ?? 0}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={downloadAnnotatedCsv}
                className="rounded-full bg-emerald-700 px-5 py-3 font-black text-white transition hover:bg-emerald-800"
              >
                Download annotated CSV
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">CSV export</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">No annotated CSV generated.</h3>
            <p className="mt-3 leading-7 text-slate-600">
              MerchantFix.ai only generates an annotated CSV when safe notes or deterministic changes are available.
            </p>
          </section>
        )}

        <AffectedProductsTable issues={analysis.issues} />

        <aside className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-950">
          {analysis.disclaimer}
        </aside>
      </div>
    </section>
  );
}
