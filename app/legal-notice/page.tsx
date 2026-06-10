import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Notice | MerchantFix.ai",
  description: "Legal information for MerchantFix.ai, a digital product operated by TimeProofs.",
  alternates: {
    canonical: canonical("/legal-notice")
  }
};

export default function LegalNoticePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Legal notice</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Legal Notice</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Legal identification for MerchantFix.ai, a digital product operated by TimeProofs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-black text-slate-950">Website Publisher</h2>
              <p className="mt-3 leading-7">
                Website and service name: <strong>MerchantFix.ai</strong>.
              </p>
              <p className="mt-2 leading-7">MerchantFix.ai is a digital product operated by TimeProofs.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Legal Operator</h2>
              <div className="mt-3 grid gap-2 leading-7">
                <p>Operator: TimeProofs</p>
                <p>Legal form: Entreprise individuelle</p>
                <p>Entrepreneur: Jeason Alexandre Bacoul</p>
                <p>SIREN: 999356439</p>
                <p>Registered address: 3 rue de l&apos;&Eacute;glise de Louppy, 55000 Les Hauts-de-Ch&eacute;e, France</p>
                <p>VAT: VAT exemption under the French small business VAT exemption regime. No VAT charged.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Contact</h2>
              <p className="mt-3 leading-7">
                Public contact email:{" "}
                <Link href="mailto:contact@timeproofs.io" className="font-bold text-blue-700 hover:text-blue-900">
                  contact@timeproofs.io
                </Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Hosting Provider</h2>
              <div className="mt-3 grid gap-2 leading-7">
                <p>Vercel Inc.</p>
                <p>440 N Barranca Ave #4133</p>
                <p>Covina, CA 91723</p>
                <p>United States</p>
                <Link href="https://vercel.com" className="font-bold text-blue-700 hover:text-blue-900">
                  https://vercel.com
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Intellectual Property</h2>
              <p className="mt-3 leading-7">
                The MerchantFix.ai name, interface, copy, and website content are protected by applicable intellectual
                property laws. Any unauthorized reproduction or reuse is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">Liability Limitation</h2>
              <p className="mt-3 leading-7">
                MerchantFix.ai provides diagnostic support for Shopify product data. The service does not guarantee
                Google Merchant Center approval, Google Shopping visibility, traffic, ranking, performance, or sales.
              </p>
            </section>

            <p className="border-t border-slate-200 pt-5 text-sm font-semibold text-slate-500">Last updated: June 9, 2026</p>
          </div>
        </article>
      </div>
    </main>
  );
}
