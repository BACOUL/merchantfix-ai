import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { missingMpnGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Google Merchant Center Missing MPN | MerchantFix.ai",
  description:
    "Find missing MPN issues in Shopify product data before they create Google Merchant Center feed problems."
};

export default function MissingMpnPage() {
  return <SeoGuidePage {...missingMpnGuide} />;
}
