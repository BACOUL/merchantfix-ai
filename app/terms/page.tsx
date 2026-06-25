import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use and Sale | MerchantFix.ai",
  description: "Terms, sales conditions, refunds, service limits, and product-data responsibility for MerchantFix.ai Shopify diagnostics.",
  alternates: {
    canonical: canonical("/terms")
  }
};

const serviceLimits = [
  "MerchantFix.ai provides diagnostic assistance for Shopify product data.",
  "Results are informational and operational support only.",
  "MerchantFix.ai does not guarantee Google Merchant Center approval.",
  "MerchantFix.ai does not guarantee Google Shopping visibility, ranking, performance, traffic, account recovery, or sales.",
  "MerchantFix.ai does not replace professional Merchant Center, legal, tax, accounting, or compliance advice."
];

const dataRules = [
  "MerchantFix.ai does not invent GTINs, MPNs, brands, product identifiers, prices, shipping values, or product facts.",
  "Users are responsible for verifying product identifiers and product data accuracy.",
  "Users must have the right to submit the Shopify URL, warning text, or CSV data they analyze.",
  "Safe fixes are only deterministic.",
  "Uncertain issues are flagged for manual review."
];

const saleRules = [
  "Paid products are digital diagnostic services delivered through the MerchantFix.ai flow.",
  "Checkout may be processed through Stripe when payment is configured.",
  "Prices are shown in euros. VAT is not charged under the French small business VAT exemption regime unless this status changes.",
  "After a diagnostic output has been delivered or made available, refunds are not automatic.",
  "A refund may be considered for duplicate payment, technical failure, or exceptional commercial decision."
];

const technicalLimits = [
  "Public Shopify URL scan depends on publicly available product data.",
  "Some stores may prevent public scanning or provide incomplete public data.",
  "CSV upload diagnosis depends on the quality and structure of the uploaded Shopify export.",
  "MerchantFix.ai does not import changes back into Shopify."
];

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Terms</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Terms of Use and Sale</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            These terms define the basic rules, service limits, sales conditions, and product-data responsibilities for using MerchantFix.ai.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-black text-slate-950">Operator</h2>
              <p className="mt-3 leading-7">
                MerchantFix.ai is operated by TimeProofs, Entreprise individuelle, Jeason Alexandre Bacoul, SIREN 999356439. VAT exemption under the French small business VAT exemption regime. No VAT charged.
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
              <h2 className="text-2xl font-black text-slate-950">Paid Digital Services</h2>
              <ul className="mt-3 grid gap-2">
                {saleRules.map((item) => (
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
                Users must not use MerchantFix.ai for abusive, unlawful, misleading, unauthorized, or harmful purposes. Users must only analyze Shopify URLs, warning text, or CSV files they are authorized to use.
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

            <p className="border-t border-slate-200 pt-5 text-sm font-semibold text-slate-500">Last updated: June 18, 2026</p>
          </div>
        </article>
      </div>
    </main>
  );
}
