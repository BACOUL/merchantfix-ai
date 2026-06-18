import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";
import { combinedGmcErrorSeoPages, getCombinedGmcErrorSeoPage } from "@/lib/combinedGmcErrorSeo";
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
  return combinedGmcErrorSeoPages.map((page) => ({
    slug: page.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getCombinedGmcErrorSeoPage(params.slug);

  if (!page) {
    return {};
  }

  const path = `/fix/google-merchant-center-errors/${page.slug}`;

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
      <PrimaryLink href="/fix-pack">Use Fix Pack</PrimaryLink>
      <SecondaryLink href="/scan">Scan my Shopify store</SecondaryLink>
    </div>
  );
}

function buildFaqs(page: NonNullable<ReturnType<typeof getCombinedGmcErrorSeoPage>>): FaqItem[] {
  const mainPhrase = page.copiedErrorPhrases[0] ?? page.label;
  const firstFields = page.shopifyFieldsToCheck.slice(0, 4).join(", ");
  const firstAvoid = page.avoid[0] ?? "Do not invent product data.";

  return [
    {
      question: `What does ${mainPhrase} mean in Google Merchant Center?`,
      answer: page.whatItUsuallyMeans
    },
    {
      question: `Which Shopify fields should I check first for ${mainPhrase}?`,
      answer: `Start with these Shopify fields: ${firstFields}. Then review affected variants before changing your feed.`
    },
    {
      question: `Can MerchantFix.ai automatically fix ${mainPhrase}?`,
      answer: "MerchantFix.ai can help diagnose affected Shopify CSV rows and separate safe fixes from manual review rows. It does not guarantee Google approval."
    },
    {
      question: `What should I avoid when fixing ${mainPhrase}?`,
      answer: `${firstAvoid} Never invent GTIN, MPN, brand, price, or product facts just to silence a warning.`
    }
  ];
}

export default function GmcExactErrorPage({ params }: PageProps) {
  const page = getCombinedGmcErrorSeoPage(params.slug);

  if (!page) {
    notFound();
  }

  const path = `/fix/google-merchant-center-errors/${page.slug}`;
  const faqs = buildFaqs(page);
  const faqSchema = buildFaqPageSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Google Merchant Center errors for Shopify", path: "/google-merchant-center-errors-shopify" },
    { name: page.label, path }
  ]);
  const firstFields = page.shopifyFieldsToCheck.slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Exact Merchant Center error</TextBadge>
              <TextBadge tone="amber">Shopify feed fix</TextBadge>
            </div>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              If you copied this error from Google Merchant Center, use this page to understand what to check in Shopify before editing your product feed.
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
          <h2 className="mt-3 text-3xl font-black tracking-tight">What to do first.</h2>
          <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-200">{page.whatItUsuallyMeans}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Check first</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{firstFields.join(", ")}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Safe action</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">Review affected Shopify variants and only add verified product data.</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="font-black text-white">Avoid</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">Do not invent identifiers, prices, brands, or product facts.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-5 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Copied error phrases</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Searches this page is designed to answer.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {page.copiedErrorPhrases.map((phrase) => (
              <div key={phrase} className="break-words rounded-lg border border-blue-200 bg-white px-4 py-3 font-black text-blue-950 shadow-sm">
                “{phrase}”
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What it usually means</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">The issue is usually inside product data, not the wording of the error.</h2>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-lg font-semibold leading-8 text-slate-700 shadow-sm">
            {page.whatItUsuallyMeans}
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Shopify fields to check</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with the columns that usually create the issue.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.shopifyFieldsToCheck.map((field) => (
              <div key={field} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {field}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Safe fix checklist</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Fix the product data without creating worse feed problems.</h2>
          </div>
          <ol className="m-0 grid list-decimal gap-3 pl-6">
            {page.safeFixChecklist.map((item) => (
              <li key={item} className="pl-2 font-semibold leading-7 text-slate-700">
                <span className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Avoid bad fixes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Do not silence Merchant Center errors with fake data.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.avoid.map((item) => (
              <div key={item} className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-900">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">MerchantFix.ai</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Use a CSV diagnostic when many products may be affected.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The Fix Pack checks Shopify CSV rows for identifier, image, price, and product data issues. It marks safe corrections separately from manual review rows.
            </p>
            <div className="mt-6">
              <CtaRow />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-black text-slate-950">Best next step</p>
            <p className="mt-3 leading-7 text-slate-600">
              Export your Shopify product CSV, run the diagnostic, then review affected rows before changing your feed or resubmitting products.
            </p>
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
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Related product data fixes.</h2>
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
