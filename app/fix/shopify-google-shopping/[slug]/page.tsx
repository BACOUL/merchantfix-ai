import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";
import { getShopifyGmcLongTailSeoPage, shopifyGmcLongTailSeoPages } from "@/lib/shopifyGmcLongTailSeo";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

type PageProps = {
  params: {
    slug: string;
  };
};

type FaqItem = {
  question: string;
  answer: string;
};

export function generateStaticParams() {
  return shopifyGmcLongTailSeoPages.map((page) => ({
    slug: page.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getShopifyGmcLongTailSeoPage(params.slug);

  if (!page) {
    return {};
  }

  const path = `/fix/shopify-google-shopping/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonical(path)
    }
  };
}

function CtaRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
      <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
    </div>
  );
}

function buildFaqs(page: NonNullable<ReturnType<typeof getShopifyGmcLongTailSeoPage>>): FaqItem[] {
  const mainPhrase = page.searchPhrases[0] ?? page.label;
  const checks = page.shopifyChecks.slice(0, 5).join(", ");

  return [
    {
      question: `What does ${mainPhrase} usually mean?`,
      answer: page.problem
    },
    {
      question: `What should I check in Shopify for ${mainPhrase}?`,
      answer: `Check ${checks}. Then compare the Shopify source data with the Merchant Center issue details before editing your feed.`
    },
    {
      question: `Can MerchantFix.ai fix ${mainPhrase}?`,
      answer: "MerchantFix.ai helps diagnose Shopify product data issues and highlight affected rows. It does not guarantee Google approval, ranking, traffic, sales, or account recovery."
    },
    {
      question: `What should I avoid when troubleshooting ${mainPhrase}?`,
      answer: "Do not make blind bulk edits, do not invent product data, and do not treat policy or account issues as CSV-only problems."
    }
  ];
}

export default function ShopifyGmcLongTailPage({ params }: PageProps) {
  const page = getShopifyGmcLongTailSeoPage(params.slug);

  if (!page) {
    notFound();
  }

  const path = `/fix/shopify-google-shopping/${page.slug}`;
  const faqs = buildFaqs(page);
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Google Merchant Center errors for Shopify", path: "/google-merchant-center-errors-shopify" },
    { name: page.label, path }
  ]);
  const topChecks = page.shopifyChecks.slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Shopify Google Shopping SEO guide</TextBadge>
              <TextBadge tone="green">Product data checklist</TextBadge>
            </div>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This guide is written for Shopify merchants searching in plain language after seeing a Google Merchant Center or Google Shopping product issue.
            </p>
            <div className="mt-8">
              <CtaRow />
            </div>
          </div>
          <aside className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
            {MANDATORY_DISCLAIMER}
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Direct answer for AI search</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">What this usually means and what to check.</h2>
          <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-200">{page.problem}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Check first</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{topChecks.join(", ")}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Best next step</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">Read the exact Merchant Center status, then fix only verified Shopify source data.</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Avoid</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">Do not make blind bulk edits or invent product data.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-5 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Search phrases covered</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Natural queries this page answers.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {page.searchPhrases.map((phrase) => (
              <div key={phrase} className="rounded-lg border border-blue-200 bg-white px-4 py-3 font-black text-blue-950 shadow-sm">
                {phrase}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Problem</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What this usually means.</h2>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-lg font-semibold leading-8 text-slate-700 shadow-sm">
            {page.problem}
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Likely causes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Common Shopify causes to review first.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.likelyCauses.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Shopify checks</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Fields and settings to check.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.shopifyChecks.map((field) => (
              <div key={field} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {field}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Action plan</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A safer order of operations.</h2>
          </div>
          <ol className="m-0 grid list-decimal gap-3 pl-6">
            {page.actionPlan.map((item) => (
              <li key={item} className="pl-2 font-semibold leading-7 text-slate-700">
                <span className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Avoid</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Do not create new feed problems.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.avoid.map((item) => (
              <div key={item} className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-900">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Questions AI search engines and merchants ask.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg bg-slate-50 p-4">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Related guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Go deeper into the exact issue.</h2>
            <div className="mt-6">
              <CtaRow />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="block font-black text-slate-950">{guide.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
