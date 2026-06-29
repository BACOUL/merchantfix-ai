import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingDescriptionGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Description Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing description warnings for Shopify by checking Body HTML, product facts, feed mapping, and CSV rows.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-description")
  }
};

export default function GoogleMerchantCenterMissingDescriptionPage() {
  return <SeoGuidePage {...missingDescriptionGuide} />;
}
