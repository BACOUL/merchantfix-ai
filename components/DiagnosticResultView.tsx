"use client";

import { AffectedProductsTable } from "./AffectedProductsTable";
import { DiagnosticSummaryCards } from "./DiagnosticSummaryCards";
import { RecommendedActions } from "./RecommendedActions";
import type { AnalysisResult, CorrectedCsvResult } from "@/lib/types";

type DiagnosticResultViewProps = {
  analysis: AnalysisResult;
  correctedCsvResult?: CorrectedCsvResult | null;
};

export function DiagnosticResultView({ analysis, correctedCsvResult }: DiagnosticResultViewProps) {
  function downloadCorrectedCsv() {
    if (!correctedCsvResult?.correctedCsv) {
      return;
    }

    const blob = new Blob([correctedCsvResult.correctedCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `merchantfix-corrected-${analysis.sessionId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 md:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">MerchantFix.ai V1</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">MerchantFix Diagnostic Result</h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">{analysis.summary}</p>

      <div className="mt-6">
        <DiagnosticSummaryCards analysis={analysis} />
      </div>

      {analysis.detectedCategories.length > 0 ? (
        <p className="mt-5 text-sm font-medium text-slate-600">
          Detected categories: {analysis.detectedCategories.join(", ")}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5">
        <RecommendedActions actions={analysis.recommendedActions} />

        {analysis.issues.some((issue) => issue.manualReviewRequired) ? (
          <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h3 className="text-lg font-bold">Manual review required</h3>
            <p className="mt-2 leading-7">
              MerchantFix.ai cannot safely verify or invent product identifiers. Review these rows before resubmitting
              products to Google Merchant Center.
            </p>
          </section>
        ) : null}

        {correctedCsvResult?.correctedCsv ? (
          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="text-lg font-bold text-emerald-950">Corrected CSV available</h3>
            <p className="mt-2 leading-7 text-emerald-900">
              The V1 corrected CSV adds MerchantFix.ai notes and manual review actions. It does not invent GTIN, MPN, or
              brand values.
            </p>
            <button
              type="button"
              onClick={downloadCorrectedCsv}
              className="mt-4 rounded-full bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
            >
              Download Corrected CSV
            </button>
          </section>
        ) : null}

        <AffectedProductsTable issues={analysis.issues} />

        <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          {analysis.disclaimer}
        </aside>
      </div>
    </section>
  );
}
