import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { productFeedErrorsGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Shopify Product Feed Errors | MerchantFix.ai",
  description:
    "Find Shopify product feed errors such as missing identifiers, missing images, missing prices, and weak product fields."
};

export default function ShopifyProductFeedErrorsPage() {
  return <SeoGuidePage {...productFeedErrorsGuide} />;
}
