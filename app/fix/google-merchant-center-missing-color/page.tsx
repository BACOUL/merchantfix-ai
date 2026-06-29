import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingColorGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Color Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing color warnings for Shopify apparel products by checking options, tags, product category, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-color")
  }
};

export default function GoogleMerchantCenterMissingColorPage() {
  return <SeoGuidePage {...missingColorGuide} />;
}
