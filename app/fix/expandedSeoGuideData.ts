import type { RelatedGuide, SeoGuidePageProps } from "@/components/SeoGuidePage";

const guide = (href: string, label: string, description: string): RelatedGuide => ({ href, label, description });

const productFeedErrors = guide(
  "/fix/shopify-product-feed-errors",
  "Shopify product feed errors",
  "Review broader Shopify product feed issues before resubmission."
);
const productData = guide(
  "/fix/shopify-google-shopping-product-data",
  "Shopify Google Shopping product data",
  "Prepare titles, descriptions, images, prices, identifiers, and product fields."
);
const identifiers = guide(
  "/fix/shopify-missing-product-identifiers",
  "Missing product identifiers",
  "Understand GTIN, MPN, brand, and identifier_exists issues."
);
const imageIssues = guide(
  "/fix/google-merchant-center-image-issue-shopify",
  "Google Merchant Center image issues",
  "Check missing images, weak image links, and public image access."
);
const missingTitle = guide(
  "/fix/google-merchant-center-missing-title",
  "Missing title guide",
  "Find Shopify rows where Merchant Center title data is missing."
);
const missingDescription = guide(
  "/fix/google-merchant-center-missing-description",
  "Missing description guide",
  "Review empty Shopify descriptions and feed description mapping."
);
const missingImageLink = guide(
  "/fix/google-merchant-center-missing-image-link",
  "Missing image_link guide",
  "Check Shopify image fields and feed image mapping."
);
const invalidAvailability = guide(
  "/fix/google-merchant-center-invalid-availability",
  "Invalid availability guide",
  "Review inventory, storefront state, and feed availability values."
);
const missingColor = guide(
  "/fix/google-merchant-center-missing-color",
  "Missing color guide",
  "Review apparel color values from Shopify options and feed mapping."
);
const missingSize = guide(
  "/fix/google-merchant-center-missing-size",
  "Missing size guide",
  "Review apparel size values from variant options and product data."
);

export const missingTitleGuide: SeoGuidePageProps = {
  badge: "Title feed issue",
  title: "Google Merchant Center missing title: Shopify rows to check first",
  intro:
    "A missing title warning means Merchant Center did not receive a usable product title. For Shopify merchants, the safest first step is to inspect the product title and feed mapping before editing rows in bulk.",
  highlights: ["Missing title", "Shopify product title", "Feed mapping", "Manual review"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Missing title warnings usually come from blank Shopify titles, feed-app mapping issues, broken imports, or rows where variant data is sent without a clear parent product title.",
      items: ["The Shopify Title field may be empty.", "A feed app may be mapping a blank custom title field.", "Variant exports can lose useful product context if titles were edited manually."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Without a clear product title, Google cannot confidently understand what the item is. The product may remain disapproved or require review until title data is restored.",
      items: ["Affected rows can be hard to find in large catalogs.", "Weak bulk edits can create duplicate or misleading titles.", "Title fixes should match the live product page."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Start with the Shopify product record and the exported CSV before changing the feed.",
      items: ["Check the Title column in the Shopify product CSV.", "Review product and variant titles together.", "Check feed app title mapping if a custom title field is used."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag rows where title data is missing and add manual-review notes to the annotated CSV.",
      items: ["Rows with blank title values.", "Rows that need title review before resubmission.", "Warnings when title-like issues are mentioned in the pasted Merchant Center text."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not write product titles for the merchant or create product facts that are not in the catalog.",
      items: ["It will not invent titles.", "It will not use keyword stuffing as a fix.", "It will not guarantee Merchant Center approval."]
    }
  },
  relatedGuides: [missingDescription, productData, productFeedErrors, identifiers]
};

export const missingDescriptionGuide: SeoGuidePageProps = {
  badge: "Description feed issue",
  title: "Google Merchant Center missing description: Shopify description checks",
  intro:
    "A missing description warning means Merchant Center did not receive enough product description data. Shopify merchants should fix the real product content, not paste generic boilerplate across every row.",
  highlights: ["Missing description", "Body HTML", "Product facts", "CSV diagnosis"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Description gaps often come from supplier imports, blank Shopify Body (HTML) fields, feed mapping problems, or products created quickly without complete content.",
      items: ["Body (HTML) may be blank in the Shopify export.", "A feed app may be using an empty custom description field.", "Duplicate or placeholder descriptions can hide product-specific gaps."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Descriptions help explain the product to shoppers and to feed systems. Missing or weak content can keep diagnostics open or reduce product-data quality.",
      items: ["Rows with no product facts need content review.", "Generated descriptions still need merchant verification.", "Description text should match the live product page."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review product descriptions in Shopify admin and compare them with the exported CSV.",
      items: ["Check Body (HTML) or description columns.", "Avoid unrelated store-wide boilerplate.", "Confirm product specs before writing them into the description."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag rows with missing description data and mark them for manual review in the report.",
      items: ["Blank description fields.", "Rows that need content completion.", "Annotated CSV notes explaining not to invent product specifications."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not invent product descriptions or claim that AI-written content is automatically correct.",
      items: ["It will not invent specifications.", "It will not rewrite the catalog automatically.", "It will not guarantee approval, traffic, or sales."]
    }
  },
  relatedGuides: [missingTitle, productData, productFeedErrors, identifiers]
};

export const missingImageLinkGuide: SeoGuidePageProps = {
  badge: "Image feed issue",
  title: "Google Merchant Center missing image_link: Shopify image fields to review",
  intro:
    "A missing image_link warning means Merchant Center did not receive a usable main product image URL. Shopify merchants should check product media, CSV image fields, and feed image mapping before resubmission.",
  highlights: ["Missing image_link", "Shopify media", "Image Src", "Feed mapping"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Image link issues often appear when products have no main media, variant images are missing, image URLs are private, or feed apps map the wrong image field.",
      items: ["The Shopify Image Src column may be blank.", "Variant images may be missing for affected options.", "A feed app may be submitting an empty or inaccessible image URL."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Product images are required for many Shopping surfaces. Missing image links can block products from appearing until real image data is available.",
      items: ["Products without images are often disapproved or limited.", "Placeholder images can create quality problems.", "Private or temporary URLs can fail crawl checks."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Check the actual product media and the exported CSV image fields.",
      items: ["Review Image Src and Variant Image fields.", "Open image URLs in a private browser window.", "Check whether product images are real, public, and product-specific."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing image fields and add row-level image notes to the annotated CSV.",
      items: ["Rows with missing image data.", "Image-related Merchant Center warning context.", "Manual-review notes when image truth requires live inspection."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not select or create product images for the merchant.",
      items: ["It will not use placeholder images.", "It will not invent image URLs.", "It will not guarantee image approval or crawl success."]
    }
  },
  relatedGuides: [imageIssues, productFeedErrors, productData, missingTitle]
};

export const invalidAvailabilityGuide: SeoGuidePageProps = {
  badge: "Availability feed issue",
  title: "Google Merchant Center invalid availability: Shopify inventory and feed checks",
  intro:
    "Invalid availability warnings mean the submitted availability value is missing, unsupported, or inconsistent with real storefront inventory. Shopify merchants should check inventory truth before changing feed values.",
  highlights: ["Invalid availability", "Inventory", "Storefront status", "Feed mapping"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Availability problems can come from unsupported feed values, inventory sync delays, draft products, hidden products, or feed app rules that transform Shopify inventory incorrectly.",
      items: ["Availability may not be one of the supported values.", "Shopify inventory may not match storefront state.", "Feed mapping can send stale or incorrect availability."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Availability must reflect what shoppers can actually buy. Incorrect availability can cause disapprovals or poor shopper experience.",
      items: ["In-stock products may be shown as unavailable.", "Out-of-stock products may be submitted as available.", "Preorder and backorder values need careful handling."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review inventory, product status, sales channel publishing, and feed availability mapping together.",
      items: ["Check Shopify product status and Published state.", "Review Variant Inventory Qty and inventory policy.", "Compare the feed value with the live product page."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag rows when the pasted warning mentions availability and the CSV value is missing or unsupported.",
      items: ["Missing or unsupported availability values.", "Rows that need inventory and storefront verification.", "Annotated CSV notes that avoid unsafe bulk changes."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not decide real inventory status from a CSV alone.",
      items: ["It will not force products to in_stock.", "It will not ignore preorder or backorder cases.", "It will not guarantee live crawl or Merchant Center approval."]
    }
  },
  relatedGuides: [productFeedErrors, productData, missingImageLink, identifiers]
};

export const missingColorGuide: SeoGuidePageProps = {
  badge: "Apparel attribute issue",
  title: "Google Merchant Center missing color: Shopify apparel attribute checks",
  intro:
    "Missing color warnings usually affect apparel or variant products. Shopify merchants should review options, titles, tags, category, and feed mapping instead of guessing color values.",
  highlights: ["Missing color", "Apparel variants", "Shopify options", "Manual verification"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Color can be missing when Shopify options are inconsistent, feed mappings are incomplete, or imported products store color in titles or tags instead of a dedicated field.",
      items: ["Color may exist in Option1 or Option2 but not in the feed color field.", "Some variants may have blank option values.", "The product category may make color more important."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "For apparel and variant products, missing color can make products harder to classify or keep Merchant Center warnings open.",
      items: ["Variant matching can become weaker.", "Rows may need category-specific attribute review.", "Bulk guesses can create inaccurate product data."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review product options and feed mapping before editing color values.",
      items: ["Check Option names and values for color.", "Check product title, tags, and category context.", "Use consistent real color names across variants."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing color only when the pasted Merchant Center warning mentions color, reducing noisy false positives.",
      items: ["Rows with missing color after a color warning is pasted.", "Likely Shopify fields to review.", "Manual-review notes that prevent guessed values."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not guess colors from images or assign values without product proof.",
      items: ["It will not infer color from images alone.", "It will not bulk-fill one color across variants.", "It will not guarantee Merchant Center approval."]
    }
  },
  relatedGuides: [missingSize, productData, productFeedErrors, invalidAvailability]
};

export const missingSizeGuide: SeoGuidePageProps = {
  badge: "Apparel attribute issue",
  title: "Google Merchant Center missing size: Shopify variant data to review",
  intro:
    "Missing size warnings usually affect apparel or variant products. Shopify merchants should review option values, variant titles, product categories, and feed mappings before editing size fields.",
  highlights: ["Missing size", "Variant options", "Apparel feeds", "Manual review"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Size can be missing when imported products have inconsistent variants, size data is stored in titles or tags, or the feed app does not map Shopify options into the size attribute.",
      items: ["Size may be in Option1 or Option2 but not mapped to the feed.", "Some products may have blank variant option values.", "One-size products still need consistent handling."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Missing size can affect apparel product classification and variant clarity. The fix should reflect the real item, not a guessed default.",
      items: ["Variant products can become confusing.", "Rows may need category-specific review.", "Wrong sizes can create worse product-data quality problems."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review variant options and product pages before editing size data.",
      items: ["Check option names and values for size.", "Review variant titles and tags.", "Use consistent size formats across related variants."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing size only when the pasted warning mentions size, keeping the diagnostic focused.",
      items: ["Rows with missing size after a size warning is pasted.", "Likely Shopify fields to review.", "Manual-review notes that avoid unsafe bulk fills."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not infer product size from images, titles, or assumptions alone.",
      items: ["It will not guess sizes.", "It will not bulk-fill one size across variants.", "It will not guarantee Google approval or Shopping performance."]
    }
  },
  relatedGuides: [missingColor, productData, productFeedErrors, invalidAvailability]
};
