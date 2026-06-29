"use client";

import { FormEvent, useRef, useState } from "react";
import { diagnoseMerchantCenterError } from "@/lib/merchant-center-errors";
import { ErrorDiagnosisPreview } from "./ErrorDiagnosisPreview";

const examples = [
  "Missing value [gtin]",
  "Missing value [title]",
  "Missing value [description]",
  "Missing value [image_link]",
  "Invalid value [availability]",
  "Missing value [color]",
  "Mismatched value [price]",
  "Misrepresentation"
];

type Diagnosis = ReturnType<typeof diagnoseMerchantCenterError>;

export function ErrorPasteForm() {
  const [warningText, setWarningText] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [submittedWarning, setSubmittedWarning] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  function analyzeWarning(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const cleanWarning = warningText.trim();
    if (!cleanWarning) {
      setDiagnosis(null);
      setSubmittedWarning("");
      return;
    }

    setSubmittedWarning(cleanWarning);
    setDiagnosis(diagnoseMerchantCenterError(cleanWarning));

    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function useExample(example: string) {
    setWarningText(example);
    setDiagnosis(null);
    setSubmittedWarning("");
  }

  return (
    <section id="paste-error" className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-slate-200/70">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={analyzeWarning} className="min-w-0 border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Free first step</p>
          <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Paste the exact warning. Then click Analyze.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            MerchantFix does not diagnose while you type. Paste the complete Merchant Center message, then launch the diagnosis when you are ready.
          </p>

          <label htmlFor="merchant-center-warning" className="mt-7 block text-sm font-black text-slate-950">
            Merchant Center warning
          </label>
          <textarea
            id="merchant-center-warning"
            value={warningText}
            onChange={(event) => setWarningText(event.target.value)}
            rows={7}
            placeholder="Example: Missing value [gtin]"
            className="mt-2 w-full min-w-0 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-900 shadow-inner outline-none ring-blue-500 transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => useExample(example)}
                className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-black text-blue-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {example}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Step 2</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Click the button below to generate a visible result panel on the right side of the page.
            </p>
            <button
              type="submit"
              disabled={!warningText.trim()}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              Analyze this Merchant Center warning
            </button>
          </div>
        </form>

        <div ref={resultRef} className="scroll-mt-24 bg-slate-950 p-4 md:p-6">
          {diagnosis ? (
            <ErrorDiagnosisPreview diagnosis={diagnosis} submittedWarning={submittedWarning} />
          ) : (
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 text-white shadow-2xl shadow-blue-950/30">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Diagnosis result</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight">Your result will appear here.</h3>
              <p className="mt-4 leading-7 text-slate-300">
                Paste a Merchant Center warning, click Analyze, and MerchantFix will show the detected issue, likely Shopify fields, safe actions, risky shortcuts to avoid, and the next step.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  "Detected issue",
                  "Shopify fields",
                  "Safe next action"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-black text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
