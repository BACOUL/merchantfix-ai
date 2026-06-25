export type ExactShopifyErrorPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  exactWarning: string;
  searchVariants: string[];
  directAnswer: string;
  shopifyFields: string[];
  safeSteps: string[];
  avoid: string[];
  fixPackFit: string;
  relatedGuide: string;
  relatedGuideLabel: string;
};

export const exactShopifyErrorPages = [
  {
    slug: "missing-value-gtin-shopify",
    label: "Missing value [gtin] Shopify",
    title: "Missing value [gtin] Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Missing value [gtin] for Shopify products in Google Merchant Center. Check Variant Barcode, GTIN, MPN, brand, identifier_exists, and affected CSV rows without inventing data.",
    h1: "Missing value [gtin] in Google Merchant Center for Shopify",
    exactWarning: "Missing value [gtin]",
    searchVariants: ["missing value gtin shopify", "missing value [gtin] google merchant center shopify", "shopify missing gtin merchant center", "variant barcode missing gtin"],
    directAnswer:
      "This usually means Google expected a real product barcode for one or more Shopify variants. The first place to check is Variant Barcode, then MPN, brand, and identifier_exists when the product has no manufacturer identifiers.",
    shopifyFields: ["Variant Barcode", "Google Shopping / MPN", "Vendor or brand", "Product title", "identifier_exists if present"],
    safeSteps: [
      "Find the affected product and variant in Shopify.",
      "Check product packaging or supplier data for a real UPC, EAN, JAN, or ISBN.",
      "Add the GTIN only when it is verified.",
      "If no GTIN exists, check whether MPN and brand are available.",
      "Mark uncertain rows for manual review instead of guessing."
    ],
    avoid: ["Do not invent a GTIN.", "Do not copy SKU into GTIN.", "Do not bulk-set identifier_exists to no without checking the product."],
    fixPackFit: "Use Fix Pack when the warning affects many rows and you need a row-level list of products with missing barcode, MPN, brand, or identifier_exists conflicts.",
    relatedGuide: "/fix/google-merchant-center-errors/missing-value-gtin",
    relatedGuideLabel: "Detailed Missing value [gtin] guide"
  },
  {
    slug: "invalid-value-gtin-shopify",
    label: "Invalid value [gtin] Shopify",
    title: "Invalid value [gtin] Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Invalid value [gtin] for Shopify feeds by checking Variant Barcode format, SKU misuse, duplicates, and verified manufacturer barcodes.",
    h1: "Invalid value [gtin] in Google Merchant Center for Shopify",
    exactWarning: "Invalid value [gtin]",
    searchVariants: ["invalid value gtin shopify", "invalid gtin google merchant center shopify", "shopify barcode invalid google merchant center", "gtin invalid shopify feed"],
    directAnswer:
      "This usually means the submitted barcode is not a valid GTIN, has the wrong format, is duplicated, or is actually an internal SKU rather than a manufacturer barcode.",
    shopifyFields: ["Variant Barcode", "Variant SKU", "Google Shopping / MPN", "Vendor or brand"],
    safeSteps: [
      "Open the affected variant and inspect Variant Barcode.",
      "Confirm the value is a real UPC, EAN, JAN, or ISBN.",
      "Remove internal SKUs from barcode fields when they are not GTINs.",
      "Review duplicated GTINs across variants.",
      "Resubmit only after the source value is corrected."
    ],
    avoid: ["Do not pad numbers to create a fake GTIN length.", "Do not reuse another product's barcode.", "Do not guess check digits."],
    fixPackFit: "Use Fix Pack when you need to find invalid-looking, duplicated, or SKU-like barcode values across a Shopify CSV.",
    relatedGuide: "/fix/google-merchant-center-errors/invalid-value-gtin",
    relatedGuideLabel: "Detailed Invalid value [gtin] guide"
  },
  {
    slug: "missing-value-brand-shopify",
    label: "Missing value [brand] Shopify",
    title: "Missing value [brand] Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Missing value [brand] for Shopify products by checking Vendor, real brand names, custom product status, and identifier fields.",
    h1: "Missing value [brand] in Google Merchant Center for Shopify",
    exactWarning: "Missing value [brand]",
    searchVariants: ["missing value brand shopify", "missing brand google merchant center shopify", "shopify vendor missing brand", "brand required merchant center shopify"],
    directAnswer:
      "This usually means Google did not receive a clear brand value. In Shopify, Vendor is often used as a brand-like field, but it must still reflect the real product brand when the product is branded.",
    shopifyFields: ["Vendor", "Product title", "Google Shopping / MPN", "Variant Barcode", "Custom product field"],
    safeSteps: [
      "Check the brand shown on the product, packaging, or manufacturer listing.",
      "Review blank, generic, or inconsistent Vendor values.",
      "Use the real product brand when the product is branded.",
      "Separate custom or handmade products from normal branded products.",
      "Keep uncertain rows in manual review."
    ],
    avoid: ["Do not invent a brand from the store name.", "Do not use a product category as a brand.", "Do not use generic values like Unknown without checking the case."],
    fixPackFit: "Use Fix Pack when brand gaps affect many rows and you need to separate blanks, generic vendors, and rows requiring merchant verification.",
    relatedGuide: "/fix/google-merchant-center-errors/missing-value-brand",
    relatedGuideLabel: "Detailed Missing value [brand] guide"
  },
  {
    slug: "missing-value-mpn-shopify",
    label: "Missing value [mpn] Shopify",
    title: "Missing value [mpn] Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Missing value [mpn] for Shopify products by checking manufacturer part numbers, SKU misuse, brand, and missing identifiers.",
    h1: "Missing value [mpn] in Google Merchant Center for Shopify",
    exactWarning: "Missing value [mpn]",
    searchVariants: ["missing value mpn shopify", "missing mpn google merchant center shopify", "shopify mpn missing", "manufacturer part number shopify merchant center"],
    directAnswer:
      "This usually means Google expected a manufacturer part number for products with incomplete identifier data. The MPN must come from the manufacturer, not from an internal SKU unless the SKU truly is the manufacturer part number.",
    shopifyFields: ["Google Shopping / MPN", "Variant SKU", "Vendor or brand", "Variant Barcode"],
    safeSteps: [
      "Check whether the manufacturer provides a real part number.",
      "Compare SKU and MPN values before copying anything.",
      "Add MPN only when the value is a manufacturer value.",
      "Check whether the product also needs a brand value.",
      "Flag uncertain products for manual review."
    ],
    avoid: ["Do not copy SKU into MPN by default.", "Do not invent a manufacturer part number.", "Do not use supplier references unless they are the real MPN."],
    fixPackFit: "Use Fix Pack when you need to detect missing MPN, SKU-as-MPN patterns, and products where brand or GTIN should be reviewed together.",
    relatedGuide: "/fix/google-merchant-center-errors/missing-value-mpn",
    relatedGuideLabel: "Detailed Missing value [mpn] guide"
  },
  {
    slug: "identifier-exists-conflict-shopify",
    label: "identifier_exists conflict Shopify",
    title: "identifier_exists Conflict Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix identifier_exists conflicts for Shopify feeds by checking GTIN, MPN, brand, custom product status, and risky bulk values.",
    h1: "identifier_exists conflict in Google Merchant Center for Shopify",
    exactWarning: "identifier_exists conflict",
    searchVariants: ["identifier_exists shopify", "identifier_exists conflict shopify", "identifier_exists false shopify", "product identifiers not provided shopify"],
    directAnswer:
      "identifier_exists tells Google whether a product has manufacturer identifiers. A conflict appears when the feed says identifiers exist but values are missing, or when identifiers are hidden for products that likely have GTIN, MPN, or brand.",
    shopifyFields: ["identifier_exists", "Variant Barcode", "Google Shopping / MPN", "Vendor or brand", "Product type"],
    safeSteps: [
      "Confirm whether the product is custom, handmade, vintage, personalized, or made to order.",
      "Check whether GTIN, MPN, or brand exists before changing identifier_exists.",
      "Separate custom products from normal branded products.",
      "Avoid catalog-wide identifier_exists changes without row review.",
      "Document the reason for manual review rows."
    ],
    avoid: ["Do not set identifier_exists false just to silence errors.", "Do not hide real product identifiers.", "Do not apply one value to a mixed catalog."],
    fixPackFit: "Use Fix Pack when a CSV has mixed custom and branded products and you need to identify rows where identifier_exists looks unsafe or inconsistent.",
    relatedGuide: "/fix/google-merchant-center-errors/identifier-exists-false-misuse",
    relatedGuideLabel: "Detailed identifier_exists guide"
  },
  {
    slug: "mismatched-value-price-shopify",
    label: "Mismatched value [price] Shopify",
    title: "Mismatched value [price] Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Mismatched value [price] for Shopify by checking variant price, sale price, compare-at price, currency, market settings, and feed refresh timing.",
    h1: "Mismatched value [price] in Google Merchant Center for Shopify",
    exactWarning: "Mismatched value [price]",
    searchVariants: ["mismatched value price shopify", "price mismatch google merchant center shopify", "shopify price does not match google", "merchant center price mismatch shopify"],
    directAnswer:
      "This usually means Google sees a different price in the feed than on the product landing page. Shopify variants, sale prices, market currencies, cached feeds, and timing delays can create the mismatch.",
    shopifyFields: ["Variant Price", "Variant Compare At Price", "Sale price", "Market price settings", "Product landing page price"],
    safeSteps: [
      "Compare the affected feed value with the visible product page price.",
      "Check variant-level pricing, not only the main product price.",
      "Review sale price and compare-at behavior.",
      "Check currency and market settings.",
      "Resync only after Shopify and the landing page agree."
    ],
    avoid: ["Do not change feed price while storefront price remains different.", "Do not ignore variant-specific prices.", "Do not mix currencies in the same feed."],
    fixPackFit: "Use Fix Pack when many rows may contain price mismatch symptoms and you need a prioritized review list before resubmission.",
    relatedGuide: "/fix/google-merchant-center-errors/mismatched-value-price",
    relatedGuideLabel: "Detailed Mismatched value [price] guide"
  },
  {
    slug: "mismatched-availability-shopify",
    label: "Mismatched availability Shopify",
    title: "Mismatched Availability Shopify: Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Shopify availability mismatch in Google Merchant Center by checking variant inventory, published status, stock policy, landing page availability, and feed timing.",
    h1: "Mismatched value [availability] in Google Merchant Center for Shopify",
    exactWarning: "Mismatched value [availability]",
    searchVariants: ["mismatched availability shopify", "mismatched value availability shopify", "availability mismatch google merchant center shopify", "shopify out of stock merchant center mismatch"],
    directAnswer:
      "This usually means the product availability in the feed does not match the landing page. Shopify inventory policy, variant stock, unpublished products, and delayed feed updates can all create this warning.",
    shopifyFields: ["Variant Inventory Qty", "Variant Inventory Policy", "Published status", "Variant availability", "Landing page stock status"],
    safeSteps: [
      "Check the affected variant inventory in Shopify.",
      "Confirm whether the product can be purchased on the landing page.",
      "Review continue-selling settings and stock policy.",
      "Check whether the feed has refreshed after inventory changes.",
      "Resubmit only when feed and landing page match."
    ],
    avoid: ["Do not mark unavailable products as in stock.", "Do not ignore variant-level availability.", "Do not resubmit before landing page and feed agree."],
    fixPackFit: "Use Fix Pack when availability warnings affect many rows and you need to separate inventory, published-status, and feed-refresh issues.",
    relatedGuide: "/fix/google-merchant-center-errors/mismatched-value-availability",
    relatedGuideLabel: "Detailed Mismatched value [availability] guide"
  },
  {
    slug: "google-merchant-center-image-issue-shopify",
    label: "Google Merchant Center image issue Shopify",
    title: "Google Merchant Center Image Issue Shopify Fix | MerchantFix.ai",
    description:
      "Fix Shopify image issues in Google Merchant Center by checking Image Src, variant images, product media, image size, crawl errors, and promotional overlays.",
    h1: "Google Merchant Center image issue for Shopify products",
    exactWarning: "Google Merchant Center image issue",
    searchVariants: ["google merchant center image issue shopify", "missing image link shopify merchant center", "image too small google merchant center shopify", "image not retrieved shopify google merchant center"],
    directAnswer:
      "Image issues usually mean the feed image is missing, too small, blocked, not retrievable, mapped to the wrong variant, or contains promotional elements that should not be in the main shopping image.",
    shopifyFields: ["Image Src", "Variant Image", "Product media", "Image dimensions", "Feed image URL"],
    safeSteps: [
      "Open the submitted image URL directly.",
      "Check product media and variant image mapping in Shopify.",
      "Replace thumbnails or missing images with real product images.",
      "Remove promotional overlays from main shopping images.",
      "Re-export or resync after correcting the source image."
    ],
    avoid: ["Do not use broken URLs.", "Do not use placeholder images for real products.", "Do not submit sale badge images as main product images."],
    fixPackFit: "Use Fix Pack when a CSV has missing Image Src values, weak image mapping, or product rows that need image review before resubmission.",
    relatedGuide: "/fix/google-merchant-center-errors/missing-image-link",
    relatedGuideLabel: "Detailed image_link guide"
  },
  {
    slug: "google-merchant-center-limited-performance-shopify",
    label: "Limited performance Shopify",
    title: "Google Merchant Center Limited Performance Shopify Fix | MerchantFix.ai",
    description:
      "Understand limited performance warnings for Shopify products caused by missing identifiers, weak product data, or incomplete feed attributes.",
    h1: "Google Merchant Center limited performance warning for Shopify",
    exactWarning: "Limited performance",
    searchVariants: ["google merchant center limited performance shopify", "limited performance missing identifiers shopify", "products have limited performance shopify", "limited performance due to missing product identifiers"],
    directAnswer:
      "Limited performance often means products are still eligible but have weak or missing data that can reduce matching quality. Missing GTIN, MPN, brand, or identifier_exists issues are common causes.",
    shopifyFields: ["Variant Barcode", "Google Shopping / MPN", "Vendor or brand", "identifier_exists", "Product title"],
    safeSteps: [
      "Separate limited performance warnings by cause.",
      "Check identifier completeness for normal branded products.",
      "Add verified GTIN, MPN, or brand when available.",
      "Review custom products separately.",
      "Use a row-level diagnostic before bulk editing large catalogs."
    ],
    avoid: ["Do not invent identifiers to improve performance.", "Do not bulk-set identifier_exists false.", "Do not assume every limited performance warning has the same fix."],
    fixPackFit: "Use Fix Pack when limited performance warnings cover many products and you need to identify which rows are missing useful product data.",
    relatedGuide: "/fix/google-merchant-center-errors/limited-performance-missing-identifiers",
    relatedGuideLabel: "Detailed limited performance guide"
  },
  {
    slug: "google-merchant-center-misrepresentation-shopify",
    label: "Misrepresentation Shopify",
    title: "Google Merchant Center Misrepresentation Shopify Checklist | MerchantFix.ai",
    description:
      "Use a Shopify-focused checklist for Google Merchant Center misrepresentation issues. MerchantFix does not promise automatic approval or account recovery.",
    h1: "Google Merchant Center misrepresentation checklist for Shopify",
    exactWarning: "Misrepresentation",
    searchVariants: ["google merchant center misrepresentation shopify", "misrepresentation merchant center shopify", "shopify google merchant center account suspended misrepresentation", "misrepresentation policy checklist"],
    directAnswer:
      "Misrepresentation is usually broader than one CSV row. It can involve website trust, contact details, shipping, returns, pricing clarity, product claims, business identity, and consistency between store and feed.",
    shopifyFields: ["Contact page", "Shipping policy", "Refund policy", "Product claims", "Price and availability", "Business identity"],
    safeSteps: [
      "Review contact, shipping, returns, privacy, and terms pages.",
      "Check prices and availability against the live store.",
      "Remove unsupported product claims.",
      "Make business identity and support details visible.",
      "Treat this as manual trust review, not a CSV-only fix."
    ],
    avoid: ["Do not present misrepresentation as an automatic CSV repair.", "Do not promise account reinstatement.", "Do not ignore website trust and policy pages."],
    fixPackFit: "Use Fix Pack only for the product-data part of a misrepresentation review. Broader account and website trust checks remain manual.",
    relatedGuide: "/fix/google-merchant-center-errors/misrepresentation-checklist",
    relatedGuideLabel: "Detailed misrepresentation checklist"
  },
  {
    slug: "shopify-csv-google-merchant-center-errors",
    label: "Shopify CSV Google Merchant Center errors",
    title: "Shopify CSV Google Merchant Center Errors: Row-Level Fix Guide | MerchantFix.ai",
    description:
      "Use a Shopify CSV to diagnose Google Merchant Center errors row by row: GTIN, MPN, brand, identifier_exists, price, availability, image, and product data warnings.",
    h1: "Shopify CSV Google Merchant Center errors: how to diagnose affected rows",
    exactWarning: "Shopify CSV Google Merchant Center errors",
    searchVariants: ["shopify csv google merchant center errors", "google merchant center errors shopify csv", "shopify product csv merchant center", "fix google merchant center errors from shopify csv"],
    directAnswer:
      "When Merchant Center flags many products, a Shopify CSV can reveal affected rows, missing fields, inconsistent identifiers, image gaps, price or availability warnings, and rows that need manual review before resubmission.",
    shopifyFields: ["Handle", "Title", "Vendor", "Variant SKU", "Variant Barcode", "Variant Price", "Image Src", "Google Shopping fields"],
    safeSteps: [
      "Export products from Shopify.",
      "Keep the original CSV unchanged as a backup.",
      "Identify affected rows by warning family.",
      "Separate deterministic notes from manual review rows.",
      "Edit product data only when the source facts are verified."
    ],
    avoid: ["Do not upload a bulk-edited CSV without review.", "Do not invent missing product facts.", "Do not assume one error message means one universal fix."],
    fixPackFit: "This is the core Fix Pack use case: row-level CSV diagnosis before merchants edit Shopify or resubmit products to Google.",
    relatedGuide: "/sample-report",
    relatedGuideLabel: "See a sample Fix Pack report"
  }
] as const satisfies readonly ExactShopifyErrorPage[];

export const exactShopifyErrorGuides = exactShopifyErrorPages.map((page) => ({
  path: `/fix/${page.slug}`,
  label: page.label,
  description: page.description
})) as readonly { path: string; label: string; description: string }[];

export function getExactShopifyErrorPage(slug: string) {
  return exactShopifyErrorPages.find((page) => page.slug === slug);
}
