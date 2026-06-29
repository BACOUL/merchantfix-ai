import { describe, expect, it } from "vitest";
import { analyzeShopifyCsv } from "../lib/analyzeShopifyCsv";

describe("analyzeShopifyCsv", () => {
  it("handles empty CSV text with customer-facing recovery steps", () => {
    const result = analyzeShopifyCsv({ csvText: "", sessionId: "empty-test" });

    expect(result.status).toBe("error");
    expect(result.sessionId).toBe("empty-test");
    expect(result.totalProducts).toBe(0);
    expect(result.correctedCsvAvailable).toBe(false);
    expect(result.summary).toContain("empty");
    expect(result.recommendedActions.join(" ")).toContain("Export a fresh Shopify product CSV");
    expect(result.recommendedActions.join(" ")).toContain("Title");
    expect(result.recommendedActions.join(" ")).toContain("Variant Barcode");
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].issueCode).toBe("empty_file");
    expect(result.issues[0].category).toBe("system");
    expect(result.disclaimer).toContain("Google approval is not guaranteed");
  });

  it("handles CSV with headers but no product rows", () => {
    const result = analyzeShopifyCsv({
      csvText: "Title,Handle,Vendor,Variant Barcode,Variant Price,Image Src\n",
      sessionId: "header-only-test"
    });

    expect(result.status).toBe("error");
    expect(result.totalProducts).toBe(0);
    expect(result.correctedCsvAvailable).toBe(false);
    expect(result.summary).toContain("header");
    expect(result.summary).toContain("no product rows");
    expect(result.issues.some((issue) => issue.issueCode === "empty_file")).toBe(true);
    expect(result.detectedCategories).toEqual(["system"]);
  });

  it("returns an error for unrecognized non-Shopify columns with clear recovery copy", () => {
    const result = analyzeShopifyCsv({ csvText: "Foo,Bar\none,two", sessionId: "bad-columns-test" });

    expect(result.status).toBe("error");
    expect(result.totalProducts).toBe(0);
    expect(result.correctedCsvAvailable).toBe(false);
    expect(result.summary).toContain("does not appear to be a Shopify product CSV");
    expect(result.summary).toContain("Title");
    expect(result.summary).toContain("Variant SKU");
    expect(result.recommendedActions.join(" ")).toContain("Do not upload a Google Merchant Center feed export");
    expect(result.issues.some((issue) => issue.issueCode === "unrecognized_columns")).toBe(true);
    expect(result.issues[0].suggestedFix).toContain("Shopify product CSV export");
  });

  it("returns an invalid CSV error for malformed CSV input", () => {
    const result = analyzeShopifyCsv({
      csvText: "Title,Handle,Variant Barcode\n\"Broken product,broken-product,1234567890123",
      sessionId: "malformed-csv-test"
    });

    expect(result.status).toBe("error");
    expect(result.totalProducts).toBe(0);
    expect(result.correctedCsvAvailable).toBe(false);
    expect(result.summary).toContain("could not be read as a valid CSV");
    expect(result.recommendedActions.join(" ")).toContain("fresh Shopify product CSV");
    expect(result.issues.some((issue) => issue.issueCode === "invalid_csv")).toBe(true);
  });

  it("preserves pasted Merchant Center warning context even when upload fails", () => {
    const result = analyzeShopifyCsv({
      csvText: "",
      merchantCenterErrorText: "Missing value [gtin] and identifier_exists conflict",
      sessionId: "error-context-test"
    });

    expect(result.status).toBe("error");
    expect(result.merchantCenterErrorContext?.mentionsGtin).toBe(true);
    expect(result.merchantCenterErrorContext?.mentionsIdentifierExists).toBe(true);
    expect(result.merchantCenterErrorContext?.detectedErrorKeywords).toEqual(expect.arrayContaining(["gtin", "identifier_exists"]));
  });

  it("analyzes a clean CSV without false critical errors", () => {
    const csvText = [
      "Title,Handle,Body (HTML),Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists",
      "Classic Mug,classic-mug,A clear ceramic mug description.,Example Brand,1234567890123,MUG-MPN,MUG-SKU,12.00,https://example.com/mug.jpg,true"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "clean-test" });

    expect(result.status).toBe("success");
    expect(result.totalProducts).toBe(1);
    expect(result.criticalCount).toBe(0);
    expect(result.correctedCsvAvailable).toBe(false);
    expect(result.disclaimer).toContain("Google approval is not guaranteed");
  });

  it("detects missing GTIN and identifier_exists conflicts", () => {
    const csvText = [
      "Title,Handle,Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists",
      "Branded Shirt,branded-shirt,Example Brand,,,SHIRT-1,29.00,https://example.com/shirt.jpg,true"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "missing-gtin-test" });

    expect(result.criticalCount).toBeGreaterThan(0);
    expect(result.correctedCsvAvailable).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "identifier_exists_conflict")).toBe(true);
    expect(result.recommendedActions.join(" ")).toContain("Do not invent GTIN");
  });

  it("flags custom products for manual review without generating identifiers", () => {
    const csvText = [
      "Title,Handle,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src",
      "Custom Handmade Bracelet,custom-handmade-bracelet,,,HB-1,35.00,https://example.com/bracelet.jpg"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "custom-test" });

    expect(result.issues.some((issue) => issue.issueCode === "possible_custom_product")).toBe(true);
    expect(result.recommendedActions.join(" ")).toContain("custom");
    expect(result.issues.some((issue) => issue.manualReviewRequired)).toBe(true);
  });

  it("detects expanded product-data gaps in CSV rows", () => {
    const csvText = [
      "Title,Handle,Body (HTML),Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists",
      ",missing-content,,Example Brand,1234567890123,MPN-1,SKU-1,,https://example.com/image.jpg,true"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "expanded-gaps-test" });

    expect(result.status).toBe("warning");
    expect(result.issues.some((issue) => issue.issueCode === "missing_title")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_description")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_price")).toBe(true);
    expect(result.recommendedActions.join(" ")).toContain("product descriptions");
  });

  it("uses pasted Merchant Center context for availability, link, and apparel checks", () => {
    const csvText = [
      "Title,Handle,Body (HTML),Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists,Availability,Color,Size,age_group,Gender",
      "Blue Shirt,blue-shirt,A clear shirt description.,Example Brand,1234567890123,MPN-1,SKU-1,29.00,https://example.com/shirt.jpg,true,coming_soon,,,,"
    ].join("\n");
    const result = analyzeShopifyCsv({
      csvText,
      merchantCenterErrorText: "Invalid value [availability]. Missing value [color]. Missing value [size]. Missing value [age_group]. Missing value [gender]. Invalid value [link].",
      sessionId: "contextual-fields-test"
    });

    expect(result.issues.some((issue) => issue.issueCode === "invalid_availability")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_color")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_size")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_age_group")).toBe(true);
    expect(result.issues.some((issue) => issue.issueCode === "missing_gender")).toBe(true);
    expect(result.detectedCategories).toEqual(expect.arrayContaining(["availability", "apparel"]));
    expect(result.recommendedActions.join(" ")).toContain("availability");
  });

  it("returns detected categories", () => {
    const result = analyzeShopifyCsv({
      csvText: "Title,Variant SKU,Variant Price\nExample Product,SKU-1,10.00",
      sessionId: "category-test"
    });

    expect(result.detectedCategories).toEqual(expect.arrayContaining(["identifier"]));
  });

  it("returns createdAt and sessionId", () => {
    const result = analyzeShopifyCsv({
      csvText: "Title,Body (HTML),Vendor,Variant Barcode,MPN,Variant Price,Image Src\nProduct,Description,Brand,1234567890123,MPN,10.00,https://example.com/image.jpg"
    });

    expect(result.sessionId).toBeTruthy();
    expect(result.createdAt).toBeTruthy();
  });
});