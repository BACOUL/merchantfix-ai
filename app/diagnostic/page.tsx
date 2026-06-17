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
        <CsvUploadForm />
      </section>
    </main>
  );
}
