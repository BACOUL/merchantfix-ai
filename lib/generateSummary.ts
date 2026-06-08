import type { IdentifierIssue } from "./types";

export function generateSummary(rowCount: number, issues: IdentifierIssue[]): string {
  if (rowCount === 0) {
    return "No rows were available for diagnosis.";
  }

  if (issues.length === 0) {
    return "No obvious identifier issues were detected in the provided rows.";
  }

  return `${issues.length} potential issue${issues.length === 1 ? "" : "s"} detected across ${rowCount} row${rowCount === 1 ? "" : "s"}.`;
}
