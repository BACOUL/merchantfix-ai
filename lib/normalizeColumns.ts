import type { NormalizedColumns, ShopifyCsvRow } from "./types";

const aliases: Record<keyof NormalizedColumns, string[]> = {
  title: ["title"],
  handle: ["handle"],
  gtin: ["gtin", "barcode", "variant barcode"],
  mpn: ["mpn", "manufacturer part number"],
  brand: ["brand", "vendor"],
  sku: ["sku", "variant sku"],
  identifierExists: ["identifier_exists", "identifier exists"],
  image: ["image src", "image", "variant image"],
  price: ["price", "variant price"]
};

export function normalizeColumns(row: ShopifyCsvRow): NormalizedColumns {
  const entries = Object.entries(row).map(([key, value]) => [key.trim().toLowerCase(), value] as const);

  return Object.fromEntries(
    Object.entries(aliases).map(([normalizedKey, possibleNames]) => {
      const match = entries.find(([key]) => possibleNames.includes(key));
      return [normalizedKey, match?.[1]];
    })
  ) as NormalizedColumns;
}
