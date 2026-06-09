import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { identifierExistsGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Identifier Exists in Google Merchant Center | MerchantFix.ai",
  description:
    "Understand identifier_exists issues in Shopify product feeds and flag rows that need review."
};

export default function IdentifierExistsPage() {
  return <SeoGuidePage {...identifierExistsGuide} />;
}
