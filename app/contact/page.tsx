import type { Metadata } from "next";
import Link from "next/link";
import { canonical, SUPPORT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact | MerchantFix.ai",
  description: "Contact MerchantFix.ai for support, privacy requests, refund questions, and Shopify CSV diagnostic issues.",
  alternates: { canonical: canonical("/contact") }
};

const supportCases = [
  {
    title: "Payment or access issue",
    text: "Include the checkout email, payment date, and whether the success page opened correctly. Do not send full card details."
  },
  {
    title: "CSV upload problem",
    text: "Describe the error shown by MerchantFix and confirm whether the file is a Shopify product CSV export. Do not email a CSV unless support asks for it."
  },
  {
    title: "Diagnostic question",
    text: "Include the report ID if available and the specific row or warning that is unclear."
  },
  {
    title: "Privacy or deletion request",
    text: "Use the same email address used during checkout when possible, so support can identify the request."
  }
];

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Contact</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Contact MerchantFix.ai</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Use this page for support, payment access, CSV upload issues, privacy requests, and refund questions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-blue-950">
              <h2 className="text-2xl font-black">Support email</h2>
              <p className="mt-3 leading-7 text-lg font-semibold">
                Contact <Link href={`mailto:${SUPPORT_EMAIL}`} className="font-black underline">{SUPPORT_EMAIL}</Link>.
              </p>
              <p className="mt-3 leading-7 font-semibold">
                MerchantFix.ai is a digital diagnostic product. It does not provide guaranteed Google approval, account recovery, ranking, traffic, sales, legal advice, tax advice, or official Google support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">What to include</h2>
              <div className="mt-4 grid gap-3">
                {supportCases.map((item) => (
                  <div key={item.title} className="rounded-lg bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 font-semibold">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Before contacting support</h2>
              <ul className="mt-4 grid gap-2">
                <li className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">Paste the exact Merchant Center warning first to check whether the issue is supported.</li>
                <li className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">Review <Link href="/supported-errors" className="font-bold text-blue-700 hover:text-blue-900">supported errors</Link> to confirm whether the case is strong, partial, or limited.</li>
                <li className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">For upload errors, export a fresh Shopify product CSV and do not rename or delete columns before upload.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
