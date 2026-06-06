# Codex Prompt 06 — Generate Corrected CSV

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Implement the corrected CSV generation module for MerchantFix.ai.

This task must create a safe corrected CSV output based on the original Shopify CSV rows and detected issues.

The corrected CSV must preserve original data, add MerchantFix.ai notes, apply only safe corrections, and mark uncertain cases for manual review.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

The V1 MVP can generate a corrected CSV only when corrections are safe.

MerchantFix.ai must never invent product identifiers.

## Files allowed to modify

lib/generateCorrectedCsv.ts

lib/types.ts only if a small type adjustment is strictly required

tests/generateCorrectedCsv.test.ts if tests are already set up

## Files forbidden to modify

app/page.tsx

app/result/[sessionId]/page.tsx

app/api/analyze/route.ts

lib/normalizeColumns.ts

lib/analyzeShopifyCsv.ts

lib/detectIdentifierIssues.ts

lib/generateSummary.ts

lib/validationRules.ts unless strictly required for compatibility

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

## Required function

Create and export a function:

generateCorrectedCsv(input: {
  sessionId: string;
  products: NormalizedProduct[];
  issues: ProductIssue[];
  originalRows: RawCsvRow[];
  merchantCenterErrorText?: string;
}): CorrectedCsvResult

The function must return:

sessionId

correctedCsv

changes

manualReviewRows

notes

disclaimer

## Core behavior

The corrected CSV must preserve every original row.

The corrected CSV must preserve every original column.

The corrected CSV must add a column:

merchantfix_notes

The corrected CSV may add a column:

merchantfix_action

The corrected CSV must never delete a product.

The corrected CSV must never reorder products unless explicitly needed and safe.

The corrected CSV must never silently overwrite customer data.

Every change or recommendation must be explained in merchantfix_notes.

## Allowed safe actions

The function may safely:

Add merchantfix_notes.

Add merchantfix_action.

Mark rows as manual review.

Normalize obvious identifier_exists formatting only when an identifier_exists column already exists and the intended value is clear.

Suggest identifier_exists=no only in notes when the product clearly appears custom, handmade, personalized, made to order, bespoke, engraved, print on demand, or one of a kind and GTIN and MPN are missing.

Create notes explaining GTIN is missing.

Create notes explaining MPN is missing.

Create notes explaining brand is missing.

Create notes explaining SKU may not be real MPN.

Create notes explaining duplicate GTIN requires review.

Create notes explaining invalid-looking GTIN requires review.

## Forbidden actions

The function must not:

Generate GTIN.

Generate MPN.

Generate brand.

Copy SKU into MPN automatically.

Invent product identifiers.

Invent manufacturer data.

Invent product images.

Invent product prices.

Change product title.

Change product handle.

Change product image.

Change product price, except simple formatting only if already supported and tested elsewhere.

Remove products.

Delete columns.

Claim Google approval.

Claim account recovery.

Claim misrepresentation is fixed.

## identifier_exists correction rule

The function may only change identifier_exists to no when all of the following are true:

The original CSV contains an identifier_exists column.

The product has no GTIN.

The product has no MPN.

The product has no brand and no vendor, or the product clearly appears custom / handmade / personalized / made to order.

The product title or handle contains a clear custom product keyword.

The issue context supports possible custom product handling.

Even then, the note must say:

Review required: this product appears custom or handmade. identifier_exists was set to no only because no GTIN or MPN was present and the product appears to have no manufacturer identifier. Confirm before resubmitting.

If these conditions are not all met, do not change identifier_exists.

Instead, add a manual review note.

## Manual review rules

A row must be marked manual review if:

GTIN is missing for a non-custom product.

MPN is missing and no GTIN exists.

Brand is missing.

GTIN has invalid format.

GTIN has invalid length.

GTIN is duplicated.

SKU and MPN are identical.

identifier_exists conflict exists but custom product status is unclear.

Any issue has fixType manual_review.

Any issue has manualReviewRequired true.

## merchantfix_notes content

merchantfix_notes should be concise but useful.

Examples:

Missing GTIN. Do not invent a GTIN. Confirm the real product identifier from manufacturer data or packaging.

Missing MPN and no GTIN found. Confirm whether a real manufacturer part number exists.

identifier_exists=true but GTIN and MPN are missing. Review product identifier data before resubmitting.

Possible custom product. Review whether identifier_exists=no is appropriate.

Duplicate GTIN detected. Confirm whether affected rows are true variants or incorrect duplicates.

Invalid-looking GTIN. Review the identifier from an official source.

SKU matches MPN. Confirm SKU is truly the manufacturer part number.

Missing brand or vendor. Add real brand or confirm vendor mapping.

## merchantfix_action values

Use simple action values such as:

review_gtin

review_mpn

review_brand

review_identifier_exists

review_duplicate_gtin

review_invalid_gtin

review_sku_mpn

manual_review

no_action

safe_note_added

## correctedCsv format

Output correctedCsv as a CSV string.

The CSV must include headers.

The CSV must include all original columns.

The CSV must include merchantfix_notes.

The CSV may include merchantfix_action.

Escape CSV values correctly.

Handle commas, quotes, and line breaks safely.

Do not use external services.

If a CSV library is available, use it.

If not, implement a small safe CSV serializer.

## changes output

For each actual changed field, add a CorrectedCsvChange.

Do not include note-only rows as changes unless the only change is merchantfix_notes or merchantfix_action.

For note-only rows, safe can be true.

For any identifier_exists change, safe must reflect cautious status.

Each change must include:

rowNumber

productTitle

field

previousValue

newValue

note

safe

## manualReviewRows output

manualReviewRows should include rows that require manual review.

Use the normalized product or issue data available in the existing types.

The result should allow later UI or export to show which products require human verification.

## notes output

The result-level notes should include:

Corrected CSV preserves original product data.

MerchantFix.ai does not generate GTIN or MPN.

Rows marked manual review require human verification.

Google approval is not guaranteed.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never claim account recovery.

Never claim misrepresentation recovery.

Never silently overwrite original data.

Never remove products.

Never remove columns.

Never mutate original rows.

## Definition of Done

generateCorrectedCsv is implemented.

Corrected CSV preserves all original columns.

Corrected CSV preserves all original rows.

merchantfix_notes is added.

merchantfix_action is added if useful.

No GTIN is generated.

No MPN is generated.

No brand is generated.

SKU is not copied to MPN automatically.

Uncertain cases are marked manual review.

Every correction or recommendation is explained.

CSV output is valid.

No forbidden features are added.

No external API calls are added.

No AI is added.

No payment, database, PDF, ZIP, Shopify API, or Google API is added.

## Output expectation

Return the full updated lib/generateCorrectedCsv.ts file.

Return lib/types.ts only if a small type adjustment was strictly required.

Do not modify UI files.

Do not implement payment, authentication, database, API integrations, AI, PDF, or ZIP.
