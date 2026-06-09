import { describe, expect, it } from "vitest";
import { detectIdentifierIssues } from "../lib/detectIdentifierIssues";
import type { NormalizedProduct } from "../lib/types";

function product(overrides: Partial<NormalizedProduct>): NormalizedProduct {
  return {
    rowNumber: 1,
    originalRow: {},
    title: "Example Product",
    handle: "example-product",
    brand: "Example Brand",
    vendor: null,
    gtin: "1234567890123",
    mpn: "MPN-1",
    sku: "SKU-1",
    price: "10.00",
    image: "https://example.com/image.jpg",
    identifierExists: true,
    googleProductCategory: null,
    isPossibleCustomProduct: false,
    customProductSignals: [],
    ...overrides
  };
}

describe("detectIdentifierIssues", () => {
  it("detects identifier_exists conflicts", () => {
    const issues = detectIdentifierIssues([product({ identifierExists: true, gtin: null, mpn: null })]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          issueCode: "identifier_exists_conflict",
          severity: "critical",
          manualReviewRequired: true,
          autoFixable: false
        })
      ])
    );
  });

  it("detects missing GTIN warnings", () => {
    const issues = detectIdentifierIssues([product({ gtin: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_gtin" && issue.severity === "warning")).toBe(true);
  });

  it("detects missing MPN warnings when GTIN is also missing", () => {
    const issues = detectIdentifierIssues([product({ gtin: null, mpn: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_mpn" && issue.severity === "warning")).toBe(true);
  });

  it("detects missing brand when brand and vendor are missing", () => {
    const issues = detectIdentifierIssues([product({ brand: null, vendor: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_brand")).toBe(true);
  });

  it("detects missing identifier_exists as info", () => {
    const issues = detectIdentifierIssues([product({ identifierExists: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_identifier_exists" && issue.severity === "info")).toBe(true);
  });

  it("detects invalid GTIN format", () => {
    const issues = detectIdentifierIssues([product({ gtin: "ABC123" })]);

    expect(issues.some((issue) => issue.issueCode === "invalid_gtin_format")).toBe(true);
  });

  it("detects invalid GTIN length", () => {
    const issues = detectIdentifierIssues([product({ gtin: "12345" })]);

    expect(issues.some((issue) => issue.issueCode === "invalid_gtin_length")).toBe(true);
  });

  it("detects duplicate GTIN values for affected rows", () => {
    const issues = detectIdentifierIssues([
      product({ rowNumber: 1, gtin: "1234567890123" }),
      product({ rowNumber: 2, title: "Second Product", gtin: "1234567890123" })
    ]);

    expect(issues.filter((issue) => issue.issueCode === "duplicate_gtin")).toHaveLength(2);
  });

  it("detects SKU identical to MPN", () => {
    const issues = detectIdentifierIssues([product({ sku: "SAME-1", mpn: "SAME-1" })]);

    expect(issues.some((issue) => issue.issueCode === "sku_same_as_mpn" && issue.severity === "info")).toBe(true);
  });

  it("detects possible custom products with missing identifiers", () => {
    const issues = detectIdentifierIssues([
      product({
        title: "Custom Handmade Bracelet",
        gtin: null,
        mpn: null,
        isPossibleCustomProduct: true,
        customProductSignals: ["custom", "handmade"]
      })
    ]);

    expect(issues.some((issue) => issue.issueCode === "possible_custom_product" && issue.manualReviewRequired)).toBe(true);
  });

  it("orders critical issues before warnings and info", () => {
    const issues = detectIdentifierIssues([
      product({ rowNumber: 2, identifierExists: null, gtin: null, mpn: null }),
      product({ rowNumber: 1, identifierExists: true, gtin: null, mpn: null })
    ]);

    expect(issues[0].severity).toBe("critical");
    expect(issues.at(-1)?.severity).toBe("info");
  });

  it("does not mutate products", () => {
    const input = product({ gtin: null, mpn: null });
    const before = structuredClone(input);

    detectIdentifierIssues([input]);

    expect(input).toEqual(before);
  });
});
