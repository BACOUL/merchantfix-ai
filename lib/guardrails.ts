import type { IssueCode, ProductIssue } from "./types";

export type GuardrailStatus = "safe_note" | "manual_review" | "blocked";

export type GuardrailDecision = {
  status: GuardrailStatus;
  issueCode: IssueCode;
  rowNumber: number;
  reason: string;
  evidenceNeeded: string[];
  ownerCheck: string;
};

export type GuardrailSummary = {
  status: GuardrailStatus;
  safeNoteCount: number;
  manualReviewCount: number;
  blockedCount: number;
  ownerInstructions: string[];
  decisions: GuardrailDecision[];
};

const EVIDENCE_BY_ISSUE: Record<IssueCode, string[]> = {
  missing_gtin: ["Product packaging", "Supplier sheet", "Manufacturer data"],
  missing_mpn: ["Manufacturer part list", "Supplier sheet", "Product documentation"],
  missing_brand: ["Real product brand", "Supplier data", "Product page or packaging"],
  missing_identifier_exists: ["Product type", "GTIN/MPN/brand availability", "Merchant confirmation"],
  identifier_exists_conflict: ["GTIN/MPN/brand source", "Product type", "Merchant confirmation"],
  invalid_gtin_length: ["Product packaging", "Manufacturer data", "Official barcode source"],
  invalid_gtin_format: ["Product packaging", "Manufacturer data", "Official barcode source"],
  duplicate_gtin: ["Variant relationship", "Product packaging", "Manufacturer data"],
  sku_same_as_mpn: ["Manufacturer part number proof", "Supplier sheet", "Merchant confirmation"],
  possible_custom_product: ["Proof product is custom/handmade", "Merchant confirmation", "Identifier availability"],
  missing_image: ["Shopify product media", "Public image URL", "Product page check"],
  missing_price: ["Shopify variant price", "Product page price", "Checkout price"],
  unrecognized_columns: ["Fresh Shopify CSV export"],
  empty_file: ["Valid Shopify CSV export"],
  invalid_csv: ["Fresh Shopify CSV export"],
  manual_review_required: ["Merchant confirmation", "Source data"]
};

const REASON_BY_ISSUE: Record<IssueCode, string> = {
  missing_gtin: "MerchantFix cannot know or create the real GTIN from a CSV alone.",
  missing_mpn: "MerchantFix cannot know or create the real manufacturer part number from a CSV alone.",
  missing_brand: "MerchantFix cannot know or create the real product brand from a CSV alone.",
  missing_identifier_exists: "identifier_exists depends on whether real manufacturer identifiers exist for the product.",
  identifier_exists_conflict: "The row says identifiers exist but the supporting identifier data is missing.",
  invalid_gtin_length: "The barcode-like value needs source verification before editing.",
  invalid_gtin_format: "The barcode-like value needs source verification before editing.",
  duplicate_gtin: "Duplicate GTINs may be valid variants or incorrect product identifiers.",
  sku_same_as_mpn: "A SKU is not automatically a manufacturer part number.",
  possible_custom_product: "Custom product status must be confirmed by the merchant.",
  missing_image: "A real product image must be added or verified in Shopify.",
  missing_price: "A real product price must be checked in Shopify and on the storefront.",
  unrecognized_columns: "MerchantFix cannot safely analyze a file without recognizable Shopify columns.",
  empty_file: "MerchantFix cannot analyze an empty file.",
  invalid_csv: "MerchantFix cannot safely analyze a malformed CSV.",
  manual_review_required: "Human verification is required before resubmission."
};

export function statusForIssue(issue: ProductIssue): GuardrailStatus {
  if (["empty_file", "invalid_csv", "unrecognized_columns"].includes(issue.issueCode)) {
    return "blocked";
  }

  if (issue.manualReviewRequired || issue.fixType === "manual_review") {
    return "manual_review";
  }

  return "safe_note";
}

function overallStatus(decisions: GuardrailDecision[]): GuardrailStatus {
  if (decisions.some((decision) => decision.status === "blocked")) return "blocked";
  if (decisions.some((decision) => decision.status === "manual_review")) return "manual_review";
  return "safe_note";
}

export function buildGuardrailSummary(issues: ProductIssue[]): GuardrailSummary {
  const decisions = issues.map((issue) => {
    const status = statusForIssue(issue);

    return {
      status,
      issueCode: issue.issueCode,
      rowNumber: issue.rowNumber,
      reason: REASON_BY_ISSUE[issue.issueCode] ?? issue.explanation,
      evidenceNeeded: EVIDENCE_BY_ISSUE[issue.issueCode] ?? ["Merchant confirmation"],
      ownerCheck:
        status === "safe_note"
          ? "No owner intervention needed unless the merchant asks for clarification."
          : status === "manual_review"
            ? "Check that the row is clearly marked manual review and that evidence needed is displayed. Do not invent product data."
            : "Do not deliver an automated fix. Ask for a valid Shopify CSV or explain that the case is outside safe automation."
    };
  });

  return {
    status: overallStatus(decisions),
    safeNoteCount: decisions.filter((decision) => decision.status === "safe_note").length,
    manualReviewCount: decisions.filter((decision) => decision.status === "manual_review").length,
    blockedCount: decisions.filter((decision) => decision.status === "blocked").length,
    ownerInstructions: [
      "Do not invent GTIN, MPN, brand, price, availability, or account recovery answers.",
      "Only review rows marked manual_review or blocked during early sales QA.",
      "If a row needs product truth, the merchant must verify packaging, supplier data, manufacturer data, Shopify admin, or storefront evidence."
    ],
    decisions
  };
}
