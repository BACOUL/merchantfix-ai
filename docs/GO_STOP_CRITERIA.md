# MerchantFix.ai GO / STOP Criteria

This document defines the decision rules for moving from one version to the next.

MerchantFix.ai must not progress because a feature is technically possible. It must progress only when the current version has proven the required product, market, or revenue signal.

## Core rule

Do not move to the next version until the current version has met its GO criteria.

If STOP criteria appear, pause, fix, reduce scope, or pivot before building more.

## Decision philosophy

Every version must answer one clear question.

V0 question: does the market have this problem and will users share real cases?

V1 question: can the tool reliably diagnose Shopify CSV identifier issues?

V2 question: will users pay for the Fix Pack?

V3 question: can the product expand to more Merchant Center errors without becoming manual service?

V4 question: will agencies use it repeatedly and pay monthly?

V5 question: do paying users want integrations and monitoring enough to justify platform complexity?

## Global GO rules

Proceed only if the current version has clear evidence.

Proceed only if the next version directly addresses a validated need.

Proceed only if support remains manageable.

Proceed only if the product promise remains clear.

Proceed only if safety rules are respected.

Proceed only if users understand the limitations.

Proceed only if the project remains executable by a solo founder or very small team.

## Global STOP rules

Stop if the product becomes a manual agency service.

Stop if users expect guaranteed approval.

Stop if the tool requires too much support before revenue.

Stop if customer cases are too diverse to standardize.

Stop if the current scope is not validated.

Stop if a feature creates legal, compliance, or trust risk.

Stop if the product cannot explain what it does in one sentence.

Stop if the project starts building V5 complexity before V1 or V2 proof.

## V0 GO / STOP

## V0 objective

Validate market demand before building the full product.

## V0 GO criteria

Proceed to V1 only if most of the following are true:

10 real Google Merchant Center errors are collected.

3 screenshots or CSV files are received voluntarily.

5 users accept a free diagnosis.

1 agency or freelancer confirms the problem is recurring.

1 to 3 users show willingness to pay.

At least 3 repeated error patterns are identified.

GTIN, MPN, brand, or identifier_exists issues appear repeatedly.

Users understand the promise.

Users do not demand guaranteed approval.

The problem appears urgent enough to justify a tool.

## V0 STOP criteria

Do not proceed to V1 if most of the following are true:

No real users share errors.

Users do not want to upload files or paste errors.

GTIN, MPN, brand, and identifier_exists issues are rare.

Most cases are account suspension or misrepresentation only.

Most cases require manual consulting.

Agencies do not recognize the problem.

Users only want free advice.

Users do not understand the product.

Users expect guaranteed approval.

The positioning does not create interest.

## V0 decision options

If GO criteria are met, proceed to V1.

If demand exists but the problem is broader than identifiers, keep V1 narrow and document future V3 issues.

If demand exists but users fear uploading CSV files, add clearer privacy messaging.

If demand exists but no one wants to pay, improve the Fix Pack value proposition before coding V2.

If no demand appears, pause or pivot.

## V1 GO / STOP

## V1 objective

Validate the technical diagnostic engine for Shopify CSV identifier issues.

## V1 GO criteria

Proceed to V2 only if all critical criteria are true:

The app runs locally.

CSV upload works.

The parser reads Shopify CSV files.

Column normalization works with common Shopify columns.

The engine detects missing GTIN.

The engine detects missing MPN.

The engine detects missing brand.

The engine detects identifier_exists inconsistency.

The engine detects invalid-looking GTIN.

The engine detects duplicate GTIN.

The engine detects SKU identical to MPN.

Clean sample does not produce false critical errors.

Dirty sample does not crash the app.

Corrected CSV preserves original columns.

Corrected CSV preserves original rows.

Corrected CSV adds merchantfix_notes.

Corrected CSV does not invent GTIN.

Corrected CSV does not invent MPN.

Corrected CSV does not invent brand.

Manual review cases are clear.

The result page is understandable to a non-technical user.

The disclaimer is visible.

No forbidden V1 features were added.

## V1 optional GO signals

Proceed with more confidence if:

Users test the diagnostic and understand the output.

At least 5 real files or screenshots inform the rules.

Agencies say the report would help explain issues to clients.

Users ask how to download the complete fix package.

The free diagnosis creates perceived value.

## V1 STOP criteria

Do not proceed to V2 if any critical issue is true:

CSV parsing is unreliable.

The engine crashes on common sample files.

The engine produces too many false positives.

The engine misses obvious identifier issues.

The corrected CSV deletes columns.

The corrected CSV changes original data dangerously.

The corrected CSV invents identifiers.

The result page is confusing.

Manual review cases are unclear.

Users think approval is guaranteed.

Forbidden V1 features were added.

Tests fail.

## V1 decision options

If technical engine works, proceed to V2.

If parser is weak, improve parser before payment.

If rules are too strict, reduce false positives before payment.

If diagnosis is unclear, improve copy and result page before payment.

If corrected CSV is risky, disable auto-correction and offer diagnosis only until fixed.

## V2 GO / STOP

## V2 objective

Validate paid self-service purchase.

## V2 GO criteria

Proceed to V3 only if most of the following are true:

Stripe checkout works.

Payment success flow works.

ZIP download works.

PDF report is readable.

Corrected CSV remains safe.

Manual-review CSV is clear.

Resubmission checklist is practical.

At least 3 paid purchases occur.

Diagnostic-to-payment conversion is above 3 percent.

At least 2 agencies or freelancers show interest.

Users understand what is included.

Users understand Google approval is not guaranteed.

Support questions remain manageable.

Refund or complaint rate remains low.

The Fix Pack feels valuable.

## V2 stronger GO criteria

Proceed with more confidence if:

10 paid purchases occur.

At least 1 agency buys or requests multiple diagnostics.

Users ask for more Merchant Center error types.

SEO pages begin receiving impressions.

Users share specific missing features that align with V3.

## V2 STOP criteria

Do not proceed to V3 if most of the following are true:

Nobody pays.

Users only use the free diagnosis.

Users do not understand the Fix Pack.

Users expect guaranteed approval.

Users request manual consulting for every case.

Support burden is high.

Refunds or complaints appear early.

File delivery is unreliable.

Payment flow is unreliable.

The report is not perceived as useful.

The corrected CSV creates confusion.

## V2 decision options

If people pay and support is manageable, proceed to V3.

If people do not pay, revise pricing, offer, or perceived value.

If people pay but expect manual help, tighten positioning and deliverables.

If people pay but need more error types, add V3 carefully.

If agencies show interest, prepare V4 notes but do not build V4 yet.

## V3 GO / STOP

## V3 objective

Expand to more Merchant Center error families without becoming a manual consulting business.

## V3 GO criteria

Proceed to V4 only if most of the following are true:

At least 10 cumulative paid purchases exist.

At least 3 error families are used.

Users understand automatic versus manual corrections.

Support remains manageable.

Reports remain clear.

No increase in refund complaints.

At least 2 agencies request repeated use.

SEO pages begin generating impressions or visits.

Users ask for client-ready reports.

Users ask for repeated diagnostics.

Agencies request workflows or monthly access.

## V3 allowed expansion signals

Good V3 expansion signals include:

Repeated price mismatch issues.

Repeated availability mismatch issues.

Repeated missing image issues.

Repeated missing shipping issues.

Repeated missing category issues.

Repeated products not showing issues.

Repeated limited performance issues.

Repeated request for misrepresentation checklist.

## V3 STOP criteria

Do not proceed to V4 if most of the following are true:

Expansion creates confusion.

New errors create too much support.

Misrepresentation dominates requests.

Users believe MerchantFix.ai can recover suspended accounts.

Users expect guaranteed approval.

Reports become too complex.

The product promise becomes unclear.

Additional error types do not drive purchases.

SEO pages do not attract users.

Agencies do not request repeated use.

## V3 decision options

If repeated agency usage appears, proceed to V4.

If one-shot users pay but agencies do not, improve one-shot product before V4.

If support becomes heavy, reduce supported error families.

If misrepresentation dominates, separate it as checklist-only and avoid recovery claims.

If SEO works, expand SEO pages carefully.

## V4 GO / STOP

## V4 objective

Validate recurring agency usage.

## V4 GO criteria

Proceed to V5 only if most of the following are true:

3 to 5 agencies become paying users or serious pilots.

MRR reaches 500 to 1500 euros.

At least 30 diagnostics per month are run.

Reports are reused with clients.

Agencies request white label.

Agencies request monitoring.

Agencies request history.

Agencies request multi-store management.

Churn remains low.

Support remains manageable.

Monthly plans make sense.

## V4 stronger GO criteria

Proceed with more confidence if:

MRR exceeds 1500 euros.

Agencies use the product every month.

Agencies ask for alerts.

Agencies ask for Shopify connection.

Agencies ask for Google Merchant Center connection.

One-shot customers return.

Usage data proves recurring need.

## V4 STOP criteria

Do not proceed to V5 if most of the following are true:

Agencies do not pay.

Agencies only want one-off diagnostics.

Agencies require custom manual service.

White-label reports are not valued.

Monthly subscriptions do not fit usage.

Support becomes too high.

Authentication and database add complexity without revenue.

Users do not return.

Monitoring is not requested.

Connectors are not requested by paying customers.

## V4 decision options

If recurring usage is proven, proceed to V5.

If agencies use it one-shot only, keep improving Fix Pack.

If agencies want custom service, avoid becoming an agency.

If agencies want reports but not monitoring, improve reporting rather than APIs.

If monitoring demand is real, plan V5 carefully.

## V5 GO / STOP

## V5 objective

Build platform-level integrations and monitoring only if demand is proven.

## V5 GO criteria

Build V5 features only if most of the following are true:

MRR is stable.

Users request monitoring repeatedly.

Agencies request alerts.

One-shot users return.

Connectors are requested by paying customers.

Shopify API is requested repeatedly.

Google Merchant Center API is requested repeatedly.

Support load remains controlled.

The platform can be maintained by a solo founder or very small team.

The product has enough revenue to justify maintenance.

## V5 STOP criteria

Do not build V5 features if most of the following are true:

MRR is not stable.

Users do not return.

Monitoring is not requested.

Connectors are only speculative.

Shopify API is not requested by paying users.

Google API is not requested by paying users.

Support is already too high.

The product is not profitable enough.

The solo-founder workload becomes unrealistic.

Integrations would create security or maintenance risk without clear revenue.

## V5 decision options

If monitoring is strongly requested, build scheduled diagnostics.

If Shopify API is requested first, build Shopify connection before Google API.

If Google Merchant Center API is requested first, evaluate API complexity and security.

If agencies are the main users, build agency monitoring first.

If one-shot users dominate, delay platform features.

## Feature-specific GO / STOP

## Stripe

GO if V1 diagnostic is reliable and users want the full Fix Pack.

STOP if V1 is not validated.

## PDF report

GO if users need a downloadable explanation.

STOP if report content is unclear or diagnosis is not reliable.

## ZIP download

GO if multiple files are delivered.

STOP if delivery creates technical issues before payment validation.

## AI explanations

GO in V3 if rule-based findings are stable and users need clearer explanations.

STOP if AI invents product data or creates false promises.

## Authentication

GO in V4 if agencies need history or monthly access.

STOP if one-shot flow still works without accounts.

## Supabase

GO in V4 if user accounts, history, or agency workspaces are needed.

STOP if no recurring use exists.

## Shopify API

GO in V5 if paying users repeatedly ask for connection.

STOP if CSV upload remains sufficient.

## Google Merchant Center API

GO in V5 if paid users repeatedly ask for monitoring or direct diagnostics.

STOP if API complexity exceeds proven revenue.

## Monitoring

GO in V5 if agencies or merchants request ongoing alerts.

STOP if use remains one-shot.

## Shopify app

GO in V5 only if Shopify API usage is validated and marketplace distribution is worth the effort.

STOP if it is only a nice-to-have.

## WooCommerce

GO only after Shopify use case is validated.

STOP if it distracts from the Shopify product.

## Misrepresentation

GO only as checklist content in V3.

STOP any automatic recovery promise.

## Amazon, Meta Catalog, TikTok Shop

GO only after Google Merchant Center product is stable and profitable.

STOP if MerchantFix.ai has not validated core market.

## Emergency STOP conditions

Stop development immediately and review if:

The tool generates fake GTIN.

The tool generates fake MPN.

The tool invents brand.

The tool promises approval.

The tool claims account recovery.

The tool stores customer files unsafely.

Real customer data is committed to GitHub.

The product becomes manual consulting.

The scope expands without validation.

Users are confused about what the tool does.

Refunds or complaints indicate false expectations.

## Weekly review questions

What version are we currently building?

What is the objective of this version?

What has been validated?

What has not been validated?

Did we add anything outside the current version scope?

Are users asking for this feature or are we guessing?

Are we increasing support burden?

Are we still avoiding false approval promises?

Are we still protecting customer data?

Should we continue, reduce scope, or stop?

## Current decision status

Current phase: V0 / V1 preparation.

Current GO target: create documentation, prompts, samples, and V1 diagnostic engine.

Current STOP risk: building payment, AI, APIs, or platform features too early.

Current next decision: proceed to V1 build only after documentation, prompts, and sample files are ready.
