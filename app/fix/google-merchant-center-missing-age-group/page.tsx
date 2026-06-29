import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingAgeGroupGuide } from "../remainingSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Age Group Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing age_group warnings for Shopify apparel products by checking audience, category, tags, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-age-group")
  }
};

export default function GoogleMerchantCenterMissingAgeGroupPage() {
  return <SeoGuidePage {...missingAgeGroupGuide} />;
}
