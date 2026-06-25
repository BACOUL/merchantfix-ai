import type { Metadata } from "next";
import { ErrorPasteForm, PrimaryLink, SecondaryLink, SupportedErrorsTable, TextBadge } from "@/components";
import { buildBreadcrumbSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Supported Google Merchant Center errors for Shopify | MerchantFix.ai",
  description:
    "See which Google Merchant Center errors MerchantFix supports for Shopify merchants, including GTIN, brand, MPN, identifier_exists, price, availability, image issues, and limited misrepresentation support.",
  alternates: { canonical: canonical("/supported-errors") }
};

export default function SupportedErrorsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Supported errors", path: "/supported-errors" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Supported errors</TextBadge>
              <TextBadge tone="green">Shopify product data</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Know when MerchantFix can help, and when it cannot.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix is built for Shopify product-data warnings, not every Google account problem. This page separates supported, partial, and limited cases.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Rule of thumb</p>
            <p className="mt-4 text-2xl font-black leading-9 text-white">
              Product field warnings are usually diagnosable. Account-level policy issues require broader manual review.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Coverage table</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Errors currently mapped by MerchantFix.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            The table is intentionally honest: some issues are strongly supported by CSV diagnosis, some are partial, and misrepresentation is only limited product-data support.
          </p>
          <div className="mt-6">
            <SupportedErrorsTable />
          </div>
        </section>

        <div className="mt-10">
          <ErrorPasteForm />
        </div>
      </div>
    </main>
  );
}
