import { detectIdentifierIssues } from "./detectIdentifierIssues";
import { generateSummary } from "./generateSummary";
import type { CsvAnalysisResult, ShopifyCsvRow } from "./types";

export function analyzeShopifyCsv(rows: ShopifyCsvRow[]): CsvAnalysisResult {
  const issues = detectIdentifierIssues(rows);

  return {
    rowCount: rows.length,
    issues,
    summary: generateSummary(rows.length, issues)
  };
}
