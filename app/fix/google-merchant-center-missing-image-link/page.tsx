import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { missingImageLinkGuide } from "../expandedSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing Image Link Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center missing image_link warnings for Shopify by checking Image Src, Variant Image, product media, and feed image mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-missing-image-link")
  }
};

export default function GoogleMerchantCenterMissingImageLinkPage() {
  return <SeoGuidePage {...missingImageLinkGuide} />;
}
