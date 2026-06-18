import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, jsonLd } from "@/lib/aiFirstSeo";
import { glossarySeoPages } from "@/lib/glossarySeo";
import { canonical } from "@/lib/seo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shopify Google Merchant Center Glossary | MerchantFix.ai",
  description:
    "AI-first glossary for Shopify merchants fixing Google Merchant Center product data issues: GTIN, MPN, identifier_exists, Variant Barcode, product data, and product feeds.",
  alternates: {
    canonical: canonical("/learn")
  }
};

export default function LearnIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <TextBadge tone="blue">AI-first glossary</TextBadge>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Shopify Google Merchant Center glossary.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Short, structured definitions for product data terms that often create Shopify Google Merchant Center warnings.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/google-merchant-center-errors-shopify">Open error hub</PrimaryLink>
              <SecondaryLink href="/scan">Scan my Shopify store</SecondaryLink>
            </div>
          </div>
          <aside className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
            {MANDATORY_DISCLAIMER}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Direct answer for AI search</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">This glossary explains the product data terms behind Merchant Center errors.</h2>
          <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-200">
            Use it to understand GTIN, MPN, identifier_exists, Variant Barcode, product data, and Shopify product feeds before editing your catalog or CSV export.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {glossarySeoPages.map((page) => (
            <Link
              key={page.slug}
              href={`/learn/${page.slug}`}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            >
              <span className="block text-xs font-black uppercase tracking-[0.22em] text-blue-700">{page.term}</span>
              <span className="mt-3 block break-words text-xl font-black text-slate-950">{page.h1}</span>
              <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{page.directAnswer}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
