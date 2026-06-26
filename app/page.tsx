import type { Metadata } from "next";
import {
  BeforeAfterTable,
  ErrorPasteForm,
  FixPackOutputPreview,
  PrimaryLink,
  SafeDiagnosticNotice,
  SecondaryLink,
  TextBadge
} from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix.ai | Pre-feed Shopify CSV diagnosis for Merchant Center errors",
  description:
    "Paste a Google Merchant Center warning, upload a Shopify CSV, and get the rows to fix, review, or block before making risky product-data edits.",
  alternates: {
    canonical: canonical("/")
  }
};

const proofPoints = [
  { label: "Category", value: "Pre-feed diagnosis" },
  { label: "Free first step", value: "Paste warning" },
  { label: "Paid output", value: "29 € Fix Pack" },
  { label: "Safety rule", value: "No invented product facts" }
];

const supportedWarnings = [
  "Missing value [gtin]",
  "Invalid value [gtin]",
  "Missing value [brand]",
  "Missing value [mpn]",
  "identifier_exists conflict",
  "SKU used as MPN",
  "Price mismatch",
  "Availability mismatch",
  "Image issue"
];

const categoryPillars = [
  {
    title: "Before a feed app changes output",
    text: "MerchantFix helps merchants understand what the Merchant Center warning is really pointing at before they edit product data."
  },
  {
    title: "Before a Shopify CSV is modified",
    text: "The product turns a vague warning into a row-level worklist with fields, reasons, and evidence needed."
  },
  {
    title: "Before dangerous shortcuts",
    text: "Rows that need product truth are marked manual_review or blocked instead of inventing identifiers, brands, or account recovery promises."
  }
];

const offerSteps = [
  {
    title: "Free",
    price: "Paste the exact warning",
    text: "Start with the real Google Merchant Center message and see which Shopify fields are likely involved."
  },
  {
    title: "29 € Fix Pack",
    price: "Upload Shopify CSV",
    text: "Use the paid Fix Pack when you need affected rows, guardrail status, evidence needed, and annotated CSV output."
  },
  {
    title: "No subscription",
    price: "One-off diagnosis",
    text: "No Shopify admin access, no Google login, no fake GTINs, and no invented product facts."
  }
];

const workflowSteps = [
  { title: "Paste", text: "Paste the exact Merchant Center warning so the diagnostic starts from the real problem." },
  { title: "Map", text: "See likely Shopify fields such as Variant Barcode, Vendor, MPN, price, image, or identifier_exists." },
  { title: "Upload", text: "Use Fix Pack when the issue needs row-level diagnosis from a Shopify CSV export." },
  { title: "Decide", text: "Rows are classified as safe_note, manual_review, or blocked before editing product data." }
];

const feedAppComparison = [
  ["Main job", "Push or optimize product feeds", "Diagnose product-data errors before editing"],
  ["Connection", "Often connects to Shopify, Google, or ad channels", "Starts with warning text, public data, or CSV"],
  ["Best use", "Ongoing feed sync and rules", "Fast error understanding and row-level review"],
  ["Risk control", "Can change feed output", "Blocks unsafe guesses and flags manual review"],
  ["Output", "Feed configuration", "Rows to fix, review, or block"]
];

const guardrailRows = [
  ["safe_note", "A note can be added without changing factual product data."],
  ["manual_review", "The merchant must verify packaging, supplier, manufacturer, Shopify, or storefront evidence."],
  ["blocked", "The case should not be treated as an automated correction."]
];

const homeFaqs = [
  {
    question: "Is MerchantFix a feed app?",
    answer:
      "No. MerchantFix is a diagnostic layer before feed edits. It helps Shopify merchants understand and review Google Merchant Center product-data warnings before changing data or resubmitting."
  },
  {
    question: "Can I paste a real Google Merchant Center error?",
    answer:
      "Yes. The homepage detects common Shopify-related Merchant Center warnings such as missing GTIN, invalid GTIN, missing brand, missing MPN, identifier_exists conflicts, price mismatch, availability mismatch, image issues, and limited misrepresentation support."
  },
  {
    question: "When should I buy the Fix Pack?",
    answer:
      "Buy the Fix Pack when the warning affects many products or requires row-level Shopify CSV diagnosis, especially GTIN, MPN, brand, identifier_exists, price, availability, or image issues."
  },
  {
    question: "Does MerchantFix connect to Shopify admin or Google Merchant Center?",
    answer:
      "No. The free scan uses public product data when available. The Fix Pack uses a Shopify CSV export uploaded after checkout."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix helps diagnose supported product data issues and safe next actions, but Google approval, ranking, traffic, performance, account recovery, and sales are never guaranteed."
  }
];

function HeroReportCard() {
  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Pre-feed diagnostic</p>
            <h2 className="mt-3 text-2xl font-black text-white">Missing value [gtin]</h2>
          </div>
          <span className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-900">CSV worklist</span>
        </div>

        <div className="mt-5 grid gap-3">
          {[
            ["Likely Shopify field", "Variant Barcode"],
            ["Rows to review", "Affected CSV rows, not vague advice"],
            ["Guardrail", "safe_note / manual_review / blocked"],
            ["Unsafe shortcut", "Do not invent GTIN values"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
              <p className="mt-2 font-bold leading-6 text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-blue-300/20 bg-blue-300/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">Category position</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
            Not a feed app. Not an agency. A diagnostic layer before risky Shopify product-data edits.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function HomePage() {
  const faqSchema = buildFaqPageSchema(homeFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 text-white sm:px-5 md:px-8 md:py-28 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Pre-feed diagnostic layer</TextBadge>
              <TextBadge tone="slate">Shopify + Google Merchant Center</TextBadge>
              <TextBadge tone="green">29 € Fix Pack</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Paste the warning. Upload the CSV. Get the rows to fix, review, or block.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix helps Shopify merchants understand Google Merchant Center product-data errors before they make dangerous feed edits. It maps warnings to Shopify fields, CSV rows, guardrails, and evidence needed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
              <SecondaryLink href="/fix-pack">View the Fix Pack</SecondaryLink>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
              <p>Not a feed app.</p>
              <p>No fake identifiers.</p>
              <p>No Google approval guarantee.</p>
            </div>
          </div>

          <HeroReportCard />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:px-5 md:grid-cols-4 md:px-8">
          {proofPoints.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-2 font-black text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <section className="grid gap-4 pb-14 md:grid-cols-3">
          {categoryPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Why MerchantFix exists</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Use MerchantFix when you see this</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Recognize the exact warning immediately.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The product should feel obvious the moment a merchant recognizes the error that is blocking or limiting product visibility.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supportedWarnings.map((warning) => (
              <div key={warning} className="rounded-2xl border border-slate-200 bg-white p-4 font-black text-slate-950 shadow-sm shadow-slate-200/70">
                {warning}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pb-14 md:grid-cols-3">
          {offerSteps.map((step) => (
            <article key={step.title} className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">{step.title}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{step.price}</h2>
              <p className="mt-3 leading-7 text-slate-700">{step.text}</p>
            </article>
          ))}
        </section>

        <ErrorPasteForm />

        <section className="grid gap-6 py-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Product value</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Stop guessing which Shopify row caused the warning.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Merchant Center messages are often too broad. MerchantFix turns them into a practical review flow: fields, rows, risk level, guardrail status, and evidence needed.
            </p>
          </div>
          <div className="grid gap-5">
            <BeforeAfterTable />
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Fix Pack deliverable</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Concrete output, not generic advice.</h3>
              <p className="mt-3 leading-7 text-slate-600">
                The paid 29 € product is designed for merchants who need row-level Shopify CSV diagnosis before editing or resubmitting products.
              </p>
              <div className="mt-5">
                <FixPackOutputPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">A narrow path from warning to safe action.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The product stays focused on the moment before a merchant edits product data: understand the warning, map fields, analyze rows, then decide safely.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {workflowSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-4 font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-14 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Positioning</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Not a feed app. The layer before the feed edit.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Feed apps push and optimize product data. MerchantFix helps merchants understand what to verify before changing that data.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Area</th>
                  <th className="px-3 py-2 font-black">Feed app</th>
                  <th className="px-3 py-2 font-black">MerchantFix</th>
                </tr>
              </thead>
              <tbody>
                {feedAppComparison.map(([area, feedApp, merchantFix]) => (
                  <tr key={area} className="bg-slate-50 font-semibold leading-6 text-slate-700">
                    <td className="rounded-l-xl px-3 py-4 text-slate-950">{area}</td>
                    <td className="px-3 py-4">{feedApp}</td>
                    <td className="rounded-r-xl px-3 py-4 font-black text-slate-950">{merchantFix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Guardrail output</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Rows are classified before the merchant edits anything.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                The goal is not to automate product truth. The goal is to make the next safe decision obvious.
              </p>
            </div>
            <div className="grid gap-3">
              {guardrailRows.map(([status, text]) => (
                <article key={status} className="rounded-2xl border border-blue-100 bg-white p-5">
                  <p className="font-mono text-sm font-black text-blue-700">{status}</p>
                  <p className="mt-2 font-semibold leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Fix Pack CSV diagnostic</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Need row-level Shopify CSV diagnosis?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Review the sample report, then buy the Fix Pack when your warning affects multiple products or needs affected rows.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
            <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
          </div>
        </section>

        <div className="mt-10">
          <SafeDiagnosticNotice />
        </div>

        <section className="py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">What merchants usually ask first.</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
