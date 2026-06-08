import type { ShopifyCsvRow } from "./types";

export function generateCorrectedCsv(rows: ShopifyCsvRow[]): ShopifyCsvRow[] {
  return rows.map((row) => ({
    ...row,
    merchantfix_notes: row.merchantfix_notes ?? "Manual review may be required. MerchantFix.ai does not invent GTIN, MPN, or brand values."
  }));
}
