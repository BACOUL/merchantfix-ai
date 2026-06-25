import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Invalid GTIN Google Merchant Center: Shopify Fix Guide | MerchantFix.ai",
  description:
    "Learn how Shopify merchants should review invalid GTIN warnings in Google Merchant Center without copying SKU values or inventing product barcodes.",
  alternates: {
    canonical: canonical("/fix/invalid-gtin-google-merchant-center")
  }
};

const reasons = [
  "The barcode field contains an internal SKU instead of a real GTIN.",
  "The same GTIN appears on unrelated variants or products.",
  "The value has the wrong length or format for UPC, EAN, JAN, or ISBN data.",
  "Supplier data was copied into the wrong field.",
  "A bulk edit changed identifiers without product-level verification."
];

const checks = [
  "Check Shopify Variant Barcode for each affected variant.",
  "Compare the value with packaging, supplier sheets, or manufacturer data.",
  "Check whether Variant SKU was copied into Variant Barcode.",
  "Check whether the same GTIN is reused on unrelated products.",
  "Mark uncertain rows for manual review before resubmission."
];

const avoid = [
  "Do not replace an invalid GTIN with a guessed number.",
  "Do not copy SKU into GTIN.",
  "Do not bulk-delete identifiers without keeping a backup export.",
  "Do not set identifier_exists=no simply to hide the warning.",
  "Do not assume every barcode-like value is a manufacturer GTIN."
];

const faqs = [
  {
    question: "Is Invalid GTIN the same as Missing GTIN?",
    answer:
      "No. Missing GTIN means the field is empty. Invalid GTIN means a value exists, but it may be malformed, duplicated, copied from SKU, or not a real manufacturer barcode."
  },
  {
    question: "Can MerchantFix create a valid GTIN?",
    answer:
      "No. GTIN values must come from verified product packaging, supplier data, manufacturer data, or a legitimate identifier source. MerchantFix does not invent identifiers."
  },
  {
    question: "When should I use the Fix Pack?",
    answer:
      "Use the Fix Pack when invalid GTIN warnings affect multiple Shopify products and you need row-level CSV context, duplicate checks, and manual review flags."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix helps diagnose supported product data issues, but Google approval, ranking, traffic, performance, and sales are not guaranteed."
  }
];

export default function InvalidGtinPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Invalid GTIN", path: "/fix/invalid-gtin-google-merchant-center" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Invalid GTIN</TextBadge>
              <TextBadge tone="green">Shopify Merchant Center guide</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              Invalid GTIN means the value exists, but it may be wrong.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              For Shopify merchants, the safest response is not to guess a new barcode. Review Variant Barcode, supplier data, duplicate values, and identifier_exists before resubmitting products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
          <aside className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Critical rule</p>
            <h2 className="mt-3 text-2xl font-black">Do not replace an invalid GTIN with a guessed one.</h2>
            <p className="mt-3 font-semibold leading-7">If the value cannot be verified, the row needs manual review.</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Why this happens</h2>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              {reasons.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">What to check</h2>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              {checks.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">What not to do</h2>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              {avoid.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">CSV diagnosis</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Use row-level review when many products are affected.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Fix Pack can help isolate invalid-looking GTIN rows, duplicated values, SKU-as-barcode patterns, and rows that need manual verification.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Related guides</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/fix/missing-gtin-google-merchant-center" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-950 hover:bg-slate-50">Missing GTIN</Link>
            <Link href="/fix/google-merchant-center-identifier-exists" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-950 hover:bg-slate-50">identifier_exists</Link>
            <Link href="/fix/shopify-missing-product-identifiers" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-950 hover:bg-slate-50">Product identifiers</Link>
            <Link href="/supported-errors" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-950 hover:bg-slate-50">Supported errors</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
