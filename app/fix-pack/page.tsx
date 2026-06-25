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
  "Annotated CSV only when safe"
];

const process = [
  { title: "Export", text: "Export a clean Shopify product CSV before editing it." },
  { title: "Checkout", text: "Open the one-time Fix Pack checkout." },
  { title: "Upload", text: "Upload your Shopify CSV export after payment." },
  { title: "Review", text: "Read critical issues, warnings, affected rows, and safe actions." },
  { title: "Download", text: "Download annotation notes or deterministic changes only when safe." }
];

const faqs = [
  {
    question: "What do I get after buying the Fix Pack?",
    answer:
      "You get access to the Shopify CSV diagnostic flow, a prioritized report, affected rows when available, safe correction guidance, manual review flags, and an annotated CSV only when safe notes or deterministic changes are available."
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

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.3),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Fix Pack</TextBadge>
              <TextBadge tone="slate">29 € one-time</TextBadge>
              <TextBadge tone="green">Launch offer</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Row-level Shopify CSV diagnosis before you edit product data.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Use Fix Pack when Google flags GTIN, MPN, brand, identifier_exists, price, availability, or image issues and you need a practical list of Shopify rows to review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton plan="fix-pack">Start Fix Pack checkout</CheckoutButton>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              No fake identifiers. No invented product facts. No Google approval guarantee.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">What the merchant receives</p>
            <h2 className="mt-3 text-2xl font-black">A diagnostic package, not vague advice.</h2>
            <div className="mt-5">
              <FixPackOutputPreview />
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">When to use it</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Buy Fix Pack when the problem needs rows, not another generic checklist.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The paid flow is for operational Merchant Center warnings: you need to know which products are affected, which fields matter, and which rows require manual verification.
            </p>
          </div>
          <BeforeAfterTable />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Supported checks</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Focused product-data review.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The scope stays focused on the product-data fields that most often create Shopify-to-Google Merchant Center friction.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {checks.map((check) => (
                <div key={check} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                  {check}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Sample row output</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Rows, reasons, and safe actions.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The report should make the next action obvious: which row is affected, why it matters, what can be changed safely, and what needs human verification.
            </p>
          </div>
          <div className="mt-6">
            <SampleReportTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">CSV requirements</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">The cleaner the export, the clearer the diagnosis.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Upload the cleanest Shopify product CSV available. Standard columns help MerchantFix identify rows and fields without guessing product facts.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-6">
            <ShopifyCsvRequirements />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How it works</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">A controlled path without risky guesses.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <h3 className="mt-4 font-black text-slate-950">{step.title}</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <SafeDiagnosticNotice />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Before you buy the Fix Pack.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:px-8 md:pb-24">
        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
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
