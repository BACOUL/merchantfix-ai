import { CsvUploadForm, PrimaryLink, SecondaryLink, Section, TextBadge } from "@/components";

const surfaceChecks = ["Missing image", "Missing price", "Weak title", "Weak description", "Product count"];

const csvChecks = [
  "Missing GTIN",
  "Missing MPN",
  "Missing brand",
  "identifier_exists conflicts",
  "Invalid GTIN",
  "Duplicate GTIN",
  "SKU as MPN warning",
  "Manual review flags"
];

const proofPoints = [
  "No account required",
  "Public Shopify data first",
  "No fake identifiers",
  "CSV fixes only when safe"
];

function ProductPreview() {
  return (
    <div className="pointer-events-none absolute inset-y-8 right-4 hidden w-[46%] max-w-xl opacity-95 lg:block" aria-hidden="true">
      <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">Surface score</p>
            <p className="mt-1 text-4xl font-black text-white">82</p>
          </div>
          <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-xs font-black text-emerald-100">
            Public scan
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {[
            { label: "Missing image", value: "4 products", tone: "bg-amber-300/20 text-amber-100" },
            { label: "Weak title", value: "7 products", tone: "bg-blue-300/20 text-blue-100" },
            { label: "Manual review", value: "Required", tone: "bg-rose-300/20 text-rose-100" }
          ].map((item) => (
            <div key={item.label} className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-white/10 bg-white/10 p-3">
              <span className="font-semibold text-white">{item.label}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${item.tone}`}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">CSV diagnostic</p>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-2 w-2/3 rounded-full bg-blue-300" />
          </div>
          <p className="mt-3 text-sm text-slate-200">GTIN, MPN, brand, identifier_exists</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950">
        <ProductPreview />
        <div className="mx-auto max-w-7xl px-5 py-16 text-white md:px-8 md:py-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="green">For Shopify merchants</TextBadge>
              <TextBadge tone="blue">Google Merchant Center focused</TextBadge>
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Find Shopify product data issues before they slow your ads.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              MerchantFix.ai runs a public Shopify surface scan, then helps diagnose GTIN, MPN, brand, and
              identifier_exists issues from your Shopify CSV.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/scan">Start free Shopify scan</PrimaryLink>
              <SecondaryLink href="#csv-diagnostic">Upload Shopify CSV</SecondaryLink>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
              Focused diagnostics only. MerchantFix.ai does not invent identifiers and cannot guarantee Google approval.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 md:grid-cols-4 md:px-8">
          {proofPoints.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Section
          eyebrow="Two diagnostic levels"
          title="Start broad. Go deep only when needed."
          description="The URL scan is a quick public-data check. The CSV diagnostic is where identifier issues become row-level and actionable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <TextBadge tone="green">Surface scan</TextBadge>
              <h3 className="mt-4 text-xl font-black text-slate-950">Public Shopify URL check</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Uses publicly available product data when accessible. Good for visible issues and a fast risk score.
              </p>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                {surfaceChecks.map((check) => (
                  <li key={check} className="rounded-lg bg-slate-50 px-3 py-2">
                    {check}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <TextBadge tone="blue">CSV diagnostic</TextBadge>
              <h3 className="mt-4 text-xl font-black text-slate-950">Shopify export analysis</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Finds row-level identifier problems and marks uncertain fixes for manual review.
              </p>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700 md:grid-cols-2">
                {csvChecks.map((check) => (
                  <li key={check} className="rounded-lg bg-slate-50 px-3 py-2">
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Workflow"
          title="A practical repair path for Shopify product data."
          description="MerchantFix.ai keeps the work narrow: detect, explain, export safe CSV notes, and flag manual review when product identifiers cannot be verified."
        >
          <div className="grid gap-3">
            {[
              "Run the public surface scan to spot visible product data risks.",
              "Upload a Shopify CSV when Merchant Center errors mention identifiers.",
              "Review affected rows, suggested fixes, and manual review warnings.",
              "Download a corrected CSV only when MerchantFix.ai can make a safe change."
            ].map((step, index) => (
              <div key={step} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="font-semibold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="py-10 md:py-14">
          <CsvUploadForm />
        </section>

        <Section
          eyebrow="Boundaries"
          title="Clear by design. No overpromises."
          description="MerchantFix.ai is built to help with product data diagnosis. It does not claim to solve every Merchant Center issue."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "No Google approval guarantee.",
              "No fake GTIN, MPN, or brand generation.",
              "No private Shopify API or Google Merchant Center API.",
              "No account recovery or suspension promise."
            ].map((item) => (
              <div key={item} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-semibold text-amber-950">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="FAQ" title="What merchants usually ask first.">
          <div className="grid gap-4">
            {[
              ["Does this connect to my Shopify admin?", "No. The MVP uses public product data for the surface scan and CSV files you upload for diagnosis."],
              ["Does this guarantee Google approval?", "No. It helps diagnose product data issues, but Google approval is not guaranteed."],
              ["Will MerchantFix.ai invent product identifiers?", "No. It must never generate fake GTIN, MPN, or brand values."]
            ].map(([question, answer]) => (
              <div key={question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
