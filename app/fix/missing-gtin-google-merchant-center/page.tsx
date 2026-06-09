import type { Metadata } from "next";
import Link from "next/link";
import { MANDATORY_DISCLAIMER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Missing GTIN Google Merchant Center: Shopify Fix Guide | MerchantFix.ai",
  description:
    "Learn how to fix missing GTIN errors in Google Merchant Center for Shopify products. Check barcodes, identifier_exists, MPN, brand, and affected CSV rows."
};

const manualChecklist = [
  "Open the product in Shopify.",
  "Check Variant Barcode.",
  "Confirm whether the product has a real GTIN from packaging or manufacturer data.",
  "Check whether the product has a real MPN.",
  "Check Vendor or Brand.",
  "Review whether the product is custom, handmade, personalized, or made to order.",
  "Do not use SKU as GTIN.",
  "Do not invent barcode values.",
  "Review identifier_exists only when the product truly has no manufacturer identifiers.",
  "Resync or resubmit after correcting data."
];

const notToDo = [
  "Do not generate fake GTIN values.",
  "Do not copy SKU into GTIN.",
  "Do not copy SKU into MPN unless it is truly the manufacturer part number.",
  "Do not invent brand.",
  "Do not assume identifier_exists=no is always correct.",
  "Do not expect a CSV change to fix account-level issues.",
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
    question: "What is a GTIN?",
    answer:
      "A GTIN is a real product identifier, often shown as a barcode value such as UPC, EAN, JAN, or ISBN depending on the product and market."
  },
  {
    question: "Where is GTIN stored in Shopify?",
    answer:
      "For many Shopify exports, GTIN is commonly represented by the Variant Barcode column."
  },
  {
    question: "Is Variant Barcode the same as GTIN?",
    answer:
      "It can be the GTIN field for Shopify product exports, but the value still needs to be a real identifier from product packaging or manufacturer data."
  },
  {
    question: "Can I use SKU as GTIN?",
    answer: "No. SKU is an internal merchant value and should not be copied into GTIN."
  },
  {
    question: "Can I use SKU as MPN?",
    answer:
      "Only if the SKU is truly the manufacturer part number. MerchantFix.ai flags SKU and MPN matches for review."
  },
  {
    question: "What if my product is handmade or custom?",
    answer:
      "Custom, handmade, personalized, or made-to-order products may need a different identifier review. Do not treat that as automatic proof."
  },
  {
    question: "Should I set identifier_exists to no?",
    answer:
      "Only after confirming the product truly has no manufacturer identifiers. Setting identifier_exists incorrectly can create more problems."
  },
  {
    question: "Will fixing GTIN guarantee Google approval?",
    answer: "No. Google approval is not guaranteed, and some issues may be account-level or website-level."
  },
  {
    question: "Can MerchantFix.ai generate a GTIN?",
    answer: "No. MerchantFix.ai does not generate GTIN, MPN, or brand values."
  },
  {
    question: "Can MerchantFix.ai find affected rows in my Shopify CSV?",
    answer:
      "Yes. MerchantFix.ai V1 can scan your Shopify CSV for supported identifier checks and show affected rows."
  }
];

function CTAButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link href="/#csv-diagnostic" className="rounded-full bg-blue-700 px-6 py-3 text-center font-bold text-white hover:bg-blue-800">
        Scan My Shopify CSV
      </Link>
      <Link
        href="/#csv-diagnostic"
        className="rounded-full border border-slate-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-slate-50"
      >
        Paste Merchant Center Error
      </Link>
    </div>
  );
}

export default function MissingGtinPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 md:py-14">
      <section className="grid gap-6 rounded-lg bg-slate-950 p-6 text-white md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">MerchantFix.ai guide</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
          Missing GTIN in Google Merchant Center: How to Fix It for Shopify Products
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-200">
          If Google Merchant Center is flagging missing GTIN values, your Shopify products may be missing real product
          identifier data. This guide explains what to check, what not to fake, and how MerchantFix.ai can scan your
          Shopify CSV for affected rows.
        </p>
        <CTAButtons />
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">What this error means</h2>
        <p className="mt-4 leading-7 text-slate-700">
          GTIN is a real product identifier. Google may use it to understand branded products. If GTIN is missing when
          expected, products may be limited, warned, or disapproved. The exact outcome depends on product type, account
          status, country, and Google policies.
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">Why Google Merchant Center asks for GTIN</h2>
        <p className="mt-4 leading-7 text-slate-700">
          GTIN helps identify commercial products. Branded products often have manufacturer identifiers, and some
          products use GTIN, MPN, and brand data together. Custom, handmade, personalized, or made-to-order products may
          need different identifier logic. Do not invent GTIN values.
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">Why this happens on Shopify</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700">
          <li>Variant Barcode is empty.</li>
          <li>Barcode exists in Shopify but was not exported or synced.</li>
          <li>The product has SKU but no real barcode.</li>
          <li>The product is custom or handmade.</li>
          <li>The Google sales channel may send identifier data inconsistently.</li>
          <li>identifier_exists may be incorrect.</li>
          <li>Vendor or brand data may be missing.</li>
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">Manual fix checklist</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-slate-700">
          {manualChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-red-200 bg-red-50 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-red-950">What not to do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-red-900">
          {notToDo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">When identifier_exists may matter</h2>
        <p className="mt-4 leading-7 text-slate-700">
          identifier_exists tells Google whether product identifiers exist. If a product has real identifiers, they
          should be provided. If a product is custom, handmade, personalized, or made to order and truly has no
          manufacturer identifier, identifier_exists may need review. Changing identifier_exists incorrectly can create
          more problems.
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">How MerchantFix.ai can help</h2>
        <p className="mt-4 leading-7 text-slate-700">
          MerchantFix.ai can scan a Shopify CSV and identify supported identifier issues. MerchantFix.ai may also offer
          a quick Shopify URL surface scan, but the deeper GTIN diagnosis uses the Shopify CSV export.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {merchantFixChecks.map((item) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">What MerchantFix.ai cannot guarantee</h2>
        <p className="mt-4 leading-7 text-slate-700">
          Google approval is not guaranteed. Some rows require manual verification. Some issues are website-level or
          account-level. Misrepresentation and suspensions are not fixed by GTIN changes alone. MerchantFix.ai cannot
          create real GTIN values or confirm manufacturer data unless the user provides it.
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">FAQ</h2>
        <div className="mt-5 grid gap-5">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-1 leading-7 text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-blue-700 p-6 text-white md:p-8">
        <h2 className="text-3xl font-black">Find missing GTIN rows in your Shopify CSV.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-blue-50">
          Upload your Shopify product export or paste your Merchant Center error. MerchantFix.ai will identify affected
          rows, explain what needs review, and generate a corrected CSV when the fix is safe.
        </p>
        <div className="mt-5">
          <CTAButtons />
        </div>
      </section>

      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        {MANDATORY_DISCLAIMER}
      </aside>
    </main>
  );
}
