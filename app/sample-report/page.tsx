import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sample Report | MerchantFix.ai",
  description:
    "Example Shopify CSV diagnostic report showing product data issues, priorities, safe fixes, and manual review flags.",
  alternates: {
    canonical: canonical("/sample-report")
  }
};

const summaryCards = [
  { label: "Products analyzed", value: "248", detail: "Demo Shopify CSV" },
  { label: "Critical issues", value: "37", detail: "Need review before resubmission" },
  { label: "Warnings", value: "64", detail: "Improve data quality" },
  { label: "Safe fixes", value: "19", detail: "Deterministic changes only" }
];

const issues = [
  {
    priority: "Critical",
    field: "GTIN",
    rows: "18 rows",
    problem: "Missing barcode values for products that appear to need identifiers.",
    action: "Review product packaging or supplier data. Do not invent GTIN values."
  },
  {
    priority: "Critical",
    field: "identifier_exists",
    rows: "9 rows",
    problem: "identifier_exists appears inconsistent with available brand and MPN data.",
    action: "Check whether real identifiers exist before changing the field."
  },
  {
    priority: "Warning",
    field: "Brand",
    rows: "4 rows",
    problem: "Brand field is missing or too generic.",
    action: "Confirm the official brand name or mark for manual review."
  },
  {
    priority: "Warning",
    field: "Image",
    rows: "12 rows",
    problem: "Some products have missing or weak image signals.",
    action: "Review product media before resubmitting affected products."
  },
  {
    priority: "Info",
    field: "Description",
    rows: "21 rows",
    problem: "Descriptions appear thin or weak for shopping surfaces.",
    action: "Improve visible product context without keyword stuffing."
  }
];

const actions = [
  "Fix safe structural CSV issues first.",
  "Manually verify GTIN, MPN, and brand before changing identifier fields.",
  "Improve product images and prices where warnings are detected.",
  "Keep a clean export before resubmitting products.",
  "Never add invented identifiers to satisfy a feed warning."
];

const faqs = [
  {
    question: "Is this sample report based on a real merchant?",
    answer: "No. The sample report uses fictional product data to show the type of structure, priorities, and safety notes a merchant can expect."
  },
  {
    question: "What does the Fix Pack report show?",
    answer: "It shows diagnostic summaries, affected rows when available, issue priorities, safe correction guidance, and manual review flags."
  },
  {
    question: "Does every report include a corrected CSV?",
    answer: "No. A corrected CSV is only produced when a change is deterministic and safe. Uncertain product data is marked for manual review."
  },
  {
    question: "Does the sample report guarantee Google approval?",
    answer: "No. MerchantFix.ai does not guarantee Google approval, ranking, traffic, performance, sales, or account recovery."
  }
];

export default function SampleReportPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Sample report", path: "/sample-report" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="min-w-0">
            <TextBadge tone="blue">Example report</TextBadge>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              See what a MerchantFix diagnostic report should make clear.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This fictional sample shows the kind of output a Shopify merchant should understand quickly: what is wrong,
              how serious it is, and which rows need safe correction or manual review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">Buy Fix Pack</PrimaryLink>
              <SecondaryLink href="/pricing">Compare pricing</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Demo catalog</p>
            <h2 className="mt-3 text-2xl font-black">Outdoor accessories store</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Fictional CSV export. This is not a real merchant report and does not represent a live diagnosis.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {summaryCards.map((card) => (
                <div key={card.label} className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{card.label}</p>
                  <p className="mt-2 text-4xl font-black">{card.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-300">{card.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Issue table</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Prioritized rows and actions.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A merchant should not receive vague advice. The report must separate critical issues, warnings, and rows that require manual review.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Priority</th>
                  <th className="px-3 py-2 font-black">Field</th>
                  <th className="px-3 py-2 font-black">Affected rows</th>
                  <th className="px-3 py-2 font-black">Problem</th>
                  <th className="px-3 py-2 font-black">Recommended action</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={`${issue.field}-${issue.rows}`} className="bg-slate-50 font-semibold text-slate-700">
                    <td className="rounded-l-lg px-3 py-3 text-slate-950">{issue.priority}</td>
                    <td className="px-3 py-3">{issue.field}</td>
                    <td className="px-3 py-3">{issue.rows}</td>
                    <td className="px-3 py-3">{issue.problem}</td>
                    <td className="rounded-r-lg px-3 py-3">{issue.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Recommended next actions</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Clear order of work.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              The report should help a merchant decide what to fix now, what to verify manually, and what should not be guessed.
            </p>
          </div>
          <div className="grid gap-3">
            {actions.map((action, index) => (
              <div key={action} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="font-semibold leading-7 text-slate-700">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Before you buy from the sample.</h2>
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
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em]">Important</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">This sample is not a guarantee.</h2>
          <p className="mt-4 max-w-4xl leading-7 font-semibold">
            MerchantFix.ai does not guarantee approval, visibility, ranking, traffic, performance, or sales. It helps diagnose supported product data issues and marks uncertain data for manual review.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/fix-pack">Buy Fix Pack</PrimaryLink>
            <SecondaryLink href="/pricing">Compare pricing</SecondaryLink>
          </div>
        </div>
      </section>
    </main>
  );
}
