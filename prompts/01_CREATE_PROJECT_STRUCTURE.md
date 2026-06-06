# Codex Prompt 01 — Create Project Structure

## Project

MerchantFix.ai

## Current version

V0.5 / V1 preparation

## Objective

Create the initial Next.js project structure for MerchantFix.ai.

This task must create the technical foundation only.

Do not implement the full product yet.

Do not add payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF generation, ZIP generation, subscriptions, agency dashboard, Shopify app, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues, starting with a no-install Shopify URL surface scan and a deeper Shopify CSV diagnostic for product identifier problems such as GTIN, MPN, brand, and identifier_exists.

The V0.5 flow must eventually allow a user to enter a Shopify store URL, run a public surface scan when product data is available, see basic visible risks, and continue toward Shopify CSV upload.

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

app/scan/page.tsx

app/result/[sessionId]/page.tsx

app/api/surface-scan/route.ts

app/api/analyze/route.ts

components/

lib/types.ts

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

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

Check your Shopify store for visible product data issues in 60 seconds. Then upload your Shopify product export for deeper GTIN, MPN, brand, and identifier_exists diagnosis.

Primary CTA:

Check My Shopify Store

Secondary CTA:

Upload Shopify CSV

Sections:

Supported checks.

How it works.

What MerchantFix.ai can scan.

What MerchantFix.ai can diagnose.

What MerchantFix.ai cannot guarantee.

Pricing preview.

FAQ.

Mandatory disclaimer.

## Mandatory disclaimer

Add this exact disclaimer visibly on the homepage:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

Also add this exact V0.5 surface scan disclaimer visibly anywhere the Shopify URL scan is described:

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

## Supported checks section

The supported checks section should mention two levels.

V0.5 surface scan checks:

Missing image.

Missing price.

Weak or very short title.

Empty or weak description.

Basic product count.

V1 CSV diagnostic checks:

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

Enter your Shopify store URL.

MerchantFix.ai runs a no-install surface scan when public product data is available.

Review visible product data risks.

Upload your Shopify CSV for deeper identifier diagnosis.

MerchantFix.ai scans product identifier issues.

You receive a clear diagnosis.

Safe corrections can be exported in a corrected CSV.

Uncertain cases are marked for manual review.

## What MerchantFix.ai can scan section

Mention:

Detect visible product data risks from publicly available Shopify product data when accessible.

Count public products when available.

Detect missing images.

Detect missing prices.

Detect weak titles.

Detect weak descriptions.

Invite the user to upload a Shopify CSV for deeper analysis.

## What MerchantFix.ai can diagnose section

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

No claim that the URL scan reproduces Google Merchant Center diagnostics.

## Pricing preview section

Do not implement Stripe.

Show a simple future pricing preview only:

Free Shopify URL Surface Scan.

Free CSV Diagnosis.

Future Fix Pack.

Agency plans later.

Clearly mention that payment is not active in V0.5 or V1.

## Required scan page placeholder

Create app/scan/page.tsx.

The scan page can be a placeholder for now.

It must include:

Page title:

Shopify Store Surface Scan

A placeholder Shopify store URL input.

A placeholder button:

Run Surface Scan

A short explanation:

This scan uses publicly available product data when accessible. It is not a full Google Merchant Center diagnosis.

Placeholder summary cards:

Products detected.

Missing images.

Missing prices.

Weak titles.

Weak descriptions.

CTA placeholder:

Upload Shopify CSV for deeper diagnosis.

Mandatory surface scan disclaimer.

Do not implement real public product fetching in this prompt.

Do not implement real scan logic in this prompt.

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

## Required API route placeholders

Create app/api/surface-scan/route.ts.

It should return a simple JSON placeholder response.

Example fields:

status.

message.

scanId.

Do not implement public product fetching yet.

Do not implement URL scanning yet.

Do not implement external API calls.

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

Create the following V0.5 lib files with placeholder exports and clear TODO comments:

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

These files must not contain full implementation yet.

They should define the intended responsibility of each module.

Create the following V1 lib files with placeholder exports and clear TODO comments:

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

SurfaceRiskCode.

SurfaceScanProduct.

SurfaceRisk.

SurfaceScanResult.

NormalizedProduct.

ProductIssue.

AnalysisResult.

CorrectedCsvResult.

These can be basic placeholders and will be refined in later prompts.

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

Do not claim that the Shopify URL scan is a full Merchant Center diagnosis.

Do not claim that detected V0.5 issues are guaranteed Google disapproval causes.

Do not create fake sample customer data beyond harmless placeholders.

Do not store uploaded files.

Do not store submitted URLs.

Do not create a full URL scanner yet.

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

Always keep the surface scan disclaimer visible where V0.5 is described.

Keep V0.5 surface scan logic separate from V1 CSV diagnostic logic.

## Definition of Done

The project structure exists.

The homepage renders.

The scan page placeholder renders.

The result page placeholder renders.

The surface-scan API route returns placeholder JSON.

The analyze API route returns placeholder JSON.

The required V0.5 lib files exist.

The required V1 lib files exist.

The initial TypeScript placeholder types exist.

There is no Stripe.

There is no authentication.

There is no database.

There are no external API calls.

There is no AI.

There is no Shopify API.

There is no Google API.

The mandatory disclaimer appears on the homepage and result page.

The surface scan disclaimer appears on the homepage and scan page.

The app can run locally.

## Output expectation

Return the created or modified files.

Keep the implementation minimal, clean, and scoped to project setup only.

Do not proceed to public product fetching, URL scan logic, CSV parsing, business logic, payment, or integrations in this task.
