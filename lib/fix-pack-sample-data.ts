export const sampleReportRows = [
  {
    row: 42,
    handle: "blue-running-shoes",
    googleIssue: "Missing value [gtin]",
    severity: "Critical",
    whyItMatters: "The product appears to need a manufacturer barcode before resubmission.",
    safeAction: "Check packaging or supplier barcode. Do not invent GTIN."
  },
  {
    row: 57,
    handle: "leather-wallet",
    googleIssue: "Missing value [brand]",
    severity: "Warning",
    whyItMatters: "The brand field is empty or too generic for product identification.",
    safeAction: "Confirm the official brand name before editing Shopify Vendor or feed mapping."
  },
  {
    row: 78,
    handle: "handmade-silver-ring",
    googleIssue: "identifier_exists conflict",
    severity: "Critical",
    whyItMatters: "The product may be custom, but identifier data is inconsistent.",
    safeAction: "Verify if the item truly has no GTIN, MPN, or brand before changing identifier_exists."
  },
  {
    row: 91,
    handle: "black-rain-jacket",
    googleIssue: "Image issue",
    severity: "Warning",
    whyItMatters: "The product image may be missing, weak, or not mapped to the right variant.",
    safeAction: "Review product media and variant image mapping before resubmitting."
  },
  {
    row: 118,
    handle: "camping-lantern-pro",
    googleIssue: "SKU used as MPN warning",
    severity: "Manual review",
    whyItMatters: "The SKU looks internal and may not be a real manufacturer part number.",
    safeAction: "Confirm manufacturer MPN from supplier data before copying SKU into MPN."
  }
];

export const fixPackOutputs = [
  {
    title: "Diagnostic report",
    description: "A clear summary of critical issues, warnings, informational notes, and unsupported areas."
  },
  {
    title: "Row-level table",
    description: "Exact CSV rows, handles, product titles, issue type, severity, and suggested next action when available."
  },
  {
    title: "Safe correction notes",
    description: "Deterministic edits only. MerchantFix explains what can be changed safely and what must be verified manually."
  },
  {
    title: "Manual review list",
    description: "Rows that need supplier data, packaging, official brand confirmation, or merchant judgment before resubmission."
  },
  {
    title: "Annotated CSV when safe",
    description: "Generated when safe notes or deterministic changes are available. Missing product facts are never invented."
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
