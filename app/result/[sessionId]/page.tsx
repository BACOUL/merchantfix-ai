import Link from "next/link";
import { Disclaimer, PrimaryLink, SecondaryLink, TextBadge } from "@/components";

type ResultPageProps = {
  params: {
    sessionId: string;
  };
};

const surfaceRisks = [
  { label: "Missing image", value: "Review", detail: "Visible public data issue" },
  { label: "Missing price", value: "Review", detail: "May affect product confidence" },
  { label: "Weak title", value: "Info", detail: "Improve clarity before deeper diagnosis" }
];

const nextActions = [
  "Upload a Shopify CSV for row-level GTIN, MPN, brand, and identifier_exists checks.",
  "Do not invent identifiers for products that do not have verified manufacturer data.",
  "Use manual review when a product is custom, handmade, or missing source documentation."
];

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <TextBadge tone="slate">Demo result shell</TextBadge>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                MerchantFix diagnostic result
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                This page shows how a result can be framed without adding accounts, database storage, or a dashboard.
                Fresh CSV diagnostics still run directly from the homepage.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-500">Session: {params.sessionId}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Surface score</p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-6xl font-black text-slate-950">82</span>
                <span className="pb-2 text-sm font-bold text-slate-500">example only</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div className="h-2 w-4/5 rounded-full bg-blue-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          {surfaceRisks.map((risk) => (
            <div key={risk.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-black text-slate-950">{risk.label}</h2>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-900">
                  {risk.value}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{risk.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Next actions</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Move from surface risk to row-level diagnosis.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The URL scan can only see public product data. The Shopify CSV diagnostic is the next step when Google
              Merchant Center reports identifier issues.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PrimaryLink href="/#csv-diagnostic">Upload Shopify CSV</PrimaryLink>
              <SecondaryLink href="/scan">Run another surface scan</SecondaryLink>
            </div>
          </div>
          <div className="grid gap-3">
            {nextActions.map((action, index) => (
              <div key={action} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="font-semibold leading-7 text-slate-700">{action}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Disclaimer>
            MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google
            approval is not guaranteed.
          </Disclaimer>
        </div>

        <Link href="/#csv-diagnostic" className="mt-8 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">
          Back to CSV diagnostic
        </Link>
      </div>
    </main>
  );
}
