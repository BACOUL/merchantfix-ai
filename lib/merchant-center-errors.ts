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
    guideUrl: "/fix/missing-value-gtin-shopify",
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
    guideUrl: "/fix/invalid-value-gtin-shopify",
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
    id: "duplicate-gtin",
    label: "Duplicate GTIN",
    exactWarning: "Duplicate value [gtin]",
    severity: "critical",
    aliases: ["duplicate value [gtin]", "duplicate gtin", "duplicate barcode", "same gtin", "gtin duplicated", "barcode already used"],
    guideUrl: "/fix/invalid-value-gtin-shopify",
    needsCsv: true,
    supportedLevel: "supported",
    shortDiagnosis: "The same barcode may be used on products or variants that should not share one GTIN. MerchantFix can flag repeated barcode values and separate likely duplicates from legitimate variant cases.",
    likelyShopifyFields: ["Variant Barcode", "Handle", "Title", "Variant SKU", "Option values", "Vendor / Brand"],
    safeActions: [
      "Review every row that shares the same barcode.",
      "Confirm whether variants legitimately share one GTIN or need separate identifiers.",
      "Check packaging or supplier data before changing barcode values."
    ],
    avoid: ["Do not invent replacement GTINs.", "Do not delete all duplicate barcode values without checking variant context.", "Do not copy one variant barcode across unrelated products."],
    nextStep: "Use Fix Pack when you need a row-level list of repeated barcodes and manual-review cases.",
    ctaLabel: "Find duplicate GTIN rows",
    ctaHref: "/fix-pack"
  },
  {
    id: "missing-brand",
    label: "Missing brand",
    exactWarning: "Missing value [brand]",
    severity: "warning",
    aliases: ["missing value [brand]", "missing brand", "brand missing", "brand is missing", "missing value brand"],
    guideUrl: "/fix/missing-value-brand-shopify",
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
    guideUrl: "/fix/missing-value-mpn-shopify",
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
    guideUrl: "/fix/identifier-exists-conflict-shopify",
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
    id: "duplicate-item-id",
    label: "Duplicate item ID",
    exactWarning: "Duplicate item ID",
    severity: "warning",
    aliases: ["duplicate item id", "duplicate id [id]", "duplicate product id", "duplicate offer id", "same item id", "item id already exists"],
    guideUrl: "/fix/shopify-csv-google-merchant-center-errors",
    needsCsv: true,
    supportedLevel: "partial",
    shortDiagnosis: "The feed may be submitting the same item identifier for multiple products or variants. MerchantFix can check Shopify handles, SKUs, variants, and CSV row structure, but feed apps may generate IDs outside the CSV.",
    likelyShopifyFields: ["Handle", "Variant SKU", "Variant ID", "Option values", "Feed app item_group_id", "Feed app ID mapping"],
    safeActions: [
      "Compare duplicated IDs against product handles and variant SKUs.",
      "Check whether the duplicate comes from a feed app rule or export format.",
      "Keep the original CSV before changing identifiers."
    ],
    avoid: ["Do not randomly rename item IDs without understanding feed mapping.", "Do not merge unrelated variants to hide duplicates.", "Do not change SKU values if they are used operationally without review."],
    nextStep: "Use Fix Pack for CSV-level duplicate checks, then verify feed app ID mapping manually.",
    ctaLabel: "Check duplicate IDs",
    ctaHref: "/fix-pack"
  },
  {
    id: "price-mismatch",
    label: "Price mismatch",
    exactWarning: "Mismatched value [price]",
    severity: "warning",
    aliases: ["mismatched value [price]", "price mismatch", "mismatched price", "incorrect price", "price does not match"],
    guideUrl: "/fix/mismatched-value-price-shopify",
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
    guideUrl: "/fix/mismatched-availability-shopify",
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
    guideUrl: "/fix/google-merchant-center-image-issue-shopify",
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
    id: "image-not-retrieved",
    label: "Image not retrieved or crawl blocked",
    exactWarning: "Image not retrieved",
    severity: "warning",
    aliases: ["image not retrieved", "image crawl blocked", "cannot crawl image", "image link not accessible", "image url not accessible", "could not crawl image"],
    guideUrl: "/fix/google-merchant-center-image-issue-shopify",
    needsCsv: false,
    supportedLevel: "partial",
    shortDiagnosis: "Google may not be able to fetch the submitted product image. MerchantFix can point merchants toward image URLs, Shopify media, and public accessibility checks, but crawlability still needs live verification.",
    likelyShopifyFields: ["Image Src", "Variant Image", "Product media URL", "CDN image URL", "Feed image mapping"],
    safeActions: [
      "Open the submitted image URL in a private browser window.",
      "Check whether the Shopify image is published and publicly accessible.",
      "Review app or CDN rules that could block Google image fetching."
    ],
    avoid: ["Do not replace images blindly without checking public accessibility.", "Do not assume CSV alone proves crawlability.", "Do not use private or expired image URLs."],
    nextStep: "Use the scan for public image signals and Fix Pack when many CSV rows need image URL review.",
    ctaLabel: "Run image scan",
    ctaHref: "/scan"
  },
  {
    id: "missing-shipping",
    label: "Missing shipping",
    exactWarning: "Missing value [shipping]",
    severity: "warning",
    aliases: ["missing value [shipping]", "missing shipping", "shipping missing", "invalid shipping", "shipping settings missing", "shipping not configured"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: false,
    supportedLevel: "partial",
    shortDiagnosis: "Shipping warnings can involve Merchant Center settings, product weight, country rules, and Shopify markets. MerchantFix can flag likely product-data signals, but final shipping setup must be verified in Google and Shopify.",
    likelyShopifyFields: ["Variant Weight", "Requires shipping", "Shipping profile", "Market / country", "Feed shipping label", "Merchant Center shipping settings"],
    safeActions: [
      "Check whether affected products require shipping and have usable weight data.",
      "Review shipping profiles, countries, and delivery rules.",
      "Verify Merchant Center shipping settings before resubmission."
    ],
    avoid: ["Do not invent shipping prices in product data without operational confirmation.", "Do not ignore country-specific shipping rules.", "Do not treat account-level shipping setup as a CSV-only issue."],
    nextStep: "Use MerchantFix for product-data context, then verify shipping configuration manually.",
    ctaLabel: "Review product data",
    ctaHref: "/fix-pack"
  },
  {
    id: "tax-issue",
    label: "Tax issue",
    exactWarning: "Missing or invalid value [tax]",
    severity: "warning",
    aliases: ["missing value [tax]", "invalid value [tax]", "tax issue", "tax missing", "tax settings", "tax not configured"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: false,
    supportedLevel: "partial",
    shortDiagnosis: "Tax issues may depend on country, Merchant Center settings, Shopify tax configuration, and product category. MerchantFix can flag product-data signals but does not provide tax advice or guarantee compliance.",
    likelyShopifyFields: ["Taxable", "Product category", "Google product category", "Market / country", "Merchant Center tax settings"],
    safeActions: [
      "Check whether affected products are marked taxable in Shopify.",
      "Review country-specific Merchant Center tax settings.",
      "Verify product categories before changing tax-related product data."
    ],
    avoid: ["Do not change tax settings without business or accounting review.", "Do not assume the CSV alone explains tax eligibility.", "Do not promise tax compliance from a product-data scan."],
    nextStep: "Use MerchantFix only for product-data visibility; tax configuration should be manually verified.",
    ctaLabel: "See supported errors",
    ctaHref: "/supported-errors"
  },
  {
    id: "invalid-product-category",
    label: "Invalid product category",
    exactWarning: "Invalid value [google_product_category]",
    severity: "warning",
    aliases: ["invalid value [google_product_category]", "invalid product category", "google product category invalid", "wrong google product category", "product category issue"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: true,
    supportedLevel: "partial",
    shortDiagnosis: "The submitted Google product category may be missing, obsolete, malformed, or mapped poorly. MerchantFix can flag category fields and suspicious mappings, but choosing the final category may require merchant review.",
    likelyShopifyFields: ["Google product category", "Product category", "Product type", "Tags", "Feed category mapping"],
    safeActions: [
      "Check the product's Shopify category and product type.",
      "Review feed app category mapping rules.",
      "Use a verified Google product category rather than a store-only label."
    ],
    avoid: ["Do not map every product to one generic category.", "Do not confuse Shopify Product type with Google product category.", "Do not bulk-change categories without checking product groups."],
    nextStep: "Use Fix Pack when many rows need category mapping review before resubmission.",
    ctaLabel: "Check category rows",
    ctaHref: "/fix-pack"
  },
  {
    id: "landing-page-unavailable",
    label: "Landing page unavailable",
    exactWarning: "Landing page not available",
    severity: "limited",
    aliases: ["landing page not available", "landing page unavailable", "page not found", "404 landing page", "product page unavailable", "destination not working"],
    guideUrl: "/fix/shopify-product-feed-errors",
    needsCsv: false,
    supportedLevel: "limited",
    shortDiagnosis: "Google may not be able to reach the product landing page. MerchantFix can point toward Shopify status, handle, URL, and published state, but live crawl and site availability require manual verification.",
    likelyShopifyFields: ["Handle", "Status", "Published", "Online Store channel", "Product URL", "Redirects"],
    safeActions: [
      "Open the affected product URL in a private browser window.",
      "Check Shopify product status and sales channel publishing.",
      "Review redirects, deleted handles, password protection, or region blocks."
    ],
    avoid: ["Do not assume the CSV alone proves page availability.", "Do not resubmit before the public landing page loads correctly.", "Do not ignore redirects or password-protected stores."],
    nextStep: "Use MerchantFix for product-data clues; final page availability needs live browser and Merchant Center checks.",
    ctaLabel: "Run free scan",
    ctaHref: "/scan"
  },
  {
    id: "misrepresentation",
    label: "Misrepresentation",
    exactWarning: "Misrepresentation",
    severity: "limited",
    aliases: ["misrepresentation", "misleading content", "account suspended", "suspension"],
    guideUrl: "/fix/google-merchant-center-misrepresentation-shopify",
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
      fallbackDescription: "MerchantFix will detect supported error patterns such as GTIN, brand, MPN, identifier_exists, duplicate IDs, price, availability, image, shipping, tax, category, landing page, or limited misrepresentation support."
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
