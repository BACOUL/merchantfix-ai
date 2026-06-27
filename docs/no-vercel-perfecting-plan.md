# MerchantFix.ai — No-Vercel Perfecting Plan

Status: active preparation while Vercel deployment credits are unavailable.

Date: 2026-06-27

## Goal

Use the waiting period before Vercel deployment access returns to make the repo, product, copy, tests, and launch preparation as strong as possible.

The goal is that when deployment access returns, the only remaining work should be:

1. configure environment variables;
2. run typecheck, tests, and build;
3. deploy;
4. test Stripe;
5. test diagnostic access;
6. run mobile QA;
7. start controlled sales.

## What can be done without Vercel

### 1. Test hardening

Priority: immediate.

Tasks:

- expand CSV analyzer tests;
- cover empty CSV;
- cover header-only CSV;
- cover malformed CSV;
- cover non-Shopify CSV;
- cover clean Shopify CSV;
- cover issue-heavy Shopify CSV;
- confirm no annotated CSV is promised for invalid input;
- confirm pasted warning context is preserved even when upload fails.

Status: started.

### 2. Manual QA files

Create or verify local test input files:

- clean Shopify CSV;
- issue-heavy Shopify CSV;
- empty CSV;
- header-only CSV;
- malformed CSV;
- non-Shopify CSV;
- warning text examples for GTIN, brand, MPN, identifier_exists, price, availability, image.

Expected result:

The owner can run the same tests repeatedly after deployment access returns.

### 3. Content and conversion polish

Already improved:

- homepage;
- Fix Pack page;
- sample report page.

Still worth reviewing manually later:

- hero above the fold on mobile;
- CTA visibility;
- readability of technical terms;
- consistency between homepage, pricing, Fix Pack, sample report, supported errors, and legal pages.

### 4. Launch QA checklist

Prepare a final checklist with pass/fail rows for:

- homepage;
- paste-warning form;
- Fix Pack checkout button;
- Stripe checkout;
- success page;
- diagnostic locked state;
- diagnostic test-token state;
- CSV upload;
- report rendering;
- annotated CSV download;
- legal/footer links;
- mobile Android.

### 5. Environment variable checklist

Prepare exact Vercel values to set later without committing secrets:

- `STRIPE_SECRET_KEY`;
- `NEXT_PUBLIC_APP_URL` or `APP_URL`;
- `DIAGNOSTIC_TEST_TOKEN`.

The token must be generated privately and never committed to GitHub.

### 6. Stripe test checklist

Prepare test cases for:

- checkout creates 29 EUR Fix Pack session;
- unknown plan is rejected;
- success URL includes `session_id`;
- diagnostic rejects missing session;
- diagnostic rejects fake session;
- diagnostic accepts paid test session;
- diagnostic accepts private test token only when configured.

### 7. First-sales operating procedure

Prepare the exact controlled-sales process:

1. identify prospect;
2. collect real warning;
3. ask whether they have a Shopify product CSV;
4. send paste-warning link;
5. sell Fix Pack only if row-level diagnosis is relevant;
6. inspect manual_review and blocked rows during early sales;
7. record result in prospect tracker;
8. collect feedback;
9. decide whether to improve product or repeat outreach.

### 8. Autonomy architecture preparation

Do not build full accounts yet.

Prepare next architecture documents for:

- Stripe webhook;
- order records;
- report records;
- magic report links;
- email after payment;
- email after report generation;
- report storage;
- future PDF and ZIP delivery.

Recommended first autonomy build after first sales:

1. Stripe webhook;
2. order record;
3. report record;
4. magic report link;
5. customer email notifications.

## What should not be done before deployment is validated

Do not add:

- Shopify app;
- Google Merchant Center API;
- full customer accounts;
- subscriptions;
- agency dashboard;
- PDF/ZIP delivery;
- multilingual expansion;
- broad SEO generation;
- Pro Review checkout;
- automated product-data edits.

These can create complexity before the core controlled-sales funnel is proven.

## Current best next steps

1. Finish test hardening.
2. Create reusable CSV sample files.
3. Create final deployment QA checklist.
4. Create environment variable setup checklist.
5. Create controlled-sales procedure.
6. Then wait for Vercel access to run real deployment QA.

## Decision

Use the no-Vercel period for quality, not feature bloat.

The product should become clearer, safer, more testable, and easier to launch — without adding unnecessary platform complexity before first sales.
