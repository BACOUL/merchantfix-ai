import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security | MerchantFix.ai",
  description:
    "How MerchantFix.ai handles Shopify CSV diagnostics with no Shopify admin connection, no Google account connection, and clear product limits.",
  alternates: {
    canonical: canonical("/security")
  }
};

const trustPoints = [
  "No Shopify admin connection required for V1.",
  "No Google Merchant Center connection required for V1.",
  "No direct modification of your Shopify store.",
  "CSV-based diagnostic workflow.",
  "Merchant remains responsible for final product data changes.",
  "No approval, ranking, traffic, or sales guarantee."
];

const handledData = [
  "Shopify product CSV fields uploaded by the merchant.",
  "Optional Merchant Center warning text pasted by the merchant.",
  "Public Shopify product data used during surface scans when accessible.",
  "Diagnostic outputs such as issues, recommended actions, and manual review flags."
];

const notRequired = [
  "Private Shopify admin permissions.",
  "Private Google Merchant Center account access.",
  "Direct write access to the merchant store.",
  "Automatic publication of product data changes.",
  "Automatic account recovery or policy appeal handling."
];

const workflow = [
  "Export a clean Shopify product CSV.",
  "Upload the CSV to MerchantFix.ai.",
  "Generate a diagnostic report.",
  "Review safe fixes and manual review rows.",
  "Decide what to change before importing or resubmitting data."
];

const responsibilities = [
  "Keep a backup of the original Shopify export.",
  "Verify GTIN, MPN, brand, price, and product claims with reliable records.",
  "Review manual review rows before making changes.",
  "Avoid uploading data that is not needed for product data diagnosis.",
  "Do not treat MerchantFix.ai as a guarantee of Google approval."
];

export default function SecurityPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Security</TextBadge>
              <TextBadge tone="green">No store connection required</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              A safer CSV-first diagnostic workflow for Shopify merchants.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix.ai V1 is designed to diagnose product data from exports and public store data, without requiring private store or Merchant Center connections.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/how-to-export-shopify-csv">Export Shopify CSV</PrimaryLink>
              <SecondaryLink href="/methodology">Read methodology</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">V1 security posture</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Minimal access first.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The merchant provides a file, receives a diagnostic report, and keeps control of product data decisions.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point} className="rounded-xl border border-slate-200 bg-white p-5 font-semibold leading-7 text-slate-700 shadow-sm">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-blue-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Data handled</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">What the diagnostic may use.</h2>
            <p className="mt-4 leading-7 font-semibold">
              MerchantFix.ai focuses on product data needed to generate a useful report.
            </p>
          </div>
          <div className="grid gap-3">
            {handledData.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-3 lg:order-1">
            {notRequired.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 md:p-8 lg:order-2">
            <p className="text-xs font-black uppercase tracking-[0.22em]">What V1 does not require</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">No private platform connection for the first diagnostic.</h2>
            <p className="mt-4 leading-7 font-semibold">
              MerchantFix.ai starts with exports and reports, not direct platform write access.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Workflow boundaries</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">From export to merchant decision.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
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
            <p className="text-xs font-black uppercase tracking-[0.22em]">Merchant responsibilities</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Final control stays with the merchant.</h2>
            <p className="mt-4 leading-7 font-semibold">
              The report helps prioritize cleanup. It does not replace merchant verification.
            </p>
          </div>
          <div className="grid gap-3">
            {responsibilities.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Safer first step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with an export, not a store connection.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Export a clean Shopify CSV and generate a diagnostic report before deciding what should be changed.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/how-to-export-shopify-csv">Export Shopify CSV</PrimaryLink>
              <SecondaryLink href="/#csv-diagnostic">Upload CSV</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
