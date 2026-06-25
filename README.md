# MerchantFix.ai

MerchantFix.ai helps Shopify merchants turn Google Merchant Center product-data warnings into practical Shopify checks and CSV-level diagnosis.

The current product direction is simple:

> Paste a Google Merchant Center warning. Get the Shopify fields and CSV rows to check before resubmitting.

MerchantFix is not a feed management platform, not a Shopify app, not a Google Merchant Center connector, not an agency service, and not a guarantee of Google approval. It is a focused diagnostic layer for Shopify product data issues.

## Project status

Current stage: **V1/V2 paid MVP preparation**.

The repository is no longer only a documentation or placeholder project. It already includes:

- Next.js application structure.
- Public Shopify surface scan flow.
- Google Merchant Center error-first homepage direction.
- Shopify CSV diagnostic engine.
- Stripe Checkout for paid Fix Pack access.
- Post-payment diagnostic gate.
- Private diagnostic test token mode.
- SEO pages for exact Merchant Center errors and Shopify Google Shopping problems.
- Reference library and level 2 authority SEO pages.
- Diagnostic guardrail system with `safe_note`, `manual_review`, and `blocked` statuses.
- Guardrail columns in annotated CSV output.
- Glossary and commercial FAQ schema work.
- Vitest coverage for the core CSV analyzer.
- Production QA runbook and sample CSV test cases.

PR #33 moved the product toward an error-first conversion flow: paste a Merchant Center warning, identify the Shopify fields to check, then use the Fix Pack when row-level CSV diagnosis is needed.

The sales-readiness cleanup aligns the customer-facing copy, support email, sample report, and downloadable output wording before active sales.

The simplified launch offer keeps only one paid product during first-sales validation: Fix Pack at 29 €.

## Current user journey

1. A Shopify merchant sees a Google Merchant Center warning or product-data problem.
2. The merchant pastes the exact warning into MerchantFix.
3. MerchantFix maps supported warnings to likely Shopify fields and safe next actions.
4. The merchant can run a free public Shopify surface scan when public product data is accessible.
5. The merchant buys the Fix Pack when row-level CSV diagnosis is needed.
6. After Stripe checkout, the merchant opens the locked diagnostic area.
7. The merchant uploads a clean Shopify CSV export.
8. MerchantFix analyzes the CSV, flags affected rows, explains safe actions, and generates an annotated CSV with notes or deterministic changes only when safe.
9. Rows requiring real merchant, supplier, or manufacturer verification are marked for manual review.

## Current product scope

### Free layer

- Paste a Google Merchant Center warning.
- Detect supported error patterns.
- Show likely Shopify fields to check.
- Explain safe next actions.
- Run a public Shopify URL surface scan when product data is publicly available.

### Paid Fix Pack

- One-time Stripe Checkout payment.
- Protected `/diagnostic` access through verified Stripe session or private test token.
- Shopify CSV upload.
- CSV parsing and Shopify column normalization.
- Row-level issue detection.
- Critical, warning, and info severity levels.
- Guardrail status: `safe_note`, `manual_review`, or `blocked`.
- Manual review reasons and evidence needed.
- Annotated CSV generation only when safe notes or deterministic changes are available.

## Supported issue families

The current diagnostic scope focuses on Shopify product-data issues that commonly appear around Google Merchant Center and Google Shopping:

- Missing GTIN.
- Invalid GTIN.
- Duplicate GTIN.
- Missing MPN.
- SKU used as MPN warning.
- Missing brand or vendor.
- Missing `identifier_exists`.
- `identifier_exists` conflict.
- Possible custom, handmade, personalized, or made-to-order products.
- Missing product image.
- Missing product price.
- Price mismatch support at CSV/checklist level.
- Availability mismatch support at CSV/checklist level.
- Image issue support at CSV/checklist level.
- Misrepresentation support is limited and must not be positioned as automatic account recovery.

## Product safety rules

MerchantFix must follow strict product-data safety rules:

1. Never invent GTIN values.
2. Never invent MPN values.
3. Never invent brand values.
4. Never copy SKU into MPN unless the merchant confirms it is truly the manufacturer part number.
5. Never guarantee Google approval, ranking, traffic, account recovery, or sales.
6. Always separate deterministic fixes from manual review.
7. Preserve original client CSV data unless a safe deterministic change is explicitly applied.
8. Explain notes and actions through `merchantfix_notes` and `merchantfix_action`.
9. Explain guardrails through `merchantfix_status`, `merchantfix_manual_review_reason`, and `merchantfix_evidence_needed`.
10. Keep the public Shopify surface scan separate from deep CSV diagnosis.
11. Do not present public URL scanning as a full Merchant Center diagnosis.

Mandatory product disclaimer:

> MerchantFix.ai helps diagnose Shopify product data issues. Some rows may require manual review. Google approval is not guaranteed.

## Guardrail operating model

MerchantFix is designed so the owner does not need to judge every CSV row from scratch.

The diagnostic output classifies rows as:

- `safe_note` — informational note only;
- `manual_review` — source evidence is needed before editing Shopify;
- `blocked` — automated correction should not be delivered.

The annotated CSV includes:

- `merchantfix_status`
- `merchantfix_manual_review_reason`
- `merchantfix_evidence_needed`

During early sales, Jeason only needs to inspect rows marked `manual_review` or `blocked` and confirm that the reason and evidence needed are clear. The full operating model is documented in `docs/guardrails-system.md`.

## What MerchantFix is not

MerchantFix is not:

- a full feed management platform;
- a Google Merchant Center account recovery service;
- a Shopify app in the current version;
- a Google API integration in the current version;
- an AI-based automatic fixer;
- a guarantee of approval or performance;
- a replacement for merchant, supplier, or manufacturer verification.

## Technical stack

Current stack:

- Next.js 14.
- TypeScript.
- Tailwind CSS.
- PapaParse.
- Stripe Checkout through server route.
- Vitest for core analyzer tests.

Current scripts:

```bash
npm run dev
npm run build
npm run typecheck
npm run test
```

## Important environment variables

The paid diagnostic flow depends on environment configuration:

- `STRIPE_SECRET_KEY` — required for checkout creation and paid diagnostic verification.
- `NEXT_PUBLIC_APP_URL` or `APP_URL` — recommended for stable Stripe success/cancel URLs.
- `DIAGNOSTIC_TEST_TOKEN` — optional private token for unpaid diagnostic API tests before production activation.

The app must stay usable without leaking private keys client-side.

## Key routes

- `/` — homepage and error-first entry point.
- `/scan` — public Shopify surface scan.
- `/fix-pack` — paid Fix Pack offer.
- `/pricing` — pricing page.
- `/success` — Stripe checkout success route.
- `/cancel` — Stripe checkout cancellation route.
- `/diagnostic` — locked CSV diagnostic upload area.
- `/sample-report` — sample output page.
- `/supported-errors` — supported Merchant Center warning map.
- `/how-it-works` — process explanation.
- `/fix/...` — SEO guides for exact Google Merchant Center and Shopify Google Shopping issues.
- `/reference` — authority reference library.
- `/reference/level-2` — advanced authority reference layer.

## Key APIs

- `POST /api/surface-scan` — public Shopify product-data surface scan.
- `POST /api/checkout` — Stripe Checkout session creation.
- `POST /api/analyze` — protected Shopify CSV diagnostic.

## QA documents and test cases

- `docs/qa-production-runbook.md` — full production QA procedure.
- `docs/production-readiness.md` — launch readiness checklist.
- `docs/guardrails-system.md` — guardrail operating model.
- `docs/test-cases/merchant-center-errors.md` — paste-error warning cases.
- `docs/test-cases/shopify-sample-clean.csv` — clean CSV sample.
- `docs/test-cases/shopify-sample-issues.csv` — issue-heavy CSV sample.

## Validation checklist before public push

Before moving the product toward active sales, verify:

- Vercel build passes.
- Homepage renders on desktop and mobile.
- Paste-error form works client-side.
- `/supported-errors` renders and maps warnings correctly.
- `/fix-pack` renders with checkout buttons.
- `/pricing` highlights Fix Pack clearly and shows no Pro Review checkout.
- `/api/checkout` creates a Stripe session in EUR for `fix-pack`.
- `/api/checkout` rejects `pro-review`.
- `/success` passes `session_id` to `/diagnostic`.
- `/diagnostic` blocks unpaid access.
- `/diagnostic?test_token=...` works only with the configured private test token.
- `/api/analyze` rejects unpaid calls.
- `/api/analyze` accepts valid paid/test calls.
- Shopify CSV diagnosis flags affected rows correctly using the QA samples.
- Annotated CSV includes guardrail columns.
- Annotated CSV is generated only when safe notes or deterministic changes are available.
- No text says Google approval is guaranteed.
- No text says MerchantFix invents or repairs GTIN/MPN/brand automatically.
- No TimeProofs support email or unrelated project reference remains in customer-facing pages.

## Roadmap

### V1 — Diagnostic MVP

Goal: make the diagnostic useful and safe.

Includes:

- paste-error entry point;
- supported warning map;
- public surface scan;
- CSV analyzer;
- affected row table;
- guardrail status;
- manual review flags;
- evidence-needed checklist;
- safe correction notes;
- tests.

### V2 — Paid Fix Pack

Goal: sell a one-time self-service product.

Includes:

- Stripe Checkout;
- protected diagnostic page;
- paid CSV upload;
- downloadable annotated CSV output when safe;
- sample report;
- guardrail-driven manual review output;
- pricing and legal pages aligned with paid digital service rules.

### V3 — More Merchant Center errors

Goal: expand carefully beyond identifiers.

Potential families:

- price mismatch;
- availability mismatch;
- image issues;
- shipping and tax checklist;
- Google product category guidance;
- limited performance support;
- misrepresentation checklist only.

Misrepresentation must never be presented as an automatic fix.

### V4 — Agency product

Goal: create recurring revenue for agencies and freelancers.

Possible later features:

- accounts;
- history;
- branded reports;
- monthly packs;
- subscriptions;
- database;
- authentication.

### V5 — Platform and monitoring

Goal: product-data quality monitoring across shopping channels.

Possible later features only after validation:

- Shopify API;
- Google Merchant Center API;
- monitoring alerts;
- Shopify app;
- WooCommerce support;
- XML feed parsing;
- multi-channel product data checks.

## Immediate next step

Complete preview QA and the paid diagnostic test path before public sales:

1. one real Shopify public URL;
2. one sample Shopify CSV;
3. one private diagnostic token;
4. one real Stripe test checkout;
5. one full post-payment CSV upload;
6. one annotated CSV download;
7. one guardrail check confirming manual-review rows explain evidence needed.
