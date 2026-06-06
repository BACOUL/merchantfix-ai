# MerchantFix.ai Version Scope

This document defines the exact scope of each MerchantFix.ai version.

Its purpose is to prevent scope creep, premature complexity, and accidental expansion into features that should only be built after validation.

## Core rule

One version equals one objective, one validation, and no scope creep.

A feature is allowed only if it directly supports the current version objective.

If a feature is useful but not required for the current version, it goes to a later version.

## Version sequence

MerchantFix.ai must be built in this order:

V0: market validation.

V0.5: no-install Shopify URL surface scan.

V1: Shopify CSV identifier diagnostic MVP.

V2: paid Fix Pack.

V3: more Merchant Center errors.

V4: agency product.

V5: platform, integrations, and monitoring.

The project must not skip versions.

The project must not build V1 before V0.5 is either validated or deliberately skipped after a documented decision.

The project must not build V2 before V1 is validated.

The project must not build V3 before V2 is validated.

The project must not build V4 before repeated agency interest is proven.

The project must not build V5 before recurring demand is proven.

## V0 scope

### V0 objective

Validate that Shopify merchants, Google Ads freelancers, and agencies have real Google Merchant Center product data problems and are willing to share errors or files to receive help.

### V0 must prove

Real users have Merchant Center errors.

GTIN, MPN, brand, identifier_exists, and visible product data issues appear repeatedly.

Users are willing to paste errors, upload screenshots, share Shopify URLs, or share CSV exports.

Some users are willing to pay for a useful Fix Pack.

Agencies or freelancers recognize the problem as recurring.

### V0 allowed features

Landing page.

Basic product positioning.

Merchant Center error submission form.

Textarea for pasted error.

Optional Shopify store URL field.

Optional email field.

Optional screenshot upload.

Optional CSV upload.

Manual diagnosis.

Semi-manual diagnosis.

First SEO page for missing GTIN.

First SEO page for incorrect identifier_exists.

First SEO page for Shopify Google Shopping audit.

Community outreach.

Agency outreach.

Free diagnosis offer.

### V0 forbidden features

Stripe.

Paid checkout.

Full product engine.

Automated CSV correction.

Authentication.

User account.

Database unless required for form collection.

Shopify API.

Google Merchant Center API.

OpenAI API.

PDF generation.

ZIP generation.

Subscription.

Agency dashboard.

Monitoring.

Shopify app.

WooCommerce support.

XML parsing.

Misrepresentation recovery.

Account suspension recovery.

Approval guarantee.

### V0 validation criteria

Collect 10 real Merchant Center errors.

Receive 3 real screenshots, Shopify URLs, or CSV files.

Get 5 users to accept a free diagnosis.

Get 1 agency or freelancer to confirm recurring need.

Get 1 to 3 users to show willingness to pay.

Identify at least 3 repeated error patterns.

### V0 decision

If validation criteria are met, proceed to V0.5.

If validation criteria are not met, revise positioning, acquisition, or target problem before building the engine.

## V0.5 scope

### V0.5 objective

Validate whether a no-install Shopify store URL scan creates more engagement than asking users to upload a CSV immediately.

V0.5 is an acquisition and validation layer, not the core diagnostic engine.

### V0.5 must prove

Users are willing to enter a Shopify store URL.

Public Shopify product data can be accessed often enough to create a useful first scan.

Surface-level risks can be explained clearly.

Users understand that this is not a full Merchant Center diagnosis.

Some users continue toward Shopify CSV upload for deeper analysis.

### V0.5 allowed features

Landing page.

Shopify store URL input.

URL normalization.

Public Shopify product data fetch when available.

Graceful failure when public product data is unavailable.

Basic product count.

Missing product image detection.

Missing product price detection.

Weak or very short product title detection.

Empty or weak product description detection.

Basic surface risk score.

CTA to upload Shopify CSV for deeper identifier diagnosis.

Clear disclaimer.

### V0.5 forbidden features

Stripe.

Paid checkout.

Payment.

Authentication.

User account.

Database.

Shopify API.

Google Merchant Center API.

OpenAI API.

AI calls.

PDF generation.

ZIP generation.

Subscription.

Agency dashboard.

Shopify app.

WooCommerce.

Prestashop.

Magento.

XML parsing.

Merchant Center monitoring.

Automatic CSV correction.

Full Merchant Center diagnosis.

Account recovery.

Approval guarantee.

### V0.5 technical files allowed

app/page.tsx.

app/scan/page.tsx.

app/api/surface-scan/route.ts.

components.

lib/types.ts.

lib/normalizeStoreUrl.ts.

lib/fetchPublicShopifyProducts.ts.

lib/detectSurfaceRisks.ts.

lib/calculateSurfaceRiskScore.ts.

tests if available.

### V0.5 core rules

The URL scan is a surface risk audit only.

It must not claim to reproduce Google Merchant Center diagnostics.

It must not claim that detected issues are guaranteed disapproval causes.

It must not claim full feed accuracy.

It must not store user URLs or scan results unnecessarily.

It must not use private Shopify data.

It must not require app installation.

It must invite users to upload a Shopify CSV for deeper V1 analysis.

V0.5 attracts users.

V1 diagnoses deeply.

V2 monetizes.

### V0.5 surface checks

Detect basic product count.

Detect products with missing main image.

Detect products with missing price.

Detect products with weak or very short titles.

Detect products with empty or weak descriptions.

Handle unavailable public product data gracefully.

Handle invalid URLs gracefully.

Handle non-Shopify or unsupported stores gracefully.

### V0.5 validation criteria

20 Shopify URLs tested.

10 successful scans.

5 users click or continue toward CSV upload.

3 real CSV uploads.

1 agency or freelancer confirms interest.

3 users show willingness to pay.

Users understand that the scan is a surface audit only.

Users do not expect guaranteed Google approval.

The scan creates enough perceived value to continue.

### V0.5 decision

Proceed to V1 if the URL scan creates engagement and users understand the limitation.

If the URL scan is too fragile or creates confusion, keep V0.5 as optional marketing only and continue with CSV-first V1.

If users prefer CSV or agencies ask for CSV directly, continue with V1 as the main product.

If V0.5 creates confusion, remove it from the core journey and keep the product CSV-first.

## V1 scope

### V1 objective

Build the first technical diagnostic engine for Shopify CSV identifier issues.

The V1 must validate whether MerchantFix.ai can reliably parse Shopify CSV files and detect GTIN, MPN, brand, and identifier_exists issues.

### V1 must prove

Shopify CSV files can be parsed reliably.

Common Shopify product columns can be normalized.

Identifier issues can be detected with deterministic rules.

The diagnostic is understandable to a non-technical merchant.

Corrected CSV generation can be done safely when corrections are clear.

Manual review cases can be separated clearly.

### V1 allowed features

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

Manual review labeling.

Sample CSV files.

Automated tests.

Mandatory disclaimer.

### V1 forbidden features

Stripe.

Paid checkout.

Authentication.

User account.

Database.

Shopify API.

Google Merchant Center API.

OpenAI API.

AI-generated corrections.

PDF generation.

ZIP generation.

Subscription.

Agency dashboard.

WooCommerce.

Prestashop.

Magento.

XML parsing.

Merchant Center monitoring.

Shopify app.

Meta Catalog.

Amazon.

TikTok Shop.

Misrepresentation automatic fix.

Account suspension recovery.

Approval guarantee.

### V1 technical files allowed

app/page.tsx.

app/result/[sessionId]/page.tsx.

app/api/analyze/route.ts.

components.

lib/types.ts.

lib/normalizeColumns.ts.

lib/analyzeShopifyCsv.ts.

lib/detectIdentifierIssues.ts.

lib/generateCorrectedCsv.ts.

lib/generateSummary.ts.

lib/validationRules.ts.

samples.

tests.

### V1 sample files required

samples/clean-shopify.csv.

samples/missing-gtin.csv.

samples/custom-products.csv.

samples/duplicate-gtin.csv.

samples/dirty-file.csv.

samples/invalid-gtin.csv.

samples/sku-as-mpn.csv.

samples/missing-brand.csv.

### V1 validation criteria

The app runs locally.

CSV upload works.

The parser recognizes common Shopify columns.

The parser does not crash on dirty files.

The engine detects missing GTIN.

The engine detects missing MPN.

The engine detects missing brand.

The engine detects identifier_exists inconsistency.

The engine detects invalid-looking GTIN length.

The engine detects duplicate GTIN.

The engine detects SKU identical to MPN.

The clean sample does not produce false critical errors.

The corrected CSV preserves all original columns.

The corrected CSV adds merchantfix_notes.

The corrected CSV does not invent GTIN.

The corrected CSV does not invent MPN.

The corrected CSV does not invent brand.

Manual review cases are clearly marked.

The result page is understandable to a non-technical merchant.

The disclaimer is visible.

### V1 decision

Proceed to V2 only if the diagnostic engine is reliable and understandable.

Do not add payment until V1 is validated.

## V2 scope

### V2 objective

Turn the free diagnostic into a paid self-service Fix Pack.

The V2 must validate whether users will pay after seeing their diagnostic.

### V2 must prove

The free diagnostic creates enough perceived value to trigger payment.

Users understand what the Fix Pack contains.

The Fix Pack can be delivered automatically.

The paid report is useful.

Support remains manageable.

Users do not expect guaranteed approval.

### V2 allowed features

Stripe one-time payment.

Single paid offer.

Checkout page.

Success page.

ZIP download.

PDF report.

Corrected CSV.

Manual review CSV.

Resubmission checklist.

Temporary session handling.

Basic analytics.

Basic email delivery if needed.

Improved result page.

Improved landing page.

More SEO pages.

### V2 forbidden features

Subscription.

Agency dashboard.

Complex authentication.

Complex database.

Shopify API.

Google Merchant Center API.

Monitoring.

Shopify app.

WooCommerce support.

XML parsing unless strongly requested by paid users.

AI-driven critical corrections.

Automatic misrepresentation fix.

Account recovery promise.

Approval guarantee.

### V2 offer

Single offer: Fix Pack.

Target price: 79 euros.

The Fix Pack includes:

Complete diagnosis.

Corrected CSV when safe.

merchantfix_notes.

Manual review CSV.

Recommended actions.

Shopify correction instructions.

Google Merchant Center resubmission checklist.

Mandatory disclaimer.

### V2 validation criteria

Stripe checkout works.

Payment success works.

ZIP generation works.

PDF report is readable.

Corrected CSV is safe.

Manual review CSV is clear.

Resubmission checklist is clear.

At least 3 paid purchases.

Diagnostic-to-payment conversion is above 3 percent.

At least 2 agencies or freelancers show interest.

Refund or complaint rate remains low.

Support questions remain manageable.

### V2 decision

Proceed to V3 only if users pay and support remains manageable.

If users do not pay, revise offer, report, pricing, or positioning before expanding features.

## V3 scope

### V3 objective

Expand from identifier issues to more Merchant Center error families while keeping the product controlled.

### V3 must prove

MerchantFix.ai can diagnose multiple repeated Merchant Center issues without becoming a manual consulting service.

Users understand which issues are fixable, which require manual review, and which are outside file-level correction.

### V3 allowed features

Price mismatch diagnosis.

Availability mismatch diagnosis.

Image issue diagnosis.

Missing image detection.

Invalid image link detection.

Missing shipping checklist.

Missing tax checklist.

Missing Google product category diagnosis.

Products not showing diagnosis.

Limited performance diagnosis.

Misrepresentation checklist only.

AI-assisted explanations.

AI-assisted report summaries.

AI-assisted checklist writing.

More SEO pages.

### V3 forbidden features

Automatic misrepresentation fix.

Guaranteed account recovery.

Guaranteed approval.

Legal guarantee.

Compliance guarantee.

Amazon expansion.

Meta Catalog expansion.

TikTok Shop expansion.

Shopify app unless V2 proves demand.

Google Merchant Center API unless paid users repeatedly request monitoring.

AI as sole decision maker for critical corrections.

### V3 AI rules

AI can explain.

AI can summarize.

AI can write user-friendly report sections.

AI can help classify pasted error messages.

AI must not invent product data.

AI must not decide critical corrections alone.

Rules engine remains source of truth for corrections.

### V3 validation criteria

At least 10 cumulative paid purchases.

At least 3 different error families are used.

Users understand automatic versus manual corrections.

Support remains manageable.

Reports remain clear.

No increase in refund complaints.

At least 2 agencies request repeated use.

SEO pages begin generating impressions or visits.

### V3 decision

Proceed to V4 only if repeated professional usage appears.

If expansion creates confusion or support burden, reduce scope.

## V4 scope

### V4 objective

Create recurring revenue from agencies and freelancers.

### V4 must prove

Professionals managing multiple Shopify stores want repeated diagnostics, client-ready reports, and monthly access.

### V4 allowed features

Authentication.

Basic user accounts.

Supabase database.

Agency workspace.

Diagnosis history.

Multi-store project list.

Branded reports.

Monthly diagnostic limits.

Stripe subscriptions.

Agency pricing.

Report export.

Client-ready PDF.

Basic usage dashboard.

### V4 forbidden features

Public API.

Complex team permissions.

Enterprise roles.

Heavy CRM.

Shopify app unless validated.

Google monitoring unless validated.

Unrelated marketplace expansion.

Custom manual agency service.

Enterprise custom development.

### V4 pricing targets

Single Fix Pack: 79 euros.

Agency Starter: 199 euros per month.

Agency Pro: 399 euros per month.

Agency White Label: 699 euros per month.

Pricing can change after validation.

### V4 validation criteria

3 to 5 agencies become paying users or serious pilots.

Monthly recurring revenue reaches 500 to 1500 euros.

At least 30 diagnostics per month.

Reports are reused with clients.

Agencies request white label or monitoring.

Churn remains low.

Support remains manageable.

### V4 decision

Proceed to V5 only if recurring usage and monitoring demand are proven.

If agencies only use the product once, optimize one-shot products instead.

## V5 scope

### V5 objective

Transform MerchantFix.ai into a platform only if previous versions prove the demand.

### V5 must prove

Users want ongoing monitoring, integrations, and scheduled diagnostics enough to justify platform complexity.

### V5 allowed features

Shopify API.

Google Merchant Center API.

Monitoring.

Alerts.

Scheduled scans.

Store connection.

Product data quality score.

Shopify app if justified.

WooCommerce support if demand exists.

XML parsing if needed.

Advanced error history.

Agency monitoring dashboard.

### V5 forbidden features

Amazon expansion unless Google Merchant Center platform is stable.

Meta Catalog expansion unless Google product is stable.

TikTok Shop expansion unless demand is proven.

Enterprise custom development without clear revenue.

Unsupported compliance claims.

Approval guarantee.

Manual recovery service.

### V5 validation criteria

MRR is stable.

Users request monitoring repeatedly.

Agencies request alerts.

One-shot users return.

Connectors are requested by paying customers.

Support remains controlled.

The platform can be maintained by a solo founder or very small team.

### V5 decision

Build platform features only if they are pulled by paying customers, not because they seem attractive.

## Feature parking lot

The following features are useful but must not be built too early.

Stripe: V2.

PDF report: V2.

ZIP download: V2.

AI explanations: V3.

Price mismatch: V3.

Availability mismatch: V3.

Misrepresentation checklist: V3.

Authentication: V4.

Supabase: V4.

Agency dashboard: V4.

Subscription: V4.

White-label reports: V4.

Shopify API: V5.

Google Merchant Center API: V5.

Monitoring: V5.

Shopify app: V5 only if validated.

WooCommerce: V5 or later.

XML parsing: V5 or earlier only if paid users require it.

Amazon: later than V5.

Meta Catalog: later than V5.

TikTok Shop: later than V5.

## Scope control checklist

Before adding any feature, ask these questions:

Does this feature belong to the current version?

Does this feature directly validate the current version objective?

Can the current version be validated without it?

Does it increase support?

Does it increase legal or commercial risk?

Does it create a false promise of approval?

Does it require customer data storage?

Does it make the product harder to understand?

If the feature is not required for the current version, move it to the parking lot.

## Out-of-scope rejection examples

Do not add Stripe in V0.5 or V1.

Do not add login in V0.5 or V1.

Do not add Supabase in V0.5 or V1.

Do not add AI in V0.5 or V1.

Do not add Shopify API in V0.5 or V1.

Do not add Google API in V0.5 or V1.

Do not add monitoring before V5.

Do not add agency dashboard before V4.

Do not add WooCommerce before Shopify is validated.

Do not add Amazon before Google Merchant Center is stable.

Do not add automatic misrepresentation recovery at any stage without a separate validated product scope.

Do not let the V0.5 URL scan replace the V1 CSV diagnostic.

## Mandatory safety rules across all versions

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never claim automatic misrepresentation fix.

Never store sensitive files unnecessarily.

Never commit client data to GitHub.

Never let AI decide critical corrections alone.

Never expand before validation.

Never claim that V0.5 surface scan is a full Google Merchant Center diagnosis.

Never position V0.5 detected issues as guaranteed Google disapproval causes.

## Current active scope

Current phase: V0 / V0.5 / V1 preparation.

Current priority: documentation, prompts, sample files, V0.5 surface scan scope, and V1 diagnostic engine.

Current allowed work:

README.md.

ROADMAP.md.

docs/MERCHANTFIX_MASTER_PLAN.md.

docs/VERSION_SCOPE.md.

docs/PRODUCT_RULES.md.

docs/QA_CHECKLIST.md.

docs/GO_STOP_CRITERIA.md.

docs/ACQUISITION_PLAN.md.

docs/DECISIONS.md.

prompts/00_PROJECT_CONTEXT.md.

sample CSV files.

Next.js initialization after documentation and samples.

V0.5 no-install Shopify URL surface scan.

Current forbidden work:

Stripe.

Auth.

Database.

AI.

Shopify API.

Google API.

PDF.

ZIP.

Subscription.

Agency dashboard.

Monitoring.

Shopify app.
