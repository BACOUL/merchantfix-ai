import { describe, expect, it } from "vitest";
import { analyzeShopifyCsv } from "../lib/analyzeShopifyCsv";

describe("analyzeShopifyCsv", () => {
  it("handles empty CSV text", () => {
    const result = analyzeShopifyCsv({ csvText: "", sessionId: "empty-test" });

    expect(result.status).toBe("error");
    expect(result.totalProducts).toBe(0);
    expect(result.summary).toContain("empty");
    expect(result.recommendedActions.join(" ")).toContain("valid Shopify CSV");
    expect(result.disclaimer).toContain("Google approval is not guaranteed");
  });

  it("analyzes a clean CSV without false critical errors", () => {
    const csvText = [
      "Title,Handle,Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists",
      "Classic Mug,classic-mug,Example Brand,1234567890123,MUG-MPN,MUG-SKU,12.00,https://example.com/mug.jpg,true"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "clean-test" });

    expect(result.status).toBe("success");
    expect(result.totalProducts).toBe(1);
    expect(result.criticalCount).toBe(0);
    expect(result.disclaimer).toContain("Google approval is not guaranteed");
  });

  it("detects missing GTIN and identifier_exists conflicts", () => {
    const csvText = [
      "Title,Handle,Vendor,Variant Barcode,MPN,Variant SKU,Variant Price,Image Src,identifier_exists",
      "Branded Shirt,branded-shirt,Example Brand,,,SHIRT-1,29.00,https://example.com/shirt.jpg,true"
    ].join("\n");
    const result = analyzeShopifyCsv({ csvText, sessionId: "missing-gtin-test" });

    expect(result.criticalCount).toBeGreaterThan(0);
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
  });

  it("returns an error for unrecognized columns", () => {
    const result = analyzeShopifyCsv({ csvText: "Foo,Bar\none,two", sessionId: "bad-columns-test" });

    expect(result.status).toBe("error");
    expect(result.summary).toContain("recognizable Shopify product columns");
    expect(result.issues.some((issue) => issue.issueCode === "unrecognized_columns")).toBe(true);
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
      csvText: "Title,Vendor,Variant Barcode,MPN,Variant Price,Image Src\nProduct,Brand,1234567890123,MPN,10.00,https://example.com/image.jpg"
    });

    expect(result.sessionId).toBeTruthy();
    expect(result.createdAt).toBeTruthy();
  });
});
