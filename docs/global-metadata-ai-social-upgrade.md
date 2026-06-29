# MerchantFix.ai — Global Metadata AI and Social Upgrade

Status: recommended pre-launch improvement.

Date: 2026-06-29

## Purpose

MerchantFix.ai is intended to grow through SEO and AI-first discovery. The site already has strong page-level SEO, structured data, sitemap, robots.txt, and llms.txt.

The global Next.js layout currently has minimal metadata. Before production launch, strengthen the default metadata so shared pages and AI/social crawlers receive a clearer site-level description.

## Current known baseline

`app/layout.tsx` already includes:

- `metadataBase` using `SITE_URL`;
- default title;
- default description;
- JSON-LD structured data from `structuredData`;
- `SiteChrome` wrapper.

## Recommended global metadata

Add or confirm these fields in `app/layout.tsx`:

```ts
const siteDescription =
  "Diagnose Shopify product-data warnings from Google Merchant Center using pasted warning text, Shopify CSV exports, row-level review notes, and safe manual-review guardrails.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MerchantFix.ai | Shopify Merchant Center diagnostics",
    template: "%s | MerchantFix.ai"
  },
  description: siteDescription,
  applicationName: "MerchantFix.ai",
  creator: "TimeProofs",
  publisher: "TimeProofs",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MerchantFix.ai",
    title: "MerchantFix.ai | Shopify Merchant Center diagnostics",
    description: siteDescription,
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "MerchantFix.ai | Shopify Merchant Center diagnostics",
    description: siteDescription
  }
};
```

## Do not add fake image metadata

Do not add OpenGraph image metadata until a real production-ready image exists.

Avoid placeholder image paths such as:

```text
/og.png
/social-card.png
```

unless the file actually exists in `public/` and has been visually checked.

## Launch QA

After deployment, check:

- home page source includes OpenGraph tags;
- Twitter card tags exist;
- canonical domain is `https://merchantfix-ai.com`;
- title and description are not still limited to only GTIN/MPN/brand;
- no missing image URL is referenced.

## Reason

This upgrade improves:

- shared link previews;
- crawler understanding;
- AI summarization context;
- brand consistency;
- default metadata fallback for pages without custom metadata.
