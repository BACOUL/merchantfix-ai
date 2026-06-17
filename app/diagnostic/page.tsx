import type { Metadata } from "next";
import { CsvUploadForm, SecondaryLink, TextBadge } from "@/components";

export const metadata: Metadata = {
  title: "CSV Diagnostic | MerchantFix.ai",
  description: "Upload a Shopify CSV after checkout to generate a MerchantFix.ai diagnostic report.",
  robots: {
    index: false,
    follow: false
  }
};

const uploadChecklist = [
  "Use an original Shopify product export when possible.",
  "Do not sort the CSV before uploading it.",
  "Keep a backup copy before importing any edited file into Shopify.",
  "Do not invent GTIN, MPN, brand, price, or product facts to satisfy a warning."
];

const diagnosticLimits = [
  "This page is intended for customers who completed checkout.",
  "The report is a product data diagnostic, not a Google approval guarantee.",
  "Manual review rows require merchant, supplier, or manufacturer verification.",
  "Contact support at contact@timeproofs.io if you cannot complete the upload after payment."
];

export default function DiagnosticPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Paid diagnostic area</TextBadge>
              <TextBadge tone="green">Shopify CSV upload</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Generate your Shopify CSV diagnostic report.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Use this page after completing checkout. Upload a clean Shopify product export to receive a prioritized report with safe fixes and manual review rows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SecondaryLink href="/how-to-export-shopify-csv">How to export CSV</SecondaryLink>
              <SecondaryLink href="/methodology">Read methodology</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Before upload</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Use the cleanest CSV you have.</h2>
            <p className="mt-4 leading-7 font-semibold">
              A clean Shopify export reduces false positives and makes manual review easier.
            </p>
          </div>
          <div className="grid gap-3">
            {uploadChecklist.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <CsvUploadForm />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Important limits</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Review before changing your feed.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {diagnosticLimits.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-semibold leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
