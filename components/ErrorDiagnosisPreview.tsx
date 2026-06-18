import Link from "next/link";
import type { MerchantCenterErrorDiagnosis } from "@/lib/merchant-center-errors";

const severityStyles = {
  critical: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  limited: "border-slate-200 bg-slate-50 text-slate-700"
};

export function ErrorDiagnosisPreview({ diagnosis }: { diagnosis: MerchantCenterErrorDiagnosis }) {
  const issue = diagnosis.issue;

  if (!issue) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Instant diagnosis</p>
        <h3 className="mt-3 text-2xl font-black text-slate-950">{diagnosis.fallbackTitle}</h3>
        <p className="mt-3 leading-7 text-slate-600">{diagnosis.fallbackDescription}</p>
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Detected issue</p>
          <h3 className="mt-3 text-2xl font-black text-slate-950">{issue.label}</h3>
        </div>
        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${severityStyles[issue.severity]}`}>
          {issue.severity === "limited" ? "Limited support" : issue.severity}
        </span>
      </div>

      <p className="mt-4 leading-7 text-slate-600">{issue.shortDiagnosis}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Likely Shopify fields</p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-700">
            {issue.likelyShopifyFields.map((field) => (
              <li key={field} className="rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                {field}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
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

      <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <p className="text-xs font-black uppercase tracking-[0.18em]">Do not do this</p>
        <ul className="mt-3 grid gap-2 text-sm font-bold leading-6">
          {issue.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <p className="font-semibold leading-7 text-blue-950">{issue.nextStep}</p>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link href={issue.ctaHref} className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800">
            {issue.ctaLabel}
          </Link>
          <Link href={issue.guideUrl} className="inline-flex justify-center rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-50">
            Read guide
          </Link>
        </div>
      </div>
    </div>
  );
}
