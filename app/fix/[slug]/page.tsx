import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { getExactShopifyErrorPage, exactShopifyErrorPages } from "@/lib/exactShopifyErrorSeo";
import { canonical } from "@/lib/seo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return exactShopifyErrorPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getExactShopifyErrorPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonical(`/fix/${page.slug}`)
    }
  };
}

function CtaRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
      <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
    </div>
  );
}

export default function ExactShopifyErrorLandingPage({ params }: PageProps) {
  const page = getExactShopifyErrorPage(params.slug);

  if (!page) {
    notFound();
  }

  const path = `/fix/${page.slug}`;
  const faqs = [
    {
      question: `What does ${page.exactWarning} mean for Shopify products?`,
      answer: page.directAnswer
    },
    {
      question: `Which Shopify fields should I check first?`,
      answer: `Start with: ${page.shopifyFields.slice(0, 5).join(", ")}. Then review affected rows before editing the feed.`
    },
    {
      question: "Can MerchantFix automatically fix this?",
      answer:
        "MerchantFix can diagnose affected Shopify CSV rows and separate safe notes from manual review rows. It does not invent product facts and does not guarantee Google approval."
    },
    {
      question: "When should I use the Fix Pack?",
      answer: page.fixPackFit
    }
  ];
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Product data guides", path: "/fix" },
    { name: page.label, path }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Exact Shopify search</TextBadge>
              <TextBadge tone="amber">Merchant Center warning</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              This page is built for merchants who copy a Google Merchant Center warning into search and need to know which Shopify fields to check before editing product data.
            </p>
            <div className="mt-8">
              <CtaRow />
            </div>
          </div>
          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Copied warning</p>
            <p className="mt-4 break-words text-3xl font-black leading-tight text-white">“{page.exactWarning}”</p>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-200">{MANDATORY_DISCLAIMER}</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Direct answer</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">What this warning usually means.</h2>
          <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-700">{page.directAnswer}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-black text-blue-950">Check first</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{page.shopifyFields.slice(0, 4).join(", ")}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-black text-slate-950">Best workflow</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Find affected rows, verify product facts, then resubmit only after the source data is corrected.</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="font-black text-red-900">Avoid</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-red-900">Never invent GTIN, MPN, brand, price, availability, or product facts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Search phrases</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Queries this page is designed to catch.</h2>
            <p className="mt-4 leading-7 text-slate-600">The wording stays close to what Shopify merchants copy from Google Merchant Center.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.searchVariants.map((phrase) => (
              <div key={phrase} className="break-words rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-black text-blue-950">
                {phrase}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Shopify fields</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Fields to check before editing the feed.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.shopifyFields.map((field) => (
              <div key={field} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {field}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Safe steps</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">How to approach the fix.</h2>
            <ol className="mt-6 grid list-decimal gap-3 pl-6">
              {page.safeSteps.map((step) => (
                <li key={step} className="pl-2 font-semibold leading-7 text-slate-700">
                  <span className="block rounded-xl border border-slate-200 bg-slate-50 p-4">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-xl shadow-red-100/40 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Unsafe shortcuts</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What not to do.</h2>
            <div className="mt-6 grid gap-3">
              {page.avoid.map((item) => (
                <div key={item} className="rounded-xl border border-red-200 bg-white px-4 py-3 font-bold leading-7 text-red-900">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-xl shadow-blue-100/60 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">When MerchantFix helps</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Use Fix Pack when the issue affects many rows.</h2>
              <p className="mt-4 max-w-4xl leading-7 text-slate-700">{page.fixPackFit}</p>
            </div>
            <CtaRow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Questions merchants ask before editing Shopify.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Related guide</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Read the detailed Merchant Center guide.</h2>
          </div>
          <Link href={page.relatedGuide} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50">
            {page.relatedGuideLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
