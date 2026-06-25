import { authorityGuides } from "./authoritySeo";
import { authoritySeoLevel2Guides } from "./authoritySeoLevel2";
import { combinedGmcErrorSeoPages } from "./combinedGmcErrorSeo";
import { exactShopifyErrorGuides } from "./exactShopifyErrorSeo";
import { glossarySeoPages } from "./glossarySeo";
import { shopifyGmcLongTailSeoPages } from "./shopifyGmcLongTailSeo";

export const SITE_URL = "https://merchantfix-ai.com";

export const fixGuides = [
  {
    path: "/fix/missing-gtin-google-merchant-center",
    label: "Missing GTIN guide",
    description: "Check Shopify barcode data, identifier_exists, MPN, brand, and affected CSV rows."
  },
  {
    path: "/fix/google-merchant-center-missing-mpn",
    label: "Missing MPN guide",
    description: "Review manufacturer part number gaps before editing Shopify product feed data."
  },
  {
    path: "/fix/google-merchant-center-missing-brand",
    label: "Missing brand guide",
    description: "Check missing or weak Shopify brand fields before resubmitting product data."
  },
  {
    path: "/fix/google-merchant-center-identifier-exists",
    label: "identifier_exists guide",
    description: "Understand risky true or false identifier_exists values in Shopify product feeds."
  },
  {
    path: "/fix/shopify-product-feed-errors",
    label: "Shopify product feed errors",
    description: "Review visible and CSV-level product data errors that can affect Google Shopping."
  },
  {
    path: "/fix/shopify-google-shopping-product-data",
    label: "Shopify Google Shopping product data",
    description: "Prepare cleaner product titles, descriptions, images, prices, brands, and identifiers."
  },
  {
    path: "/fix/shopify-missing-product-identifiers",
    label: "Shopify missing product identifiers",
    description: "Compare GTIN, MPN, brand, and identifier_exists issues in one practical guide."
  }
] as const;

export { authorityGuides, exactShopifyErrorGuides };

export const authorityLevel2Guides = authoritySeoLevel2Guides.map((guide) => ({
  path: `/reference/level-2/${guide.slug}`,
  label: guide.label,
  description: guide.description
})) as readonly { path: string; label: string; description: string }[];

export const exactErrorGuides = combinedGmcErrorSeoPages.map((page) => ({
  path: `/fix/google-merchant-center-errors/${page.slug}`,
  label: page.label,
  description: page.description
})) as readonly { path: string; label: string; description: string }[];

export const longTailGuides = shopifyGmcLongTailSeoPages.map((page) => ({
  path: `/fix/shopify-google-shopping/${page.slug}`,
  label: page.label,
  description: page.description
})) as readonly { path: string; label: string; description: string }[];

export const glossaryGuides = glossarySeoPages.map((page) => ({
  path: `/learn/${page.slug}`,
  label: page.term,
  description: page.description
})) as readonly { path: string; label: string; description: string }[];

export const publicRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/scan", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fix-pack", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sample-report", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-to-export-shopify-csv", changeFrequency: "monthly", priority: 0.8 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal-notice", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/fix", changeFrequency: "monthly", priority: 0.8 },
  { path: "/reference", changeFrequency: "monthly", priority: 0.84 },
  { path: "/reference/level-2", changeFrequency: "monthly", priority: 0.82 },
  { path: "/learn", changeFrequency: "monthly", priority: 0.76 },
  { path: "/google-merchant-center-errors-shopify", changeFrequency: "monthly", priority: 0.86 },
  ...authorityGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.82
  })),
  ...authorityLevel2Guides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.78
  })),
  ...exactShopifyErrorGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.74
  })),
  ...fixGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.7
  })),
  ...exactErrorGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.65
  })),
  ...longTailGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.62
  })),
  ...glossaryGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.58
  }))
] as const;

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function canonical(path: string) {
  return absoluteUrl(path);
}

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MerchantFix.ai",
    url: SITE_URL,
    email: "contact@timeproofs.io",
    parentOrganization: {
      "@type": "Organization",
      name: "TimeProofs"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MerchantFix.ai",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "EUR"
    }
  }
];
