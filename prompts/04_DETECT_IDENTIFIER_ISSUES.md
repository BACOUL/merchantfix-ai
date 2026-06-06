# Codex Prompt 04 — Detect Identifier Issues

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Implement the identifier issue detection module for MerchantFix.ai.

This task must create deterministic rule-based detection for GTIN, MPN, brand, identifier_exists, duplicate GTIN, invalid-looking GTIN, SKU used as MPN, missing image, and missing price.

This task concerns only the V1 Shopify CSV diagnostic engine.

Do not implement the V0.5 Shopify URL surface scan in this task.

Do not implement CSV parsing.

Do not implement corrected CSV generation.

Do not implement payment, authentication, database, AI, Shopify API, Google API, PDF, or ZIP.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues.

The product sequence is:

V0.5: no-install Shopify URL surface scan for visible product data risks.

V1: deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists issues.

This prompt concerns only V1 identifier issue detection from normalized Shopify CSV rows.

The V1 MVP must detect identifier-related problems safely and clearly without inventing product identifiers or promising Google approval.

## Files allowed to modify

lib/detectIdentifierIssues.ts

lib/validationRules.ts

lib/types.ts only if a small type adjustment is strictly required

tests/detectIdentifierIssues.test.ts if tests are already set up

## Files forbidden to modify

app/page.tsx

app/scan/page.tsx

app/result/[sessionId]/page.tsx

app/api/surface-scan/route.ts

app/api/analyze/route.ts

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

lib/normalizeColumns.ts

lib/analyzeShopifyCsv.ts

lib/generateCorrectedCsv.ts

lib/generateSummary.ts

Any documentation files

Any prompt files

Any sample files unless explicitly asked

## V1 forbidden features

Do not add Stripe.

Do not add authentication.

Do not add user accounts.

Do not add database.

Do not add Supabase.

Do not add OpenAI or AI calls.

Do not add Shopify API.

Do not add Google Merchant Center API.

Do not add PDF generation.

Do not add ZIP generation.

Do not add subscriptions.

Do not add agency dashboard.

Do not add WooCommerce.

Do not add XML parsing.

Do not add monitoring.

Do not add Shopify app.

Do not add approval guarantee.

Do not add V0.5 URL scan logic.

Do not claim that detected issues guarantee Google disapproval.

Do not claim that MerchantFix.ai reproduces Google Merchant Center diagnostics.

## Required function

Create and export a function:

detectIdentifierIssues(products: NormalizedProduct[]): ProductIssue[]

The function must return a flat array of ProductIssue objects.

Each issue must include:

issueCode

severity

category

fixType

rowNumber

productTitle

productHandle

field

currentValue

explanation

suggestedFix

autoFixable

manualReviewRequired

## Required helper functions

Create helper functions if useful:

isValidGtinFormat(gtin: string): boolean

isValidGtinLength(gtin: string): boolean

normalizeIdentifierExistsValue(value: unknown): boolean | null

isEmptyValue(value: unknown): boolean

hasAnyIdentifier(product: NormalizedProduct): boolean

detectDuplicateGtins(products: NormalizedProduct[]): ProductIssue[]

These helpers must stay inside the module unless there is a good reason to export them.

If validation helpers are shared in lib/validationRules.ts, keep them deterministic and free of side effects.

## Detection rules

## Rule 1 — identifier_exists conflict

If identifierExists is true and both GTIN and MPN are missing, create a critical issue.

Issue code:

identifier_exists_conflict

Severity:

critical

Category:

identifier

Fix type:

manual_review by default

Auto fixable:

false by default

Manual review required:

true

Explanation:

This product declares that product identifiers exist, but no GTIN or MPN is provided. Google Merchant Center may treat this as inconsistent product identifier data.

Suggested fix:

Provide valid product identifiers if they exist. If the product is custom, handmade, personalized, or made to order and has no manufacturer identifier, review whether identifier_exists should be set to no.

Important:

Do not automatically set identifier_exists to no here unless corrected CSV generation later determines it is safe.

## Rule 2 — missing GTIN

If GTIN is missing, create a warning unless the product clearly appears custom and identifierExists is false.

Issue code:

missing_gtin

Severity:

warning

Category:

identifier

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

GTIN is missing for this product.

Suggested fix:

Check the product packaging, manufacturer data, or official product information. Do not invent a GTIN.

Important:

If the product appears custom, handmade, personalized, or made to order, do not treat that as proof. Prefer manual review.

## Rule 3 — missing MPN

If MPN is missing and GTIN is missing, create a warning.

Issue code:

missing_mpn

Severity:

warning

Category:

identifier

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

MPN is missing and no GTIN was found. If the product has a manufacturer part number, it should be provided.

Suggested fix:

Confirm whether the product has a real manufacturer part number. Do not use an internal SKU as MPN unless it is truly the manufacturer part number.

## Rule 4 — missing brand

If brand is missing and vendor is missing, create a warning.

Issue code:

missing_brand

Severity:

warning

Category:

brand

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

Brand or vendor information is missing for this product.

Suggested fix:

Add the real brand or confirm whether the Shopify vendor can be used as the brand. Do not invent a brand.

Important:

If vendor exists but brand is missing, do not automatically create a missing_brand issue. The mapping decision belongs to normalization and later correction rules.

## Rule 5 — missing identifier_exists

If identifierExists is null or undefined, create an info issue.

Issue code:

missing_identifier_exists

Severity:

info

Category:

identifier

Fix type:

informational

Auto fixable:

false

Manual review required:

false

Explanation:

The file does not explicitly say whether product identifiers exist for this product.

Suggested fix:

Review whether identifier_exists should be true or false based on whether the product has real GTIN, MPN, or brand data.

## Rule 6 — invalid GTIN format

If GTIN exists and contains non-digit characters after trimming, create a warning.

Issue code:

invalid_gtin_format

Severity:

warning

Category:

identifier

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

The GTIN contains non-numeric characters.

Suggested fix:

Review the GTIN from the product packaging, manufacturer, or official product data. Do not generate a replacement.

## Rule 7 — invalid GTIN length

If GTIN exists and is numeric but length is not 8, 12, 13, or 14 digits, create a warning.

Issue code:

invalid_gtin_length

Severity:

warning

Category:

identifier

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

The GTIN length does not match common valid GTIN lengths.

Suggested fix:

Review the GTIN from the product packaging, manufacturer, or official product data.

## Rule 8 — duplicate GTIN

If the same non-empty GTIN appears on multiple distinct product rows, create a warning for each affected row.

Issue code:

duplicate_gtin

Severity:

warning

Category:

identifier

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

The same GTIN appears on multiple product rows. This may be valid for variants in some cases, but it can also indicate incorrect product identifier data.

Suggested fix:

Confirm whether these products are true variants sharing a valid identifier or whether each product should have its own identifier.

Important:

Ignore empty GTIN values.

Trim GTIN before duplicate comparison.

Do not create duplicate_gtin for a single occurrence.

## Rule 9 — SKU identical to MPN

If SKU and MPN are both present and identical after trimming, create an info issue.

Issue code:

sku_same_as_mpn

Severity:

info

Category:

identifier

Fix type:

informational

Auto fixable:

false

Manual review required:

false

Explanation:

The SKU and MPN are identical. This may be correct only if the SKU is truly the manufacturer part number.

Suggested fix:

Confirm whether the SKU is a real manufacturer part number before using it as MPN.

## Rule 10 — possible custom product

If isPossibleCustomProduct is true and GTIN and MPN are missing, create an info issue.

Issue code:

possible_custom_product

Severity:

info

Category:

manual_review

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

This product appears to be custom, handmade, personalized, or made to order based on its title or handle.

Suggested fix:

If this product truly has no manufacturer identifier, review whether identifier_exists should be set to no. Do not change it automatically without confirmation.

## Rule 11 — missing image

If image is missing, create a warning.

Issue code:

missing_image

Severity:

warning

Category:

image

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

Image data is missing for this product.

Suggested fix:

Add a valid product image URL in Shopify before resubmitting to Google Merchant Center.

## Rule 12 — missing price

If price is missing, create a warning.

Issue code:

missing_price

Severity:

warning

Category:

price

Fix type:

manual_review

Auto fixable:

false

Manual review required:

true

Explanation:

Price data is missing for this product.

Suggested fix:

Add a valid product price in Shopify before resubmitting to Google Merchant Center.

## Issue ordering

Return issues ordered by severity and row number.

Severity order:

critical first

warning second

info third

Within the same severity, order by rowNumber ascending.

If two issues have the same severity and rowNumber, keep deterministic ordering by issueCode alphabetically.

## Duplicate issue control

Avoid duplicate issues with the same issueCode for the same row and same field.

If multiple rules apply, multiple different issues can be returned.

## Input handling

If products is empty, return an empty array.

If a product has missing optional fields, do not throw.

If rowNumber is missing or invalid, still return a safe issue with rowNumber fallback if the existing type allows it.

Do not mutate NormalizedProduct objects.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never copy SKU into MPN automatically.

Never say Google approval is guaranteed.

Never say the account will recover.

Never say misrepresentation is fixed.

Never apply corrections in this module.

This module detects issues only.

V0.5 surface scan logic must remain separate from this module.

## Definition of Done

detectIdentifierIssues is implemented.

All required rules are implemented.

Returned issues include all required fields.

Issues are ordered by severity and row number.

Duplicate issue control is implemented.

No corrections are applied.

No product data is mutated.

Original NormalizedProduct objects are not modified.

No forbidden features are added.

No external API calls are added.

No AI is added.

No payment, database, PDF, ZIP, Shopify API, or Google API is added.

No V0.5 URL scan logic is added.

The module is deterministic and testable.

## Output expectation

Return the full updated lib/detectIdentifierIssues.ts file.

Return lib/validationRules.ts if you added shared validation helpers there.

Return lib/types.ts only if a small type adjustment was strictly required.

Do not modify UI files.

Do not implement CSV parsing.

Do not implement corrected CSV generation.

Do not implement URL scan logic.

Do not implement payment, authentication, database, API integrations, AI, PDF, or ZIP.
