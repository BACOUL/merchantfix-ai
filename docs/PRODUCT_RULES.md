# MerchantFix.ai Product Rules

This document defines the mandatory product rules for MerchantFix.ai.

These rules are not optional. They protect the product from dangerous corrections, false promises, customer misunderstanding, unnecessary support, and premature complexity.

## Core product rule

MerchantFix.ai must diagnose and fix product data issues only when the correction is safe, explainable, and limited to the product file.

When a case is uncertain, MerchantFix.ai must mark it as manual review.

## Product identity

MerchantFix.ai is a diagnostic and repair tool for Google Merchant Center product data issues.

MerchantFix.ai may start with a no-install Shopify URL surface scan in V0.5.

MerchantFix.ai uses Shopify CSV files for the deeper V1 diagnostic.

MerchantFix.ai starts with basic surface product risks in V0.5 and GTIN, MPN, brand, and identifier_exists issues in V1.

MerchantFix.ai is not a general feed management platform in V0.5 or V1.

MerchantFix.ai is not a Shopify app in V0.5 or V1.

MerchantFix.ai is not a Google Merchant Center integration in V0.5 or V1.

MerchantFix.ai is not a manual agency service.

MerchantFix.ai is not a compliance product.

MerchantFix.ai is not a guarantee of Google approval.

## V0.5 URL scan rule

MerchantFix.ai may use a no-install Shopify URL surface scan in V0.5 as an acquisition and validation layer.

This scan is not the core diagnostic engine.

It must be positioned as a surface risk audit based on publicly available product data when accessible.

The V0.5 scan may detect simple visible risks such as missing image, missing price, weak title, empty or weak description, and basic product count.

The V0.5 scan must not claim full Google Merchant Center accuracy.

The V0.5 scan must not claim to reproduce Google Merchant Center diagnostics.

The V0.5 scan must not guarantee Google approval.

The V0.5 scan must invite users to upload a Shopify CSV for deeper V1 identifier diagnosis.

V0.5 attracts users.

V1 diagnoses deeply.

V2 monetizes.

## Mandatory disclaimer

The following disclaimer must appear on every important customer-facing step:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

The following additional disclaimer must appear on V0.5 URL scan results:

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

These disclaimers must appear on:

Landing page.
URL scan page.
URL scan result page.
Upload page.
Result page.
Checkout page in V2.
PDF report in V2.
Fix Pack in V2.
SEO pages.
Agency pages.
Any page discussing product approval, disapproval, rejected products, or Merchant Center issues.

## User-facing promise

MerchantFix.ai can promise:

Clear diagnosis.
Exact explanation.
Surface risk scan when public product data is available.
Safe corrections when possible.
Corrected CSV when possible.
Manual review list when needed.
Resubmission checklist.
Prioritized actions.

MerchantFix.ai must not promise:

Guaranteed approval.
Guaranteed account recovery.
Guaranteed removal of disapproval.
Guaranteed Google Shopping visibility.
Guaranteed Performance Max performance.
Guaranteed sales recovery.
Guaranteed policy compliance.
Automatic fix for all Merchant Center errors.
Full Merchant Center diagnosis from a public URL scan.

## Product data safety rules

## Rule 1: never invent GTIN

A GTIN is a real product identifier.

MerchantFix.ai must never create, guess, generate, fabricate, or infer a GTIN.

If GTIN is missing, the tool must say that it is missing.

If a GTIN is required, the tool must ask for manual verification.

If a product may not have a GTIN, the tool may explain identifier_exists logic.

Allowed output:

GTIN is missing. Manual review required.

GTIN is missing. If this is a custom, handmade, personalized, or made-to-order product with no manufacturer identifier, review whether identifier_exists should be set to no.

Forbidden output:

Generated GTIN.

Fake barcode.

Suggested random GTIN.

Copied SKU into GTIN.

Inferred GTIN from title.

Inferred GTIN from brand.

## Rule 2: never invent MPN

An MPN is a manufacturer part number.

MerchantFix.ai must never create, guess, generate, fabricate, or infer an MPN.

A Shopify SKU must not automatically be treated as an MPN.

Allowed output:

MPN is missing. Manual review required.

SKU is present, but it may not be a manufacturer part number. Confirm before using it as MPN.

Forbidden output:

Copy SKU into MPN automatically.

Generate an MPN from product title.

Generate an MPN from product handle.

Generate an MPN from vendor or brand.

## Rule 3: never invent brand

Brand or vendor data must not be fabricated.

If the brand is missing, MerchantFix.ai must mark it as missing.

If Shopify vendor exists, it may be mapped as brand only if the original CSV clearly contains vendor data.

Allowed output:

Brand missing. Manual review required.

Vendor detected. Review whether vendor can be used as brand.

Forbidden output:

Invented brand from title.

Invented brand from store name.

Invented brand from product category.

## Rule 4: preserve original CSV data

Corrected CSV files must preserve the original data.

MerchantFix.ai must not delete columns.

MerchantFix.ai must not reorder data in a way that breaks import.

MerchantFix.ai must not silently overwrite customer values.

MerchantFix.ai must not remove products.

MerchantFix.ai must not change product titles, prices, images, links, or identifiers unless that specific correction is safe and explicitly explained.

Every correction or recommendation must be documented in merchantfix_notes.

## Rule 5: every correction must be explainable

Every change in a corrected CSV must be explainable.

The corrected CSV should include merchantfix_notes.

If useful, it may include merchantfix_action.

Examples of notes:

identifier_exists appears inconsistent because GTIN and MPN are missing.

Manual review required: GTIN cannot be invented.

Possible custom product: review whether identifier_exists=no is appropriate.

Duplicate GTIN detected across multiple rows.

Invalid-looking GTIN length detected.

SKU and MPN are identical. Confirm whether SKU is a true manufacturer part number.

## Rule 6: classify every issue

Every issue must have:

Issue code.
Severity.
Product title.
Row number when available.
Explanation.
Suggested fix.
autoFixable value.
Manual review status when relevant.

Severity must be one of:

critical.
warning.
info.

Issue types must be one of:

Automatically fixable.
Manual review required.
Not fixable from product file.
Surface risk only.

## Rule 7: uncertain cases go to manual review

If MerchantFix.ai cannot know the truth, it must not pretend to know.

Uncertain cases must be marked as manual review.

Examples:

Missing GTIN for a branded product.

SKU may or may not be real MPN.

Vendor may or may not be brand.

Product may or may not be handmade.

Price mismatch may require website verification.

Availability mismatch may require store inventory verification.

Misrepresentation may require website and account review.

## Rule 8: do not mix surface scan, feed-level, and account-level issues

MerchantFix.ai must separate issues into categories.

Surface scan issue:

Can be detected from publicly available Shopify product data when accessible.

Feed-level issue:

Can often be detected or corrected in the product CSV.

Product-level issue:

May require product-specific information or manual verification.

Website-level issue:

Requires checking product pages, policies, checkout, business information, or site trust.

Account-level issue:

Requires Google Merchant Center account review and cannot be fixed from a CSV alone.

Examples:

Missing image in public product data is a surface scan issue.

Missing price in public product data is a surface scan issue.

Missing GTIN is product-level or feed-level.

Invalid price format is feed-level.

Missing image link is feed-level.

Price mismatch may be feed-level and website-level.

Availability mismatch may be feed-level and website-level.

Misrepresentation is usually website-level or account-level.

Suspension is account-level.

## Rule 9: do not position misrepresentation as automatic fix

Misrepresentation is complex.

MerchantFix.ai may provide a checklist.

MerchantFix.ai may explain possible causes.

MerchantFix.ai may help identify common website or account trust issues.

MerchantFix.ai must not promise automatic recovery.

MerchantFix.ai must not claim that a CSV fix will resolve misrepresentation.

Allowed output:

Misrepresentation is not usually solved only by changing a product CSV. Review business information, contact page, return policy, payment transparency, product claims, and Merchant Center account status.

Forbidden output:

We fixed your misrepresentation issue.

Your account will be approved.

Upload this CSV and your account will recover.

## Rule 10: rule-based engine comes before AI

For V0.5 and V1, no AI is allowed.

From V3, AI may be used only as an explanatory layer.

AI can:

Explain errors in simple language.
Summarize report findings.
Generate checklist text.
Help classify pasted Merchant Center messages.
Write customer-friendly explanations.

AI must not:

Invent identifiers.
Make critical corrections alone.
Override rule-based safety checks.
Guarantee approval.
Generate fake product data.
Decide that a product is custom without evidence.
Decide that identifier_exists should be no without clear context.

The rule-based engine remains the source of truth for corrections.

## Rule 11: keep V0.5 separate from V1

V0.5 must remain technically and commercially separate from V1.

V0.5 is a no-install surface scan.

V1 is a deeper Shopify CSV diagnostic.

V0.5 must not generate corrected CSV files.

V0.5 must not edit product data.

V0.5 must not claim to know what Google Merchant Center sees.

V0.5 must not replace V1.

V0.5 should create enough perceived value to encourage CSV upload.

## V0.5 surface scan rules

## Public Shopify product data

V0.5 may attempt to fetch publicly available Shopify product data when accessible.

If public product data is unavailable, blocked, empty, or unsupported, MerchantFix.ai must handle the failure gracefully.

Unavailable public product data must not be treated as a Merchant Center issue.

Allowed output:

We could not access public product data for this store. You can still upload a Shopify CSV for deeper diagnosis.

Forbidden output:

Your store has Merchant Center errors because the public product data could not be accessed.

## V0.5 product count

V0.5 may count detected products.

Product count is informational.

Product count must not be used as proof of Merchant Center eligibility.

Allowed output:

MerchantFix.ai detected 42 public products for this surface scan.

Forbidden output:

Google Merchant Center sees exactly 42 products.

## V0.5 missing image

If a product has no visible main image in public product data, MerchantFix.ai may create a warning.

Suggested explanation:

This product appears to have no main image in the public product data available to MerchantFix.ai. Product images are important for Google Shopping visibility and review.

Suggested action:

Review this product in Shopify and make sure it has a clear main product image.

Forbidden output:

Google will reject this product.

This image issue guarantees disapproval.

## V0.5 missing price

If a product has no visible price in public product data, MerchantFix.ai may create a warning.

Suggested explanation:

This product appears to have no visible price in the public product data available to MerchantFix.ai. Google Merchant Center generally expects clear product pricing.

Suggested action:

Review this product in Shopify and make sure the price is set and correctly synced.

Forbidden output:

Google will reject this product.

This price issue guarantees disapproval.

## V0.5 weak title

If a product title is empty, extremely short, generic, or weak, MerchantFix.ai may create a warning or info issue.

Suggested explanation:

This product title may be too weak or unclear for shopping surfaces.

Suggested action:

Review the title and make sure it clearly describes the product.

Forbidden output:

Google will reject this product because of the title.

## V0.5 weak description

If a product description is empty or very weak, MerchantFix.ai may create a warning or info issue.

Suggested explanation:

This product description appears empty or weak in the public product data available to MerchantFix.ai.

Suggested action:

Review the product description in Shopify and make sure it provides enough useful information.

Forbidden output:

Google will reject this product because of the description.

## Identifier rules

## identifier_exists=true with missing GTIN and MPN

If identifier_exists is true and both GTIN and MPN are missing, MerchantFix.ai must create a critical issue.

Suggested explanation:

This product declares that product identifiers exist, but no GTIN or MPN is provided. Google Merchant Center may treat this as inconsistent product identifier data.

Suggested fix:

Provide valid product identifiers if they exist. If the product is custom, handmade, personalized, or made to order and has no manufacturer identifier, review whether identifier_exists should be set to no.

Auto-fix:

Only auto-fix when the product clearly appears custom, handmade, personalized, or made to order, and the user-provided error context supports that no identifier exists.

Otherwise manual review.

## Missing GTIN

If GTIN is missing, MerchantFix.ai must create warning or critical depending on context.

Critical when:

identifier_exists is true and no MPN is present.

Warning when:

GTIN is missing but other identifier data may exist.

Info or review when:

Product appears custom or handmade and no identifiers exist.

MerchantFix.ai must never generate GTIN.

## Missing MPN

If MPN is missing, MerchantFix.ai must create a warning when no GTIN is available or when identifier_exists is true.

MerchantFix.ai must never generate MPN.

MerchantFix.ai must not copy SKU into MPN automatically.

## Missing brand

If brand or vendor is missing, MerchantFix.ai must create a warning.

If vendor is available, MerchantFix.ai may suggest reviewing whether vendor should be used as brand.

MerchantFix.ai must not invent brand.

## Missing identifier_exists

If identifier_exists is missing, MerchantFix.ai may create an info issue.

Suggested explanation:

The file does not explicitly define whether product identifiers exist. Depending on the product type, Google may expect GTIN, MPN, brand, or identifier_exists logic.

## Invalid-looking GTIN

If GTIN exists but is not numeric, or its length is not 8, 12, 13, or 14 digits, MerchantFix.ai must create a warning.

MerchantFix.ai must not correct the GTIN automatically.

Suggested fix:

Review the GTIN from the product packaging, manufacturer, or official product data source.

## Duplicate GTIN

If the same GTIN appears across multiple distinct products, MerchantFix.ai must create a warning.

Suggested explanation:

The same GTIN appears on multiple products. This may be valid for variants in some cases, but it may also indicate incorrect product identifiers.

Manual review required.

## SKU identical to MPN

If SKU and MPN are identical, MerchantFix.ai must create an info issue.

Suggested explanation:

The SKU and MPN are identical. This may be correct only if the SKU is truly the manufacturer part number. Otherwise, SKU should not be treated as MPN.

Manual review required.

## Custom product detection

MerchantFix.ai may detect possible custom products using cautious keywords.

Examples:

custom.
handmade.
personalized.
made to order.
bespoke.
engraved.
print on demand.
one of a kind.
tailor made.

This detection must only trigger a suggestion.

It must not be treated as proof.

Suggested output:

This product appears to be custom or handmade based on its title. If it truly has no GTIN or MPN, review whether identifier_exists should be set to no.

## Price rules

In V0.5, price rules are limited to surface scan detection from public product data.

Allowed V0.5 checks:

Missing price.

Obvious empty price.

V0.5 must not attempt price mismatch validation against website pages or Merchant Center.

In V1, price rules are limited.

Allowed V1 checks:

Missing price.

Obvious empty price.

Basic malformed price warning.

V1 must not attempt advanced price mismatch validation against website pages.

Price mismatch belongs to V3.

## Image rules

In V0.5, image rules are limited to surface scan detection from public product data.

Allowed V0.5 checks:

Missing main image.

Empty image field.

V0.5 must not perform full image policy validation.

V0.5 must not make claims about Google image approval.

In V1, image rules are limited.

Allowed V1 checks:

Missing image.

Empty image field.

Invalid-looking image URL if clearly malformed.

V1 must not perform full image policy validation.

V1 must not make claims about Google image approval.

Image issue expansion belongs to V3.

## Output rules

## V0.5 surface scan output

The V0.5 surface scan should show:

Detected public product count.

Surface risk score.

Missing image count.

Missing price count.

Weak title count.

Weak description count.

Short explanation.

A few affected product examples when available.

Clear CTA to upload Shopify CSV for deeper identifier diagnosis.

Mandatory surface scan disclaimer.

The V0.5 surface scan must not show:

Full Merchant Center diagnosis.

Corrected CSV.

Payment prompt as the primary action.

Guaranteed approval claims.

Account recovery claims.

## Free diagnostic output

The free diagnostic should show:

Total products analyzed.

Critical issue count.

Warning count.

Info count.

Detected issue categories.

Short explanation.

A few affected product examples.

Recommended next actions.

Disclaimer.

The free diagnostic should not expose the full paid Fix Pack if V2 is active.

## Corrected CSV output

The corrected CSV must:

Preserve all original columns.

Preserve all original rows.

Add merchantfix_notes.

Optionally add merchantfix_action.

Apply only safe corrections.

Mark uncertain cases as manual review.

Never invent GTIN.

Never invent MPN.

Never invent brand.

## Manual review CSV output

The manual review CSV should include:

Product title.

Handle.

Row number.

Issue code.

Severity.

Current value.

Suggested action.

Reason manual review is required.

## Report output

From V2, the report should include:

Executive summary.

Products analyzed.

Critical issues.

Warnings.

Manual review cases.

Corrected fields.

Uncorrected fields.

Resubmission checklist.

Disclaimer.

## Resubmission checklist

The resubmission checklist must be practical and cautious.

It may include:

Review corrected CSV.

Review manual review rows.

Confirm GTIN and MPN from official product sources.

Confirm brand or vendor mapping.

Import corrected CSV into Shopify or update product data.

Resync Google channel if relevant.

Check Google Merchant Center diagnostics.

Request review if appropriate.

Wait for Google processing.

It must not say:

Approval guaranteed.

Your products will be approved.

This will solve all Merchant Center issues.

## User interface rules

The interface must be clear for non-technical users.

Avoid technical jargon when possible.

Use plain language explanations.

Prioritize critical issues first.

Show what can be fixed automatically.

Show what requires manual review.

Show what is outside CSV correction.

Keep the disclaimer visible.

Avoid overwhelming users with too many categories in V0.5 and V1.

V0.5 must clearly explain that it is only a surface scan.

V1 must clearly explain that CSV diagnosis is deeper and more reliable than the public URL scan.

## Pricing rules

V0.5 has no payment.

V1 has no payment.

V2 may introduce one offer only.

Initial V2 offer:

Fix Pack around 79 euros.

Do not create multiple complex plans in V2.

Agency pricing belongs to V4.

Subscription belongs to V4.

Monitoring pricing belongs to V5.

## Acquisition rules

The product must target users who already have the problem.

Do not rely on cold mass prospecting.

Primary acquisition:

Long-tail SEO around exact Merchant Center errors.

Secondary acquisition:

Shopify Community.

Reddit Shopify.

Reddit PPC.

Reddit ecommerce.

Google Ads freelancers.

Shopify agencies.

SEA agencies.

V0.5 acquisition:

Use the no-install Shopify URL scan to reduce first-use friction.

Primary V0.5 CTA:

Check your Shopify store for Google Merchant Center product issues in 60 seconds.

Secondary V0.5 CTA:

Upload your Shopify CSV for deeper identifier diagnosis.

Community answers must be helpful, not spammy.

Agency outreach must offer a useful diagnostic, not a generic pitch.

## Data handling rules

Do not store submitted URLs in V0.5 unless absolutely necessary.

Do not store customer files in V1 unless absolutely necessary.

Do not commit customer files to GitHub.

Do not use real customer files as samples.

Do not expose uploads publicly.

Do not log sensitive product data unnecessarily.

Do not store emails unless required and disclosed.

Use fictional sample data only.

## GitHub rules

The repository may contain:

Code.

Documentation.

Prompts.

Fictional samples.

Tests.

Checklists.

Roadmap.

Decisions.

The repository must not contain:

.env.

.env.local.

API keys.

Stripe secrets.

OpenAI keys.

Shopify tokens.

Google API credentials.

Customer CSV files.

Customer screenshots.

Customer emails.

Private product catalogs.

Payment data.

## Version expansion rules

Do not add V1 features before V0.5 is either validated or deliberately skipped after a documented decision.

Do not add V2 features before V1 validation.

Do not add V3 features before V2 validation.

Do not add V4 features before agency demand.

Do not add V5 features before recurring usage and connector demand.

All new ideas go to the parking lot unless they directly support the current version objective.

## Feature parking lot

Features parked for later:

Stripe.

PDF.

ZIP.

AI explanations.

Price mismatch.

Availability mismatch.

Image policy analysis.

Misrepresentation checklist.

Authentication.

Supabase.

Agency dashboard.

Subscriptions.

White-label reports.

Shopify API.

Google Merchant Center API.

Monitoring.

Alerts.

Shopify app.

WooCommerce.

XML parsing.

Amazon.

Meta Catalog.

TikTok Shop.

## Current active product rules

Current phase: V0 / V0.5 / V1 preparation.

Current product focus:

V0.5 Shopify URL surface scan as acquisition layer.

V1 Shopify CSV identifier diagnosis as the serious diagnostic engine.

Google Merchant Center product data issues.

Surface scan risks.

GTIN.

MPN.

Brand.

identifier_exists.

Diagnostic.

Corrected CSV when safe.

Manual review when uncertain.

Current forbidden work:

Stripe.

Auth.

Database.

AI.

Shopify API.

Google API.

PDF.

ZIP.

Subscriptions.

Agency dashboard.

Monitoring.

Shopify app.

Marketplace expansion.

## Final product rule

MerchantFix.ai must stay narrow until the market proves it should expand.

The first product sequence must be useful, safe, clear, and focused.

Build the narrow URL scan entry point first.

Then build the narrow CSV diagnostic tool.

Expand only after validation.
