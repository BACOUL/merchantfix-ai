import type { AnalysisResult } from "@/lib/types";

type DiagnosticSummaryCardsProps = {
  analysis: AnalysisResult;
};

export function DiagnosticSummaryCards({ analysis }: DiagnosticSummaryCardsProps) {
  const manualReviewCount = analysis.issues.filter((issue) => issue.manualReviewRequired).length;
  const cards = [
    { label: "Products analyzed", value: analysis.totalProducts },
    { label: "Critical issues", value: analysis.criticalCount },
    { label: "Warnings", value: analysis.warningCount },
    { label: "Manual review items", value: manualReviewCount },
    { label: "Info items", value: analysis.infoCount },
    { label: "Corrected CSV", value: analysis.correctedCsvAvailable ? "Available" : "Not needed" }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{card.value}</p>
        </div>
      ))}
    </section>
  );
}
