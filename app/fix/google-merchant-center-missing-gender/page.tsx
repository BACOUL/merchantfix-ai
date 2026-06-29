import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingGenderGuide } from "../remainingSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Gender Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing gender warnings for Shopify apparel products by checking product audience, unisex cases, category, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-gender")
  }
};

export default function GoogleMerchantCenterMissingGenderPage() {
  return <SeoGuidePage {...missingGenderGuide} />;
}
