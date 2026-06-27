export const sampleReportRows = [
  {
    row: 42,
    handle: "blue-running-shoes",
    googleIssue: "Missing value [gtin]",
    severity: "Critical",
    currentValue: "Variant Barcode: empty",
    detectedProblem: "The product looks like a branded manufactured item, but the barcode field is empty.",
    recommendedAction: "Check the product packaging or supplier sheet for the official GTIN before resubmission.",
    fixStatus: "Manual review",
    guardrailStatus: "manual_review",
    merchantfixAction: "verify_gtin_before_editing",
    evidenceNeeded: "Product packaging | Supplier sheet | Manufacturer data",
    whyItMatters: "The product appears to need a manufacturer barcode before resubmission.",
    safeAction: "Check packaging or supplier barcode. Do not invent GTIN."
  },
  {
    row: 57,
    handle: "leather-wallet",
    googleIssue: "Missing value [brand]",
    severity: "Warning",
    currentValue: "Vendor: blank",
    detectedProblem: "The brand field is missing, so Google cannot clearly identify the product source.",
    recommendedAction: "Confirm the official brand name, then update Shopify Vendor or the feed mapping.",
    fixStatus: "Manual review",
    guardrailStatus: "manual_review",
    merchantfixAction: "verify_brand_before_editing",
    evidenceNeeded: "Real product brand | Supplier data | Product page or packaging",
    whyItMatters: "The brand field is empty or too generic for product identification.",
    safeAction: "Confirm the official brand name before editing Shopify Vendor or feed mapping."
  },
  {
    row: 78,
    handle: "handmade-silver-ring",
    googleIssue: "identifier_exists conflict",
    severity: "Critical",
    currentValue: "identifier_exists: true, GTIN: empty, MPN: empty",
    detectedProblem: "The feed says product identifiers exist, but no identifier values are provided.",
    recommendedAction: "Verify whether this is truly a custom product before changing identifier_exists.",
    fixStatus: "Blocked",
    guardrailStatus: "blocked",
    merchantfixAction: "do_not_auto_fix_identifier_exists",
    evidenceNeeded: "Merchant confirmation | Identifier availability | Product type proof",
    whyItMatters: "The product may be custom, but identifier data is inconsistent.",
    safeAction: "Verify if the item truly has no GTIN, MPN, or brand before changing identifier_exists."
  },
  {
    row: 91,
    handle: "black-rain-jacket",
    googleIssue: "Image issue",
    severity: "Warning",
    currentValue: "Image Src: missing on one variant",
    detectedProblem: "One variant may be submitted without a usable product image.",
    recommendedAction: "Review Shopify product media and variant image mapping before resubmitting.",
    fixStatus: "Safe note",
    guardrailStatus: "safe_note",
    merchantfixAction: "add_image_review_note",
    evidenceNeeded: "Shopify product media | Public image URL | Product page check",
    whyItMatters: "The product image may be missing, weak, or not mapped to the right variant.",
    safeAction: "Review product media and variant image mapping before resubmitting."
  },
  {
    row: 118,
    handle: "camping-lantern-pro",
    googleIssue: "SKU used as MPN warning",
    severity: "Manual review",
    currentValue: "SKU: CLP-001, MPN: CLP-001",
    detectedProblem: "The MPN looks like an internal SKU rather than an official manufacturer part number.",
    recommendedAction: "Confirm the real manufacturer MPN from supplier data before keeping this value.",
    fixStatus: "Manual review",
    guardrailStatus: "manual_review",
    merchantfixAction: "verify_mpn_before_resubmission",
    evidenceNeeded: "Manufacturer part number proof | Supplier sheet | Merchant confirmation",
    whyItMatters: "The SKU looks internal and may not be a real manufacturer part number.",
    safeAction: "Confirm manufacturer MPN from supplier data before copying SKU into MPN."
  }
];

export const annotatedCsvPreviewColumns = [
  "merchantfix_notes",
  "merchantfix_action",
  "merchantfix_status",
  "merchantfix_manual_review_reason",
  "merchantfix_evidence_needed"
] as const;

export const annotatedCsvPreviewRows = [
  {
    title: "Blue Running Shoes",
    shopifyField: "Variant Barcode",
    merchantfixStatus: "manual_review",
    merchantfixAction: "verify_gtin_before_editing",
    manualReviewReason: "MerchantFix cannot know or create the real GTIN from a CSV alone.",
    evidenceNeeded: "Product packaging | Supplier sheet | Manufacturer data"
  },
  {
    title: "Black Rain Jacket",
    shopifyField: "Image Src",
    merchantfixStatus: "safe_note",
    merchantfixAction: "add_image_review_note",
    manualReviewReason: "No product fact is invented. The row receives an image-review note only.",
    evidenceNeeded: "Shopify product media | Product page check"
  },
  {
    title: "Handmade Silver Ring",
    shopifyField: "identifier_exists",
    merchantfixStatus: "blocked",
    merchantfixAction: "do_not_auto_fix_identifier_exists",
    manualReviewReason: "The row is inconsistent and should not be treated as an automated correction.",
    evidenceNeeded: "Merchant confirmation | Identifier availability | Product type proof"
  }
] as const;

export const fixPackOutputs = [
  {
    title: "On-screen diagnostic report",
    description: "A structured report page with detected issues, priorities, affected rows, guardrails, evidence needed, and clear limitations. PDF export is a later delivery layer."
  },
  {
    title: "merchantfix-annotated-products.csv",
    description: "Your Shopify CSV with MerchantFix notes, action, guardrail status, manual-review reason, and evidence needed when safe output is available."
  },
  {
    title: "Manual-review rows inside the report",
    description: "Rows that require supplier data, packaging, barcode, official brand confirmation, or merchant judgment are marked clearly instead of being auto-fixed."
  },
  {
    title: "Resubmission checklist inside the report",
    description: "A short set of next steps to review before editing Shopify, uploading a feed, or resubmitting products."
  },
  {
    title: "Safe correction notes",
    description: "Deterministic notes only. MerchantFix explains what can be reviewed safely and what must be verified manually."
  }
];

export const beforeAfterRows = [
  {
    before: "Merchant Center shows “Missing value [gtin]”.",
    after: "You know which Shopify rows need barcode review and which evidence is needed."
  },
  {
    before: "You do not know whether identifier_exists should be true or false.",
    after: "You get safe decision rules, manual-review flags, and blocked rows when automation is unsafe."
  },
  {
    before: "You check products one by one inside Shopify.",
    after: "You receive a prioritized CSV diagnosis with row numbers and product handles."
  },
  {
    before: "You risk fake identifiers or unsafe bulk edits.",
    after: "MerchantFix blocks unsafe guesses and explains what not to do."
  },
  {
    before: "You do not know what to fix first.",
    after: "Critical issues are ranked before warnings and informational notes."
  }
];
