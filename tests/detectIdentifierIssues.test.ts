import { describe, expect, it } from "vitest";
import { detectIdentifierIssues } from "../lib/detectIdentifierIssues";
import type { MerchantCenterErrorContext, NormalizedProduct } from "../lib/types";

function merchantContext(overrides: Partial<MerchantCenterErrorContext> = {}): MerchantCenterErrorContext {
  return {
    rawErrorText: "",
    detectedErrorKeywords: [],
    mentionsGtin: false,
    mentionsMpn: false,
    mentionsIdentifierExists: false,
    mentionsBrand: false,
    mentionsTitle: false,
    mentionsDescription: false,
    mentionsLink: false,
    mentionsImage: false,
    mentionsPrice: false,
    mentionsAvailability: false,
    mentionsColor: false,
    mentionsSize: false,
    mentionsAgeGroup: false,
    mentionsGender: false,
    mentionsCustomProduct: false,
    mentionsDisapproved: false,
    mentionsLimitedPerformance: false,
    ...overrides
  };
}

function product(overrides: Partial<NormalizedProduct>): NormalizedProduct {
  return {
    rowNumber: 1,
    originalRow: {},
    title: "Example Product",
    handle: "example-product",
    description: "A clear product description based on the real item.",
    link: "https://example.com/products/example-product",
    brand: "Example Brand",
    vendor: null,
    gtin: "1234567890123",
    mpn: "MPN-1",
    sku: "SKU-1",
    price: "10.00",
    image: "https://example.com/image.jpg",
    availability: "in_stock",
    color: "Blue",
    size: "M",
    ageGroup: "adult",
    gender: "unisex",
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

  it("detects missing title and description as manual review rows", () => {
    const issues = detectIdentifierIssues([product({ title: null, description: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_title" && issue.manualReviewRequired)).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_description" && issue.manualReviewRequired)).toBe(true);
  });

  it("detects risky title only when Merchant Center title context is present", () => {
    const riskyProduct = product({ title: "FREE SHIPPING BEST PRICE" });

    expect(detectIdentifierIssues([riskyProduct]).some((issue) => issue.issueCode === "invalid_title")).toBe(false);
    expect(
      detectIdentifierIssues([riskyProduct], merchantContext({ mentionsTitle: true })).some(
        (issue) => issue.issueCode === "invalid_title"
      )
    ).toBe(true);
  });

  it("detects context-sensitive availability, link, and apparel attribute issues", () => {
    const issues = detectIdentifierIssues(
      [product({ availability: "coming_soon", link: null, color: null, size: null, ageGroup: null, gender: null })],
      merchantContext({
        mentionsAvailability: true,
        mentionsLink: true,
        mentionsColor: true,
        mentionsSize: true,
        mentionsAgeGroup: true,
        mentionsGender: true
      })
    );

    expect(issues.some((issue) => issue.issueCode === "invalid_availability")).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_link")).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_color")).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_size")).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_age_group")).toBe(true);
    expect(issues.some((issue) => issue.issueCode === "missing_gender")).toBe(true);
  });

  it("does not flag apparel attributes without matching Merchant Center context", () => {
    const issues = detectIdentifierIssues([product({ color: null, size: null, ageGroup: null, gender: null })]);

    expect(issues.some((issue) => issue.issueCode === "missing_color")).toBe(false);
    expect(issues.some((issue) => issue.issueCode === "missing_size")).toBe(false);
    expect(issues.some((issue) => issue.issueCode === "missing_age_group")).toBe(false);
    expect(issues.some((issue) => issue.issueCode === "missing_gender")).toBe(false);
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