import {
  CUSTOM_PRODUCT_KEYWORDS,
  type ColumnMappingResult,
  type NormalizedColumns,
  type NormalizedProduct,
  type RawCsvRow
} from "./types";
import { normalizeIdentifierExistsValue } from "./validationRules";

const FIELD_ALIASES: Record<string, string[]> = {
  title: ["title", "product title", "product_title", "name"],
  handle: ["handle", "product handle", "product_handle"],
  brand: ["brand", "google_product_brand", "google product brand"],
  vendor: ["vendor", "shopify vendor", "shopify_vendor"],
  gtin: [
    "variant barcode",
    "variant_barcode",
    "barcode",
    "gtin",
    "product gtin",
    "product_gtin",
    "global trade item number",
    "google_gtin"
  ],
  sku: ["variant sku", "variant_sku", "sku", "product sku", "product_sku"],
  mpn: ["mpn", "manufacturer part number", "manufacturer_part_number", "google mpn", "google_mpn"],
  price: ["variant price", "variant_price", "price", "product price", "product_price", "google_price"],
  image: [
    "image src",
    "image_src",
    "image url",
    "image_url",
    "image_link",
    "image link",
    "google image link",
    "google_image_link"
  ],
  identifierExists: [
    "identifier_exists",
    "identifier exists",
    "google identifier exists",
    "google_identifier_exists",
    "google shopping / identifier exists"
  ],
  googleProductCategory: [
    "google product category",
    "google_product_category",
    "product category",
    "product_category",
    "google_category"
  ],
  customProduct: ["google shopping / custom product"]
};

const IMPORTANT_FIELDS = ["title", "gtin", "mpn", "brand", "identifierExists", "price", "image"];

function normalizeColumnName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeValue(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const trimmed = String(value).trim();
  return trimmed === "" ? null : trimmed;
}

function buildColumnLookup(rawRows: RawCsvRow[]): Map<string, string> {
  const lookup = new Map<string, string>();

  rawRows.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const normalized = normalizeColumnName(column);
      if (!lookup.has(normalized)) {
        lookup.set(normalized, column);
      }
    });
  });

  return lookup;
}

function findMappedColumns(rawRows: RawCsvRow[]): Record<string, string> {
  const lookup = buildColumnLookup(rawRows);
  const mappedColumns: Record<string, string> = {};

  Object.entries(FIELD_ALIASES).forEach(([field, aliases]) => {
    const match = aliases.map(normalizeColumnName).find((alias) => lookup.has(alias));
    if (match) {
      mappedColumns[field] = lookup.get(match) as string;
    }
  });

  return mappedColumns;
}

function getMappedValue(row: RawCsvRow, mappedColumns: Record<string, string>, field: string): string | null {
  const column = mappedColumns[field];
  return column ? normalizeValue(row[column]) : null;
}

function detectCustomSignals(row: RawCsvRow, mappedColumns: Record<string, string>): string[] {
  const haystack = [getMappedValue(row, mappedColumns, "title"), getMappedValue(row, mappedColumns, "handle")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const signals: string[] = CUSTOM_PRODUCT_KEYWORDS.filter((keyword) => haystack.includes(keyword));
  const customProductColumn = mappedColumns.customProduct;
  const customProductValue = customProductColumn ? normalizeIdentifierExistsValue(row[customProductColumn]) : null;

  if (customProductValue === true) {
    signals.push("google shopping custom product");
  }

  return Array.from(new Set(signals));
}

function buildColumnMapping(rawRows: RawCsvRow[], mappedColumns: Record<string, string>): ColumnMappingResult {
  const allColumns = Array.from(new Set(rawRows.flatMap((row) => Object.keys(row))));
  const mappedOriginalColumns = new Set(Object.values(mappedColumns));
  const missingImportantColumns = IMPORTANT_FIELDS.filter((field) => !mappedColumns[field]);
  const warnings = missingImportantColumns.map((field) => `No ${field} column found.`);

  if (!mappedColumns.gtin && !mappedColumns.mpn) {
    warnings.push("No recognizable product identifier columns found.");
  }

  return {
    mappedColumns,
    missingImportantColumns,
    unrecognizedColumns: allColumns.filter((column) => !mappedOriginalColumns.has(column)),
    warnings
  };
}

export function normalizeShopifyRows(rawRows: RawCsvRow[]): {
  products: NormalizedProduct[];
  columnMapping: ColumnMappingResult;
} {
  if (!Array.isArray(rawRows)) {
    throw new Error("normalizeShopifyRows expected an array of raw CSV rows.");
  }

  if (rawRows.length === 0) {
    return {
      products: [],
      columnMapping: {
        mappedColumns: {},
        missingImportantColumns: IMPORTANT_FIELDS,
        unrecognizedColumns: [],
        warnings: ["No rows were available for column normalization."]
      }
    };
  }

  const mappedColumns = findMappedColumns(rawRows);
  const columnMapping = buildColumnMapping(rawRows, mappedColumns);
  const hasRecognizableColumns = Object.keys(mappedColumns).length > 0;

  if (!hasRecognizableColumns) {
    return {
      products: [],
      columnMapping: {
        ...columnMapping,
        warnings: [
          ...columnMapping.warnings,
          "The file does not appear to contain recognizable Shopify product columns."
        ]
      }
    };
  }

  return {
    products: rawRows.map((row, index) => {
      const customProductSignals = detectCustomSignals(row, mappedColumns);
      const identifierExistsColumn = mappedColumns.identifierExists;

      return {
        rowNumber: index + 1,
        originalRow: { ...row },
        title: getMappedValue(row, mappedColumns, "title"),
        handle: getMappedValue(row, mappedColumns, "handle"),
        brand: getMappedValue(row, mappedColumns, "brand"),
        vendor: getMappedValue(row, mappedColumns, "vendor"),
        gtin: getMappedValue(row, mappedColumns, "gtin"),
        mpn: getMappedValue(row, mappedColumns, "mpn"),
        sku: getMappedValue(row, mappedColumns, "sku"),
        price: getMappedValue(row, mappedColumns, "price"),
        image: getMappedValue(row, mappedColumns, "image"),
        identifierExists: identifierExistsColumn ? normalizeIdentifierExistsValue(row[identifierExistsColumn]) : null,
        googleProductCategory: getMappedValue(row, mappedColumns, "googleProductCategory"),
        isPossibleCustomProduct: customProductSignals.length > 0,
        customProductSignals
      };
    }),
    columnMapping
  };
}

export function normalizeColumns(row: RawCsvRow): NormalizedColumns {
  const product = normalizeShopifyRows([row]).products[0];

  return {
    title: product?.title,
    handle: product?.handle,
    gtin: product?.gtin,
    mpn: product?.mpn,
    brand: product?.brand,
    vendor: product?.vendor,
    sku: product?.sku,
    identifierExists: product?.identifierExists,
    image: product?.image,
    price: product?.price
  };
}
