import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, TextBadge } from "@/components";

export const metadata: Metadata = {
  title: "Checkout cancelled | MerchantFix.ai",
  description: "Checkout cancelled page for MerchantFix.ai.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CancelPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-24">
          <div className="max-w-4xl">
            <TextBadge tone="amber">Checkout cancelled</TextBadge>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              No payment was completed.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              You can return to pricing, review the sample report, or start with the free Shopify surface scan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/pricing">Back to pricing</PrimaryLink>
              <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
