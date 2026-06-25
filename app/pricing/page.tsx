import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | MerchantFix.ai Fix Pack",
  description:
    "Simple launch pricing for Shopify merchants who need Google Merchant Center error diagnosis, public scans, row-level CSV checks, and safe product-data guidance.",
  alternates: {
    canonical: canonical("/pricing")
  }
};

const plans = [
  {
    name: "Free Scan",
    price: "0 €",
    note: "Public Shopify URL check",
    badge: "Free first step",
    description: "Best when you want a quick public surface check before deeper CSV diagnosis.",
    href: "/scan",
    cta: "Start free scan",
    featured: false,
    checkoutPlan: null,
    items: [
      "Public Shopify URL scan",
      "Visible product data risk checks",
      "Missing image and missing price signals when available",
      "Good first step when public data is accessible",
      "No login",
      "No Shopify admin access"
    ]
  },
  {
    name: "Fix Pack",
    price: "29 €",
    note: "Row-level CSV diagnosis",
    badge: "Only paid launch offer",
    description: "Best when a Merchant Center warning affects products and you need Shopify CSV rows, fields, and safe actions.",
    href: "/fix-pack",
    cta: "Start Fix Pack checkout",
    featured: true,
    checkoutPlan: "fix-pack" as const,
    items: [
      "Shopify CSV diagnostic",
      "GTIN, MPN, brand, and identifier_exists checks",
      "Price, availability, and image field review where supported",
      "Affected rows when CSV data allows it",
      "Safe correction guidance",
      "Annotated CSV only when safe",
      "Manual review checklist for uncertain rows"
    ]
  }
];

const comparison = [
  ["Paste Merchant Center error", "Included", "Included"],
  ["Public Shopify URL scan", "Included", "Included"],
  ["Shopify CSV diagnostic", "Not included", "Included"],
  ["GTIN, MPN, brand, identifier_exists checks", "Surface only", "Included"],
  ["Price, availability, image fields", "Surface only", "CSV review where supported"],
  ["Affected row table", "Not included", "Included when available"],
  ["Annotated CSV when safe", "Not included", "Included"],
  ["Manual review checklist", "Basic", "Included"],
  ["Google approval guarantee", "Never guaranteed", "Never guaranteed"]
];

const faqs = [
  {
    question: "Which option should I choose first?",
    answer:
      "Start with the Free Scan if you only want a public Shopify surface check. Choose Fix Pack when the Merchant Center warning needs row-level CSV diagnosis."
  },
  {
    question: "Why is Fix Pack the only paid launch offer?",
    answer:
      "Because the first commercial test should stay simple: one free entry point and one paid CSV diagnosis. Manual or priority review can be added later if customers ask for it."
  },
  {
    question: "Do I need Shopify admin access?",
    answer:
      "No. The free scan uses public product data when available. The paid diagnostic uses the Shopify CSV export you upload after checkout."
  },
  {
    question: "Does Fix Pack guarantee Google approval?",
    answer:
      "No. MerchantFix helps diagnose product data issues and safe actions, but Google approval, ranking, traffic, performance, sales, and account recovery are not guaranteed."
  },
  {
    question: "Will MerchantFix create missing identifiers?",
    answer:
      "No. MerchantFix never invents GTINs, MPNs, brands, prices, shipping values, or product facts. Uncertain rows are marked for manual review."
  }
];

export default function PricingPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="max-w-4xl">
            <TextBadge tone="blue">Simple launch pricing</TextBadge>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              One free check. One paid CSV diagnosis.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix keeps the launch offer intentionally simple: paste the error, scan public Shopify data when useful, then use the 29 € Fix Pack only when the problem needs affected rows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error first</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Launch offer</p>
            <div className="mt-4 rounded-3xl bg-white p-6 text-slate-950 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Fix Pack</p>
                  <p className="mt-3 text-6xl font-black tracking-tight">29 €</p>
                </div>
                <TextBadge tone="green">Paid product</TextBadge>
              </div>
              <p className="mt-5 leading-7 text-slate-600">One-time Shopify CSV diagnostic after checkout.</p>
              <div className="mt-6">
                <CheckoutButton plan="fix-pack">Start Fix Pack checkout</CheckoutButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Decision clarity</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">No pricing maze.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The first commercial test should be easy to understand: use the free check first, then pay once when CSV rows are needed.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex min-w-0 flex-col rounded-[2rem] border p-6 shadow-xl transition hover:-translate-y-1 ${
                  plan.featured ? "border-blue-200 bg-blue-50 shadow-blue-100/70" : "border-slate-200 bg-white shadow-slate-200/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">{plan.note}</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-950">{plan.name}</h3>
                  </div>
                  <TextBadge tone={plan.featured ? "blue" : "slate"}>{plan.badge}</TextBadge>
                </div>
                <p className="mt-5 text-5xl font-black tracking-tight text-slate-950">{plan.price}</p>
                <p className="mt-4 leading-7 text-slate-600">{plan.description}</p>
                <ul className="mt-6 grid gap-3 text-sm font-semibold text-slate-700">
                  {plan.items.map((item) => (
                    <li key={item} className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {plan.checkoutPlan ? (
                    <CheckoutButton plan={plan.checkoutPlan}>{plan.cta}</CheckoutButton>
                  ) : (
                    <PrimaryLink href={plan.href}>{plan.cta}</PrimaryLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Compare options</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Free scan vs Fix Pack.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Free checks are useful for direction. Fix Pack is the paid product when the problem needs affected rows and a CSV-level worklist.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <table className="w-full min-w-[680px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Feature</th>
                  <th className="px-3 py-2 font-black">Free Scan</th>
                  <th className="px-3 py-2 font-black">Fix Pack</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, free, fix]) => (
                  <tr key={feature} className="bg-white font-semibold text-slate-700 shadow-sm">
                    <td className="rounded-l-xl px-3 py-4 text-slate-950">{feature}</td>
                    <td className="px-3 py-4">{free}</td>
                    <td className="rounded-r-xl px-3 py-4 font-black text-blue-800">{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8 md:pb-16">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-xl shadow-amber-100/50">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Important limits</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">No fake guarantees.</h2>
            <p className="mt-4 leading-7 font-semibold">
              MerchantFix diagnoses product data issues. It does not guarantee Google approval, ranking, traffic, performance, account recovery, or sales.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">See the sample report before buying Fix Pack.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                The sample report shows the row-level clarity the Fix Pack is built to provide.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/sample-report">See sample report</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
