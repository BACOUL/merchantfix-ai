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

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams?.session_id;

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
              <PrimaryLink href="/diagnostic">Open CSV diagnostic</PrimaryLink>
              <SecondaryLink href="/how-to-export-shopify-csv">How to export CSV</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Use a clean Shopify product export when possible.",
            "Review safe fixes and manual review rows before importing any CSV.",
            "MerchantFix.ai does not guarantee Google approval, ranking, traffic, performance, or sales."
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 font-semibold leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
