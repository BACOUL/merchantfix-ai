import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical, exactErrorGuides, fixGuides, longTailGuides } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shopify Product Data Guides | MerchantFix.ai",
  description:
    "Guides for Shopify merchants fixing Google Merchant Center product data issues, missing identifiers, feed errors, and product readiness problems.",
  alternates: {
    canonical: canonical("/fix")
  }
};

function GuideGrid({ guides, variant = "default" }: { guides: readonly { path: string; label: string; description: string }[]; variant?: "default" | "muted" | "blue" }) {
  const className =
    variant === "blue"
      ? "min-w-0 rounded-lg border border-blue-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
      : variant === "muted"
        ? "min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
        : "min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50";

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <Link key={guide.path} href={guide.path} className={className}>
          <span className="block break-words text-xl font-black text-slate-950">{guide.label}</span>
          <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{guide.description}</span>
        </Link>
      ))}
    </div>
  );
}

export default function FixIndexPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <TextBadge tone="blue">Product data guides</TextBadge>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Practical Shopify product data guides for Google Merchant Center issues.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              MerchantFix.ai guides focus on Shopify product data, missing identifiers, feed errors, and cleaner product readiness.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/google-merchant-center-errors-shopify">Open error hub</SecondaryLink>
            </div>
          </div>
          <aside className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
            MerchantFix.ai helps diagnose product data issues, but Google approval, ranking, traffic, and sales are not guaranteed. Never invent GTIN, MPN, brand, price, or identifier data.
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Main hub</p>
              <h2 className="mt-3 break-words text-3xl font-black tracking-tight">Google Merchant Center errors for Shopify.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Use the hub to classify errors by identifiers, price, availability, images, shipping, condition, and policy before editing product data.
              </p>
            </div>
            <PrimaryLink href="/google-merchant-center-errors-shopify">Open hub</PrimaryLink>
          </div>
        </section>

        <section className="mt-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Core guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Main Shopify product data guides.</h2>
          </div>
          <GuideGrid guides={fixGuides} />
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Exact error messages</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Pages built for merchants who copy-paste Google Merchant Center errors.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              These pages target exact error wording such as Missing value [gtin], Invalid value [gtin], Missing value [brand], and related Shopify feed issues.
            </p>
          </div>
          <GuideGrid guides={exactErrorGuides} variant="muted" />
        </section>

        <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Natural Shopify searches</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Long-tail guides for plain-language merchant searches.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              These pages target searches around price mismatch, availability mismatch, disapproved Shopify products, pending products, and Google Shopping feed repair.
            </p>
          </div>
          <GuideGrid guides={longTailGuides} variant="blue" />
        </section>

        <section className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Start with your catalog</p>
              <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950">Check public Shopify product data before deeper CSV diagnosis.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Use the URL scan for a surface check. Use the Fix Pack when Merchant Center issues mention GTIN, MPN, brand, or identifier_exists.
              </p>
            </div>
            <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
          </div>
        </section>
      </div>
    </main>
  );
}
