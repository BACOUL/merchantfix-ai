import Link from "next/link";
import { Disclaimer, PlaceholderCard } from "@/components";

const summaryCards = [
  { label: "Products detected", value: "—" },
  { label: "Missing images", value: "—" },
  { label: "Missing prices", value: "—" },
  { label: "Weak titles", value: "—" },
  { label: "Weak descriptions", value: "—" }
];

export default function ScanPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <Link href="/" className="font-semibold text-blue-700">← Back to homepage</Link>
      <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">No-install placeholder</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Shopify Store Surface Scan</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          This scan uses publicly available product data when accessible. It is not a full Google Merchant Center
          diagnosis.
        </p>
        <form className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="store-url">Shopify store URL</label>
          <input
            id="store-url"
            name="store-url"
            type="url"
            placeholder="https://example-store.myshopify.com"
            className="rounded-full border border-slate-300 px-5 py-3 outline-none ring-blue-500 transition focus:ring-2"
          />
          <button
            type="button"
            className="rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            Run Surface Scan
          </button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {summaryCards.map((card) => (
          <PlaceholderCard key={card.label} label={card.label} value={card.value} />
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-950">Need deeper identifier diagnosis?</h2>
        <p className="mt-2 text-slate-700">Upload Shopify CSV for deeper diagnosis.</p>
        <Link
          href="/result/demo-session"
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
