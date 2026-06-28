import type { Metadata } from "next";
import Link from "next/link";
import { canonical, SUPPORT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refund Policy | MerchantFix.ai",
  description: "Refund policy for MerchantFix.ai digital diagnostic services, including duplicate payments, technical failures, and delivered diagnostic output.",
  alternates: { canonical: canonical("/refund-policy") }
};

const refundCases = [
  {
    title: "Duplicate payment",
    text: "If the same customer is accidentally charged twice for the same Fix Pack purchase, contact support with the checkout email and payment date. Duplicate payment cases are eligible for review."
  },
  {
    title: "Technical failure before diagnostic access",
    text: "If payment succeeds but diagnostic access cannot be opened because of a MerchantFix technical issue, support will try to restore access or review a refund request."
  },
  {
    title: "No automatic refund after delivered diagnostic output",
    text: "Because the Fix Pack is a digital diagnostic service, refunds are not automatic once the diagnostic output has been generated or made available."
  },
  {
    title: "Unsupported or bad-fit cases",
    text: "MerchantFix separates supported, partial, and limited cases before purchase. Customers should paste the warning first and review supported errors before buying. Bad-fit cases may still be reviewed commercially, but approval is not automatic."
  }
];

const notCovered = [
  "Google approval, ranking, traffic, performance, sales, or account recovery not achieved after using MerchantFix.",
  "Customer uploaded the wrong file type after clear CSV guidance was shown.",
  "Customer expected MerchantFix to invent GTIN, MPN, brand, price, image, shipping, tax, or product facts.",
  "Customer expected a Shopify app, Google Merchant Center API connection, PDF export, ZIP delivery, or account dashboard during the current launch scope."
];

export default function RefundPolicyPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Refunds</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Refund Policy</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            MerchantFix.ai sells digital diagnostic services. This page explains when refund requests may be reviewed and what the Fix Pack does not guarantee.
          </p>
          <p className="mt-3 text-sm font-bold text-slate-500">Last updated: June 27, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-blue-950">
              <h2 className="text-2xl font-black">Core principle</h2>
              <p className="mt-3 leading-7 font-semibold">
                The Fix Pack is a digital diagnostic output, not a guaranteed Google result. MerchantFix.ai helps customers understand product-data issues, but it does not guarantee approval, performance, sales, or account recovery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Refund review cases</h2>
              <div className="mt-4 grid gap-3">
                {refundCases.map((item) => (
                  <div key={item.title} className="rounded-lg bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 font-semibold">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Not covered by refund promise</h2>
              <ul className="mt-4 grid gap-2">
                {notCovered.map((item) => (
                  <li key={item} className="rounded-lg bg-red-50 px-3 py-2 font-semibold text-red-950">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">How to request support</h2>
              <p className="mt-3 leading-7">
                Email <Link href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-blue-700 hover:text-blue-900">{SUPPORT_EMAIL}</Link> with your checkout email, payment date, and a clear description of the issue. Do not send full card details.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
