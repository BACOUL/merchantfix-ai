import type { SurfaceProduct, SurfaceRisk, SurfaceRiskCode } from "./types";

function createSurfaceRisk(input: {
  product: SurfaceProduct;
  riskCode: SurfaceRiskCode;
  type: NonNullable<SurfaceRisk["type"]>;
  severity: SurfaceRisk["severity"];
  field: string;
  currentValue: string | null;
  message: string;
  suggestedFix: string;
}): SurfaceRisk {
  return {
    riskCode: input.riskCode,
    type: input.type,
    severity: input.severity,
    category: "surface_scan",
    fixType: "surface_risk_only",
    productId: input.product.id,
    productTitle: input.product.title ?? null,
    productHandle: input.product.handle ?? null,
    field: input.field,
    currentValue: input.currentValue,
    explanation: input.message,
    suggestedFix: input.suggestedFix,
    surfaceOnly: true,
    manualReviewRequired: false,
    message: input.message
  };
}

export function detectSurfaceRisks(products: SurfaceProduct[]): SurfaceRisk[] {
  return products.flatMap((product) => {
    const risks: SurfaceRisk[] = [];
    const title = product.title?.trim() ?? "";
    const description = product.description?.trim() ?? "";
    const image = product.image ?? product.imageUrl ?? null;

    if (!image) {
      risks.push(
        createSurfaceRisk({
          product,
          riskCode: "surface_missing_image",
          type: "missing_image",
          severity: "warning",
          field: "image",
          currentValue: null,
          message: "Product has no visible image.",
          suggestedFix: "Review the product image in Shopify. This surface scan is not a full Merchant Center diagnosis."
        })
      );
    }

    if (!product.price) {
      risks.push(
        createSurfaceRisk({
          product,
          riskCode: "surface_missing_price",
          type: "missing_price",
          severity: "warning",
          field: "price",
          currentValue: null,
          message: "Product has no visible price.",
          suggestedFix: "Review the product price in Shopify. This surface scan is not a full Merchant Center diagnosis."
        })
      );
    }

    if (title.length < 12) {
      risks.push(
        createSurfaceRisk({
          product,
          riskCode: "surface_weak_title",
          type: "weak_title",
          severity: "info",
          field: "title",
          currentValue: title,
          message: "Product title appears short.",
          suggestedFix: "Review the product title for clarity before deeper CSV diagnosis."
        })
      );
    }

    if (description.length < 40) {
      risks.push(
        createSurfaceRisk({
          product,
          riskCode: "surface_weak_description",
          type: "weak_description",
          severity: "info",
          field: "description",
          currentValue: description,
          message: "Product description appears weak or empty.",
          suggestedFix: "Review the product description for clarity before deeper CSV diagnosis."
        })
      );
    }

    return risks;
  });
}
