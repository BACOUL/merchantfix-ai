import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingSizeGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Size Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing size warnings for Shopify apparel products by checking variant options, titles, category, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-size")
  }
};

export default function GoogleMerchantCenterMissingSizePage() {
  return <SeoGuidePage {...missingSizeGuide} />;
}
