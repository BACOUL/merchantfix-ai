"use client";

import { useState } from "react";
import type { SurfaceScanResult } from "@/lib/types";

type SurfaceScanResponse = {
  result: SurfaceScanResult;
};

const emptySummary = [
  { label: "Products detected", value: "-" },
  { label: "Surface score", value: "-" },
  { label: "Risks found", value: "-" },
  { label: "Warnings", value: "-" },
  { label: "Info", value: "-" }
];

export function SurfaceScanForm() {
  const [storeUrl, setStoreUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SurfaceScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const summary = result
    ? [
        { label: "Products detected", value: String(result.totalProducts) },
        { label: "Surface score", value: String(result.riskScore) },
        { label: "Risks found", value: String(result.riskCount) },
        { label: "Warnings", value: String(result.warningCount) },
        { label: "Info", value: String(result.infoCount) }
      ]
    : emptySummary;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/surface-scan", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ storeUrl })
      });
      const payload = (await response.json()) as SurfaceScanResponse;

      setResult(payload.result);
      if (!response.ok) {
        setErrorMessage(payload.result?.errorMessage ?? "The store URL could not be scanned.");
      }
    } catch {
      setErrorMessage("The store could not be scanned. Try again with a public Shopify store URL.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">No-install surface audit</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Shopify Store Surface Scan</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          This scan uses publicly available product data when accessible. It is not a full Google Merchant Center
          diagnosis.
        </p>
        <form className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="store-url">
            Shopify store URL
          </label>
          <input
            id="store-url"
            name="store-url"
            type="url"
            value={storeUrl}
            onChange={(event) => setStoreUrl(event.target.value)}
            placeholder="https://example-store.myshopify.com"
            className="rounded-full border border-slate-300 px-5 py-3 outline-none ring-blue-500 transition focus:ring-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isSubmitting ? "Scanning..." : "Run Surface Scan"}
          </button>
        </form>
        {errorMessage ? <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">{errorMessage}</p> : null}
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {summary.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{card.value}</p>
          </div>
        ))}
      </section>

      {result ? (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Surface scan result</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{result.summary}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {result.recommendedActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
          {result.detectedRisks.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {result.detectedRisks.slice(0, 10).map((risk, index) => (
                <div key={`${risk.productId}-${risk.riskCode}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">{risk.productTitle ?? "Untitled product"}</p>
                  <p className="mt-1 text-sm text-slate-700">{risk.explanation}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{risk.suggestedFix}</p>
                </div>
              ))}
            </div>
          ) : null}
          <p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-950">{result.disclaimer}</p>
        </section>
      ) : null}
    </div>
  );
}
