import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { missingIdentifiersGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Shopify Missing Product Identifiers | MerchantFix.ai",
  description:
    "Understand Shopify missing product identifiers across GTIN, MPN, brand, and identifier_exists fields."
};

export default function ShopifyMissingProductIdentifiersPage() {
  return <SeoGuidePage {...missingIdentifiersGuide} />;
}
