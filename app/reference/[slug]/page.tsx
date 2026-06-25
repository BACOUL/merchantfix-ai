import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { authoritySeoGuides, getAuthoritySeoGuide } from "@/lib/authoritySeo";
import { canonical } from "@/lib/seo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return authoritySeoGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getAuthoritySeoGuide(params.slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: canonical(`/reference/${guide.slug}`)
    }
  };
}

function CtaRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
      <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
    </div>
  );
}

export default function AuthorityReferencePage({ params }: PageProps) {
  const guide = getAuthoritySeoGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const path = `/reference/${guide.slug}`;
  const faqSchema = buildFaqPageSchema(guide.faq);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Reference library", path: "/reference" },
    { name: guide.label, path }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[1fr_0.56fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">MerchantFix reference</TextBadge>
              <TextBadge tone="slate">Shopify + Google Merchant Center</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              {guide.h1}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">{guide.subtitle}</p>
            <div className="mt-8">
              <CtaRow />
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Reference answer</p>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-100">{guide.answer}</p>
            <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm font-semibold leading-7 text-slate-300">{MANDATORY_DISCLAIMER}</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Exact warnings covered</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.exactWarnings.map((warning) => (
              <span key={warning} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-800">
                {warning}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Direct answer for Google and AI search</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">What this usually means.</h2>
          <p className="mt-5 max-w-5xl text-lg font-semibold leading-8 text-slate-700">{guide.answer}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-black text-blue-950">First action</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Map the warning to Shopify source fields before editing the feed.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-black text-slate-950">Best evidence</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Use product packaging, manufacturer data, supplier files, and Shopify CSV rows.</p>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="font-black text-red-900">Never do</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-red-900">Do not invent GTIN, MPN, brand, price, availability, or product facts.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Root causes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Why this happens in Shopify feeds.</h2>
            <p className="mt-4 leading-7 text-slate-600">Reference pages must explain the pattern, not only repeat the error message.</p>
          </div>
          <div className="grid gap-3">
            {guide.whyItHappens.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Shopify field map</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Fields to inspect before changing anything.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {guide.shopifyFields.map((field) => (
              <article key={field.field} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="font-black text-slate-950">{field.field}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{field.why}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">CSV diagnostic workflow</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">The safe row-level process.</h2>
            <p className="mt-4 leading-7 text-slate-600">This is the workflow that positions MerchantFix as a diagnostic layer before edits and resubmission.</p>
          </div>
          <ol className="m-0 grid list-decimal gap-3 pl-6">
            {guide.diagnosticWorkflow.map((step) => (
              <li key={step} className="pl-2 font-semibold leading-7 text-slate-700">
                <span className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">CSV columns</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Columns that usually matter.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {guide.csvColumns.map((column) => (
              <span key={column} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-black text-blue-950">
                {column}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 shadow-xl shadow-red-100/40 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Bad fixes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">What not to do.</h2>
            <div className="mt-6 grid gap-3">
              {guide.badFixes.map((item) => (
                <div key={item} className="rounded-2xl border border-red-200 bg-white px-4 py-3 font-bold leading-7 text-red-900">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">When MerchantFix helps</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Use Fix Pack when row-level clarity matters.</h2>
            <p className="mt-5 leading-8 text-slate-700">{guide.merchantfixUseCase}</p>
            <div className="mt-6">
              <CtaRow />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Decision table</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">What to do depending on the situation.</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Situation</th>
                  <th className="px-3 py-2 font-black">Best next step</th>
                </tr>
              </thead>
              <tbody>
                {guide.decisionTable.map((row) => (
                  <tr key={row.situation} className="bg-slate-50 font-semibold leading-6 text-slate-700">
                    <td className="rounded-l-xl px-3 py-4 font-black text-slate-950">{row.situation}</td>
                    <td className="rounded-r-xl px-3 py-4">{row.nextStep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-14">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Questions merchants ask before editing Shopify.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {guide.faq.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-black text-slate-950">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-t border-slate-200 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Related guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Continue the diagnosis path.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {guide.related.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50">
                <span className="block font-black text-slate-950">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
