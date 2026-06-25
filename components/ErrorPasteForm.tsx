"use client";

import { useMemo, useState } from "react";
import { diagnoseMerchantCenterError } from "@/lib/merchant-center-errors";
import { ErrorDiagnosisPreview } from "./ErrorDiagnosisPreview";

const examples = [
  "Missing value [gtin]",
  "Invalid value [gtin]",
  "Missing value [brand]",
  "identifier_exists conflict",
  "Mismatched value [price]",
  "Misrepresentation"
];

export function ErrorPasteForm() {
  const [warningText, setWarningText] = useState("Missing value [gtin]");
  const diagnosis = useMemo(() => diagnoseMerchantCenterError(warningText), [warningText]);

  return (
    <section id="paste-error" className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-slate-200/70">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Free first step</p>
          <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Paste the exact warning. See what Shopify fields matter.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            MerchantFix turns a Merchant Center warning into a focused diagnosis path: likely field, risk level, safe next action, and whether CSV rows are needed.
          </p>

          <label htmlFor="merchant-center-warning" className="mt-7 block text-sm font-black text-slate-950">
            Merchant Center warning
          </label>
          <textarea
            id="merchant-center-warning"
            value={warningText}
            onChange={(event) => setWarningText(event.target.value)}
            rows={6}
            placeholder="Example: Missing value [gtin]"
            className="mt-2 w-full min-w-0 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-900 shadow-inner outline-none ring-blue-500 transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setWarningText(example)}
                className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-black text-blue-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-4 md:p-6">
          <ErrorDiagnosisPreview diagnosis={diagnosis} />
        </div>
      </div>
    </section>
  );
}
