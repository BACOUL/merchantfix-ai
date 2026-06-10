import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | MerchantFix.ai",
  description:
    "How MerchantFix.ai processes public Shopify URLs, Shopify CSV uploads, and product data in the current MVP.",
  alternates: {
    canonical: canonical("/privacy")
  }
};

const providedData = [
  "A public Shopify store URL entered for a surface scan.",
  "A Shopify CSV export uploaded for product data diagnosis.",
  "Product data contained in the public storefront or CSV export, such as titles, descriptions, images, prices, GTIN, MPN, brand, and identifier_exists fields.",
  "Optional Google Merchant Center warning text pasted by the user."
];

const currentMvpLimits = [
  "No user account or login is created.",
  "No payment information is processed in the current MVP.",
  "MerchantFix.ai does not access Shopify admin accounts.",
  "MerchantFix.ai does not connect to Google Merchant Center.",
  "MerchantFix.ai does not use the Shopify private API.",
  "MerchantFix.ai does not sell personal data."
];

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Privacy</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            This policy explains how MerchantFix.ai processes public Shopify URLs, Shopify CSV uploads, and product
            data in the current MVP.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
              <h2 className="text-xl font-black">Current MVP notice</h2>
              <p className="mt-2 leading-7">
                This policy reflects the current MVP. It should be updated before adding payment, analytics, accounts,
                database storage, or third-party integrations.
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
                MerchantFix.ai processes this data to run a public Shopify surface scan, diagnose uploaded Shopify CSV
                product data, detect missing or weak fields, identify supported GTIN, MPN, brand, and identifier_exists
                issues, and generate diagnostic or correction output when safe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">CSV Uploads</h2>
              <p className="mt-3 leading-7">
                CSV uploads are used only to generate the diagnostic and correction output shown to the user. The
                current MVP does not intentionally store uploaded CSV files long term unless the code is later changed
                to add storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">User Responsibility</h2>
              <p className="mt-3 leading-7">
                Users should not upload unnecessary personal data. Product data may include business information, such
                as product identifiers, product titles, vendors, prices, and feed-related fields.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Current MVP Limitations</h2>
              <ul className="mt-3 grid gap-2">
                {currentMvpLimits.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Privacy Requests</h2>
              <p className="mt-3 leading-7">
                For privacy questions or requests, contact{" "}
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
