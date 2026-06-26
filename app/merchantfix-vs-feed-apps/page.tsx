import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix vs feed apps | Shopify Merchant Center diagnosis",
  description:
    "Understand how MerchantFix differs from Shopify feed apps: pre-feed diagnosis, CSV row review, guardrails, and evidence needed before editing product data.",
  alternates: {
    canonical: canonical("/merchantfix-vs-feed-apps")
  }
};

const comparisonRows = [
  ["Main job", "Sync, push, or optimize product feeds", "Diagnose Merchant Center product-data errors before editing"],
  ["Best moment", "After the merchant wants ongoing feed automation", "Before the merchant makes risky Shopify product-data changes"],
  ["Input", "Shopify admin, feed, catalog, or ad-channel connection", "Merchant Center warning, public product data, or Shopify CSV export"],
  ["Output", "Feed rules, feed submission, product sync, channel configuration", "Rows to fix, review, or block with reasons and evidence needed"],
  ["Risk control", "Can change what is sent to Google", "Flags unsafe rows as manual_review or blocked"],
  ["Identifier policy", "May help manage fields depending on configuration", "Never invents GTIN, MPN, brand, price, or product facts"],
  ["Pricing motion", "Often app install or subscription", "One-time 29 € Fix Pack during launch validation"],
  ["What it is not", "Not usually a focused pre-edit diagnostic report", "Not a feed app, not account recovery, not approval guarantee"]
];

const useCases = [
  {
    title: "Use a feed app when you need synchronization",
    points: [
      "ongoing Google Shopping feed submission",
      "multi-channel feed output",
      "feed rules, bulk edits, or channel mapping",
      "recurring catalog synchronization"
    ]
  },
  {
    title: "Use MerchantFix when you need diagnosis",
    points: [
      "you do not understand a Merchant Center warning",
      "you need to know which Shopify CSV rows are affected",
      "you want to avoid fake GTIN, MPN, or brand shortcuts",
      "you need manual-review reasons before resubmitting"
    ]
  }
];

const guardrails = [
  {
    status: "safe_note",
    text: "A diagnostic note can be added without changing factual product data."
  },
  {
    status: "manual_review",
    text: "The row needs real evidence such as packaging, supplier data, manufacturer data, Shopify admin, or storefront checks."
  },
  {
    status: "blocked",
    text: "The case should not be treated as an automated correction because it is malformed, unsupported, or outside safe automation."
  }
];

const competitorContext = [
  "Google & YouTube can help connect Shopify products to Google surfaces.",
  "Feed apps can help manage product feed submission, rules, mapping, channels, and recurring synchronization.",
  "MerchantFix focuses on the diagnostic moment before a merchant edits product data or relies on a feed rule.",
  "The goal is not to replace feed apps. The goal is to reduce dangerous product-data guesses before using them."
];

const faqs = [
  {
    question: "Does MerchantFix replace a Shopify feed app?",
    answer:
      "No. MerchantFix does not replace feed apps. It helps merchants understand product-data errors before editing Shopify or relying on feed changes."
  },
  {
    question: "Can I use MerchantFix before using a feed app?",
    answer:
      "Yes. That is the intended position. MerchantFix can help clarify which Shopify rows and fields need review before a merchant changes a feed configuration or resubmits product data."
  },
  {
    question: "Why not just let the feed app fix everything?",
    answer:
      "Some values are product truth, not formatting. A tool should not invent GTIN, MPN, brand, price, or account recovery claims. MerchantFix separates safe notes from rows that need evidence."
  },
  {
    question: "Does MerchantFix guarantee Google approval?",
    answer:
      "No. MerchantFix diagnoses supported product-data issues and helps create a safer review workflow, but Google approval, ranking, traffic, sales, or account recovery are not guaranteed."
  }
];

export default function MerchantFixVsFeedAppsPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "MerchantFix vs feed apps", path: "/merchantfix-vs-feed-apps" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">MerchantFix vs feed apps</TextBadge>
              <TextBadge tone="slate">Shopify + Google Merchant Center</TextBadge>
              <TextBadge tone="green">Pre-feed diagnosis</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Feed apps move product data. MerchantFix helps you understand what is wrong first.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix is the diagnostic layer before risky Shopify feed edits. Paste the warning, upload a Shopify CSV when rows matter, and get the products to fix, review, or block before resubmitting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
              <SecondaryLink href="/#paste-error">Paste a warning</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              Not a feed app. Not an agency. Not a Google approval promise.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">The category gap</p>
            <h2 className="mt-3 text-2xl font-black">Before the feed edit, there is a diagnostic problem.</h2>
            <div className="mt-5 grid gap-3">
              {competitorContext.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 font-semibold leading-7 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 md:p-6">
          <div className="max-w-3xl p-2 md:p-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Direct comparison</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Different tools for different moments.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Feed apps are useful when the merchant wants ongoing feed management. MerchantFix is useful earlier, when the merchant needs to understand the error and avoid unsafe product-data edits.
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[860px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-4 py-2 font-black">Area</th>
                  <th className="px-4 py-2 font-black">Typical feed app</th>
                  <th className="px-4 py-2 font-black">MerchantFix</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([area, feedApp, merchantFix]) => (
                  <tr key={area} className="bg-slate-50 font-semibold leading-6 text-slate-700">
                    <td className="rounded-l-2xl px-4 py-4 font-black text-slate-950">{area}</td>
                    <td className="px-4 py-4">{feedApp}</td>
                    <td className="rounded-r-2xl px-4 py-4 font-black text-slate-950">{merchantFix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-5 md:px-8 md:pb-16 lg:grid-cols-2">
        {useCases.map((useCase) => (
          <article key={useCase.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">{useCase.title}</h2>
            <div className="mt-5 grid gap-3">
              {useCase.points.map((point) => (
                <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700">
                  {point}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Guardrail difference</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">MerchantFix is built to stop dangerous guesses.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Some product-data fields require evidence. MerchantFix makes that visible instead of pretending every warning can be corrected automatically.
              </p>
            </div>
            <div className="grid gap-3">
              {guardrails.map((guardrail) => (
                <article key={guardrail.status} className="rounded-2xl border border-blue-100 bg-white p-5">
                  <p className="font-mono text-sm font-black text-blue-700">{guardrail.status}</p>
                  <p className="mt-2 font-semibold leading-7 text-slate-700">{guardrail.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-xl shadow-amber-100/60 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700">Important limit</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">A diagnostic layer is not account recovery.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                MerchantFix helps diagnose supported product-data issues. It does not guarantee Google approval, sales, traffic, ranking, or account recovery.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["No fake GTIN", "No invented MPN", "No invented brand", "No Google approval guarantee", "No feed app replacement", "No account recovery promise"].map((item) => (
                <div key={item} className="rounded-2xl border border-amber-200 bg-white px-4 py-3 font-black text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Before choosing the right tool.</h2>
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
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Next step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Need diagnosis before changing your feed?</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Start with the warning text, then use Fix Pack when row-level Shopify CSV review is needed.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <PrimaryLink href="/#paste-error">Paste warning</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
