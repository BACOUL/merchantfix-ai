import type { Metadata } from "next";
import { FixPackOutputPreview, PrimaryLink, SampleReportTable, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { annotatedCsvPreviewColumns, annotatedCsvPreviewRows, beforeAfterRows } from "@/lib/fix-pack-sample-data";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sample Report | MerchantFix.ai Shopify CSV diagnosis",
  description:
    "Example Shopify CSV diagnostic report showing guardrail status, manual review reasons, evidence needed, affected rows, and CSV-level notes.",
  alternates: { canonical: canonical("/sample-report") }
};

const summaryCards = [
  { label: "Products analyzed", value: "248", detail: "Demo Shopify CSV" },
  { label: "manual_review rows", value: "22", detail: "Need product evidence" },
  { label: "blocked rows", value: "6", detail: "Not safe to auto-fix" },
  { label: "safe_note rows", value: "41", detail: "Notes only, no invented facts" }
];

const outputFiles = [
  {
    filename: "On-screen diagnostic report",
    detail: "A readable report page with detected issues, priorities, affected rows, guardrails, limitations, and resubmission risks. PDF export is planned for a later delivery layer."
  },
  {
    filename: "merchantfix-annotated-products.csv",
    detail: "Your Shopify CSV enriched with MerchantFix notes, actions, status, manual-review reason, and evidence-needed columns when safe output is available."
  },
  {
    filename: "Manual-review rows inside the report",
    detail: "Rows that require packaging, supplier data, manufacturer data, barcode, brand, or merchant verification are clearly marked instead of auto-fixed."
  },
  {
    filename: "Resubmission checklist inside the report",
    detail: "A simple set of next steps before editing Shopify, uploading a feed, or resubmitting products."
  }
];

const faqs = [
  { question: "Is this based on a real merchant?", answer: "No. The sample uses fictional data to show the structure and clarity of a MerchantFix report." },
  { question: "What does the report show?", answer: "It shows affected rows, current field context, guardrail status, recommended action, manual review reason, and evidence needed before editing Shopify." },
  { question: "Does every report include an annotated CSV?", answer: "No. An annotated CSV is only produced when safe notes or deterministic changes are available. Missing product facts are never invented." },
  { question: "What does blocked mean?", answer: "Blocked means MerchantFix should not deliver an automated correction for that row or case. It needs a fresh file, merchant verification, or broader review." }
];

export default function SampleReportPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sample report", path: "/sample-report" }]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.26),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Example Fix Pack output</TextBadge>
              <TextBadge tone="slate">Fictional Shopify CSV</TextBadge>
              <TextBadge tone="green">Guardrail preview</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              See the exact kind of CSV diagnosis a merchant receives.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              This fictional report shows how MerchantFix turns product-data warnings into affected rows, current values, guardrail status, manual-review reasons, and evidence needed before Shopify edits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack details</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Demo catalog</p>
            <h2 className="mt-3 text-2xl font-black">Outdoor accessories store</h2>
            <p className="mt-3 leading-7 text-slate-300">Fictional CSV export. This is not a real merchant report and does not represent a live diagnosis.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {summaryCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{card.label}</p>
                  <p className="mt-2 text-4xl font-black">{card.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-300">{card.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What you receive now</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Concrete output, not vague advice.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Fix Pack is designed for merchants who already have a product-data warning and need CSV-level clarity before editing Shopify or resubmitting products.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outputFiles.map((file) => (
              <article key={file.filename} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
                <p className="break-words font-black text-slate-950">{file.filename}</p>
                <p className="mt-2 leading-7 text-slate-600">{file.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Annotated CSV preview</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">The output columns make the next step visible.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                MerchantFix keeps the original Shopify data and adds columns that separate safe notes from product facts that need proof.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {annotatedCsvPreviewColumns.map((column) => (
                <div key={column} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm font-black text-slate-800">
                  {column}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Product</th>
                  <th className="px-3 py-2 font-black">Shopify field</th>
                  <th className="px-3 py-2 font-black">merchantfix_status</th>
                  <th className="px-3 py-2 font-black">Reason</th>
                  <th className="px-3 py-2 font-black">Evidence needed</th>
                </tr>
              </thead>
              <tbody>
                {annotatedCsvPreviewRows.map((row) => (
                  <tr key={row.title} className="bg-white font-semibold leading-6 text-slate-700">
                    <td className="rounded-l-xl px-3 py-4 font-black text-slate-950">{row.title}</td>
                    <td className="px-3 py-4 font-mono text-xs font-black text-slate-950">{row.shopifyField}</td>
                    <td className="px-3 py-4 font-mono text-xs font-black text-blue-700">{row.merchantfixStatus}</td>
                    <td className="px-3 py-4">{row.manualReviewReason}</td>
                    <td className="rounded-r-xl px-3 py-4">{row.evidenceNeeded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">What this proves</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">The report makes the invisible work visible.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              A merchant should immediately understand which products need attention, what can be reviewed safely, and where human verification is required.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Before / after</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">From warning text to a prioritized review list.</h2>
            <div className="mt-6 grid gap-3">
              {beforeAfterRows.map((row) => (
                <article key={row.before} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Before</p>
                    <p className="mt-2 font-semibold leading-7 text-slate-700">{row.before}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">After</p>
                    <p className="mt-2 font-black leading-7 text-slate-950">{row.after}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Row-level table</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Rows, current values, guardrails, and evidence needed.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            This preview shows how a Fix Pack separates what can be explained safely from what still needs merchant, supplier, packaging, barcode, or brand verification.
          </p>
        </div>

        <div className="mt-6">
          <SampleReportTable />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Deliverables</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What the paid report includes now.</h2>
            <p className="mt-4 leading-7 text-slate-700">The output gives merchants concrete CSV-level context they can review before editing Shopify or resubmitting products.</p>
          </div>
          <FixPackOutputPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Before you buy from the sample.</h2>
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
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Best next step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with your real product-data warning.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">Paste your exact warning first, then buy the Fix Pack if affected rows, CSV-level notes, or manual review flags are needed.</p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
