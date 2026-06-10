import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { productFeedErrorsGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Shopify Product Feed Errors | MerchantFix.ai",
  description:
    "Find Shopify product feed errors such as missing identifiers, missing images, missing prices, and weak product fields.",
  alternates: {
    canonical: canonical("/fix/shopify-product-feed-errors")
  }
};

export default function ShopifyProductFeedErrorsPage() {
  return <SeoGuidePage {...productFeedErrorsGuide} />;
}
