import Link from "next/link";
import { Disclaimer, Section } from "@/components";

const surfaceChecks = [
  "Missing image",
  "Missing price",
  "Weak or very short title",
  "Empty or weak description",
  "Basic product count"
];

const csvChecks = [
  "Missing GTIN",
  "Missing MPN",
  "Missing brand",
  "Incorrect identifier_exists",
  "Invalid-looking GTIN",
  "Duplicate GTIN",
  "SKU used as MPN warning",
  "Missing image",
  "Missing price"
];

const howItWorks = [
  "Enter your Shopify store URL.",
  "MerchantFix.ai runs a no-install surface scan when public product data is available.",
  "Review visible product data risks.",
  "Upload your Shopify CSV for deeper identifier diagnosis.",
  "MerchantFix.ai scans product identifier issues.",
  "You receive a clear diagnosis.",
  "Safe corrections can be exported in a corrected CSV.",
  "Uncertain cases are marked for manual review."
];

const cannotGuarantee = [
  "No Google approval guarantee.",
  "No fake GTIN generation.",
  "No fake MPN generation.",
  "No account suspension recovery.",
  "No automatic misrepresentation fix.",
  "No full Merchant Center account recovery.",
  "No claim that the URL scan reproduces Google Merchant Center diagnostics."
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-16">
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-xl md:px-12 md:py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">MerchantFix.ai</p>
        <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
              Fix rejected Google Merchant Center products
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Check your Shopify store for visible product data issues in 60 seconds. Then upload your Shopify
              product export for deeper GTIN, MPN, brand, and identifier_exists diagnosis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/scan"
                className="rounded-full bg-cyan-300 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Check My Shopify Store
              </Link>
              <Link
                href="/result/demo-session"
                className="rounded-full border border-white/30 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                Upload Shopify CSV
              </Link>
            </div>
          </div>
          <Disclaimer>
            MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google
            approval is not guaranteed.
          </Disclaimer>
        </div>
      </section>

      <Disclaimer>
        MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google
        Merchant Center diagnosis. Google approval is not guaranteed.
      </Disclaimer>

      <Section title="Supported checks" eyebrow="Two levels">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-950">V0.5 surface scan checks</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {surfaceChecks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">V1 CSV diagnostic checks</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {csvChecks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="How it works">
        <ol className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((step, index) => (
            <li key={step} className="rounded-2xl bg-slate-50 p-4">
              <span className="mr-2 font-black text-blue-600">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What MerchantFix.ai can scan">
        <ul className="list-disc space-y-2 pl-5">
          <li>Detect visible product data risks from publicly available Shopify product data when accessible.</li>
          <li>Count public products when available.</li>
          <li>Detect missing images.</li>
          <li>Detect missing prices.</li>
          <li>Detect weak titles.</li>
          <li>Detect weak descriptions.</li>
          <li>Invite the user to upload a Shopify CSV for deeper analysis.</li>
        </ul>
      </Section>

      <Section title="What MerchantFix.ai can diagnose">
        <ul className="list-disc space-y-2 pl-5">
          <li>Detect product identifier inconsistencies.</li>
          <li>Find rows with missing GTIN or MPN.</li>
          <li>Identify identifier_exists conflicts.</li>
          <li>Detect suspicious or duplicate GTIN values.</li>
          <li>Create a corrected CSV only when changes are safe.</li>
          <li>Add merchantfix_notes to explain recommendations.</li>
        </ul>
      </Section>

      <Section title="What MerchantFix.ai cannot guarantee">
        <ul className="list-disc space-y-2 pl-5">
          {cannotGuarantee.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Pricing preview">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            "Free Shopify URL Surface Scan",
            "Free CSV Diagnosis",
            "Future Fix Pack",
            "Agency plans later"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 p-4 font-semibold text-slate-950">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 font-medium text-slate-700">Payment is not active in V0.5 or V1.</p>
      </Section>

      <Section title="FAQ">
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-slate-950">Does this connect to my Shopify admin?</h3>
            <p className="mt-1">No. The surface scan is designed as a no-install placeholder flow.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Does this guarantee Google approval?</h3>
            <p className="mt-1">No. MerchantFix.ai helps find issues, but Google approval is not guaranteed.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Will MerchantFix.ai invent product identifiers?</h3>
            <p className="mt-1">No. It must never generate fake GTIN, MPN, or brand values.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
