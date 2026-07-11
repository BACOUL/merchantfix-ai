import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_URL, structuredData } from "@/lib/seo";
import "./globals.css";

const siteDescription =
  "Scan public Shopify product data and diagnose Google Merchant Center warnings across identifiers, titles, descriptions, links, images, prices, availability, and variant attributes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "MerchantFix.ai",
  title: {
    default: "MerchantFix.ai | Shopify product data diagnostics",
    template: "%s | MerchantFix.ai"
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "MerchantFix.ai",
    url: SITE_URL,
    title: "MerchantFix.ai | Shopify product data diagnostics",
    description: siteDescription
  },
  twitter: {
    card: "summary",
    title: "MerchantFix.ai | Shopify product data diagnostics",
    description: siteDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
