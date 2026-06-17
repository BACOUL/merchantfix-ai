import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fix Pack | MerchantFix.ai",
  description:
    "One-time Shopify CSV diagnostic for Google Merchant Center product data issues, safe correction guidance, and manual review flags.",
  alternates: {
    canonical: canonical("/fix-pack")
  }
};

const checks = [
  "Missing GTIN",
  "Missing MPN",
  "Missing brand",
  "identifier_exists conflicts",
  "Invalid-looking GTIN values",
  "Duplicate GTIN warnings",
  "SKU used as MPN warning",
  "Missing image warnings where supported",
  "Missing price warnings where supported",
  "Weak visible product data signals"
];

const deliverables = [
  "Diagnostic summary",
  "Issue priorities",
  "Affected rows when CSV data allows it",
  "Safe correction guidance",
  "Corrected CSV when deterministic",
  "Manual review checklist"
];

const process = [
  "Upload your Shopify CSV export.",
  "MerchantFix.ai checks supported product data fields.",
  "Review critical issues, warnings, and manual review flags.",
  "Download safe correction notes or a corrected CSV when deterministic fixes exist."
];

const trustRules = [
  "No fake GTIN values.",
  "No invented MPN values.",
  "No invented brands.",
  "No approval guarantee.",
  "No Shopify admin connection required.",
  "No Merchant Center connection required."
];

export default function FixPackPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="blue">Fix Pack</TextBadge>
              <TextBadge tone="green">$29 one-time</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              A practical Shopify CSV diagnostic for product data issues.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix Fix Pack helps Shopify merchants find missing identifiers, weak product data, and risky rows
              before editing a feed or resubmitting products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#csv-diagnostic">Upload Shopify CSV</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              No fake identifiers. No approval guarantee. Safe deterministic fixes only.
            </p>
          </div>

          <aside className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">What you receive</p>
            <div className="mt-5 grid gap-3">
              {deliverables.map((item) => (
                <div key={item} className="rounded-lg bg-slate-950/45 p-4 font-bold text-white">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What it checks</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Focused checks for product data fields merchants actually struggle with.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The V1 scope stays narrow so the output remains practical, explainable, and safe.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {checks.map((check) => (
              <div key={check} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">How it works</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A simple repair path, without risky guesses.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {process.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="mt-4 font-semibold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Trust rules</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">No fake product data.</h2>
            <p className="mt-4 leading-7 font-semibold">
              Product identifiers are real data. If a value cannot be verified, it must not be invented.
            </p>
          </div>
          <div className="grid gap-3">
            {trustRules.map((rule) => (
              <div key={rule} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Ready to prepare your CSV</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with the CSV diagnostic flow.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                The checkout step comes next. This page routes users to the existing CSV flow so the value can be tested immediately.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/#csv-diagnostic">Upload Shopify CSV</PrimaryLink>
              <SecondaryLink href="/pricing">Compare pricing</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
