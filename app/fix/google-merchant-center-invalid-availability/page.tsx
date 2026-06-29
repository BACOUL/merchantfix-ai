import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { invalidAvailabilityGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Invalid Availability Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center invalid availability warnings for Shopify by checking inventory, product status, storefront availability, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-invalid-availability")
  }
};

export default function GoogleMerchantCenterInvalidAvailabilityPage() {
  return <SeoGuidePage {...invalidAvailabilityGuide} />;
}
