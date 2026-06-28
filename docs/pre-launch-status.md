# MerchantFix.ai — Pre-Launch Status

Status: prepared, not yet live-sales ready.

Date: 2026-06-28

## Executive summary

MerchantFix.ai is now a serious pre-launch MVP for controlled sales.

The product has:

- a clear offer;
- a clear target customer;
- a 29 EUR Fix Pack;
- a Stripe checkout route;
- a protected diagnostic gate;
- CSV analyzer logic;
- decision-oriented report output;
- public pages;
- legal and trust pages;
- launch QA documents;
- Vercel setup documents;
- first-sales procedure;
- autonomy architecture plan.

It is not yet live-sales ready because Vercel deployment, production build, Stripe QA, diagnostic QA, CSV QA, report QA, and mobile QA have not been completed.

## Current project stage

```text
Stage: pre-launch controlled-sales preparation
```

Meaning:

- product concept is clear;
- repo is structured;
- public copy is improved;
- paid funnel exists in code;
- diagnostic safety boundaries exist;
- tests have been strengthened;
- launch and sales procedures are documented;
- production deployment has not yet been validated.

## Current rating

### Controlled-sales MVP

```text
7.5 / 10 before runtime QA
```

Potential after Vercel, Stripe, diagnostic, CSV, and mobile QA pass:

```text
8 / 10 to 8.5 / 10
```

### Autonomous SaaS product

```text
5 / 10
```

Reason:

The product is not yet autonomous. It still lacks persistent orders, persistent reports, magic report links, transactional emails, storage, and webhook-driven delivery.

### Content and design

```text
8 / 10 source-level, pending browser and mobile QA
```

Reason:

Homepage, Fix Pack, and sample report pages were rewritten to focus on customer pain, row-level value, and plain-language decisions.

## What is ready

### Product positioning

Ready:

- Shopify merchant focus;
- Google Merchant Center product-data warning focus;
- row-level CSV diagnosis positioning;
- no fake identifiers;
- no Google approval guarantee;
- no account-recovery positioning;
- no full feed-app replacement promise.

### Commercial offer

Ready:

- Fix Pack 29 EUR one-time;
- current scope is clear;
- no subscription in launch offer;
- Pro Review not active;
- future PDF/ZIP not sold as current delivery.

### Public pages

Improved:

- homepage;
- Fix Pack page;
- sample report page;
- supported errors;
- legal/trust pages;
- contact/data/refund pages.

Needs browser QA:

- layout;
- mobile;
- links;
- CTA behavior;
- final typo sweep.

### Diagnostic logic

Ready at source level:

- CSV analyzer;
- upload recovery messages;
- invalid CSV states;
- non-Shopify CSV state;
- warning context preservation;
- report model;
- annotated CSV logic when safe;
- no invented product facts rule.

Needs runtime QA:

- real upload in browser;
- report rendering;
- download behavior;
- edge cases;
- mobile file picker.

### Tests

Improved:

- empty CSV test;
- header-only CSV test;
- malformed CSV test;
- non-Shopify CSV test;
- clean CSV test;
- issue-heavy identifier tests;
- warning context preserved when upload fails.

Needs execution:

```bash
npm run test
npm run typecheck
npm run build
```

### Documentation

Created or improved:

- `docs/no-vercel-perfecting-plan.md`;
- `docs/qa/warning-examples.md`;
- `docs/qa/csv-samples/README.md`;
- `docs/final-launch-qa-checklist.md`;
- `docs/vercel-env-setup-checklist.md`;
- `docs/controlled-first-sales-procedure.md`;
- `docs/autonomous-delivery-architecture.md`;
- `docs/post-vercel-launch-runbook.md`;
- `docs/content-design-upgrade-audit.md`;
- `docs/decision-oriented-report-audit.md`;
- `docs/legal-trust-pages-audit.md`;
- `docs/csv-error-recovery-audit.md`.

## What is blocked by Vercel or runtime access

Blocked until deployment access returns:

- production build validation on Vercel;
- preview deployment QA;
- environment variable setup;
- Stripe checkout test in deployed environment;
- success route test with real `session_id`;
- diagnostic gate test with deployed env vars;
- upload test in deployed browser;
- report rendering QA;
- annotated CSV download QA;
- mobile Android QA;
- production domain smoke test;
- live Stripe switch.

## What is not built yet

Not built yet:

- Stripe webhook;
- `orders` table;
- `reports` table;
- `report_events` table;
- magic report links;
- transactional emails;
- object storage;
- signed downloads;
- PDF export;
- ZIP delivery;
- customer accounts;
- agency dashboard;
- subscriptions;
- Shopify app;
- Google Merchant Center API integration.

These are not needed before the first controlled sales.

## Current blockers

### Blocker 1 — Vercel credits / deployment access

Current status:

```text
blocked externally
```

Impact:

- cannot complete production deployment QA;
- cannot validate checkout in deployed environment;
- cannot validate end-to-end customer flow.

### Blocker 2 — build/test not executed locally in this session

Current status:

```text
not executed
```

Impact:

- source looks prepared;
- runtime correctness still must be proven.

### Blocker 3 — Stripe not tested end to end

Current status:

```text
not tested
```

Impact:

- checkout route exists;
- paid session verification exists;
- but real checkout/success/diagnostic flow still needs proof.

### Blocker 4 — Mobile QA not done

Current status:

```text
not tested
```

Impact:

- public pages may look good in source;
- mobile payment/upload/report experience is not confirmed.

## Next exact steps when Vercel returns

Follow `docs/post-vercel-launch-runbook.md`.

Minimal order:

```bash
git checkout main
git pull origin main
npm install
npm run typecheck
npm run test
npm run build
```

Then:

1. configure Vercel env vars;
2. deploy preview;
3. run public-page QA;
4. run paste-warning QA;
5. run Stripe test checkout;
6. run diagnostic gate QA;
7. run CSV upload QA;
8. run report QA;
9. run annotated CSV QA;
10. run mobile Android QA;
11. deploy production;
12. smoke test production;
13. switch Stripe live only if clean;
14. start first controlled sale.

## What to do before Vercel returns

Useful work still possible without Vercel:

1. Review source for obvious import/build risks.
2. Prepare local-only CSV files described in `docs/qa/csv-samples/README.md`.
3. Prepare Stripe test account details.
4. Prepare private diagnostic token in a password manager.
5. Prepare prospect list of 20 to 50 agencies/freelancers/merchants.
6. Prepare outreach messages from `docs/controlled-first-sales-procedure.md`.
7. Avoid new feature bloat.

## Do not do now

Do not build yet:

- full customer accounts;
- PDF/ZIP;
- agency dashboard;
- Shopify app;
- Google Merchant Center API;
- broad SEO automation;
- subscriptions;
- automated product edits.

Reason:

The first priority is to prove that customers pay for the Fix Pack and understand the report.

## Launch decision

Current decision:

```text
Prepared, not yet live-sales ready.
```

Meaning:

- continue preparation;
- do not claim public launch readiness;
- do not sell broadly;
- run full QA as soon as deployment access returns;
- start only controlled sales after Green or acceptable Yellow status.

## Bottom line

MerchantFix.ai has moved from idea/MVP draft to a structured pre-launch product.

The next milestone is not more features.

The next milestone is proving the funnel:

```text
checkout -> diagnostic -> CSV -> report -> customer understands value
```

If that works with the first 3 to 10 controlled customers, the next build should be:

```text
Stripe webhook -> orders -> reports -> magic links -> emails
```
