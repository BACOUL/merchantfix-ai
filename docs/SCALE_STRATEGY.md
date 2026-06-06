# MerchantFix.ai Scale Strategy

This document defines the long-term scale strategy for MerchantFix.ai.

The goal is to make sure the project can grow internationally without building unnecessary complexity too early.

MerchantFix.ai must be built in a way that supports future scale, but the product must not become complex before V1 and V2 are validated.

## Core scale principle

Think scalable from day one.

Build simple first.

Do not build enterprise infrastructure before the market proves demand.

The correct approach is:

V1: simple, safe, testable diagnostic.

V2: paid one-shot Fix Pack.

V3: more Merchant Center error families.

V4: agency recurring revenue.

V5: monitoring, integrations, and scalable platform.

## Long-term ambition

MerchantFix.ai can become an international product data quality platform for ecommerce merchants using Google Merchant Center and Google Shopping.

The long-term opportunity is larger than a one-shot CSV repair tool.

However, the first version must remain narrow.

The project must validate demand before building the platform.

## Short-term product

The short-term product is:

Shopify CSV upload.

Google Merchant Center identifier diagnosis.

GTIN, MPN, brand, and identifier_exists issues.

Corrected CSV when safe.

Manual review when uncertain.

No payment in V1.

One paid Fix Pack in V2.

## Long-term product

The long-term product may become:

Google Merchant Center diagnostic platform.

Shopify product data quality checker.

Google Shopping feed monitoring tool.

Agency reporting tool.

Merchant Center alerting system.

Multi-store product data quality platform.

Shopping channel readiness checker.

This long-term vision belongs to V4 and V5, not V1.

## Market vision

MerchantFix.ai should be built for the international English-speaking market first.

The target market includes:

Shopify merchants.

Google Shopping advertisers.

Performance Max advertisers.

Google Ads freelancers.

Shopify agencies.

SEA agencies.

Ecommerce consultants.

Product feed managers.

Later, it may include WooCommerce, Magento, Prestashop, Meta Catalog, TikTok Shop, Amazon, and other ecommerce channels.

These expansions must not happen before validation.

## English-first strategy

MerchantFix.ai should launch in English first.

Reasons:

Shopify is global.

Google Merchant Center issues are global.

Most high-intent searches around Merchant Center errors are in English.

The US, UK, Canada, Australia, and European English-speaking ecommerce markets have stronger purchasing power.

Agencies and freelancers often work in English.

A global English product has a higher ceiling than a France-only product.

French can be added later if demand exists.

## Revenue ambition

MerchantFix.ai has two possible revenue paths.

Path 1: one-shot Fix Pack revenue.

Path 2: recurring subscription revenue from monitoring and agencies.

The one-shot Fix Pack is best for early validation.

Subscriptions are best after recurring usage is proven.

## Revenue stages

## Stage 1: early validation

Version: V2.

Model: one-time Fix Pack.

Example price: 79 euros.

Goal: prove people pay for a product data diagnosis and repair package.

Success signal: 3 to 10 paid purchases.

## Stage 2: repeated use

Version: V3 / V4.

Model: repeated diagnostics.

Potential users: freelancers and agencies.

Goal: prove professionals use the tool repeatedly.

Success signal: agencies ask for reports, history, and monthly access.

## Stage 3: recurring revenue

Version: V4.

Model: monthly agency plans.

Potential pricing:

Agency Starter: 199 euros per month.

Agency Pro: 399 euros per month.

Agency White Label: 699 euros per month.

Goal: create stable MRR.

Success signal: 500 to 1500 euros MRR, then higher.

## Stage 4: volume-based platform

Version: V5.

Model: subscriptions based on catalog size, monitoring frequency, or number of stores.

Potential pricing:

Starter: up to 100 products, 29 euros per month.

Growth: up to 1000 products, 79 euros per month.

Scale: up to 5000 products, 149 euros per month.

Pro Catalog: up to 20000 products, 249 euros per month.

Agency: multiple stores, 399 to 699 euros per month.

Enterprise or high-volume: custom pricing only if support is manageable.

These are future targets, not V1 or V2 pricing.

## Pricing rule

Do not introduce complex pricing before paid demand is validated.

V2 should start with one simple Fix Pack.

Volume pricing belongs to V4 or V5.

Agency pricing belongs to V4.

Monitoring pricing belongs to V5.

## Why not start with subscriptions immediately

A subscription makes sense only if the problem repeats.

Many merchants may need one urgent fix.

Some merchants may solve their issue and leave.

Agencies are more likely to have recurring need because they manage several stores.

Monitoring may create recurring need, but it requires integrations and alerts.

Therefore, V2 should validate one-shot payment first.

V4 and V5 should validate recurring revenue later.

## Catalog size strategy

MerchantFix.ai must eventually support large catalogs.

Potential catalog sizes:

Small catalog: 1 to 100 products.

Medium catalog: 101 to 1000 products.

Large catalog: 1001 to 5000 products.

Very large catalog: 5001 to 20000 products.

Enterprise catalog: more than 20000 products.

V1 does not need enterprise-grade processing.

However, V1 code should not block future scale.

## V1 performance target

V1 should aim to handle small and medium Shopify CSV files.

Target:

Up to 1000 products comfortably.

If possible:

Up to 5000 rows with acceptable performance.

V1 should not promise support for very large catalogs.

V1 should show a clear message if a file is too large.

## V2 performance target

V2 should support paid Fix Pack delivery for small and medium catalogs.

Target:

Up to 1000 products reliably.

If implementation allows:

Up to 5000 products.

The paid experience must not break on normal Shopify exports.

## V3 performance target

V3 may support larger catalogs if demand appears.

Target:

Up to 5000 products reliably.

Better progress feedback.

Better file size validation.

Better error handling.

## V4 performance target

V4 agency product should support multiple diagnostics across multiple stores.

Target:

Several small or medium stores per agency.

Usage limits by plan.

Basic history.

No heavy monitoring yet.

## V5 performance target

V5 platform may support large catalogs and scheduled scans.

Target:

10000+ products if architecture supports it.

Background jobs.

Queues.

Async processing.

File storage with retention rules.

Progress tracking.

Monitoring.

Alerts.

Integrations.

This belongs to V5 only.

## Technical scale principles

The V1 code must be modular.

The V1 code must not hide business logic in UI components.

The V1 code must separate parsing, normalization, detection, summary, and CSV generation.

The V1 code must avoid unnecessary external dependencies.

The V1 code must avoid persistent storage.

The V1 code must avoid AI processing on entire files.

The V1 code must avoid API integrations.

The V1 code must be testable.

## Future scalable architecture

If V5 is validated, the architecture may include:

Background jobs.

Queue system.

Temporary file storage.

Secure token storage.

Database for accounts and history.

Scheduled scans.

Webhook processing.

Shopify API connection.

Google Merchant Center API connection.

Email alerts.

Agency workspaces.

Usage-based billing.

This must not be built before demand is proven.

## Processing strategy

## V1 processing

Synchronous processing is acceptable.

The user uploads a CSV.

The app parses and analyzes the CSV.

The result appears immediately.

No persistent storage.

No queue.

No worker.

No database.

## V2 processing

Synchronous processing can remain acceptable if files are moderate.

Payment flow should not make processing fragile.

Fix Pack generation should remain simple.

If PDF or ZIP generation is too heavy, ship CSV and HTML report first.

Do not overbuild.

## V3 processing

If files become larger, introduce better error handling and progress messages.

Still avoid full platform architecture unless needed.

## V4 processing

Agency history may require database.

Reports may be stored or regenerated.

Usage tracking may be added.

## V5 processing

Large catalogs may require asynchronous processing.

Use queue-based analysis.

Use job IDs.

Show progress.

Notify when ready.

Store files temporarily with clear retention.

## File size strategy

V1 should define safe limits.

Potential V1 limits:

Maximum file size: 5 MB to 10 MB.

Maximum rows: 5000 rows.

These limits can be adjusted after testing.

If a file exceeds the limit, show a clear message:

This file is too large for the current V1 diagnostic. MerchantFix.ai currently supports Shopify CSV files up to the defined limit. Large catalog support is planned for later versions.

Do not silently fail.

Do not crash.

## Support scale strategy

Support is the biggest solo-founder risk.

MerchantFix.ai must reduce support through product clarity.

The product must explain:

What was detected.

Why it matters.

What can be fixed automatically.

What needs manual review.

What cannot be fixed from the file.

What Google approval depends on.

The product must avoid vague errors.

The product must avoid false confidence.

## Support automation principles

Every error should have a clear explanation.

Every manual review case should explain why it cannot be automatically fixed.

Every limitation should be visible.

Reports should answer common questions.

FAQ pages should address repeated support issues.

SEO pages should double as support pages.

Help content should be written from real user questions.

## Support risks at scale

At low user volume, support may be manageable manually.

At high user volume, support can destroy the solo-founder model.

Risks:

Billing questions.

Upload failures.

Large file failures.

Misunderstanding manual review.

Users expecting Google approval.

Users asking for account recovery.

Users wanting manual corrections.

Agencies asking for custom work.

Merchants blaming MerchantFix.ai for Google decisions.

## Support prevention rules

Do not promise approval.

Do not promise recovery.

Do not imply account-level issues can be fixed by CSV.

Do not hide manual review.

Do not offer unlimited manual support.

Do not create custom consulting as default.

Do not accept large custom cases without clear pricing.

## Self-support assets

MerchantFix.ai should eventually include:

FAQ.

Error glossary.

Sample reports.

Manual review explanation.

CSV export guide.

Shopify export guide.

Google Merchant Center resubmission guide.

identifier_exists guide.

GTIN guide.

MPN guide.

Brand guide.

Large catalog guide.

Billing FAQ in V2.

Agency FAQ in V4.

Monitoring FAQ in V5.

## Trust strategy

MerchantFix.ai handles product data that can affect advertising and sales.

Trust must be built from day one.

Trust elements:

Clear disclaimer.

Privacy-first messaging.

No fake identifiers.

No approval guarantee.

Transparent limits.

Professional design.

Detailed explanations.

Sample reports.

Clear data handling.

No unnecessary account requirement in V1.

No permanent storage in V1.

## Privacy-first strategy

V1 should avoid storing files.

V1 should not require account creation.

V1 should process files only for diagnosis.

V1 should not send files to AI APIs.

V1 should not commit or expose customer files.

Later versions must document retention and security clearly.

Privacy is a commercial advantage.

## Institutional design strategy

The interface should feel professional, serious, and precise.

Avoid hype.

Avoid exaggerated AI language.

Avoid aggressive marketing.

Use clear cards.

Use direct explanations.

Use caution where needed.

Use strong hierarchy.

Use trust-building copy.

The design should feel like a reliable diagnostic tool, not a gimmick.

## International scale strategy

The first language is English.

The first SEO pages target English search demand.

The first agency outreach can target English-speaking freelancers and agencies.

Later languages may include:

French.

German.

Spanish.

Italian.

Dutch.

Portuguese.

Languages should be added only after the English product validates.

## Market expansion order

Expansion order must be strict:

Shopify + Google Merchant Center.

More Google Merchant Center errors.

Agencies.

Monitoring.

Shopify API.

Google Merchant Center API.

WooCommerce.

Other shopping channels.

Meta Catalog.

TikTok Shop.

Amazon.

Do not skip ahead.

## Product expansion rule

Every expansion must answer:

Did users ask for it?

Are users paying for it?

Does it reduce support or increase revenue?

Can it be automated?

Does it stay aligned with MerchantFix.ai?

Does it create legal, support, or trust risk?

If not, do not build it.

## High-revenue path

The path to 50k+ euros per month is not V1.

The path to 50k+ euros per month is:

SEO captures urgent demand.

V2 proves paid Fix Pack.

V3 expands error coverage.

V4 converts agencies to recurring usage.

V5 adds monitoring and integrations.

Volume-based pricing captures larger catalogs.

Support remains automated.

Churn is controlled through monitoring and repeated value.

## Churn strategy

One-shot products can have no churn but require constant acquisition.

Subscriptions create churn risk.

Monitoring reduces churn if it creates ongoing value.

Agency plans reduce churn if reports and repeated diagnostics become workflow tools.

The product must eventually create recurring value through:

Ongoing scans.

Alerts.

Error history.

Client reports.

Multi-store management.

Agency workflows.

But none of this belongs to V1.

## Retention strategy

Retention features belong to V4 and V5.

Potential retention features:

Monthly diagnostic credits.

Scheduled scans.

Merchant Center error alerts.

Product data quality score.

Historical issue tracking.

Agency client reports.

White-label reporting.

Store monitoring.

These must be built only after users prove repeated need.

## Large catalog strategy

Large catalogs create higher value but higher technical risk.

For large catalogs, MerchantFix.ai may need:

Chunked processing.

Background jobs.

Progress UI.

Memory-safe parsing.

Streaming CSV parsing.

Queue system.

Temporary file storage.

Report generation jobs.

Clear file limits.

Usage-based pricing.

This is V5 territory unless demand appears earlier.

## Architecture warnings

Do not use a browser-only approach if files become too large.

Do not process huge CSV files entirely in memory in future large-catalog versions.

Do not send large catalogs to AI.

Do not store large customer files without a retention policy.

Do not create long-running serverless functions without checking platform limits.

Do not promise large catalog support before testing.

## Solo-founder operations

MerchantFix.ai must remain manageable by one person.

This means:

Low support.

Clear docs.

Automated delivery.

Simple billing.

No custom services by default.

No enterprise promises too early.

No complex integrations too early.

No manual onboarding for every user.

No heavy sales process.

No dependence on phone sales.

## When to hire or outsource

Hiring is not part of the initial plan.

Possible later needs:

Customer support contractor if support exceeds manageable limits.

Designer for trust and conversion improvements.

SEO writer if pages are validated and need scale.

Developer help if API integrations become complex.

But the project should be designed to work solo for as long as possible.

## Scale milestones

## Milestone 1

V1 working diagnostic.

No revenue required.

Goal: prove engine works.

## Milestone 2

First 3 paid Fix Packs.

Goal: prove payment intent.

## Milestone 3

10 paid purchases.

Goal: prove repeated demand.

## Milestone 4

First agency repeated use.

Goal: prove professional workflow value.

## Milestone 5

500 to 1500 euros MRR.

Goal: prove agency subscriptions.

## Milestone 6

5000 euros MRR.

Goal: prove stable early SaaS potential.

## Milestone 7

10000 euros MRR.

Goal: prove product can become serious business.

## Milestone 8

50000 euros MRR.

Goal: requires SEO engine, agency retention, monitoring, volume pricing, and support automation.

## What must be added to future planning

When V2 is validated, revisit pricing.

When V3 is validated, revisit support automation.

When V4 is validated, revisit volume pricing.

When V5 is considered, design scalable processing architecture.

Do not make these decisions before validation.

## Current scale decision

Current phase: V0 / V1 preparation.

Current build target: V1 diagnostic MVP.

Current scale strategy:

Keep V1 simple.

Keep code modular.

Keep English-first.

Keep privacy-first.

Keep SEO focused on urgent errors.

Prepare for future volume pricing, but do not implement it yet.

Prepare for future large catalog support, but do not overbuild it yet.

## Final scale rule

MerchantFix.ai should be built like a product that can scale, but launched like a product that must prove one narrow use case first.

The first goal is not 50k euros per month.

The first goal is a safe, useful, trusted diagnostic.

The scale comes after the proof.
