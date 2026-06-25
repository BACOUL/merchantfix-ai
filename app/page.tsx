import type { Metadata } from "next";
import {
  BeforeAfterTable,
  ErrorPasteForm,
  FixPackOutputPreview,
  PrimaryLink,
  SafeDiagnosticNotice,
  SecondaryLink,
  Section,
  TextBadge
} from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix.ai | Paste Google Merchant Center errors for Shopify",
  description:
    "Paste a Google Merchant Center warning, identify Shopify fields to check, and use Fix Pack for row-level CSV diagnosis of GTIN, brand, MPN, identifier_exists, price, availability, and image issues.",
  alternates: {
    canonical: canonical("/")
  }
};

const proofPoints = [
  "Paste Merchant Center error",
  "Free public Shopify scan",
  "29 € Fix Pack CSV diagnosis",
  "No fake GTINs or invented product data"
];

const workflowSteps = [
  "Paste the exact Google Merchant Center warning.",
  "See the likely Shopify fields to check.",
  "Run a free public Shopify scan when useful.",
  "Use the Fix Pack when row-level CSV diagnosis is needed.",
  "Apply safe edits only after merchant or supplier verification."
];

const feedAppComparison = [
  ["Main job", "Push product data to Google", "Diagnose what is wrong before editing"],
  ["Connection", "Often connects to Shopify or Google", "Starts with pasted error, public URL, or CSV"],
  ["Best use", "Ongoing feed sync", "Fast error understanding and row-level review"],
  ["Risk", "Can change feed output", "Blocks unsafe guesses and flags manual review"],
  ["Merchant value", "Automation", "Clarity before resubmission"]
];

const homeFaqs = [
  {
    question: "Can I paste a real Google Merchant Center error?",
    answer:
      "Yes. The homepage detects common Shopify-related Merchant Center warnings such as missing GTIN, invalid GTIN, missing brand, missing MPN, identifier_exists conflicts, price mismatch, availability mismatch, image issues, and limited misrepresentation support."
  },
  {
    question: "When should I buy the Fix Pack?",
    answer:
      "Buy the Fix Pack when the warning affects many products or requires row-level Shopify CSV diagnosis, especially GTIN, MPN, brand, identifier_exists, price, availability, or image issues."
  },
  {
    question: "Does MerchantFix connect to Shopify admin or Google Merchant Center?",
    answer:
      "No. The free scan uses public product data when available. The Fix Pack uses a Shopify CSV export uploaded after checkout."
  },
  {
    question: "Does this guarantee Google approval?",
    answer:
      "No. MerchantFix helps diagnose supported product data issues and safe next actions, but Google approval, ranking, traffic, performance, account recovery, and sales are never guaranteed."
  }
];

function HeroReportCard() {
  return (
    <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">Example pasted error</p>
          <h2 className="mt-3 text-2xl font-black text-white">Missing value [gtin]</h2>
        </div>
        <span className="w-fit rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black text-red-800">Critical</span>
      </div>
      <div className="mt-5 grid gap-3">
        {[
          ["Likely Shopify field", "Variant Barcode"],
          ["Also check", "Vendor / Brand, MPN, custom product status"],
          ["Safe warning", "Do not invent GTIN values"],
          ["Best next step", "Fix Pack for affected CSV rows"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-950/45 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 font-bold leading-6 text-white">{value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function HomePage() {
  const faqSchema = buildFaqPageSchema(homeFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="overflow-hidden bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-white sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="green">For Shopify merchants</TextBadge>
              <TextBadge tone="blue">Google Merchant Center errors</TextBadge>
            </div>
            <h1 className="mt-6 max-w-full break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Paste your Google Merchant Center error. Get the Shopify fields to check.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              MerchantFix turns warnings like missing GTIN, missing brand, identifier_exists conflicts, price mismatch, availability mismatch, and image issues into a practical Shopify checklist and CSV diagnosis path.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/#paste-error">Paste my error</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              Safe diagnostics only. No fake GTINs. No invented product data. No Google approval guarantee.
            </p>
          </div>

          <HeroReportCard />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:px-5 md:grid-cols-4 md:px-8">
          {proofPoints.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <ErrorPasteForm />

        <Section
          eyebrow="Before / after"
          title="From vague Google warning to practical Shopify worklist."
          description="MerchantFix gives merchants useful direction before checkout by translating the error into the fields and rows that matter."
        >
          <BeforeAfterTable />
        </Section>

        <Section
          eyebrow="What you receive"
          title="The Fix Pack is a concrete deliverable, not vague advice."
          description="The paid 29 € product is designed for merchants who need row-level Shopify CSV diagnosis before resubmitting or editing product data."
        >
          <FixPackOutputPreview />
        </Section>

        <Section
          eyebrow="How it works"
          title="One clear path from error to action."
          description="The flow stays narrow on purpose: understand the warning, check visible data, then use CSV diagnosis only when row-level context is needed."
        >
          <div className="grid gap-3">
            {workflowSteps.map((step, index) => (
              <div key={step} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[auto_1fr]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="font-semibold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Positioning"
          title="MerchantFix is not another feed management app."
          description="This distinction matters. The product is a diagnostic layer for merchants who need to understand what Google is complaining about before changing product data."
        >
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-3 py-2 font-black">Area</th>
                  <th className="px-3 py-2 font-black">Feed app</th>
                  <th className="px-3 py-2 font-black">MerchantFix</th>
                </tr>
              </thead>
              <tbody>
                {feedAppComparison.map(([area, feedApp, merchantFix]) => (
                  <tr key={area} className="bg-slate-50 font-semibold leading-6 text-slate-700">
                    <td className="rounded-l-lg px-3 py-3 text-slate-950">{area}</td>
                    <td className="px-3 py-3">{feedApp}</td>
                    <td className="rounded-r-lg px-3 py-3">{merchantFix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <section className="grid gap-5 rounded-2xl border border-blue-200 bg-blue-50 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Fix Pack CSV diagnostic</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Need row-level CSV diagnosis?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Review the sample report, then buy the Fix Pack when your Merchant Center warning affects multiple products or needs affected rows.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <PrimaryLink href="/fix-pack">View Fix Pack</PrimaryLink>
            <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
          </div>
        </section>

        <div className="mt-10">
          <SafeDiagnosticNotice />
        </div>

        <Section eyebrow="FAQ" title="What merchants usually ask first.">
          <div className="grid gap-4">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
