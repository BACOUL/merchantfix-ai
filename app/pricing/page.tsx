import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | MerchantFix.ai Fix Pack",
  description:
    "Simple one-time pricing for Shopify merchants who need Google Merchant Center product data diagnostics and safe CSV correction guidance.",
  alternates: {
    canonical: canonical("/pricing")
  }
};

const plans = [
  {
    name: "Free Scan",
    price: "0 €",
    note: "Public Shopify URL check",
    description: "A fast surface scan for visible product data risks before you touch your feed.",
    href: "/scan",
    cta: "Start free scan",
    featured: false,
    checkoutPlan: null,
    items: [
      "Public Shopify URL scan",
      "Visible product data risk checks",
      "Missing image and missing price signals when available",
      "No login",
      "No Shopify admin access"
    ]
  },
  {
    name: "Fix Pack",
    price: "29 €",
    note: "One-time CSV diagnostic",
    description: "The focused paid offer for Shopify merchants dealing with Merchant Center product data issues.",
    href: "/fix-pack",
    cta: "Buy Fix Pack",
    featured: true,
    checkoutPlan: "fix-pack" as const,
    items: [
      "Shopify CSV diagnostic",
      "GTIN, MPN, brand, and identifier_exists checks",
      "Missing image and missing price warnings where supported",
      "Deterministic safe correction guidance",
      "Corrected CSV only when a fix is safe",
      "Manual review checklist for uncertain rows"
    ]
  },
  {
    name: "Pro Review",
    price: "79 €",
    note: "Priority manual guidance",
    description: "For merchants who want the Fix Pack plus a deeper practical checklist before resubmission.",
    href: "/fix-pack",
    cta: "Buy Pro Review",
    featured: false,
    checkoutPlan: "pro-review" as const,
    items: [
      "Everything in Fix Pack",
      "Priority manual review guidance",
      "Deeper resubmission checklist",
      "Issue prioritization for larger catalogs",
      "No approval guarantee",
      "No invented identifiers"
    ]
  }
];

const comparison = [
  ["Public Shopify URL scan", "Included", "Included", "Included"],
  ["Shopify CSV diagnostic", "Not included", "Included", "Included"],
  ["GTIN, MPN, brand, identifier_exists checks", "Surface only", "Included", "Included"],
  ["Corrected CSV when deterministic", "Not included", "Included", "Included"],
  ["Manual review checklist", "Basic", "Included", "Priority"],
  ["Google approval guarantee", "Never guaranteed", "Never guaranteed", "Never guaranteed"]
];

const faqs = [
  {
    question: "Do I need to connect my Shopify admin?",
    answer: "No. The free scan uses public product data when available. The deeper diagnostic uses the Shopify CSV you upload after checkout."
  },
  {
    question: "Will MerchantFix.ai fix every Google Merchant Center issue?",
    answer: "No. The first sellable product is intentionally focused on Shopify product data issues such as identifiers, brand, images, prices, and safe correction guidance."
  },
  {
    question: "Does the Fix Pack guarantee approval?",
    answer: "No. Google approval depends on many factors outside the product file. MerchantFix.ai helps you find and prepare safer product data corrections."
  },
  {
    question: "Will the tool create missing GTINs or brands for me?",
    answer: "No. MerchantFix.ai never invents GTINs, MPNs, brands, prices, or product identifiers. Uncertain rows are marked for manual review."
  },
  {
    question: "Which plan should I choose first?",
    answer: "Start with the Free Scan for public Shopify product data risks. Choose Fix Pack when you need row-level CSV diagnosis for Merchant Center product data issues."
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

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="max-w-4xl">
            <TextBadge tone="blue">Simple one-time pricing</TextBadge>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Product data diagnostics priced for real Shopify merchants.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Start free with a public Shopify scan. Use the Fix Pack when you need a practical CSV diagnostic for Google
              Merchant Center product data issues.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex min-w-0 flex-col rounded-xl border p-6 shadow-sm ${
                plan.featured ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">{plan.note}</p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">{plan.name}</h2>
                </div>
                {plan.featured ? <TextBadge tone="blue">Best start</TextBadge> : null}
              </div>
              <p className="mt-5 text-5xl font-black tracking-tight text-slate-950">{plan.price}</p>
              <p className="mt-4 leading-7 text-slate-600">{plan.description}</p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold text-slate-700">
                {plan.items.map((item) => (
                  <li key={item} className="rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
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
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Compare plans</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What each option gives you.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The offer is intentionally simple: free visibility, paid CSV diagnosis, and optional priority review.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Feature</th>
                  <th className="px-3 py-2 font-black">Free Scan</th>
                  <th className="px-3 py-2 font-black">Fix Pack</th>
                  <th className="px-3 py-2 font-black">Pro Review</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, free, fix, pro]) => (
                  <tr key={feature} className="bg-slate-50 font-semibold text-slate-700">
                    <td className="rounded-l-lg px-3 py-3 text-slate-950">{feature}</td>
                    <td className="px-3 py-3">{free}</td>
                    <td className="px-3 py-3">{fix}</td>
                    <td className="rounded-r-lg px-3 py-3">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Important limits</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">No fake guarantees.</h2>
            <p className="mt-4 leading-7 font-semibold">
              MerchantFix.ai diagnoses product data issues. It does not guarantee Google approval, ranking, traffic,
              performance, or sales.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">See exactly what the Fix Pack produces.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Review the sample report before buying the paid CSV diagnostic flow.
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
