import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | MerchantFix.ai",
  description:
    "How MerchantFix.ai processes public Shopify URLs, pasted Merchant Center warnings, Shopify CSV uploads, checkout data, and product data.",
  alternates: {
    canonical: canonical("/privacy")
  }
};

const providedData = [
  "A public Shopify store URL entered for a surface scan.",
  "Google Merchant Center warning text pasted by the user.",
  "A Shopify CSV export uploaded for product data diagnosis after checkout.",
  "Product data contained in the public storefront or CSV export, such as titles, descriptions, images, prices, GTIN, MPN, brand, SKU, inventory, status, and identifier-related fields.",
  "Basic checkout data processed by Stripe when a paid plan is purchased."
];

const limits = [
  "MerchantFix.ai does not create a Shopify admin connection.",
  "MerchantFix.ai does not connect to Google Merchant Center.",
  "MerchantFix.ai does not use the Shopify private API for the free public scan.",
  "MerchantFix.ai does not sell personal data.",
  "MerchantFix.ai does not intentionally collect unnecessary personal data inside product CSV files."
];

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Privacy</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            This policy explains how MerchantFix.ai processes public Shopify URLs, pasted Merchant Center warnings, Shopify CSV uploads, checkout data, and product data.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
              <h2 className="text-xl font-black">Product privacy principle</h2>
              <p className="mt-2 leading-7">
                MerchantFix.ai is designed to process only the data needed to diagnose supported Shopify product-data issues. Users should avoid uploading files containing unnecessary personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Data Users May Provide</h2>
              <ul className="mt-3 grid gap-2">
                {providedData.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Why Data Is Processed</h2>
              <p className="mt-3 leading-7">
                MerchantFix.ai processes this data to run a public Shopify surface scan, detect supported Google Merchant Center warning patterns, diagnose uploaded Shopify CSV product data, identify missing or weak fields, and generate diagnostic or correction output when safe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Payments</h2>
              <p className="mt-3 leading-7">
                Paid checkout is handled through Stripe when configured. MerchantFix.ai does not store full card numbers. Stripe may process payment, billing, fraud-prevention, and transaction data according to its own terms and privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">CSV Uploads</h2>
              <p className="mt-3 leading-7">
                CSV uploads are used to generate the diagnostic report, manual review flags, and correction output when available. MerchantFix.ai should not be used to upload unnecessary personal data. Product CSV files may contain business product data such as titles, prices, identifiers, vendors, SKUs, and image URLs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Service Limits</h2>
              <ul className="mt-3 grid gap-2">
                {limits.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">User Responsibility</h2>
              <p className="mt-3 leading-7">
                Users are responsible for ensuring they are authorized to submit the Shopify URL, Merchant Center warning text, and CSV data they analyze. Users remain responsible for verifying product data before editing Shopify, importing CSV changes, or resubmitting products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Privacy Requests</h2>
              <p className="mt-3 leading-7">
                For privacy questions or requests, contact{" "}
                <Link href="mailto:contact@merchantfix.ai" className="font-bold text-blue-700 hover:text-blue-900">
                  contact@merchantfix.ai
                </Link>
                .
              </p>
            </section>

            <p className="border-t border-slate-200 pt-5 text-sm font-semibold text-slate-500">Last updated: June 25, 2026</p>
          </div>
        </article>
      </div>
    </main>
  );
}
