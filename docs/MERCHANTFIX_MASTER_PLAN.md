# MerchantFix.ai Master Plan

## Purpose of this document

This document is the master execution plan for MerchantFix.ai.

It is the source of truth for product scope, development rules, version sequencing, commercial positioning, acquisition strategy, risk management, and validation criteria.

No feature should be built unless it fits this document or has been explicitly added to the roadmap after a clear decision.

## Core principle

MerchantFix.ai must be built in controlled versions.

One version equals one objective, one validation, and no scope creep.

The next version must not be built before the current version has been validated.

## Product definition

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues, starting with a no-install Shopify surface scan and a deeper Shopify CSV diagnostic for product identifier problems such as GTIN, MPN, brand, and identifier_exists.

The initial product is not a feed management platform.

The initial product is not a Shopify app.

The initial product is not a Google Merchant Center integration.

The initial product is not a manual agency service.

The initial product is not a guarantee of product approval.

The initial product is a focused diagnostic and repair tool for narrow, painful, and urgent product data problems.

## One-sentence positioning

MerchantFix.ai helps Shopify merchants understand and fix Google Merchant Center product data issues, starting with a quick Shopify URL surface scan and deeper CSV diagnosis for GTIN, MPN, brand, and identifier_exists errors.

## Short marketing promise

Fix rejected Google Merchant Center products before they cost you more sales.

## Clear product promise

Start with a quick Shopify store URL scan when public product data is available. Then upload your Shopify product export for deeper identifier diagnosis. Get a clear diagnosis, exact fixes, and a corrected CSV when possible.

## Mandatory disclaimer

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

This disclaimer must appear on the landing page, URL scan result, CSV result page, checkout page, report, Fix Pack, and any relevant SEO page.

## Initial market

The initial market is Shopify merchants using Google Merchant Center.

The secondary market is professionals who manage Shopify stores for clients, including Google Ads freelancers, SEA agencies, Shopify agencies, Performance Max consultants, and e-commerce consultants.

The product is international from the start, with English as the main language.

French can be added later, but the first market should be English-speaking because the search demand and Shopify ecosystem are global.

## Initial customer profile

The first ideal customer is a Shopify merchant who sees a Google Merchant Center error such as missing GTIN, missing MPN, incorrect identifier_exists, product identifiers not provided, products disapproved, or products not showing.

This customer is not looking for a large feed management platform.

This customer is not looking for a long consultation.

This customer wants to understand what is wrong, what needs to be fixed, and whether the file can be corrected quickly.

## Initial agency profile

The first agency user is a Google Ads, Shopify, or e-commerce professional who manages multiple stores and repeatedly sees Merchant Center product data issues across client accounts.

The agency wants faster diagnosis, cleaner reports, and less manual explanation to clients.

## Problem to solve first

The first problem is not broad feed optimization.

The first problem is fast diagnosis of Shopify product data risks that can block, limit, or weaken visibility in Google Merchant Center.

The exact first sequence is:

A Shopify merchant has products rejected, limited, or not showing because product data appears incomplete, weak, inconsistent, or misunderstood.

V0.5 gives a quick no-install surface scan from publicly available Shopify product data when accessible.

V1 provides deeper CSV diagnosis for GTIN, MPN, brand, and identifier_exists issues.

## Why this problem matters

When products are rejected or limited in Google Merchant Center, they may not appear correctly in Google Shopping, Performance Max, or free listings.

That can directly affect visibility, advertising performance, and sales.

The user is often already in a moment of urgency.

MerchantFix.ai must capture this urgency without exaggerating or promising guaranteed approval.

## What MerchantFix.ai must not become in the beginning

MerchantFix.ai must not become a general product feed management tool in V0.5 or V1.

MerchantFix.ai must not become a Shopify app in V0.5 or V1.

MerchantFix.ai must not become a Google API integration in V0.5 or V1.

MerchantFix.ai must not become a manual consulting business.

MerchantFix.ai must not become a compliance tool.

MerchantFix.ai must not become a generic AI wrapper.

MerchantFix.ai must not attempt to solve every Merchant Center issue in the first versions.

## Core version sequence

MerchantFix.ai must evolve in controlled versions.

V0 validates market demand.

V0.5 validates no-install Shopify URL scan engagement.

V1 validates the Shopify CSV diagnostic engine.

V2 validates paid self-service.

V3 validates additional Merchant Center errors.

V4 validates agency recurring usage.

V5 validates integrations and monitoring.

## Core V0.5 scope

V0.5 is the first acquisition and validation layer.

V0.5 must do only this:

Accept a Shopify store URL.

Normalize and validate the URL.

Attempt to fetch publicly available Shopify product data when accessible.

Handle unavailable public product data gracefully.

Detect basic product count.

Detect missing product images.

Detect missing product prices.

Detect weak or very short product titles.

Detect empty or weak product descriptions.

Display a simple surface risk score.

Show a clear disclaimer that this is not a full Merchant Center diagnosis.

Invite the user to upload a Shopify CSV for deeper V1 identifier diagnosis.

V0.5 attracts users.

V1 diagnoses deeply.

V2 monetizes.

## V0.5 allowed features

Landing page.

Shopify store URL input.

URL normalization.

Public Shopify product data fetch when available.

Graceful failure when public product data is unavailable.

Surface-level product scan.

Basic product count.

Missing image detection.

Missing price detection.

Weak or very short product title detection.

Empty or weak product description detection.

Basic surface risk score.

CTA to upload Shopify CSV for deeper identifier diagnosis.

Mandatory disclaimer.

## V0.5 forbidden features

Stripe.

Paid checkout.

Authentication.

User accounts.

Database.

Shopify API.

Google Merchant Center API.

OpenAI or AI calls.

PDF generation.

ZIP generation.

Subscription plans.

Agency dashboard.

WooCommerce.

Prestashop.

Magento.

XML feed parsing.

Merchant Center monitoring.

Shopify app.

Automatic CSV correction.

Full Merchant Center diagnosis.

Account suspension recovery.

Any guarantee of Google approval.

## Core V1 scope

The first technical CSV MVP must do only this:

Upload a Shopify CSV.

Normalize Shopify product columns.

Detect GTIN, MPN, brand, and identifier_exists issues.

Display a clear diagnosis.

Generate a corrected CSV when the correction is safe.

Mark manual review cases clearly.

Add merchantfix_notes to explain every correction or recommendation.

Never invent identifiers.

Never guarantee approval.

## V1 allowed features

Landing page.

Textarea to paste a Google Merchant Center error.

Shopify CSV upload.

CSV parsing.

Flexible column normalization.

GTIN detection.

MPN detection.

Brand detection.

identifier_exists detection.

Invalid-looking GTIN detection.

Duplicate GTIN detection.

SKU used as MPN warning.

Missing image warning.

Missing price warning.

Diagnostic result page.

Affected products table.

Severity levels.

Recommended actions.

Corrected CSV generation when safe.

merchantfix_notes column.

Manual review marking.

Mandatory disclaimer.

Sample CSV tests.

## V1 forbidden features

Stripe.

Paid checkout.

Authentication.

User accounts.

Database.

Shopify API.

Google Merchant Center API.

OpenAI or AI calls.

PDF generation.

ZIP generation.

Subscription plans.

Agency dashboard.

WooCommerce.

Prestashop.

Magento.

XML feed parsing.

Merchant Center monitoring.

Shopify app.

Automatic misrepresentation fix.

Account suspension recovery.

Any guarantee of Google approval.

## Product safety rules

### Rule 1: never invent GTIN

A GTIN is a real product identifier.

If a product does not contain a valid GTIN, MerchantFix.ai must never generate one.

Allowed behavior:

GTIN missing. Manual review required.

Forbidden behavior:

Generated fake GTIN.

### Rule 2: never invent MPN

An MPN is a manufacturer part number.

A SKU is not automatically an MPN.

MerchantFix.ai must never copy SKU into MPN unless the user has explicitly confirmed that SKU is the real manufacturer part number.

Allowed behavior:

SKU may not be a real MPN. Manual review required.

Forbidden behavior:

Copy SKU into MPN without verification.

### Rule 3: never invent brand

If brand or vendor is missing, MerchantFix.ai must not invent a brand.

Allowed behavior:

Brand missing. Manual review required.

Forbidden behavior:

Generated brand from product title without verification.

### Rule 4: never guarantee Google approval

MerchantFix.ai can help diagnose and fix product data issues.

Google approval depends on product data, website quality, account status, country, policies, reviews, and Google systems.

MerchantFix.ai must never guarantee approval.

### Rule 5: separate issue levels

Each issue must be classified as one of the following:

Automatically fixable.

Manual review required.

Not fixable from product file.

### Rule 6: preserve original data

Corrected CSV files must preserve original columns and values unless a safe correction is explicitly applied.

Every correction must be explained in merchantfix_notes.

### Rule 7: explain uncertainty

When a case is uncertain, MerchantFix.ai must say so clearly.

Uncertain cases must go to manual review.

### Rule 8: do not let AI decide critical corrections

AI may be used later for explanations, summaries, and reports.

AI must not be the only decision maker for critical corrections.

Rule-based checks remain the source of truth for data correction.

### Rule 9: separate surface scan from deep diagnosis

V0.5 surface scan must remain separate from V1 CSV diagnosis.

V0.5 can identify visible surface risks only.

V1 performs the deeper Shopify CSV identifier diagnosis.

The URL scan must not replace the CSV diagnostic.

### Rule 10: do not overstate URL scan accuracy

The no-install URL scan must always be positioned as a surface risk audit based on publicly available product data when accessible.

It must not be positioned as a full Merchant Center diagnostic.

It must not claim to reproduce Google Merchant Center diagnostics.

It must not claim that detected issues are guaranteed disapproval causes.

## Initial issue classification

V0.5 surface scan:

Missing image must be warning.

Missing price must be warning.

Weak or very short title must be warning or info depending on severity.

Empty or weak description must be warning or info depending on severity.

Unavailable public product data must be handled gracefully and must not be treated as a Merchant Center issue.

V1 CSV diagnosis:

identifier_exists=true while GTIN and MPN are missing must be critical.

Missing GTIN must be warning or critical depending on context.

Missing MPN must be warning.

Missing brand must be warning.

Missing identifier_exists must be info.

Invalid-looking GTIN length must be warning.

Duplicate GTIN must be warning.

SKU identical to MPN must be info.

Missing image must be warning.

Missing price must be warning.

Product title suggesting custom, handmade, personalized, or made to order must trigger cautious review when identifiers are missing.

## Correction policy

MerchantFix.ai can safely add merchantfix_notes.

MerchantFix.ai can safely add merchantfix_action.

MerchantFix.ai can normalize identifier_exists values when the intent is clear.

MerchantFix.ai can mark rows as manual review.

MerchantFix.ai can create a manual-review CSV.

MerchantFix.ai can generate a corrected CSV only when corrections are safe.

MerchantFix.ai must not create missing GTIN.

MerchantFix.ai must not create missing MPN.

MerchantFix.ai must not create missing brand.

MerchantFix.ai must not claim that the corrected CSV will be approved by Google.

V0.5 must not generate corrected CSV files.

V0.5 must only encourage deeper CSV diagnosis when appropriate.

## V0 market validation

### V0 objective

Validate that Shopify merchants and agencies have real recurring Merchant Center product data issues and are willing to share errors or files to receive help.

### V0 allowed

Landing page.

Error submission form.

Textarea for Merchant Center error.

Optional email.

Optional screenshot or CSV upload.

Manual or semi-manual diagnosis.

First SEO pages.

Community outreach.

Agency outreach.

Free first diagnosis.

### V0 forbidden

Stripe.

Full CSV correction engine.

Authentication.

Database unless absolutely necessary.

Shopify API.

Google API.

PDF generation.

Subscription.

Agency dashboard.

Shopify app.

Approval guarantee.

### V0 validation criteria

Collect 10 real Merchant Center errors.

Receive 3 screenshots or CSV files.

Get 5 users to accept a free diagnosis.

Get 1 agency or freelancer to confirm recurring need.

Get 1 to 3 users to show willingness to pay.

Identify at least 3 repeated error patterns.

### V0 stop criteria

Stop or pivot if no real users share errors.

Stop or pivot if identifier issues are rare.

Stop or pivot if all cases are account-level or website-level recovery problems.

Stop or pivot if agencies do not recognize the problem.

Stop or pivot if no one shows willingness to pay.

## V0.5 no-install Shopify surface scan

### V0.5 objective

Validate whether Shopify merchants engage more easily with a no-install Shopify store URL scan before being asked to upload a CSV.

### V0.5 assumption

Users are more likely to start with a Shopify store URL than with a Shopify CSV export.

A surface scan can create enough perceived value to push users toward the deeper CSV diagnostic.

### V0.5 output

Working Shopify store URL input.

Working URL normalization.

Working public product data fetch when available.

Graceful handling when public product data is unavailable.

Working product count.

Working surface checks for missing image, missing price, weak title, and weak description.

Working surface risk score.

Visible disclaimer.

Clear CTA toward V1 CSV upload.

### V0.5 validation criteria

Test 20 Shopify URLs.

Achieve 10 successful public scans.

Get 5 users to continue toward CSV upload or clearly show intent to do so.

Receive 3 real Shopify CSV files.

Get 1 agency or freelancer to confirm interest.

Get 3 users to show willingness to pay for a deeper Fix Pack.

Users understand that the scan is a surface audit only.

Users do not expect guaranteed Google approval.

The scan creates enough perceived value to continue.

### V0.5 stop criteria

Stop or pivot if public Shopify product data is unavailable too often.

Stop or pivot if users do not trust the URL scan.

Stop or pivot if users do not continue toward CSV upload.

Stop or pivot if the surface scan creates confusion about Google approval.

Stop or pivot if the scan produces too many false signals.

Stop or pivot if the product feels like a toy instead of a serious diagnostic.

Stop or pivot if support questions increase before any revenue.

## V1 identifier diagnostic MVP

### V1 objective

Build the first technical engine that reads Shopify CSV files and detects identifier-related issues.

### V1 assumption

A deterministic rule-based engine can identify enough useful issues to produce a valuable diagnostic.

### V1 output

Working landing page.

Working CSV upload.

Working Shopify column normalization.

Working identifier issue detection.

Working result page.

Working corrected CSV generation when safe.

Working sample tests.

### V1 validation criteria

App runs locally.

CSV upload works.

Parser recognizes common Shopify columns.

Parser does not crash on dirty files.

Engine detects missing GTIN.

Engine detects missing MPN.

Engine detects missing brand.

Engine detects identifier_exists inconsistency.

Engine detects invalid-looking GTIN.

Engine detects duplicate GTIN.

Engine detects SKU identical to MPN.

Clean sample produces no false critical errors.

Corrected CSV preserves original columns.

Corrected CSV adds merchantfix_notes.

Corrected CSV does not invent GTIN or MPN.

Manual review cases are clearly marked.

Result page is understandable to non-technical users.

Disclaimer is visible.

### V1 stop criteria

Do not move to V2 if parsing is unreliable.

Do not move to V2 if false positives are high.

Do not move to V2 if corrected CSV changes data dangerously.

Do not move to V2 if manual review is unclear.

Do not move to V2 if sample tests fail.

Do not move to V2 if users do not understand the result.

## V2 paid Fix Pack

### V2 objective

Validate whether users will pay for a complete Fix Pack after seeing a free diagnostic.

### V2 allowed

Stripe one-time payment.

Single paid offer.

ZIP download.

PDF report.

Corrected CSV.

Manual review CSV.

Resubmission checklist.

Success page.

Temporary session handling.

Basic analytics.

SEO pages.

### V2 forbidden

Subscription.

Agency dashboard.

Complex authentication.

Complex database.

Shopify API.

Google API.

Monitoring.

Shopify app.

WooCommerce.

XML parsing unless paid users clearly require it.

Automatic misrepresentation fix.

Approval guarantee.

### V2 offer

The initial offer is a Fix Pack.

Target price: 79 euros.

The Fix Pack includes:

Complete diagnosis.

Corrected CSV when safe.

merchantfix_notes.

Manual review product list.

Recommended actions.

Shopify correction instructions.

Merchant Center resubmission checklist.

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

Diagnostic-to-payment conversion above 3 percent.

At least 2 agencies or freelancers show interest.

Support questions remain manageable.

### V2 stop criteria

Stop or revise if nobody pays.

Stop or revise if users expect guaranteed approval.

Stop or revise if too many cases require manual service.

Stop or revise if the report is not valued.

Stop or revise if support becomes too high.

Stop or revise if payment or delivery is unreliable.

## V3 additional Merchant Center errors

### V3 objective

Expand beyond identifiers while keeping the product controlled.

### V3 allowed error families

Price mismatch.

Availability mismatch.

Image issue.

Missing image.

Invalid image link.

Missing shipping.

Missing tax.

Missing Google product category.

Products not showing.

Limited performance.

Misrepresentation checklist only.

### V3 forbidden

Automatic fix for misrepresentation.

Account recovery guarantee.

Approval guarantee.

Legal guarantee.

Broad marketplace expansion.

Amazon.

Meta Catalog.

TikTok Shop.

Shopify app unless V2 proves demand.

Google API unless paid users request monitoring.

### V3 AI policy

AI can explain issues.

AI can generate summaries.

AI can generate checklists.

AI can write report sections.

AI can classify pasted error messages.

AI must not be the sole decision maker for critical corrections.

### V3 validation criteria

At least 10 cumulative paid purchases.

At least 3 different error families are used.

Users understand what is fixable and what is manual.

Support remains manageable.

Reports remain clear.

No increase in refund complaints.

At least 2 agencies request repeated use.

SEO pages begin generating impressions or visits.

## V4 agency product

### V4 objective

Create recurring revenue from agencies and freelancers.

### V4 allowed

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

### V4 forbidden

Public API.

Complex team roles.

Enterprise permissions.

Heavy CRM.

Shopify app unless validated.

Google monitoring unless validated.

Unrelated marketplace expansion.

Custom manual agency service.

### V4 target pricing

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

## V5 platform and monitoring

### V5 objective

Transform MerchantFix.ai into a platform only if one-shot purchases and agency usage validate the demand.

### V5 allowed

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

### V5 forbidden

Amazon expansion unless Merchant Center platform is stable.

Meta Catalog expansion unless Google product is stable.

TikTok Shop expansion unless demand is proven.

Enterprise custom development without clear revenue.

Unsupported compliance claims.

Approval guarantee.

### V5 validation criteria

MRR is stable.

Users request monitoring repeatedly.

Agencies request alerts.

One-shot users return.

Connectors are requested by paying customers.

Support load remains controlled.

The platform can be maintained by a solo founder or very small team.

## Acquisition strategy

MerchantFix.ai must not rely on cold mass prospecting.

The acquisition strategy must focus on users who already have the problem.

Primary acquisition channel: long-tail SEO.

Secondary acquisition channel: Shopify and PPC communities.

Third acquisition channel: agencies and freelancers.

Fourth acquisition channel: product-led sharing through reports.

The V0.5 no-install Shopify URL scan is the first low-friction acquisition layer.

The V1 CSV upload is the serious diagnostic step.

## SEO strategy

The SEO strategy must target exact Merchant Center error searches and Shopify-specific problem searches.

V0 and V0.5 SEO pages:

/fix/shopify-google-merchant-center-checker

/fix/shopify-google-shopping-audit

/fix/shopify-google-shopping-image-issues

/fix/shopify-products-missing-price-google-shopping

/fix/shopify-products-disapproved-google-merchant-center

V1 SEO pages:

/fix/missing-gtin-google-merchant-center

/fix/missing-mpn-google-merchant-center

/fix/incorrect-identifier-exists-shopify

/fix/google-merchant-center-gtin-mpn-error

Later SEO pages:

/fix/google-merchant-center-price-mismatch

/fix/google-merchant-center-availability-mismatch

/fix/google-merchant-center-image-error

/fix/google-merchant-center-missing-shipping

/fix/google-shopping-products-not-showing

/fix/limited-performance-google-merchant-center

/fix/google-merchant-center-misrepresentation

Agency SEO pages:

/google-merchant-center-audit-for-agencies

/google-shopping-feed-diagnostic-for-agencies

/shopify-google-shopping-audit-for-agencies

## Community acquisition

Community acquisition must be useful, not spammy.

The goal is to help merchants who already posted about Merchant Center errors.

Initial communities:

Shopify Community.

Reddit Shopify.

Reddit PPC.

Reddit ecommerce.

Google Ads communities.

E-commerce founder groups.

The first message should offer a free diagnosis, not a hard sale.

## Agency acquisition

Agencies can become recurring users.

Initial agency targets:

Google Ads freelancers.

SEA agencies.

Shopify agencies.

Performance Max consultants.

E-commerce consultants.

The first agency offer should be a free diagnostic for one client case.

The goal is to prove repeated need before building agency features.

## Product-led acquisition

Reports should create visibility.

Each generated report can mention MerchantFix.ai.

Later, agency reports can be brandable in V4.

Before V4, reports may include MerchantFix.ai branding.

## Technical architecture principles

The interface displays.

The public URL scan fetches only publicly available product data when accessible.

The surface scan detects visible risks only.

The CSV parser reads and normalizes.

The rules engine decides.

The CSV generator only applies safe corrections.

The report explains.

AI may explain later, but rules decide critical corrections.

The code must be modular.

Business rules must not be hidden inside UI components.

V0.5 logic must remain separate from V1 CSV logic.

## Planned technical structure

app/page.tsx

app/scan/page.tsx

app/result/sessionId/page.tsx

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

samples/clean-shopify.csv

samples/missing-gtin.csv

samples/custom-products.csv

samples/duplicate-gtin.csv

samples/dirty-file.csv

samples/invalid-gtin.csv

samples/sku-as-mpn.csv

samples/missing-brand.csv

docs/

prompts/

qa/

## Sample file policy

All sample files must be fictional.

Never commit real client data.

Never commit real Shopify exports from users.

Never commit screenshots from real Merchant Center accounts.

Never commit emails.

Never commit payment data.

Never commit private business data.

## Privacy policy for V0.5 and V1

V0.5 should avoid storing submitted URLs or scan results.

V1 should avoid storing customer files.

No authentication.

No database.

No persistent file storage unless necessary.

If file storage is needed later, it must be temporary and documented.

Customer uploads must never be committed to GitHub.

## Security policy

Never commit .env files.

Never commit .env.local.

Never commit API keys.

Never commit Stripe secrets.

Never commit OpenAI keys.

Never commit Shopify tokens.

Never commit Google API credentials.

Use .env.example for placeholder variables only.

## Development method

The development method is:

Plan.

Ticket.

Code.

Test.

Review.

Validate.

Next step.

One task at a time.

One feature branch per task when possible.

No merge if tests fail.

No merge if the change adds forbidden features.

No merge if the change violates product safety rules.

## Git workflow

main is stable.

develop is active development.

feature branches are used for specific tasks.

Recommended branches:

main.

develop.

feature/v0-landing.

feature/v0-5-url-scan.

feature/v1-csv-parser.

feature/v1-identifier-rules.

feature/v1-result-page.

feature/v1-corrected-csv.

feature/v2-stripe.

## Definition of Done

A feature is done only if it matches current version scope.

It must not add forbidden features.

It must pass relevant tests.

It must not invent GTIN.

It must not invent MPN.

It must not invent brand.

It must preserve original CSV data.

It must explain every correction.

It must mark manual review cases.

It must display the disclaimer where relevant.

It must not claim that V0.5 surface scan is a full Merchant Center diagnosis.

It must avoid storing sensitive data.

It must be understandable to the target user.

## Codex usage rules

Never ask Codex to build the full project in one prompt.

Each Codex prompt must define:

Current version.

Current task.

Files allowed to modify.

Files forbidden to modify.

Features forbidden in this version.

Definition of Done.

Tests required.

Safety rules.

If Codex adds out-of-scope features, revert or correct.

If Codex modifies unrelated files, review carefully.

If Codex removes safety rules, reject the change.

## Immediate implementation order

Create README.md.

Create ROADMAP.md.

Create docs/MERCHANTFIX_MASTER_PLAN.md.

Create docs/VERSION_SCOPE.md.

Create docs/PRODUCT_RULES.md.

Create docs/QA_CHECKLIST.md.

Create docs/GO_STOP_CRITERIA.md.

Create docs/ACQUISITION_PLAN.md.

Create docs/DECISIONS.md.

Create prompts/00_PROJECT_CONTEXT.md.

Create sample CSV files.

Initialize Next.js.

Create landing page.

Create V0.5 no-install Shopify URL surface scan.

Validate V0.5 engagement.

Create parser.

Create column normalizer.

Create identifier rules.

Create analysis result.

Create result page.

Create corrected CSV generator.

Test V1.

Only after V1 validation, add V2 payment.

## Current project status

Current status: documentation and planning.

Current version: V0 / V0.5 / V1 preparation.

Current priority: create documentation, prompts, sample files, V0.5 surface scan scope, and then build the V1 diagnostic engine.

## Final instruction

MerchantFix.ai must stay small until the market proves it should become bigger.

The correct first product is not a platform.

The correct first product sequence is a no-install Shopify URL surface scan followed by a focused Shopify CSV diagnostic tool for Google Merchant Center identifier issues.

Do not expand before validation.

Do not promise approval.

Do not invent product identifiers.

Do not become a manual service.

Build the narrow entry point first.

Then build the narrow CSV diagnostic.
