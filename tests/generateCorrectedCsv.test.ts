import Papa from "papaparse";
import { describe, expect, it } from "vitest";
import { detectIdentifierIssues } from "../lib/detectIdentifierIssues";
import { generateCorrectedCsv } from "../lib/generateCorrectedCsv";
import { normalizeShopifyRows } from "../lib/normalizeColumns";
import type { RawCsvRow } from "../lib/types";

function buildResult(rows: RawCsvRow[]) {
  const { products } = normalizeShopifyRows(rows);
  const issues = detectIdentifierIssues(products);

  return generateCorrectedCsv({
    sessionId: "corrected-test",
    products,
    issues,
    originalRows: rows
  });
}

function parseCorrectedCsv(csv: string): RawCsvRow[] {
  return Papa.parse<RawCsvRow>(csv, { header: true, skipEmptyLines: "greedy" }).data;
}

describe("generateCorrectedCsv", () => {
  it("preserves original columns", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "" }]);

    expect(result.correctedCsv.split("\n")[0]).toContain("Title");
    expect(result.correctedCsv.split("\n")[0]).toContain("Variant Barcode");
    expect(result.correctedCsv.split("\n")[0]).toContain("merchantfix_notes");
  });

  it("preserves original rows", () => {
    const result = buildResult([
      { Title: "Product One", "Variant SKU": "SKU-1" },
      { Title: "Product Two", "Variant SKU": "SKU-2" }
    ]);

    expect(parseCorrectedCsv(result.correctedCsv)).toHaveLength(2);
  });

  it("adds merchantfix_notes for rows with issues", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0].merchantfix_notes).toContain("Missing GTIN");
  });

  it("does not invent GTIN", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "Example Brand" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0]["Variant Barcode"]).toBe("");
    expect(rows[0].merchantfix_notes).toContain("Do not invent a GTIN");
  });

  it("does not invent MPN", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "Example Brand" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0].MPN).toBe("");
    expect(rows[0].merchantfix_notes).toContain("Missing MPN");
  });

  it("does not invent brand", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "1234567890123", Brand: "" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0].Brand).toBe("");
    expect(rows[0].merchantfix_notes).toContain("Do not invent a brand");
  });

  it("does not copy SKU to MPN automatically", () => {
    const result = buildResult([{ Title: "Product", "Variant SKU": "SKU-1", MPN: "", "Variant Barcode": "" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0].MPN).toBe("");
    expect(rows[0]["Variant SKU"]).toBe("SKU-1");
  });

  it("returns manual review rows", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "" }]);

    expect(result.manualReviewRows).toHaveLength(1);
  });

  it("escapes CSV values safely", () => {
    const result = buildResult([{ Title: 'Mug, "Large"\nBlue', "Variant Barcode": "", MPN: "", Brand: "" }]);
    const rows = parseCorrectedCsv(result.correctedCsv);

    expect(rows[0].Title).toBe('Mug, "Large"\nBlue');
  });

  it("includes the mandatory disclaimer", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "" }]);

    expect(result.disclaimer).toContain("Google approval is not guaranteed");
  });

  it("does not include unsafe promises or generated identifiers", () => {
    const result = buildResult([{ Title: "Product", "Variant Barcode": "", MPN: "", Brand: "" }]);
    const output = `${result.correctedCsv}\n${result.notes.join("\n")}`;

    expect(output).not.toMatch(/Google approval is guaranteed/i);
    expect(output).not.toMatch(/account recovery is guaranteed/i);
    expect(output).not.toMatch(/misrepresentation recovery/i);
    expect(output).not.toMatch(/generated GTIN/i);
    expect(output).not.toMatch(/generated MPN/i);
    expect(output).not.toMatch(/generated brand/i);
  });
});
