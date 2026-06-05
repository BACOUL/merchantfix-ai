# MerchantFix.ai QA Checklist

This document defines the quality assurance checklist for MerchantFix.ai.

Its purpose is to prevent product errors, unsafe corrections, broken CSV outputs, unclear diagnostics, scope creep, and false promises.

Every version must pass its QA checklist before moving to the next version.

## Core QA principle

A feature is not complete because it works once.

A feature is complete only when it works on test files, respects product rules, avoids unsafe corrections, and is understandable to the target user.

## Global QA rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never position misrepresentation as automatically fixable.

Never store sensitive customer files unnecessarily.

Never commit real customer files to GitHub.

Never let AI decide critical corrections alone.

Never build outside the current version scope.

Never move to the next version before validation.

## QA workflow

Every feature must follow this workflow:

Define the expected behavior.

Implement the feature.

Test with sample files.

Check product safety rules.

Check user-facing clarity.

Check that no forbidden features were added.

Document any known limitation.

Validate or send back for correction.

## Documentation QA

Before coding, the following files must exist:

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

Documentation is valid only if it clearly defines:

Product purpose.

Initial target user.

Current version scope.

Allowed features.

Forbidden features.

Safety rules.

GO / STOP criteria.

Acquisition path.

Current next action.

## Repository QA

The repository must contain only safe project files.

Allowed in GitHub:

Code.

Documentation.

Prompts.

Fictional sample CSV files.

Tests.

Checklists.

Roadmap.

Decisions.

Not allowed in GitHub:

.env.

.env.local.

API keys.

Stripe secrets.

OpenAI keys.

Shopify tokens.

Google API credentials.

Customer CSV files.

Customer screenshots.

Customer emails.

Real product catalogs.

Payment data.

Private business data.

## Branch QA

main must remain stable.

develop may contain active development.

feature branches must be used for specific tasks when possible.

Each feature branch must have one clear objective.

Do not merge if tests fail.

Do not merge if the change adds out-of-scope features.

Do not merge if product safety rules are broken.

Do not merge if the disclaimer is removed from relevant pages.

## Codex QA

Every Codex task must define:

Current version.

Current task.

Files allowed to modify.

Files forbidden to modify.

Features forbidden in the current version.

Definition of Done.

Required tests.

Safety rules.

After every Codex output, verify:

Did Codex add a forbidden feature?

Did Codex modify unrelated files?

Did Codex remove product safety rules?

Did Codex remove disclaimers?

Did Codex add API calls too early?

Did Codex add authentication too early?

Did Codex add database logic too early?

Did Codex invent product identifiers?

Did Codex create vague or unsafe copy?

If yes, reject or correct the output.

## V0 QA checklist

V0 goal: validate market demand before building the full product.

V0 is valid only if the project collects real evidence that users have the problem.

### V0 allowed

Landing page.

Product positioning.

Error submission form.

Textarea for Merchant Center error.

Optional email field.

Optional screenshot upload.

Optional CSV upload.

Manual diagnosis.

Semi-manual diagnosis.

First SEO pages.

Community outreach.

Agency outreach.

### V0 forbidden

Stripe.

Full CSV correction engine.

Authentication.

User account.

Shopify API.

Google Merchant Center API.

OpenAI API.

PDF generation.

ZIP generation.

Subscription.

Agency dashboard.

Monitoring.

Shopify app.

Approval guarantee.

### V0 QA checks

The landing page explains the product in less than 5 seconds.

The target user is clearly Shopify merchants.

Google Merchant Center is clearly mentioned.

GTIN, MPN, brand, and identifier_exists are clearly mentioned.

The page does not promise Google approval.

The error submission form works.

The user can paste a Merchant Center error.

The user can optionally provide contact information.

The user is told that diagnosis does not guarantee approval.

No customer file is committed to GitHub.

No sensitive data is publicly exposed.

Community outreach messages are helpful, not spammy.

Agency outreach messages are specific, not generic.

### V0 validation requirements

10 real Merchant Center errors collected.

3 screenshots or CSV files received voluntarily.

5 users accept a free diagnosis.

1 agency or freelancer confirms recurring need.

1 to 3 users show willingness to pay.

At least 3 repeated error patterns identified.

## V1 QA checklist

V1 goal: build the Shopify CSV identifier diagnostic MVP.

V1 is valid only if the diagnostic engine works reliably on sample files and does not apply unsafe corrections.

### V1 allowed

Landing page.

Textarea for Merchant Center error.

Shopify CSV upload.

CSV parsing.

Column normalization.

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

Severity levels.

Recommended actions.

Corrected CSV when safe.

merchantfix_notes column.

Manual review labels.

Sample tests.

Disclaimer.

### V1 forbidden

Stripe.

Paid checkout.

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

WooCommerce.

XML parsing.

Monitoring.

Shopify app.

Automatic misrepresentation fix.

Approval guarantee.

### V1 required sample files

samples/clean-shopify.csv.

samples/missing-gtin.csv.

samples/custom-products.csv.

samples/duplicate-gtin.csv.

samples/dirty-file.csv.

samples/invalid-gtin.csv.

samples/sku-as-mpn.csv.

samples/missing-brand.csv.

### V1 parser QA

The parser accepts CSV files.

The parser rejects non-CSV files with a clear error.

The parser handles empty files with a clear error.

The parser handles missing columns without crashing.

The parser handles extra columns without crashing.

The parser handles semicolon-separated files if supported.

The parser handles comma-separated files.

The parser preserves row numbers.

The parser recognizes common Shopify column names.

The parser recognizes Title.

The parser recognizes Handle.

The parser recognizes Vendor.

The parser recognizes Brand if present.

The parser recognizes Variant Barcode.

The parser recognizes GTIN if present.

The parser recognizes Variant SKU.

The parser recognizes SKU if present.

The parser recognizes MPN if present.

The parser recognizes Variant Price.

The parser recognizes Image Src.

The parser recognizes identifier_exists.

The parser recognizes Google Product Category if present.

### V1 diagnostic QA

The engine detects missing GTIN.

The engine detects missing MPN.

The engine detects missing brand.

The engine detects identifier_exists=true with missing GTIN and MPN.

The engine detects missing identifier_exists.

The engine detects invalid-looking GTIN length.

The engine detects duplicate GTIN.

The engine detects SKU identical to MPN.

The engine detects missing image.

The engine detects missing price.

The clean sample does not produce false critical errors.

Custom product detection is cautious.

Custom product detection does not prove that identifier_exists should be no.

Manual review is used when context is uncertain.

### V1 severity QA

Critical issues are used only for high-risk inconsistencies.

Warnings are used for missing or suspicious fields.

Info is used for recommendations or uncertainty.

Every issue has an issue code.

Every issue has a product title when available.

Every issue has a row number.

Every issue has an explanation.

Every issue has a suggested fix.

Every issue has autoFixable set to true or false.

### V1 corrected CSV QA

The corrected CSV preserves original columns.

The corrected CSV preserves original rows.

The corrected CSV does not delete products.

The corrected CSV does not reorder products dangerously.

The corrected CSV adds merchantfix_notes.

The corrected CSV may add merchantfix_action if useful.

The corrected CSV never invents GTIN.

The corrected CSV never invents MPN.

The corrected CSV never invents brand.

The corrected CSV does not copy SKU into MPN automatically.

The corrected CSV applies only safe corrections.

Every correction is explained.

Uncertain cases are marked manual review.

### V1 result page QA

The result page shows total products analyzed.

The result page shows critical issue count.

The result page shows warning count.

The result page shows info count.

The result page shows detected categories.

The result page shows a simple summary.

The result page shows affected products.

The result page shows recommended actions.

The result page separates automatic fixes from manual review.

The result page includes the mandatory disclaimer.

The result page is understandable to a non-technical Shopify merchant.

The result page does not mention forbidden V2 or V3 features as active.

### V1 privacy QA

No customer file is stored permanently.

No customer file is committed to GitHub.

No customer data appears in logs unnecessarily.

No external API receives the CSV in V1.

No AI receives the CSV in V1.

No database stores the CSV in V1.

### V1 completion criteria

All sample files pass.

No false critical errors on clean sample.

No unsafe correction is applied.

The corrected CSV is safe.

Manual review is clear.

The interface is clear.

The disclaimer is visible.

No forbidden V1 feature is present.

## V2 QA checklist

V2 goal: validate paid self-service Fix Pack.

V2 is valid only if the payment and delivery flow works reliably and users understand what they are buying.

### V2 allowed

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

Improved landing page.

Improved result page.

More SEO pages.

### V2 forbidden

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

### V2 payment QA

Stripe checkout works in test mode.

Stripe checkout works in production mode before launch.

Payment success page works.

Payment cancellation page works.

User can download the Fix Pack after payment.

User cannot access paid files before payment.

The payment page explains what is included.

The payment page includes the disclaimer.

The payment page does not promise approval.

### V2 Fix Pack QA

The ZIP contains merchantfix-report.pdf.

The ZIP contains corrected-products.csv.

The ZIP contains manual-review-products.csv.

The ZIP contains resubmission-checklist.pdf.

The report is readable.

The corrected CSV is safe.

The manual-review CSV is clear.

The resubmission checklist is practical.

The disclaimer appears in the report.

The disclaimer appears in the checklist.

The Fix Pack does not promise approval.

### V2 support QA

Customers understand what they purchased.

Customers understand which issues are manual.

Customers understand that Google approval is not guaranteed.

Refund or complaint rate remains low.

Support questions remain manageable.

### V2 validation requirements

At least 3 paid purchases.

Diagnostic-to-payment conversion above 3 percent.

At least 2 agencies or freelancers show interest.

Support remains manageable.

No serious complaint about false promise.

## V3 QA checklist

V3 goal: expand to more Merchant Center error families without increasing risk too much.

### V3 allowed

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

AI-assisted summaries.

AI-assisted checklist writing.

More SEO pages.

### V3 forbidden

Automatic misrepresentation fix.

Guaranteed account recovery.

Guaranteed approval.

Legal guarantee.

Compliance guarantee.

Amazon expansion.

Meta Catalog expansion.

TikTok Shop expansion.

Shopify app unless validated.

Google Merchant Center API unless monitoring is requested by paying users.

AI as sole decision maker for critical corrections.

### V3 issue category QA

Each issue is categorized as feed-level, product-level, website-level, or account-level.

Feed-level issues may be corrected when safe.

Product-level issues may require manual review.

Website-level issues must not be presented as CSV fixes.

Account-level issues must not be presented as CSV fixes.

Misrepresentation must be checklist only.

Suspension must not be presented as automatically fixable.

### V3 AI QA

AI explanations are reviewed for false promises.

AI does not invent identifiers.

AI does not invent product data.

AI does not guarantee approval.

AI does not claim misrepresentation recovery.

AI output follows rule-based findings.

AI is not the source of truth for corrections.

### V3 validation requirements

At least 10 cumulative paid purchases.

At least 3 different error families used.

Users understand what is fixable and what is manual.

Support remains manageable.

Reports remain clear.

No increase in refund complaints.

At least 2 agencies request repeated use.

SEO pages begin generating impressions or visits.

## V4 QA checklist

V4 goal: validate agency usage and recurring revenue.

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

Complex team permissions.

Enterprise roles.

Heavy CRM.

Shopify app unless validated.

Google monitoring unless validated.

Unrelated marketplace expansion.

Custom manual agency service.

Enterprise custom development.

### V4 account QA

Authentication works.

Users can access their own diagnostics only.

Agency workspaces are separated.

Reports can be downloaded.

History is accurate.

Subscription status is respected.

Usage limits are respected.

Customer files are handled safely.

### V4 agency report QA

Reports are client-ready.

Reports are clear.

Reports do not promise approval.

Reports separate automatic fixes from manual review.

Reports can include branding if allowed.

Reports remain accurate.

### V4 validation requirements

3 to 5 agencies become paying users or serious pilots.

MRR reaches 500 to 1500 euros.

At least 30 diagnostics per month.

Reports are reused with clients.

Agencies request white label or monitoring.

Churn remains low.

Support remains manageable.

## V5 QA checklist

V5 goal: validate platform-level integrations and monitoring.

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

Amazon expansion unless Google Merchant Center platform is stable.

Meta Catalog expansion unless Google product is stable.

TikTok Shop expansion unless demand is proven.

Enterprise custom development without clear revenue.

Unsupported compliance claims.

Approval guarantee.

Manual recovery service.

### V5 integration QA

Shopify connection works securely.

Google Merchant Center connection works securely.

Tokens are never committed.

Tokens are stored securely.

Monitoring is accurate.

Alerts are useful.

Scheduled scans do not overload systems.

Users can disconnect integrations.

Data retention is documented.

### V5 validation requirements

MRR is stable.

Users request monitoring repeatedly.

Agencies request alerts.

One-shot users return.

Connectors are requested by paying customers.

Support load remains controlled.

Platform can be maintained by a solo founder or very small team.

## Launch QA

Before any public launch:

Landing page is clear.

Upload flow works.

Result flow works.

Disclaimer appears.

No forbidden features are active.

No fake approval promises exist.

No real customer data is in GitHub.

Sample files are fictional.

Error handling works.

Mobile layout works.

Basic SEO metadata exists.

Privacy note exists.

Terms or disclaimer page exists if payment is active.

Stripe is tested if V2 is active.

Download flow is tested if V2 is active.

## Pre-commit checklist

Before every commit:

Did I change only intended files?

Did I add any secrets?

Did I add any real customer data?

Did I add out-of-scope features?

Did I break product safety rules?

Did I remove disclaimers?

Did I run relevant tests?

Did I update documentation if needed?

Did I preserve original CSV data behavior?

Did I avoid inventing identifiers?

## Final QA rule

If a correction is not safe, explain it.

If a case is uncertain, mark it manual review.

If an issue is outside the CSV, say it clearly.

If approval cannot be guaranteed, never imply that it can.

Build trust by being accurate, cautious, and useful.
