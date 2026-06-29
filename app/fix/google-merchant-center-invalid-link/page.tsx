import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { productLinkIssueGuide } from "../remainingSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Invalid Link Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center invalid link warnings for Shopify by checking product URLs, handles, publishing status, redirects, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-invalid-link")
  }
};

export default function GoogleMerchantCenterInvalidLinkPage() {
  return <SeoGuidePage {...productLinkIssueGuide} />;
}
