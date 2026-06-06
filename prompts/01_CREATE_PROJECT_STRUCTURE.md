# Codex Prompt 01 — Create Project Structure

## Project

MerchantFix.ai

## Current version

V1 preparation

## Objective

Create the initial Next.js project structure for MerchantFix.ai.

This task must create the technical foundation only.

Do not implement the full product yet.

Do not add payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF generation, ZIP generation, subscriptions, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues, starting with product identifier problems such as GTIN, MPN, brand, and identifier_exists.

The V1 MVP must eventually allow a user to paste a Google Merchant Center error, upload a Shopify CSV, receive a diagnostic, and generate a corrected CSV when the correction is safe.

This first task only creates the project structure and basic placeholder pages.

## Stack

Use:

Next.js 14 or latest stable Next.js App Router.

TypeScript.

Tailwind CSS.

ESLint.

No authentication.

No database.

No Stripe.

No OpenAI.

No Shopify API.

No Google Merchant Center API.

No PDF.

No ZIP.

No monitoring.

## Required structure

Create or prepare this structure:

app/page.tsx

app/result/[sessionId]/page.tsx

app/api/analyze/route.ts

components/

lib/types.ts

lib/normalizeColumns.ts

lib/analyzeShopifyCsv.ts

lib/detectIdentifierIssues.ts

lib/generateCorrectedCsv.ts

lib/generateSummary.ts

lib/validationRules.ts

samples/

tests/

docs/

prompts/

qa/

public/

## Required homepage

Create a clean landing page in app/page.tsx.

The homepage must include:

Headline:

Fix rejected Google Merchant Center products

Subheadline:

Paste your Merchant Center error or upload your Shopify product export. Get a clear diagnosis, exact fixes, and a corrected CSV when possible.

Primary CTA:

Diagnose My Product Errors

Sections:

Supported errors.

How it works.

What MerchantFix.ai can fix.

What MerchantFix.ai cannot guarantee.

Pricing preview.

FAQ.

Mandatory disclaimer.

## Mandatory disclaimer

Add this exact disclaimer visibly on the homepage:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## Supported errors section

The supported errors section should mention:

Missing GTIN.

Missing MPN.

Missing brand.

Incorrect identifier_exists.

Invalid-looking GTIN.

Duplicate GTIN.

SKU used as MPN warning.

Missing image.

Missing price.

## How it works section

Explain this simple flow:

Paste your Merchant Center error.

Upload your Shopify CSV.

MerchantFix.ai scans product identifier issues.

You receive a clear diagnosis.

Safe corrections can be exported in a corrected CSV.

Uncertain cases are marked for manual review.

## What MerchantFix.ai can fix section

Mention:

Detect product identifier inconsistencies.

Find rows with missing GTIN or MPN.

Identify identifier_exists conflicts.

Detect suspicious or duplicate GTIN values.

Create a corrected CSV only when changes are safe.

Add merchantfix_notes to explain recommendations.

## What MerchantFix.ai cannot guarantee section

Mention:

No Google approval guarantee.

No fake GTIN generation.

No fake MPN generation.

No account suspension recovery.

No automatic misrepresentation fix.

No full Merchant Center account recovery.

## Pricing preview section

Do not implement Stripe.

Show a simple future pricing preview only:

Free Diagnosis.

Future Fix Pack.

Agency plans later.

Clearly mention that payment is not active in V1.

## Required result page placeholder

Create app/result/[sessionId]/page.tsx.

The result page can be a placeholder for now.

It must include:

Page title:

MerchantFix Diagnostic Result

Placeholder summary cards:

Products analyzed.

Critical issues.

Warnings.

Manual review items.

Placeholder table for affected products.

Mandatory disclaimer.

Do not implement real analysis logic in this prompt.

## Required API route placeholder

Create app/api/analyze/route.ts.

It should return a simple JSON placeholder response.

Example fields:

status.

message.

sessionId.

Do not implement CSV parsing yet.

Do not implement file storage.

Do not implement external API calls.

## Required lib files

Create the following lib files with placeholder exports and clear TODO comments:

lib/types.ts

lib/normalizeColumns.ts

lib/analyzeShopifyCsv.ts

lib/detectIdentifierIssues.ts

lib/generateCorrectedCsv.ts

lib/generateSummary.ts

lib/validationRules.ts

These files must not contain full implementation yet.

They should define the intended responsibility of each module.

## Required types placeholder

In lib/types.ts, create initial TypeScript placeholder types for:

IssueSeverity.

IssueCode.

NormalizedProduct.

ProductIssue.

AnalysisResult.

CorrectedCsvResult.

These can be basic placeholders and will be refined in a later prompt.

## Design requirements

Use a clean SaaS layout.

Use a professional B2B style.

Use responsive design.

Use clear spacing.

Use simple cards.

Use readable typography.

Avoid heavy animations.

Avoid unnecessary dependencies.

## Forbidden actions

Do not add Stripe.

Do not add authentication.

Do not add user accounts.

Do not add database.

Do not add Supabase.

Do not add OpenAI.

Do not add AI calls.

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

Do not create fake sample customer data beyond harmless placeholders.

Do not store uploaded files.

Do not create a full CSV parser yet.

Do not create payment logic.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never claim automatic misrepresentation recovery.

Always keep manual review for uncertain cases.

Always keep the mandatory disclaimer visible.

## Definition of Done

The project structure exists.

The homepage renders.

The result page placeholder renders.

The analyze API route returns placeholder JSON.

The required lib files exist.

The initial TypeScript placeholder types exist.

There is no Stripe.

There is no authentication.

There is no database.

There are no external API calls.

There is no AI.

There is no Shopify API.

There is no Google API.

The mandatory disclaimer appears on the homepage and result page.

The app can run locally.

## Output expectation

Return the created or modified files.

Keep the implementation minimal, clean, and scoped to project setup only.

Do not proceed to CSV parsing or business logic in this task.
