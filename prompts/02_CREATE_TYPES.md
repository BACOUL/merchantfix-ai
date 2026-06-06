# Codex Prompt 02 — Create Core Types

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Create the core TypeScript types for the MerchantFix.ai V1 diagnostic engine.

This task must define the shared data structures used by the CSV parser, column normalizer, issue detection engine, analysis result, corrected CSV generator, and result page.

Do not implement CSV parsing logic yet.

Do not implement business rules yet.

Do not implement UI changes unless absolutely necessary for type compatibility.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

The V1 MVP must analyze Shopify CSV exports and produce a clear diagnostic without inventing product identifiers or promising Google approval.

## Files allowed to modify

lib/types.ts

You may also update imports in placeholder files only if needed to keep TypeScript valid.

## Files forbidden to modify

app/page.tsx

app/result/[sessionId]/page.tsx

app/api/analyze/route.ts

lib/normalizeColumns.ts

lib/analyzeShopifyCsv.ts

lib/detectIdentifierIssues.ts

lib/generateCorrectedCsv.ts

lib/generateSummary.ts

lib/validationRules.ts

Any documentation files

Any prompt files

Any sample files

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

## Required exports

In lib/types.ts, define and export the following types:

IssueSeverity

IssueCode

IssueCategory

IssueFixType

NormalizedProduct

ProductIssue

AnalysisResult

CorrectedCsvChange

CorrectedCsvResult

ColumnMappingResult

RawCsvRow

MerchantCenterErrorContext

## Type requirements

## IssueSeverity

Must support:

critical

warning

info

## IssueCategory

Must support:

identifier

brand

image

price

data_quality

manual_review

system

## IssueFixType

Must support:

auto_fixable

manual_review

not_fixable_from_file

informational

## IssueCode

Must support at least:

missing_gtin

missing_mpn

missing_brand

missing_identifier_exists

identifier_exists_conflict

invalid_gtin_length

invalid_gtin_format

duplicate_gtin

sku_same_as_mpn

possible_custom_product

missing_image

missing_price

unrecognized_columns

empty_file

invalid_csv

manual_review_required

## RawCsvRow

Should represent a raw CSV row.

It can be typed as:

Record<string, string>

or a safe equivalent.

## NormalizedProduct

Must include:

rowNumber

originalRow

title

handle

brand

vendor

gtin

mpn

sku

price

image

identifierExists

googleProductCategory

isPossibleCustomProduct

customProductSignals

Fields can be string, boolean, string array, null, or undefined where appropriate.

originalRow must preserve the original CSV row.

## ProductIssue

Must include:

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

## AnalysisResult

Must include:

sessionId

status

totalProducts

criticalCount

warningCount

infoCount

detectedCategories

affectedProducts

summary

recommendedActions

correctedCsvAvailable

disclaimer

createdAt

## CorrectedCsvChange

Must include:

rowNumber

productTitle

field

previousValue

newValue

note

safe

## CorrectedCsvResult

Must include:

sessionId

correctedCsv

changes

manualReviewRows

notes

disclaimer

## ColumnMappingResult

Must include:

mappedColumns

missingImportantColumns

unrecognizedColumns

warnings

Where mappedColumns maps normalized field names to original CSV column names.

## MerchantCenterErrorContext

Must include:

rawErrorText

detectedErrorKeywords

mentionsGtin

mentionsMpn

mentionsIdentifierExists

mentionsBrand

mentionsCustomProduct

mentionsDisapproved

mentionsLimitedPerformance

## Required constants

Also export:

MANDATORY_DISCLAIMER

CUSTOM_PRODUCT_KEYWORDS

VALID_GTIN_LENGTHS

## MANDATORY_DISCLAIMER value

Use this exact text:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## CUSTOM_PRODUCT_KEYWORDS

Include at least:

custom

handmade

personalized

personalised

made to order

bespoke

engraved

print on demand

one of a kind

tailor made

## VALID_GTIN_LENGTHS

Include:

8

12

13

14

## Safety rules

Never create a type that implies guaranteed Google approval.

Never create a type that implies account recovery.

Never create a type that implies MerchantFix.ai can generate real GTIN values.

Never create a type that implies MerchantFix.ai can generate real MPN values.

Keep manualReviewRequired explicit.

Keep autoFixable explicit.

Keep fixType explicit.

## Definition of Done

lib/types.ts exports all required types.

lib/types.ts exports MANDATORY_DISCLAIMER.

lib/types.ts exports CUSTOM_PRODUCT_KEYWORDS.

lib/types.ts exports VALID_GTIN_LENGTHS.

Types are clear and reusable.

No forbidden features are added.

No external API logic is added.

No UI changes are made unless required for TypeScript compatibility.

The code remains TypeScript-safe.

The project can still compile.

## Output expectation

Return the full updated lib/types.ts file.

Do not implement parser logic.

Do not implement issue detection logic.

Do not implement corrected CSV logic.

Only define the shared types and constants.
