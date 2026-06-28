import type { Metadata } from "next";
import Link from "next/link";
import { canonical, SUPPORT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Data Handling | MerchantFix.ai",
  description: "How MerchantFix.ai handles Shopify CSV uploads, pasted Merchant Center warnings, diagnostic output, support data, and future report storage.",
  alternates: { canonical: canonical("/data-handling") }
};

const currentScope = [
  "Pasted Merchant Center warning text may be used to identify supported product-data issue families.",
  "Uploaded Shopify CSV content may be processed to create an on-screen report and an annotated CSV when safe output is available.",
  "The current launch scope does not include customer accounts, long-term report history, automatic PDF delivery, ZIP delivery, or magic report links unless those features are added later.",
  "The diagnostic is file-based and does not import changes back into Shopify."
];

const csvPrinciples = [
  "Use a Shopify product CSV export, not a Google Merchant Center feed export or feed-app export.",
  "Do not upload passwords, API keys, private customer lists, or unrelated personal data.",
  "Keep a backup of the original Shopify export before applying any changes in Shopify.",
  "Review manual_review and blocked rows before editing product data."
];

const noInventedData = [
  "GTIN",
  "MPN",
  "brand",
  "price",
  "image URL",
  "shipping value",
  "tax value",
  "product fact"
];

export default function DataHandlingPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Data handling</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">How MerchantFix handles uploaded data</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            MerchantFix.ai is built around safe CSV-based diagnosis. This page explains what data is processed, what is not changed automatically, and what customers should verify before using output.
          </p>
          <p className="mt-3 text-sm font-bold text-slate-500">Last updated: June 27, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-blue-950">
              <h2 className="text-2xl font-black">Current launch scope</h2>
              <ul className="mt-4 grid gap-2">
                {currentScope.map((item) => (
                  <li key={item} className="rounded-lg bg-white/70 px-3 py-2 font-semibold">{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">CSV upload principles</h2>
              <ul className="mt-4 grid gap-2">
                {csvPrinciples.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Product facts MerchantFix does not invent</h2>
              <p className="mt-3 leading-7">
                MerchantFix.ai may flag missing, weak, inconsistent, or risky product data, but it must not create or guess these values for the customer.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {noInventedData.map((item) => (
                  <span key={item} className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-black text-red-950">{item}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Manual review and blocked rows</h2>
              <p className="mt-3 leading-7">
                Rows marked as manual_review or blocked should not be treated as automatic fixes. They require product packaging, supplier information, manufacturer data, Shopify admin verification, storefront checks, or merchant judgment before editing Shopify or resubmitting products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Future delivery layers</h2>
              <p className="mt-3 leading-7">
                PDF export, ZIP delivery, long-term report storage, magic report links, webhooks, and customer accounts are planned as later autonomy features. Until implemented, customers should treat the on-screen report and annotated CSV as the current launch deliverables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Support and deletion requests</h2>
              <p className="mt-3 leading-7">
                For data questions or deletion requests, contact <Link href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-blue-700 hover:text-blue-900">{SUPPORT_EMAIL}</Link>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
