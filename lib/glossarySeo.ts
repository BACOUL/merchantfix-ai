export type GlossarySeoPage = {
  slug: string;
  term: string;
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  whyItMatters: string;
  shopifyContext: string;
  merchantCenterContext: string;
  safeChecklist: string[];
  avoid: string[];
  relatedGuides: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

export const glossarySeoPages = [
  {
    slug: "what-is-gtin",
    term: "GTIN",
    title: "What Is GTIN? Shopify Google Merchant Center Guide | MerchantFix.ai",
    description:
      "Learn what GTIN means, where it appears in Shopify, why Google Merchant Center asks for it, and why merchants should not invent GTIN values.",
    h1: "What is GTIN? Shopify and Google Merchant Center explanation",
    directAnswer:
      "GTIN means Global Trade Item Number. It is a real manufacturer product identifier such as UPC, EAN, JAN, or ISBN. In Shopify CSV exports, GTIN is commonly connected to the Variant Barcode field.",
    whyItMatters:
      "Google uses GTIN values to understand and match products more accurately. Missing or invalid GTIN data can create Merchant Center warnings, limited performance, or disapprovals depending on the product type and account context.",
    shopifyContext:
      "In Shopify, merchants often enter GTIN values in the product variant barcode field. This value must be a real product barcode, not an internal SKU or a generated number.",
    merchantCenterContext:
      "Google Merchant Center may show errors such as Missing value [gtin], Invalid value [gtin], or limited performance due to missing identifiers when product identifier data is incomplete or unreliable.",
    safeChecklist: [
      "Check product packaging or manufacturer data for a real GTIN.",
      "Use Shopify Variant Barcode only for verified product barcode values.",
      "Review MPN and brand when no GTIN exists.",
      "Use manual review for custom, handmade, or personalized products."
    ],
    avoid: ["Do not invent GTIN values.", "Do not copy SKU into GTIN.", "Do not reuse another product's barcode.", "Do not pad numbers to create a fake GTIN."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/missing-value-gtin", label: "Missing value [gtin]" },
      { href: "/fix/google-merchant-center-errors/invalid-value-gtin", label: "Invalid value [gtin]" },
      { href: "/fix/shopify-google-shopping/gtin-missing-shopify-google-shopping", label: "GTIN missing Shopify Google Shopping" }
    ],
    faqs: [
      { question: "Is GTIN the same as SKU?", answer: "No. GTIN is a manufacturer product identifier. SKU is usually an internal merchant stock keeping unit." },
      { question: "Where is GTIN in Shopify?", answer: "For many Shopify exports, GTIN is represented by the Variant Barcode field." },
      { question: "Can I create a GTIN myself?", answer: "No. Do not invent or generate GTIN values just to clear a Merchant Center warning." }
    ]
  },
  {
    slug: "what-is-mpn",
    term: "MPN",
    title: "What Is MPN? Shopify Google Merchant Center Guide | MerchantFix.ai",
    description:
      "Learn what MPN means, how it differs from SKU and GTIN, and how Shopify merchants should handle missing MPN warnings.",
    h1: "What is MPN? Shopify and Google Merchant Center explanation",
    directAnswer:
      "MPN means Manufacturer Part Number. It is a part number assigned by the manufacturer, not a merchant's internal SKU unless the SKU is truly the manufacturer's part number.",
    whyItMatters:
      "When GTIN is unavailable, Google may use MPN together with brand to understand the product. Missing or incorrect MPN values can weaken product matching and create warnings.",
    shopifyContext:
      "Shopify product exports may include a Google Shopping / MPN field. This field should contain a real manufacturer part number when available.",
    merchantCenterContext:
      "Google Merchant Center may show Missing value [mpn] or missing product identifier warnings when MPN, brand, or GTIN data is incomplete.",
    safeChecklist: [
      "Check the manufacturer listing or product documentation.",
      "Use MPN only when the value is actually issued by the manufacturer.",
      "Review brand data together with MPN.",
      "Mark uncertain rows for manual review instead of guessing."
    ],
    avoid: ["Do not copy SKU into MPN by default.", "Do not invent manufacturer part numbers.", "Do not use supplier references unless they are true manufacturer part numbers."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/missing-value-mpn", label: "Missing value [mpn]" },
      { href: "/fix/google-merchant-center-missing-mpn", label: "Missing MPN guide" },
      { href: "/learn/what-is-gtin", label: "What is GTIN?" }
    ],
    faqs: [
      { question: "Is MPN the same as SKU?", answer: "Not usually. MPN is assigned by the manufacturer. SKU is usually assigned by the merchant." },
      { question: "Does every product need an MPN?", answer: "Not every product has an MPN, but when it exists it should be entered accurately." },
      { question: "Can MerchantFix.ai tell me if SKU is a real MPN?", answer: "MerchantFix.ai can flag SKU-as-MPN patterns for review, but the merchant must verify the real product data." }
    ]
  },
  {
    slug: "what-is-identifier-exists",
    term: "identifier_exists",
    title: "What Is identifier_exists? Shopify Google Merchant Center Guide | MerchantFix.ai",
    description:
      "Understand identifier_exists in Google Merchant Center, when it should be false, and why Shopify merchants should not use it to hide missing identifiers.",
    h1: "What is identifier_exists? Shopify and Google Merchant Center explanation",
    directAnswer:
      "identifier_exists tells Google whether a product has manufacturer identifiers such as GTIN, MPN, and brand. It should only be false when the product truly has no manufacturer identifiers.",
    whyItMatters:
      "Incorrect identifier_exists values can make product data less trustworthy. Setting it to false only to silence warnings can create new Merchant Center problems.",
    shopifyContext:
      "Some Shopify feeds expose identifier_exists or custom product settings. These should be reviewed carefully for custom, handmade, vintage, or made-to-order products.",
    merchantCenterContext:
      "Google may show missing product identifier warnings when identifier_exists conflicts with GTIN, MPN, or brand data.",
    safeChecklist: [
      "Check whether the product has a real GTIN.",
      "Check whether the product has a real MPN and brand.",
      "Use false only for products that genuinely have no manufacturer identifiers.",
      "Keep manual review notes for uncertain products."
    ],
    avoid: ["Do not bulk-set identifier_exists false.", "Do not use false to hide missing GTINs.", "Do not ignore brand and MPN before changing identifier_exists."],
    relatedGuides: [
      { href: "/fix/google-merchant-center-errors/identifier-exists-false-misuse", label: "identifier_exists false misuse" },
      { href: "/fix/google-merchant-center-identifier-exists", label: "identifier_exists guide" },
      { href: "/fix/shopify-missing-product-identifiers", label: "Missing product identifiers" }
    ],
    faqs: [
      { question: "When should identifier_exists be false?", answer: "Only when the product truly has no manufacturer identifiers, such as some custom, handmade, personalized, or made-to-order products." },
      { question: "Can I set identifier_exists to false to remove GTIN warnings?", answer: "No. That can be risky if the product actually has manufacturer identifiers." },
      { question: "Does identifier_exists replace GTIN or MPN?", answer: "No. It tells Google whether identifiers exist; it does not create or replace them." }
    ]
  },
  {
    slug: "what-is-shopify-variant-barcode",
    term: "Shopify Variant Barcode",
    title: "What Is Shopify Variant Barcode? GTIN Field Guide | MerchantFix.ai",
    description:
      "Understand Shopify Variant Barcode, how it relates to GTIN, and why incorrect barcode data can trigger Google Merchant Center errors.",
    h1: "What is Shopify Variant Barcode? GTIN and Merchant Center explanation",
    directAnswer:
      "Shopify Variant Barcode is the barcode field attached to a product variant. For Google Shopping feeds, it is often used as the source for GTIN values such as UPC, EAN, JAN, or ISBN.",
    whyItMatters:
      "If Variant Barcode is empty, invalid, duplicated, or filled with internal SKU data, Google Merchant Center can report missing or invalid GTIN warnings.",
    shopifyContext:
      "Each Shopify variant can have its own barcode. Merchants should check the exact variant affected, not only the parent product.",
    merchantCenterContext:
      "Merchant Center may use the barcode field to validate product identifiers and compare submitted product data with expected identifier patterns.",
    safeChecklist: [
      "Check each affected variant, not only the product page.",
      "Use real UPC, EAN, JAN, or ISBN values when available.",
      "Remove internal SKUs from barcode fields when they are not GTINs.",
      "Review duplicates across variants."
    ],
    avoid: ["Do not use SKU as barcode unless it is truly the product barcode.", "Do not leave duplicated barcodes across unrelated products.", "Do not generate fake barcodes."],
    relatedGuides: [
      { href: "/learn/what-is-gtin", label: "What is GTIN?" },
      { href: "/fix/google-merchant-center-errors/invalid-value-gtin", label: "Invalid value [gtin]" },
      { href: "/fix/google-merchant-center-errors/missing-value-gtin", label: "Missing value [gtin]" }
    ],
    faqs: [
      { question: "Is Shopify Variant Barcode the GTIN field?", answer: "In many Shopify feed exports, Variant Barcode is used as the source for GTIN." },
      { question: "Can each variant have a different barcode?", answer: "Yes. Each variant can have its own barcode, so variant-level review matters." },
      { question: "What happens if Variant Barcode is blank?", answer: "Google Merchant Center may report missing GTIN or missing product identifier warnings depending on the product." }
    ]
  },
  {
    slug: "what-is-google-merchant-center-product-data",
    term: "Google Merchant Center product data",
    title: "What Is Google Merchant Center Product Data? Shopify Guide | MerchantFix.ai",
    description:
      "Learn what Google Merchant Center product data includes for Shopify merchants: identifiers, titles, prices, availability, images, shipping, and policy information.",
    h1: "What is Google Merchant Center product data for Shopify?",
    directAnswer:
      "Google Merchant Center product data is the structured information Google receives about products, including identifiers, title, description, price, availability, image, shipping, condition, and category-related fields.",
    whyItMatters:
      "Cleaner product data helps Google understand and review products more accurately. Weak or inconsistent data can create warnings, disapprovals, or limited performance.",
    shopifyContext:
      "For Shopify merchants, product data usually comes from product fields, variant fields, images, inventory settings, shipping settings, and feed app mappings.",
    merchantCenterContext:
      "Merchant Center uses this data to evaluate eligibility, detect mismatches, classify products, and show item-level issues.",
    safeChecklist: [
      "Check product identifiers first: GTIN, MPN, brand, identifier_exists.",
      "Check price and availability against the storefront.",
      "Check image quality and image accessibility.",
      "Check shipping, condition, and policy pages when errors are broader than product rows."
    ],
    avoid: ["Do not treat every issue as a GTIN problem.", "Do not edit CSV rows blindly.", "Do not ignore website or policy issues when Merchant Center flags them."],
    relatedGuides: [
      { href: "/google-merchant-center-errors-shopify", label: "Google Merchant Center errors for Shopify" },
      { href: "/fix/shopify-google-shopping/fix-google-shopping-feed-shopify", label: "Fix Google Shopping feed Shopify" },
      { href: "/methodology", label: "Methodology" }
    ],
    faqs: [
      { question: "What fields are part of product data?", answer: "Common fields include identifiers, title, description, price, availability, image, shipping, condition, and category information." },
      { question: "Is product data the same as website policy?", answer: "No. Product data is item-level information. Website policy and trust signals are broader account or website-level issues." },
      { question: "Can MerchantFix.ai check all Merchant Center issues?", answer: "MerchantFix.ai focuses on Shopify product data diagnostics. It does not guarantee approval or solve every account-level issue." }
    ]
  },
  {
    slug: "what-is-shopify-product-feed",
    term: "Shopify product feed",
    title: "What Is a Shopify Product Feed? Google Shopping Guide | MerchantFix.ai",
    description:
      "Learn what a Shopify product feed is, how it sends product data to Google Merchant Center, and which fields commonly create feed errors.",
    h1: "What is a Shopify product feed for Google Shopping?",
    directAnswer:
      "A Shopify product feed is the structured product data sent from Shopify or a feed app to Google Merchant Center. It contains product and variant information used for Google Shopping review and visibility.",
    whyItMatters:
      "If the feed contains missing, invalid, or mismatched values, Google Merchant Center can flag products with errors or warnings.",
    shopifyContext:
      "The feed may use Shopify product fields, variant fields, images, inventory, shipping settings, and Google Shopping-specific fields depending on the feed setup.",
    merchantCenterContext:
      "Google Merchant Center reviews the submitted feed and compares some values with the landing page, especially price, availability, and product identifiers.",
    safeChecklist: [
      "Export or inspect product and variant data before bulk changes.",
      "Check identifiers, price, availability, images, and shipping fields.",
      "Confirm feed values match the storefront where required.",
      "Use a diagnostic before editing many rows."
    ],
    avoid: ["Do not bulk edit feed rows without checking Shopify source values.", "Do not invent missing identifiers.", "Do not assume a resync fixes bad source data."],
    relatedGuides: [
      { href: "/fix/shopify-google-shopping/fix-google-shopping-feed-shopify", label: "Fix Google Shopping feed Shopify" },
      { href: "/how-to-export-shopify-csv", label: "How to export Shopify CSV" },
      { href: "/fix-pack", label: "Fix Pack" }
    ],
    faqs: [
      { question: "Does Shopify create a product feed automatically?", answer: "Shopify or a feed app can send product data to Google, depending on the store setup and sales channel configuration." },
      { question: "Can I fix feed issues in a CSV only?", answer: "Sometimes, but source data in Shopify may overwrite CSV-only edits. Fix verified source data when possible." },
      { question: "What should I check first in a feed?", answer: "Start with identifiers, price, availability, image, shipping, and condition fields." }
    ]
  }
] as const satisfies readonly GlossarySeoPage[];

export function getGlossarySeoPage(slug: string) {
  return glossarySeoPages.find((page) => page.slug === slug);
}
