import Papa from "papaparse";
import { detectIdentifierIssues } from "./detectIdentifierIssues";
import { generateAnalysisSummary, generateRecommendedActions } from "./generateSummary";
import { normalizeShopifyRows } from "./normalizeColumns";
import {
  MANDATORY_DISCLAIMER,
  type AnalysisResult,
  type IssueCategory,
  type IssueCode,
  type ProductIssue,
  type RawCsvRow
} from "./types";

const EXPECTED_SHOPIFY_COLUMNS = ["Title", "Handle", "Vendor", "Variant SKU", "Variant Barcode", "Variant Price", "Image Src"];

const SHOPIFY_EXPORT_RECOVERY_STEPS = [
  "Export a fresh Shopify product CSV from Shopify admin > Products > Export.",
  "Use the original Shopify product export without renaming, sorting, or deleting columns before upload.",
  `Expected Shopify column examples: ${EXPECTED_SHOPIFY_COLUMNS.join(", ")}.`,
  "If the file came from a feed app, export from Shopify products instead of uploading a feed-only file."
];

function createSessionId(sessionId?: string): string {
  return sessionId ?? `merchantfix-${Date.now().toString(36)}`;
}

function createSystemIssue(issueCode: Extract<IssueCode, "empty_file" | "invalid_csv" | "unrecognized_columns">): ProductIssue {
  const copy: Record<typeof issueCode, { explanation: string; suggestedFix: string }> = {
    empty_file: {
      explanation: "The uploaded CSV is empty or contains no product rows. MerchantFix needs the header row and product rows from a Shopify product export.",
      suggestedFix: "Export a fresh Shopify product CSV from Shopify admin, keep the original columns, and upload that file again."
    },
    invalid_csv: {
      explanation: "The file could not be parsed as a safe CSV. This can happen when the file is not a CSV, was copied from a spreadsheet incorrectly, or contains broken quotes/delimiters.",
      suggestedFix: "Export a fresh Shopify product CSV, do not edit it before upload, and try again."
    },
    unrecognized_columns: {
      explanation: `The file does not look like a Shopify product CSV. MerchantFix could not find expected columns such as ${EXPECTED_SHOPIFY_COLUMNS.join(", ")}.`,
      suggestedFix: "Upload a Shopify product CSV export, not a Google Merchant Center feed export, feed-app export, order export, or spreadsheet with renamed columns."
    }
  };

  return {
    issueCode,
    severity: "info",
    category: "system",
    fixType: "informational",
    rowNumber: 0,
    productTitle: null,
    productHandle: null,
    field: "csv",
    currentValue: null,
    explanation: copy[issueCode].explanation,
    suggestedFix: copy[issueCode].suggestedFix,
    autoFixable: false,
    manualReviewRequired: false
  };
}

function buildErrorResult(input: {
  sessionId?: string;
  issueCode: Extract<IssueCode, "empty_file" | "invalid_csv" | "unrecognized_columns">;
  summary: string;
  recommendedActions: string[];
}): AnalysisResult {
  const issue = createSystemIssue(input.issueCode);

  return {
    sessionId: createSessionId(input.sessionId),
    status: "error",
    totalProducts: 0,
    criticalCount: 0,
    warningCount: 0,
    infoCount: 1,
    detectedCategories: ["system"],
    affectedProducts: [issue],
    issues: [issue],
    summary: input.summary,
    recommendedActions: input.recommendedActions,
    correctedCsvAvailable: false,
    disclaimer: MANDATORY_DISCLAIMER,
    createdAt: new Date().toISOString(),
    normalizedProducts: [],
    originalRows: []
  };
}

function parseMerchantCenterErrorContext(rawErrorText = "") {
  const normalized = rawErrorText.toLowerCase();
  const keywords = [
    "gtin",
    "mpn",
    "identifier_exists",
    "identifier exists",
    "brand",
    "disapproved",
    "limited performance",
    "custom",
    "handmade",
    "personalized",
    "personalised",
    "made to order"
  ];
  const detectedErrorKeywords = keywords.filter((keyword) => normalized.includes(keyword));

  return {
    rawErrorText,
    detectedErrorKeywords,
    mentionsGtin: normalized.includes("gtin"),
    mentionsMpn: normalized.includes("mpn"),
    mentionsIdentifierExists: normalized.includes("identifier_exists") || normalized.includes("identifier exists"),
    mentionsBrand: normalized.includes("brand"),
    mentionsCustomProduct:
      normalized.includes("custom") ||
      normalized.includes("handmade") ||
      normalized.includes("personalized") ||
      normalized.includes("personalised") ||
      normalized.includes("made to order"),
    mentionsDisapproved: normalized.includes("disapproved"),
    mentionsLimitedPerformance: normalized.includes("limited performance")
  };
}

function parseCsv(csvText: string): { rows: RawCsvRow[]; errors: Papa.ParseError[] } {
  const result = Papa.parse<RawCsvRow>(csvText, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim()
  });

  const rows = result.data.filter((row) => Object.values(row).some((value) => String(value ?? "").trim() !== ""));
  return { rows, errors: result.errors };
}

export function analyzeShopifyCsv(input: {
  csvText: string;
  merchantCenterErrorText?: string;
  sessionId?: string;
}): AnalysisResult {
  const sessionId = createSessionId(input.sessionId);
  const merchantCenterErrorContext = parseMerchantCenterErrorContext(input.merchantCenterErrorText);

  if (input.csvText.trim() === "") {
    return {
      ...buildErrorResult({
        sessionId,
        issueCode: "empty_file",
        summary: "The uploaded file is empty. MerchantFix needs a Shopify product CSV with a header row and product rows before it can diagnose anything.",
        recommendedActions: SHOPIFY_EXPORT_RECOVERY_STEPS
      }),
      merchantCenterErrorContext
    };
  }

  const parsed = parseCsv(input.csvText);

  if (parsed.errors.some((error) => error.code === "MissingQuotes" || error.code === "UndetectableDelimiter")) {
    return {
      ...buildErrorResult({
        sessionId,
        issueCode: "invalid_csv",
        summary: "The file could not be read as a valid CSV. Upload a fresh Shopify product CSV export instead of a copied, edited, or feed-app file.",
        recommendedActions: [
          ...SHOPIFY_EXPORT_RECOVERY_STEPS,
          "Avoid copying CSV content from a spreadsheet into a text file; use the Shopify export file directly."
        ]
      }),
      merchantCenterErrorContext
    };
  }

  if (parsed.rows.length === 0) {
    return {
      ...buildErrorResult({
        sessionId,
        issueCode: "empty_file",
        summary: "The uploaded CSV contains a header but no product rows. MerchantFix needs product rows to identify affected Shopify fields.",
        recommendedActions: SHOPIFY_EXPORT_RECOVERY_STEPS
      }),
      merchantCenterErrorContext
    };
  }

  const { products, columnMapping } = normalizeShopifyRows(parsed.rows);

  if (products.length === 0) {
    return {
      ...buildErrorResult({
        sessionId,
        issueCode: "unrecognized_columns",
        summary: `This file does not appear to be a Shopify product CSV. MerchantFix could not find expected Shopify product columns such as ${EXPECTED_SHOPIFY_COLUMNS.join(", ")}.`,
        recommendedActions: [
          ...SHOPIFY_EXPORT_RECOVERY_STEPS,
          "Do not upload a Google Merchant Center feed export, order export, customer export, or manually renamed spreadsheet for this diagnostic."
        ]
      }),
      columnMapping,
      originalRows: parsed.rows,
      merchantCenterErrorContext
    };
  }

  const issues = detectIdentifierIssues(products);
  const criticalCount = issues.filter((issue) => issue.severity === "critical").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  const infoCount = issues.filter((issue) => issue.severity === "info").length;
  const status = criticalCount > 0 || warningCount > 0 ? "warning" : "success";
  const issueCodes = issues.map((issue) => issue.issueCode);
  const detectedCategories = Array.from(new Set(issues.map((issue) => issue.category))) as IssueCategory[];

  return {
    sessionId,
    status,
    totalProducts: products.length,
    criticalCount,
    warningCount,
    infoCount,
    detectedCategories,
    affectedProducts: issues,
    issues,
    summary: generateAnalysisSummary({
      totalProducts: products.length,
      criticalCount,
      warningCount,
      infoCount,
      issueCodes,
      status
    }),
    recommendedActions: generateRecommendedActions({
      issueCodes,
      criticalCount,
      warningCount,
      infoCount
    }),
    correctedCsvAvailable: issues.length > 0,
    disclaimer: MANDATORY_DISCLAIMER,
    createdAt: new Date().toISOString(),
    columnMapping,
    merchantCenterErrorContext,
    normalizedProducts: products,
    originalRows: parsed.rows
  };
}
