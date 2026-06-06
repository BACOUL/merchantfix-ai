# MerchantFix.ai

MerchantFix.ai helps Shopify merchants diagnose and fix Google Merchant Center product data issues, starting with a no-install Shopify surface scan and a deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists problems.

The first versions are intentionally narrow.

Start with a quick Shopify store URL scan when public product data is available. Then upload a Shopify product CSV for deeper identifier diagnosis. Get a clear diagnosis, exact fixes, and a corrected CSV when possible.

MerchantFix.ai is not a full feed management platform, not an agency service, and not a guarantee of Google approval. It is a focused diagnostic and repair tool for product data issues that can block or limit visibility in Google Merchant Center and Google Shopping.

## Project status

Current stage: V0 / V0.5 / V1 preparation

The project is currently being structured before development.

No production code should be added before the product scope, rules, test files, and implementation prompts are documented.

## Core positioning

MerchantFix.ai is the urgent-care tool for Google Merchant Center product disapprovals and product data issues.

The first user journey is simple:

Shopify merchant receives a Google Merchant Center product disapproval or suspects product data issues.
The merchant enters a Shopify store URL for a quick no-install surface scan when public product data is available.
MerchantFix.ai detects basic visible risks such as missing images, missing prices, weak titles, weak descriptions, and product count.
MerchantFix.ai clearly explains that the URL scan is only a surface risk audit, not a full Google Merchant Center diagnosis.
The merchant is invited to upload a Shopify CSV for deeper identifier diagnosis.
The issue is analyzed for GTIN, MPN, brand, or identifier_exists problems.
MerchantFix.ai shows a clear diagnosis.
MerchantFix.ai generates a corrected CSV when the correction is safe.
MerchantFix.ai provides a manual review checklist when required.

## Initial target customer

The first target customer is Shopify merchants using Google Merchant Center.

MerchantFix.ai is also relevant for Shopify merchants running Google Shopping or Performance Max campaigns, e-commerce operators seeing product disapprovals or limited visibility, Google Ads freelancers managing Shopify stores, and Shopify or SEA agencies managing several merchant accounts.

The first versions are not designed for WooCommerce, Prestashop, Magento, Amazon listings, Meta Catalog, TikTok Shop, general feed management, or full Merchant Center account recovery.

Those use cases may be considered in later versions only after validation.

## Initial problem

Shopify merchants often face Google Merchant Center issues such as missing GTIN, missing MPN, missing brand, incorrect identifier_exists, product identifiers not provided, invalid-looking barcode, duplicate GTIN, SKU incorrectly used as MPN, missing images, missing prices, weak product data, and products disapproved or limited because product data is incomplete or inconsistent.

V0.5 focuses only on a no-install surface scan from publicly available Shopify product data when accessible.

V1 focuses only on identifier-related issues inside Shopify CSV files.

## First MVP scope

The first MVP sequence must do only this:

Run a no-install Shopify URL surface scan when public product data is available.
Detect basic visible risks.
Show a simple surface risk score.
Invite the user to upload a Shopify CSV for deeper diagnosis.
Upload Shopify CSV.
Normalize product columns.
Detect GTIN, MPN, brand, and identifier_exists issues.
Show a clear diagnostic.
Generate a corrected CSV when the correction is safe.

## V0.5 No-install Shopify surface scan

Goal: validate whether Shopify merchants engage more easily with a no-install Shopify URL scan before being asked to upload a CSV.

V0.5 is an acquisition and validation layer, not the core diagnostic engine.

The user enters a Shopify store URL. MerchantFix.ai attempts to read publicly available Shopify product data when possible. MerchantFix.ai runs a surface-level risk scan only.

V0.5 may detect:
- basic product count
- missing product image
- missing product price
- weak or very short product title
- empty or weak product description

V0.5 must show a simple surface risk score and invite the user to upload a Shopify CSV for deeper identifier diagnosis.

V0.5 is not a full Google Merchant Center diagnostic. It does not use Shopify API, Google Merchant Center API, authentication, database, Stripe, AI, PDF generation, or a Shopify app.

V0.5 must include a clear disclaimer:

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

V1 remains the serious diagnostic engine for Shopify CSV identifier issues: GTIN, MPN, brand, and identifier_exists.

## V0.5 allowed features

The V0.5 is allowed to include a landing page, Shopify store URL input, URL normalization, public Shopify product data fetch when available, graceful failure when public product data is unavailable, product count detection, missing image detection, missing price detection, weak title detection, weak description detection, simple surface risk score, and a CTA to upload a Shopify CSV for deeper identifier diagnosis.

## V0.5 forbidden features

The V0.5 must not include Stripe, authentication, user accounts, database, Shopify API, Google Merchant Center API, OpenAI or AI calls, PDF generation, ZIP generation, subscription plans, agency dashboard, WooCommerce, XML feed parsing, Merchant Center monitoring, Shopify app, automatic CSV correction, or any guarantee of Google approval.

V0.5 must not claim to reproduce Google Merchant Center diagnostics. V0.5 must not claim that detected issues are guaranteed disapproval causes.

## V1 allowed features

The V1 is allowed to include a landing page, a textarea to paste a Google Merchant Center error message, Shopify CSV upload, CSV parsing, flexible Shopify column normalization, product identifier issue detection, diagnostic summary, affected product table, severity levels such as critical, warning, and info, recommended actions, corrected CSV generation when safe, a merchantfix_notes column in the corrected CSV, and a clear disclaimer that Google approval is not guaranteed.

## V1 forbidden features

The V1 must not include Stripe, authentication, user accounts, database, Shopify API, Google Merchant Center API, OpenAI or AI calls, PDF generation, subscription plans, agency dashboard, WooCommerce, XML feed parsing, Merchant Center monitoring, Shopify app, or any guarantee of Google approval.

These features are reserved for later versions if the previous version is validated.

## Product safety rules

MerchantFix.ai must follow strict safety rules.

Rule 1: never invent GTIN.

A GTIN is a real product identifier. If the file does not contain a valid GTIN, the tool must never create one.

Allowed behavior: GTIN missing, manual review required.

Forbidden behavior: generated fake GTIN.

Rule 2: never invent MPN.

A SKU is not automatically a manufacturer part number.

Allowed behavior: SKU may not be a real MPN, manual review required.

Forbidden behavior: copy SKU into MPN without verification.

Rule 3: never guarantee Google approval.

MerchantFix.ai can diagnose and correct product data issues. It cannot guarantee Google Merchant Center approval.

Mandatory disclaimer: MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

Rule 4: separate automatic fixes from manual review.

Each issue must be classified as automatically fixable, manual review required, or not fixable from the product file.

Rule 5: preserve original client data.

Corrected CSV files must preserve the original columns and values unless a safe correction is explicitly applied.

Every correction must be explained in merchantfix_notes.

Rule 6: separate surface scan from deep diagnosis.

V0.5 surface scan must remain separate from V1 CSV diagnosis.

V0.5 can identify visible surface risks only. V1 performs the deeper Shopify CSV identifier diagnosis.

Rule 7: do not overstate URL scan accuracy.

The no-install URL scan must always be positioned as a surface risk audit based on publicly available product data when accessible.

It must not be positioned as a full Merchant Center diagnostic.

## Initial error families

V0.5 focuses on missing image, missing price, weak title, empty or weak description, and basic product count.

V1 focuses on identifier_exists=true while GTIN and MPN are missing, missing GTIN, missing MPN, missing brand, missing identifier_exists, invalid-looking GTIN length, duplicate GTIN, SKU identical to MPN, missing image, and missing price.

identifier_exists=true while GTIN and MPN are missing must be treated as critical.

Missing GTIN must be treated as warning or critical depending on context.

Missing MPN must be treated as warning.

Missing brand must be treated as warning.

Missing identifier_exists must be treated as info.

Invalid-looking GTIN length must be treated as warning.

Duplicate GTIN must be treated as warning.

SKU identical to MPN must be treated as info.

Missing image must be treated as warning.

Missing price must be treated as warning.

## Planned roadmap

## V0 Market validation

Goal: validate that Shopify merchants and agencies have real Merchant Center product data and identifier issues.

V0 includes landing page, error submission form, manual or semi-manual diagnosis, first SEO pages, and outreach to Shopify communities, Google Ads communities, e-commerce communities, freelancers, and agencies.

Validation criteria for V0:

Collect 10 real Merchant Center errors.
Receive 3 screenshots or CSV files.
Get 1 agency to confirm recurring need.
Get 1 to 3 users to show willingness to pay.

## V0.5 No-install Shopify surface scan

Goal: validate whether Shopify merchants engage more easily with a no-install Shopify store URL scan before being asked to upload a CSV.

V0.5 includes Shopify store URL input, public product data fetch when available, surface-level product scan, product count, missing image detection, missing price detection, weak title detection, weak description detection, basic surface risk score, clear disclaimer, and CTA to upload a Shopify CSV for deeper identifier diagnosis.

V0.5 excludes Stripe, payment, authentication, user accounts, database, Shopify API, Google Merchant Center API, AI calls, PDF generation, ZIP generation, subscription plans, agency dashboard, Shopify app, automatic CSV correction, full Merchant Center diagnosis, and Google approval guarantees.

Validation criteria for V0.5:

Test 20 Shopify URLs.
Achieve 10 successful public scans.
Get 5 users to continue toward CSV upload or show intent to do so.
Receive 3 real Shopify CSV files.
Get 1 agency or freelancer to confirm interest.
Get 3 users to show willingness to pay for a deeper Fix Pack.

## V1 Identifier diagnostic MVP

Goal: build the first technical engine for Shopify CSV identifier issues.

V1 includes CSV upload, Shopify column normalization, GTIN detection, MPN detection, brand detection, identifier_exists detection, diagnostic result page, corrected CSV when safe, and test samples.

V1 excludes Stripe, authentication, database, PDF, AI, Shopify API, and Google API.

## V2 Paid Fix Pack

Goal: turn the diagnostic into a paid self-service product.

V2 may include Stripe payment, ZIP download, PDF report, corrected CSV, manual review CSV, resubmission checklist, and a first paid offer around 79 euros.

## V3 More Merchant Center errors

Goal: expand beyond product identifiers.

Potential V3 error families include price mismatch, availability mismatch, image issue, missing shipping, missing tax, missing Google product category, products not showing, limited performance, and misrepresentation checklist only.

Misrepresentation must never be positioned as an automatic fix.

## V4 Agency product

Goal: create recurring revenue from agencies and freelancers.

V4 may include agency dashboard, diagnosis history, branded reports, monthly packs, Stripe subscriptions, Supabase database, and authentication.

## V5 Platform and monitoring

Goal: become a product data quality platform for shopping channels.

V5 may include Shopify API, Google Merchant Center API, monitoring, alerts, Shopify app, WooCommerce support, XML parsing, and multi-channel product data checks only if previous versions have been validated.

## Technical stack

Planned initial stack:

Next.js 14.
TypeScript.
Tailwind CSS.
PapaParse.
No authentication in V0.5 or V1.
No database in V0.5 or V1.
No Stripe in V0.5 or V1.
No AI in V0.5 or V1.
No Shopify API in V0.5 or V1.
No Google Merchant Center API in V0.5 or V1.

Potential later stack:

Stripe for V2.
Supabase for V4.
OpenAI API for explanatory reports in V3 or later.
Shopify API for V5.
Google Merchant Center API for V5.

## Planned repository structure

merchantfix-ai/
app/
app/page.tsx
app/scan/page.tsx
app/result/sessionId/page.tsx
app/api/surface-scan/route.ts
app/api/analyze/route.ts
components/
lib/
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
docs/
docs/MERCHANTFIX_MASTER_PLAN.md
docs/VERSION_SCOPE.md
docs/PRODUCT_RULES.md
docs/QA_CHECKLIST.md
docs/GO_STOP_CRITERIA.md
docs/ACQUISITION_PLAN.md
docs/DECISIONS.md
prompts/
prompts/00_PROJECT_CONTEXT.md
prompts/01_CREATE_PROJECT_STRUCTURE.md
prompts/02_CREATE_TYPES.md
prompts/03_NORMALIZE_COLUMNS.md
prompts/04_DETECT_IDENTIFIER_ISSUES.md
prompts/05_ANALYZE_SHOPIFY_CSV.md
prompts/06_GENERATE_CORRECTED_CSV.md
prompts/07_BUILD_RESULT_PAGE.md
prompts/08_CREATE_TESTS.md
prompts/09_CREATE_SEO_PAGE.md
prompts/10_ADD_STRIPE_V2.md
samples/
samples/clean-shopify.csv
samples/missing-gtin.csv
samples/custom-products.csv
samples/duplicate-gtin.csv
samples/dirty-file.csv
samples/invalid-gtin.csv
samples/sku-as-mpn.csv
samples/missing-brand.csv
qa/
public/
README.md
ROADMAP.md
CHANGELOG.md
.env.example
.gitignore

## Sample files

The samples folder must contain fictional CSV files only.

Never commit real client exports, real Shopify product data, Merchant Center screenshots from clients, customer emails, payment data, or private business data.

## Security and privacy

The project must not store sensitive customer data unnecessarily.

V0.5 should work as a no-auth, no-database surface scan flow.

V1 should work as a no-auth, no-database diagnostic flow.

Temporary file handling should be preferred.

Never commit .env, .env.local, API keys, Stripe secrets, OpenAI keys, Shopify tokens, Google API credentials, or customer files.

Use .env.example for placeholder variables only.

## Acquisition strategy

MerchantFix.ai will not rely on cold mass prospecting.

Initial acquisition channels are long-tail SEO around exact Merchant Center errors, Shopify Community, Reddit communities such as Shopify, PPC, and e-commerce, Google Ads freelancers, Shopify agencies, SEA agencies, and product-led sharing through generated reports.

The V0.5 no-install Shopify URL scan is the first acquisition layer.

Primary CTA:

Check your Shopify store for Google Merchant Center product issues in 60 seconds.

Secondary CTA:

Upload your Shopify CSV for deeper identifier diagnosis.

Key SEO pages:

/fix/missing-gtin-google-merchant-center
/fix/missing-mpn-google-merchant-center
/fix/incorrect-identifier-exists-shopify
/fix/shopify-products-disapproved-google-merchant-center
/fix/google-merchant-center-gtin-mpn-error
/fix/google-merchant-center-price-mismatch
/fix/google-merchant-center-availability-mismatch
/fix/google-shopping-products-not-showing
/fix/shopify-google-shopping-image-issues
/fix/shopify-products-missing-price-google-shopping

## Development method

The project must be built step by step.

Rule: one version equals one objective, one validation, and no scope creep.

The workflow is plan, ticket, code, test, review, validate, then next step.

Do not build the next version before the current one is validated.

## Git workflow

Recommended branches:

main
develop
feature/v0-landing
feature/v0-5-url-scan
feature/v1-csv-parser
feature/v1-identifier-rules
feature/v1-result-page
feature/v1-corrected-csv
feature/v2-stripe

Rules:

main must remain stable.
Work should happen on develop or feature branches.
One feature branch should correspond to one clear task.
Do not merge if tests fail.
Do not merge if the change adds out-of-scope features.

## Definition of Done

A feature is done only if it matches the current version scope, does not add forbidden features, passes relevant tests, does not invent GTIN or MPN, preserves original CSV data, explains every correction, displays clear manual review cases, includes the Google approval disclaimer where needed, does not claim full Merchant Center diagnosis from a surface scan, and does not store sensitive data unnecessarily.

## Current next steps

Create GitHub repository.
Add this README.md.
Add ROADMAP.md.
Add docs/MERCHANTFIX_MASTER_PLAN.md.
Add docs/VERSION_SCOPE.md.
Add docs/PRODUCT_RULES.md.
Add docs/QA_CHECKLIST.md.
Add docs/ACQUISITION_PLAN.md.
Add Codex prompts.
Add sample CSV files.
Initialize the Next.js project.
Build V0.5 no-install Shopify surface scan first.
Validate V0.5 engagement.
Build V1 CSV identifier diagnostic after V0.5 scope is implemented or deliberately skipped based on validation.

## Mandatory disclaimer

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.
