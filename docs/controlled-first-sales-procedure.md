# MerchantFix.ai — Controlled First Sales Procedure

Status: ready to use after Vercel, Stripe, diagnostic, CSV, report, and mobile QA pass.

Date: 2026-06-28

## Purpose

This document defines how to run the first MerchantFix.ai sales carefully.

The first sales are not a scale phase. They are a proof phase.

The goal is to validate whether a small number of real Shopify merchants, agencies, or consultants understand the 29 EUR Fix Pack and find the report useful.

## Initial target

Start with:

```text
3 to 10 controlled Fix Pack sales
```

Do not launch broad paid ads before these cases are reviewed.

## Active offer

Only sell the current launch offer:

```text
MerchantFix Fix Pack — 29 EUR one-time
```

Current scope:

- paste a Google Merchant Center product-data warning;
- buy the Fix Pack if row-level CSV diagnosis is useful;
- upload a Shopify product CSV export;
- receive an on-screen diagnostic report;
- receive an annotated CSV only when safe output is available;
- review rows marked as safe note, needs proof, or do not change yet.

Do not sell future features as current deliverables.

## Best-fit customers

Prioritize prospects who have:

- a Shopify store;
- a Google Merchant Center or Google Shopping product-data warning;
- a Shopify product CSV export;
- multiple affected products or uncertainty about which rows to review;
- willingness to verify product evidence before editing.

Best channels:

- Shopify agencies;
- Google Ads freelancers;
- Merchant Center consultants;
- ecommerce operators;
- Shopify merchants asking about product-data warnings.

## Good-fit warning families

Good fit:

- product identifier warnings;
- brand or vendor warnings;
- product image warnings;
- product price warnings;
- product availability warnings;
- row-level product-data inconsistencies.

Partial fit:

- shipping setup questions;
- category questions;
- landing page availability questions;
- image crawl questions.

Bad fit:

- account-level cases with no product CSV to review;
- non-Shopify stores;
- requests for guaranteed outcomes;
- requests for automatic product-data changes without review;
- requests outside product-data diagnosis.

## Qualification questions

Ask these before selling:

1. Are you using Shopify?
2. Is the issue from Google Merchant Center or Google Shopping?
3. What is the exact warning text?
4. Does it affect one product or many products?
5. Can you export a Shopify product CSV?
6. Are you trying to understand which rows or fields to review before editing?
7. Do you understand that MerchantFix is a diagnostic tool and does not guarantee Google outcomes?

Sell only if the prospect has Shopify, a relevant warning, CSV access, and a row-level diagnosis need.

## One-line pitch

```text
MerchantFix helps Shopify merchants turn Google Merchant Center product-data warnings into a row-level CSV review: what to fix, what needs proof, and what not to change yet.
```

## Outreach message — agency or freelancer

```text
Hi,

I’m testing MerchantFix.ai, a diagnostic tool for Shopify merchants with Google Merchant Center product-data warnings.

The merchant pastes the warning, uploads a Shopify product CSV, and receives a row-level report showing what to fix, what needs proof, and what not to change yet.

I’m looking for a few real cases for a controlled 29 EUR Fix Pack test.

Do you currently have a Shopify client with product-data warnings in Merchant Center?
```

## Outreach message — merchant

```text
Hi,

If your Shopify products are blocked or limited in Google Merchant Center because of product-data warnings, I’m testing MerchantFix.ai.

You paste the exact warning, upload your Shopify product CSV, and receive a row-level report showing which products to review, what evidence is needed, and what not to change yet.

The first controlled Fix Pack is 29 EUR.

Do you have the exact warning text from Merchant Center?
```

## Fit confirmation message

```text
Thanks. Before I point you to the Fix Pack, I just want to confirm fit:

1. Is the store on Shopify?
2. Can you export a Shopify product CSV?
3. Is the issue about product data?
4. Are you looking for row-level guidance before editing Shopify?

MerchantFix does not guarantee Google approval. It helps identify what to review safely.
```

## When to send the Fix Pack link

Send the link only after:

- the warning is product-data related;
- the prospect confirms Shopify;
- the prospect can access a Shopify product CSV;
- row-level diagnosis is useful;
- the prospect understands this is not an outcome guarantee.

Recommended message:

```text
This looks like a good fit for the Fix Pack.

Use this flow:

1. paste the exact warning;
2. start the 29 EUR Fix Pack;
3. upload the Shopify product CSV;
4. review the rows marked safe note, needs proof, or do not change yet.

MerchantFix is a diagnostic tool. It does not guarantee Google approval and does not invent missing product facts.
```

## When not to sell

Do not sell if the prospect expects:

- a guaranteed Google result;
- account-level recovery;
- automatic edits without review;
- legal, tax, or official platform support;
- support for a non-Shopify store;
- a full feed-management platform.

Safe response:

```text
This is probably not a good fit for MerchantFix right now.

MerchantFix focuses on Shopify product-data CSV diagnosis before feed edits. It does not guarantee Google outcomes or replace broader account review.

If the issue becomes a product-data warning with a Shopify CSV to review, the Fix Pack may be useful.
```

## Early-customer support procedure

For the first 3 to 10 sales, manually review:

- whether the customer warning was a good fit;
- whether CSV upload worked;
- whether the report was understandable;
- whether rows marked needs proof were clear;
- whether rows marked do not change yet were clear;
- whether the customer expected something outside the offer.

Do not manually edit product data as part of the Fix Pack unless a separate service is created later.

## What to record after each sale

Use `docs/prospecting-tracker-template.csv` or another tracker.

Record:

- prospect type;
- country;
- website;
- warning family;
- whether they had a Shopify CSV;
- whether they bought;
- whether upload worked;
- whether report was useful;
- rows analyzed;
- top issue families;
- needs-proof count;
- do-not-change-yet count;
- objection before purchase;
- issue after purchase;
- refund request if any;
- testimonial if permitted;
- next product improvement.

## Success criteria

Strong signal:

- 3 or more people pay without a long call;
- warnings are product-data related;
- CSV upload succeeds;
- report is understood;
- customer says it clarified what to review;
- agencies see repeat use.

Medium signal:

- customers need support but still see value;
- agencies understand the product but want email, PDF, or report links;
- the report is useful but needs clearer wording.

Weak signal:

- prospects do not understand the offer;
- many cases are outside product-data diagnosis;
- customers expect guaranteed outcomes;
- CSV export is too hard;
- reports are not clear enough.

## Stop conditions

Pause sales if:

- checkout fails;
- paid diagnostic access fails;
- CSV upload repeatedly fails;
- report does not render;
- annotated CSV output is confusing;
- unsafe claims are found;
- support burden becomes too high.

If a stop condition occurs:

1. stop outreach;
2. document the failure;
3. fix the issue;
4. run the final launch QA checklist again;
5. restart only after the issue is resolved.

## Post-sale message

```text
Thanks for trying the MerchantFix Fix Pack.

Please keep your original Shopify CSV untouched before making changes.

Start with rows marked “do not change yet” and “needs proof”. These are the rows where guessing can create more risk.

MerchantFix does not guarantee Google approval, but it should help you understand which Shopify product rows and fields need review before resubmitting.
```

## Feedback questions

Ask after the report:

1. Did the report make the warning easier to understand?
2. Did you identify rows you would not have checked otherwise?
3. Were the needs-proof rows clear?
4. Were the do-not-change-yet rows clear?
5. Was anything too technical?
6. Would you use this again for another product-data warning?
7. Would an agency version be useful?
8. What output did you expect but not receive?

## Decision after first 10 sales

If signal is strong:

- build Stripe webhook;
- create order records;
- create report records;
- add magic report links;
- add email after payment;
- add email after report generation.

If signal is medium:

- improve report clarity;
- improve CSV export guidance;
- improve sample report;
- continue controlled sales.

If signal is weak:

- review positioning;
- review target customer;
- focus on agencies or consultants;
- avoid autonomy build until demand is clearer.

## Final rule

Controlled sales are not a growth phase.

They are a proof phase.

Sell carefully, learn quickly, and do not add complexity until real demand proves the next layer is worth building.
