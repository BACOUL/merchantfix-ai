"use client";

import { useState } from "react";
import { DiagnosticResultView } from "./DiagnosticResultView";
import type { AnalysisResult, CorrectedCsvResult } from "@/lib/types";

type AnalyzeResponse = {
  analysis: AnalysisResult;
  correctedCsvResult?: CorrectedCsvResult | null;
  error?: string;
};

export function CsvUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<AnalyzeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as AnalyzeResponse;

      setResponse(payload);
      if (!response.ok && payload.error) {
        setErrorMessage(payload.error);
      }
    } catch {
      setErrorMessage("The CSV could not be analyzed. Please try again with a valid Shopify CSV export.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="csv-diagnostic" className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Deeper V1 CSV diagnostic</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Diagnose Shopify product identifier errors</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Paste an optional Google Merchant Center error and upload a Shopify CSV export. MerchantFix.ai checks GTIN,
            MPN, brand, identifier_exists, image, and price fields.
          </p>
          <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            V1 does not require an account. Files are processed for diagnosis and should not be stored permanently.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="font-semibold text-slate-900">Merchant Center error text</span>
            <textarea
              name="merchantCenterErrorText"
              rows={5}
              placeholder="Paste the Merchant Center warning or disapproval text here."
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-semibold text-slate-900">Shopify CSV export</span>
            <input
              name="csvFile"
              type="file"
              accept=".csv,text/csv"
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Analyzing CSV" : "Diagnose My Product Errors"}
          </button>

          {errorMessage ? <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{errorMessage}</p> : null}
        </form>
      </div>

      {response?.analysis ? (
        <div className="mt-8">
          <DiagnosticResultView analysis={response.analysis} correctedCsvResult={response.correctedCsvResult} />
        </div>
      ) : null}
    </section>
  );
}
