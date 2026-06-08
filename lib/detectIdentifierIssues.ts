import { normalizeColumns } from "./normalizeColumns";
import { isValidLookingGtin } from "./validationRules";
import type { IdentifierIssue, ShopifyCsvRow } from "./types";

export function detectIdentifierIssues(rows: ShopifyCsvRow[]): IdentifierIssue[] {
  const gtinCounts = new Map<string, number>();

  rows.forEach((row) => {
    const gtin = normalizeColumns(row).gtin?.trim();
    if (gtin) {
      gtinCounts.set(gtin, (gtinCounts.get(gtin) ?? 0) + 1);
    }
  });

  return rows.flatMap((row, index) => {
    const columns = normalizeColumns(row);
    const issues: IdentifierIssue[] = [];
    const gtin = columns.gtin?.trim() ?? "";
    const mpn = columns.mpn?.trim() ?? "";
    const brand = columns.brand?.trim() ?? "";
    const sku = columns.sku?.trim() ?? "";
    const identifierExists = columns.identifierExists?.trim().toLowerCase() ?? "";

    if (!gtin && !mpn) {
      issues.push({ rowIndex: index, field: "gtin", severity: "critical", message: "Missing GTIN or MPN.", recommendation: "Add a real product identifier or mark for manual review." });
    }

    if (!brand) {
      issues.push({ rowIndex: index, field: "brand", severity: "warning", message: "Missing brand.", recommendation: "Add the real product brand; do not invent one." });
    }

    if (identifierExists === "true" && !gtin && !mpn) {
      issues.push({ rowIndex: index, field: "identifier_exists", severity: "critical", message: "identifier_exists is true but identifiers are missing.", recommendation: "Set only after verifying real identifiers exist." });
    }

    if (gtin && !isValidLookingGtin(gtin)) {
      issues.push({ rowIndex: index, field: "gtin", severity: "warning", message: "GTIN has an invalid-looking format.", recommendation: "Verify the original product barcode." });
    }

    if (gtin && (gtinCounts.get(gtin) ?? 0) > 1) {
      issues.push({ rowIndex: index, field: "gtin", severity: "warning", message: "Duplicate GTIN detected.", recommendation: "Confirm each variant uses the correct unique GTIN where required." });
    }

    if (sku && mpn && sku === mpn) {
      issues.push({ rowIndex: index, field: "mpn", severity: "info", message: "SKU is used as MPN.", recommendation: "Confirm the SKU is a real manufacturer part number before using it as MPN." });
    }

    return issues;
  });
}
