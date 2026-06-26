import type { Metadata } from "next";
import { ErrorPasteForm, PrimaryLink, SecondaryLink, SupportedErrorsTable, TextBadge } from "@/components";
import { buildBreadcrumbSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Supported Google Merchant Center errors for Shopify | MerchantFix.ai",
  description:
    "See which Google Merchant Center errors MerchantFix supports for Shopify merchants, including GTIN, duplicate GTIN, brand, MPN, identifier_exists, duplicate item ID, price, availability, image, shipping, tax, category, landing page, and limited misrepresentation support.",
  alternates: { canonical: canonical("/supported-errors") }
};

const coverageCards = [
  { label: "Strong CSV support", value: "6", detail: "Identifiers and core product-data issues" },
  { label: "Partial support", value: "7", detail: "Useful but needs live or settings review" },
  { label: "Limited support", value: "2", detail: "Account, crawl, or broader trust cases" }
];

const decisionCards = [
  {
    title: "Use MerchantFix when the issue is product-data related",
    text: "GTIN, brand, MPN, identifier_exists, duplicate barcode, price, availability, image, category, and CSV row problems are the best fit."
  },
  {
    title: "Use Fix Pack when many rows are affected",
    text: "The paid value is row-level visibility: affected products, likely Shopify fields, guardrail status, manual-review reason, and evidence needed."
  },
  {
    title: "Do not use it as account recovery",
    text: "Misrepresentation, tax, shipping, landing page, and crawl issues may need broader manual review outside product CSV data."
  }
];

const strongFit = [
  "Missing value [gtin]",
  "Invalid value [gtin]",
  "Duplicate value [gtin]",
  "Missing value [brand]",
  "Missing value [mpn]",
  "identifier_exists conflict"
];

const partialFit = [
  "Duplicate item ID",
  "Mismatched value [price]",
  "Mismatched value [availability]",
  "Image issue",
  "Image not retrieved",
  "Missing value [shipping]",
  "Invalid value [google_product_category]"
];

const limitedFit = ["Missing or invalid value [tax]", "Landing page not available", "Misrepresentation"];

const fixPackSignals = [
  "More than 10 products are affected",
  "The same warning appears across many variants",
  "You need to know which Shopify rows to review first",
  "The issue involves identifiers, brand, MPN, barcode, price, availability, or category",
  "You want an annotated CSV rather than generic advice"
];

const notPromised = [
  "Google approval or account reinstatement",
  "Legal, tax, shipping, or policy compliance advice",
  "Invented GTIN, MPN, brand, category, shipping, or product facts",
  "A full replacement for Merchant Center, Shopify, or feed app settings"
];

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
              <TextBadge tone="green">15 mapped families</TextBadge>
              <TextBadge tone="amber">Honest coverage</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Know exactly when MerchantFix is worth using.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix is strongest when a Google Merchant Center warning points to Shopify product data. This page separates strong CSV cases, partial cases, and limited cases before a merchant buys anything.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Current coverage</p>
            <p className="mt-4 text-2xl font-black leading-9 text-white">
              15 mapped warning families, with clear boundaries so merchants do not confuse product-data diagnosis with account-level guarantees.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {coverageCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-300">{card.label}</p>
                  <p className="mt-2 text-4xl font-black text-white">{card.value}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          {decisionCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
              <h2 className="text-xl font-black tracking-tight text-slate-950">{card.title}</h2>
              <p className="mt-3 font-semibold leading-7 text-slate-600">{card.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-blue-200 bg-blue-50 p-5 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Coverage by confidence</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Show the merchant what is safe, partial, or limited before they pay.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                This makes MerchantFix more credible: the product is not pretending to solve every Merchant Center problem. It explains where CSV diagnosis is valuable and where manual review remains necessary.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Strong fit</p>
                <div className="mt-4 grid gap-2">
                  {strongFit.map((item) => (
                    <span key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-900">{item}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Partial fit</p>
                <div className="mt-4 grid gap-2">
                  {partialFit.map((item) => (
                    <span key={item} className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-900">{item}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Limited fit</p>
                <div className="mt-4 grid gap-2">
                  {limitedFit.map((item) => (
                    <span key={item} className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-900">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Coverage table</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">15 Merchant Center warning families currently mapped by MerchantFix.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            The table is intentionally honest: identifier and core product-data issues are strongest; live site, tax, shipping, and policy issues are partial or limited.
          </p>
          <div className="mt-6">
            <SupportedErrorsTable />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-xl shadow-emerald-100/50 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">When Fix Pack makes sense</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A paid diagnosis is useful when the problem is repeated, row-level, or risky.</h2>
            <div className="mt-6 grid gap-3">
              {fixPackSignals.map((signal) => (
                <div key={signal} className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 font-black text-slate-800">{signal}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-5 shadow-xl shadow-red-100/40 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">What is not promised</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">MerchantFix stays away from unsafe promises.</h2>
            <div className="mt-6 grid gap-3">
              {notPromised.map((promise) => (
                <div key={promise} className="rounded-2xl border border-red-200 bg-white px-4 py-3 font-black text-red-900">{promise}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-blue-200 bg-blue-50 p-5 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Best next step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Paste the exact warning first.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                The free diagnosis should tell the merchant whether the issue is a strong CSV fit, a partial case, or a limited case before they decide to buy the Fix Pack.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <ErrorPasteForm />
        </div>
      </div>
    </main>
  );
}
