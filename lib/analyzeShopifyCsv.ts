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

function createSessionId(sessionId?: string): string {
  return sessionId ?? `merchantfix-${Date.now().toString(36)}`;
}

function createSystemIssue(issueCode: Extract<IssueCode, "empty_file" | "invalid_csv" | "unrecognized_columns">): ProductIssue {
  const copy: Record<typeof issueCode, { explanation: string; suggestedFix: string }> = {
    empty_file: {
      explanation: "The uploaded CSV is empty.",
      suggestedFix: "Upload a valid Shopify CSV export with product rows."
    },
    invalid_csv: {
      explanation: "The CSV could not be parsed safely.",
      suggestedFix: "Export a fresh Shopify CSV and upload it again."
    },
    unrecognized_columns: {
      explanation: "The file does not appear to contain recognizable Shopify product columns.",
      suggestedFix: "Check the export format and include columns such as Title, Variant Barcode, Vendor, and Variant Price."
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
        summary: "The uploaded file is empty. Please upload a valid Shopify CSV export.",
        recommendedActions: ["Upload a valid Shopify CSV export with a header row and product data."]
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
        summary: "The CSV could not be parsed. Please export a fresh Shopify CSV and try again.",
        recommendedActions: ["Export a fresh Shopify CSV from Shopify and upload it again."]
      }),
      merchantCenterErrorContext
    };
  }

  if (parsed.rows.length === 0) {
    return {
      ...buildErrorResult({
        sessionId,
        issueCode: "empty_file",
        summary: "The uploaded CSV did not contain product rows.",
        recommendedActions: ["Upload a valid Shopify CSV export with product rows."]
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
        summary: "The file does not appear to contain recognizable Shopify product columns.",
        recommendedActions: ["Check the export format and upload a Shopify product CSV."]
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
