import type { Metadata } from "next";
import { BeforeAfterTable, PrimaryLink, SafeDiagnosticNotice, SecondaryLink, TextBadge } from "@/components";
import { buildBreadcrumbSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How MerchantFix works | Shopify Merchant Center diagnosis",
  description:
    "A simple workflow for Shopify merchants: paste a Google Merchant Center warning, scan public product data, use CSV diagnosis when needed, and apply safe corrections only after review.",
  alternates: { canonical: canonical("/how-it-works") }
};

const steps = [
  {
    title: "Paste the warning",
    description: "Start with the exact Google Merchant Center message, for example Missing value [gtin], Missing value [brand], or identifier_exists conflict."
  },
  {
    title: "Get the Shopify checklist",
    description: "MerchantFix identifies likely Shopify fields such as Variant Barcode, Vendor, SKU, MPN, Image Src, Status, and custom product fields."
  },
  {
    title: "Run the public scan",
    description: "Use a public Shopify URL for quick visible product-data risks when public product data is available."
  },
  {
    title: "Use CSV diagnosis when needed",
    description: "Move to the paid CSV diagnostic when the error affects many products or requires row-level checks."
  },
  {
    title: "Review safe actions",
    description: "MerchantFix separates deterministic fixes from manual review rows and tells you what not to invent."
  },
  {
    title: "Apply changes carefully",
    description: "You remain responsible for verifying product facts before editing Shopify, importing CSV changes, or resubmitting in Merchant Center."
  }
];

export default function HowItWorksPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "How it works", path: "/how-it-works" }
  ]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Workflow</TextBadge>
              <TextBadge tone="green">Error to action</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              From Merchant Center warning to Shopify fields and CSV rows.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix keeps the product simple: understand the error, identify the likely fields, inspect public data when available, and use CSV diagnosis when row-level context is needed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/supported-errors">View supported errors</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
              <h2 className="mt-5 text-xl font-black text-slate-950">{step.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Before / after</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">The practical transformation.</h2>
          <div className="mt-6">
            <BeforeAfterTable />
          </div>
        </section>

        <div className="mt-10">
          <SafeDiagnosticNotice />
        </div>
      </div>
    </main>
  );
}
