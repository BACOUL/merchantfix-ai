import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical, exactErrorGuides, longTailGuides } from "@/lib/seo";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Google Merchant Center Errors for Shopify | MerchantFix.ai",
  description:
    "A Shopify-focused hub for Google Merchant Center errors: missing GTIN, MPN, brand, price mismatch, availability mismatch, image issues, shipping, condition, and misrepresentation.",
  alternates: {
    canonical: canonical("/google-merchant-center-errors-shopify")
  }
};

const categories = [
  {
    name: "Product identifiers",
    description: "GTIN, MPN, brand, identifier_exists, and missing product identifier warnings.",
    links: [
      "/fix/google-merchant-center-errors/missing-value-gtin",
      "/fix/google-merchant-center-errors/invalid-value-gtin",
      "/fix/google-merchant-center-errors/missing-value-mpn",
      "/fix/google-merchant-center-errors/missing-value-brand",
      "/fix/google-merchant-center-errors/product-identifiers-not-provided",
      "/fix/google-merchant-center-errors/limited-performance-missing-identifiers"
    ]
  },
  {
    name: "Price and availability",
    description: "Price mismatch, missing price, availability mismatch, and invalid availability warnings.",
    links: [
      "/fix/google-merchant-center-errors/mismatched-value-price",
      "/fix/google-merchant-center-errors/missing-price",
      "/fix/google-merchant-center-errors/mismatched-value-availability",
      "/fix/google-merchant-center-errors/invalid-value-availability"
    ]
  },
  {
    name: "Images",
    description: "Missing images, images too small, image crawl errors, and promotional overlays.",
    links: [
      "/fix/google-merchant-center-errors/missing-image-link",
      "/fix/google-merchant-center-errors/image-too-small",
      "/fix/google-merchant-center-errors/image-not-retrieved-crawl-error",
      "/fix/google-merchant-center-errors/promotional-overlay-on-image"
    ]
  },
  {
    name: "Shipping, condition, and policy",
    description: "Shipping, condition, and misrepresentation warnings that often require manual review.",
    links: [
      "/fix/google-merchant-center-errors/missing-value-shipping",
      "/fix/google-merchant-center-errors/missing-value-condition",
      "/fix/google-merchant-center-errors/misrepresentation-checklist"
    ]
  }
];

function guideByPath(path: string) {
  return exactErrorGuides.find((guide) => guide.path === path);
}

function GuideCard({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link href={href} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50">
      <span className="block break-words font-black text-slate-950">{label}</span>
      <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">{description}</span>
    </Link>
  );
}

export default function GoogleMerchantCenterErrorsShopifyHub() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-20 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Shopify Merchant Center hub</TextBadge>
              <TextBadge tone="green">Error guides</TextBadge>
            </div>
            <h1 className="mt-6 max-w-5xl break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Google Merchant Center errors for Shopify: find the right fix faster.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Use this hub to classify Merchant Center errors before editing your Shopify feed. Start with the exact warning, then check the related Shopify fields and safe next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 text-sm font-semibold leading-7 text-slate-100 shadow-2xl">
            {MANDATORY_DISCLAIMER}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <a key={category.name} href={`#${category.name.toLowerCase().replaceAll(" ", "-").replaceAll(",", "")}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50">
              <span className="block text-xl font-black text-slate-950">{category.name}</span>
              <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{category.description}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How to use this hub</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Do not guess the fix from the error name alone.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              "Copy the exact Merchant Center warning.",
              "Find the matching category below.",
              "Check the Shopify fields listed on the guide page.",
              "Use CSV diagnosis when many rows may be affected."
            ].map((step, index) => (
              <div key={step} className="rounded-lg border border-blue-200 bg-white p-4 font-semibold leading-7 text-slate-700">
                <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category.name} id={category.name.toLowerCase().replaceAll(" ", "-").replaceAll(",", "")} className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
          <div className="grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Error category</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{category.name}</h2>
              <p className="mt-4 leading-7 text-slate-600">{category.description}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {category.links.map((path) => {
                const guide = guideByPath(path);

                if (!guide) {
                  return null;
                }

                return <GuideCard key={guide.path} href={guide.path} label={guide.label} description={guide.description} />;
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Natural searches</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Guides for plain-language Shopify searches.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Some merchants do not search the exact error code. They search what happened. These pages cover those queries.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {longTailGuides.map((guide) => (
              <GuideCard key={guide.path} href={guide.path} label={guide.label} description={guide.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Next step</p>
              <h2 className="mt-3 break-words text-3xl font-black tracking-tight">Check your Shopify product data before bulk editing.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Run a public scan first. Use the Fix Pack when the issue affects product identifiers, price, availability, images, or many CSV rows.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/scan">Start free scan</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
