import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { identifierExistsGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Identifier Exists in Google Merchant Center | MerchantFix.ai",
  description:
    "Understand identifier_exists issues in Shopify product feeds and flag rows that need review.",
  alternates: {
    canonical: canonical("/fix/google-merchant-center-identifier-exists")
  }
};

export default function IdentifierExistsPage() {
  return <SeoGuidePage {...identifierExistsGuide} />;
}
