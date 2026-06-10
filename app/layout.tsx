import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_URL, structuredData } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MerchantFix.ai | Shopify product data diagnostics",
  description:
    "Run a public Shopify surface scan and diagnose GTIN, MPN, brand, and identifier_exists issues from a Shopify CSV."
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
