import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MerchantFix.ai",
  description:
    "Diagnose visible Shopify product data risks and prepare for deeper Google Merchant Center identifier checks."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
