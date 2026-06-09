import { NextRequest, NextResponse } from "next/server";
import { calculateSurfaceRiskScore } from "@/lib/calculateSurfaceRiskScore";
import { detectSurfaceRisks } from "@/lib/detectSurfaceRisks";
import { fetchPublicShopifyProducts } from "@/lib/fetchPublicShopifyProducts";
import { normalizeStoreUrl } from "@/lib/normalizeStoreUrl";
import { SURFACE_SCAN_DISCLAIMER, type SurfaceScanProduct, type SurfaceScanResult } from "@/lib/types";

async function readStoreUrl(request: NextRequest): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as { storeUrl?: unknown; url?: unknown };
    return String(body.storeUrl ?? body.url ?? "");
  }

  if (contentType.includes("form-data")) {
    const formData = await request.formData();
    return String(formData.get("storeUrl") ?? formData.get("url") ?? "");
  }

  return "";
}

function hasPublicHostname(normalizedUrl: string): boolean {
  try {
    const hostname = new URL(normalizedUrl).hostname.toLowerCase();
    return hostname.includes(".") && hostname !== "localhost" && !hostname.startsWith("127.") && !hostname.startsWith("10.");
  } catch {
    return false;
  }
}

function createResult(input: {
  storeUrl: string;
  normalizedStoreUrl: string | null;
  status: SurfaceScanResult["status"];
  products: SurfaceScanProduct[];
  summary: string;
  recommendedActions: string[];
  errorMessage?: string | null;
}): SurfaceScanResult {
  const risks = detectSurfaceRisks(input.products);
  const riskScore = calculateSurfaceRiskScore(input.products.length, risks);
  const affectedProductIds = new Set(risks.map((risk) => risk.productId).filter((id) => id !== null && id !== undefined));
  const affectedProducts = input.products.filter((product) => product.id !== null && product.id !== undefined && affectedProductIds.has(product.id));

  return {
    scanId: crypto.randomUUID(),
    status: input.status,
    storeUrl: input.storeUrl,
    normalizedStoreUrl: input.normalizedStoreUrl,
    totalProducts: input.products.length,
    productsScanned: input.products.length,
    riskScore,
    riskCount: risks.length,
    warningCount: risks.filter((risk) => risk.severity === "warning").length,
    infoCount: risks.filter((risk) => risk.severity === "info").length,
    detectedRisks: risks,
    affectedProducts,
    summary: input.summary,
    recommendedActions: input.recommendedActions,
    csvUploadRecommended: true,
    disclaimer: SURFACE_SCAN_DISCLAIMER,
    createdAt: new Date().toISOString(),
    errorMessage: input.errorMessage ?? null,
    risks,
    score: riskScore,
    productCount: input.products.length
  };
}

export async function POST(request: NextRequest) {
  const storeUrl = await readStoreUrl(request);
  const normalizedStoreUrl = normalizeStoreUrl(storeUrl);

  if (!normalizedStoreUrl || !hasPublicHostname(normalizedStoreUrl)) {
    const result = createResult({
      storeUrl,
      normalizedStoreUrl: null,
      status: "failed",
      products: [],
      summary: "The Shopify store URL could not be normalized.",
      recommendedActions: ["Enter a full public Shopify store URL, for example https://example-store.myshopify.com."],
      errorMessage: "Invalid Shopify store URL."
    });

    return NextResponse.json({ result }, { status: 400 });
  }

  const products = await fetchPublicShopifyProducts(normalizedStoreUrl);

  if (products.length === 0) {
    const result = createResult({
      storeUrl,
      normalizedStoreUrl,
      status: "unsupported",
      products: [],
      summary: "Public Shopify product data could not be read for this store.",
      recommendedActions: [
        "Confirm the store URL is correct and publicly accessible.",
        "If public product data is unavailable, use the Shopify CSV diagnostic instead."
      ],
      errorMessage: "Public /products.json data is unavailable for this store."
    });

    return NextResponse.json({ result }, { status: 200 });
  }

  const risks = detectSurfaceRisks(products);
  const result = createResult({
    storeUrl,
    normalizedStoreUrl,
    status: risks.length > 0 ? "partial" : "success",
    products,
    summary:
      risks.length > 0
        ? `Scanned ${products.length} public Shopify products and found ${risks.length} visible surface risks.`
        : `Scanned ${products.length} public Shopify products and found no visible surface risks in the supported checks.`,
    recommendedActions:
      risks.length > 0
        ? ["Review affected products in Shopify.", "Upload a Shopify CSV for deeper GTIN, MPN, brand, and identifier_exists diagnosis."]
        : ["Upload a Shopify CSV if Merchant Center still reports identifier errors."]
  });

  return NextResponse.json({ result });
}
