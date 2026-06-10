import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use | MerchantFix.ai",
  description: "Terms and limitations for using MerchantFix.ai product data diagnostics for Shopify merchants.",
  alternates: {
    canonical: canonical("/terms")
  }
};

const serviceLimits = [
  "MerchantFix.ai provides diagnostic assistance for Shopify product data.",
  "Results are informational and operational support only.",
  "MerchantFix.ai does not guarantee Google Merchant Center approval.",
  "MerchantFix.ai does not guarantee Google Shopping visibility, ranking, performance, traffic, or sales.",
  "MerchantFix.ai does not replace professional Merchant Center, legal, tax, accounting, or compliance advice."
];

const dataRules = [
  "MerchantFix.ai does not invent GTINs, MPNs, brands, product identifiers, prices, or product data.",
  "Users are responsible for verifying product identifiers and product data accuracy.",
  "Users must have the right to submit the Shopify URL or CSV data they analyze.",
  "Safe fixes are only deterministic.",
  "Uncertain issues are flagged for manual review."
];

const technicalLimits = [
  "Public Shopify URL scan depends on publicly available /products.json or public storefront data.",
  "Some stores may block public scanning or provide incomplete public data.",
  "CSV upload diagnosis depends on the quality and structure of the uploaded Shopify export."
];

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Terms</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Terms of Use</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            These terms define the basic rules and limitations for using MerchantFix.ai product data diagnostics.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-black text-slate-950">Operator</h2>
              <p className="mt-3 leading-7">
                MerchantFix.ai is operated by TimeProofs, Entreprise individuelle, Jeason Alexandre Bacoul, SIREN
                999356439. VAT exemption under the French small business VAT exemption regime. No VAT charged.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Service Scope</h2>
              <ul className="mt-3 grid gap-2">
                {serviceLimits.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Product Data Responsibility</h2>
              <ul className="mt-3 grid gap-2">
                {dataRules.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Technical Limitations</h2>
              <ul className="mt-3 grid gap-2">
                {technicalLimits.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Acceptable Use</h2>
              <p className="mt-3 leading-7">
                Users must not use MerchantFix.ai for abusive, unlawful, misleading, unauthorized, or harmful purposes.
                Users must only analyze Shopify URLs or CSV files they are authorized to use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Updates to These Terms</h2>
              <p className="mt-3 leading-7">
                These terms may be updated as MerchantFix.ai evolves. Terms of Sale and refund rules are not included
                here because the current MVP does not include payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Contact</h2>
              <p className="mt-3 leading-7">
                For questions about these terms, contact{" "}
                <Link href="mailto:contact@timeproofs.io" className="font-bold text-blue-700 hover:text-blue-900">
                  contact@timeproofs.io
                </Link>
                .
              </p>
            </section>

            <p className="border-t border-slate-200 pt-5 text-sm font-semibold text-slate-500">Last updated: June 9, 2026</p>
          </div>
        </article>
      </div>
    </main>
  );
}
