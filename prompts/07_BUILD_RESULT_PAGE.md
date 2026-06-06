# Codex Prompt 07 — Build Result Page

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Build the V1 diagnostic result page and connect it to the analysis API output.

This task must display the MerchantFix.ai diagnostic result clearly for a Shopify merchant.

The result page must show issue counts, affected products, recommended actions, manual review cases, and the mandatory disclaimer.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, subscriptions, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

The V1 MVP gives users a free diagnostic and may generate a corrected CSV when safe.

The result page must be understandable to a non-technical Shopify merchant.

## Files allowed to modify

app/page.tsx

app/result/[sessionId]/page.tsx

app/api/analyze/route.ts

components/

lib/types.ts only if a small type adjustment is strictly required

lib/analyzeShopifyCsv.ts only if needed for API compatibility

lib/generateCorrectedCsv.ts only if needed for corrected CSV download compatibility

## Files forbidden to modify

lib/normalizeColumns.ts unless strictly required for compatibility

lib/detectIdentifierIssues.ts unless strictly required for compatibility

lib/generateSummary.ts unless strictly required for compatibility

lib/validationRules.ts unless strictly required for compatibility

Any documentation files

Any prompt files

Any sample files unless explicitly asked

## V1 forbidden features

Do not add Stripe.

Do not add paid checkout.

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

## Required user flow

The V1 user flow should be:

User lands on homepage.

User pastes optional Merchant Center error text.

User uploads Shopify CSV.

User submits form.

The app sends data to app/api/analyze/route.ts.

The API returns an AnalysisResult.

The result page displays the diagnostic.

If corrected CSV is available, the page provides a V1 download button for the corrected CSV.

No payment should be required in V1.

## Homepage requirements

Update app/page.tsx if needed to include a functional V1 form.

The form should include:

Textarea for Merchant Center error text.

CSV file input.

Submit button:

Diagnose My Product Errors.

Clear disclaimer.

Supported error list.

Privacy note:

V1 does not require an account and does not store files permanently.

The homepage must stay clean and professional.

## API route requirements

Update app/api/analyze/route.ts if needed.

The API route should:

Accept form data.

Read csv file text.

Read optional Merchant Center error text.

Call analyzeShopifyCsv.

Optionally call generateCorrectedCsv when safe.

Return JSON with:

analysis

correctedCsv if available

No file should be stored permanently.

No external API should be called.

No database should be used.

No authentication should be required.

## Result page requirements

Build or update app/result/[sessionId]/page.tsx.

The result page must display:

Page title:

MerchantFix Diagnostic Result

Summary section.

Products analyzed.

Critical issues count.

Warnings count.

Info count.

Detected categories.

Recommended actions.

Affected products table.

Manual review notice.

Corrected CSV availability.

Mandatory disclaimer.

## Summary cards

Show four cards:

Products analyzed.

Critical issues.

Warnings.

Manual review items.

If possible, also show:

Info items.

Corrected CSV available.

## Affected products table

The table should include:

Row number.

Product title.

Issue.

Severity.

Field.

Current value.

Suggested fix.

Manual review status.

The table should prioritize:

Critical issues first.

Warnings second.

Info third.

## Severity display

Critical should look urgent.

Warning should look important.

Info should look neutral.

Do not use alarming language beyond the issue itself.

Do not promise approval.

## Manual review display

Manual review cases must be obvious.

Use clear language:

Manual review required.

Why?

Because MerchantFix.ai cannot safely verify or invent product identifiers.

## Corrected CSV download

If correctedCsv is returned by the API, provide a download button.

Button text:

Download Corrected CSV

The corrected CSV must remain free in V1.

Do not add payment gating.

Do not add Stripe.

Do not generate ZIP.

Do not generate PDF.

## Empty or error state

If analysis status is error, display:

Clear error message.

Recommended actions.

Upload another file CTA.

Mandatory disclaimer.

Do not show fake issue data.

## Result state handling

Because this is V1 without database, use one of these safe approaches:

Approach A:

Submit form and render result on the same page if simpler.

Approach B:

Use client-side state and show result after API call.

Approach C:

Use sessionId route only if temporary in-memory handling exists.

Do not add database.

Do not add persistent storage.

If a true result/[sessionId] page is too complex without a database, keep the route as a placeholder and implement same-page result display for V1.

Prefer simplicity and reliability.

## Components

You may create components if useful:

components/DiagnosticSummaryCards.tsx

components/AffectedProductsTable.tsx

components/RecommendedActions.tsx

components/DisclaimerBox.tsx

components/CsvUploadForm.tsx

Keep components simple.

Do not over-engineer.

## Copy requirements

Use clear non-technical explanations.

Use English first.

Use MerchantFix.ai consistently.

Use Google Merchant Center consistently.

Use Shopify CSV consistently.

Avoid vague wording.

Avoid saying products will be approved.

Avoid saying the account will recover.

## Mandatory disclaimer

Display this exact text on the homepage and result area:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## Privacy note

Display a short privacy note in the upload flow:

V1 does not require an account. Files are processed for diagnosis and should not be stored permanently.

Do not claim more than the implementation actually guarantees.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never claim misrepresentation recovery.

Never hide manual review cases.

Never store uploaded files permanently.

Never call external APIs.

Never add payment in V1.

## Definition of Done

Homepage includes functional diagnostic form.

User can paste optional Merchant Center error.

User can upload a Shopify CSV.

API route receives and analyzes CSV text.

Result is displayed clearly.

Summary cards show counts.

Affected products table displays issues.

Manual review is obvious.

Corrected CSV can be downloaded if available.

Mandatory disclaimer is visible.

No Stripe is added.

No authentication is added.

No database is added.

No external API calls are added.

No AI is added.

No Shopify API is added.

No Google API is added.

No PDF or ZIP is added.

The interface is responsive and readable.

The V1 flow can be tested locally.

## Output expectation

Return the full updated files.

Do not implement payment.

Do not implement authentication.

Do not implement database.

Do not implement external APIs.

Do not implement AI.

Do not implement PDF or ZIP.

Keep the result page and flow simple, safe, and V1-scoped.
