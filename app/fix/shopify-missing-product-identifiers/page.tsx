import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingIdentifiersGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Shopify Missing Product Identifiers | MerchantFix.ai",
  description:
    "Understand Shopify missing product identifiers across GTIN, MPN, brand, and identifier_exists fields.",
  alternates: {
    canonical: canonical("/fix/shopify-missing-product-identifiers")
  }
};

export default function ShopifyMissingProductIdentifiersPage() {
  return <SeoGuidePage {...missingIdentifiersGuide} />;
}
