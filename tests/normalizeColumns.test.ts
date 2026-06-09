import { describe, expect, it } from "vitest";
import { normalizeShopifyRows } from "../lib/normalizeColumns";
import type { RawCsvRow } from "../lib/types";

describe("normalizeShopifyRows", () => {
  it("maps common Shopify columns", () => {
    const row: RawCsvRow = {
      Title: "Handmade Bracelet",
      Handle: "handmade-bracelet",
      Vendor: "Studio Example",
      "Variant Barcode": "1234567890123",
      "Variant SKU": "HB-001",
      "Variant Price": "29.90",
      "Image Src": "https://example.com/image.jpg",
      identifier_exists: "TRUE"
    };

    const { products } = normalizeShopifyRows([row]);

    expect(products[0]).toMatchObject({
      rowNumber: 1,
      title: "Handmade Bracelet",
      handle: "handmade-bracelet",
      vendor: "Studio Example",
      gtin: "1234567890123",
      sku: "HB-001",
      price: "29.90",
      image: "https://example.com/image.jpg",
      identifierExists: true,
      originalRow: row
    });
  });

  it("handles lowercase and alternative columns", () => {
    const { products } = normalizeShopifyRows([
      {
        title: "Classic Mug",
        handle: "classic-mug",
        brand: "Example Brand",
        gtin: "1234567890123",
        sku: "MUG-1",
        mpn: "MUG-MPN",
        price: "12.00",
        image_link: "https://example.com/mug.jpg",
        "Identifier Exists": "yes"
      }
    ]);

    expect(products[0]).toMatchObject({
      title: "Classic Mug",
      brand: "Example Brand",
      gtin: "1234567890123",
      mpn: "MUG-MPN",
      image: "https://example.com/mug.jpg",
      identifierExists: true
    });
  });

  it("does not crash when important columns are missing", () => {
    const { products, columnMapping } = normalizeShopifyRows([{ Title: "Simple Product", "Variant SKU": "SKU-1" }]);

    expect(products).toHaveLength(1);
    expect(products[0].gtin).toBeNull();
    expect(products[0].mpn).toBeNull();
    expect(columnMapping.missingImportantColumns).toContain("gtin");
  });

  it("detects possible custom product signals cautiously", () => {
    const { products } = normalizeShopifyRows([{ Title: "Custom Handmade Bracelet", Handle: "custom-handmade-bracelet" }]);

    expect(products[0].isPossibleCustomProduct).toBe(true);
    expect(products[0].customProductSignals).toEqual(expect.arrayContaining(["custom", "handmade"]));
  });

  it("does not mutate original rows", () => {
    const row: RawCsvRow = { Title: "Original Product", "Variant SKU": "SKU-1" };
    const before = { ...row };

    normalizeShopifyRows([row]);

    expect(row).toEqual(before);
  });
});
