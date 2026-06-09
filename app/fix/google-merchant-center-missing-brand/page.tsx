import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { missingBrandGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Brand | MerchantFix.ai",
  description:
    "Check Shopify product data for missing or weak brand fields before they affect Google Merchant Center diagnostics."
};

export default function MissingBrandPage() {
  return <SeoGuidePage {...missingBrandGuide} />;
}
