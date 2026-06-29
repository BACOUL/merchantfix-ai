import type { IssueCode, ProductIssue } from "./types";

export function generateAnalysisSummary(input: {
  totalProducts: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  issueCodes: string[];
  status: string;
}): string {
  if (input.status === "error") {
    return "The uploaded file could not be analyzed. Please upload a valid Shopify CSV export.";
  }

  if (input.criticalCount > 0) {
    return "Your Shopify CSV contains product identifier conflicts that may cause Google Merchant Center disapprovals. The most urgent issues should be reviewed before resubmitting your products.";
  }

  if (input.warningCount > 0) {
    return "Your Shopify CSV contains product data warnings that may limit product visibility or require review before Google Merchant Center submission.";
  }

  if (input.infoCount > 0) {
    return "No critical product identifier issues were detected, but some informational product data items should still be reviewed.";
  }

  return "No critical product identifier issues were detected in this CSV based on the current MerchantFix.ai V1 checks.";
}

export function generateRecommendedActions(input: {
  issueCodes: string[];
  criticalCount: number;
  warningCount: number;
  infoCount: number;
}): string[] {
  const issueCodes = new Set(input.issueCodes as IssueCode[]);
  const actions = new Set<string>();

  if (issueCodes.has("empty_file")) {
    actions.add("Upload a valid Shopify CSV export with a header row and product data.");
  }

  if (issueCodes.has("invalid_csv")) {
    actions.add("Export a fresh Shopify CSV and upload it again.");
  }

  if (issueCodes.has("unrecognized_columns")) {
    actions.add("Check that the file uses recognizable Shopify export columns such as Title, Variant Barcode, Vendor, and Variant Price.");
  }

  if (issueCodes.has("missing_gtin") || issueCodes.has("identifier_exists_conflict")) {
    actions.add("Review products with missing GTIN values. Do not invent GTIN values.");
  }

  if (issueCodes.has("missing_mpn")) {
    actions.add("Confirm whether affected products have a real manufacturer part number before adding MPN data.");
  }

  if (issueCodes.has("sku_same_as_mpn")) {
    actions.add("Confirm whether SKU is truly a manufacturer part number before using it as MPN.");
  }

  if (issueCodes.has("possible_custom_product") || issueCodes.has("missing_identifier_exists")) {
    actions.add("Review identifier_exists for custom, handmade, personalized, or made-to-order products.");
  }

  if (issueCodes.has("missing_brand")) {
    actions.add("Add missing brand or vendor information when required. Do not invent a brand.");
  }

  if (issueCodes.has("missing_title") || issueCodes.has("invalid_title")) {
    actions.add("Review affected product titles. Keep titles accurate, readable, and free from promotional stuffing.");
  }

  if (issueCodes.has("missing_description")) {
    actions.add("Add missing product descriptions using real product facts. Do not invent specifications.");
  }

  if (issueCodes.has("missing_link")) {
    actions.add("Check Shopify handles, publishing status, feed link mapping, and live product URLs for affected rows.");
  }

  if (issueCodes.has("missing_image")) {
    actions.add("Add missing product image data in Shopify before resubmitting affected products.");
  }

  if (issueCodes.has("missing_price")) {
    actions.add("Add missing product price data in Shopify before resubmitting affected products.");
  }

  if (issueCodes.has("invalid_availability")) {
    actions.add("Review Shopify inventory, storefront availability, and feed availability mapping before changing availability values.");
  }

  if (issueCodes.has("missing_color") || issueCodes.has("missing_size")) {
    actions.add("Review product options, variant titles, tags, and category mapping for missing apparel attributes.");
  }

  if (issueCodes.has("missing_age_group") || issueCodes.has("missing_gender")) {
    actions.add("Review product audience and Google product category before adding age_group or gender values.");
  }

  if (issueCodes.has("invalid_gtin_format") || issueCodes.has("invalid_gtin_length") || issueCodes.has("duplicate_gtin")) {
    actions.add("Review invalid or duplicate GTIN values against official product data before resubmitting.");
  }

  if (input.criticalCount > 0 || input.warningCount > 0) {
    actions.add("Review manual review rows before resubmitting to Google Merchant Center.");
  }

  if (actions.size === 0) {
    actions.add("Review Merchant Center diagnostics directly because MerchantFix.ai V1 only checks current supported CSV-level rules.");
  }

  return Array.from(actions);
}

export function generateSummary(rowCount: number, issues: ProductIssue[]): string {
  const criticalCount = issues.filter((issue) => issue.severity === "critical").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  const infoCount = issues.filter((issue) => issue.severity === "info").length;

  return generateAnalysisSummary({
    totalProducts: rowCount,
    criticalCount,
    warningCount,
    infoCount,
    issueCodes: issues.map((issue) => issue.issueCode),
    status: criticalCount > 0 || warningCount > 0 ? "warning" : "success"
  });
}