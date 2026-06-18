import Link from "next/link";
import { supportedMerchantCenterErrors } from "@/lib/merchant-center-errors";

const supportLabels = {
  supported: "Supported",
  partial: "Partial",
  limited: "Limited"
};

export function SupportedErrorsTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="px-3 py-2 font-black">Merchant Center warning</th>
            <th className="px-3 py-2 font-black">Support</th>
            <th className="px-3 py-2 font-black">Needs CSV?</th>
            <th className="px-3 py-2 font-black">What MerchantFix checks</th>
            <th className="px-3 py-2 font-black">Next step</th>
          </tr>
        </thead>
        <tbody>
          {supportedMerchantCenterErrors.map((issue) => (
            <tr key={issue.id} className="bg-slate-50 font-semibold leading-6 text-slate-700">
              <td className="rounded-l-lg px-3 py-3 text-slate-950">{issue.exactWarning}</td>
              <td className="px-3 py-3">{supportLabels[issue.supportedLevel]}</td>
              <td className="px-3 py-3">{issue.needsCsv ? "Usually yes" : "Not always"}</td>
              <td className="px-3 py-3">{issue.shortDiagnosis}</td>
              <td className="rounded-r-lg px-3 py-3">
                <Link href={issue.ctaHref} className="font-black text-blue-700 hover:text-blue-900">
                  {issue.ctaLabel}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
