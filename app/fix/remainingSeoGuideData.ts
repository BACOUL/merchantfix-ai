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
const missingTitle = guide(
  "/fix/google-merchant-center-missing-title",
  "Missing title guide",
  "Find Shopify rows where Merchant Center title data is missing."
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
const invalidAvailability = guide(
  "/fix/google-merchant-center-invalid-availability",
  "Invalid availability guide",
  "Review Shopify inventory, storefront state, and feed availability values."
);
const missingAgeGroup = guide(
  "/fix/google-merchant-center-missing-age-group",
  "Missing age_group guide",
  "Review apparel audience values and category context."
);
const missingGender = guide(
  "/fix/google-merchant-center-missing-gender",
  "Missing gender guide",
  "Review apparel gender values, unisex cases, and category context."
);

export const invalidTitleGuide: SeoGuidePageProps = {
  badge: "Title quality issue",
  title: "Google Merchant Center invalid title: Shopify title quality checks",
  intro:
    "Invalid title warnings usually mean the submitted product title is missing useful product detail, contains risky formatting, or does not match Merchant Center quality expectations. Shopify merchants should review title truth and feed mapping before editing in bulk.",
  highlights: ["Invalid title", "Promotional wording", "Variant detail", "Manual title review"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Invalid title issues can appear when titles include promotional claims, all-caps formatting, vague names, copied supplier text, or variant titles that do not describe the real product clearly.",
      items: ["Titles may include promotional terms such as free shipping or sale wording.", "Variant differences may be missing from the submitted title.", "A feed app may be mapping an old or custom title field."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Title quality affects how products are understood and reviewed. A bad title can create product-data warnings even when other fields are present.",
      items: ["Weak titles can make products hard to classify.", "Misleading titles can create trust and policy issues.", "Bulk title rewrites can create worse catalog problems."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review product titles, variant options, and feed mapping before changing title values.",
      items: ["Check the Shopify Title column and variant options.", "Remove promotional wording that does not describe the product.", "Keep title content aligned with the live product page."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag risky title patterns when the pasted Merchant Center warning mentions title issues.",
      items: ["Rows with title warnings and risky title patterns.", "Manual-review notes for title cleanup.", "Annotated CSV guidance without rewriting product titles automatically."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not write final product titles or decide merchandising strategy for the merchant.",
      items: ["It will not invent titles.", "It will not keyword-stuff titles.", "It will not guarantee approval, traffic, ranking, or sales."]
    }
  },
  relatedGuides: [missingTitle, productData, productFeedErrors]
};

export const productLinkIssueGuide: SeoGuidePageProps = {
  badge: "Landing page URL issue",
  title: "Google Merchant Center invalid link: Shopify product URL checks",
  intro:
    "Invalid link or missing link warnings mean Merchant Center may not have a usable product landing page URL. Shopify merchants should check handles, product publishing, feed mapping, redirects, and live access before resubmitting.",
  highlights: ["Invalid link", "Product URL", "Shopify handle", "Live access check"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Link issues can come from deleted handles, draft products, password-protected stores, wrong feed mapping, redirects, or product URLs that do not resolve publicly.",
      items: ["The product may not be published to the Online Store channel.", "The feed may submit an admin, preview, or malformed URL.", "Redirects or region blocks can prevent reliable access."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "If the product URL cannot be reached, Merchant Center may reject or limit the item even when the CSV contains other valid product data.",
      items: ["The landing page must load for users and crawlers.", "CSV data alone cannot prove live URL availability.", "Fixing handles without checking redirects can miss the real issue."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review Shopify publishing and the actual product URL before changing feed settings.",
      items: ["Check product Status and Online Store channel publishing.", "Open the product URL in a private browser window.", "Review feed app link mapping and canonical product URLs."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing link context when the pasted Merchant Center warning mentions link or landing page problems.",
      items: ["Rows without a recognized link field when link is mentioned.", "Likely Shopify fields to review.", "Manual-review notes because live URL access must be verified outside the CSV."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not guarantee crawlability or live landing page access from CSV data alone.",
      items: ["It will not pretend a CSV row proves the URL works.", "It will not bypass Shopify publishing or redirect problems.", "It will not guarantee Merchant Center approval."]
    }
  },
  relatedGuides: [invalidAvailability, productFeedErrors, productData]
};

export const missingAgeGroupGuide: SeoGuidePageProps = {
  badge: "Apparel attribute issue",
  title: "Google Merchant Center missing age_group: Shopify apparel audience checks",
  intro:
    "Missing age_group warnings usually affect apparel or audience-specific products. Shopify merchants should review product audience, category, tags, and feed mapping before adding a value.",
  highlights: ["Missing age_group", "Apparel audience", "Product category", "Manual verification"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "age_group can be missing when audience information is not mapped from Shopify, product categories are incomplete, or imported catalogs do not separate adult, kids, toddler, infant, or newborn products clearly.",
      items: ["The value may not exist in a dedicated feed field.", "Audience context may only appear in titles or tags.", "Category mapping can make age_group more important."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Age group helps classify apparel and audience-specific products. Guessing the wrong audience can create worse product-data quality issues.",
      items: ["Rows may remain flagged until audience data is reviewed.", "Adult should not be applied blindly to every product.", "Kids and infant products need careful category context."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review product audience and category before editing feed values.",
      items: ["Check product title, product type, tags, and Google product category.", "Confirm whether the item is adult, kids, toddler, infant, or newborn.", "Review feed app age_group mapping rules."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing age_group only when the pasted Merchant Center warning mentions age_group, keeping the report focused.",
      items: ["Rows missing age_group after an age_group warning is pasted.", "Likely Shopify fields to review.", "Manual-review notes to prevent audience guesses."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not choose audience values without merchant verification.",
      items: ["It will not assume every product is adult.", "It will not hide category issues with a guessed age_group.", "It will not guarantee approval or Shopping performance."]
    }
  },
  relatedGuides: [missingGender, missingColor, missingSize, productFeedErrors]
};

export const missingGenderGuide: SeoGuidePageProps = {
  badge: "Apparel attribute issue",
  title: "Google Merchant Center missing gender: Shopify apparel attribute checks",
  intro:
    "Missing gender warnings usually affect apparel products. Shopify merchants should review product audience, unisex cases, category, tags, and feed mapping instead of assigning gender from one keyword.",
  highlights: ["Missing gender", "Unisex review", "Apparel category", "Feed mapping"],
  sections: {
    why: {
      title: "Why this happens",
      body:
        "Gender can be missing when apparel data is imported without structured attributes, stored only in tags, or not mapped from Shopify to the feed.",
      items: ["The value may not exist in a dedicated feed field.", "Unisex products may need explicit review.", "A product category can make the gender attribute more relevant."]
    },
    impact: {
      title: "How it affects Shopify / Google Shopping",
      body:
        "Gender can help classify apparel products, but the wrong value can misrepresent the product. The fix should come from product truth and category context.",
      items: ["Rows may need category-specific review.", "Unisex products should not be forced into male or female values.", "Bulk guesses can create inaccurate product data."]
    },
    shopifyChecks: {
      title: "What to check in Shopify",
      body: "Review product audience, category, titles, and tags before editing gender data.",
      items: ["Check product title, product type, tags, and Google product category.", "Review unisex cases separately.", "Check feed app gender mapping rules."]
    },
    merchantFixDetects: {
      title: "What MerchantFix.ai can detect",
      body: "MerchantFix.ai can flag missing gender only when the pasted Merchant Center warning mentions gender.",
      items: ["Rows missing gender after a gender warning is pasted.", "Likely Shopify fields to review.", "Manual-review notes that prevent unsafe attribute guessing."]
    },
    merchantFixWillNotDo: {
      title: "What MerchantFix.ai will not do",
      body: "MerchantFix.ai does not assign gender values from assumptions or single keywords.",
      items: ["It will not ignore unisex cases.", "It will not use gender as a substitute for category mapping.", "It will not guarantee Google approval."]
    }
  },
  relatedGuides: [missingAgeGroup, missingColor, missingSize, productFeedErrors]
};
