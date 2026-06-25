export type AuthoritySeoGuide = {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  exactWarnings: string[];
  answer: string;
  whyItHappens: string[];
  shopifyFields: { field: string; why: string }[];
  diagnosticWorkflow: string[];
  csvColumns: string[];
  badFixes: string[];
  merchantfixUseCase: string;
  decisionTable: { situation: string; nextStep: string }[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const authoritySeoGuides = [
  {
    slug: "missing-value-gtin-shopify-reference",
    label: "Missing value [gtin] reference",
    title: "Missing value [gtin] Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Missing value [gtin] in Google Merchant Center: Variant Barcode, identifiers, identifier_exists, CSV diagnosis, and safe fixes.",
    h1: "Missing value [gtin] for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for Shopify merchants who need to understand why Google expects GTIN data, which fields matter, and how to avoid dangerous fake barcode fixes.",
    exactWarnings: ["Missing value [gtin]", "Limited performance due to missing value [gtin]", "Products need a GTIN value", "Missing product identifiers: GTIN"],
    answer:
      "For Shopify products, Missing value [gtin] usually means Google expected a real manufacturer barcode for one or more variants. The primary Shopify field to check is Variant Barcode, but the correct fix depends on whether the product truly has a UPC, EAN, JAN, or ISBN. If no GTIN exists, review MPN, brand, and identifier_exists instead of inventing a barcode.",
    whyItHappens: [
      "The product is a normal branded item and Shopify Variant Barcode is empty.",
      "The barcode exists on packaging or supplier data but was never entered into Shopify.",
      "The feed tells Google that identifiers exist, but GTIN, MPN, or brand values are incomplete.",
      "A mixed catalog contains both branded products and custom products, but the same identifier logic was applied everywhere.",
      "The store uses SKUs internally but has not separated SKUs from real manufacturer barcodes."
    ],
    shopifyFields: [
      { field: "Variant Barcode", why: "This is the usual Shopify source for GTIN-like values such as UPC, EAN, JAN, or ISBN." },
      { field: "Vendor / brand", why: "If no GTIN exists, brand data may still be required for product identification." },
      { field: "Google Shopping / MPN", why: "MPN can help identify products when a verified manufacturer part number exists." },
      { field: "Variant SKU", why: "Useful for internal tracking, but usually not a GTIN and should not be copied into barcode." },
      { field: "identifier_exists", why: "Only safe after confirming whether the product truly has manufacturer identifiers." }
    ],
    diagnosticWorkflow: [
      "Export the Shopify product CSV and keep the original file unchanged.",
      "Filter products with blank Variant Barcode values.",
      "Separate branded products from handmade, custom, vintage, or made-to-order products.",
      "Check supplier sheets, product packaging, or manufacturer data for verified GTINs.",
      "Mark uncertain products for manual review instead of applying a catalog-wide identifier_exists value.",
      "Resubmit only after product facts are verified and source data is corrected."
    ],
    csvColumns: ["Handle", "Title", "Vendor", "Variant SKU", "Variant Barcode", "Google Shopping / MPN", "Google Shopping / Custom Product", "Product Category"],
    badFixes: [
      "Inventing random GTIN values.",
      "Copying SKU into Variant Barcode.",
      "Padding numbers until they look like UPC or EAN values.",
      "Bulk-setting identifier_exists to false for the whole catalog.",
      "Reusing a barcode from another product."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when the warning affects many products and you need a row-level CSV diagnosis showing missing barcodes, likely identifier gaps, manual review rows, and unsafe shortcuts to avoid.",
    decisionTable: [
      { situation: "Product packaging has a real UPC/EAN/JAN/ISBN", nextStep: "Add the verified value to Variant Barcode." },
      { situation: "Product is branded but GTIN is unknown", nextStep: "Check supplier or manufacturer data before editing." },
      { situation: "Product is custom or handmade", nextStep: "Review identifier_exists and brand/MPN logic carefully." },
      { situation: "Only SKU is available", nextStep: "Do not treat SKU as GTIN unless it is the real manufacturer barcode." }
    ],
    faq: [
      { question: "Can I make up a GTIN to fix Missing value [gtin]?", answer: "No. A GTIN must be a real manufacturer barcode. Fake GTINs can create worse feed quality problems." },
      { question: "Is Shopify SKU the same as GTIN?", answer: "Usually no. SKU is often an internal store or supplier reference, while GTIN is a global manufacturer barcode." },
      { question: "Should identifier_exists be false if GTIN is missing?", answer: "Only when the product truly has no manufacturer identifiers. It should not be used as a shortcut to silence errors." }
    ],
    related: [
      { href: "/fix/missing-value-gtin-shopify", label: "Short Missing value [gtin] Shopify page" },
      { href: "/fix/google-merchant-center-errors/missing-value-gtin", label: "Exact Missing value [gtin] guide" },
      { href: "/sample-report", label: "Sample Fix Pack report" }
    ]
  },
  {
    slug: "invalid-value-gtin-shopify-reference",
    label: "Invalid value [gtin] reference",
    title: "Invalid value [gtin] Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Invalid value [gtin] in Google Merchant Center: barcode format, SKU misuse, duplicates, and safe CSV review.",
    h1: "Invalid value [gtin] for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants who submitted a barcode-like value that Google does not accept as a valid product identifier.",
    exactWarnings: ["Invalid value [gtin]", "Invalid GTIN", "The value submitted for gtin is invalid", "Barcode is invalid"],
    answer:
      "Invalid value [gtin] usually means the submitted value is not a valid manufacturer barcode, has the wrong length or format, duplicates another product, contains non-GTIN data, or was copied from an internal SKU field. In Shopify, the first place to inspect is Variant Barcode, then Variant SKU and MPN mapping.",
    whyItHappens: [
      "Variant Barcode contains an internal SKU rather than a real GTIN.",
      "Barcode values were padded, truncated, or formatted incorrectly.",
      "The same GTIN was reused across unrelated products or variants.",
      "A supplier reference was treated as a manufacturer barcode.",
      "CSV edits introduced spaces, symbols, or malformed values."
    ],
    shopifyFields: [
      { field: "Variant Barcode", why: "Primary source of GTIN values in Shopify CSV exports." },
      { field: "Variant SKU", why: "Often confused with GTIN but usually not accepted as a barcode." },
      { field: "Google Shopping / MPN", why: "Should hold manufacturer part numbers, not fake GTIN substitutes." },
      { field: "Vendor / brand", why: "Identifier checks often require brand context." },
      { field: "Handle", why: "Useful for detecting duplicates or families of affected products." }
    ],
    diagnosticWorkflow: [
      "Export the Shopify CSV and sort rows by Variant Barcode.",
      "Find values that are blank, duplicated, too short, too long, or SKU-like.",
      "Compare suspicious barcode values with product packaging or manufacturer data.",
      "Separate invalid barcode values from rows where the barcode is simply missing.",
      "Remove or correct only values that can be verified.",
      "Keep uncertain rows in manual review."
    ],
    csvColumns: ["Handle", "Title", "Variant SKU", "Variant Barcode", "Vendor", "Google Shopping / MPN"],
    badFixes: [
      "Guessing check digits.",
      "Adding leading zeros without evidence.",
      "Reusing another product's barcode.",
      "Moving every SKU into Variant Barcode.",
      "Bulk replacing all invalid-looking values without source verification."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when a catalog contains many barcode values and you need to identify SKU-like barcodes, duplicates, missing values, and rows that need verification before resubmission.",
    decisionTable: [
      { situation: "Barcode is verified on packaging", nextStep: "Keep or correct the value exactly from the verified source." },
      { situation: "Barcode looks like SKU", nextStep: "Do not submit it as GTIN unless manufacturer documentation confirms it." },
      { situation: "Barcode duplicated across unrelated products", nextStep: "Review each affected row manually." },
      { situation: "No verified GTIN exists", nextStep: "Review MPN, brand, and identifier_exists instead of inventing one." }
    ],
    faq: [
      { question: "Why does Google reject my Shopify barcode?", answer: "Because the submitted value may not be a valid GTIN, may be duplicated, or may not match a manufacturer barcode format." },
      { question: "Can I fix invalid GTIN by changing the number length?", answer: "No. A valid-looking length is not enough. The value must be real and verified." },
      { question: "Should I delete invalid barcode values?", answer: "Only after checking the source. Some values may be mistyped real GTINs; others may be SKUs that should not be in Variant Barcode." }
    ],
    related: [
      { href: "/fix/invalid-value-gtin-shopify", label: "Short Invalid value [gtin] Shopify page" },
      { href: "/fix/google-merchant-center-errors/invalid-value-gtin", label: "Exact Invalid value [gtin] guide" },
      { href: "/reference/missing-value-gtin-shopify-reference", label: "Missing GTIN reference" }
    ]
  },
  {
    slug: "missing-brand-shopify-reference",
    label: "Missing brand reference",
    title: "Missing value [brand] Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Missing value [brand] in Google Merchant Center: Vendor, real brand names, custom products, and safe CSV review.",
    h1: "Missing value [brand] for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants who need to decide whether Vendor, brand, custom product status, GTIN, or MPN should be corrected before resubmission.",
    exactWarnings: ["Missing value [brand]", "Missing brand", "Brand is required", "Product requires a brand value"],
    answer:
      "Missing value [brand] usually means Google did not receive a clear product brand. In Shopify, Vendor is often used as a brand-like field, but the right value depends on the real product brand, not the store name, category, or a generic placeholder.",
    whyItHappens: [
      "Vendor is blank or inconsistent across products.",
      "The store uses Vendor for suppliers rather than product brands.",
      "Custom or handmade products are mixed with normal branded products.",
      "The product has GTIN or MPN gaps that make brand more important.",
      "Bulk imports left brand-like fields empty."
    ],
    shopifyFields: [
      { field: "Vendor", why: "Common Shopify source for brand-like feed data." },
      { field: "Product title", why: "Can reveal whether a brand is already visible but not mapped." },
      { field: "Variant Barcode", why: "Identifier context can influence whether brand is expected." },
      { field: "Google Shopping / MPN", why: "MPN usually needs brand context to identify the product." },
      { field: "Custom product field", why: "Helps separate custom items from standard branded products." }
    ],
    diagnosticWorkflow: [
      "Export the Shopify CSV and group rows by Vendor.",
      "Find blank, generic, supplier-only, or inconsistent Vendor values.",
      "Check product pages, packaging, and manufacturer information for the real brand.",
      "Separate custom products from normal branded products.",
      "Do not apply the store name as brand unless it is truly the product brand.",
      "Keep uncertain rows in manual review."
    ],
    csvColumns: ["Handle", "Title", "Vendor", "Product Type", "Variant Barcode", "Google Shopping / MPN", "Tags"],
    badFixes: [
      "Using the store name as brand for all products.",
      "Using category names such as Shoes, Apparel, or Accessories as brand.",
      "Filling blanks with Unknown without checking the case.",
      "Treating supplier names as brands without verification.",
      "Applying one brand to a mixed catalog."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when a Shopify CSV has many blank or weak Vendor values and you need to separate likely brand gaps from rows that require human verification.",
    decisionTable: [
      { situation: "The product packaging shows a brand", nextStep: "Use the real product brand." },
      { situation: "Vendor is a supplier name", nextStep: "Verify whether supplier and product brand are the same." },
      { situation: "Product is handmade by the merchant", nextStep: "Review custom product and identifier settings." },
      { situation: "Catalog has many vendors", nextStep: "Audit rows before bulk editing." }
    ],
    faq: [
      { question: "Can I use my Shopify store name as brand?", answer: "Only if the store name is truly the product brand. It should not be used as a shortcut for third-party products." },
      { question: "Is Vendor always the brand in Shopify?", answer: "No. Many merchants use Vendor for suppliers. Google needs the actual product brand when one exists." },
      { question: "What if my product has no brand?", answer: "Then review custom product status and identifier logic carefully instead of inventing a brand." }
    ],
    related: [
      { href: "/fix/missing-value-brand-shopify", label: "Short Missing value [brand] Shopify page" },
      { href: "/fix/google-merchant-center-errors/missing-value-brand", label: "Exact Missing value [brand] guide" },
      { href: "/reference/missing-value-gtin-shopify-reference", label: "GTIN reference" }
    ]
  },
  {
    slug: "identifier-exists-shopify-reference",
    label: "identifier_exists reference",
    title: "identifier_exists Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for identifier_exists conflicts in Google Merchant Center: GTIN, MPN, brand, custom products, and risky bulk values.",
    h1: "identifier_exists for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for deciding when identifier_exists should be true, false, or manually reviewed before a Shopify feed is resubmitted.",
    exactWarnings: ["identifier_exists conflict", "identifier_exists false", "Product identifiers not provided", "Missing product identifiers"],
    answer:
      "identifier_exists tells Google whether a product has manufacturer identifiers such as GTIN, MPN, or brand. For Shopify, most mistakes happen when merchants set the same value across a mixed catalog without separating normal branded products from custom, handmade, vintage, or made-to-order products.",
    whyItHappens: [
      "Products with real identifiers are submitted with identifier_exists set to false.",
      "Products with no identifiers are submitted as if identifiers exist.",
      "The same identifier_exists value is applied to the whole catalog.",
      "Custom products are mixed with branded resale products.",
      "GTIN, MPN, and brand fields are incomplete or inconsistent."
    ],
    shopifyFields: [
      { field: "identifier_exists", why: "The explicit feed signal that tells Google whether identifiers exist." },
      { field: "Variant Barcode", why: "Indicates whether a GTIN may exist." },
      { field: "Google Shopping / MPN", why: "Indicates whether a manufacturer part number may exist." },
      { field: "Vendor / brand", why: "Brand context is part of product identification." },
      { field: "Product type / tags", why: "Useful to separate custom products from normal catalog items." }
    ],
    diagnosticWorkflow: [
      "Classify products into branded, custom, handmade, vintage, personalized, and uncertain groups.",
      "Check whether each group has GTIN, MPN, or brand data available.",
      "Avoid catalog-wide true or false values until row types are separated.",
      "Mark mixed or uncertain rows for manual review.",
      "Keep notes explaining why identifier_exists was changed.",
      "Resubmit only after identifier logic is consistent with the actual product."
    ],
    csvColumns: ["Handle", "Title", "Vendor", "Variant Barcode", "Google Shopping / MPN", "Google Shopping / Custom Product", "Tags"],
    badFixes: [
      "Setting identifier_exists false just to silence errors.",
      "Hiding real product identifiers.",
      "Using one value for a mixed catalog.",
      "Treating all missing GTINs as custom products.",
      "Ignoring brand and MPN when GTIN is absent."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when a CSV contains mixed product types and you need a row-level view of identifier_exists conflicts, missing identifier fields, and products that cannot be safely changed automatically.",
    decisionTable: [
      { situation: "Normal branded product with GTIN/MPN/brand available", nextStep: "Keep identifiers visible and complete." },
      { situation: "True handmade or custom product", nextStep: "Review whether identifier_exists false is appropriate." },
      { situation: "Product type unclear", nextStep: "Manual review before changing identifier_exists." },
      { situation: "Catalog-wide false value", nextStep: "Audit row by row; this is often risky." }
    ],
    faq: [
      { question: "Should identifier_exists be false for every product without GTIN?", answer: "No. A product may still have brand or MPN data. Missing GTIN alone does not prove identifiers do not exist." },
      { question: "When is identifier_exists false safe?", answer: "Usually for products that truly do not have manufacturer identifiers, such as certain custom, handmade, vintage, or personalized goods." },
      { question: "Can MerchantFix decide every identifier_exists value automatically?", answer: "No. It can flag likely conflicts and manual review rows, but some decisions require merchant knowledge." }
    ],
    related: [
      { href: "/fix/identifier-exists-conflict-shopify", label: "Short identifier_exists Shopify page" },
      { href: "/fix/google-merchant-center-errors/identifier-exists-false-misuse", label: "Exact identifier_exists guide" },
      { href: "/reference/missing-brand-shopify-reference", label: "Brand reference" }
    ]
  },
  {
    slug: "shopify-csv-merchant-center-reference",
    label: "Shopify CSV diagnosis reference",
    title: "Shopify CSV Google Merchant Center Reference Guide | MerchantFix.ai",
    description:
      "The complete reference for diagnosing Google Merchant Center errors from a Shopify CSV: affected rows, GTIN, MPN, brand, price, availability, image, and manual review.",
    h1: "Shopify CSV diagnosis for Google Merchant Center errors: the complete reference guide",
    subtitle:
      "A practical reference for merchants who need to turn a vague Merchant Center warning into affected rows, field checks, manual review flags, and safer next actions.",
    exactWarnings: ["Shopify CSV Google Merchant Center errors", "Google Merchant Center errors Shopify CSV", "Fix Google Merchant Center errors from Shopify CSV"],
    answer:
      "A Shopify CSV is useful when a Merchant Center warning affects many products and the merchant needs to identify affected rows before editing product data. The CSV can reveal missing barcodes, weak brands, SKU-as-MPN patterns, price or availability mismatches, missing images, and rows that require manual review.",
    whyItHappens: [
      "Merchant Center shows an error but does not make every Shopify source field obvious.",
      "The issue affects variants, not just products.",
      "Bulk feed apps can hide the row-level source of a warning.",
      "Some problems require product facts that cannot be guessed.",
      "Manual review is needed before resubmitting a large catalog."
    ],
    shopifyFields: [
      { field: "Handle", why: "Groups variants and helps map rows back to products." },
      { field: "Title", why: "Useful for context and product identification." },
      { field: "Vendor", why: "Often maps to brand-like data." },
      { field: "Variant SKU", why: "Useful for merchant tracking but can be misused as MPN or GTIN." },
      { field: "Variant Barcode", why: "Common source of GTIN data." },
      { field: "Variant Price", why: "Needed for price mismatch checks." },
      { field: "Image Src", why: "Needed for missing or weak product image checks." }
    ],
    diagnosticWorkflow: [
      "Export the Shopify CSV and keep an unchanged backup.",
      "Classify the Merchant Center warning by family: identifiers, price, availability, image, shipping, or policy.",
      "Map the warning to likely Shopify CSV columns.",
      "Flag affected rows and separate safe notes from manual review rows.",
      "Avoid product fact invention; verify GTIN, MPN, brand, price, and availability at source.",
      "Edit Shopify only after the diagnosis is reviewed."
    ],
    csvColumns: ["Handle", "Title", "Vendor", "Variant SKU", "Variant Barcode", "Variant Price", "Variant Inventory Qty", "Image Src", "Google Shopping fields"],
    badFixes: [
      "Editing the live catalog without a backup.",
      "Bulk filling missing values with invented product facts.",
      "Treating every warning as a single universal fix.",
      "Ignoring variant-level rows.",
      "Resubmitting before storefront and feed data match."
    ],
    merchantfixUseCase:
      "This is the core MerchantFix use case: turn a Shopify CSV and Merchant Center warning into affected rows, likely causes, safe notes, and manual review rows before a merchant edits or resubmits product data.",
    decisionTable: [
      { situation: "Single product affected", nextStep: "Manual Shopify review may be enough." },
      { situation: "Many rows affected", nextStep: "Use a CSV-level diagnostic before editing." },
      { situation: "Identifier fields incomplete", nextStep: "Review GTIN, MPN, brand, and identifier_exists together." },
      { situation: "Policy or misrepresentation issue", nextStep: "Use CSV only for product-data checks; broader trust review is manual." }
    ],
    faq: [
      { question: "Why use a Shopify CSV instead of checking products one by one?", answer: "Because CSV review can reveal patterns across variants, fields, and rows much faster when many products are affected." },
      { question: "Does CSV diagnosis change my Shopify store?", answer: "No. A diagnosis should be reviewed first. Product changes should happen only after verification." },
      { question: "Can CSV diagnosis fix misrepresentation?", answer: "Only the product-data part. Misrepresentation can involve website trust, policies, contact information, claims, and business identity." }
    ],
    related: [
      { href: "/fix/shopify-csv-google-merchant-center-errors", label: "Short Shopify CSV errors page" },
      { href: "/sample-report", label: "Sample Fix Pack report" },
      { href: "/how-to-export-shopify-csv", label: "How to export Shopify CSV" }
    ]
  }
] as const satisfies readonly AuthoritySeoGuide[];

export const authorityGuides = authoritySeoGuides.map((guide) => ({
  path: `/reference/${guide.slug}`,
  label: guide.label,
  description: guide.description
})) as readonly { path: string; label: string; description: string }[];

export function getAuthoritySeoGuide(slug: string) {
  return authoritySeoGuides.find((guide) => guide.slug === slug);
}
