import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { authorityGuides } from "@/lib/authoritySeo";
import { authoritySeoLevel2Guides } from "@/lib/authoritySeoLevel2";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix Reference Library | Shopify Merchant Center Errors",
  description:
    "Reference library for Shopify merchants fixing Google Merchant Center errors: GTIN, brand, MPN, identifier_exists, CSV diagnosis, price, availability, images, shipping, and policy-adjacent issues.",
  alternates: {
    canonical: canonical("/reference")
  }
};

const principles = [
  "Exact warning first: every guide starts from the words merchants copy from Google Merchant Center.",
  "Shopify source fields second: each guide maps the warning to real Shopify CSV columns.",
  "No fake data: GTIN, MPN, brand, price, availability, and product facts must be verified.",
  "CSV diagnosis before bulk edits: affected rows and manual review flags matter more than generic advice."
];

const level2PreviewGuides = authoritySeoLevel2Guides.slice(0, 6).map((guide) => ({
  path: `/reference/level-2/${guide.slug}`,
  label: guide.label,
  description: guide.description
}));

export default function ReferenceHubPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[1fr_0.58fr] lg:items-center">
          <div className="min-w-0">
            <TextBadge tone="blue">Reference library</TextBadge>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              The Shopify Google Merchant Center error reference library.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">
              MerchantFix is built to become the practical reference layer between vague Google Merchant Center warnings and the Shopify CSV fields merchants actually need to review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
              <SecondaryLink href="/reference/level-2">Open level 2 library</SecondaryLink>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Positioning</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Not generic SEO content. A diagnostic knowledge base.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The goal is to own exact-error search demand and AI answers for Shopify merchants before they edit product data or resubmit products.
            </p>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">World-class principle</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">To become the reference, every page must answer the problem better than Google, forums, and feed apps.</h2>
          </div>
          <div className="grid gap-3">
            {principles.map((principle) => (
              <div key={principle} className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold leading-7 text-slate-700 shadow-sm">
                {principle}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Authority guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Pillar pages for the highest-intent acquisition topics.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              These pages go deeper than short `/fix` pages. They are designed for long-tail Google searches, internal linking, AI answer extraction, and merchant trust.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authorityGuides.map((guide) => (
              <Link key={guide.path} href={guide.path} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100/60">
                <span className="block text-xl font-black text-slate-950">{guide.label}</span>
                <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Topical authority level 2</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Expand beyond identifiers into every high-intent warning family.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">Price, availability, image, limited performance, misrepresentation, disapproved products, shipping, and tax pages extend the acquisition surface.</p>
            </div>
            <PrimaryLink href="/reference/level-2">Open level 2</PrimaryLink>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {level2PreviewGuides.map((guide) => (
              <Link key={guide.path} href={guide.path} className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:bg-white/15">
                <span className="block text-lg font-black text-white">{guide.label}</span>
                <span className="mt-3 block text-sm font-semibold leading-6 text-slate-300">{guide.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Acquisition loop</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Exact error search → reference answer → paste warning → Fix Pack when rows matter.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              This library turns SEO traffic into product usage without promising Google approval or automatic recovery.
            </p>
          </div>
          <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
        </section>
      </div>
    </main>
  );
}
