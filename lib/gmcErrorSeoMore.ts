import type { GmcErrorSeoPage } from "./gmcErrorSeo";

export const moreGmcErrorSeoPages = [
  {
    slug: "mismatched-value-price",
    label: "Mismatched value [price]",
    title: "Mismatched value [price] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Mismatched value [price] issues for Shopify products by checking variant price, sale price, currency, markets, and feed sync timing.",
    h1: "Mismatched value [price]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Mismatched value [price]", "Price mismatch", "Price does not match landing page", "Product price mismatch"],
    whatItUsuallyMeans:
      "Google sees a different price in the feed than on the product landing page. In Shopify, this can come from variant prices, sale prices, currency or market settings, cached feeds, or timing delays after price changes.",
    shopifyFieldsToCheck: ["Variant Price", "Variant Compare At Price", "Market price settings", "Currency", "Product landing page price"],
    safeFixChecklist: [
      "Check the affected product and variant price in Shopify.",
      "Compare the feed value with the visible landing page value.",
      "Review sale price and compare-at price behavior.",
      "Check market and currency settings if the store sells internationally.",
      "Resync or wait for feed refresh after correcting the source value."
    ],
    avoid: ["Do not change prices only to satisfy the feed if the storefront remains different.", "Do not ignore variant-specific price differences.", "Do not mix currencies in the same feed."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/missing-price", label: "Missing value [price]" },
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }
    ]
  },
  {
    slug: "mismatched-value-availability",
    label: "Mismatched value [availability]",
    title: "Mismatched value [availability] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Mismatched value [availability] issues for Shopify by checking inventory, variant availability, published status, and feed sync timing.",
    h1: "Mismatched value [availability]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Mismatched value [availability]", "Availability mismatch", "Availability does not match landing page", "Product availability mismatch"],
    whatItUsuallyMeans:
      "Google sees a different stock status in the feed than on the landing page. Shopify inventory policy, variant stock, unpublished products, and feed delays can all create mismatch warnings.",
    shopifyFieldsToCheck: ["Variant Inventory Qty", "Variant Inventory Policy", "Published status", "Variant availability", "Landing page stock status"],
    safeFixChecklist: [
      "Check the affected variant inventory in Shopify.",
      "Confirm whether the product can be purchased on the landing page.",
      "Review continue-selling settings and stock policy.",
      "Confirm the feed uses the current product availability.",
      "Resync after fixing product or inventory state."
    ],
    avoid: ["Do not mark unavailable products as in stock.", "Do not ignore variant-level availability.", "Do not resubmit before the landing page and feed agree."],
    relatedGuides: [{ href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }]
  },
  {
    slug: "invalid-value-availability",
    label: "Invalid value [availability]",
    title: "Invalid value [availability] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Invalid value [availability] issues in Shopify product feeds by checking accepted availability values and variant stock mapping.",
    h1: "Invalid value [availability]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Invalid value [availability]", "Invalid availability", "Unsupported availability value", "Availability value is invalid"],
    whatItUsuallyMeans:
      "The feed may contain an unsupported availability value or a value that does not map cleanly from Shopify inventory status to a shopping feed availability field.",
    shopifyFieldsToCheck: ["Inventory status", "Variant Inventory Policy", "Feed availability mapping", "Published status"],
    safeFixChecklist: [
      "Check how the feed maps Shopify stock status to availability.",
      "Use standard availability values only.",
      "Review products with custom availability labels.",
      "Correct the source mapping rather than editing only one exported row."
    ],
    avoid: ["Do not create custom availability words.", "Do not use internal warehouse labels as feed availability.", "Do not apply one value to every variant without checking stock."],
    relatedGuides: [{ href: "/fix/google-merchant-center-errors/mismatched-value-availability", label: "Mismatched value [availability]" }]
  },
  {
    slug: "missing-value-shipping",
    label: "Missing value [shipping]",
    title: "Missing value [shipping] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Understand Missing value [shipping] issues for Shopify merchants and check shipping settings before resubmitting products.",
    h1: "Missing value [shipping]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Missing value [shipping]", "Missing shipping", "Shipping information is missing", "Add shipping information"],
    whatItUsuallyMeans:
      "Google does not have enough shipping information for the affected products, either from Merchant Center settings, the feed, or the store configuration. This is often not fixed by editing product identifiers alone.",
    shopifyFieldsToCheck: ["Product weight", "Shipping profile", "Market/country settings", "Merchant Center shipping settings", "Feed shipping fields if used"],
    safeFixChecklist: [
      "Check whether shipping is configured in Merchant Center.",
      "Review Shopify shipping profiles and product weights.",
      "Confirm the affected target country and currency.",
      "Check whether the product is excluded from shipping rates.",
      "Do not treat shipping errors as GTIN or brand issues."
    ],
    avoid: ["Do not invent shipping prices in product data.", "Do not ignore country-specific shipping settings.", "Do not assume a CSV identifier fix will solve shipping configuration issues."],
    relatedGuides: [{ href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }]
  },
  {
    slug: "missing-value-condition",
    label: "Missing value [condition]",
    title: "Missing value [condition] in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Missing value [condition] warnings by checking Shopify product condition mapping and feed fields for new, used, or refurbished products.",
    h1: "Missing value [condition]: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Missing value [condition]", "Missing condition", "Product condition is missing", "Condition is required"],
    whatItUsuallyMeans:
      "The product feed may not provide whether the item is new, used, or refurbished. Some Shopify feeds omit this field when all products are assumed to be new.",
    shopifyFieldsToCheck: ["Feed condition field", "Product type", "Tags", "Product description", "Channel feed settings"],
    safeFixChecklist: [
      "Confirm the real product condition.",
      "Use a valid condition value consistently.",
      "Review used or refurbished products separately.",
      "Check whether the feed app has a default condition setting."
    ],
    avoid: ["Do not mark used products as new.", "Do not hide refurbished condition.", "Do not apply condition blindly across mixed catalogs."],
    relatedGuides: [{ href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }]
  },
  {
    slug: "image-too-small",
    label: "Image too small",
    title: "Image too small in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix Image too small issues for Shopify products by checking product media, variant images, and image quality before resubmission.",
    h1: "Image too small: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Image too small", "Image size too small", "Product image too small", "Image does not meet size requirements"],
    whatItUsuallyMeans:
      "The image submitted for a product may not meet quality or size expectations. In Shopify, this can come from old product images, variant-specific images, thumbnails, or wrong image URLs in the feed.",
    shopifyFieldsToCheck: ["Image Src", "Variant Image", "Product media", "Image dimensions", "Feed image URL"],
    safeFixChecklist: [
      "Check the product's main image in Shopify.",
      "Replace thumbnails or low-quality images with larger product images.",
      "Review variant image URLs when variants are disapproved.",
      "Confirm the image URL points to the intended product image."
    ],
    avoid: ["Do not upscale a bad image without checking quality.", "Do not use thumbnails as feed images.", "Do not leave variants with outdated small images."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/missing-image-link", label: "Missing value [image_link]" },
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" }
    ]
  },
  {
    slug: "promotional-overlay-on-image",
    label: "Promotional overlay on image",
    title: "Promotional overlay on image: Google Merchant Center Shopify Fix | MerchantFix.ai",
    description:
      "Fix promotional overlay image issues for Shopify products by checking product photos, badges, text overlays, and feed image URLs.",
    h1: "Promotional overlay on image: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Promotional overlay on image", "Image contains promotional overlay", "Text overlay on image", "Watermark or promotional text on product image"],
    whatItUsuallyMeans:
      "The product image may include sale text, badges, logos, watermarks, calls to action, or other overlays that Google does not want in the main shopping image.",
    shopifyFieldsToCheck: ["Product media", "Image Src", "Variant Image", "Theme-generated image badges", "Feed image URL"],
    safeFixChecklist: [
      "Check the exact image URL submitted in the feed.",
      "Replace the main image with a clean product photo.",
      "Keep promotional graphics outside the feed image.",
      "Review variant images for hidden overlays or watermarks."
    ],
    avoid: ["Do not submit sale badge images as main product images.", "Do not use watermarked supplier images when cleaner images exist.", "Do not assume theme badges are invisible to Google."],
    relatedGuides: [{ href: "/fix/google-merchant-center-errors/image-too-small", label: "Image too small" }]
  },
  {
    slug: "image-not-retrieved-crawl-error",
    label: "Image not retrieved / crawl error",
    title: "Image not retrieved in Google Merchant Center: Shopify Fix | MerchantFix.ai",
    description:
      "Fix image retrieval and crawl errors for Shopify product feeds by checking image URLs, access, redirects, and published product media.",
    h1: "Image not retrieved: how to fix this Shopify Merchant Center issue",
    copiedErrorPhrases: ["Image not retrieved", "Image crawl error", "Unable to crawl image", "Could not fetch image"],
    whatItUsuallyMeans:
      "Google could not access the submitted image URL. The image may be missing, blocked, redirected, unpublished, or temporarily unavailable.",
    shopifyFieldsToCheck: ["Image Src", "CDN image URL", "Product media", "Robots/access rules", "Published product status"],
    safeFixChecklist: [
      "Open the image URL directly in a private browser window.",
      "Confirm the product image is published and publicly accessible.",
      "Check whether the feed contains stale image URLs.",
      "Re-export or resync after replacing missing images."
    ],
    avoid: ["Do not use private admin image URLs.", "Do not submit broken CDN links.", "Do not ignore redirect or access issues."],
    relatedGuides: [{ href: "/fix/google-merchant-center-errors/missing-image-link", label: "Missing value [image_link]" }]
  },
  {
    slug: "limited-performance-missing-identifiers",
    label: "Limited performance due to missing identifiers",
    title: "Limited performance due to missing identifiers: Shopify Fix | MerchantFix.ai",
    description:
      "Understand limited performance warnings caused by missing product identifiers in Shopify feeds and check GTIN, MPN, brand, and identifier_exists.",
    h1: "Limited performance due to missing identifiers: how to fix this Shopify Merchant Center warning",
    copiedErrorPhrases: ["Limited performance due to missing identifiers", "Limited performance missing product identifiers", "Missing identifiers limited performance", "Products have limited performance"],
    whatItUsuallyMeans:
      "The products may still be eligible, but missing or weak identifiers can reduce matching quality. The issue is usually connected to GTIN, MPN, brand, and identifier_exists completeness.",
    shopifyFieldsToCheck: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "identifier_exists", "Product title"],
    safeFixChecklist: [
      "Separate branded products from custom products.",
      "Add verified GTINs when they exist.",
      "Add real MPN and brand when GTIN is unavailable.",
      "Review identifier_exists only after checking manufacturer identifiers.",
      "Use a CSV diagnostic when many rows may be affected."
    ],
    avoid: ["Do not invent identifiers to improve performance.", "Do not bulk-set identifier_exists false.", "Do not ignore brand gaps on normal branded products."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/product-identifiers-not-provided", label: "Product identifiers not provided" },
      { href: "/fix/google-merchant-center-errors/missing-value-gtin", label: "Missing value [gtin]" }
    ]
  },
  {
    slug: "misrepresentation-checklist",
    label: "Misrepresentation",
    title: "Misrepresentation in Google Merchant Center: Shopify Checklist | MerchantFix.ai",
    description:
      "Use a Shopify-focused checklist for Google Merchant Center misrepresentation issues. This is not an automatic fix or approval guarantee.",
    h1: "Misrepresentation: Shopify checklist for Google Merchant Center review",
    copiedErrorPhrases: ["Misrepresentation", "Account suspended due to misrepresentation", "Misrepresentation policy", "Google Merchant Center misrepresentation"],
    whatItUsuallyMeans:
      "Misrepresentation is usually broader than a single product row. It can involve website trust, business information, policies, pricing clarity, shipping, returns, contact details, claims, or inconsistent product information.",
    shopifyFieldsToCheck: ["Contact page", "Refund policy", "Shipping policy", "Product claims", "Price and availability", "Business identity"],
    safeFixChecklist: [
      "Review contact, shipping, returns, privacy, and terms pages.",
      "Check that product prices and availability match the store.",
      "Remove exaggerated or unsupported product claims.",
      "Check business identity and customer support visibility.",
      "Treat this as a manual trust review, not a CSV-only fix."
    ],
    avoid: ["Do not present misrepresentation as an automatic CSV repair.", "Do not promise account reinstatement.", "Do not ignore website trust and policy pages."],
    relatedGuides: [
      { href: "/security", label: "Security and privacy" },
      { href: "/methodology", label: "Methodology" }
    ]
  }
] as const satisfies readonly GmcErrorSeoPage[];
