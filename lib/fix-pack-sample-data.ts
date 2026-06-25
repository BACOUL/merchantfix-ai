export const sampleReportRows = [
  {
    row: 42,
    handle: "blue-running-shoes",
    googleIssue: "Missing value [gtin]",
    severity: "Critical",
    currentValue: "Barcode: empty",
    detectedProblem: "The product looks like a branded manufactured item, but the barcode field is empty.",
    recommendedAction: "Check the product packaging or supplier sheet for the official GTIN before resubmission.",
    fixStatus: "Manual review",
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
    fixStatus: "Needs merchant check",
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
    fixStatus: "Cannot fix safely",
    whyItMatters: "The product may be custom, but identifier data is inconsistent.",
    safeAction: "Verify if the item truly has no GTIN, MPN, or brand before changing identifier_exists."
  },
  {
    row: 91,
    handle: "black-rain-jacket",
    googleIssue: "Image issue",
    severity: "Warning",
    currentValue: "Image src: missing on one variant",
    detectedProblem: "One variant may be submitted without a usable product image.",
    recommendedAction: "Review Shopify product media and variant image mapping before resubmitting.",
    fixStatus: "Deterministic note",
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
    whyItMatters: "The SKU looks internal and may not be a real manufacturer part number.",
    safeAction: "Confirm manufacturer MPN from supplier data before copying SKU into MPN."
  }
];

export const fixPackOutputs = [
  {
    title: "merchantfix-diagnostic-report.pdf",
    description: "A clear PDF summary of detected issues, priorities, affected rows, unsupported areas, and safe next steps."
  },
  {
    title: "merchantfix-annotated-products.csv",
    description: "Your Shopify CSV with MerchantFix notes added when safe. Product facts are never invented."
  },
  {
    title: "merchantfix-manual-review.csv",
    description: "Rows that need supplier data, packaging, barcode, official brand confirmation, or merchant judgment."
  },
  {
    title: "merchantfix-resubmission-checklist.txt",
    description: "A short checklist to review before editing Shopify, uploading a feed, or resubmitting products."
  },
  {
    title: "Safe correction notes",
    description: "Deterministic edits only. MerchantFix explains what can be changed safely and what must be verified manually."
  }
];

export const beforeAfterRows = [
  {
    before: "Merchant Center shows “Missing value [gtin]”.",
    after: "You know which Shopify rows need barcode review."
  },
  {
    before: "You do not know whether identifier_exists should be true or false.",
    after: "You get safe decision rules and manual review flags."
  },
  {
    before: "You check products one by one inside Shopify.",
    after: "You receive a prioritized CSV diagnosis."
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
