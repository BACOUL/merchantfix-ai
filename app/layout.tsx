import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "MerchantFix.ai | Shopify product data diagnostics",
  description:
    "Run a public Shopify surface scan and diagnose GTIN, MPN, brand, and identifier_exists issues from a Shopify CSV."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
