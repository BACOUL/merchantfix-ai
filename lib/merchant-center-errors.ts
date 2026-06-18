export type ErrorSeverity = "critical" | "warning" | "info" | "limited";

export type SupportedMerchantCenterError = {
  id: string;
  label: string;
  exactWarning: string;
  severity: ErrorSeverity;
  aliases: string[];
  guideUrl: string;
  needsCsv: boolean;
  supportedLevel: "supported" | "partial" | "limited";
  shortDiagnosis: string;
  likelyShopifyFields: string[];
  safeActions: string[];
  avoid: string[];
  nextStep: string;
  ctaLabel: string;
  ctaHref: string;
};

export type MerchantCenterErrorDiagnosis = {
  input: string;
  matched: boolean;
  issue: SupportedMerchantCenterError | null;
  fallbackTitle: string;
  fallbackDescription: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export const supportedMerchantCenterErrors: SupportedMerchantCenterError[] = [
  {
    id: "missing-gtin",
    label: "Missing GTIN",
    exactWarning: "Missing value [gtin]",
    severity: "critical",
    aliases: ["missing value [gtin]", "missing gtin", "gtin missing", "missing barcode", "missing value gtin"],
    guideUrl: "/fix/missing-gtin-google-merchant-center",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "Google is asking for a real product barcode. MerchantFix can flag affected CSV rows and show where Shopify barcode or identifier fields need verification.",
    likelyShopifyFields: ["Variant Barcode", "Vendor / Brand", "Variant SKU", "Google Shopping custom product", "identifier_exists", "Product type"],
    safeActions: [
      "Check packaging, supplier data, or manufacturer documentation for a real UPC, EAN, JAN, or ISBN.",
      "Verify whether the product is custom, handmade, personalized, or made to order.",
      "Use CSV diagnosis when many variants are affected."
    ],
    avoid: ["Do not invent GTIN values.", "Do not copy SKU into GTIN.", "Do not set identifier_exists=no unless the product truly has no manufacturer identifiers."],
    nextStep: "Use Fix Pack when more than a few products are affected or when you need row-level CSV diagnosis.",
    ctaLabel: "Start Fix Pack",
    ctaHref: "/fix-pack"
  },
  {
    id: "invalid-gtin",
    label: "Invalid GTIN",
    exactWarning: "Invalid value [gtin]",
    severity: "critical",
    aliases: ["invalid value [gtin]", "invalid gtin", "gtin invalid", "wrong gtin", "invalid barcode"],
    guideUrl: "/fix/invalid-gtin-google-merchant-center",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "The GTIN field appears populated, but the value may be malformed, duplicated, copied from SKU, or not a valid manufacturer barcode.",
    likelyShopifyFields: ["Variant Barcode", "Variant SKU", "Vendor / Brand", "MPN", "identifier_exists"],
    safeActions: [
      "Compare the barcode value with supplier or packaging data.",
      "Check whether the same GTIN appears on unrelated variants.",
      "Mark uncertain rows for manual review before resubmission."
    ],
    avoid: ["Do not replace an invalid GTIN with a guessed one.", "Do not use internal SKU as GTIN.", "Do not bulk-edit identifiers without preserving a backup CSV."],
    nextStep: "Run CSV diagnosis to isolate invalid-looking GTIN rows and duplicates.",
    ctaLabel: "Diagnose CSV rows",
    ctaHref: "/fix-pack"
  },
  {
    id: "missing-brand",
    label: "Missing brand",
    exactWarning: "Missing value [brand]",
    severity: "warning",
    aliases: ["missing value [brand]", "missing brand", "brand missing", "brand is missing", "missing value brand"],
    guideUrl: "/fix/google-merchant-center-missing-brand",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "The feed is missing a usable brand value. MerchantFix can compare Shopify vendor, title, and product fields to flag rows needing brand confirmation.",
    likelyShopifyFields: ["Vendor", "Brand", "Title", "Product type", "Tags", "Feed app brand mapping"],
    safeActions: [
      "Confirm the official product brand before editing.",
      "Use Shopify Vendor only when it reflects the real brand or your feed mapping expects it.",
      "Mark handmade or private-label products separately for review."
    ],
    avoid: ["Do not invent a brand.", "Do not use a supplier name if it is not the product brand.", "Do not bulk-apply your store name without verifying product type."],
    nextStep: "Use the guide for small catalogs or Fix Pack for row-level brand gaps.",
    ctaLabel: "Get row-level check",
    ctaHref: "/fix-pack"
  },
  {
    id: "missing-mpn",
    label: "Missing MPN",
    exactWarning: "Missing value [mpn]",
    severity: "warning",
    aliases: ["missing value [mpn]", "missing mpn", "mpn missing", "missing manufacturer part number", "missing value mpn"],
    guideUrl: "/fix/google-merchant-center-missing-mpn",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "Google may need a manufacturer part number when GTIN is unavailable. MerchantFix can flag missing or risky MPN rows without copying SKU blindly.",
    likelyShopifyFields: ["Variant SKU", "MPN", "Vendor / Brand", "Product title", "Feed app identifier mapping"],
    safeActions: [
      "Confirm whether the SKU is actually the manufacturer's part number.",
      "Check supplier sheets for MPN values.",
      "Keep uncertain MPN rows in manual review."
    ],
    avoid: ["Do not copy SKU into MPN unless it is truly the manufacturer MPN.", "Do not invent MPN values.", "Do not use random internal references as manufacturer identifiers."],
    nextStep: "Use Fix Pack when the affected rows need to be separated from safe SKU rows.",
    ctaLabel: "Check MPN rows",
    ctaHref: "/fix-pack"
  },
  {
    id: "identifier-exists",
    label: "identifier_exists conflict",
    exactWarning: "identifier_exists issue",
    severity: "critical",
    aliases: ["identifier_exists", "identifier exists", "identifier exists conflict", "identifier_exists conflict", "identifier_exists false", "identifier_exists no"],
    guideUrl: "/fix/google-merchant-center-identifier-exists",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "The product identifier logic may be inconsistent. MerchantFix can flag rows where identifier_exists conflicts with GTIN, MPN, or brand data.",
    likelyShopifyFields: ["identifier_exists", "Variant Barcode", "MPN", "Vendor / Brand", "Custom product", "Product category"],
    safeActions: [
      "Verify whether the product truly has no manufacturer identifiers.",
      "Check custom, handmade, vintage, or private-label products separately.",
      "Use manual review before changing identifier_exists in bulk."
    ],
    avoid: ["Do not set identifier_exists=no just to silence an error.", "Do not remove real GTIN or brand data.", "Do not treat all handmade/private-label products the same without checking."],
    nextStep: "Fix Pack is recommended because identifier_exists needs row-level context.",
    ctaLabel: "Diagnose identifier conflicts",
    ctaHref: "/fix-pack"
  },
  {
    id: "price-mismatch",
    label: "Price mismatch",
    exactWarning: "Mismatched value [price]",
    severity: "warning",
    aliases: ["mismatched value [price]", "price mismatch", "mismatched price", "incorrect price", "price does not match"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: true,
    supportedLevel: "partial",
    shortDiagnosis: "MerchantFix can flag price fields in the uploaded CSV, but live Google price matching also depends on storefront, feed sync, currency, sale price, and app configuration.",
    likelyShopifyFields: ["Variant Price", "Variant Compare At Price", "Sale price", "Currency", "Feed app price mapping", "Storefront price"],
    safeActions: [
      "Check Shopify variant prices against the feed values.",
      "Review sale price timing and feed app sync delays.",
      "Confirm currency and country feed settings."
    ],
    avoid: ["Do not change prices only to satisfy a scan without checking storefront values.", "Do not ignore sale price/date logic.", "Do not assume CSV alone explains every price mismatch."],
    nextStep: "Use Fix Pack for CSV price flags, then verify live Merchant Center diagnostics manually.",
    ctaLabel: "Check product CSV",
    ctaHref: "/fix-pack"
  },
  {
    id: "availability-mismatch",
    label: "Availability mismatch",
    exactWarning: "Mismatched value [availability]",
    severity: "warning",
    aliases: ["mismatched value [availability]", "availability mismatch", "availability does not match", "incorrect availability", "out of stock mismatch"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: true,
    supportedLevel: "partial",
    shortDiagnosis: "MerchantFix can flag obvious stock/status fields, but final availability depends on Shopify inventory, storefront status, and feed sync rules.",
    likelyShopifyFields: ["Status", "Published", "Variant Inventory Qty", "Variant Inventory Policy", "Availability", "Feed app inventory mapping"],
    safeActions: [
      "Check product status and variant inventory values.",
      "Compare storefront availability with feed values.",
      "Review whether the product is hidden, draft, archived, or out of stock."
    ],
    avoid: ["Do not mark products in stock without inventory confirmation.", "Do not ignore feed app sync timing.", "Do not bulk-change inventory policy without operational review."],
    nextStep: "Use Fix Pack for CSV-level visibility, then verify live inventory/feed sync.",
    ctaLabel: "Review availability fields",
    ctaHref: "/fix-pack"
  },
  {
    id: "image-issues",
    label: "Image issue",
    exactWarning: "Image issue",
    severity: "warning",
    aliases: ["image issue", "missing image", "image too small", "promotional overlay", "invalid image", "image link"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: false,
    supportedLevel: "partial",
    shortDiagnosis: "MerchantFix can surface missing or weak public image signals and CSV image fields, but final image compliance may require manual visual review.",
    likelyShopifyFields: ["Image Src", "Image Position", "Variant Image", "Product media", "Feed app image mapping"],
    safeActions: [
      "Check whether affected products have product images in Shopify.",
      "Review image URLs and variant image mapping.",
      "Manually inspect images for overlays, watermarks, placeholders, or low quality."
    ],
    avoid: ["Do not assume every image issue is fixable from CSV alone.", "Do not use placeholder images.", "Do not overwrite variant images without checking product context."],
    nextStep: "Start with the free scan, then use CSV diagnosis if many rows are affected.",
    ctaLabel: "Run free scan",
    ctaHref: "/scan"
  },
  {
    id: "misrepresentation",
    label: "Misrepresentation",
    exactWarning: "Misrepresentation",
    severity: "limited",
    aliases: ["misrepresentation", "misleading content", "account suspended", "suspension"],
    guideUrl: "/fix",
    needsCsv: false,
    supportedLevel: "limited",
    shortDiagnosis: "Misrepresentation is broader than product CSV data. MerchantFix can help review some product data signals, but it cannot diagnose or guarantee account recovery.",
    likelyShopifyFields: ["Product titles", "Descriptions", "Images", "Prices", "Availability", "Policies and website trust pages"],
    safeActions: [
      "Review product data for consistency and clarity.",
      "Check store policies, contact information, checkout, pricing, shipping, and returns.",
      "Use product data diagnosis only as one part of a broader account review."
    ],
    avoid: ["Do not expect CSV diagnosis to solve account-level suspension.", "Do not resubmit without reviewing website trust signals.", "Do not treat misrepresentation as a single product field issue."],
    nextStep: "Use MerchantFix only for product-data support; account-level policy recovery needs manual review.",
    ctaLabel: "See supported errors",
    ctaHref: "/supported-errors"
  }
];

export function diagnoseMerchantCenterError(input: string): MerchantCenterErrorDiagnosis {
  const normalizedInput = normalize(input);

  if (!normalizedInput) {
    return {
      input,
      matched: false,
      issue: null,
      fallbackTitle: "Paste a Google Merchant Center warning",
      fallbackDescription: "MerchantFix will detect supported error patterns such as missing GTIN, missing brand, identifier_exists conflicts, price mismatch, availability mismatch, image issues, or limited misrepresentation support."
    };
  }

  const issue = supportedMerchantCenterErrors.find((candidate) =>
    candidate.aliases.some((alias) => normalizedInput.includes(normalize(alias)))
  );

  if (issue) {
    return {
      input,
      matched: true,
      issue,
      fallbackTitle: issue.label,
      fallbackDescription: issue.shortDiagnosis
    };
  }

  return {
    input,
    matched: false,
    issue: null,
    fallbackTitle: "Unsupported or unclear Merchant Center warning",
    fallbackDescription: "MerchantFix may still help if the issue is related to Shopify product data, but this exact warning is not mapped yet. Use the supported errors table or start with a free surface scan."
  };
}
