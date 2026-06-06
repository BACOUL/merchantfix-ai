# MerchantFix.ai Project Context

This file provides the global context that must be included or respected in every Codex task for MerchantFix.ai.

Codex must follow this context strictly.

## Project name

MerchantFix.ai

## Project repository

merchantfix-ai

## Product definition

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues, starting with product identifier problems such as GTIN, MPN, brand, and identifier_exists.

The first version is intentionally narrow.

The first MVP focuses only on Shopify CSV files and Google Merchant Center identifier issues.

## Initial product promise

Paste your Merchant Center error or upload your Shopify product export. Get a clear diagnosis, exact fixes, and a corrected CSV when possible.

## Mandatory disclaimer

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

This disclaimer must appear on all relevant customer-facing pages, reports, payment pages, SEO pages, and Fix Pack outputs.

## Current version

Current phase: V0 / V1 preparation.

Current build target: V1 diagnostic MVP.

## V1 objective

Build a no-auth, no-database diagnostic MVP that can:

Accept a pasted Google Merchant Center error message.

Accept a Shopify CSV upload.

Parse the Shopify CSV.

Normalize common Shopify columns.

Detect GTIN, MPN, brand, and identifier_exists issues.

Show a clear diagnostic result.

Generate a corrected CSV when the correction is safe.

Mark uncertain cases as manual review.

Add merchantfix_notes to explain every correction or recommendation.

## V1 allowed features

Landing page.

Textarea for pasted Merchant Center error.

Shopify CSV upload.

CSV parsing.

Flexible Shopify column normalization.

GTIN detection.

MPN detection.

Brand detection.

identifier_exists detection.

Invalid-looking GTIN detection.

Duplicate GTIN detection.

SKU identical to MPN detection.

Missing image warning.

Missing price warning.

Diagnostic result page.

Affected products table.

Severity levels: critical, warning, info.

Recommended actions.

Corrected CSV generation when safe.

merchantfix_notes column.

merchantfix_action column if useful.

Manual review labels.

Fictional sample CSV files.

Automated tests.

Mandatory disclaimer.

## V1 forbidden features

Do not add Stripe.

Do not add paid checkout.

Do not add authentication.

Do not add user accounts.

Do not add database.

Do not add Supabase.

Do not add Shopify API.

Do not add Google Merchant Center API.

Do not add OpenAI API.

Do not add AI calls.

Do not add PDF generation.

Do not add ZIP generation.

Do not add subscriptions.

Do not add agency dashboard.

Do not add WooCommerce.

Do not add Prestashop.

Do not add Magento.

Do not add XML parsing.

Do not add Merchant Center monitoring.

Do not add Shopify app.

Do not add Amazon.

Do not add Meta Catalog.

Do not add TikTok Shop.

Do not add automatic misrepresentation fix.

Do not add account suspension recovery.

Do not guarantee Google approval.

## Product safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never claim automatic misrepresentation recovery.

Never store sensitive customer files unnecessarily.

Never commit real customer files to GitHub.

Never use AI as the source of truth for critical corrections.

Never change original CSV data silently.

Never remove original columns.

Never remove original rows.

Always explain corrections in merchantfix_notes.

Always mark uncertain cases as manual review.

## Data handling rules

V1 should avoid persistent storage.

V1 should not require user accounts.

V1 should not store uploaded files permanently.

V1 should not send CSV files to external AI APIs.

V1 should not commit customer data.

Only fictional sample CSV files may be stored in the repository.

## Initial supported issue rules

If identifier_exists is true and both GTIN and MPN are missing, create a critical issue.

If GTIN is missing and the product does not clearly look custom, handmade, personalized, or made to order, create a warning.

If MPN is missing and no GTIN is available, create a warning.

If brand is missing, create a warning.

If identifier_exists is missing, create an info issue.

If GTIN exists but is not numeric or length is not 8, 12, 13, or 14 digits, create a warning.

If the same GTIN appears across multiple distinct products, create a warning.

If SKU and MPN are identical, create an info issue that SKU may not be a real manufacturer part number.

If image is missing, create a warning.

If price is missing, create a warning.

If the product title suggests custom, handmade, personalized, made to order, bespoke, engraved, print on demand, or one of a kind, mark identifier recommendations cautiously and prefer manual review unless the context is clear.

## Corrections allowed in V1

Add merchantfix_notes.

Add merchantfix_action if useful.

Normalize identifier_exists formatting when safe.

Mark manual review.

Suggest identifier_exists=no only when the product clearly appears custom, handmade, personalized, or made to order and no GTIN, MPN, or brand exists.

Generate a corrected CSV only when changes are safe.

## Corrections forbidden in V1

Do not generate GTIN.

Do not generate MPN.

Do not generate brand.

Do not copy SKU into MPN automatically.

Do not change product title automatically.

Do not change product price automatically except simple safe formatting if explicitly implemented and tested.

Do not change product image automatically.

Do not claim a CSV correction will guarantee Google approval.

## Planned stack

Next.js 14.

TypeScript.

Tailwind CSS.

PapaParse.

No authentication in V1.

No database in V1.

No Stripe in V1.

No AI in V1.

## Planned structure

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

## Required sample files

samples/clean-shopify.csv

samples/missing-gtin.csv

samples/custom-products.csv

samples/duplicate-gtin.csv

samples/dirty-file.csv

samples/invalid-gtin.csv

samples/sku-as-mpn.csv

samples/missing-brand.csv

All sample files must be fictional.

## Coding principles

Keep the code modular.

Business rules must live in lib files, not inside UI components.

UI displays results.

Parser reads CSV.

Normalizer maps columns.

Rules engine detects issues.

CSV generator applies only safe corrections.

Summary generator creates user-friendly explanations.

No hidden side effects.

No unsafe mutation of original data.

Clear TypeScript types.

Readable code.

Testable functions.

## Codex task rules

Every Codex task must be narrow.

Do not build the full project in one prompt.

Each task must specify allowed files.

Each task must specify forbidden files.

Each task must specify current version.

Each task must specify Definition of Done.

Each task must specify required tests.

If a task asks for one module, modify only that module and its related tests unless explicitly allowed.

If Codex adds forbidden features, the output must be rejected.

If Codex removes disclaimers, the output must be rejected.

If Codex adds secrets or real data, the output must be rejected.

If Codex modifies unrelated files, review carefully before accepting.

## Current next technical goal

After documentation, prompts, and sample files are ready, initialize the Next.js project and build the V1 diagnostic MVP.

The first actual implementation should not include payment, authentication, database, AI, APIs, or monitoring.

## Final instruction for Codex

Build MerchantFix.ai step by step.

Respect the current version scope.

Do not expand the product.

Do not invent product identifiers.

Do not guarantee Google approval.

Keep V1 narrow, safe, and testable.
