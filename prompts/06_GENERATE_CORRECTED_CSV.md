# Codex Prompt 06 — Generate Corrected CSV

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Implement the corrected CSV generation module for MerchantFix.ai.

This task must create a safe corrected CSV output based on the original Shopify CSV rows and detected V1 issues.

The corrected CSV must preserve original data, add MerchantFix.ai notes, apply only safe corrections, and mark uncertain cases for manual review.

This task concerns only the V1 Shopify CSV diagnostic engine.

Do not implement the V0.5 Shopify URL surface scan in this task.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues.

The product sequence is:

V0.5: no-install Shopify URL surface scan for visible product data risks.

V1: deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists issues.

This prompt concerns only V1 corrected CSV generation.

The V1 MVP can generate a corrected CSV only when corrections are safe.

MerchantFix.ai must never invent product identifiers.

## Files allowed to modify

lib/generateCorrectedCsv.ts

lib/types.ts only if a small type adjustment is strictly required

tests/generateCorrectedCsv.test.ts if tests are already set up

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

Do not add V0.5 URL scan logic.

Do not claim that corrected CSV generation guarantees Google approval.

Do not claim that MerchantFix.ai reproduces Google Merchant Center diagnostics.

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

Create notes explaining missing image requires review.

Create notes explaining missing price requires review.

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

Apply V0.5 surface scan results.

## identifier_exists correction rule

The function may only change identifier_exists to no when all of the following are true:

The original CSV contains an identifier_exists column.

The product has no GTIN.

The product has no MPN.

The product has no brand and no vendor, or the product clearly appears custom, handmade, personalized, or made to order.

The product title or handle contains a clear custom product keyword.

The issue context supports possible custom product handling.

Even then, the note must say:

Review required: this product appears custom or handmade. identifier_exists was set to no only because no GTIN or MPN was present and the product appears to have no manufacturer identifier. Confirm before resubmitting.

If these conditions are not all met, do not change identifier_exists.

Instead, add a manual review note.

Important:

Do not create an identifier_exists column if the original CSV did not contain one.

Do not set identifier_exists=no only because GTIN is missing.

Do not set identifier_exists=no for branded products without clear custom product signals.

Do not set identifier_exists=no if brand or vendor data suggests the product may have manufacturer identifiers.

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

Missing image. Add a valid product image in Shopify before resubmitting.

Missing price. Add a valid product price in Shopify before resubmitting.

## merchantfix_action values

Use simple action values such as:

review_gtin

review_mpn

review_brand

review_identifier_exists

review_duplicate_gtin

review_invalid_gtin

review_sku_mpn

review_image

review_price

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

If the current CorrectedCsvResult type expects RawCsvRow[] or a compatible structure, include the original row data plus merchantfix_notes and merchantfix_action where possible.

Do not mutate the original rows.

## notes output

The result-level notes should include:

Corrected CSV preserves original product data.

MerchantFix.ai does not generate GTIN or MPN.

MerchantFix.ai does not invent brand.

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

Never apply V0.5 surface scan logic in this module.

## Input handling

If products is empty, return a valid CorrectedCsvResult with the original rows serialized if possible, merchantfix_notes column added, notes explaining no products were available for correction, and the mandatory disclaimer.

If originalRows is empty, return a valid CorrectedCsvResult with an empty correctedCsv or header-only CSV if appropriate, notes explaining no original rows were available, and the mandatory disclaimer.

If issues is empty, still generate a CSV with merchantfix_notes and merchantfix_action columns.

For rows with no issues, set merchantfix_action to no_action and merchantfix_notes to a short safe note such as:

No supported V1 correction needed based on current MerchantFix.ai checks.

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

No V0.5 URL scan logic is added.

The module is deterministic and testable.

## Output expectation

Return the full updated lib/generateCorrectedCsv.ts file.

Return lib/types.ts only if a small type adjustment was strictly required.

Do not modify UI files.

Do not implement payment, authentication, database, API integrations, AI, PDF, or ZIP.

Do not implement V0.5 URL scan logic.
