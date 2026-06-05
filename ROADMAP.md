# MerchantFix.ai Roadmap

This roadmap defines the exact execution path for MerchantFix.ai from V0 to V5.

The goal is to prevent scope creep, avoid building the wrong product too early, and make every version prove one clear business or technical assumption before moving to the next one.

## Core rule

One version equals one objective, one validation, and no scope creep.

Do not build the next version until the current version has been validated.

## Product vision

MerchantFix.ai starts as a focused tool for Shopify merchants facing Google Merchant Center product disapprovals caused by product identifier issues.

The first product problem is narrow:

Shopify merchants receive Google Merchant Center errors related to GTIN, MPN, brand, or identifier_exists.
They paste the error or upload a Shopify CSV.
MerchantFix.ai diagnoses the issue.
MerchantFix.ai explains what is wrong.
MerchantFix.ai generates a corrected CSV when the correction is safe.
MerchantFix.ai clearly marks manual review cases when the correction cannot be automated.

The long-term vision is broader:

MerchantFix.ai can become a product data quality platform for shopping channels, but only after the first focused use case has been validated.

## Version overview

V0 validates market demand.

V1 validates the technical diagnostic engine.

V2 validates paid self-service purchase.

V3 validates expansion to more Merchant Center error families.

V4 validates agency usage and recurring revenue.

V5 validates platform-level integrations and monitoring.

## V0 Market validation

## V0 objective

Validate that Shopify merchants, Google Ads freelancers, and agencies have real recurring problems with Google Merchant Center product disapprovals, especially around GTIN, MPN, brand, and identifier_exists.

## V0 assumption

The market has a real problem, and users are willing to share their errors or files to get help.

## V0 target users

Shopify merchants using Google Merchant Center.
Shopify merchants running Google Shopping.
Shopify merchants running Performance Max.
Google Ads freelancers managing Shopify stores.
Shopify agencies.
SEA agencies.
E-commerce consultants.

## V0 allowed features

Landing page.
Clear product positioning.
Error submission form.
Textarea to paste Merchant Center error.
Optional email field.
Optional CSV or screenshot upload.
Manual or semi-manual diagnosis.
First SEO page for missing GTIN.
First SEO page for incorrect identifier_exists.
Basic acquisition through communities and agencies.

## V0 forbidden features

No Stripe.
No authentication.
No database unless absolutely necessary for form collection.
No Shopify API.
No Google Merchant Center API.
No full CSV correction engine.
No PDF generation.
No subscription.
No agency dashboard.
No app Shopify.
No guarantee of Google approval.

## V0 pages

Homepage.
Submit error page.
Missing GTIN SEO page.
Incorrect identifier_exists SEO page.
Shopify products disapproved SEO page.

## V0 acquisition actions

Answer relevant Shopify Community posts.
Answer relevant Reddit Shopify or PPC posts.
Contact a small number of Google Ads freelancers.
Contact a small number of Shopify agencies.
Offer a free first diagnosis.
Collect exact Merchant Center wording from real users.
Collect screenshots or CSV samples only if users willingly provide them.
Never store client files publicly.
Never commit client files to GitHub.

## V0 validation criteria

Collect 10 real Merchant Center errors.
Receive 3 real screenshots or CSV files.
Get 5 users to accept a free diagnosis.
Get 1 agency or freelancer to confirm the problem is recurring.
Get 1 to 3 users to show willingness to pay for a Fix Pack.
Identify at least 3 repeated error patterns.

## V0 stop criteria

Stop or pivot if no real users share errors.
Stop or pivot if GTIN, MPN, brand, and identifier_exists problems are rare.
Stop or pivot if all cases require manual account-level recovery.
Stop or pivot if agencies do not recognize the problem.
Stop or pivot if users only want free advice and show no willingness to pay.

## V0 output

A validated list of real Merchant Center error messages.
A list of recurring user pain points.
A list of fixable and non-fixable cases.
A first acquisition learning document.
A decision to proceed or not proceed to V1.

## V1 Identifier diagnostic MVP

## V1 objective

Build the first technical diagnostic engine for Shopify CSV product identifier issues.

The V1 must validate whether MerchantFix.ai can reliably parse Shopify CSV files and detect identifier-related issues without inventing data or producing dangerous corrections.

## V1 assumption

A deterministic rule-based engine can detect the first class of Merchant Center product identifier problems accurately enough to generate a useful diagnostic.

## V1 target users

Shopify merchants with Merchant Center identifier errors.
Google Ads freelancers managing Shopify stores.
Early test agencies.

## V1 allowed features

Landing page.
Textarea for pasted Merchant Center error.
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
Severity levels: critical, warning, info.
Recommended actions.
Corrected CSV when correction is safe.
merchantfix_notes column.
Basic manual review output.
Clear disclaimer.

## V1 forbidden features

No Stripe.
No paid checkout.
No authentication.
No user account.
No database.
No Shopify API.
No Google Merchant Center API.
No OpenAI or AI calls.
No PDF generation.
No ZIP generation.
No subscription.
No agency dashboard.
No WooCommerce.
No XML feed parsing.
No monitoring.
No Shopify app.
No broad Merchant Center account recovery.
No automatic fix for misrepresentation.
No guarantee of Google approval.

## V1 technical modules

lib/types.ts.
lib/normalizeColumns.ts.
lib/analyzeShopifyCsv.ts.
lib/detectIdentifierIssues.ts.
lib/generateCorrectedCsv.ts.
lib/generateSummary.ts.
lib/validationRules.ts.

## V1 app pages

Homepage.
Result page.
API analyze route.

## V1 core rules

If identifier_exists is true and both GTIN and MPN are missing, create a critical issue.

If GTIN is missing and the product does not clearly look custom, handmade, personalized, or made to order, create a warning.

If brand is missing, create a warning.

If identifier_exists is missing, create an info issue.

If GTIN exists but length is not 8, 12, 13, or 14 digits, create a warning.

If the same GTIN appears on multiple products, create a warning.

If SKU and MPN are identical, create an info issue that SKU may not be a real manufacturer part number.

If product title suggests custom, handmade, personalized, or made to order and no GTIN, MPN, or brand exists, suggest manual review and possible identifier_exists=no.

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

## V1 sample files required

samples/clean-shopify.csv.
samples/missing-gtin.csv.
samples/custom-products.csv.
samples/duplicate-gtin.csv.
samples/dirty-file.csv.
samples/invalid-gtin.csv.
samples/sku-as-mpn.csv.
samples/missing-brand.csv.

## V1 validation criteria

The app runs locally.
CSV upload works.
The parser recognizes common Shopify columns.
The parser does not crash on dirty files.
The engine detects missing GTIN cases.
The engine detects missing MPN cases.
The engine detects missing brand cases.
The engine detects identifier_exists inconsistency.
The engine detects invalid-looking GTIN.
The engine detects duplicate GTIN.
The engine detects SKU identical to MPN.
The clean sample does not produce false critical errors.
The corrected CSV preserves original columns.
The corrected CSV adds merchantfix_notes.
The corrected CSV does not invent GTIN or MPN.
Manual review cases are clearly marked.
The result page is understandable to a non-technical merchant.
The disclaimer is visible.

## V1 stop criteria

Stop or fix before V2 if CSV parsing is unreliable.
Stop or fix before V2 if the engine creates too many false positives.
Stop or fix before V2 if corrected CSV output changes original data dangerously.
Stop or fix before V2 if manual review cases are not clear.
Stop or fix before V2 if test samples fail.
Stop or fix before V2 if the product feels unclear to users.

## V1 output

A working unpaid diagnostic MVP.
A result page.
A corrected CSV generator.
A reliable rules engine for identifier issues.
A testable product demo.
A decision to proceed or not proceed to V2.

## V2 Paid Fix Pack

## V2 objective

Turn the diagnostic into a paid self-service product.

V2 validates whether users are willing to pay for a complete Fix Pack after seeing the free diagnostic.

## V2 assumption

A user who sees real product data issues will pay for a clear repair package, corrected CSV when safe, and resubmission checklist.

## V2 target users

Shopify merchants with real Merchant Center errors.
Google Ads freelancers.
Small agencies.
E-commerce operators with rejected products.

## V2 allowed features

Stripe one-time payment.
Single paid offer.
ZIP download.
PDF report.
Corrected CSV.
Manual review CSV.
Resubmission checklist.
Success page.
Basic email delivery if needed.
Temporary session handling.
Basic analytics.
More refined landing page.
More refined result page.
More SEO pages.

## V2 forbidden features

No subscription yet.
No agency dashboard yet.
No authentication unless absolutely needed.
No complex database.
No Shopify API.
No Google Merchant Center API.
No monitoring.
No app Shopify.
No WooCommerce.
No XML parsing unless required by paid users.
No automatic misrepresentation fix.
No guarantee of Google approval.

## V2 offer

Initial offer: Fix Pack.

Target price: 79 euros.

The Fix Pack includes complete diagnosis, corrected CSV when safe, merchantfix_notes, manual-review product list, recommended actions, Shopify correction instructions, Merchant Center resubmission checklist, and mandatory disclaimer.

## V2 ZIP contents

merchantfix-report.pdf.
corrected-products.csv.
manual-review-products.csv.
resubmission-checklist.pdf.

## V2 payment tunnel

Homepage.
Upload CSV or paste error.
Free diagnosis.
Payment.
Success page.
Download ZIP.

## V2 validation criteria

Stripe checkout works.
Payment success flow works.
ZIP generation works.
PDF report is readable.
Corrected CSV is safe.
Manual-review CSV is clear.
Resubmission checklist is clear.
At least 3 paid purchases.
Diagnostic-to-payment conversion above 3 percent.
At least 2 agencies or freelancers show interest.
Refund or complaint rate remains low.
Support questions remain manageable.

## V2 stop criteria

Stop or revise if nobody pays.
Stop or revise if users expect guaranteed approval.
Stop or revise if too many cases require manual service.
Stop or revise if the report is not perceived as valuable.
Stop or revise if support load becomes too high.
Stop or revise if Stripe or file delivery creates reliability issues.

## V2 output

A paid self-service product.
A working Fix Pack.
First paid validation.
Initial conversion data.
Decision to proceed or not proceed to V3.

## V3 More Merchant Center errors

## V3 objective

Expand beyond product identifiers while keeping the product controlled and understandable.

V3 validates whether MerchantFix.ai can cover more Merchant Center error families without becoming a manual consulting service.

## V3 assumption

Users need help with multiple repeated Merchant Center issues, not only GTIN, MPN, brand, and identifier_exists.

## V3 allowed error families

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

## V3 forbidden features

No automatic fix for misrepresentation.
No guarantee of account recovery.
No promise of approval.
No legal or compliance guarantee.
No broad marketplace expansion.
No Amazon.
No Meta Catalog.
No TikTok Shop.
No Shopify app unless V2 demand clearly proves it.
No Google Merchant Center API unless paid customers request monitoring.

## V3 IA usage

AI may be used only as an explanatory layer.

AI can explain issues.
AI can generate plain-language summaries.
AI can generate checklists.
AI can help write report sections.
AI can help classify pasted error messages.

AI must not be the sole decision maker for critical corrections.

The rule-based engine remains the source of truth for data corrections.

## V3 validation criteria

At least 10 cumulative paid purchases.
At least 3 different error families are used.
Users understand what is fixable and what is manual.
Support remains manageable.
Reports remain clear.
No increase in refund complaints.
At least 2 agencies request repeated use.
SEO pages begin generating impressions or visits.

## V3 stop criteria

Stop expanding if support becomes too manual.
Stop expanding if misrepresentation dominates support.
Stop expanding if users misunderstand the product as guaranteed recovery.
Stop expanding if the new error families reduce clarity.
Stop expanding if the product becomes too broad.

## V3 output

A broader Merchant Center diagnostic product.
More SEO coverage.
Better reports.
Evidence of repeated error demand.
Decision to proceed or not proceed to V4.

## V4 Agency product

## V4 objective

Create recurring revenue from agencies, freelancers, and consultants.

V4 validates whether MerchantFix.ai can become a recurring tool for professionals managing multiple Shopify stores.

## V4 assumption

Agencies and freelancers face repeated Merchant Center product data problems across multiple clients and are willing to pay monthly for faster diagnosis and reporting.

## V4 target users

Google Ads agencies.
SEA agencies.
Shopify agencies.
Performance Max consultants.
E-commerce consultants.
Freelance media buyers.

## V4 allowed features

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

## V4 forbidden features

No public API.
No complex team roles.
No enterprise permissions.
No heavy CRM.
No app Shopify unless validated.
No Google Merchant Center monitoring unless validated.
No expansion to unrelated marketplaces.
No custom manual agency service.

## V4 pricing

Single Fix Pack: 79 euros.
Agency Starter: 199 euros per month.
Agency Pro: 399 euros per month.
Agency White Label: 699 euros per month.

Pricing may change after validation.

## V4 validation criteria

3 to 5 agencies become paying users or serious pilots.
Monthly recurring revenue reaches 500 to 1500 euros.
At least 30 diagnostics per month.
Reports are reused with clients.
Agencies request either white label or monitoring.
Churn remains low.
Support remains manageable.

## V4 stop criteria

Stop or revise if agencies do not pay.
Stop or revise if agencies only want free reports.
Stop or revise if every agency requires custom service.
Stop or revise if white-label reporting is not valued.
Stop or revise if subscriptions do not fit usage patterns.

## V4 output

A recurring revenue product.
Agency validation.
Usage history.
First MRR.
Decision to proceed or not proceed to V5.

## V5 Platform and monitoring

## V5 objective

Transform MerchantFix.ai into a platform only if one-shot purchases and agency usage have validated the demand.

V5 validates whether connected workflows, monitoring, and alerts are worth building.

## V5 assumption

Users want ongoing monitoring and automated diagnostics enough to justify integrations.

## V5 allowed features

Shopify API.
Google Merchant Center API.
Monitoring.
Alerts.
Scheduled scans.
Store connection.
Product data quality score.
App Shopify if justified.
WooCommerce support if demand exists.
XML parsing if needed.
Advanced error history.
Agency monitoring dashboard.

## V5 forbidden features

No expansion to Amazon unless Merchant Center platform is stable.
No expansion to Meta Catalog unless Google product is stable.
No expansion to TikTok Shop unless demand is proven.
No enterprise custom development without clear revenue.
No unsupported compliance claims.
No approval guarantee.

## V5 validation criteria

MRR is stable.
Users request monitoring repeatedly.
Agencies request ongoing alerts.
One-shot users return.
Connectors are requested by paying customers.
The support load can remain controlled.
The platform can be maintained by a solo founder or very small team.

## V5 output

A mature product data quality platform for Google Merchant Center and potentially other shopping channels.

## Global anti-error rules

Never invent GTIN.
Never invent MPN.
Never invent brand.
Never guarantee Google approval.
Never claim automatic recovery from misrepresentation.
Never store sensitive customer files unnecessarily.
Never commit customer data to GitHub.
Never build the next version before validating the current one.
Never add features outside the current version scope.
Never let AI decide critical corrections alone.
Never become a manual service business by accident.

## Global acquisition roadmap

V0 acquisition focuses on collecting real errors from communities and agencies.

V1 acquisition focuses on getting real users to test the diagnostic.

V2 acquisition focuses on converting SEO and outreach traffic into Fix Pack purchases.

V3 acquisition focuses on expanding the SEO cluster around Merchant Center errors.

V4 acquisition focuses on agencies and recurring plans.

V5 acquisition may include Shopify app marketplace, integrations, partnerships, and platform-level growth.

## SEO roadmap

V0 and V1 SEO pages:

/fix/missing-gtin-google-merchant-center
/fix/missing-mpn-google-merchant-center
/fix/incorrect-identifier-exists-shopify
/fix/shopify-products-disapproved-google-merchant-center
/fix/google-merchant-center-gtin-mpn-error

V2 and V3 SEO pages:

/fix/google-merchant-center-price-mismatch
/fix/google-merchant-center-availability-mismatch
/fix/google-merchant-center-image-error
/fix/google-merchant-center-missing-shipping
/fix/google-shopping-products-not-showing
/fix/limited-performance-google-merchant-center
/fix/google-merchant-center-misrepresentation

Agency pages:

/google-merchant-center-audit-for-agencies
/google-shopping-feed-diagnostic-for-agencies
/shopify-google-shopping-audit-for-agencies

Platform pages later:

/shopify-google-merchant-center-errors
/google-shopping-feed-checker-for-shopify
/google-merchant-center-diagnostic-tool

## Implementation order

Step 1: create repository and documentation.
Step 2: create sample CSV files.
Step 3: create Codex prompts.
Step 4: initialize Next.js.
Step 5: create landing page.
Step 6: implement CSV parser.
Step 7: implement column normalization.
Step 8: implement identifier issue detection.
Step 9: implement analysis result object.
Step 10: implement result page.
Step 11: implement corrected CSV generation.
Step 12: test V1 with all sample files.
Step 13: validate V1.
Step 14: add Stripe in V2.
Step 15: add ZIP and PDF in V2.
Step 16: add SEO pages.
Step 17: test paid purchase.
Step 18: expand to V3 only after V2 validation.

## Current next action

After README.md, create the following files in this order:

ROADMAP.md.
docs/MERCHANTFIX_MASTER_PLAN.md.
docs/VERSION_SCOPE.md.
docs/PRODUCT_RULES.md.
docs/QA_CHECKLIST.md.
docs/GO_STOP_CRITERIA.md.
docs/ACQUISITION_PLAN.md.
docs/DECISIONS.md.
prompts/00_PROJECT_CONTEXT.md.
samples/clean-shopify.csv.
