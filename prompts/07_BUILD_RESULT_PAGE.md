# Codex Prompt 07 — Build Result Page

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Build the V1 diagnostic result flow and connect it to the analysis API output.

This task must display the MerchantFix.ai CSV diagnostic result clearly for a Shopify merchant.

The result flow must show issue counts, affected products, recommended actions, manual review cases, corrected CSV availability, and the mandatory disclaimer.

This task concerns only the V1 Shopify CSV diagnostic flow.

Do not implement the V0.5 Shopify URL surface scan in this task unless a simple navigation link already exists.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, subscriptions, agency dashboard, Shopify app, or monitoring.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues.

The product sequence is:

V0.5: no-install Shopify URL surface scan for visible product data risks.

V1: deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists issues.

This prompt concerns only the V1 CSV diagnostic user flow.

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

app/scan/page.tsx unless only adding a simple navigation link back to homepage is strictly necessary

app/api/surface-scan/route.ts

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

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

Do not add V0.5 URL scan logic.

Do not claim that the CSV diagnostic is a full Google Merchant Center diagnosis.

Do not claim that detected issues guarantee Google disapproval.

## Required user flow

The V1 user flow should be:

User lands on homepage.

User pastes optional Merchant Center error text.

User uploads Shopify CSV.

User submits form.

The app sends data to app/api/analyze/route.ts.

The API returns an AnalysisResult.

The result is displayed clearly.

If corrected CSV is available, the page provides a V1 download button for the corrected CSV.

No payment should be required in V1.

## Result handling approach

Because this is V1 without database, use the simplest reliable approach.

Preferred approach:

Submit the form from the homepage to the API route and display the result on the same page using client-side state.

Keep app/result/[sessionId]/page.tsx as a safe placeholder or static result shell unless temporary in-memory handling already exists.

Do not add database.

Do not add persistent storage.

Do not add authentication.

If using result/[sessionId] would require storage, do not implement it fully in V1.

## Homepage requirements

Update app/page.tsx if needed to include a functional V1 diagnostic form.

The form should include:

Textarea for Merchant Center error text.

CSV file input.

Submit button:

Diagnose My Product Errors

Clear mandatory disclaimer.

Supported error list.

Privacy note:

V1 does not require an account. Files are processed for diagnosis and should not be stored permanently.

The homepage must stay clean and professional.

If the homepage already contains V0.5 messaging, keep it but do not implement V0.5 scan logic in this task.

The V1 CSV form must be clearly presented as the deeper diagnostic step.

## API route requirements

Update app/api/analyze/route.ts if needed.

The API route should:

Accept form data.

Read CSV file text.

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

The API should return clear error JSON if:

No CSV file is provided.

The uploaded file cannot be read.

The CSV is empty.

The analysis function returns an error status.

## Result display requirements

Build or update the result display in app/page.tsx or app/result/[sessionId]/page.tsx depending on the chosen no-database approach.

The result display must show:

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

Do not say that detected issues guarantee Google disapproval.

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

The download may be implemented client-side using a Blob.

## Empty or error state

If analysis status is error, display:

Clear error message.

Recommended actions.

Upload another file CTA.

Mandatory disclaimer.

Do not show fake issue data.

Do not show placeholder issue counts as if they are real.

## Components

You may create components if useful:

components/DiagnosticSummaryCards.tsx

components/AffectedProductsTable.tsx

components/RecommendedActions.tsx

components/DisclaimerBox.tsx

components/CsvUploadForm.tsx

components/DiagnosticResultView.tsx

Keep components simple.

Do not over-engineer.

Do not add a component library unless it already exists.

## Copy requirements

Use clear non-technical explanations.

Use English first.

Use MerchantFix.ai consistently.

Use Google Merchant Center consistently.

Use Shopify CSV consistently.

Avoid vague wording.

Avoid saying products will be approved.

Avoid saying the account will recover.

Avoid saying MerchantFix.ai can fix all Merchant Center issues.

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

Never add V0.5 URL scan logic in this task.

## Definition of Done

Homepage includes a functional V1 diagnostic form.

User can paste optional Merchant Center error.

User can upload a Shopify CSV.

API route receives and analyzes CSV text.

Result is displayed clearly.

Summary cards show counts.

Affected products table displays issues.

Manual review is obvious.

Corrected CSV can be downloaded if available.

Mandatory disclaimer is visible.

Privacy note is visible.

No Stripe is added.

No authentication is added.

No database is added.

No external API calls are added.

No AI is added.

No Shopify API is added.

No Google API is added.

No PDF or ZIP is added.

No V0.5 scan logic is added.

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

Do not implement V0.5 URL scan logic.

Keep the result page and flow simple, safe, and V1-scoped.
