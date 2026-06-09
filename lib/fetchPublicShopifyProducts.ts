import type { SurfaceProduct } from "./types";

type ShopifyProductJson = {
  products?: Array<{
    id?: string | number;
    title?: string;
    handle?: string;
    body_html?: string | null;
    vendor?: string | null;
    product_type?: string | null;
    images?: Array<{ src?: string | null }>;
    image?: { src?: string | null } | null;
    variants?: Array<{ price?: string | number | null; available?: boolean | null }>;
  }>;
};

function stripHtml(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const text = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text || null;
}

function getFirstPrice(product: NonNullable<ShopifyProductJson["products"]>[number]): string | number | null {
  const variant = product.variants?.find((item) => item.price !== null && item.price !== undefined && String(item.price).trim() !== "");
  return variant?.price ?? null;
}

export async function fetchPublicShopifyProducts(storeUrl: string): Promise<SurfaceProduct[]> {
  const baseUrl = storeUrl.replace(/\/$/, "");
  const productsUrl = `${baseUrl}/products.json?limit=50`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(productsUrl, {
      headers: {
        accept: "application/json"
      },
      signal: controller.signal
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ShopifyProductJson;

    return (payload.products ?? []).map((product) => {
      const image = product.image?.src ?? product.images?.find((item) => item.src)?.src ?? null;
      const price = getFirstPrice(product);

      return {
        id: product.id ?? null,
        title: product.title ?? null,
        handle: product.handle ?? null,
        url: product.handle ? `${baseUrl}/products/${product.handle}` : null,
        image,
        imageUrl: image,
        price,
        description: stripHtml(product.body_html),
        vendor: product.vendor ?? null,
        productType: product.product_type ?? null,
        available: product.variants?.some((variant) => variant.available) ?? null,
        rawProduct: product
      };
    });
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
