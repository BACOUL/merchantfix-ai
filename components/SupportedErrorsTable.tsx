import Link from "next/link";
import { supportedMerchantCenterErrors } from "@/lib/merchant-center-errors";

const supportLabels = {
  supported: "Strong",
  partial: "Partial",
  limited: "Limited"
};

const supportStyles = {
  supported: "border-emerald-200 bg-emerald-50 text-emerald-800",
  partial: "border-blue-200 bg-blue-50 text-blue-800",
  limited: "border-amber-200 bg-amber-50 text-amber-900"
};

const supportMeaning = {
  supported: "CSV diagnosis is a strong fit.",
  partial: "Useful, but needs live/settings review.",
  limited: "Not a full automated fix."
};

export function SupportedErrorsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <table className="w-full min-w-[1120px] border-separate border-spacing-y-2 text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="px-3 py-2 font-black">Merchant Center warning</th>
            <th className="px-3 py-2 font-black">Support level</th>
            <th className="px-3 py-2 font-black">CSV fit</th>
            <th className="px-3 py-2 font-black">What MerchantFix checks</th>
            <th className="px-3 py-2 font-black">Best next step</th>
          </tr>
        </thead>
        <tbody>
          {supportedMerchantCenterErrors.map((issue) => (
            <tr key={issue.id} className="bg-slate-50 font-semibold leading-6 text-slate-700 shadow-sm">
              <td className="rounded-l-xl px-3 py-4 text-slate-950">
                <p className="font-black">{issue.exactWarning}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{issue.label}</p>
              </td>
              <td className="px-3 py-4">
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${supportStyles[issue.supportedLevel]}`}>
                  {supportLabels[issue.supportedLevel]}
                </span>
                <p className="mt-2 max-w-[180px] text-xs font-semibold leading-5 text-slate-500">{supportMeaning[issue.supportedLevel]}</p>
              </td>
              <td className="px-3 py-4">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700">
                  {issue.needsCsv ? "CSV recommended" : "CSV optional"}
                </span>
              </td>
              <td className="px-3 py-4">{issue.shortDiagnosis}</td>
              <td className="rounded-r-xl px-3 py-4">
                <div className="flex flex-col gap-2">
                  <Link href={issue.ctaHref} className="font-black text-blue-700 hover:text-blue-900">
                    {issue.ctaLabel}
                  </Link>
                  <Link href={issue.guideUrl} className="text-xs font-black text-slate-500 hover:text-slate-900">
                    Read guide
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
