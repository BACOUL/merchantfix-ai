import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { invalidTitleGuide } from "../remainingSeoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Invalid Title Shopify | MerchantFix.ai",
  description:
    "Fix Google Merchant Center invalid title warnings for Shopify by checking title quality, promotional wording, variant detail, and feed mapping.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-invalid-title")
  }
};

export default function GoogleMerchantCenterInvalidTitlePage() {
  return <SeoGuidePage {...invalidTitleGuide} />;
}
