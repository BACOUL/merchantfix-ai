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
  title: "MerchantFix.ai | Shopify CSV diagnosis for Merchant Center errors",
  description:
    "Paste a Google Merchant Center warning, identify Shopify fields to check, and use Fix Pack for row-level CSV diagnosis of GTIN, brand, MPN, identifier_exists, price, availability, and image issues.",
  alternates: {
    canonical: canonical("/")
  }
};

const proofPoints = [
  { label: "Free first step", value: "Paste your warning" },
  { label: "Paid diagnostic", value: "29 € Fix Pack" },
  { label: "Input", value: "Shopify CSV export" },
  { label: "Safety rule", value: "No fake identifiers" }
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

const offerSteps = [
  {
    title: "Free",
    price: "Paste your warning",
    text: "Start with the exact Google Merchant Center message and see which Shopify fields are likely involved."
  },
  {
    title: "29 € Fix Pack",
    price: "CSV-level diagnosis",
    text: "Use the paid Fix Pack when you need affected rows, manual review flags, and safe notes before editing or resubmitting products."
  },
  {
    title: "No subscription",
    price: "One-off review",
    text: "No Shopify admin access, no Google login, no fake GTINs, and no invented product facts."
  }
];

const workflowSteps = [
  { title: "Understand the warning", text: "Paste the Google Merchant Center message and see which Shopify fields are likely involved." },
  { title: "Check visible product data", text: "Run a public Shopify scan when the store exposes enough product information." },
  { title: "Use CSV when rows matter", text: "Buy Fix Pack only when the issue needs row-level Shopify CSV diagnosis." },
  { title: "Review before editing", text: "Apply safe notes and deterministic changes only. Product facts must be verified." }
];

const feedAppComparison = [
  ["Main job", "Push product data to Google", "Diagnose what is wrong before editing"],
  ["Connection", "Often connects to Shopify or Google", "Starts with pasted error, public URL, or CSV"],
  ["Best use", "Ongoing feed sync", "Fast error understanding and row-level review"],
  ["Risk", "Can change feed output", "Blocks unsafe guesses and flags manual review"],
  ["Merchant value", "Automation", "Clarity before resubmission"]
];

const homeFaqs = [
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Live-style diagnosis</p>
            <h2 className="mt-3 text-2xl font-black text-white">Missing value [gtin]</h2>
          </div>
          <span className="w-fit rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black text-red-800">Critical</span>
        </div>

        <div className="mt-5 grid gap-3">
          {[
            ["Likely Shopify field", "Variant Barcode"],
            ["Also check", "Vendor / Brand, MPN, custom product status"],
            ["Unsafe shortcut", "Do not invent GTIN values"],
            ["Best next step", "Fix Pack for affected CSV rows"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
              <p className="mt-2 font-bold leading-6 text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-blue-300/20 bg-blue-300/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">What changes</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
            The merchant moves from a vague Google warning to a row-level Shopify worklist before editing product data.
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
              <TextBadge tone="blue">Shopify product data</TextBadge>
              <TextBadge tone="slate">Google Merchant Center warnings</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Paste your Google Merchant Center warning. Get a Shopify CSV fix plan.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix helps Shopify merchants turn GTIN, brand, MPN, identifier_exists, price, availability, and image warnings into clear actions before editing product data or resubmitting to Google.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
              <p>No Shopify admin access.</p>
              <p>No fake GTINs.</p>
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
        <section className="grid gap-6 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Use MerchantFix when you see this</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Recognize your Merchant Center warning immediately.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The faster a merchant recognizes the exact warning, the faster the product value becomes obvious.
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
              Merchant Center messages are often vague. MerchantFix turns them into a practical review flow: fields, rows, risk level, and safe next action.
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">A narrow path from warning to action.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The product stays focused on the moment before a merchant edits product data: understand, check, diagnose, then review.
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
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Not a feed app. A diagnosis layer.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Feed apps push product data. MerchantFix helps merchants understand what is wrong before they change the data.
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

        <section className="grid gap-5 rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Fix Pack CSV diagnostic</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Need row-level CSV diagnosis?</h2>
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
