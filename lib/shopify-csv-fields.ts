export type ShopifyCsvField = {
  field: string;
  usedFor: string;
  priority: "Required" | "Recommended" | "Useful";
};

export const shopifyCsvFields: ShopifyCsvField[] = [
  { field: "Handle", usedFor: "Keeps product rows grouped and traceable in the diagnostic report.", priority: "Required" },
  { field: "Title", usedFor: "Detects weak titles, missing context, and product-family clues.", priority: "Required" },
  { field: "Body HTML / Description", usedFor: "Flags thin descriptions and weak visible product context.", priority: "Recommended" },
  { field: "Vendor", usedFor: "Often maps to brand; useful for missing brand checks.", priority: "Required" },
  { field: "Type / Product Type", usedFor: "Helps separate product families and likely identifier expectations.", priority: "Useful" },
  { field: "Tags", usedFor: "Adds context for custom, handmade, vintage, bundle, or private-label products.", priority: "Useful" },
  { field: "Variant SKU", usedFor: "Detects risky SKU-as-MPN patterns and duplicate internal references.", priority: "Recommended" },
  { field: "Variant Barcode", usedFor: "Primary Shopify field for GTIN / UPC / EAN / ISBN checks.", priority: "Required" },
  { field: "Variant Price", usedFor: "Flags missing or suspicious price values in CSV context.", priority: "Recommended" },
  { field: "Variant Inventory Qty", usedFor: "Supports availability and inventory review when present.", priority: "Useful" },
  { field: "Variant Inventory Policy", usedFor: "Supports availability mismatch review when present.", priority: "Useful" },
  { field: "Image Src", usedFor: "Flags missing image URLs and weak image coverage.", priority: "Recommended" },
  { field: "Status", usedFor: "Separates active, draft, archived, or hidden products when available.", priority: "Recommended" },
  { field: "Google Shopping / Google Product Category", usedFor: "Useful for feed context when exported by Shopify or a feed app.", priority: "Useful" },
  { field: "Google Shopping / Custom Product", usedFor: "Useful for identifier_exists and custom product review when available.", priority: "Useful" }
];
