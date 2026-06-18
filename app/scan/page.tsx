import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PrimaryLink, SecondaryLink, SurfaceScanForm, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shopify Product Data Scan | MerchantFix.ai",
  description:
    "Run a public Shopify surface scan, then use Fix Pack for row-level Shopify CSV diagnosis when Google Merchant Center issues require deeper product data checks.",
  alternates: {
    canonical: canonical("/scan")
  }
};

const faqs = [
  {
    question: "What does the free Shopify scan check?",
    answer:
      "The free scan checks publicly available Shopify product data when accessible, including visible product data risks such as missing images, missing prices, weak titles, and weak descriptions."
  },
  {
    question: "Is the free scan a full Google Merchant Center diagnosis?",
    answer:
      "No. The free scan is a public surface check. Row-level GTIN, MPN, brand, identifier_exists, price, and image diagnosis requires a Shopify CSV and the Fix Pack."
  },
  {
    question: "Do I need Shopify admin access for the free scan?",
    answer: "No. The free scan uses a public Shopify URL and does not connect to Shopify admin."
  },
  {
    question: "When should I move from the scan to the Fix Pack?",
    answer:
      "Move to Fix Pack when Merchant Center warnings mention product identifiers, GTIN, MPN, brand, identifier_exists, price, availability, images, or many affected rows."
  }
];

export default function ScanPage() {
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Scan", path: "/scan" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.7fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <TextBadge tone="green">Public Shopify scan</TextBadge>
            <h1 className="mt-5 max-w-3xl break-words text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-6xl">
              Choose the right product data check for your Shopify store.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Use the URL scan for a fast public surface check. Use Fix Pack for deeper row-level CSV diagnosis after checkout.
              MerchantFix.ai keeps both paths focused, safe, and easy to review.
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Workflow</p>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              <li className="rounded-lg bg-white p-3">Start with a public Shopify URL.</li>
              <li className="rounded-lg bg-white p-3">Move to Fix Pack when you need row-level identifier checks.</li>
              <li className="rounded-lg bg-white p-3">Review safe fixes and manual review flags after CSV diagnosis.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <TextBadge tone="green">Option 1</TextBadge>
            <h2 className="mt-4 break-words text-2xl font-black text-slate-950">Scan public Shopify URL</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Best for a quick surface scan when `/products.json` is publicly available. MerchantFix.ai checks visible
              issues like missing images, missing prices, weak titles, and weak descriptions.
            </p>
            <div className="mt-5">
              <PrimaryLink href="#url-scan">Scan my Shopify store</PrimaryLink>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <TextBadge tone="blue">Option 2</TextBadge>
            <h2 className="mt-4 break-words text-2xl font-black text-slate-950">Use Fix Pack CSV diagnostic</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Best for deeper product data diagnosis when Merchant Center warnings mention GTIN, MPN, brand, price,
              availability, images, or identifier_exists issues.
            </p>
            <div className="mt-5">
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </section>

        <div id="url-scan">
          <SurfaceScanForm />
        </div>

        <section className="mt-8 grid gap-5 rounded-lg border border-blue-200 bg-blue-50 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="min-w-0">
            <h2 className="break-words text-2xl font-black text-slate-950">Need row-level product diagnosis?</h2>
            <p className="mt-2 leading-7 text-slate-700">
              Some Shopify stores do not expose public product data, and identifier issues usually require CSV context.
              The Fix Pack gives MerchantFix.ai the row-level data needed for GTIN, MPN, brand, and identifier_exists diagnosis.
            </p>
          </div>
          <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Before using the free scan.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg bg-slate-50 p-4">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Disclaimer>
            MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full
            Google Merchant Center diagnosis. Google approval is not guaranteed. {" "}
            <Link href="/terms" className="font-bold text-amber-950 underline underline-offset-2">
              See Terms.
            </Link>
          </Disclaimer>
        </div>

        <div className="mt-8 flex flex-wrap gap-5">
          <Link href="/" className="inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">
            Back to homepage
          </Link>
          <Link href="/fix" className="inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">
            Product data guides
          </Link>
        </div>
      </div>
    </main>
  );
}
