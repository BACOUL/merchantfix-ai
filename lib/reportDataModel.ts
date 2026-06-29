import {
  MANDATORY_DISCLAIMER,
  type AnalysisResult,
  type IssueCategory,
  type IssueCode,
  type IssueSeverity,
  type ProductIssue
} from "./types";

export const MERCHANTFIX_REPORT_VERSION = "merchantfix-report-v1";
export const MERCHANTFIX_METHOD_VERSION = "merchantfix-csv-diagnostic-v1";

export type ReportDecisionStatus = "safe_note" | "manual_review" | "blocked";
export type ReportConfidenceLevel = "csv_detected" | "evidence_required" | "not_safe_to_automate";
export type ReportReadinessLabel = "ready" | "review_needed" | "high_risk" | "invalid_input";
export type ReportFindingSource = "shopify_csv" | "merchant_center_warning" | "system";

export type ReportScore = {
  score: number;
  label: ReportReadinessLabel;
  title: string;
  explanation: string;
  isGoogleScore: false;
};

export type ReportCounts = {
  totalProducts: number;
  totalFindings: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  safeNoteCount: number;
  manualReviewCount: number;
  blockedCount: number;
};

export type ReportTopIssue = {
  issueCode: IssueCode;
  label: string;
  severity: IssueSeverity;
  category: IssueCategory;
  count: number;
  affectedRows: number[];
};

export type ReportRowFinding = {
  rowNumber: number;
  productTitle: string | null;
  productHandle: string | null;
  issueCode: IssueCode;
  issueLabel: string;
  severity: IssueSeverity;
  category: IssueCategory;
  field: string | null;
  currentValue: string | null;
  explanation: string;
  suggestedAction: string;
  decisionStatus: ReportDecisionStatus;
  confidenceLevel: ReportConfidenceLevel;
  evidenceNeeded: string[];
  source: ReportFindingSource;
  canBeChangedAutomatically: boolean;
};

export type ReportCredibilityRule = {
  title: string;
  description: string;
};

export type MerchantFixReportModel = {
  reportId: string;
  reportVersion: string;
  methodVersion: string;
  generatedAt: string;
  shopName: string | null;
  csvFilename: string | null;
  stripeSessionId: string | null;
  merchantCenterWarning: string | null;
  detectedMerchantCenterKeywords: string[];
  summary: string;
  score: ReportScore;
  counts: ReportCounts;
  detectedCategories: IssueCategory[];
  topIssues: ReportTopIssue[];
  rowFindings: ReportRowFinding[];
  recommendedActions: string[];
  deliverables: {
    annotatedCsvRecommended: boolean;
    pdfReportReady: boolean;
    zipDeliveryReady: boolean;
  };
  credibilityRules: ReportCredibilityRule[];
  limitations: string[];
  disclaimer: string;
};

const ISSUE_LABELS: Partial<Record<IssueCode, string>> = {
  missing_gtin: "Missing GTIN",
  missing_mpn: "Missing MPN",
  missing_brand: "Missing brand",
  missing_identifier_exists: "Missing identifier_exists",
  identifier_exists_conflict: "identifier_exists conflict",
  invalid_gtin_length: "Invalid GTIN length",
  invalid_gtin_format: "Invalid GTIN format",
  duplicate_gtin: "Duplicate GTIN",
  sku_same_as_mpn: "SKU used as MPN",
  possible_custom_product: "Possible custom product",
  missing_title: "Missing title",
  invalid_title: "Title needs review",
  missing_description: "Missing description",
  missing_link: "Product link needs review",
  missing_image: "Missing image",
  missing_price: "Missing price",
  invalid_availability: "Availability needs review",
  missing_color: "Missing color",
  missing_size: "Missing size",
  missing_age_group: "Missing age group",
  missing_gender: "Missing gender",
  unrecognized_columns: "Unrecognized CSV columns",
  empty_file: "Empty CSV file",
  invalid_csv: "Invalid CSV file",
  manual_review_required: "Manual review required"
};

const EVIDENCE_BY_ISSUE: Partial<Record<IssueCode, string[]>> = {
  missing_gtin: ["Product packaging barcode", "Supplier sheet", "Manufacturer product data"],
  invalid_gtin_length: ["Product packaging barcode", "Manufacturer product data", "Official barcode source"],
  invalid_gtin_format: ["Product packaging barcode", "Manufacturer product data", "Official barcode source"],
  duplicate_gtin: ["Variant-level barcode evidence", "Packaging for each affected variant", "Supplier or manufacturer confirmation"],
  missing_mpn: ["Manufacturer part number", "Supplier sheet", "Manufacturer catalog"],
  sku_same_as_mpn: ["Proof that the SKU is truly the manufacturer part number", "Supplier sheet", "Manufacturer data"],
  missing_brand: ["Brand owner name", "Vendor/brand field in Shopify admin", "Supplier or manufacturer confirmation"],
  missing_identifier_exists: ["Product identifier policy review", "GTIN/MPN/brand availability evidence"],
  identifier_exists_conflict: ["GTIN/MPN/brand availability evidence", "Shopify identifier_exists value review"],
  possible_custom_product: ["Confirmation that the product is custom, handmade, personalized, or made to order"],
  missing_title: ["Shopify product title", "Live product page", "Product identity"],
  invalid_title: ["Shopify product title", "Live product page", "Merchant wording review"],
  missing_description: ["Shopify product description", "Product facts", "Live product page"],
  missing_link: ["Shopify handle", "Published product page", "Feed app link mapping", "Private browser URL check"],
  missing_image: ["Public product image URL", "Shopify media library", "Live storefront image"],
  missing_price: ["Shopify variant price", "Live storefront price", "Merchant Center submitted price"],
  invalid_availability: ["Shopify inventory", "Product status", "Live storefront availability", "Feed availability mapping"],
  missing_color: ["Product option value", "Product category", "Product page or packaging"],
  missing_size: ["Variant option value", "Variant title", "Product page or packaging"],
  missing_age_group: ["Product audience", "Google product category", "Merchant confirmation"],
  missing_gender: ["Product audience", "Google product category", "Merchant confirmation"],
  unrecognized_columns: ["Fresh Shopify product CSV export with standard columns"],
  empty_file: ["Fresh Shopify product CSV export with product rows"],
  invalid_csv: ["Fresh Shopify product CSV export"],
  manual_review_required: ["Merchant, supplier, manufacturer, Shopify admin, or storefront evidence"]
};

const CREDIBILITY_RULES: ReportCredibilityRule[] = [
  {
    title: "CSV-based diagnosis",
    description: "The report only claims what can be detected from the uploaded Shopify CSV and pasted Merchant Center warning."
  },
  {
    title: "No invented product facts",
    description: "MerchantFix does not invent GTIN, MPN, brand, title, description, color, size, age_group, gender, availability, price, shipping, tax, category, or other product facts."
  },
  {
    title: "Manual evidence separated",
    description: "Rows that need real-world product proof are marked as manual_review with evidence needed before editing Shopify."
  },
  {
    title: "Unsafe automation blocked",
    description: "Rows that cannot be handled safely from file data are marked as blocked instead of pretending there is an automatic fix."
  },
  {
    title: "No Google outcome guarantee",
    description: "The report is not a Google approval, ranking, traffic, sales, or account recovery guarantee."
  }
];

const LIMITATIONS = [
  "MerchantFix is a product-data diagnostic layer, not a Google Merchant Center account recovery service.",
  "The internal Product Data Readiness score is not a Google score and is not produced by Google.",
  "Some rows require merchant, supplier, manufacturer, packaging, Shopify admin, or storefront verification before editing.",
  "Tax, shipping, landing page, crawl, and misrepresentation issues may require broader manual review outside CSV data.",
  "Google approval, ranking, traffic, performance, sales, and account recovery are not guaranteed."
];

function getIssueLabel(issueCode: IssueCode): string {
  return ISSUE_LABELS[issueCode] ?? issueCode.replaceAll("_", " ");
}

function getEvidenceNeeded(issueCode: IssueCode): string[] {
  return EVIDENCE_BY_ISSUE[issueCode] ?? ["Merchant, supplier, manufacturer, Shopify admin, or storefront evidence"];
}

function decisionFromIssue(issue: ProductIssue): ReportDecisionStatus {
  if (issue.fixType === "not_fixable_from_file" || issue.issueCode === "unrecognized_columns" || issue.issueCode === "invalid_csv") {
    return "blocked";
  }

  if (issue.manualReviewRequired || issue.fixType === "manual_review") {
    return "manual_review";
  }

  return "safe_note";
}

function confidenceFromDecision(decisionStatus: ReportDecisionStatus): ReportConfidenceLevel {
  if (decisionStatus === "blocked") return "not_safe_to_automate";
  if (decisionStatus === "manual_review") return "evidence_required";
  return "csv_detected";
}

function sourceFromIssue(issue: ProductIssue): ReportFindingSource {
  if (issue.category === "system") return "system";
  return "shopify_csv";
}

function buildRowFinding(issue: ProductIssue): ReportRowFinding {
  const decisionStatus = decisionFromIssue(issue);

  return {
    rowNumber: issue.rowNumber,
    productTitle: issue.productTitle,
    productHandle: issue.productHandle,
    issueCode: issue.issueCode,
    issueLabel: getIssueLabel(issue.issueCode),
    severity: issue.severity,
    category: issue.category,
    field: issue.field,
    currentValue: issue.currentValue,
    explanation: issue.explanation,
    suggestedAction: issue.suggestedFix,
    decisionStatus,
    confidenceLevel: confidenceFromDecision(decisionStatus),
    evidenceNeeded: getEvidenceNeeded(issue.issueCode),
    source: sourceFromIssue(issue),
    canBeChangedAutomatically: issue.autoFixable && decisionStatus === "safe_note"
  };
}

function buildTopIssues(rowFindings: ReportRowFinding[]): ReportTopIssue[] {
  const grouped = new Map<IssueCode, ReportTopIssue>();

  for (const finding of rowFindings) {
    const existing = grouped.get(finding.issueCode);

    if (existing) {
      existing.count += 1;
      if (finding.rowNumber > 0) existing.affectedRows.push(finding.rowNumber);
      continue;
    }

    grouped.set(finding.issueCode, {
      issueCode: finding.issueCode,
      label: finding.issueLabel,
      severity: finding.severity,
      category: finding.category,
      count: 1,
      affectedRows: finding.rowNumber > 0 ? [finding.rowNumber] : []
    });
  }

  return Array.from(grouped.values())
    .map((issue) => ({ ...issue, affectedRows: Array.from(new Set(issue.affectedRows)).sort((a, b) => a - b) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function buildCounts(analysis: AnalysisResult, rowFindings: ReportRowFinding[]): ReportCounts {
  return {
    totalProducts: analysis.totalProducts,
    totalFindings: rowFindings.length,
    criticalCount: analysis.criticalCount,
    warningCount: analysis.warningCount,
    infoCount: analysis.infoCount,
    safeNoteCount: rowFindings.filter((finding) => finding.decisionStatus === "safe_note").length,
    manualReviewCount: rowFindings.filter((finding) => finding.decisionStatus === "manual_review").length,
    blockedCount: rowFindings.filter((finding) => finding.decisionStatus === "blocked").length
  };
}

function buildScore(counts: ReportCounts, analysisStatus: AnalysisResult["status"]): ReportScore {
  if (analysisStatus === "error") {
    return {
      score: 0,
      label: "invalid_input",
      title: "Invalid input",
      explanation: "MerchantFix could not produce a reliable product-data readiness score because the uploaded file could not be analyzed safely.",
      isGoogleScore: false
    };
  }

  const penalty =
    counts.criticalCount * 12 + counts.warningCount * 6 + counts.manualReviewCount * 4 + counts.blockedCount * 15;
  const score = Math.max(0, Math.min(100, 100 - penalty));

  if (counts.blockedCount > 0 || score < 45) {
    return {
      score,
      label: "high_risk",
      title: "High review risk",
      explanation: "Several rows are blocked or risky enough that product data should be reviewed before resubmission.",
      isGoogleScore: false
    };
  }

  if (counts.manualReviewCount > 0 || score < 80) {
    return {
      score,
      label: "review_needed",
      title: "Review needed",
      explanation: "Some rows need merchant, supplier, manufacturer, or Shopify evidence before editing product data.",
      isGoogleScore: false
    };
  }

  return {
    score,
    label: "ready",
    title: "Low detected CSV risk",
    explanation: "MerchantFix found low CSV-level risk in the supported product-data checks, but Google approval is not guaranteed.",
    isGoogleScore: false
  };
}

export function buildMerchantFixReportModel(input: {
  analysis: AnalysisResult;
  csvFilename?: string | null;
  shopName?: string | null;
  stripeSessionId?: string | null;
  methodVersion?: string;
}): MerchantFixReportModel {
  const rowFindings = input.analysis.issues.map(buildRowFinding);
  const counts = buildCounts(input.analysis, rowFindings);
  const score = buildScore(counts, input.analysis.status);

  return {
    reportId: input.analysis.sessionId,
    reportVersion: MERCHANTFIX_REPORT_VERSION,
    methodVersion: input.methodVersion ?? MERCHANTFIX_METHOD_VERSION,
    generatedAt: new Date().toISOString(),
    shopName: input.shopName?.trim() || null,
    csvFilename: input.csvFilename?.trim() || null,
    stripeSessionId: input.stripeSessionId?.trim() || null,
    merchantCenterWarning: input.analysis.merchantCenterErrorContext?.rawErrorText?.trim() || null,
    detectedMerchantCenterKeywords: input.analysis.merchantCenterErrorContext?.detectedErrorKeywords ?? [],
    summary: input.analysis.summary,
    score,
    counts,
    detectedCategories: input.analysis.detectedCategories,
    topIssues: buildTopIssues(rowFindings),
    rowFindings,
    recommendedActions: input.analysis.recommendedActions,
    deliverables: {
      annotatedCsvRecommended: input.analysis.correctedCsvAvailable,
      pdfReportReady: false,
      zipDeliveryReady: false
    },
    credibilityRules: CREDIBILITY_RULES,
    limitations: LIMITATIONS,
    disclaimer: input.analysis.disclaimer || MANDATORY_DISCLAIMER
  };
}