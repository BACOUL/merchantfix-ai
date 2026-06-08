export type Severity = "critical" | "warning" | "info";

export type SurfaceProduct = {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
};

export type SurfaceRisk = {
  productId?: string;
  type: "missing_image" | "missing_price" | "weak_title" | "weak_description";
  severity: Severity;
  message: string;
};

export type SurfaceScanResult = {
  productCount: number;
  risks: SurfaceRisk[];
  score: number;
  disclaimer: string;
};

export type ShopifyCsvRow = Record<string, string>;

export type NormalizedColumns = {
  title?: string;
  handle?: string;
  gtin?: string;
  mpn?: string;
  brand?: string;
  sku?: string;
  identifierExists?: string;
  image?: string;
  price?: string;
};

export type IdentifierIssue = {
  rowIndex: number;
  field: "gtin" | "mpn" | "brand" | "identifier_exists" | "image" | "price";
  severity: Severity;
  message: string;
  recommendation: string;
};

export type CsvAnalysisResult = {
  rowCount: number;
  issues: IdentifierIssue[];
  summary: string;
};
