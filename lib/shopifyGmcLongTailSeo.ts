export type ShopifyGmcLongTailSeoPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  searchPhrases: string[];
  problem: string;
  likelyCauses: string[];
  shopifyChecks: string[];
  actionPlan: string[];
  avoid: string[];
  relatedGuides: { href: string; label: string }[];
};

export const shopifyGmcLongTailSeoPages = [
  {
    slug: "price-does-not-match-landing-page-shopify",
    label: "Price does not match landing page Shopify",
    title: "Price Does Not Match Landing Page Shopify Fix | MerchantFix.ai",
    description:
      "Fix Shopify Google Merchant Center price mismatch issues when the feed price does not match the landing page price.",
    h1: "Price does not match landing page in Shopify: how to fix the Merchant Center warning",
    searchPhrases: ["price does not match landing page Shopify", "Google Merchant Center price mismatch Shopify", "Shopify price mismatch Google Shopping"],
    problem:
      "Google compares the price submitted in the product feed with the price visible on the landing page. If Shopify, markets, sale prices, variants, or feed refresh timing disagree, Merchant Center can flag a mismatch.",
    likelyCauses: [
      "Variant-specific prices differ from the default product price.",
      "Sale price or compare-at price is mapped incorrectly.",
      "International market or currency settings create a different storefront price.",
      "The feed has not refreshed after a recent price change."
    ],
    shopifyChecks: ["Variant Price", "Compare-at Price", "Market settings", "Currency", "Product URL", "Feed refresh timing"],
    actionPlan: [
      "Open the affected product and variant in Shopify.",
      "Compare the visible landing page price with the feed price.",
      "Review sale price and market/currency rules.",
      "Correct the source value, then resync or re-export the feed.",
      "Use the Fix Pack if many rows may have price or feed inconsistencies."
    ],
    avoid: ["Do not edit only one exported CSV row if Shopify will overwrite it later.", "Do not ignore variant prices.", "Do not mix currencies in one feed."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/mismatched-value-price", label: "Mismatched value [price]" },
      { href: "/fix/google-merchant-center-errors/missing-price", label: "Missing value [price]" }
    ]
  },
  {
    slug: "availability-does-not-match-landing-page-shopify",
    label: "Availability does not match landing page Shopify",
    title: "Availability Does Not Match Landing Page Shopify Fix | MerchantFix.ai",
    description:
      "Fix Shopify availability mismatch issues when Google Merchant Center says availability does not match the landing page.",
    h1: "Availability does not match landing page in Shopify: how to fix it",
    searchPhrases: ["availability does not match landing page Shopify", "Google Shopping availability mismatch Shopify", "Shopify availability mismatch Merchant Center"],
    problem:
      "Google expects the product availability in the feed to match what shoppers see on the product page. Inventory policy, variant stock, unpublished products, and feed delays can create mismatch warnings.",
    likelyCauses: [
      "One variant is out of stock while another is available.",
      "Continue selling when out of stock is configured differently than expected.",
      "The product page and feed refreshed at different times.",
      "The feed maps Shopify stock status to the wrong shopping availability value."
    ],
    shopifyChecks: ["Variant Inventory Qty", "Inventory Policy", "Published status", "Variant availability", "Landing page purchase button"],
    actionPlan: [
      "Check the exact affected variant, not only the parent product.",
      "Confirm whether the item can be purchased on the storefront.",
      "Review stock policy and continue-selling settings.",
      "Correct the source status and let the feed refresh.",
      "Use a diagnostic to detect rows where availability fields are weak or inconsistent."
    ],
    avoid: ["Do not mark unavailable products as in stock.", "Do not ignore variant-level stock.", "Do not resubmit before the page and feed agree."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/mismatched-value-availability", label: "Mismatched value [availability]" },
      { href: "/fix/google-merchant-center-errors/invalid-value-availability", label: "Invalid value [availability]" }
    ]
  },
  {
    slug: "gtin-missing-shopify-google-shopping",
    label: "GTIN missing Shopify Google Shopping",
    title: "GTIN Missing Shopify Google Shopping Fix | MerchantFix.ai",
    description:
      "Fix GTIN missing warnings for Shopify Google Shopping feeds by checking Variant Barcode, MPN, brand, and identifier_exists safely.",
    h1: "GTIN missing in Shopify Google Shopping: what to check before editing your feed",
    searchPhrases: ["GTIN missing Shopify Google Shopping", "Shopify missing GTIN Google Merchant Center", "Google Shopping GTIN missing Shopify"],
    problem:
      "A missing GTIN warning means Google expected stronger product identifier data. In Shopify, GTIN is commonly stored in Variant Barcode, but the correct action depends on whether the product truly has a manufacturer barcode.",
    likelyCauses: [
      "Variant Barcode is empty.",
      "The product has a manufacturer GTIN that was never entered.",
      "MPN and brand are also missing.",
      "identifier_exists is being used incorrectly."
    ],
    shopifyChecks: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Brand", "identifier_exists"],
    actionPlan: [
      "Check product packaging or manufacturer data for a real GTIN.",
      "Add the GTIN only if it is verified.",
      "If no GTIN exists, review MPN and brand.",
      "Use manual review for custom or handmade products.",
      "Never invent identifiers just to clear a warning."
    ],
    avoid: ["Do not copy SKU into GTIN.", "Do not generate fake GTINs.", "Do not use another product's barcode."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/missing-value-gtin", label: "Missing value [gtin]" },
      { href: "/fix/missing-gtin-google-merchant-center", label: "Missing GTIN guide" }
    ]
  },
  {
    slug: "product-identifiers-not-provided-shopify",
    label: "Product identifiers not provided Shopify",
    title: "Product Identifiers Not Provided Shopify Fix | MerchantFix.ai",
    description:
      "Fix Product identifiers not provided warnings in Shopify feeds by reviewing GTIN, MPN, brand, and identifier_exists fields.",
    h1: "Product identifiers not provided in Shopify: how to diagnose the Merchant Center warning",
    searchPhrases: ["product identifiers not provided Shopify", "missing product identifiers Shopify", "Google Merchant Center product identifiers not provided Shopify"],
    problem:
      "Google may not have enough trusted product identifier data to match your products. The issue can involve missing GTIN, MPN, brand, or an incorrect identifier_exists value.",
    likelyCauses: [
      "GTIN and MPN are both missing.",
      "Vendor or brand is blank or generic.",
      "identifier_exists is set incorrectly.",
      "Custom products and branded products are mixed without review."
    ],
    shopifyChecks: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Brand", "Product type", "identifier_exists"],
    actionPlan: [
      "Segment normal branded products from true custom products.",
      "Add verified GTINs where they exist.",
      "Add real MPN and brand when GTIN is unavailable.",
      "Use manual review for uncertain products.",
      "Run the CSV diagnostic when many products may be affected."
    ],
    avoid: ["Do not bulk-set identifier_exists false.", "Do not invent MPN values.", "Do not leave brand empty on normal branded products."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/product-identifiers-not-provided", label: "Product identifiers not provided" },
      { href: "/fix/shopify-missing-product-identifiers", label: "Shopify missing product identifiers" }
    ]
  },
  {
    slug: "google-merchant-center-disapproved-shopify-products",
    label: "Google Merchant Center disapproved Shopify products",
    title: "Google Merchant Center Disapproved Shopify Products | MerchantFix.ai",
    description:
      "Diagnose common reasons Shopify products are disapproved in Google Merchant Center, including identifiers, images, price, availability, and policy issues.",
    h1: "Google Merchant Center disapproved Shopify products: where to start",
    searchPhrases: ["Google Merchant Center disapproved Shopify products", "Shopify products disapproved Google Shopping", "Merchant Center disapproved products Shopify"],
    problem:
      "Disapproval can come from product data, website policy, image quality, price and availability mismatches, shipping configuration, or broader account trust issues. The first task is to separate CSV-level issues from website or account-level issues.",
    likelyCauses: [
      "Missing or invalid product identifiers.",
      "Price or availability mismatch.",
      "Missing images or image policy issues.",
      "Shipping or policy information is incomplete.",
      "Misrepresentation or website trust concerns."
    ],
    shopifyChecks: ["Variant Barcode", "Vendor", "Price", "Inventory", "Image Src", "Shipping profile", "Policy pages"],
    actionPlan: [
      "Read the exact Merchant Center issue text.",
      "Identify whether the problem is product data, image, price, shipping, or policy-related.",
      "Fix deterministic product data gaps first.",
      "Manually review policy or misrepresentation issues.",
      "Avoid promising approval after a CSV-only change."
    ],
    avoid: ["Do not treat every disapproval as a GTIN problem.", "Do not ignore account or website-level issues.", "Do not bulk edit without understanding the error type."],
    relatedGuides: [
      { href: "/fix", label: "All product data guides" },
      { href: "/fix/google-merchant-center-errors/misrepresentation-checklist", label: "Misrepresentation checklist" }
    ]
  },
  {
    slug: "google-merchant-center-limited-performance-shopify",
    label: "Google Merchant Center limited performance Shopify",
    title: "Google Merchant Center Limited Performance Shopify | MerchantFix.ai",
    description:
      "Understand limited performance warnings for Shopify products and check missing identifiers, weak product data, and feed quality issues.",
    h1: "Google Merchant Center limited performance in Shopify: what it means and what to check",
    searchPhrases: ["Google Merchant Center limited performance Shopify", "Shopify products limited performance", "limited performance Google Shopping Shopify"],
    problem:
      "Limited performance warnings often mean products can run but may be less competitive or less easily matched because data is incomplete or weak. The most common source is missing product identifiers, but titles, images, and feed quality can also matter.",
    likelyCauses: [
      "Missing GTIN, MPN, or brand.",
      "Weak product titles or incomplete product data.",
      "Image quality or product media issues.",
      "Feed values do not provide enough confidence for matching."
    ],
    shopifyChecks: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Product title", "Image Src", "Product description"],
    actionPlan: [
      "Start with product identifiers.",
      "Improve missing or generic brand/vendor data.",
      "Check weak titles and image gaps.",
      "Use the Fix Pack to detect affected CSV rows.",
      "Do not confuse limited performance with guaranteed disapproval."
    ],
    avoid: ["Do not invent identifiers to chase performance.", "Do not ignore title and image quality.", "Do not assume every warning blocks all visibility."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/limited-performance-missing-identifiers", label: "Limited performance due to missing identifiers" },
      { href: "/fix/shopify-google-shopping-product-data", label: "Shopify Google Shopping product data" }
    ]
  },
  {
    slug: "shopify-products-not-showing-google-shopping",
    label: "Shopify products not showing in Google Shopping",
    title: "Shopify Products Not Showing in Google Shopping | MerchantFix.ai",
    description:
      "Troubleshoot Shopify products not showing in Google Shopping by separating feed data, Merchant Center status, policy, and product visibility issues.",
    h1: "Shopify products not showing in Google Shopping: product data checks before guessing",
    searchPhrases: ["Shopify products not showing in Google Shopping", "products not showing Google Shopping Shopify", "Shopify Google Shopping products not visible"],
    problem:
      "Products may not show because of feed errors, disapprovals, limited performance, account settings, campaign settings, indexing delay, policy issues, or weak product data. MerchantFix focuses on the product data part of the problem.",
    likelyCauses: [
      "Products are disapproved or pending in Merchant Center.",
      "Identifiers, price, availability, or images have issues.",
      "Products are not published to the relevant channel.",
      "Campaign or account settings are outside the product data layer."
    ],
    shopifyChecks: ["Published status", "Channel availability", "Variant Barcode", "Price", "Inventory", "Image Src"],
    actionPlan: [
      "Check the exact status in Merchant Center first.",
      "Separate product data issues from campaign and account issues.",
      "Fix CSV-level identifier, image, price, and availability gaps.",
      "Review policy or misrepresentation warnings manually.",
      "Use URL scan or CSV diagnostic as a first product data check."
    ],
    avoid: ["Do not assume one tool can guarantee visibility.", "Do not ignore campaign settings.", "Do not edit product data before reading the exact error."],
    relatedGuides: [
      { href: "/scan", label: "Scan Shopify store" },
      { href: "/fix/shopify-google-shopping/google-merchant-center-disapproved-shopify-products", label: "Disapproved Shopify products" }
    ]
  },
  {
    slug: "fix-google-shopping-feed-shopify",
    label: "Fix Google Shopping feed Shopify",
    title: "Fix Google Shopping Feed for Shopify | MerchantFix.ai",
    description:
      "Fix common Google Shopping feed issues in Shopify, including product identifiers, price, availability, images, condition, and shipping warnings.",
    h1: "Fix Google Shopping feed issues in Shopify: practical product data checklist",
    searchPhrases: ["fix Google Shopping feed Shopify", "Shopify Google Shopping feed errors", "fix Shopify product feed Google Merchant Center"],
    problem:
      "A Shopify Google Shopping feed can fail or underperform because of product identifiers, pricing, availability, image quality, shipping configuration, or policy issues. The safest workflow is to classify the issue before editing the feed.",
    likelyCauses: [
      "Product identifiers are missing or invalid.",
      "Price or availability does not match the storefront.",
      "Images are missing, too small, or not retrievable.",
      "Shipping, condition, or policy data is incomplete."
    ],
    shopifyChecks: ["Variant Barcode", "Vendor", "Variant Price", "Inventory", "Image Src", "Product weight", "Policy pages"],
    actionPlan: [
      "Read the exact Merchant Center issue.",
      "Identify whether it is product data, image, price, shipping, or policy-related.",
      "Fix only verified data.",
      "Use diagnostic notes for affected CSV rows.",
      "Manually review uncertain rows."
    ],
    avoid: ["Do not invent GTIN, MPN, brand, price, or shipping values.", "Do not make blind bulk edits.", "Do not promise Google approval."],
    relatedGuides: [
      { href: "/fix", label: "All Shopify product data guides" },
      { href: "/fix-pack", label: "Fix Pack" }
    ]
  },
  {
    slug: "shopify-google-merchant-center-errors",
    label: "Shopify Google Merchant Center errors",
    title: "Shopify Google Merchant Center Errors | MerchantFix.ai",
    description:
      "Understand common Shopify Google Merchant Center errors and decide whether to check identifiers, price, availability, images, shipping, or policy issues.",
    h1: "Shopify Google Merchant Center errors: practical guide to product data fixes",
    searchPhrases: ["Shopify Google Merchant Center errors", "Google Merchant Center errors Shopify", "Shopify Merchant Center product errors"],
    problem:
      "Merchant Center errors can look similar, but they do not all have the same fix. Some are CSV-level product data issues; others are website, shipping, policy, or account trust issues.",
    likelyCauses: [
      "Missing identifiers such as GTIN, MPN, or brand.",
      "Price and availability mismatches.",
      "Missing or low-quality images.",
      "Shipping and condition gaps.",
      "Policy or misrepresentation warnings."
    ],
    shopifyChecks: ["Variant Barcode", "Google Shopping / MPN", "Vendor", "Variant Price", "Inventory", "Image Src", "Shipping profile", "Policy pages"],
    actionPlan: [
      "Group errors by type before editing data.",
      "Use exact-error pages for the specific warning.",
      "Run a public scan for visible product data risks.",
      "Use CSV diagnostic for catalog-level identifier, image, price, and availability checks.",
      "Escalate policy and misrepresentation issues to manual review."
    ],
    avoid: ["Do not treat every error as a CSV problem.", "Do not invent data.", "Do not ignore website trust and policy issues."],
    relatedGuides: [
      { href: "/fix", label: "All guides" },
      { href: "/methodology", label: "Methodology" }
    ]
  },
  {
    slug: "google-shopping-products-pending-shopify",
    label: "Google Shopping products pending Shopify",
    title: "Google Shopping Products Pending in Shopify | MerchantFix.ai",
    description:
      "Troubleshoot Shopify products pending in Google Merchant Center by checking feed freshness, product data quality, policy status, and review timing.",
    h1: "Google Shopping products pending in Shopify: what to check first",
    searchPhrases: ["Google Shopping products pending Shopify", "Shopify products pending Merchant Center", "Google Merchant Center pending products Shopify"],
    problem:
      "Pending status can be normal during review, but it can also hide product data or policy problems. The right first step is to check whether there are specific item issues attached to the pending products.",
    likelyCauses: [
      "Products are waiting for initial review.",
      "Feed changes were submitted recently.",
      "Product data is incomplete and may later become warnings.",
      "Account or policy review is still in progress."
    ],
    shopifyChecks: ["Published status", "Recent feed sync", "Variant Barcode", "Price", "Availability", "Image Src", "Policy pages"],
    actionPlan: [
      "Check whether Merchant Center shows item-level issues.",
      "Confirm products are published and included in the feed.",
      "Review identifiers, image, price, and availability before waiting too long.",
      "Do not repeatedly resubmit without changing the source issue.",
      "Use a diagnostic if many pending products share weak data patterns."
    ],
    avoid: ["Do not assume pending always means broken.", "Do not keep resubmitting unchanged data.", "Do not ignore item-level issue details."],
    relatedGuides: [
      { href: "/fix/shopify-google-shopping/shopify-google-merchant-center-errors", label: "Shopify Merchant Center errors" },
      { href: "/scan", label: "Scan Shopify store" }
    ]
  }
] as const satisfies readonly ShopifyGmcLongTailSeoPage[];

export function getShopifyGmcLongTailSeoPage(slug: string) {
  return shopifyGmcLongTailSeoPages.find((page) => page.slug === slug);
}
