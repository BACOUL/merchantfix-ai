import type { Metadata } from "next";
import {
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
  title: "MerchantFix.ai | Find Shopify rows behind Merchant Center warnings",
  description:
    "Paste a Google Merchant Center warning, upload a Shopify CSV, and see which rows to fix, verify, or avoid changing before resubmitting products.",
  alternates: {
    canonical: canonical("/")
  }
};

const proofPoints = [
  { label: "Problem", value: "Merchant Center warning" },
  { label: "Input", value: "Shopify product CSV" },
  { label: "Output", value: "Rows to check" },
  { label: "Price", value: "29 € Fix Pack" }
];

const warningExamples = [
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

const simpleSteps = [
  {
    title: "Paste the warning",
    text: "Start with the exact message shown by Google Merchant Center."
  },
  {
    title: "Upload the Shopify CSV",
    text: "Use the product export from Shopify when row-level diagnosis is needed."
  },
  {
    title: "Review the rows",
    text: "See what to fix, what needs proof, and what should not be changed yet."
  }
];

const decisionCards = [
  {
    title: "Fix",
    label: "Safe note",
    text: "A clear CSV note can be added without inventing product facts."
  },
  {
    title: "Verify",
    label: "Needs proof",
    text: "The row needs packaging, supplier, manufacturer, Shopify, or storefront evidence."
  },
  {
    title: "Do not change yet",
    label: "Blocked",
    text: "The case is unsafe, incomplete, or outside automatic correction."
  }
];

const beforeAfterRows = [
  ["Before", "Google says Missing value [gtin]. You do not know which Shopify products caused it."],
  ["After", "MerchantFix shows the affected rows, fields, reason, and evidence needed before editing."],
  ["Before", "You risk copying SKU into MPN or inventing identifiers to make the warning disappear."],
  ["After", "MerchantFix flags rows that need proof and blocks unsafe shortcuts."]
];

const homeFaqs = [
  {
    question: "Is MerchantFix a feed app?",
    answer:
      "No. MerchantFix is a diagnostic layer before feed edits. It helps Shopify merchants understand product-data warnings before changing data or resubmitting."
  },
  {
    question: "When should I buy the Fix Pack?",
    answer:
      "Buy the Fix Pack when the warning affects several products or requires row-level Shopify CSV diagnosis, especially GTIN, MPN, brand, identifier_exists, price, availability, or image issues."
  },
  {
    question: "Does MerchantFix connect to Shopify admin or Google Merchant Center?",
    answer:
      "No. The current launch flow uses pasted warning text, public product data when available, and a Shopify product CSV export uploaded after checkout."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix helps diagnose supported product-data issues and safe next actions, but Google approval, ranking, traffic, performance, account recovery, and sales are never guaranteed."
  }
];

function HeroEvidenceCard() {
  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Example warning</p>
        <h2 className="mt-3 break-words text-3xl font-black text-white">Missing value [gtin]</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Instead of guessing, MerchantFix turns the warning into a Shopify row review.
        </p>

        <div className="mt-5 grid gap-3">
          {[
            ["Row", "42"],
            ["Product", "Blue Running Shoes"],
            ["Shopify field", "Variant Barcode"],
            ["Decision", "Needs supplier barcode proof"],
            ["Do not do", "Do not invent a GTIN"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
              <p className="mt-2 font-bold leading-6 text-white">{value}</p>
            </div>
          ))}
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.34),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 text-white sm:px-5 md:px-8 md:py-28 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Shopify CSV diagnosis</TextBadge>
              <TextBadge tone="slate">Google Merchant Center warnings</TextBadge>
              <TextBadge tone="green">29 € Fix Pack</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Find the Shopify rows behind your Merchant Center warning.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Paste the warning, upload your Shopify product CSV, and see what to fix, what to verify, and what not to change before resubmitting products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
              <p>No fake identifiers.</p>
              <p>No Shopify app install.</p>
              <p>No Google approval guarantee.</p>
            </div>
          </div>

          <HeroEvidenceCard />
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
        <section className="grid gap-6 pb-14 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Use MerchantFix when you see this</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">The warning is precise. The row is not.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Google may tell you the problem, but not always the exact Shopify row, field, or evidence needed. MerchantFix focuses on that gap.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {warningExamples.map((warning) => (
              <div key={warning} className="rounded-2xl border border-slate-200 bg-white p-4 font-black text-slate-950 shadow-sm shadow-slate-200/70">
                {warning}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">From warning to action in 3 steps.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                The site should feel simple: paste the real warning, upload the Shopify CSV, then review the rows before editing product data.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {simpleSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-700 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-4 text-xl font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="py-14">
          <ErrorPasteForm />
        </div>

        <section className="grid gap-6 pb-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What the report decides</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Three labels, plain meaning.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The report avoids vague advice. Each row is translated into a decision the merchant can understand before touching Shopify.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {decisionCards.map((card) => (
              <article key={card.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">{card.label}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Before / after</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Less guessing. More proof.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The product is strongest when the merchant immediately sees the difference between a vague warning and a row-level review list.
            </p>
          </div>
          <div className="grid gap-3">
            {beforeAfterRows.map(([label, text]) => (
              <article key={text} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-black leading-7 text-slate-950">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">29 € Fix Pack</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">When you need the rows, not another checklist.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Use the paid diagnostic when the warning affects many products or when you need CSV-level context before editing Shopify.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
          <FixPackOutputPreview />
        </section>

        <SafeDiagnosticNotice />

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
