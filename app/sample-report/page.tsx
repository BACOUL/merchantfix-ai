import type { Metadata } from "next";
import { FixPackOutputPreview, PrimaryLink, SampleReportTable, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sample Report | MerchantFix.ai Shopify CSV diagnosis",
  description:
    "Example Shopify CSV diagnostic report showing row-level product data issues, priorities, safe actions, and manual review flags for Google Merchant Center warnings.",
  alternates: { canonical: canonical("/sample-report") }
};

const summaryCards = [
  { label: "Products analyzed", value: "248", detail: "Demo Shopify CSV" },
  { label: "Critical issues", value: "37", detail: "Review before resubmission" },
  { label: "Warnings", value: "64", detail: "Improve data quality" },
  { label: "Manual review rows", value: "22", detail: "Need merchant verification" }
];

const faqs = [
  { question: "Is this based on a real merchant?", answer: "No. The sample uses fictional data to show the structure and clarity a MerchantFix report should provide." },
  { question: "What does the report show?", answer: "It shows a summary, affected rows when available, issue priorities, field context, safe actions, and manual review flags." },
  { question: "Does every report include a corrected CSV?", answer: "No. A corrected CSV is only produced when a change is deterministic and safe. Missing product facts are never invented." },
  { question: "Does the sample guarantee approval?", answer: "No. MerchantFix does not guarantee Google approval, ranking, traffic, performance, sales, or account recovery." }
];

export default function SampleReportPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sample report", path: "/sample-report" }]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="min-w-0">
            <TextBadge tone="blue">Example report</TextBadge>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              See the row-level report before paying.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This fictional report shows the concrete value MerchantFix must deliver: affected rows, the Google issue, severity, why it matters, and the next safe action.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">Buy Fix Pack</PrimaryLink>
              <SecondaryLink href="/#paste-error">Paste my error first</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Demo catalog</p>
            <h2 className="mt-3 text-2xl font-black">Outdoor accessories store</h2>
            <p className="mt-3 leading-7 text-slate-300">Fictional CSV export. This is not a real merchant report and does not represent a live diagnosis.</p>
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Row-level table</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Rows, issues, reasons, and safe actions.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A merchant should not receive vague advice. The report must show what to check and what not to guess.
            </p>
          </div>
          <div className="mt-6">
            <SampleReportTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Deliverables</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What the paid report should include.</h2>
            <p className="mt-4 leading-7 text-slate-700">The output must be concrete enough for a merchant to use inside Shopify or a feed app without guessing product facts.</p>
          </div>
          <FixPackOutputPreview />
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
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Best next step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with your real Merchant Center warning.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">Paste your exact warning first, then buy the Fix Pack if affected rows are needed.</p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
