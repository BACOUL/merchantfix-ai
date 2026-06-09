import Link from "next/link";
import { Disclaimer, SecondaryLink, SurfaceScanForm, TextBadge } from "@/components";

export default function ScanPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1fr_0.7fr] md:px-8 md:py-16">
          <div>
            <TextBadge tone="green">Public Shopify scan</TextBadge>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              A fast surface check before deeper CSV work.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Enter a public Shopify store URL. MerchantFix.ai attempts to read `/products.json`, calculate a surface
              risk score, and flag visible issues like missing images, missing prices, weak titles, and weak descriptions.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">What happens here</p>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              <li className="rounded-lg bg-white p-3">No login or private Shopify API.</li>
              <li className="rounded-lg bg-white p-3">Graceful result when public data is unavailable.</li>
              <li className="rounded-lg bg-white p-3">CSV upload remains the deeper diagnostic path.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <SurfaceScanForm />

        <section className="mt-8 grid gap-5 rounded-lg border border-blue-200 bg-blue-50 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Surface scan limited?</h2>
            <p className="mt-2 leading-7 text-slate-700">
              Some Shopify stores do not expose public product data. Uploading a Shopify CSV gives MerchantFix.ai the
              row-level data needed for GTIN, MPN, brand, and identifier_exists diagnosis.
            </p>
          </div>
          <SecondaryLink href="/#csv-diagnostic">Upload Shopify CSV</SecondaryLink>
        </section>

        <div className="mt-8">
          <Disclaimer>
            MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full
            Google Merchant Center diagnosis. Google approval is not guaranteed.
          </Disclaimer>
        </div>

        <Link href="/" className="mt-8 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
