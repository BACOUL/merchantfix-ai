# MerchantFix.ai Platform Expansion Strategy

This document defines the long-term platform expansion strategy for MerchantFix.ai.

The goal is to preserve the focused V1 execution while keeping a clear path toward a larger international product.

MerchantFix.ai must not become complex too early. Platform expansion is allowed only after the core Google Merchant Center diagnostic use case is validated.

## Core principle

Start narrow.

Validate the urgent Google Merchant Center use case.

Monetize the Fix Pack.

Expand only when paid users prove the need.

The first product is not the final platform.

The final platform must not be built before the first product works.

## Current product focus

Current phase: V0 / V1 preparation.

Current product scope:

Shopify CSV.

Google Merchant Center.

GTIN.

MPN.

Brand.

identifier_exists.

Diagnostic result.

Corrected CSV when safe.

Manual review when uncertain.

No Stripe in V1.

No PDF in V1.

No API integrations in V1.

No monitoring in V1.

No omni-channel expansion in V1.

## Long-term platform vision

MerchantFix.ai may eventually become a product data risk and compliance platform for ecommerce shopping channels.

Long-term vision:

Detect product data issues before they cause product disapprovals.

Help merchants correct feed-level issues.

Generate structured evidence packs for resubmission.

Monitor product data across connected stores.

Alert agencies and merchants before errors become expensive.

Support multiple shopping channels after Google Merchant Center validation.

## Expansion pillars

MerchantFix.ai has four possible long-term expansion pillars:

Omni-channel catalog diagnostics.

Resubmission and appeal support packs.

Proactive product data firewall.

Agency and multi-account dashboard.

These pillars must be introduced in the correct order.

## Pillar 1: Omni-channel catalog diagnostics

## Definition

Omni-channel catalog diagnostics means expanding beyond Google Merchant Center to other shopping and catalog platforms.

Potential future platforms:

Meta Catalog.

Facebook Shops.

Instagram Shopping.

TikTok Shop.

Pinterest Catalog.

Microsoft Shopping.

Amazon listings.

Other marketplace or ad catalog systems.

## Strategic value

Many ecommerce merchants sell or advertise across multiple platforms.

Product data issues often repeat across channels.

The same product catalog can create similar problems:

Missing identifiers.

Price mismatch.

Availability mismatch.

Missing images.

Policy-sensitive claims.

Category mismatch.

Shipping or tax issues.

Unsafe product descriptions.

If MerchantFix.ai can eventually validate product data across several channels, the product becomes more valuable and defensible.

## Timing

Omni-channel expansion must not happen before Google Merchant Center is validated.

Recommended timing:

V1: Google Merchant Center identifiers only.

V2: Google Merchant Center Fix Pack.

V3: more Google Merchant Center error families.

V4: agency workflows for Google Merchant Center.

V5: monitoring and integrations for Google Merchant Center.

V6: omni-channel expansion if demand exists.

## Forbidden in early versions

Do not add Meta Catalog in V1.

Do not add TikTok Shop in V1.

Do not add Pinterest in V1.

Do not add Amazon in V1.

Do not claim universal catalog compliance in V1.

Do not position MerchantFix.ai as a universal advertising compliance firewall before the Google use case is proven.

## Future positioning

Possible future positioning after validation:

Product data risk scanner for shopping channels.

Catalog readiness checker for ecommerce ads.

Shopping channel compliance diagnostic platform.

Universal product data QA layer.

Do not use these broader positions before the product supports them.

## Pillar 2: Resubmission Evidence Pack

## Definition

A Resubmission Evidence Pack is a structured document generated after analysis and correction.

It helps a merchant or agency understand:

What issues were detected.

Which rows were affected.

What corrections were applied.

Which rows still need manual review.

What should be checked before resubmitting.

What message can be used when contacting platform support.

This is not a legal appeal.

This is not a guarantee of approval.

This is not an official Google, Meta, or TikTok document.

## Strategic value

The Resubmission Evidence Pack can justify a premium price earlier than API integrations or monitoring.

It gives the user a concrete deliverable.

It helps agencies explain problems to clients.

It increases perceived value.

It can become the core of the V2 paid Fix Pack.

## Recommended timing

The Resubmission Evidence Pack belongs to V2.

V1 must not include PDF generation.

V2 can include:

PDF report.

Corrected CSV.

Manual review CSV.

Resubmission checklist.

Suggested support message.

Mandatory disclaimer.

## Better name

Preferred names:

Resubmission Evidence Pack.

Merchant Center Fix Pack.

Product Data Repair Pack.

Diagnostic Evidence Report.

Avoid names that sound legal or guaranteed.

Avoid:

Legal appeal pack.

Official appeal document.

Google approval pack.

Account recovery pack.

## V2 pack contents

The V2 Fix Pack may include:

merchantfix-report.pdf.

corrected-products.csv.

manual-review-products.csv.

resubmission-checklist.pdf.

support-message-template.txt.

## Support message template

The support message must be cautious.

It can say:

We reviewed the affected product data.

We corrected product fields where safe.

We marked rows requiring manual review.

We verified that GTIN or MPN values were not generated artificially.

We request a new review after these product data updates.

It must not say:

Approval is required.

The issue is fully resolved.

MerchantFix.ai guarantees compliance.

The account should be reinstated.

## Mandatory disclaimer

Every Resubmission Evidence Pack must include:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## Forbidden claims

The Resubmission Evidence Pack must never claim:

Guaranteed approval.

Guaranteed account recovery.

Guaranteed suspension removal.

Legal compliance guarantee.

Official Google certification.

Official Meta certification.

Official TikTok certification.

Full policy compliance.

## Why this comes before webhook

The Resubmission Evidence Pack is easier to build than proactive webhooks.

It can be sold in V2.

It does not require OAuth.

It does not require API integrations.

It does not require monitoring.

It creates immediate value.

It helps validate willingness to pay.

Therefore, it should be considered before proactive webhook infrastructure.

## Pillar 3: Proactive product data firewall

## Definition

A proactive product data firewall checks product data before it creates channel-level issues.

Instead of waiting for Google Merchant Center to reject or limit products, MerchantFix.ai may eventually monitor product changes and warn users earlier.

Future examples:

A Shopify product is created.

A product title is changed.

A price is changed.

A barcode is removed.

A product image is removed.

identifier_exists changes.

A feed sync is about to send incomplete data.

MerchantFix.ai detects the risk and alerts the user.

## Strategic value

This is the strongest long-term recurring value.

It can justify subscription pricing.

It can reduce churn.

It can create daily or weekly product value.

It can become a core V5 platform feature.

## Timing

This belongs to V5 or later.

Do not build proactive webhook features before:

V1 engine works.

V2 payments are validated.

V3 error families are useful.

V4 agency demand appears.

Users repeatedly request monitoring or alerts.

## Required future components

Proactive monitoring may require:

Shopify API connection.

Google Merchant Center API connection.

Secure OAuth.

Webhook handling.

Background jobs.

Queue system.

Scheduled scans.

Error history.

Alert system.

Email notifications.

Agency dashboard.

Usage limits.

Secure token storage.

Data retention policy.

## Forbidden early promises

Do not say:

Never get suspended again.

Guaranteed prevention.

Google will never reject your products.

Automatic compliance firewall.

Full protection from account issues.

Instead, say:

MerchantFix.ai can help detect product data risks before they become repeated feed problems.

MerchantFix.ai can alert users when product data may create rejection risks.

MerchantFix.ai cannot guarantee platform approval or prevent all account issues.

## V5 possible features

Product change monitoring.

New product scan.

Updated product scan.

Missing GTIN alert.

Missing MPN alert.

Missing image alert.

Price mismatch risk alert.

Availability mismatch risk alert.

Manual review queue.

Product data quality score.

Weekly risk summary.

Agency multi-store alerts.

## Pillar 4: Agency and multi-account dashboard

## Definition

Agency mode allows professionals to manage diagnostics across multiple clients.

Future agency users:

Google Ads agencies.

SEA agencies.

Shopify agencies.

Performance Max consultants.

Ecommerce consultants.

Freelance media buyers.

## Strategic value

Agencies can create recurring revenue.

Agencies manage multiple stores.

Agencies need client-ready reports.

Agencies can reuse MerchantFix.ai to explain issues.

Agencies can become distribution partners.

Agency reports can help MerchantFix.ai spread through client communication.

## Timing

Agency features belong to V4.

Do not build agency dashboard in V1.

Do not build white-label reports in V1.

Do not build agency subscriptions in V1.

Do not build multi-client workspaces before repeated agency need is proven.

## V4 possible features

Agency workspace.

Multiple client stores.

Diagnostic history.

Client-ready reports.

White-label PDF reports.

Monthly diagnostic credits.

Stripe subscriptions.

Usage dashboard.

Report export.

Team members only if needed.

## V4 possible pricing

Agency Starter: 199 euros per month.

Agency Pro: 399 euros per month.

Agency White Label: 699 euros per month.

Pricing must be tested after V2 and V3.

## White-label rule

White-label reports are valuable, but they must not remove required disclaimers.

Even white-label reports must include:

Google approval is not guaranteed.

Manual review may be required.

No fake GTIN, MPN, or brand was generated.

## Expansion order

The correct expansion order is:

V1: Shopify CSV identifier diagnostic.

V2: paid Fix Pack and Resubmission Evidence Pack.

V3: more Google Merchant Center error families.

V4: agency dashboard, history, reports, subscriptions.

V5: proactive monitoring, Shopify API, Google Merchant Center API.

V6: omni-channel expansion to Meta, TikTok, Pinterest, and other catalogs.

Do not skip this order.

## Version allocation

## V1

Allowed:

CSV diagnostic.

GTIN, MPN, brand, identifier_exists.

Corrected CSV when safe.

Manual review.

Forbidden:

PDF.

Appeal pack.

Webhook.

Agency dashboard.

Omni-channel.

API integrations.

## V2

Allowed:

Stripe one-time payment.

Fix Pack.

PDF report.

Corrected CSV.

Manual review CSV.

Resubmission checklist.

Support message template.

Forbidden:

Webhook.

Omni-channel.

Subscriptions.

Agency dashboard.

API integrations.

## V3

Allowed:

More Google Merchant Center errors.

Price mismatch.

Availability mismatch.

Image issues.

Shipping checklist.

Misrepresentation checklist only.

AI explanations if safe.

Forbidden:

Automatic misrepresentation fix.

Omni-channel.

Webhook.

Agency dashboard unless V4 criteria are met.

## V4

Allowed:

Agency dashboard.

Reports.

White-label reports.

Subscription pricing.

Multi-client history.

Usage limits.

Forbidden:

Omni-channel unless Google use case is stable.

Webhook unless monitoring demand is proven.

Heavy enterprise features.

## V5

Allowed:

Shopify API.

Google Merchant Center API.

Monitoring.

Alerts.

Scheduled scans.

Product data quality score.

Proactive risk detection.

Forbidden:

Omni-channel expansion before Google monitoring is stable.

Unverified platform claims.

Guaranteed prevention.

## V6

Allowed:

Meta Catalog diagnostics.

TikTok Shop diagnostics.

Pinterest Catalog diagnostics.

Other shopping channel diagnostics.

Universal product data risk layer.

Forbidden:

Broad compliance claims without proof.

Legal guarantees.

Universal approval guarantee.

## Strategic priority ranking

Priority 1: V1 diagnostic engine.

Reason: nothing works without a reliable engine.

Priority 2: V2 Fix Pack.

Reason: validates payment and deliverable value.

Priority 3: Resubmission Evidence Pack.

Reason: increases perceived value and supports premium pricing.

Priority 4: V3 expanded Google errors.

Reason: increases market coverage.

Priority 5: Agency dashboard.

Reason: creates recurring revenue.

Priority 6: Proactive monitoring.

Reason: creates retention and stronger subscriptions.

Priority 7: Omni-channel expansion.

Reason: increases market size only after core product is proven.

## What to build first for premium pricing

The first premium feature should be the Resubmission Evidence Pack.

Why:

It is achievable in V2.

It increases perceived value.

It helps agencies.

It does not require API integrations.

It does not create heavy infrastructure.

It supports a higher one-shot price.

The proactive webhook system is more powerful long term, but it belongs later.

## Future pricing impact

## Fix Pack pricing

Basic Fix Pack: 79 euros.

Enhanced Fix Pack with PDF and resubmission evidence: 99 to 149 euros.

## Agency pricing

Agency Starter: 199 euros per month.

Agency Pro: 399 euros per month.

Agency White Label: 699 euros per month.

## Monitoring pricing

Starter monitoring: 29 euros per month.

Growth monitoring: 79 euros per month.

Scale monitoring: 149 to 249 euros per month.

Agency monitoring: 399 to 699 euros per month.

These prices are strategic hypotheses, not V1 commitments.

## Support risk

Every expansion can increase support.

Omni-channel increases support.

Appeal packs increase expectation risk.

Webhook monitoring increases technical support.

Agency dashboard increases account support.

Therefore, every expansion must include:

Clear boundaries.

Clear disclaimers.

Clear self-support.

Clear error messages.

Clear manual review categories.

## Trust risk

MerchantFix.ai must remain trusted.

Do not use aggressive claims.

Do not sound like a legal service.

Do not sound like an official Google partner unless it is true.

Do not promise outcomes controlled by platforms.

Do not hide limitations.

Trust is more important than hype.

## Legal and policy caution

MerchantFix.ai should avoid positioning itself as:

Legal advisor.

Compliance certifier.

Official Google recovery service.

Official Meta recovery service.

Official TikTok recovery service.

Guaranteed reinstatement service.

The correct positioning is:

Product data diagnostic and repair tool.

Resubmission support tool.

Evidence report generator.

Product data risk monitoring tool.

## Data model future considerations

The future database may need entities such as:

User.

Workspace.

Store.

Channel.

Product.

DiagnosticRun.

Issue.

Correction.

Report.

EvidencePack.

ManualReviewItem.

Alert.

WebhookEvent.

Subscription.

UsageLimit.

These must not be added in V1.

They should be considered only when V4 or V5 is reached.

## Current architecture implication

Even though V1 has no database, the code should be modular.

The V1 types should not prevent future expansion.

Issue types should allow:

channel.

category.

severity.

fixType.

manualReviewRequired.

source.

rowNumber.

productHandle.

productTitle.

This helps future expansion without building V5 now.

## Current decision

Current phase: V0 / V1 preparation.

Current build target: V1 diagnostic MVP.

Current platform expansion status: strategy only.

Current next build step: start Codex prompt 01 after documentation and samples are complete.

Do not implement platform expansion now.

## Final platform rule

MerchantFix.ai can become a larger international product data platform, but only if the narrow first product proves demand.

The right first build is not omni-channel.

The right first build is not webhook monitoring.

The right first build is not an agency dashboard.

The right first build is a safe Shopify CSV diagnostic for Google Merchant Center identifier issues.

Build the narrow tool.

Sell the Fix Pack.

Then expand.
