import type { SurfaceProduct, SurfaceRisk } from "./types";

export function detectSurfaceRisks(products: SurfaceProduct[]): SurfaceRisk[] {
  return products.flatMap((product) => {
    const risks: SurfaceRisk[] = [];
    const title = product.title?.trim() ?? "";
    const description = product.description?.trim() ?? "";

    if (!product.imageUrl) {
      risks.push({ productId: product.id, type: "missing_image", severity: "warning", message: "Product has no visible image." });
    }

    if (!product.price) {
      risks.push({ productId: product.id, type: "missing_price", severity: "warning", message: "Product has no visible price." });
    }

    if (title.length < 12) {
      risks.push({ productId: product.id, type: "weak_title", severity: "info", message: "Product title appears short." });
    }

    if (description.length < 40) {
      risks.push({ productId: product.id, type: "weak_description", severity: "info", message: "Product description appears weak or empty." });
    }

    return risks;
  });
}
