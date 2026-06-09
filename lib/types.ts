export type IssueSeverity = "critical" | "warning" | "info";

export type IssueCategory =
  | "surface_scan"
  | "identifier"
  | "brand"
  | "image"
  | "price"
  | "data_quality"
  | "manual_review"
  | "system";

export type IssueFixType =
  | "auto_fixable"
  | "manual_review"
  | "not_fixable_from_file"
  | "informational"
  | "surface_risk_only";

export type SurfaceRiskCode =
  | "surface_missing_image"
  | "surface_missing_price"
  | "surface_weak_title"
  | "surface_weak_description"
  | "surface_unavailable_public_data"
  | "surface_empty_product_list"
  | "surface_invalid_url"
  | "surface_unsupported_store";

export type SurfaceScanStatus = "success" | "partial" | "failed" | "unsupported";

export type IssueCode =
  | "missing_gtin"
  | "missing_mpn"
  | "missing_brand"
  | "missing_identifier_exists"
  | "identifier_exists_conflict"
  | "invalid_gtin_length"
  | "invalid_gtin_format"
  | "duplicate_gtin"
  | "sku_same_as_mpn"
  | "possible_custom_product"
  | "missing_image"
  | "missing_price"
  | "unrecognized_columns"
  | "empty_file"
  | "invalid_csv"
  | "manual_review_required";

export type AnalysisStatus = "success" | "warning" | "error";

export type RawCsvRow = Record<string, string>;

export type SurfaceScanProduct = {
  id?: string | number | null;
  title?: string | null;
  handle?: string | null;
  url?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  price?: string | number | null;
  description?: string | null;
  vendor?: string | null;
  productType?: string | null;
  available?: boolean | null;
  rawProduct?: unknown;
};

export type SurfaceRisk = {
  riskCode: SurfaceRiskCode;
  severity: IssueSeverity;
  category: IssueCategory;
  fixType: IssueFixType;
  productTitle?: string | null;
  productHandle?: string | null;
  field?: string | null;
  currentValue?: string | null;
  explanation: string;
  suggestedFix: string;
  surfaceOnly: true;
  manualReviewRequired: boolean;
  productId?: string | number | null;
  type?: "missing_image" | "missing_price" | "weak_title" | "weak_description";
  message?: string;
};

export type SurfaceScanResult = {
  scanId: string;
  status: SurfaceScanStatus;
  storeUrl: string;
  normalizedStoreUrl: string | null;
  totalProducts: number;
  productsScanned: number;
  riskScore: number;
  riskCount: number;
  warningCount: number;
  infoCount: number;
  detectedRisks: SurfaceRisk[];
  affectedProducts: SurfaceScanProduct[];
  summary: string;
  recommendedActions: string[];
  csvUploadRecommended: boolean;
  disclaimer: string;
  createdAt: string;
  errorMessage?: string | null;
  risks?: SurfaceRisk[];
  score?: number;
  productCount?: number;
};

export type NormalizedProduct = {
  rowNumber: number;
  originalRow: RawCsvRow;
  title: string | null;
  handle: string | null;
  brand: string | null;
  vendor: string | null;
  gtin: string | null;
  mpn: string | null;
  sku: string | null;
  price: string | null;
  image: string | null;
  identifierExists: boolean | null;
  googleProductCategory: string | null;
  isPossibleCustomProduct: boolean;
  customProductSignals: string[];
};

export type ProductIssue = {
  issueCode: IssueCode;
  severity: IssueSeverity;
  category: IssueCategory;
  fixType: IssueFixType;
  rowNumber: number;
  productTitle: string | null;
  productHandle: string | null;
  field: string | null;
  currentValue: string | null;
  explanation: string;
  suggestedFix: string;
  autoFixable: boolean;
  manualReviewRequired: boolean;
};

export type AnalysisResult = {
  sessionId: string;
  status: AnalysisStatus;
  totalProducts: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  detectedCategories: IssueCategory[];
  affectedProducts: ProductIssue[];
  issues: ProductIssue[];
  summary: string;
  recommendedActions: string[];
  correctedCsvAvailable: boolean;
  disclaimer: string;
  createdAt: string;
  columnMapping?: ColumnMappingResult;
  merchantCenterErrorContext?: MerchantCenterErrorContext;
  normalizedProducts?: NormalizedProduct[];
  originalRows?: RawCsvRow[];
};

export type CorrectedCsvChange = {
  rowNumber: number;
  productTitle: string | null;
  field: string;
  previousValue: string | null;
  newValue: string | null;
  note: string;
  safe: boolean;
};

export type CorrectedCsvResult = {
  sessionId: string;
  correctedCsv: string;
  changes: CorrectedCsvChange[];
  manualReviewRows: RawCsvRow[];
  notes: string[];
  disclaimer: string;
};

export type ColumnMappingResult = {
  mappedColumns: Record<string, string>;
  missingImportantColumns: string[];
  unrecognizedColumns: string[];
  warnings: string[];
};

export type MerchantCenterErrorContext = {
  rawErrorText: string;
  detectedErrorKeywords: string[];
  mentionsGtin: boolean;
  mentionsMpn: boolean;
  mentionsIdentifierExists: boolean;
  mentionsBrand: boolean;
  mentionsCustomProduct: boolean;
  mentionsDisapproved: boolean;
  mentionsLimitedPerformance: boolean;
};

export const MANDATORY_DISCLAIMER =
  "MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.";

export const SURFACE_SCAN_DISCLAIMER =
  "MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.";

export const CUSTOM_PRODUCT_KEYWORDS = [
  "custom",
  "handmade",
  "personalized",
  "personalised",
  "made to order",
  "bespoke",
  "engraved",
  "print on demand",
  "one of a kind",
  "tailor made"
] as const;

export const VALID_GTIN_LENGTHS = [8, 12, 13, 14] as const;
export const WEAK_TITLE_MIN_LENGTH = 20;
export const WEAK_DESCRIPTION_MIN_LENGTH = 50;

export type Severity = IssueSeverity;
export type SurfaceProduct = SurfaceScanProduct;
export type ShopifyCsvRow = RawCsvRow;

export type NormalizedColumns = {
  title?: string | null;
  handle?: string | null;
  gtin?: string | null;
  mpn?: string | null;
  brand?: string | null;
  vendor?: string | null;
  sku?: string | null;
  identifierExists?: boolean | null;
  image?: string | null;
  price?: string | null;
};

export type IdentifierIssue = ProductIssue;
export type CsvAnalysisResult = AnalysisResult;
