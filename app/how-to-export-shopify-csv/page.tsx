import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How to export a Shopify CSV | MerchantFix.ai",
  description:
    "Step-by-step guide for exporting a Shopify product CSV before running a MerchantFix.ai product data diagnostic.",
  alternates: {
    canonical: canonical("/how-to-export-shopify-csv")
  }
};

const exportSteps = [
  {
    title: "Open Products in Shopify admin",
    description: "From your Shopify admin, go to Products. This is where Shopify lets you export your product list."
  },
  {
    title: "Click Export",
    description: "Use the Export action from the Products page. You can export all products, selected products, the current page, or products matching search and filters."
  },
  {
    title: "Choose the CSV format",
    description: "Select the CSV option for Excel, Numbers, or another spreadsheet program if you plan to review the file in a spreadsheet."
  },
  {
    title: "Export products",
    description: "Click Export products. Depending on catalog size and variant count, Shopify may download the file in the browser or email it to you."
  },
  {
    title: "Upload the original CSV to MerchantFix.ai",
    description: "Use the exported file before manual edits. MerchantFix.ai can then identify supported identifier, image, price, and product data issues more clearly."
  }
];

const bestPractices = [
  "Use the original Shopify export when possible.",
  "Avoid sorting the file before diagnosis, because product variants and image URLs can become misaligned.",
  "Export only filtered products when your catalog is very large.",
  "Keep a backup copy before importing any edited CSV back into Shopify.",
  "Do not invent GTIN, MPN, brand, or price values to satisfy a warning."
];

const expectedFields = [
  "Title",
  "Handle",
  "Variant Barcode / GTIN",
  "Variant SKU",
  "Vendor / Brand",
  "Variant Price",
  "Image Src",
  "Google Shopping / Custom Product",
  "Variant Inventory Tracker",
  "Body HTML / Description"
];

const faqs = [
  {
    question: "Should I upload all products or only affected products?",
    answer:
      "If you know which products are affected, export a filtered product list. If you are unsure, export all products so MerchantFix.ai can scan the broader catalog."
  },
  {
    question: "Can I edit the CSV before uploading it?",
    answer:
      "You can, but the cleanest diagnostic usually comes from the original Shopify export. Keep a backup before editing or importing any CSV."
  },
  {
    question: "Does MerchantFix.ai need Shopify admin access?",
    answer:
      "No. The diagnostic works from the CSV file you upload and does not need private Shopify admin access."
  },
  {
    question: "Will MerchantFix.ai import the CSV back into Shopify?",
    answer:
      "No. MerchantFix.ai helps diagnose and prepare safer corrections. You remain responsible for reviewing and importing changes into Shopify."
  }
];

export default function ShopifyCsvExportGuidePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Shopify CSV guide</TextBadge>
              <TextBadge tone="green">Before diagnosis</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              How to export the right Shopify CSV for MerchantFix.ai.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Export your product data from Shopify, keep the file clean, and upload it to MerchantFix.ai to generate a prioritized product data diagnostic report.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#csv-diagnostic">Upload Shopify CSV</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">What this prevents</p>
            <div className="mt-5 grid gap-3">
              {["Wrong file uploaded", "Edited CSV without backup", "Sorted rows causing variant confusion", "Missing product identifiers", "Unclear manual review rows"].map((item) => (
                <div key={item} className="rounded-lg bg-slate-950/45 p-4 font-bold text-white">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Step-by-step export</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Export from Shopify before editing the product file.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              MerchantFix.ai works best when it receives a clean Shopify product export, because the report can better identify supported fields and affected rows.
            </p>
          </div>
          <div className="grid gap-3">
            {exportSteps.map((step, index) => (
              <article key={step.title} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <div>
                  <h3 className="font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Important file safety</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Do not sort the CSV before diagnosis.</h2>
            <p className="mt-4 leading-7 font-semibold">
              Sorting product CSV data in a spreadsheet can create confusion between variants, rows, and image URLs. Upload a clean export first, then review any corrections carefully.
            </p>
          </div>
          <div className="grid gap-3">
            {bestPractices.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Useful CSV fields</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Fields MerchantFix.ai can use for diagnosis.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Column names vary across Shopify exports and apps. MerchantFix.ai tries to normalize supported fields, then flags missing or uncertain data for review.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expectedFields.map((field) => (
              <div key={field} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700">
                {field}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-black text-slate-950">{faq.question}</h2>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Ready for diagnosis</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Upload the exported Shopify CSV.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Use the original export to generate a clearer diagnostic report with priorities, safe fixes, and manual review rows.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/#csv-diagnostic">Upload Shopify CSV</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
