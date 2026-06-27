import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import {
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
  title: "Fix Pack | Shopify CSV row diagnosis for Merchant Center warnings",
  description:
    "One-time 29 € Shopify CSV diagnosis showing affected rows, fields to check, evidence needed, and unsafe changes to avoid before resubmitting products.",
  alternates: {
    canonical: canonical("/fix-pack")
  }
};

const whatYouGet = [
  {
    title: "Affected Shopify rows",
    text: "See which product rows are likely connected to the warning."
  },
  {
    title: "Field to check",
    text: "Variant Barcode, Vendor, MPN, price, image, identifier_exists, and other relevant fields."
  },
  {
    title: "What to verify",
    text: "Packaging, supplier sheet, manufacturer data, Shopify admin, or storefront proof."
  },
  {
    title: "What not to touch",
    text: "Rows where MerchantFix should not guess, invent, or apply an automatic change."
  }
];

const process = [
  { title: "1. Pay once", text: "Start the 29 € Fix Pack checkout. No subscription in the launch offer." },
  { title: "2. Upload CSV", text: "Upload a fresh Shopify product CSV export after checkout." },
  { title: "3. Read the report", text: "Get row findings, evidence needed, and decision labels before editing." },
  { title: "4. Download notes", text: "Download an annotated CSV when safe output is available." }
];

const plainLabels = [
  {
    technical: "safe_note",
    plain: "Safe note",
    meaning: "A note can be added without inventing product facts."
  },
  {
    technical: "manual_review",
    plain: "Needs proof",
    meaning: "The value cannot be known from the CSV alone. Check real evidence first."
  },
  {
    technical: "blocked",
    plain: "Do not change yet",
    meaning: "The case is unsafe, malformed, unsupported, or not fit for automatic correction."
  }
];

const notIncluded = [
  "No fake GTIN generation",
  "No invented MPN, brand, price, shipping, or tax values",
  "No Google approval guarantee",
  "No Merchant Center account recovery service",
  "No Shopify app or Google API connection in the current launch scope",
  "No monthly subscription in the launch offer"
];

const faqs = [
  {
    question: "What do I get after buying the Fix Pack?",
    answer:
      "You get access to the Shopify CSV diagnostic flow, affected-row diagnosis, evidence-needed notes, decision labels, and an annotated CSV when safe notes or deterministic output are available."
  },
  {
    question: "When should I choose the Fix Pack?",
    answer:
      "Choose it when a Merchant Center warning affects multiple Shopify products or when you need row-level CSV context before editing product data."
  },
  {
    question: "Does every report include an annotated CSV?",
    answer:
      "No. An annotated CSV is generated only when safe notes or deterministic output are available. Missing product facts are never invented."
  },
  {
    question: "Will MerchantFix invent missing identifiers?",
    answer:
      "No. MerchantFix never invents GTIN, MPN, brand, price, shipping, tax, or product facts. Uncertain rows are marked for proof or blocked."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix diagnoses supported product-data issues, but Google approval, ranking, traffic, performance, sales, and account recovery are not guaranteed."
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Fix Pack</TextBadge>
              <TextBadge tone="slate">29 € one-time</TextBadge>
              <TextBadge tone="green">No subscription</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Get the Shopify rows behind your Merchant Center warning.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Upload your Shopify product CSV and receive a clear report: what to fix, what to verify, and what not to change yet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton plan="fix-pack">Start Fix Pack checkout</CheckoutButton>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              One-time 29 €. No fake identifiers. No invented product facts. No Google approval guarantee.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Example output</p>
            <h2 className="mt-3 text-2xl font-black">From vague warning to row-level decision.</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Warning", "Missing value [gtin]"],
                ["Row", "42 — Blue Running Shoes"],
                ["Field", "Variant Barcode"],
                ["Decision", "Needs supplier barcode proof"],
                ["Avoid", "Do not invent a GTIN"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 font-bold leading-6 text-white">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {whatYouGet.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
              <h2 className="font-black text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Simple process</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Pay once. Upload. Review. Decide.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                The Fix Pack is for the moment when you need rows and evidence, not another generic help article.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {process.map((step) => (
                <article key={step.title} className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h3 className="font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Plain-language row decisions</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Every row gets a practical label.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The report keeps the technical status, but the merchant sees the real meaning: safe note, needs proof, or do not change yet.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plainLabels.map((row) => (
              <article key={row.technical} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                <p className="font-mono text-sm font-black text-blue-700">{row.technical}</p>
                <h3 className="mt-3 text-2xl font-black text-slate-950">{row.plain}</h3>
                <p className="mt-3 leading-7 text-slate-600">{row.meaning}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Deliverables</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">What the paid report includes now.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The current launch deliverable is an on-screen diagnostic report and an annotated CSV when safe output is available. PDF and ZIP delivery are later layers.
              </p>
            </div>
            <FixPackOutputPreview />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Before checkout</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Use the right CSV file.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              MerchantFix works best with a fresh Shopify product CSV export. Do not upload a feed-app export, order export, or manually renamed spreadsheet.
            </p>
          </div>
          <ShopifyCsvRequirements />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 shadow-xl shadow-red-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Not included</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Strong output, strict limits.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                MerchantFix stays useful because it does not pretend to know facts that are missing from the CSV.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notIncluded.map((item) => (
                <div key={item} className="rounded-2xl border border-red-200 bg-white px-4 py-3 font-bold leading-7 text-red-950">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Sample rows</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">See the kind of rows the report highlights.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The sample uses fictional data, but the structure matches the real decision output: row, product, issue, decision, and evidence.
            </p>
          </div>
          <div className="mt-6">
            <SampleReportTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <SafeDiagnosticNotice />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:px-8 md:pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Before you buy.</h2>
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
    </main>
  );
}
