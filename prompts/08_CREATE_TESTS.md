# Codex Prompt 08 — Create V1 Tests

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Create the automated tests for the MerchantFix.ai V1 diagnostic engine.

This task must test the core V1 modules:

normalizeColumns

detectIdentifierIssues

analyzeShopifyCsv

generateCorrectedCsv

The goal is to verify that MerchantFix.ai detects Shopify CSV identifier issues safely and never invents product identifiers.

Do not implement new product features.

Do not add payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, subscriptions, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

V1 must be safe, deterministic, and testable.

The tests must protect against unsafe corrections and scope creep.

## Files allowed to modify

tests/

package.json only if a test framework script must be added

vitest.config.ts only if needed

lib/types.ts only if a small type compatibility adjustment is strictly required

Existing lib files only if a test reveals a real bug and the fix is necessary

## Files forbidden to modify

app/page.tsx

app/result/[sessionId]/page.tsx

app/api/analyze/route.ts unless strictly necessary to fix a test setup issue

Any documentation files

Any prompt files

Any production feature outside test-driven fixes

## Recommended test framework

Use Vitest if no test framework exists.

If Vitest is not installed, add the minimum required dependencies and scripts.

Do not add heavy or unnecessary testing tools.

Do not add Playwright in V1 unless specifically requested later.

## Required test files

Create tests for:

tests/normalizeColumns.test.ts

tests/detectIdentifierIssues.test.ts

tests/analyzeShopifyCsv.test.ts

tests/generateCorrectedCsv.test.ts

If the project uses a different test folder convention, keep it simple and consistent.

## Test data

Use inline fictional rows or fictional sample CSV content.

Do not use real customer data.

Do not use real Shopify store data.

Do not use real Merchant Center screenshots.

Do not add private files.

## Required tests for normalizeColumns

Test 1: maps common Shopify columns.

Input row columns:

Title

Handle

Vendor

Variant Barcode

Variant SKU

Variant Price

Image Src

identifier_exists

Expected:

title is mapped.

handle is mapped.

vendor is mapped.

gtin is mapped from Variant Barcode.

sku is mapped from Variant SKU.

price is mapped.

image is mapped.

identifierExists is normalized.

originalRow is preserved.

rowNumber is correct.

Test 2: handles lowercase and alternative columns.

Input row columns:

title

handle

brand

gtin

sku

mpn

price

image_link

Identifier Exists

Expected normalized fields are mapped correctly.

Test 3: missing columns do not crash.

Input row has only Title and Variant SKU.

Expected:

Product is created.

Missing fields are null or undefined consistently.

Warnings include missing important columns if implemented.

Test 4: custom product detection.

Input title:

Custom Handmade Bracelet

Expected:

isPossibleCustomProduct is true.

customProductSignals includes custom and handmade if both are detected.

Test 5: original rows are not mutated.

Expected:

Input raw row remains unchanged.

## Required tests for detectIdentifierIssues

Test 1: identifier_exists conflict.

Product:

identifierExists true

gtin missing

mpn missing

Expected:

identifier_exists_conflict issue.

severity critical.

manualReviewRequired true.

autoFixable false.

Test 2: missing GTIN warning.

Product:

gtin missing

not custom

Expected:

missing_gtin warning.

Test 3: missing MPN warning.

Product:

mpn missing

gtin missing

Expected:

missing_mpn warning.

Test 4: missing brand warning.

Product:

brand missing

vendor missing

Expected:

missing_brand warning.

Test 5: missing identifier_exists info.

Product:

identifierExists null

Expected:

missing_identifier_exists info.

Test 6: invalid GTIN format.

Product:

gtin contains non-digit characters

Expected:

invalid_gtin_format warning.

Test 7: invalid GTIN length.

Product:

numeric gtin with invalid length

Expected:

invalid_gtin_length warning.

Test 8: duplicate GTIN.

Two products share same non-empty GTIN.

Expected:

duplicate_gtin warning for affected rows.

Test 9: SKU identical to MPN.

Product:

sku same as mpn

Expected:

sku_same_as_mpn info.

Test 10: possible custom product.

Product:

isPossibleCustomProduct true

gtin missing

mpn missing

Expected:

possible_custom_product info or manual review issue.

Test 11: issue ordering.

Expected:

critical issues first.

warnings second.

info third.

Rows ordered ascending within same severity.

Test 12: no mutation.

Expected:

Original product objects are not mutated.

## Required tests for analyzeShopifyCsv

Test 1: empty CSV.

Input:

empty string

Expected:

status error.

totalProducts 0.

summary explains empty file.

recommendedActions include upload valid CSV.

disclaimer included.

Test 2: valid clean CSV.

Input:

CSV with valid title, GTIN, MPN or enough identifiers, brand, price, image.

Expected:

status success or warning depending on identifier_exists.

No false critical errors.

totalProducts correct.

disclaimer included.

Test 3: missing GTIN CSV.

Input:

CSV with identifier_exists true and no GTIN or MPN.

Expected:

criticalCount greater than 0.

identifier_exists_conflict detected.

recommendedActions mention not inventing GTIN.

Test 4: custom product CSV.

Input:

CSV with custom or handmade title and no identifiers.

Expected:

custom product signal detected.

manual review recommended.

No fake identifiers generated.

Test 5: invalid CSV or unrecognized columns.

Input:

CSV with unrelated columns only.

Expected:

status error.

summary explains unrecognized product columns.

Test 6: detected categories.

Expected:

detectedCategories includes relevant categories based on issues.

Test 7: createdAt and sessionId.

Expected:

createdAt exists.

sessionId exists.

## Required tests for generateCorrectedCsv

Test 1: preserves original columns.

Input:

original row with several columns.

Expected:

corrected CSV includes all original columns.

Test 2: preserves original rows.

Input:

multiple rows.

Expected:

same number of data rows in output.

Test 3: adds merchantfix_notes.

Expected:

merchantfix_notes header exists.

Rows with issues contain notes.

Test 4: does not invent GTIN.

Input:

missing GTIN.

Expected:

GTIN remains empty.

Notes mention manual review.

Test 5: does not invent MPN.

Input:

missing MPN.

Expected:

MPN remains empty.

Notes mention manual review.

Test 6: does not invent brand.

Input:

missing brand.

Expected:

brand remains empty.

Notes mention manual review.

Test 7: does not copy SKU to MPN automatically.

Input:

SKU exists, MPN missing.

Expected:

MPN remains missing.

Manual review note if relevant.

Test 8: manual review rows are returned.

Expected:

manualReviewRows includes rows with manualReviewRequired issues.

Test 9: CSV escaping works.

Input:

title or note contains comma, quote, or newline.

Expected:

CSV output is valid and escaped.

Test 10: disclaimer included.

Expected:

CorrectedCsvResult includes mandatory disclaimer.

## Safety tests

The test suite must include explicit assertions that:

No GTIN is generated.

No MPN is generated.

No brand is generated.

No approval guarantee appears in generated notes.

No account recovery promise appears in generated notes.

No misrepresentation recovery promise appears in generated notes.

## Forbidden features check

Tests should not require:

Stripe.

Auth.

Database.

Supabase.

OpenAI.

Shopify API.

Google API.

PDF generation.

ZIP generation.

Monitoring.

## Package scripts

If needed, add:

test

test:watch

Example:

test: vitest run

test:watch: vitest

Do not add unnecessary scripts.

## Definition of Done

Vitest or chosen lightweight test framework is configured.

All required test files are created.

Core modules are tested.

Safety rules are tested.

Sample scenarios are covered.

No real customer data is used.

No forbidden features are added.

Tests can run locally.

No payment, auth, database, AI, API integration, PDF, or ZIP is added.

## Output expectation

Return the full created test files.

Return package.json only if modified.

Return vitest.config.ts only if created or modified.

Return any lib file only if a real bug fix was necessary.

Do not modify documentation or prompt files.

Do not add product features beyond test-driven fixes.
