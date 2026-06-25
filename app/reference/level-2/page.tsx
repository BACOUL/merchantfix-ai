import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { authoritySeoLevel2Guides } from "@/lib/authoritySeoLevel2";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix Level 2 Reference Library | Shopify GMC Errors",
  description:
    "Level 2 MerchantFix reference guides for Shopify Google Merchant Center errors: price, availability, image, limited performance, misrepresentation, disapproved products, shipping, and tax.",
  alternates: {
    canonical: canonical("/reference/level-2")
  }
};

const level2Guides = authoritySeoLevel2Guides.map((guide) => ({
  path: `/reference/level-2/${guide.slug}`,
  label: guide.label,
  description: guide.description
}));

export default function Level2ReferenceHubPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[1fr_0.58fr] lg:items-center">
          <div className="min-w-0">
            <TextBadge tone="blue">Reference level 2</TextBadge>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Advanced Shopify Google Merchant Center reference guides.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">
              This second reference layer expands MerchantFix beyond identifiers into price, availability, images, policy-adjacent issues, disapprovals, shipping, and tax warnings.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my Merchant Center warning</PrimaryLink>
              <SecondaryLink href="/reference">Back to reference library</SecondaryLink>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Acquisition goal</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Own every high-intent Shopify Merchant Center warning family.</h2>
            <p className="mt-4 leading-7 text-slate-300">Each page maps the warning to Shopify fields, CSV review, unsafe shortcuts, and when the Fix Pack is useful.</p>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <section>
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Level 2 authority topics</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">More reference pages for broader topical authority.</h2>
            <p className="mt-4 leading-7 text-slate-600">These guides target the next acquisition layer after GTIN, brand, MPN and identifier_exists.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {level2Guides.map((guide) => (
              <Link key={guide.path} href={guide.path} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100/60">
                <span className="block text-xl font-black text-slate-950">{guide.label}</span>
                <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-xl shadow-blue-100/60 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Conversion path</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Exact warning search → reference answer → paste warning → Fix Pack when rows matter.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">This keeps MerchantFix focused on diagnosis without promising approval, recovery, ranking, traffic, or sales.</p>
          </div>
          <PrimaryLink href="/#paste-error">Paste my warning</PrimaryLink>
        </section>
      </div>
    </main>
  );
}
