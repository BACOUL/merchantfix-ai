import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingTitleGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Title Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing title warnings for Shopify by checking product titles, variant titles, feed mapping, and CSV rows before resubmission.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-title")
  }
};

export default function GoogleMerchantCenterMissingTitlePage() {
  return <SeoGuidePage {...missingTitleGuide} />;
}
