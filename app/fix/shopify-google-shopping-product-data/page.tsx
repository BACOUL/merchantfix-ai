import type { Metadata } from "next";
import { SeoGuidePage } from "@/components/SeoGuidePage";
import { canonical } from "@/lib/seo";
import { googleShoppingProductDataGuide } from "../seoGuideData";

export const metadata: Metadata = {
  title: "Shopify Google Shopping Product Data | MerchantFix.ai",
  description:
    "Improve Shopify product data for Google Shopping by checking titles, descriptions, images, prices, brands, and identifiers.",
  alternates: {
    canonical: canonical("/fix/shopify-google-shopping-product-data")
  }
};

export default function ShopifyGoogleShoppingProductDataPage() {
  return <SeoGuidePage {...googleShoppingProductDataGuide} />;
}
