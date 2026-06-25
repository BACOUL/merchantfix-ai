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
    <section id="paste-error" className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Free first step</p>
          <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Paste your Google Merchant Center warning.
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            MerchantFix detects the likely issue, shows the Shopify fields to check, and tells you when a CSV-level Fix Pack is needed.
          </p>

          <label htmlFor="merchant-center-warning" className="mt-6 block text-sm font-black text-slate-950">
            Merchant Center warning
          </label>
          <textarea
            id="merchant-center-warning"
            value={warningText}
            onChange={(event) => setWarningText(event.target.value)}
            rows={5}
            placeholder="Example: Missing value [gtin]"
            className="mt-2 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none ring-blue-500 transition placeholder:text-slate-400 focus:ring-2"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setWarningText(example)}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black text-blue-800 transition hover:bg-blue-100"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <ErrorDiagnosisPreview diagnosis={diagnosis} />
      </div>
    </section>
  );
}
