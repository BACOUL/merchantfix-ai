export type GmcErrorSeoPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  copiedErrorPhrases: string[];
  whatItUsuallyMeans: string;
  shopifyFieldsToCheck: string[];
  safeFixChecklist: string[];
  avoid: string[];
  relatedGuides: { href: string; label: string }[];
};

export const gmcErrorSeoPages = [
  {
    slug: "missing-value-gtin",
    label: "Missing value [gtin]",
    title: "Missing value [gtin] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix the Google Merchant Center error Missing value [gtin] for Shopify products. Check Variant Barcode, MPN, brand, identifier_exists, and affected CSV rows.",
    h1: "Missing value [gtin]: how to fix this Google Merchant Center error for Shopify",
    copiedErrorPhrases: [
      "Missing value [gtin]",
      "Limited performance due to missing value [gtin]",
      "Products need a GTIN value",
      "Missing product identifiers: GTIN"
    ],
    whatItUsuallyMeans:
      "Google expected a real global trade item number for one or more products. In Shopify exports, this is often connected to the Variant Barcode column, but the right fix depends on whether the product truly has a manufacturer identifier.",
    shopifyFieldsToCheck: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Product title", "identifier_exists if present"],
    safeFixChecklist: [
      "Open the affected Shopify product and variant.",
      "Check whether the product packaging or manufacturer data provides a real UPC, EAN, JAN, or ISBN.",
      "Put the verified value in Variant Barcode only when it is real.",
      "If no GTIN exists, check whether MPN and brand are available.",
      "Only review identifier_exists after confirming the product has no manufacturer identifiers."
    ],
    avoid: ["Do not invent GTIN values.", "Do not copy SKU into GTIN.", "Do not set identifier_exists to no without checking the product."],
    relatedGuides: [
      { href: "/fix/missing-gtin-google-merchant-center", label: "Missing GTIN guide" },
      { href: "/fix/google-merchant-center-identifier-exists", label: "identifier_exists guide" },
      { href: "/fix/shopify-missing-product-identifiers", label: "Missing product identifiers" }
    ]
  },
  {
    slug: "invalid-value-gtin",
    label: "Invalid value [gtin]",
    title: "Invalid value [gtin] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Understand and fix Invalid value [gtin] errors for Shopify products without inventing product identifiers or risky feed data.",
    h1: "Invalid value [gtin]: how to fix this Google Merchant Center error for Shopify",
    copiedErrorPhrases: ["Invalid value [gtin]", "Invalid GTIN", "Barcode is invalid", "The value submitted for gtin is invalid"],
    whatItUsuallyMeans:
      "The submitted barcode-like value may have the wrong length, wrong format, duplicated data, or a value that is not a true manufacturer GTIN.",
    shopifyFieldsToCheck: ["Variant Barcode", "Variant SKU", "Google Shopping / MPN", "Vendor"],
    safeFixChecklist: [
      "Check whether the value in Variant Barcode is a real product barcode.",
      "Remove internal SKUs from the barcode field when they are not GTINs.",
      "Verify the code against product packaging or manufacturer documentation.",
      "Review duplicates across variants before resubmitting."
    ],
    avoid: ["Do not pad numbers to create a fake length.", "Do not reuse another product's barcode.", "Do not guess check digits."],
    relatedGuides: [
      { href: "/fix/missing-gtin-google-merchant-center", label: "Missing GTIN guide" },
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }
    ]
  },
  {
    slug: "missing-value-mpn",
    label: "Missing value [mpn]",
    title: "Missing value [mpn] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Missing value [mpn] warnings for Shopify products by checking manufacturer part numbers, SKU misuse, brand, and identifier fields.",
    h1: "Missing value [mpn]: how to fix this Google Merchant Center error for Shopify",
    copiedErrorPhrases: ["Missing value [mpn]", "Missing MPN", "Product requires an MPN", "Missing manufacturer part number"],
    whatItUsuallyMeans:
      "Google may expect a manufacturer part number when a product has no GTIN or when product identifiers are incomplete.",
    shopifyFieldsToCheck: ["Google Shopping / MPN", "Variant SKU", "Vendor", "Variant Barcode"],
    safeFixChecklist: [
      "Check whether the manufacturer provides a real part number.",
      "Use MPN only when the value is actually from the manufacturer.",
      "Check whether the product also needs brand data.",
      "Mark uncertain rows for manual review instead of copying SKU blindly."
    ],
    avoid: ["Do not copy SKU into MPN by default.", "Do not invent a manufacturer part number.", "Do not use a supplier reference unless it is the real MPN."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-missing-mpn", label: "Missing MPN guide" },
      { href: "/fix/google-merchant-center-missing-brand", label: "Missing brand guide" }
    ]
  },
  {
    slug: "missing-value-brand",
    label: "Missing value [brand]",
    title: "Missing value [brand] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Missing value [brand] errors for Shopify product feeds by checking vendor, brand, product title, and custom product status.",
    h1: "Missing value [brand]: how to fix this Google Merchant Center error for Shopify",
    copiedErrorPhrases: ["Missing value [brand]", "Missing brand", "Brand is required", "Product requires a brand value"],
    whatItUsuallyMeans:
      "The product feed does not provide a clear brand value. In Shopify, merchants often use Vendor as a brand-like field, but this must still reflect the real product brand.",
    shopifyFieldsToCheck: ["Vendor", "Product title", "Google Shopping / MPN", "Variant Barcode", "Custom product field"],
    safeFixChecklist: [
      "Check the real brand shown on the product, packaging, or manufacturer listing.",
      "Review Shopify Vendor values for missing or generic entries.",
      "Use the real brand when the product is branded.",
      "For custom or handmade products, review identifier settings carefully."
    ],
    avoid: ["Do not invent a brand from the store name.", "Do not use a category as a brand.", "Do not use generic words like Unknown unless your feed policy supports the case."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-missing-brand", label: "Missing brand guide" },
      { href: "/fix/shopify-missing-product-identifiers", label: "Missing product identifiers" }
    ]
  },
  {
    slug: "identifier-exists-false-misuse",
    label: "identifier_exists false misuse",
    title: "identifier_exists false in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Understand when identifier_exists should be false for Shopify products and avoid creating new Google Merchant Center product identifier issues.",
    h1: "identifier_exists false: when it is safe and when it creates Google Merchant Center issues",
    copiedErrorPhrases: ["identifier_exists false", "identifier_exists set to no", "Product identifiers not provided", "Missing product identifiers"],
    whatItUsuallyMeans:
      "identifier_exists tells Google whether a product has manufacturer identifiers. Setting it to false can be correct for true custom goods, but risky for normal branded products.",
    shopifyFieldsToCheck: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Product type", "Custom product field"],
    safeFixChecklist: [
      "Confirm whether the product is custom, handmade, vintage, personalized, or made to order.",
      "Check whether GTIN, MPN, or brand exists before setting identifier_exists false.",
      "Use manual review for uncertain rows.",
      "Keep notes explaining why identifier_exists is false."
    ],
    avoid: ["Do not set identifier_exists false just to silence errors.", "Do not hide real product identifiers.", "Do not apply the same value to the whole catalog without review."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-identifier-exists", label: "identifier_exists guide" },
      { href: "/fix/shopify-missing-product-identifiers", label: "Missing product identifiers" }
    ]
  },
  {
    slug: "product-identifiers-not-provided",
    label: "Product identifiers not provided",
    title: "Product identifiers not provided: Shopify Google Merchant Center Fix | MerchantFix.ai",
    description:
      "Fix Product identifiers not provided issues for Shopify feeds by reviewing GTIN, MPN, brand, and identifier_exists safely.",
    h1: "Product identifiers not provided: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Product identifiers not provided", "Missing product identifiers", "Add GTIN, MPN, or brand", "Limited performance due to missing product identifiers"],
    whatItUsuallyMeans:
      "Google may not have enough reliable product identifier data to match the product correctly. The issue can involve GTIN, MPN, brand, or identifier_exists.",
    shopifyFieldsToCheck: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "identifier_exists", "Custom product field"],
    safeFixChecklist: [
      "Identify which rows are missing all key identifier fields.",
      "Separate branded products from true custom products.",
      "Add verified GTIN, MPN, or brand when available.",
      "Use manual review for uncertain rows before resubmission."
    ],
    avoid: ["Do not invent identifiers.", "Do not bulk-set identifier_exists false.", "Do not assume every product requires the same fix."],
    relatedGuides: [
      { href: "/fix/shopify-missing-product-identifiers", label: "Shopify missing product identifiers" },
      { href: "/fix/missing-gtin-google-merchant-center", label: "Missing GTIN guide" },
      { href: "/fix/google-merchant-center-missing-mpn", label: "Missing MPN guide" }
    ]
  },
  {
    slug: "missing-image-link",
    label: "Missing value [image_link]",
    title: "Missing value [image_link] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Missing value [image_link] issues for Shopify products by checking product images, variant images, and feed export fields.",
    h1: "Missing value [image_link]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Missing value [image_link]", "Missing image", "Image link is missing", "Product image missing"],
    whatItUsuallyMeans: "The feed does not provide a usable product image URL for one or more products or variants.",
    shopifyFieldsToCheck: ["Image Src", "Variant Image", "Product media", "Published status"],
    safeFixChecklist: [
      "Check whether the product has a main image in Shopify.",
      "Check whether variants need their own image.",
      "Confirm the image URL is accessible publicly.",
      "Re-export or resync the feed after fixing images."
    ],
    avoid: ["Do not use broken URLs.", "Do not use placeholder images for real products.", "Do not ignore variant-level image gaps."],
    relatedGuides: [{ href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }]
  },
  {
    slug: "missing-price",
    label: "Missing value [price]",
    title: "Missing value [price] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Missing value [price] errors in Shopify product feeds by checking variant price, sale price, and export values.",
    h1: "Missing value [price]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Missing value [price]", "Missing price", "Price is required", "Product price missing"],
    whatItUsuallyMeans: "A product or variant is missing a valid price in the feed or the exported price field is blank.",
    shopifyFieldsToCheck: ["Variant Price", "Variant Compare At Price", "Published status", "Market/currency settings"],
    safeFixChecklist: [
      "Check that every active variant has a valid price.",
      "Review products with blank price fields in the CSV.",
      "Confirm currency and market configuration if relevant.",
      "Resync or re-export after correcting prices."
    ],
    avoid: ["Do not add placeholder prices.", "Do not mismatch store price and feed price.", "Do not ignore variants with blank prices."],
    relatedGuides: [{ href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }]
  }
] as const satisfies readonly GmcErrorSeoPage[];

export function getGmcErrorSeoPage(slug: string) {
  return gmcErrorSeoPages.find((page) => page.slug === slug);
}
