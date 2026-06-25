import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import {
  BeforeAfterTable,
  FixPackOutputPreview,
  SafeDiagnosticNotice,
  SampleReportTable,
  SecondaryLink,
  ShopifyCsvRequirements,
  TextBadge
} from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fix Pack | Shopify CSV diagnosis for Merchant Center errors",
  description:
    "One-time Shopify CSV diagnosis for GTIN, MPN, brand, identifier_exists, price, availability, image, and product data issues.",
  alternates: {
    canonical: canonical("/fix-pack")
  }
};

const checks = [
  "Missing GTIN",
  "Invalid GTIN",
  "Duplicate GTIN warnings",
  "Missing MPN",
  "SKU used as MPN warning",
  "Missing brand",
  "identifier_exists conflicts",
  "Missing or weak image fields",
  "Missing price fields",
  "Availability and status fields",
  "Manual review rows",
  "Corrected CSV only when deterministic"
];

const process = [
  "Export a clean Shopify product CSV before editing it.",
  "Open the one-time Fix Pack checkout.",
  "Upload your Shopify CSV export.",
  "Review critical issues, warnings, affected rows, and safe actions.",
  "Download correction notes or a corrected CSV only when the change is deterministic."
];

const faqs = [
  {
    question: "What do I get after buying the Fix Pack?",
    answer:
      "You get access to the Shopify CSV diagnostic flow, a prioritized report, affected rows when available, safe correction guidance, manual review flags, and a corrected CSV only when a deterministic safe fix exists."
  },
  {
    question: "When should I choose the Fix Pack?",
    answer:
      "Choose it when Google Merchant Center shows GTIN, MPN, brand, identifier_exists, price, availability, or image issues and you need row-level Shopify CSV context."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix diagnoses supported product data issues, but Google approval, ranking, traffic, performance, sales, and account recovery are not guaranteed."
  },
  {
    question: "Will MerchantFix invent missing identifiers?",
    answer:
      "No. MerchantFix never invents GTIN, MPN, brand, price, shipping, or product facts. Uncertain rows are marked for manual review."
  }
];

export default function FixPackPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Fix Pack", path: "/fix-pack" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Fix Pack</TextBadge>
              <TextBadge tone="green">29 € one-time</TextBadge>
              <TextBadge tone="slate">Best for most merchants</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Row-level Shopify CSV diagnosis for Merchant Center errors.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Use Fix Pack when Google flags GTIN, MPN, brand, identifier_exists, price, availability, or image issues and you need to know which Shopify CSV rows to review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton plan="fix-pack">Start Fix Pack checkout</CheckoutButton>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              No fake identifiers. No invented values. Corrected CSV only when the change is deterministic.
            </p>
          </div>

          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">What you receive</p>
            <div className="mt-5">
              <FixPackOutputPreview />
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">When to use it</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Buy Fix Pack when the error needs affected rows, not just advice.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The Fix Pack is for the moment when a Merchant Center warning becomes operational: you need to find the right rows, fields, and safe actions inside a Shopify CSV.
            </p>
          </div>
          <BeforeAfterTable />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Supported checks</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Focused product-data checks.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check) => (
              <div key={check} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Sample row output</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Rows, reasons, and safe actions.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            A merchant should understand which row is affected, why it matters, and what should happen next.
          </p>
          <div className="mt-6">
            <SampleReportTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">CSV requirements</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Shopify CSV fields MerchantFix can use.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Upload the cleanest Shopify export available. Standard fields make the diagnosis clearer and easier to review.
          </p>
          <div className="mt-6">
            <ShopifyCsvRequirements />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How it works</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A simple repair path, without risky guesses.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {process.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="mt-4 font-semibold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <SafeDiagnosticNotice />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Before you buy the Fix Pack.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg bg-slate-50 p-4">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Ready to prepare your CSV</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Get the row-level diagnosis before changing product data.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Complete checkout, upload your Shopify CSV, and review the diagnosis before editing or resubmitting products.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <CheckoutButton plan="fix-pack">Start Fix Pack checkout</CheckoutButton>
              <SecondaryLink href="/how-to-export-shopify-csv">How to export CSV</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
