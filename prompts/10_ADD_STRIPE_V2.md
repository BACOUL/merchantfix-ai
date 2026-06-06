# Codex Prompt 10 — Add Stripe Payment for V2

## Project

MerchantFix.ai

## Current version

V2 paid Fix Pack

## Important warning

Do not use this prompt before V1 is fully validated.

This prompt is for V2 only.

Before using this prompt, V1 must already have:

Working Shopify CSV upload.

Working CSV parsing.

Working column normalization.

Working GTIN / MPN / brand / identifier_exists detection.

Working diagnostic result.

Working corrected CSV generation when safe.

Passing V1 tests.

Clear disclaimer.

No unsafe identifier generation.

If V0.5 is active, it must already be clearly separated from V1 and must not be treated as the paid diagnostic engine.

## Objective

Add a simple Stripe one-time payment flow for the MerchantFix.ai Fix Pack.

The goal is to validate whether users will pay after seeing a free diagnostic.

This task must not add subscriptions, agency dashboard, authentication, database-heavy architecture, Shopify API, Google Merchant Center API, AI, monitoring, or Shopify app.

## Product context

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues.

The product sequence is:

V0.5: no-install Shopify URL surface scan for visible product data risks.

V1: deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists issues.

V2: paid Fix Pack after the free CSV diagnostic.

V0.5 is an acquisition layer.

V1 is the serious diagnostic engine.

V2 monetizes the validated diagnostic.

The Fix Pack should include:

Full report.

Corrected CSV when safe.

Manual review CSV.

Resubmission checklist.

Mandatory disclaimer.

## V2 offer

Single paid offer:

Fix Pack.

Target price:

79 euros.

Do not create multiple pricing tiers in this task.

Do not create subscriptions in this task.

Do not create agency plans in this task.

## Files allowed to modify

app/page.tsx

app/result/[sessionId]/page.tsx

app/success/page.tsx or app/success/[sessionId]/page.tsx

app/cancel/page.tsx if needed

app/api/create-checkout-session/route.ts

app/api/stripe/webhook/route.ts if needed

lib/stripe.ts

lib/types.ts only if a small type adjustment is strictly required

.env.example

package.json if Stripe package is added

## Files forbidden to modify

app/scan/page.tsx unless adding a small V2 CTA reference is strictly necessary

app/api/surface-scan/route.ts

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

lib/normalizeColumns.ts unless strictly necessary

lib/detectIdentifierIssues.ts unless strictly necessary

lib/analyzeShopifyCsv.ts unless strictly necessary

lib/generateCorrectedCsv.ts unless strictly necessary

Any documentation files unless explicitly asked

Any prompt files

Any sample files

## V2 forbidden features

Do not add subscriptions.

Do not add agency dashboard.

Do not add complex authentication.

Do not add user accounts unless absolutely necessary.

Do not add Supabase unless explicitly requested.

Do not add OpenAI or AI calls.

Do not add Shopify API.

Do not add Google Merchant Center API.

Do not add monitoring.

Do not add Shopify app.

Do not add WooCommerce.

Do not add XML parsing.

Do not add automatic misrepresentation fix.

Do not add approval guarantee.

Do not add account recovery guarantee.

Do not make the V0.5 URL surface scan paid.

Do not make the V0.5 URL surface scan look like a full Merchant Center diagnosis.

## Stripe requirements

Use Stripe Checkout for one-time payment.

Use environment variables:

STRIPE_SECRET_KEY

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

STRIPE_WEBHOOK_SECRET if webhook is implemented

NEXT_PUBLIC_APP_URL

Do not hardcode secrets.

Do not commit real keys.

Do not expose secret keys to client components.

## Checkout flow

The user sees a free diagnostic.

The result page shows a CTA:

Download Full Fix Pack

When clicked, create a Stripe Checkout Session.

After successful payment, redirect to success page.

After cancellation, redirect to cancel page or back to result page.

## Important V2 delivery rule

If the project does not yet have safe persistent session storage, keep delivery simple.

Acceptable V2 MVP delivery options:

Option A: use temporary session data only for local testing.

Option B: regenerate the Fix Pack from user-provided input if needed.

Option C: require the user to download immediately after payment.

Do not add a complex database unless explicitly requested.

Do not over-engineer file storage.

Do not store uploaded files permanently.

Do not store unnecessary customer data.

## Fix Pack contents

The paid Fix Pack should include or prepare for:

merchantfix-report.pdf

corrected-products.csv

manual-review-products.csv

resubmission-checklist.pdf

If PDF or ZIP generation is not implemented yet, create clear TODOs and deliver available CSV output first.

Do not pretend files exist if they are not generated.

If only corrected CSV is available at this stage, label the paid deliverable honestly.

## Checkout page copy

Use clear language:

Download Full Fix Pack

Includes:

Detailed diagnosis.

Corrected CSV when safe.

Manual review product list.

Resubmission checklist.

No fake GTIN or MPN generation.

Google approval is not guaranteed.

## Mandatory disclaimer

Display this exact disclaimer near the payment CTA and on the success page:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

If V0.5 is mentioned near the payment flow, also display this disclaimer:

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

## Payment safety rules

Do not imply approval is guaranteed.

Do not imply products will be approved.

Do not imply account recovery.

Do not imply MerchantFix.ai fixes all Merchant Center problems.

Clearly state that some issues require manual review.

Clearly state that GTIN, MPN, and brand are never invented.

Clearly separate the free surface scan, free CSV diagnosis, and paid Fix Pack.

## API route requirements

Create:

app/api/create-checkout-session/route.ts

It should:

Accept POST request.

Create a Stripe Checkout Session.

Use one-time payment mode.

Use price data or a configured Stripe price.

Redirect to success URL.

Redirect to cancel URL.

Return session URL or session ID.

Do not expose secret keys.

Do not store sensitive customer files.

Do not create subscriptions.

Do not create agency plans.

## Stripe webhook

Webhook is optional in early V2.

If implemented:

Create app/api/stripe/webhook/route.ts.

Verify Stripe signature.

Handle checkout.session.completed.

Do not add complex fulfillment unless storage is implemented.

Do not store unnecessary personal data.

Do not store uploaded product CSV files permanently.

If not implemented:

Add TODO comments explaining webhook can be added later.

## Success page

Create a success page.

It must:

Thank the user.

Explain how to download or access the Fix Pack if implemented.

Show mandatory disclaimer.

Avoid guaranteeing approval.

Avoid implying account recovery.

If download is not fully implemented, clearly state what is currently available.

## Cancel page

Create a simple cancel page if needed.

It should:

Explain payment was canceled.

Offer return to diagnostic.

Avoid aggressive language.

Avoid false urgency.

## Package requirements

If Stripe package is missing, add:

stripe

Do not add unnecessary packages.

## .env.example update

Ensure .env.example includes:

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

NEXT_PUBLIC_APP_URL=

Do not add real keys.

## Definition of Done

Stripe package is installed if needed.

Environment variables are used.

Checkout session route exists.

Result page has payment CTA.

Payment CTA does not appear as active unless the route works.

Success page exists.

Cancel page exists if used.

Mandatory disclaimer appears near payment.

No approval guarantee is made.

No account recovery guarantee is made.

No subscriptions are added.

No agency plans are added.

No auth is added unless absolutely necessary.

No database is added unless explicitly requested.

No Shopify API is added.

No Google API is added.

No AI is added.

No monitoring is added.

No fake GTIN, MPN, or brand generation is added.

V0.5 remains separate from V1 and V2.

The V0.5 surface scan is not made paid.

The V2 payment CTA is tied to the Fix Pack after CSV diagnostic, not to a public URL scan alone.

## Output expectation

Return the full created or modified files.

Do not modify V1 diagnostic logic unless strictly necessary.

Do not modify V0.5 surface scan logic unless strictly necessary.

Do not add subscriptions.

Do not add agency dashboard.

Do not add authentication or database unless explicitly required.

Keep the V2 payment flow simple and one-time only.

Keep the paid offer honest, limited, and clearly scoped.
