import type { AuthoritySeoGuide } from "./authoritySeo";

export const authoritySeoLevel2Guides = [
  {
    slug: "price-mismatch-shopify-reference",
    label: "Price mismatch reference",
    title: "Price Mismatch Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center price mismatch issues: variant prices, sale prices, markets, landing pages, CSV diagnosis, and safe resubmission.",
    h1: "Price mismatch for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants whose Google Merchant Center feed price does not match the Shopify product page or variant price.",
    exactWarnings: ["Mismatched value [price]", "Price mismatch", "Landing page price differs from feed price", "Invalid or missing price"],
    answer:
      "For Shopify products, a price mismatch usually means Google sees a different price in the feed than on the product landing page. The issue can come from variant prices, sale prices, compare-at prices, markets, currencies, cached feeds, or product pages that show a different default variant than the submitted item.",
    whyItHappens: [
      "The feed submitted one variant price while the landing page shows another variant by default.",
      "Sale price or compare-at price behavior differs between Shopify and the feed app.",
      "Currency or Shopify Markets configuration changes the visible storefront price.",
      "The feed has not refreshed after a price edit.",
      "Structured data, product page content, and feed value disagree."
    ],
    shopifyFields: [
      { field: "Variant Price", why: "Primary Shopify CSV value for product price." },
      { field: "Variant Compare At Price", why: "Can affect sale presentation and price expectations." },
      { field: "Handle", why: "Maps affected variants back to their product page." },
      { field: "Variant SKU", why: "Helps identify the exact submitted variant." },
      { field: "Market / currency settings", why: "Can change the landing-page price seen by Google." }
    ],
    diagnosticWorkflow: [
      "Export the Shopify CSV and keep a backup.",
      "Identify affected products and variants from Merchant Center.",
      "Compare feed price, Shopify CSV Variant Price, and visible landing-page price.",
      "Check sale pricing, compare-at pricing, currency, and market rules.",
      "Separate timing/feed-refresh issues from true product-data mismatches.",
      "Resubmit only when feed and landing page show the same price logic."
    ],
    csvColumns: ["Handle", "Title", "Variant SKU", "Variant Price", "Variant Compare At Price", "Published", "Market/currency fields"],
    badFixes: [
      "Changing the feed price while the storefront still shows a different price.",
      "Ignoring variant-specific prices.",
      "Mixing currencies in the same feed.",
      "Resubmitting before the feed refreshes.",
      "Using placeholder prices to silence the warning."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when price warnings affect many rows and you need a row-level list separating variant pricing issues, likely feed-refresh timing issues, and rows requiring manual storefront comparison.",
    decisionTable: [
      { situation: "Feed price differs from live page price", nextStep: "Correct the source data or landing-page display before resubmission." },
      { situation: "Only sale price changed recently", nextStep: "Check feed refresh timing and sale price mapping." },
      { situation: "Markets show different currencies", nextStep: "Review target country, currency, and landing-page consistency." },
      { situation: "Many variants affected", nextStep: "Use CSV diagnosis to isolate affected rows." }
    ],
    faq: [
      { question: "Why does Google say my Shopify price is mismatched?", answer: "Because the feed price and the landing-page price seen by Google do not match reliably." },
      { question: "Can a feed refresh fix price mismatch?", answer: "Sometimes, if the source price is already correct. If the source values disagree, a refresh alone is not enough." },
      { question: "Should I edit prices directly in the feed?", answer: "Only if that is the true source of the mismatch. The storefront and feed must remain consistent." }
    ],
    related: [
      { href: "/fix/mismatched-value-price-shopify", label: "Short price mismatch Shopify page" },
      { href: "/fix/google-merchant-center-errors/mismatched-value-price", label: "Exact price mismatch guide" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  },
  {
    slug: "availability-mismatch-shopify-reference",
    label: "Availability mismatch reference",
    title: "Availability Mismatch Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center availability mismatch issues: inventory, stock policy, variants, landing pages, and CSV diagnosis.",
    h1: "Availability mismatch for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants whose product availability in Google Merchant Center does not match the Shopify storefront.",
    exactWarnings: ["Mismatched value [availability]", "Availability mismatch", "Out of stock mismatch", "Landing page availability differs"],
    answer:
      "An availability mismatch usually means Google receives one availability value in the feed but sees another value on the Shopify landing page. Variant stock, continue-selling settings, unpublished products, feed timing, and theme-level availability messages can all create the issue.",
    whyItHappens: [
      "The affected variant is out of stock while the feed still says in stock.",
      "Shopify inventory policy allows selling when inventory is zero.",
      "The product is unpublished or unavailable in a market/channel.",
      "The feed has not refreshed after an inventory change.",
      "The landing page displays availability differently from the feed value."
    ],
    shopifyFields: [
      { field: "Variant Inventory Qty", why: "Shows stock level for each variant." },
      { field: "Variant Inventory Policy", why: "Controls whether products can continue selling when stock is zero." },
      { field: "Published", why: "Indicates whether a product is available on the storefront/channel." },
      { field: "Variant SKU", why: "Identifies the exact stock-keeping unit affected." },
      { field: "Handle", why: "Maps the row to the product landing page." }
    ],
    diagnosticWorkflow: [
      "Match Merchant Center affected items to Shopify variants.",
      "Check inventory quantity and inventory policy for each variant.",
      "Open the live landing page and confirm whether purchase is possible.",
      "Check publication, channel, and market availability.",
      "Separate true stock mismatches from feed-refresh timing issues.",
      "Resubmit only when feed and landing page agree."
    ],
    csvColumns: ["Handle", "Title", "Variant SKU", "Variant Inventory Qty", "Variant Inventory Policy", "Published", "Status"],
    badFixes: [
      "Marking unavailable products as in stock.",
      "Ignoring variant-level inventory.",
      "Resubmitting before Shopify and the feed agree.",
      "Changing availability without checking whether checkout is possible.",
      "Treating every stock issue as a feed app problem."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when availability warnings cover many products and you need to separate inventory rows, publication issues, market/channel issues, and likely feed-refresh delays.",
    decisionTable: [
      { situation: "Product cannot be bought on landing page", nextStep: "Feed should not say in stock." },
      { situation: "Inventory changed recently", nextStep: "Check feed refresh timing after confirming source data." },
      { situation: "Only one variant affected", nextStep: "Review variant-level stock, not only product-level status." },
      { situation: "Product unpublished", nextStep: "Fix channel/publication status or remove it from the feed." }
    ],
    faq: [
      { question: "Why does Google report an availability mismatch for Shopify?", answer: "Because the feed availability and the landing-page availability are not aligned for the product or variant." },
      { question: "Can continue selling when out of stock cause mismatch?", answer: "Yes. Inventory policy can make availability more complex than quantity alone." },
      { question: "Should I resubmit immediately after changing stock?", answer: "Only after confirming the live page and feed source are aligned." }
    ],
    related: [
      { href: "/fix/mismatched-availability-shopify", label: "Short availability mismatch Shopify page" },
      { href: "/fix/google-merchant-center-errors/mismatched-value-availability", label: "Exact availability mismatch guide" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  },
  {
    slug: "image-issue-shopify-reference",
    label: "Image issue reference",
    title: "Google Merchant Center Image Issue Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center image issues: missing image_link, Image Src, variant images, blocked URLs, small images, and CSV diagnosis.",
    h1: "Google Merchant Center image issues for Shopify: the complete reference guide",
    subtitle:
      "A practical reference for merchants whose Shopify product images are missing, blocked, too small, mismatched, or not accepted by Google Merchant Center.",
    exactWarnings: ["Missing value [image_link]", "Image too small", "Image not retrieved", "Invalid image", "Promotional overlay image issue"],
    answer:
      "Shopify image issues usually mean Google cannot use the product image submitted in the feed. The cause can be missing Image Src values, variant image mapping problems, broken URLs, low-resolution images, blocked retrieval, placeholder images, or promotional overlays on the main shopping image.",
    whyItHappens: [
      "The Shopify CSV row has a blank Image Src value.",
      "The variant is mapped to the wrong or missing image.",
      "The image URL is not publicly retrievable by Google.",
      "The image is too small, low quality, or a placeholder.",
      "The main image contains sale badges, promotional text, or overlays."
    ],
    shopifyFields: [
      { field: "Image Src", why: "Primary Shopify CSV source for product image URLs." },
      { field: "Variant Image", why: "Can map different variants to different images." },
      { field: "Handle", why: "Groups images with the correct product." },
      { field: "Title", why: "Helps confirm image-product relevance." },
      { field: "Published", why: "Unpublished products can create retrieval or availability confusion." }
    ],
    diagnosticWorkflow: [
      "Open the submitted image URL directly in a browser.",
      "Check whether Image Src is missing or mapped to the wrong product.",
      "Review variant image mapping for affected rows.",
      "Replace thumbnails, placeholders, or promotional images with clear product images.",
      "Check image size and public retrievability.",
      "Re-export or resync after fixing source media."
    ],
    csvColumns: ["Handle", "Title", "Image Src", "Image Position", "Variant Image", "Published", "Status"],
    badFixes: [
      "Using placeholder images for real products.",
      "Submitting broken or private image URLs.",
      "Using sale badges or promotional overlays as main product images.",
      "Ignoring variant-specific image mapping.",
      "Submitting tiny thumbnails as primary shopping images."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when a CSV has missing Image Src values, suspicious image mappings, repeated placeholder images, or many rows requiring image review before resubmission.",
    decisionTable: [
      { situation: "Image URL is broken", nextStep: "Fix product media or feed image URL before resubmission." },
      { situation: "Variant image is wrong", nextStep: "Correct variant image mapping." },
      { situation: "Image has promotional text", nextStep: "Use a clean main product image." },
      { situation: "Many products missing images", nextStep: "Use CSV diagnosis to identify affected rows." }
    ],
    faq: [
      { question: "Why does Google reject my Shopify product image?", answer: "Because the image may be missing, blocked, too small, incorrect, or unsuitable as a main shopping image." },
      { question: "Is Image Src the only Shopify field to check?", answer: "No. Variant image mapping and product media can also cause image issues." },
      { question: "Can MerchantFix create product images?", answer: "No. It can help identify image-related rows, but product imagery must come from the merchant or approved source." }
    ],
    related: [
      { href: "/fix/google-merchant-center-image-issue-shopify", label: "Short image issue Shopify page" },
      { href: "/fix/google-merchant-center-errors/missing-image-link", label: "Exact image_link guide" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  },
  {
    slug: "limited-performance-shopify-reference",
    label: "Limited performance reference",
    title: "Limited Performance Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center limited performance warnings caused by missing identifiers, weak product data, or incomplete feed attributes.",
    h1: "Limited performance for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants whose Shopify products are eligible but limited by weak identifiers, incomplete product data, or feed quality issues.",
    exactWarnings: ["Limited performance", "Limited performance due to missing identifiers", "Products have limited visibility", "Improve product data quality"],
    answer:
      "Limited performance usually means products may still be eligible, but Google has less product data to match, classify, or serve them effectively. For Shopify, common causes include missing GTIN, MPN, brand, weak titles, missing images, incomplete categories, or risky identifier_exists values.",
    whyItHappens: [
      "Product identifiers are missing or incomplete.",
      "Titles and descriptions are too generic for product matching.",
      "Brand, MPN, or barcode fields are weak or inconsistent.",
      "Images or categories do not provide enough product clarity.",
      "Custom and branded products are mixed without clean identifier logic."
    ],
    shopifyFields: [
      { field: "Variant Barcode", why: "Can improve product matching when a real GTIN exists." },
      { field: "Vendor / brand", why: "Brand helps Google understand the product." },
      { field: "Google Shopping / MPN", why: "Useful when a real manufacturer part number exists." },
      { field: "Title", why: "Weak or vague titles can reduce product clarity." },
      { field: "Image Src", why: "Clear product images support product understanding." }
    ],
    diagnosticWorkflow: [
      "Group limited performance items by warning cause.",
      "Check identifier completeness first: GTIN, MPN, brand, identifier_exists.",
      "Review titles, images, and categories for clarity.",
      "Separate rows that can be improved from rows that require manual product fact verification.",
      "Avoid treating limited performance as one universal fix.",
      "Resubmit after source data improvements are reviewed."
    ],
    csvColumns: ["Handle", "Title", "Body", "Vendor", "Product Category", "Variant Barcode", "Google Shopping / MPN", "Image Src"],
    badFixes: [
      "Inventing identifiers to improve performance.",
      "Bulk-setting identifier_exists false.",
      "Keyword-stuffing product titles.",
      "Ignoring weak images or categories.",
      "Assuming every limited performance warning has the same cause."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when limited performance affects many products and you need a row-level view of missing identifiers, weak fields, and rows that need merchant verification.",
    decisionTable: [
      { situation: "Missing identifiers are the main issue", nextStep: "Review GTIN, MPN, brand, and identifier_exists together." },
      { situation: "Titles are vague", nextStep: "Improve product titles without keyword stuffing." },
      { situation: "Images are weak", nextStep: "Review Image Src and product media." },
      { situation: "Cause is mixed", nextStep: "Use CSV diagnosis to classify row-level gaps." }
    ],
    faq: [
      { question: "Does limited performance mean my products are disapproved?", answer: "Not always. It often means products are eligible but may have weaker matching or visibility due to missing data." },
      { question: "Should I invent GTINs to fix limited performance?", answer: "No. Missing data should be verified, not invented." },
      { question: "Can MerchantFix guarantee performance improvements?", answer: "No. It can diagnose product-data gaps but cannot guarantee ranking, traffic, or sales." }
    ],
    related: [
      { href: "/fix/google-merchant-center-limited-performance-shopify", label: "Short limited performance Shopify page" },
      { href: "/fix/google-merchant-center-errors/limited-performance-missing-identifiers", label: "Exact limited performance guide" },
      { href: "/reference/missing-value-gtin-shopify-reference", label: "Missing GTIN reference" }
    ]
  },
  {
    slug: "misrepresentation-shopify-reference",
    label: "Misrepresentation reference",
    title: "Misrepresentation Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center misrepresentation issues: product data, trust pages, policies, pricing, business identity, and manual review.",
    h1: "Misrepresentation for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants reviewing product data and store trust signals after a Google Merchant Center misrepresentation issue.",
    exactWarnings: ["Misrepresentation", "Account suspended due to misrepresentation", "Website needs improvement", "Policy issue: misrepresentation"],
    answer:
      "Misrepresentation is broader than a single CSV field. For Shopify merchants, it can involve product-data consistency, prices, availability, shipping, returns, contact details, business identity, unsupported claims, policy pages, and trust signals. CSV diagnosis can help with the product-data part, but broader account review remains manual.",
    whyItHappens: [
      "Store policies, contact details, or business identity are incomplete or unclear.",
      "Prices, availability, or product claims differ between feed and website.",
      "Product pages contain unsupported or exaggerated claims.",
      "Shipping, returns, privacy, or terms pages are missing or weak.",
      "The account has trust issues beyond product feed rows."
    ],
    shopifyFields: [
      { field: "Title", why: "Can reveal exaggerated or unsupported product claims." },
      { field: "Body / description", why: "Product claims and promises often appear here." },
      { field: "Variant Price", why: "Must align with landing-page pricing." },
      { field: "Variant Inventory Qty", why: "Supports availability consistency checks." },
      { field: "Image Src", why: "Images should represent the product accurately." }
    ],
    diagnosticWorkflow: [
      "Separate product-data checks from broader store trust review.",
      "Check pricing, availability, images, and claims for consistency.",
      "Review contact, shipping, returns, privacy, and terms pages manually.",
      "Remove unsupported or misleading product claims.",
      "Document product rows that require merchant verification.",
      "Do not treat misrepresentation as an automatic CSV-only repair."
    ],
    csvColumns: ["Handle", "Title", "Body", "Vendor", "Variant Price", "Variant Inventory Qty", "Image Src", "Published"],
    badFixes: [
      "Promising automatic account recovery.",
      "Treating misrepresentation as only a feed attribute error.",
      "Ignoring trust pages and business identity.",
      "Changing CSV values while product pages remain misleading.",
      "Submitting unsupported claims again."
    ],
    merchantfixUseCase:
      "MerchantFix can support the product-data part of a misrepresentation review by flagging inconsistent prices, availability, images, and risky product claims, but it does not replace manual policy and trust review.",
    decisionTable: [
      { situation: "Only product data appears inconsistent", nextStep: "Use CSV diagnosis for price, availability, image, and claim checks." },
      { situation: "Store policies are weak", nextStep: "Manually improve contact, shipping, returns, privacy, and terms." },
      { situation: "Business identity is unclear", nextStep: "Clarify business details and support information." },
      { situation: "Account suspended", nextStep: "Do not promise recovery; perform a careful manual review." }
    ],
    faq: [
      { question: "Can MerchantFix fix misrepresentation automatically?", answer: "No. It can help with product-data checks, but misrepresentation often requires broader manual store and policy review." },
      { question: "Is misrepresentation always caused by my CSV?", answer: "No. It can involve website trust, business identity, policies, contact details, claims, and feed consistency." },
      { question: "Can you guarantee account reinstatement?", answer: "No. Google approval, reinstatement, ranking, traffic, and sales are never guaranteed." }
    ],
    related: [
      { href: "/fix/google-merchant-center-misrepresentation-shopify", label: "Short misrepresentation Shopify page" },
      { href: "/fix/google-merchant-center-errors/misrepresentation-checklist", label: "Misrepresentation checklist" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  },
  {
    slug: "disapproved-products-shopify-reference",
    label: "Disapproved products reference",
    title: "Disapproved Products Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for disapproved products in Google Merchant Center: product data, policy checks, feed rows, images, price, availability, and manual review.",
    h1: "Disapproved products for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants who need to classify why Shopify products were disapproved before editing or resubmitting their feed.",
    exactWarnings: ["Disapproved products", "Product disapproved", "Item disapproved", "Google Merchant Center product issue"],
    answer:
      "Disapproved products can be caused by product-data errors, policy restrictions, missing required attributes, landing-page problems, image issues, price or availability mismatches, or account-level trust signals. The first step is to classify the disapproval reason before editing Shopify rows.",
    whyItHappens: [
      "Required product fields are missing or invalid.",
      "The product violates or appears to violate a policy category.",
      "The landing page does not match feed data.",
      "Images, prices, availability, or identifiers are incomplete.",
      "The disapproval is account or website related, not just row-level product data."
    ],
    shopifyFields: [
      { field: "Title", why: "Can reveal restricted terms, unclear products, or weak matching." },
      { field: "Body / description", why: "May contain policy-sensitive claims or missing product clarity." },
      { field: "Vendor", why: "Useful for brand and identifier context." },
      { field: "Variant Price", why: "Needed to check price consistency." },
      { field: "Image Src", why: "Product images can trigger image or policy problems." }
    ],
    diagnosticWorkflow: [
      "Capture the exact disapproval reason from Merchant Center.",
      "Group affected products by reason instead of editing everything at once.",
      "Map each reason to likely Shopify fields and landing-page checks.",
      "Separate product-data repairs from manual policy review.",
      "Keep uncertain or policy-sensitive rows in manual review.",
      "Resubmit only after source data and landing pages are corrected."
    ],
    csvColumns: ["Handle", "Title", "Body", "Vendor", "Product Category", "Variant Price", "Image Src", "Published", "Google Shopping fields"],
    badFixes: [
      "Editing random fields without classifying the disapproval reason.",
      "Resubmitting unchanged products repeatedly.",
      "Ignoring landing-page consistency.",
      "Treating policy disapproval as a pure CSV issue.",
      "Changing claims without verifying product facts."
    ],
    merchantfixUseCase:
      "MerchantFix is useful when many disapproved products need to be grouped by likely row-level issues, required fields, inconsistent product data, and manual review categories before resubmission.",
    decisionTable: [
      { situation: "Disapproval reason is a missing field", nextStep: "Map it to Shopify CSV columns and verify source data." },
      { situation: "Disapproval reason is policy-related", nextStep: "Manual policy review is required before resubmission." },
      { situation: "Landing page mismatch", nextStep: "Fix source data and storefront consistency." },
      { situation: "Many rows affected", nextStep: "Use CSV diagnosis to group issues before editing." }
    ],
    faq: [
      { question: "Why are my Shopify products disapproved in Google Merchant Center?", answer: "The cause can be product-data, landing-page, image, policy, or account trust related. The exact reason must be classified first." },
      { question: "Can I fix disapproved products by editing the CSV only?", answer: "Sometimes for product-data issues, but not for policy or account-level problems." },
      { question: "Should I resubmit immediately?", answer: "Only after correcting the source issue and reviewing affected rows." }
    ],
    related: [
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" },
      { href: "/reference/misrepresentation-shopify-reference", label: "Misrepresentation reference" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  },
  {
    slug: "shipping-issue-shopify-reference",
    label: "Shipping issue reference",
    title: "Shipping Issue Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center shipping issues: shipping settings, landing-page promises, product rows, countries, weight, and manual checks.",
    h1: "Shipping issues for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants whose Google Merchant Center products have shipping warnings, missing shipping values, or shipping inconsistencies.",
    exactWarnings: ["Missing shipping information", "Shipping cost mismatch", "Invalid shipping", "Shipping policy issue"],
    answer:
      "Shipping issues usually mean Google cannot determine reliable shipping information or sees a mismatch between Merchant Center settings, Shopify checkout, product data, and the landing-page promise. Some issues are account/settings based, while others depend on product rows such as weight, country, or availability.",
    whyItHappens: [
      "Merchant Center shipping settings are incomplete for a target country.",
      "Shopify checkout shipping cost differs from what Google expects.",
      "Product weight, country, or shipping class data is missing.",
      "Landing pages promise shipping terms that do not match checkout.",
      "A product is available in a market without valid shipping coverage."
    ],
    shopifyFields: [
      { field: "Variant Grams", why: "Weight can affect shipping rates and eligibility." },
      { field: "Requires Shipping", why: "Distinguishes physical products from non-shipped items." },
      { field: "Handle", why: "Maps affected rows to product pages." },
      { field: "Variant Price", why: "Some shipping rules depend on order value." },
      { field: "Published / market availability", why: "Shipping must cover the markets where products are shown." }
    ],
    diagnosticWorkflow: [
      "Identify whether the issue is Merchant Center settings, Shopify checkout, or product-row data.",
      "Check target country and market coverage.",
      "Review weight, requires-shipping, and product availability fields.",
      "Compare landing-page shipping claims with checkout behavior.",
      "Separate products needing CSV review from settings-only issues.",
      "Resubmit after settings and product data are aligned."
    ],
    csvColumns: ["Handle", "Title", "Variant SKU", "Variant Grams", "Requires Shipping", "Variant Price", "Published"],
    badFixes: [
      "Changing product rows when the real issue is shipping settings.",
      "Ignoring target country coverage.",
      "Promising free shipping on product pages when checkout charges shipping.",
      "Leaving product weights blank for weight-based shipping.",
      "Resubmitting before checkout and Merchant Center settings align."
    ],
    merchantfixUseCase:
      "MerchantFix can help classify product-row shipping symptoms such as missing weight, requires-shipping values, market availability, and affected products, but settings and checkout checks remain manual.",
    decisionTable: [
      { situation: "Shipping settings missing", nextStep: "Fix Merchant Center or platform shipping setup first." },
      { situation: "Product weight missing", nextStep: "Review Variant Grams and shipping rules." },
      { situation: "Landing page promise differs from checkout", nextStep: "Align store content and checkout behavior." },
      { situation: "Only some products affected", nextStep: "Use CSV diagnosis to identify row-level patterns." }
    ],
    faq: [
      { question: "Are Shopify shipping issues always CSV problems?", answer: "No. Many shipping issues come from Merchant Center settings, checkout behavior, or market coverage." },
      { question: "Which Shopify product fields matter for shipping?", answer: "Weight, requires-shipping, market availability, and product status can matter depending on shipping setup." },
      { question: "Can MerchantFix configure my shipping settings?", answer: "No. It can help identify product-row symptoms, but platform and Merchant Center settings must be reviewed by the merchant." }
    ],
    related: [
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" },
      { href: "/reference/disapproved-products-shopify-reference", label: "Disapproved products reference" }
    ]
  },
  {
    slug: "tax-issue-shopify-reference",
    label: "Tax issue reference",
    title: "Tax Issue Shopify Reference Guide | MerchantFix.ai",
    description:
      "The complete Shopify reference guide for Google Merchant Center tax issues: tax settings, target country, product data, checkout consistency, and manual review.",
    h1: "Tax issues for Shopify: the complete Google Merchant Center reference guide",
    subtitle:
      "A practical reference for merchants who need to understand tax-related Merchant Center warnings and separate account settings from product-row data.",
    exactWarnings: ["Missing tax information", "Invalid tax", "Tax mismatch", "Tax settings issue"],
    answer:
      "Tax issues usually mean Google needs clearer tax information for the target country or sees inconsistency between Merchant Center settings, Shopify checkout, and product presentation. Many tax issues are settings-based, but product type, market, pricing, and checkout behavior can affect diagnosis.",
    whyItHappens: [
      "Merchant Center tax settings are incomplete for the target country.",
      "Shopify tax behavior differs from what Google expects.",
      "Product prices appear tax-inclusive or tax-exclusive inconsistently.",
      "Target country or market configuration is unclear.",
      "Products are shown in a market without correct tax coverage."
    ],
    shopifyFields: [
      { field: "Variant Price", why: "Pricing display can affect tax-inclusive or tax-exclusive interpretation." },
      { field: "Product Type", why: "Some tax rules may depend on product categories." },
      { field: "Published / market availability", why: "Tax coverage must match where products are shown." },
      { field: "Handle", why: "Maps affected rows to product pages for checkout checks." },
      { field: "Title", why: "Helps classify product category and affected rows." }
    ],
    diagnosticWorkflow: [
      "Identify whether the issue is account-level tax settings or product-row specific.",
      "Check target country and Shopify market configuration.",
      "Compare product page price, cart, and checkout tax behavior.",
      "Review product categories if tax handling depends on category.",
      "Separate settings-only fixes from rows needing product-data review.",
      "Resubmit after settings, checkout, and product presentation are aligned."
    ],
    csvColumns: ["Handle", "Title", "Product Type", "Variant Price", "Published", "Status", "Market/country data"],
    badFixes: [
      "Editing random product rows when tax settings are incomplete.",
      "Ignoring target country tax requirements.",
      "Changing prices without understanding tax-inclusive display.",
      "Resubmitting before checkout behavior is verified.",
      "Treating all tax warnings as product-feed errors."
    ],
    merchantfixUseCase:
      "MerchantFix can help identify product-row patterns related to market, price, product type, and affected products, but tax settings and legal treatment require merchant review.",
    decisionTable: [
      { situation: "Tax settings missing", nextStep: "Fix Merchant Center/Shopify settings first." },
      { situation: "Prices display inconsistently", nextStep: "Check product page, cart, and checkout behavior." },
      { situation: "Only one market affected", nextStep: "Review target country and market setup." },
      { situation: "Product category may matter", nextStep: "Review product type/category manually." }
    ],
    faq: [
      { question: "Are tax issues usually caused by Shopify CSV rows?", answer: "Often no. Many tax issues are account, market, or checkout settings issues, but CSV rows can help identify affected products." },
      { question: "Can MerchantFix provide tax advice?", answer: "No. MerchantFix can help diagnose product-data patterns, but tax configuration and legal treatment require merchant or professional review." },
      { question: "Should I change product prices to fix tax warnings?", answer: "Only after understanding whether the issue is price display, checkout behavior, or account settings." }
    ],
    related: [
      { href: "/fix/shopify-product-feed-errors", label: "Shopify product feed errors" },
      { href: "/reference/price-mismatch-shopify-reference", label: "Price mismatch reference" },
      { href: "/reference/shopify-csv-merchant-center-reference", label: "Shopify CSV diagnosis reference" }
    ]
  }
] as const satisfies readonly AuthoritySeoGuide[];

export const authorityLevel2Guides = authoritySeoLevel2Guides.map((guide) => ({
  path: `/reference/${guide.slug}`,
  label: guide.label,
  description: guide.description
})) as readonly { path: string; label: string; description: string }[];

export function getAuthoritySeoLevel2Guide(slug: string) {
  return authoritySeoLevel2Guides.find((guide) => guide.slug === slug);
}
