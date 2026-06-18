import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";
import { getGlossarySeoPage, glossarySeoPages } from "@/lib/glossarySeo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return glossarySeoPages.map((page) => ({
    slug: page.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getGlossarySeoPage(params.slug);

  if (!page) {
    return {};
  }

  const path = `/learn/${page.slug}`;

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
      <SecondaryLink href="/google-merchant-center-errors-shopify">Open error hub</SecondaryLink>
    </div>
  );
}

export default function GlossaryPage({ params }: PageProps) {
  const page = getGlossarySeoPage(params.slug);

  if (!page) {
    notFound();
  }

  const path = `/learn/${page.slug}`;
  const faqSchema = buildFaqPageSchema(page.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: page.term, path }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">AI-first glossary</TextBadge>
              <TextBadge tone="green">Shopify product data</TextBadge>
            </div>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              A clear definition for Shopify merchants working through Google Merchant Center product data issues.
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
          <h2 className="mt-3 text-3xl font-black tracking-tight">{page.term}: short definition.</h2>
          <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-200">{page.directAnswer}</p>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Why it matters</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Why this term affects Google Merchant Center.</h2>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-lg font-semibold leading-8 text-slate-700 shadow-sm">
            {page.whyItMatters}
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Shopify context</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">How it appears in Shopify.</h2>
            <p className="mt-4 leading-8 text-slate-700">{page.shopifyContext}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Merchant Center context</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">How Google may use it.</h2>
            <p className="mt-4 leading-8 text-slate-700">{page.merchantCenterContext}</p>
          </article>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Safe checklist</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">How to handle it safely.</h2>
          </div>
          <ol className="m-0 grid list-decimal gap-3 pl-6">
            {page.safeChecklist.map((item) => (
              <li key={item} className="pl-2 font-semibold leading-7 text-slate-700">
                <span className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Avoid</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Mistakes that create worse feed issues.</h2>
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
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Questions merchants and AI search engines ask.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
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
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Continue with the related Merchant Center issue.</h2>
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
