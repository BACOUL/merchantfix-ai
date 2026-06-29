import Link from "next/link";
import type { MerchantCenterErrorDiagnosis } from "@/lib/merchant-center-errors";
import { getMerchantCenterGuideUrl } from "@/lib/merchant-center-guide-urls";

const severityStyles = {
  critical: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  limited: "border-slate-200 bg-slate-50 text-slate-700"
};

export function ErrorDiagnosisPreview({ diagnosis, submittedWarning }: { diagnosis: MerchantCenterErrorDiagnosis; submittedWarning?: string }) {
  const issue = diagnosis.issue;

  if (!issue) {
    return (
      <div className="rounded-[1.5rem] border-2 border-blue-300 bg-white p-5 shadow-2xl shadow-blue-950/30 md:p-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Diagnosis result</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{diagnosis.fallbackTitle}</h3>
          <p className="mt-3 leading-7 text-slate-600">{diagnosis.fallbackDescription}</p>
        </div>
        {submittedWarning ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Analyzed warning</p>
            <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-700">{submittedWarning}</p>
          </div>
        ) : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/supported-errors" className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800">
            View supported errors
          </Link>
          <Link href="/scan" className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-50">
            Run free scan
          </Link>
        </div>
      </div>
    );
  }

  const guideUrl = getMerchantCenterGuideUrl(issue);

  return (
    <div className="rounded-[1.5rem] border-2 border-blue-300 bg-white p-5 shadow-2xl shadow-blue-950/30 ring-4 ring-blue-200/30 md:p-6">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Diagnosis result</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{issue.label}</h3>
          </div>
          <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${severityStyles[issue.severity]}`}>
            {issue.severity === "limited" ? "Limited support" : issue.severity}
          </span>
        </div>
        <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{issue.shortDiagnosis}</p>
      </div>

      {submittedWarning ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Analyzed warning</p>
          <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-700">{submittedWarning}</p>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Likely Shopify fields</p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-700">
            {issue.likelyShopifyFields.map((field) => (
              <li key={field} className="rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                {field}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Safe actions</p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-emerald-950">
            {issue.safeActions.map((action) => (
              <li key={action} className="rounded-lg bg-white/70 px-3 py-2">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <p className="text-xs font-black uppercase tracking-[0.18em]">Do not do this</p>
        <ul className="mt-3 grid gap-2 text-sm font-bold leading-6">
          {issue.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <p className="font-semibold leading-7 text-blue-950">{issue.nextStep}</p>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link href={issue.ctaHref} className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800">
            {issue.ctaLabel}
          </Link>
          <Link href={guideUrl} className="inline-flex justify-center rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-50">
            Read guide
          </Link>
        </div>
      </div>
    </div>
  );
}
