import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Missing GTIN Google Merchant Center: Shopify Fix Guide | MerchantFix.ai",
  description:
    "Learn how to fix missing GTIN errors in Google Merchant Center for Shopify products. Check barcodes, identifier_exists, MPN, brand, and affected CSV rows."
};

const manualChecklist = [
  "Open the product in Shopify and review each affected variant.",
  "Check Variant Barcode for a real UPC, EAN, JAN, or ISBN value.",
  "Confirm whether the product has a verified manufacturer GTIN.",
  "Check whether the product has a real MPN.",
  "Check Vendor or Brand values.",
  "Review whether the product is custom, handmade, personalized, or made to order.",
  "Review identifier_exists only when the product truly has no manufacturer identifiers.",
  "Resync or resubmit after correcting data."
];

const notToDo = [
  "Do not generate fake GTIN values.",
  "Do not copy SKU into GTIN.",
  "Do not copy SKU into MPN unless it is truly the manufacturer part number.",
  "Do not invent brand.",
  "Do not assume identifier_exists=no is always correct.",
  "Do not expect guaranteed Google approval."
];

const merchantFixChecks = [
  "Detect rows with missing GTIN.",
  "Detect rows with missing MPN.",
  "Detect identifier_exists conflicts.",
  "Detect missing brand or vendor.",
  "Detect invalid-looking GTIN values.",
  "Detect duplicate GTIN values.",
  "Add merchantfix_notes.",
  "Generate a corrected CSV when the correction is safe.",
  "Mark uncertain rows for manual review.",
  "Avoid inventing product identifiers."
];

const faqs = [
  {
    question: "Where is GTIN stored in Shopify?",
    answer: "For many Shopify exports, GTIN is represented by the Variant Barcode column."
  },
  {
    question: "Can I use SKU as GTIN?",
    answer: "No. SKU is an internal merchant value and should not be copied into GTIN."
  },
  {
    question: "Should I set identifier_exists to no?",
    answer:
      "Only after confirming the product truly has no manufacturer identifiers. Setting it incorrectly can create new issues."
  },
  {
    question: "Will fixing GTIN guarantee Google approval?",
    answer: "No. Google approval is not guaranteed, and some problems may be account-level or website-level."
  }
];

function CtaRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <PrimaryLink href="/#csv-diagnostic">Scan my Shopify CSV</PrimaryLink>
      <SecondaryLink href="/scan">Scan my Shopify store</SecondaryLink>
    </div>
  );
}

export default function MissingGtinPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1fr_0.55fr] md:px-8 md:py-16">
          <div>
            <TextBadge tone="blue">Merchant Center guide</TextBadge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Missing GTIN in Google Merchant Center: how to fix it for Shopify products
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Missing GTIN warnings usually mean Google expected real product identifier data. For Shopify merchants,
              the first place to check is often Variant Barcode, then MPN, brand, and identifier_exists.
            </p>
            <div className="mt-8">
              <CtaRow />
            </div>
          </div>
          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            {MANDATORY_DISCLAIMER}
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <section className="grid gap-5 md:grid-cols-3">
          {[
            ["What it means", "Google may need a real barcode-style identifier for branded products."],
            ["Why Shopify gets flagged", "Variant Barcode can be empty, invalid, duplicated, or missing from exports."],
            ["Where MerchantFix helps", "The CSV diagnostic finds affected rows and explains what needs review."]
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Manual fix checklist</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Check the real product data before changing the feed.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A GTIN is not a value to guess. Use product packaging, manufacturer data, or verified catalog information.
            </p>
          </div>
          <ol className="grid gap-3">
            {manualChecklist.map((item, index) => (
              <li key={item} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <span className="font-semibold leading-7 text-slate-700">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-y border-slate-200 py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">Avoid bad fixes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Do not make identifier data up.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Fake identifiers can create worse feed quality problems. MerchantFix.ai marks uncertain rows for manual review.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {notToDo.map((item) => (
              <div key={item} className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-900">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">MerchantFix.ai checks</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A focused CSV diagnostic for Shopify product identifiers.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Upload a Shopify CSV export to locate affected rows, see recommended actions, and export safe notes when possible.
            </p>
            <div className="mt-6">
              <CtaRow />
            </div>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {merchantFixChecks.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-700 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 border-t border-slate-200 py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Short answers before you edit your feed.</h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">Find missing GTIN rows in your Shopify CSV.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                MerchantFix.ai identifies affected rows, explains what needs review, and avoids unsafe identifier generation.
              </p>
            </div>
            <CtaRow />
          </div>
        </section>

        <Link href="/" className="mt-8 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">
          Back to MerchantFix.ai
        </Link>
      </div>
    </main>
  );
}
