import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingBrandGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Brand | MerchantFix.ai",
  description:
    "Check Shopify product data for missing or weak brand fields before they affect Google Merchant Center diagnostics.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-brand")
  }
};

export default function MissingBrandPage() {
  return <SeoGuidePage {...missingBrandGuide} />;
}
