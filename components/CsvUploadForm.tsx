"use client";

import { useState } from "react";
import { DiagnosticResultView } from "./DiagnosticResultView";
import type { AnalysisResult, CorrectedCsvResult } from "@/lib/types";

type AnalyzeResponse = {
  analysis?: AnalysisResult;
  correctedCsvResult?: CorrectedCsvResult | null;
  error?: string;
};

type CsvUploadFormProps = {
  checkoutSessionId?: string;
  diagnosticTestToken?: string;
};

export function CsvUploadForm({ checkoutSessionId, diagnosticTestToken }: CsvUploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<AnalyzeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);

      if (checkoutSessionId) {
        formData.set("stripeSessionId", checkoutSessionId);
      }

      if (diagnosticTestToken) {
        formData.set("diagnosticTestToken", diagnosticTestToken);
      }

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
    <section id="csv-diagnostic" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">CSV diagnostic report</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Turn your Shopify export into a prioritized product data report.
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Upload a Shopify product export and optionally paste the Merchant Center warning. MerchantFix.ai checks
            GTIN, MPN, brand, identifier_exists, image, and price fields, then separates safe fixes from manual review rows.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            {[
              "Catalog health score",
              "Critical and warning counts",
              "Safe CSV notes only",
              "Manual review when uncertain"
            ].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4" onSubmit={handleSubmit}>
          <input type="hidden" name="stripeSessionId" value={checkoutSessionId ?? ""} />
          <input type="hidden" name="diagnosticTestToken" value={diagnosticTestToken ?? ""} />

          <label className="grid gap-2">
            <span className="font-bold text-slate-900">Merchant Center error text</span>
            <textarea
              name="merchantCenterErrorText"
              rows={5}
              placeholder="Paste the Merchant Center warning or disapproval text here."
              className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-bold text-slate-900">Shopify CSV export</span>
            <input
              name="csvFile"
              type="file"
              accept=".csv,text/csv"
              className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-blue-700 px-6 py-3 font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Building diagnostic report..." : "Generate diagnostic report"}
          </button>

          {errorMessage ? (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">{errorMessage}</p>
          ) : null}
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
