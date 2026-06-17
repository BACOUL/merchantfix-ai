import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Methodology | MerchantFix.ai",
  description:
    "How MerchantFix.ai scores Shopify product data, classifies issues, handles safe fixes, and flags manual review rows.",
  alternates: {
    canonical: canonical("/methodology")
  }
};

const principles = [
  {
    title: "Shopify-first scope",
    description: "MerchantFix.ai V1 is built for Shopify product exports and public Shopify product data. It does not try to be a universal feed manager."
  },
  {
    title: "Google Merchant Center readiness",
    description: "The diagnostic focuses on product data fields that commonly affect feed quality: identifiers, brand, images, prices, and row-level data consistency."
  },
  {
    title: "Safe fixes only",
    description: "MerchantFix.ai can add notes and deterministic corrections, but it must never invent real product data such as GTIN, MPN, brand, or price."
  },
  {
    title: "Manual review when uncertain",
    description: "When a field requires merchant knowledge or supplier verification, the row is flagged for manual review instead of being auto-corrected."
  }
];

const scoringFactors = [
  "Critical issues reduce the catalog health score the most.",
  "Warnings reduce the score moderately and show quality risks.",
  "Info items reduce the score slightly and help explain cleanup opportunities.",
  "The score is a practical diagnostic indicator, not a Google ranking or approval score.",
  "A high score does not guarantee approval, visibility, traffic, performance, or sales."
];

const issueRules = [
  {
    label: "Critical",
    description: "A field or row should be fixed or reviewed before resubmission, especially when product identifiers are missing, malformed, duplicated, or inconsistent."
  },
  {
    label: "Warning",
    description: "A product data field may reduce feed quality or create uncertainty, but the issue is not always a direct blocker."
  },
  {
    label: "Info",
    description: "A low-risk observation that helps improve data clarity or explains why no safe correction was generated."
  }
];

const safeFixRules = [
  "A safe fix must be deterministic from the uploaded CSV or from a non-sensitive structural rule.",
  "MerchantFix.ai can add diagnostic notes and action columns when useful.",
  "MerchantFix.ai can flag rows that require manual review.",
  "MerchantFix.ai must not create GTIN values.",
  "MerchantFix.ai must not invent MPN values.",
  "MerchantFix.ai must not invent brand names.",
  "MerchantFix.ai must not invent prices, availability, or product claims.",
  "If the correct value depends on supplier, packaging, manufacturer, or merchant knowledge, the row stays manual review."
];

const limitations = [
  "MerchantFix.ai V1 does not connect to Shopify admin.",
  "MerchantFix.ai V1 does not connect to Google Merchant Center.",
  "MerchantFix.ai V1 does not diagnose every possible policy, shipping, tax, account, or misrepresentation issue.",
  "MerchantFix.ai V1 does not guarantee approval, ranking, traffic, performance, or sales.",
  "MerchantFix.ai V1 depends on the quality and completeness of the uploaded CSV or publicly available product data."
];

const workflow = [
  "Export a clean Shopify product CSV.",
  "Upload the CSV and optionally paste Merchant Center warning text.",
  "MerchantFix.ai normalizes supported fields where possible.",
  "The diagnostic classifies issues by severity and fix type.",
  "Safe fixes and manual review rows are separated clearly.",
  "The merchant reviews the output before editing or importing any CSV."
];

export default function MethodologyPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Methodology</TextBadge>
              <TextBadge tone="green">Safe fixes only</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              How MerchantFix.ai diagnoses Shopify product data.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix.ai is intentionally narrow: it helps Shopify merchants identify supported product data issues, separate safe fixes from manual review, and avoid risky guesses.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#csv-diagnostic">Generate diagnostic report</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Core promise</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Useful diagnosis without fake product data.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The product is designed to be practical and conservative: explain what is wrong, show where it appears, and avoid fabricating identifiers or product facts.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{principle.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Catalog health score</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              A practical score, not a Google approval score.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The score helps merchants prioritize cleanup. It is based on the diagnostic result and is not a prediction of Google approval, visibility, traffic, or sales.
            </p>
          </div>
          <div className="grid gap-3">
            {scoringFactors.map((factor) => (
              <div key={factor} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {factor}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Severity rules</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">How issues are classified.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {issueRules.map((rule) => (
              <article key={rule.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-black text-slate-950">{rule.label}</h3>
                <p className="mt-3 leading-7 text-slate-600">{rule.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Safe correction policy</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">MerchantFix.ai must not guess product facts.</h2>
            <p className="mt-4 leading-7 font-semibold">
              The safest product data assistant is not the one that fills every blank. It is the one that knows when to stop and ask for merchant review.
            </p>
          </div>
          <div className="grid gap-3">
            {safeFixRules.map((rule) => (
              <div key={rule} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">From export to action plan.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {workflow.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="mt-4 font-semibold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Limitations</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Clear limits make the product more trustworthy.</h2>
            <p className="mt-4 leading-7 font-semibold">
              MerchantFix.ai V1 is not a full Google Merchant Center recovery service. It is a focused product data diagnostic and cleanup assistant.
            </p>
          </div>
          <div className="grid gap-3">
            {limitations.map((limit) => (
              <div key={limit} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {limit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Ready to test the method</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Generate a diagnostic report from a Shopify CSV.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Export a clean Shopify CSV, upload it, and review what can be fixed safely versus what needs manual verification.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/how-to-export-shopify-csv">How to export CSV</PrimaryLink>
              <SecondaryLink href="/#csv-diagnostic">Upload Shopify CSV</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
