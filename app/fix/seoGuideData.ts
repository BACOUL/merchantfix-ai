import type { RelatedGuide, SeoGuidePageProps } from "@/components/SeoGuidePage";

const guide = (href: string, label: string, description: string): RelatedGuide => ({ href, label, description });

const gtin = guide(
  "/fix/missing-gtin-google-merchant-center",
  "Missing GTIN guide",
  "Check Shopify barcode data and rows that need GTIN review."
);
const mpn = guide(
  "/fix/google-merchant-center-missing-mpn",
  "Missing MPN guide",
  "Review manufacturer part number gaps in Shopify product exports."
);
const brand = guide(
  "/fix/google-merchant-center-missing-brand",
  "Missing brand guide",
  "Review missing or weak brand fields before feed submission."
);
const identifierExists = guide(
  "/fix/google-merchant-center-identifier-exists",
  "identifier_exists guide",
  "Flag risky true or false identifier_exists values for review."
);
const feedErrors = guide(
  "/fix/shopify-product-feed-errors",
  "Shopify product feed errors",
  "See broader product data issues that can affect Google Shopping."
);
const productData = guide(
  "/fix/shopify-google-shopping-product-data",
  "Shopify Google Shopping product data",
  "Prepare titles, descriptions, images, prices, brands, and identifiers."
);
const identifiers = guide(
  "/fix/shopify-missing-product-identifiers",
  "Shopify missing product identifiers",
  "Compare GTIN, MPN, brand, and identifier_exists issues."
);

export const missingMpnGuide: SeoGuidePageProps = {
  badge: "MPN feed issue",
  title: "Google Merchant Center missing MPN: how Shopify merchants should check it",
  intro:
    "Missing MPN warnings usually mean Google needs a real manufacturer part number or a clear explanation of why product identifiers are unavailable. For Shopify merchants, the safest starting point is the CSV export, not a guessed value.",
  highlights: ["Products without GTIN", "Manufacturer part numbers", "Shopify CSV fields", "Manual verification"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "MPN issues often appear when a product has no GTIN, a blank identifier field, or a value that looks like an internal SKU rather than a manufacturer part number.",
      items: ["The product may not have a barcode but may still have an MPN.", "The Shopify export may not include a clean MPN field.", "A merchant SKU may have been copied into the wrong feed field."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Weak or missing MPN data can make product matching harder and keep Merchant Center diagnostics open until identifiers are reviewed.",
      items: ["Rows without GTIN often need stronger MPN and brand review.", "Incorrect MPN values can be worse than blank values."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Start with the Shopify product and variant records, then compare them with the exported CSV fields.",
      items: ["Check whether the manufacturer provides an official part number.", "Confirm the value is not only your internal SKU.", "Review variant-specific part numbers."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can inspect Shopify CSV rows for missing MPN patterns and rows that need manual review.",
      items: ["Rows with missing MPN-like fields.", "Rows where GTIN is missing and MPN review matters.", "identifier_exists conflicts related to available identifier data."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not invent MPNs. Manufacturer part numbers must come from product packaging, manufacturer data, or another verified source.",
      items: ["It will not copy SKU into MPN unless the merchant verifies it is truly the manufacturer part number.", "It will not guarantee Merchant Center approval."]
    }
  },
  relatedGuides: [gtin, brand, identifierExists, identifiers, feedErrors]
};

export const missingBrandGuide: SeoGuidePageProps = {
  badge: "Brand feed issue",
  title: "Google Merchant Center missing brand: check Shopify product data before resubmitting",
  intro:
    "Missing brand warnings often come from blank, inconsistent, or weak Shopify vendor and brand data. The goal is not to guess a brand, but to verify the real product brand and keep feed rows consistent.",
  highlights: ["Shopify vendor vs brand", "Brand consistency", "CSV diagnosis", "Manual verification"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Shopify stores often use Vendor for supplier, distributor, house label, or operational grouping. Google Shopping product data usually needs the real product brand.",
      items: ["Vendor may not match the consumer-facing brand.", "Imported catalogs can mix spelling and capitalization.", "Some variants may have blank brand-like fields."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Weak brand data can make product matching and diagnostics harder, especially when GTIN or MPN is also missing.",
      items: ["Products can be flagged for insufficient identity data.", "Inconsistent brand names create feed noise.", "Rows with no brand and no identifiers need review."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review the Shopify product, vendor value, and exported CSV fields before editing the feed.",
      items: ["Confirm the real product brand from packaging or manufacturer data.", "Check whether Vendor is being used as supplier.", "Normalize spelling only when the real brand is clear."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing or weak brand fields and show rows that need merchant review before feed edits.",
      items: ["Blank brand or vendor values.", "Weak brand rows alongside missing GTIN or MPN.", "Rows that need manual brand verification."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai can flag missing or weak brand fields, but users must verify the real product brand.",
      items: ["It will not invent brand names.", "It will not assume Vendor is always the product brand.", "It will not guarantee Google Shopping visibility or sales."]
    }
  },
  relatedGuides: [gtin, mpn, identifierExists, identifiers, productData]
};

export const identifierExistsGuide: SeoGuidePageProps = {
  badge: "identifier_exists issue",
  title: "identifier_exists in Google Merchant Center: Shopify rows that need review",
  intro:
    "The identifier_exists value tells Google whether a product has recognized manufacturer identifiers. Incorrect true or false values can create new Merchant Center problems instead of fixing old ones.",
  highlights: ["When true or false applies", "Common feed mistakes", "Risky bulk edits", "Rows that need review"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "identifier_exists problems appear when feed rows contain missing identifiers, mixed identifier values, or false values used as a shortcut.",
      items: ["A product may have GTIN, MPN, or brand even when the feed says identifiers do not exist.", "Bulk feed edits can set identifier_exists incorrectly.", "Custom or handmade products need careful review."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Incorrect identifier_exists values can make Merchant Center diagnostics harder because the feed sends conflicting product identity signals.",
      items: ["A false value can conflict with existing identifier data.", "A true value can leave rows exposed when identifiers are blank.", "Incorrect values can delay clean resubmission."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review the product type, brand, barcode, MPN source, and whether the item truly has manufacturer identifiers.",
      items: ["Check Variant Barcode for real GTIN values.", "Check whether an official MPN exists.", "Confirm the real brand.", "Review custom, handmade, bundle, and private label products carefully."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag risky or inconsistent identifier_exists rows in Shopify CSV data.",
      items: ["Rows where identifier_exists conflicts with GTIN, MPN, or brand.", "Rows where false values should be manually verified.", "Notes explaining why the row is uncertain."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not decide legal product identity. It flags risky or inconsistent rows for review.",
      items: ["It will not mark products as having no identifiers without merchant verification.", "It will not invent missing GTIN, MPN, brand, price, or product identifier data."]
    }
  },
  relatedGuides: [gtin, mpn, brand, identifiers, feedErrors]
};

export const productFeedErrorsGuide: SeoGuidePageProps = {
  badge: "Shopify feed errors",
  title: "Shopify product feed errors: product data checks before Google Merchant Center resubmission",
  intro:
    "Shopify product feed errors can come from visible storefront issues and row-level CSV data gaps. MerchantFix.ai separates fast public surface checks from deeper CSV diagnosis.",
  highlights: ["Missing identifiers", "Missing image or price", "Weak titles and descriptions", "Public scan vs CSV diagnosis"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Feed problems often come from incomplete catalog data, supplier imports, old templates, or bulk edits made without identifier review.",
      items: ["Images can be missing or unavailable.", "Prices can be blank or not exposed in public data.", "GTIN, MPN, brand, and identifier_exists values can be blank or inconsistent."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Poor product data can affect diagnostics, matching, and shopper trust. Some issues are visible publicly, while identifier issues usually require CSV review.",
      items: ["Surface issues make products look incomplete.", "Identifier gaps can keep Merchant Center warnings open.", "Incorrect values can create new feed quality problems."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Start with visible product data, then inspect the Shopify CSV export for row-level feed fields.",
      items: ["Check image, price, title, and description quality.", "Review Variant Barcode for GTIN.", "Review MPN, brand, and identifier_exists values."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body:
        "MerchantFix.ai can run a public URL surface scan and a Shopify CSV diagnosis without private Shopify or Google API connections.",
      items: ["Missing image, missing price, weak title, and weak description risks.", "Missing GTIN, MPN, brand, and identifier_exists issues.", "Safe CSV corrections when available and manual review notes when uncertain."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai stays focused on product data diagnosis. It does not replace Merchant Center review or make unsupported promises.",
      items: ["It will not connect to private Shopify admin or Google Merchant Center APIs.", "It will not invent identifiers, brands, prices, or product data.", "It will not guarantee approval, traffic, ranking, performance, or sales."]
    }
  },
  relatedGuides: [gtin, mpn, brand, identifierExists, productData, identifiers]
};

export const googleShoppingProductDataGuide: SeoGuidePageProps = {
  badge: "Product data quality",
  title: "Shopify Google Shopping product data: prepare cleaner fields before diagnostics",
  intro:
    "Better Shopify product data starts with practical checks: title, description, brand, identifiers, images, and price. MerchantFix.ai helps merchants find surface risks and CSV rows that need review.",
  highlights: ["Commercial product data checklist", "Public scan for visible issues", "CSV upload for identifiers", "Clear next actions"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Shopify catalogs grow through imports, theme changes, supplier feeds, and manual edits. Storefront fields may not be enough for clean Google Shopping data.",
      items: ["Titles can be too vague.", "Descriptions can be thin or placeholder text.", "Images, prices, brand, and identifiers can be missing or inconsistent."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Cleaner product data can make diagnosis easier and reduce avoidable feed quality problems, but it does not guarantee approval or performance.",
      items: ["Clear fields make review easier.", "Identifier issues can require CSV-level checks.", "Weak visible data can reduce shopper trust."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review public-facing content first, then check exported fields for identifiers and feed-specific values.",
      items: ["Product title and description quality.", "Image and price visibility.", "Brand, GTIN, MPN, and identifier_exists from trusted sources."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai gives Shopify merchants a focused diagnostic path before deeper Merchant Center work.",
      items: ["Public surface risks from accessible Shopify product data.", "CSV diagnosis for GTIN, MPN, brand, and identifier_exists.", "A surface risk score and manual review notes."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai is not a Google approval engine and does not make up product data.",
      items: ["It will not invent GTINs, MPNs, brands, prices, or identifiers.", "It will not guarantee visibility, traffic, ranking, performance, or sales.", "It will not imply an official Google partnership."]
    }
  },
  relatedGuides: [feedErrors, identifiers, gtin, mpn, brand]
};

export const missingIdentifiersGuide: SeoGuidePageProps = {
  badge: "Product identifiers",
  title: "Shopify missing product identifiers: GTIN, MPN, brand, and identifier_exists explained",
  intro:
    "Missing product identifiers are not all the same. Shopify merchants need to understand the difference between GTIN, MPN, brand, and identifier_exists before changing a feed.",
  highlights: ["GTIN vs MPN vs brand", "identifier_exists review", "Safe fixes", "Manual review"],
  sections: {
    why: {
      title: "Why this happens",
      body: "Identifier issues appear when product data does not clearly explain what the product is or whether official manufacturer identifiers exist.",
      items: ["GTIN is usually a barcode-style value such as UPC, EAN, JAN, or ISBN.", "MPN is a manufacturer part number and should not be guessed.", "Brand should identify the real product brand.", "identifier_exists should reflect whether official identifiers truly exist."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body: "Missing or inconsistent identifiers can keep Merchant Center diagnostics open and make product matching harder.",
      items: ["Rows with missing GTIN may still need MPN and brand review.", "False identifier_exists values can conflict with real identifiers.", "Missing brand can make other identifier gaps harder to resolve."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Check the product record, variant barcode, CSV export, and verified manufacturer data before editing identifiers.",
      items: ["Variant Barcode for GTIN.", "Manufacturer or supplier documentation for MPN.", "Packaging or catalog data for brand.", "Custom or made-to-order status before setting identifier_exists."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can diagnose identifier gaps in Shopify CSV rows and separate safe fixes from review-only issues.",
      items: ["Missing GTIN, MPN, or brand rows.", "identifier_exists conflicts.", "Rows that need manual review before correction."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai will not invent product identity data. It flags uncertainty instead of pretending every row can be fixed automatically.",
      items: ["It will not invent GTINs, MPNs, brands, prices, or product identifiers.", "It will not decide legal product identity.", "It will not guarantee Google approval or sales."]
    }
  },
  relatedGuides: [gtin, mpn, brand, identifierExists, feedErrors]
};
