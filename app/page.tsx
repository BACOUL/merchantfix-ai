import type { Metadata } from "next";
import { PrimaryLink, SecondaryLink, Section, TextBadge } from "@/components";
import { buildBreadcrumbSchema, buildFaqPageSchema, jsonLd } from "@/lib/aiFirstSeo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MerchantFix.ai | Shopify product data diagnostics",
  description:
    "Run a public Shopify surface scan and buy the Fix Pack for row-level GTIN, MPN, brand, and identifier_exists diagnostics from a Shopify CSV.",
  alternates: {
    canonical: canonical("/")
  }
};

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
  "Free surface scan",
  "No Shopify admin access",
  "No fake identifiers",
  "Paid CSV Fix Pack"
];

const sampleIssues = [
  { label: "18 products missing GTIN", tone: "bg-red-50 text-red-700 border-red-200" },
  { label: "11 products missing MPN", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  { label: "7 products with weak descriptions", tone: "bg-blue-50 text-blue-800 border-blue-200" },
  { label: "4 products missing brand", tone: "bg-amber-50 text-amber-800 border-amber-200" }
];

const whoThisIsFor = [
  "You have Google Merchant Center warnings.",
  "Some products are limited, disapproved, or underperforming.",
  "Your Shopify export has missing GTIN, MPN, brand, or identifier fields.",
  "You manage too many products to check manually.",
  "You want safe fixes, not risky automated guesses."
];

const deliverables = [
  {
    title: "Surface scan score",
    description: "Get a fast visible-risk score from public Shopify product data when it is available."
  },
  {
    title: "Product data gaps",
    description: "Spot missing or weak product fields that can reduce feed quality and shopper confidence."
  },
  {
    title: "CSV issue diagnosis",
    description: "Use the paid Fix Pack to check row-level GTIN, MPN, brand, and identifier_exists issues in a Shopify export."
  },
  {
    title: "Safe correction notes",
    description: "See deterministic changes that are safe to explain without inventing identifiers."
  },
  {
    title: "Manual review flags",
    description: "Mark uncertain rows that need merchant verification before any feed change."
  },
  {
    title: "Clear next actions",
    description: "Know what to fix, export, or review next without digging through every product manually."
  }
];

const safetyPoints = [
  "MerchantFix.ai does not invent GTINs.",
  "MerchantFix.ai does not access private Shopify admin data.",
  "MerchantFix.ai does not connect to Google Merchant Center.",
  "MerchantFix.ai does not guarantee Google approval.",
  "MerchantFix.ai only suggests deterministic fixes or manual review."
];

const homeFaqs = [
  {
    question: "Does this connect to my Shopify admin?",
    answer: "No. The MVP uses public product data for the surface scan and CSV files you upload after checkout for diagnosis."
  },
  {
    question: "Does this guarantee Google approval?",
    answer: "No. It helps diagnose product data issues, but Google approval, ranking, traffic, performance, and sales are not guaranteed."
  },
  {
    question: "Will MerchantFix.ai invent product identifiers?",
    answer: "No. It must never generate fake GTIN, MPN, brand, price, shipping, or product values."
  },
  {
    question: "When should I buy the Fix Pack?",
    answer: "Buy the Fix Pack when Google Merchant Center errors require row-level Shopify CSV diagnosis, especially identifiers, GTIN, MPN, brand, price, availability, or image issues."
  }
];

function SampleResultCard({ dark = false }: { dark?: boolean }) {
  const cardClassName = dark
    ? "rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"
    : "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";
  const mutedTextClassName = dark ? "text-slate-300" : "text-slate-500";
  const strongTextClassName = dark ? "text-white" : "text-slate-950";

  return (
    <div className={`${cardClassName} min-w-0`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.22em] ${mutedTextClassName}`}>Example result</p>
          <p className={`mt-2 text-sm font-semibold ${mutedTextClassName}`}>Demo only, not a real scan.</p>
        </div>
        <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
          Sample output
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
        <div className={dark ? "rounded-lg bg-slate-950/45 p-4" : "rounded-lg bg-slate-50 p-4"}>
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${mutedTextClassName}`}>Surface risk score</p>
          <div className="mt-3 flex items-end gap-2">
            <span className={`text-5xl font-black ${strongTextClassName}`}>72</span>
            <span className={`pb-2 text-sm font-bold ${mutedTextClassName}`}>/ 100</span>
          </div>
          <div className={dark ? "mt-4 h-2 rounded-full bg-white/10" : "mt-4 h-2 rounded-full bg-slate-200"}>
            <div className="h-2 w-[72%] rounded-full bg-amber-500" />
          </div>
        </div>

        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${mutedTextClassName}`}>Detected issues</p>
          <div className="mt-3 grid gap-2">
            {sampleIssues.map((issue) => (
              <div key={issue.label} className={`break-words rounded-lg border px-3 py-2 text-sm font-bold ${issue.tone}`}>
                {issue.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={dark ? "mt-5 grid gap-3 rounded-lg bg-slate-950/45 p-4" : "mt-5 grid gap-3 rounded-lg bg-slate-50 p-4"}>
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${mutedTextClassName}`}>Recommended action</p>
        <div className="grid gap-2 md:grid-cols-2">
          <span className="break-words rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
            Safe CSV notes available in Fix Pack
          </span>
          <span className="break-words rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">
            Identifier issues require manual review
          </span>
        </div>
      </div>
    </div>
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-white sm:px-5 md:px-8 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="green">For Shopify merchants</TextBadge>
              <TextBadge tone="blue">Google Shopping data quality</TextBadge>
            </div>
            <h1 className="mt-6 max-w-full break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Find Shopify product data issues before they cost you Google Shopping sales.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Start with a free public Shopify scan. Use the paid Fix Pack when you need row-level CSV diagnostics for identifiers, product data gaps, and safe cleanup notes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-slate-300">
              No Shopify admin access. No fake identifiers. Safe fixes only.
            </p>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-400">
              Start with Google Merchant Center issues today. Build cleaner product data for tomorrow&apos;s shopping channels.
            </p>
          </div>

          <SampleResultCard dark />
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

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <section className="py-10 md:py-14">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Try it free</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  See your public product data risks before editing your feed.
                </h2>
                <p className="mt-4 leading-7 text-slate-700">
                  Start with a public Shopify URL scan. Use the paid Fix Pack when you need CSV-level identifier diagnosis.
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
                <SecondaryLink href="/fix-pack">Buy Fix Pack</SecondaryLink>
              </div>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Who this is for"
          title="Built for Shopify merchants who need cleaner product data"
          description="MerchantFix.ai is for merchants who need a practical way to find product feed issues without risky automated guesses."
        >
          <div className="grid gap-3">
            {whoThisIsFor.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="What you get"
          title="A practical diagnostic, not vague advice"
          description="The result is designed to show what is wrong, which products or rows are affected, and what the next safe action should be."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item.title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="break-words font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Two diagnostic levels"
          title="Start broad. Go deep only when needed."
          description="The URL scan is a quick public-data check. The Fix Pack CSV diagnostic is where identifier issues become row-level and actionable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <TextBadge tone="green">Free surface scan</TextBadge>
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
              <TextBadge tone="blue">Paid Fix Pack</TextBadge>
              <h3 className="mt-4 text-xl font-black text-slate-950">Shopify export analysis</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Finds row-level identifier problems and marks uncertain fixes for manual review after checkout.
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
              "Run the free public surface scan to spot visible product data risks.",
              "Buy the Fix Pack when Merchant Center errors mention identifiers.",
              "Upload your Shopify CSV after checkout.",
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

        <section id="csv-diagnostic" className="scroll-mt-24 py-10 md:py-14">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Fix Pack CSV diagnostic</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Need row-level CSV diagnosis?
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  The CSV diagnostic is part of the paid Fix Pack. Review the sample report, then complete checkout to upload your Shopify export.
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <PrimaryLink href="/fix-pack">Buy Fix Pack</PrimaryLink>
                <SecondaryLink href="/sample-report">See sample report</SecondaryLink>
              </div>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Safety"
          title="Safe by design"
          description="MerchantFix.ai is intentionally narrow: it helps you find product data problems while avoiding risky feed edits."
        >
          <div className="grid gap-3">
            {safetyPoints.map((item) => (
              <div key={item} className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-emerald-950">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Ready to check</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Find the product data issues hiding in your Shopify catalog.
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Start with a free public scan, then buy the Fix Pack when you need deeper row-level diagnosis.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/fix-pack">View Fix Pack</SecondaryLink>
            </div>
          </div>
        </section>

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
