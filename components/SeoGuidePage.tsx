import Link from "next/link";
import { PrimaryLink, SecondaryLink, TextBadge } from "./SiteChrome";

export type RelatedGuide = {
  href: string;
  label: string;
  description: string;
};

export type SeoGuideSection = {
  title: string;
  body: string;
  items?: string[];
};

export type SeoGuidePageProps = {
  badge: string;
  title: string;
  intro: string;
  highlights: string[];
  sections: {
    why: SeoGuideSection;
    impact: SeoGuideSection;
    shopifyChecks: SeoGuideSection;
    merchantFixDetects: SeoGuideSection;
    merchantFixWillNotDo: SeoGuideSection;
  };
  relatedGuides: RelatedGuide[];
};

const limitations = [
  "MerchantFix.ai does not guarantee Google Merchant Center approval.",
  "MerchantFix.ai does not guarantee Google Shopping visibility, traffic, ranking, performance, or sales.",
  "MerchantFix.ai does not invent GTINs, MPNs, brands, prices, or product identifiers.",
  "Uncertain issues are flagged for manual review.",
  "Users remain responsible for product data accuracy."
];

function SectionBlock({ section }: { section: SeoGuideSection }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="break-words text-2xl font-black tracking-tight text-slate-950">{section.title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
      {section.items ? (
        <ul className="mt-4 grid gap-3">
          {section.items.map((item) => (
            <li key={item} className="rounded-lg bg-slate-50 px-4 py-3 font-semibold leading-7 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function SeoGuidePage({ badge, title, intro, highlights, sections, relatedGuides }: SeoGuidePageProps) {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_0.52fr] md:px-8 md:py-16">
          <div className="min-w-0">
            <TextBadge tone="blue">{badge}</TextBadge>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/scan">Upload Shopify CSV</SecondaryLink>
            </div>
          </div>
          <aside className="min-w-0 rounded-lg border border-blue-200 bg-blue-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">What this guide covers</p>
            <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
              {highlights.map((item) => (
                <li key={item} className="rounded-lg bg-white px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionBlock section={sections.why} />
          <SectionBlock section={sections.impact} />
          <SectionBlock section={sections.shopifyChecks} />
          <SectionBlock section={sections.merchantFixDetects} />
        </div>

        <section className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5 md:p-6">
          <h2 className="break-words text-2xl font-black tracking-tight text-slate-950">
            {sections.merchantFixWillNotDo.title}
          </h2>
          <p className="mt-3 leading-7 text-amber-950">{sections.merchantFixWillNotDo.body}</p>
          {sections.merchantFixWillNotDo.items ? (
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {sections.merchantFixWillNotDo.items.map((item) => (
                <li key={item} className="rounded-lg bg-white px-4 py-3 font-semibold leading-7 text-amber-950">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="break-words text-2xl font-black tracking-tight text-slate-950">Important limitations</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {limitations.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-semibold leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Check your Shopify data</p>
              <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950">
                Scan public product data first. Upload CSV when you need row-level diagnosis.
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                The URL scan gives a fast public surface check. CSV upload gives deeper diagnosis for GTIN, MPN, brand,
                and identifier_exists issues.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <PrimaryLink href="/scan">Scan my Shopify store</PrimaryLink>
              <SecondaryLink href="/scan">Upload Shopify CSV</SecondaryLink>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="break-words text-2xl font-black tracking-tight text-slate-950">Related Shopify feed guides</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="block font-black text-slate-950">{guide.label}</span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
