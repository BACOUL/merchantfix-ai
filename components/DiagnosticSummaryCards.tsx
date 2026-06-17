import type { AnalysisResult } from "@/lib/types";

type DiagnosticSummaryCardsProps = {
  analysis: AnalysisResult;
};

type CardTone = "slate" | "red" | "amber" | "blue" | "emerald";

const toneClassNames: Record<CardTone, string> = {
  slate: "border-slate-200 bg-white text-slate-950",
  red: "border-red-200 bg-red-50 text-red-800",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  blue: "border-blue-200 bg-blue-50 text-blue-900",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-900"
};

function calculateHealthScore(analysis: AnalysisResult) {
  if (analysis.totalProducts <= 0) {
    return 0;
  }

  const rawScore = 100 - analysis.criticalCount * 8 - analysis.warningCount * 3 - analysis.infoCount;
  return Math.max(0, Math.min(100, rawScore));
}

function healthLabel(score: number) {
  if (score >= 85) {
    return "Strong";
  }

  if (score >= 65) {
    return "Needs cleanup";
  }

  if (score >= 40) {
    return "High risk";
  }

  return "Critical cleanup";
}

export function DiagnosticSummaryCards({ analysis }: DiagnosticSummaryCardsProps) {
  const manualReviewCount = analysis.issues.filter((issue) => issue.manualReviewRequired).length;
  const safeFixCount = analysis.issues.filter((issue) => issue.autoFixable || issue.fixType === "auto_fixable").length;
  const healthScore = calculateHealthScore(analysis);
  const statusTone: CardTone = analysis.criticalCount > 0 ? "red" : analysis.warningCount > 0 ? "amber" : "emerald";

  const cards: Array<{ label: string; value: string | number; detail: string; tone: CardTone }> = [
    {
      label: "Catalog health score",
      value: `${healthScore}/100`,
      detail: healthLabel(healthScore),
      tone: statusTone
    },
    {
      label: "Products analyzed",
      value: analysis.totalProducts,
      detail: "Rows processed from the uploaded CSV",
      tone: "slate"
    },
    {
      label: "Critical issues",
      value: analysis.criticalCount,
      detail: "Fix or review before resubmission",
      tone: analysis.criticalCount > 0 ? "red" : "emerald"
    },
    {
      label: "Warnings",
      value: analysis.warningCount,
      detail: "Product data quality risks",
      tone: analysis.warningCount > 0 ? "amber" : "emerald"
    },
    {
      label: "Manual review",
      value: manualReviewCount,
      detail: "Rows that must not be guessed",
      tone: manualReviewCount > 0 ? "amber" : "emerald"
    },
    {
      label: "Safe fixes",
      value: safeFixCount,
      detail: analysis.correctedCsvAvailable ? "Corrected CSV can be downloaded" : "No deterministic CSV change needed",
      tone: analysis.correctedCsvAvailable ? "blue" : "slate"
    }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl border p-4 shadow-sm ${toneClassNames[card.tone]}`}>
          <p className="text-xs font-black uppercase tracking-[0.14em] opacity-75">{card.label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight">{card.value}</p>
          <p className="mt-2 text-sm font-semibold leading-6 opacity-80">{card.detail}</p>
        </div>
      ))}
    </section>
  );
}
