"use client";

import Link from "next/link";
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

function getOutcome(result: SurfaceScanResult | null, errorMessage: string | null) {
  if (errorMessage || result?.status === "failed" || result?.status === "unsupported") {
    return {
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      title: "Public data unavailable or incomplete.",
      description:
        "Some Shopify stores do not expose public product data. Use the Fix Pack when you need row-level CSV diagnosis from your Shopify export.",
      primaryHref: "/fix-pack",
      primaryLabel: "Use Fix Pack CSV diagnosis",
      secondaryHref: "/how-to-export-shopify-csv",
      secondaryLabel: "Export Shopify CSV"
    };
  }

  if (result?.csvUploadRecommended || (result?.riskCount ?? 0) > 0 || (result?.warningCount ?? 0) > 0) {
    return {
      tone: "border-blue-200 bg-blue-50 text-blue-950",
      title: "Visible risks found. CSV diagnosis is the next useful step.",
      description:
        "The free scan found surface signals. For GTIN, MPN, brand, identifier_exists, price, availability, or affected-row diagnosis, use the Fix Pack with a Shopify CSV export.",
      primaryHref: "/fix-pack",
      primaryLabel: "View Fix Pack",
      secondaryHref: "/sample-report",
      secondaryLabel: "See sample report"
    };
  }

  if (result) {
    return {
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
      title: "No major public surface risks detected.",
      description:
        "This is still not a full Merchant Center diagnosis. If Google shows identifier, price, availability, or image warnings, paste the exact warning or use a CSV-level Fix Pack.",
      primaryHref: "/#paste-error",
      primaryLabel: "Paste Merchant Center error",
      secondaryHref: "/supported-errors",
      secondaryLabel: "View supported errors"
    };
  }

  return null;
}

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

  const outcome = getOutcome(result, errorMessage);

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
    <div className="grid min-w-0 gap-6">
      <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">No-install surface audit</p>
            <h1 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Shopify Store Surface Scan</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Check public Shopify product data for visible risks. If public data is unavailable or identifier errors need row-level review, move directly to the Fix Pack.
            </p>
          </div>
          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
            Public data only
          </span>
        </div>
        <form className="mt-8 grid min-w-0 gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
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
            className="w-full min-w-0 rounded-full border border-slate-300 bg-white px-5 py-3 outline-none ring-blue-500 transition focus:ring-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isSubmitting ? "Scanning..." : "Run Surface Scan"}
          </button>
        </form>
        {errorMessage ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{errorMessage}</p>
        ) : null}
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-5">
        {summary.map((card) => (
          <div key={card.label} className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{card.value}</p>
          </div>
        ))}
      </section>

      {outcome ? (
        <section className={`rounded-xl border p-5 shadow-sm md:p-6 ${outcome.tone}`}>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em]">Recommended next step</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight">{outcome.title}</h2>
              <p className="mt-3 font-semibold leading-7">{outcome.description}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href={outcome.primaryHref} className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800">
                {outcome.primaryLabel}
              </Link>
              <Link href={outcome.secondaryHref} className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-50">
                {outcome.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {result ? (
        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Surface scan result</p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">{result.summary}</h2>
          <ul className="mt-4 grid gap-2 text-sm font-medium text-slate-700">
            {result.recommendedActions.map((action) => (
              <li key={action} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                {action}
              </li>
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
