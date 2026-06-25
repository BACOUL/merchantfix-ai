import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";

export const metadata: Metadata = {
  title: "Payment confirmed | MerchantFix.ai",
  description: "Payment confirmation page for MerchantFix.ai Fix Pack checkout.",
  robots: {
    index: false,
    follow: false
  }
};

type SuccessPageProps = {
  searchParams?: {
    session_id?: string;
  };
};

const supportEmail = "contact@merchantfix.ai";

const nextSteps = [
  "Keep your Stripe confirmation email for your records.",
  "Export a clean Shopify product CSV before editing it.",
  "Open the CSV diagnostic area and upload the Shopify export.",
  "Review critical issues, safe fixes, and manual review rows before importing changes."
];

const supportNotes = [
  "If checkout worked but the diagnostic page does not open, email support with your Stripe session ID.",
  "If the CSV upload fails, keep the original export and try again with an unmodified Shopify product CSV.",
  "MerchantFix.ai does not guarantee Google approval, ranking, traffic, performance, or sales."
];

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams?.session_id;
  const diagnosticHref = sessionId ? `/diagnostic?session_id=${encodeURIComponent(sessionId)}` : "/diagnostic";

  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-24">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="green">Payment confirmed</TextBadge>
              <TextBadge tone="blue">Next step: CSV diagnostic</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Your MerchantFix checkout is complete.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Open the diagnostic area, upload your Shopify CSV, and keep your Stripe confirmation email for your records.
            </p>
            {sessionId ? (
              <p className="mt-5 max-w-3xl rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-bold leading-6 text-slate-200">
                Stripe session: {sessionId}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={diagnosticHref}>Open CSV diagnostic</PrimaryLink>
              <SecondaryLink href="/how-to-export-shopify-csv">How to export CSV</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-blue-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What to do now</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Complete the diagnostic in order.</h2>
            <p className="mt-4 leading-7 font-semibold">
              The cleaner the Shopify export, the clearer the diagnostic report will be.
            </p>
          </div>
          <div className="grid gap-3">
            {nextSteps.map((item, index) => (
              <div key={item} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold leading-7 text-slate-700 shadow-sm sm:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Support</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Need help after payment?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Contact support at <a className="font-black text-blue-700 underline" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Include your Stripe session ID when available.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {supportNotes.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-semibold leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
