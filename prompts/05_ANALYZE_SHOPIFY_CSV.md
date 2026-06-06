# Codex Prompt 05 — Analyze Shopify CSV

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Implement the main Shopify CSV analysis module.

This task must connect the CSV parsing process, Shopify column normalization, identifier issue detection, summary generation, and final AnalysisResult object.

Do not implement UI changes unless strictly necessary.

Do not implement corrected CSV generation in this task.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, or ZIP.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

The V1 MVP must accept CSV text, normalize Shopify product rows, detect identifier-related issues, and return a clear diagnostic result.

## Files allowed to modify

lib/analyzeShopifyCsv.ts

lib/generateSummary.ts

lib/types.ts only if a small type adjustment is strictly required

app/api/analyze/route.ts only if needed to call the analysis function with placeholder input

tests/analyzeShopifyCsv.test.ts if tests are already set up

## Files forbidden to modify

app/page.tsx

app/result/[sessionId]/page.tsx

lib/normalizeColumns.ts unless strictly required for compatibility

lib/detectIdentifierIssues.ts unless strictly required for compatibility

lib/generateCorrectedCsv.ts

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

analyzeShopifyCsv(input: {
  csvText: string;
  merchantCenterErrorText?: string;
  sessionId?: string;
}): AnalysisResult

The function must:

Parse CSV text.

Normalize Shopify rows.

Detect identifier issues.

Generate summary.

Generate recommended actions.

Return AnalysisResult.

## CSV parsing requirement

Use PapaParse if available in the project.

If PapaParse is not installed yet, add it as a dependency only if this task is being executed in a real Next.js project setup.

Parsing should:

Use header row.

Skip empty lines.

Keep original column names.

Return clear errors for empty or invalid CSV.

Do not store files.

Do not upload files to external services.

Do not call any external API.

## Required behavior

If csvText is empty or whitespace only, return an AnalysisResult with:

status: "error"

totalProducts: 0

detectedCategories including system

summary explaining the file is empty

recommendedActions telling the user to upload a valid Shopify CSV

At least one issue with issueCode empty_file if the current types support it

## Invalid CSV behavior

If CSV parsing fails, return an AnalysisResult with:

status: "error"

totalProducts: 0

detectedCategories including system

summary explaining the CSV could not be parsed

recommendedActions telling the user to export a fresh Shopify CSV

At least one issue with issueCode invalid_csv if the current types support it

## Unrecognized columns behavior

If no recognizable Shopify product columns are found, return an AnalysisResult with:

status: "error"

totalProducts: 0

detectedCategories including system

summary explaining that the file does not appear to contain recognizable Shopify product columns

recommendedActions telling the user to check the export format

At least one issue with issueCode unrecognized_columns if the current types support it

## Successful analysis behavior

For a valid CSV:

Generate or reuse a sessionId.

Parse rows.

Normalize products.

Detect issues.

Count total products.

Count critical issues.

Count warnings.

Count info items.

Build detectedCategories from issues.

Build affectedProducts from issues.

Generate a plain-English summary.

Generate recommendedActions.

Set correctedCsvAvailable to true only if there are issues that may be safely exported or annotated later.

Set disclaimer using MANDATORY_DISCLAIMER.

Set createdAt as ISO date string.

## AnalysisResult status

Use status values that are compatible with the existing type.

Recommended:

success

warning

error

Use:

error when parsing fails or file is unusable.

warning when file is usable and issues are detected.

success when file is usable and no critical or warning issues are detected.

## Summary generation

Implement or update generateSummary.ts.

The summary should be deterministic and not use AI.

Examples:

If critical issues exist:

Your Shopify CSV contains product identifier conflicts that may cause Google Merchant Center disapprovals. The most urgent issues should be reviewed before resubmitting your products.

If only warnings exist:

Your Shopify CSV contains product data warnings that may limit product visibility or require review before Google Merchant Center submission.

If no issues exist:

No critical product identifier issues were detected in this CSV based on the current MerchantFix.ai V1 checks.

If error:

The uploaded file could not be analyzed. Please upload a valid Shopify CSV export.

## Recommended actions

Recommended actions should be deterministic.

Examples:

Review products with missing GTIN or MPN.

Do not invent GTIN values.

Confirm whether SKU is truly a manufacturer part number before using it as MPN.

Review identifier_exists for custom, handmade, personalized, or made-to-order products.

Add missing brand or vendor information when required.

Add missing image or price data.

Review manual review rows before resubmitting to Google Merchant Center.

## Merchant Center error text

merchantCenterErrorText may be used to enrich detected context.

Do not use AI.

Detect simple keyword mentions:

gtin

mpn

identifier_exists

brand

disapproved

limited performance

custom

handmade

personalized

made to order

This can be reflected in MerchantCenterErrorContext if useful.

Do not let pasted error text override CSV facts.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never claim account recovery.

Never claim misrepresentation recovery.

Never store uploaded files.

Never call external APIs.

Never mutate original raw rows.

Never apply CSV corrections in this module.

## Definition of Done

analyzeShopifyCsv is implemented.

CSV text can be parsed.

Normalized products are produced.

Identifier issues are detected.

Summary is generated.

Recommended actions are generated.

Counts are correct.

Error states are handled clearly.

No external APIs are called.

No files are stored.

No corrections are applied.

No forbidden features are added.

The function returns a complete AnalysisResult.

The mandatory disclaimer is included.

The logic is deterministic and testable.

## Output expectation

Return the full updated lib/analyzeShopifyCsv.ts file.

Return the full updated lib/generateSummary.ts file.

Return app/api/analyze/route.ts only if updated.

Return lib/types.ts only if a small type adjustment was strictly required.

Do not modify UI files unless explicitly necessary.

Do not implement corrected CSV generation.

Do not implement payment, authentication, database, API integrations, AI, PDF, or ZIP.
