import Link from "next/link";
import { Disclaimer, SurfaceScanForm } from "@/components";

export default function ScanPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <Link href="/" className="font-semibold text-blue-700">
        Back to homepage
      </Link>

      <SurfaceScanForm />

      <section className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-950">Need deeper identifier diagnosis?</h2>
        <p className="mt-2 text-slate-700">Upload Shopify CSV for deeper diagnosis.</p>
        <Link
          href="/#csv-diagnostic"
          className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Upload Shopify CSV for deeper diagnosis
        </Link>
      </section>

      <Disclaimer>
        MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google
        Merchant Center diagnosis. Google approval is not guaranteed.
      </Disclaimer>
    </main>
  );
}
