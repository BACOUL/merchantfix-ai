# MerchantFix.ai — Post-Vercel Launch Runbook

Status: ready to execute when Vercel deployment access returns.

Date: 2026-06-28

## Purpose

This runbook defines the exact launch-day sequence for MerchantFix.ai after Vercel access returns.

It does not declare the product ready.

It defines how to move from prepared repo to controlled-sales readiness safely.

## Launch principle

Do not sell until the core funnel is proven end to end:

```text
public page -> paste warning -> Fix Pack checkout -> Stripe success -> diagnostic access -> CSV upload -> report -> annotated CSV when safe -> mobile usable
```

A single unresolved P0 failure blocks controlled sales.

## Required documents before starting

Review these first:

- `docs/final-launch-qa-checklist.md`;
- `docs/vercel-env-setup-checklist.md`;
- `docs/qa/warning-examples.md`;
- `docs/qa/csv-samples/README.md`;
- `docs/controlled-first-sales-procedure.md`;
- `docs/autonomous-delivery-architecture.md`.

## Required access

You need access to:

- GitHub repo;
- local computer or clean build environment;
- Vercel project;
- Stripe account;
- production domain/DNS;
- email inbox for support;
- Android device for mobile QA.

## Phase 1 — Pull latest repo

Run locally:

```bash
git checkout main
git pull origin main
```

Confirm recent docs and changes exist:

```text
docs/final-launch-qa-checklist.md
docs/vercel-env-setup-checklist.md
docs/controlled-first-sales-procedure.md
docs/autonomous-delivery-architecture.md
docs/post-vercel-launch-runbook.md
```

## Phase 2 — Local install and static checks

Run:

```bash
npm install
npm run typecheck
npm run test
npm run build
```

Expected result:

- install succeeds;
- typecheck passes;
- tests pass;
- production build succeeds.

If any command fails:

1. stop launch;
2. document the failure in `docs/final-launch-qa-checklist.md`;
3. fix the issue;
4. rerun all commands.

Do not continue to Vercel deployment while local build is failing.

## Phase 3 — Vercel environment variables

Use `docs/vercel-env-setup-checklist.md`.

Set only inside Vercel:

```text
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_URL
APP_URL
DIAGNOSTIC_TEST_TOKEN
```

If webhook is not built yet, do not set `STRIPE_WEBHOOK_SECRET` unless a webhook route exists.

Rules:

- never commit `.env` with real secrets;
- never paste real keys in GitHub;
- use Stripe test key first;
- use live Stripe key only after QA passes;
- generate diagnostic token privately.

## Phase 4 — Deploy preview first

Deploy the latest main branch to Vercel preview.

Expected:

- deployment succeeds;
- no build failure;
- no missing dependency error;
- no TypeScript error;
- no Next.js runtime error on first page load.

If preview fails:

- do not deploy production;
- fix build issue;
- redeploy preview.

## Phase 5 — Preview public-page QA

Open these routes in preview:

```text
/
/fix-pack
/pricing
/sample-report
/supported-errors
/how-it-works
/scan
/privacy
/terms
/legal-notice
/refund-policy
/data-handling
/contact
```

For each page, check:

- page loads;
- no visible error;
- no broken layout;
- no wrong price;
- no unsafe guarantee;
- footer links work;
- support email is consistent.

Record results in `docs/final-launch-qa-checklist.md`.

## Phase 6 — Paste-warning QA

Use `docs/qa/warning-examples.md`.

Test at least:

- product identifier warning;
- brand/vendor warning;
- product image warning;
- price warning;
- availability warning;
- account-level or limited-fit warning.

Expected:

- strong-fit warnings lead toward CSV diagnosis;
- partial-fit warnings explain limits;
- account-level warnings are cautious;
- no Google outcome is guaranteed;
- no product facts are invented.

## Phase 7 — Stripe checkout QA in test mode

Use Stripe test key first.

Test `/fix-pack` checkout button.

Expected:

- Stripe Checkout opens;
- price is 29 EUR;
- payment mode is correct;
- cancel returns to `/cancel`;
- success returns to `/success?session_id=...`;
- unknown plan is rejected.

If checkout fails:

- do not sell;
- check `STRIPE_SECRET_KEY`;
- check URL env vars;
- check `/api/checkout` logs;
- document failure.

## Phase 8 — Diagnostic access gate QA

Test these cases:

| Case | Expected result |
| --- | --- |
| `/diagnostic` without session or token | Locked |
| `/api/analyze` without session or token | Rejected |
| `/diagnostic?test_token=wrong` | Rejected |
| `/diagnostic?test_token=<valid>` | Owner QA allowed |
| Fake Stripe session ID | Rejected |
| Paid Stripe test session | Diagnostic allowed |

Hard blocker:

```text
diagnostic must not be usable without payment, valid paid session, or private owner token
```

## Phase 9 — CSV upload QA

Use local-only CSV test files from `docs/qa/csv-samples/README.md`.

Test:

- empty CSV;
- header-only Shopify CSV;
- malformed CSV;
- non-Shopify CSV;
- clean Shopify CSV;
- issue-heavy Shopify CSV;
- real customer CSV only with permission.

Expected:

- invalid files show recovery messages;
- invalid files do not promise annotated CSV;
- Shopify CSV files produce report output;
- report uses row-level findings;
- no missing product facts are invented;
- annotated CSV appears only when safe output exists.

## Phase 10 — Report QA

Check report output for:

- decision summary;
- top priority actions;
- unsafe shortcuts to avoid;
- evidence checklist;
- next safe step;
- internal score not presented as Google score;
- row findings sorted by risk;
- limitations visible;
- no approval guarantee;
- no invented product facts.

If report is unclear:

- mark Yellow if sales can still be manually supported;
- mark Red if customer cannot understand what to do.

## Phase 11 — Annotated CSV QA

For a valid issue-heavy CSV, verify:

- download button appears only when output is available;
- original CSV data is preserved;
- MerchantFix columns are added;
- manual review reason is clear;
- evidence needed is clear;
- no destructive edits are made;
- no product facts are invented.

For invalid files:

- no annotated CSV should be promised;
- customer sees recovery guidance.

## Phase 12 — Mobile Android QA

On Android Chrome, test:

```text
/
/fix-pack
/sample-report
/success
/diagnostic
/report output if available
legal pages
```

Check:

- CTA visible;
- forms usable;
- file upload usable;
- tables scroll intentionally;
- no accidental full-page horizontal overflow;
- report cards readable;
- checkout flow usable.

If mobile blocks payment or upload, launch is Red.

## Phase 13 — Unsafe claims sweep

Search visible pages for unsafe claims.

Block launch if any page says or implies:

- Google approval guaranteed;
- account recovery guaranteed;
- traffic/ranking/sales guaranteed;
- official Google support;
- invented product facts;
- automatic product-data edits without review;
- full feed app replacement without limits.

## Phase 14 — Production deployment

Only after preview QA is acceptable:

1. confirm production env vars;
2. deploy production;
3. verify production domain;
4. repeat critical smoke tests:
   - `/`;
   - `/fix-pack`;
   - checkout test/live depending mode;
   - `/success`;
   - `/diagnostic` locked;
   - valid test token if enabled;
   - one CSV upload test;
   - one mobile check.

Do not switch Stripe live until production smoke test is clean.

## Phase 15 — Switch Stripe live mode

Switch to live only after:

- typecheck passed;
- tests passed;
- build passed;
- preview QA passed;
- production smoke test passed;
- checkout works in test mode;
- diagnostic gate works;
- CSV/report flow works;
- mobile Android is usable;
- final QA checklist has no unresolved P0 failure.

Then:

- replace test key with live `STRIPE_SECRET_KEY` in production only;
- confirm no `sk_test_` remains in production;
- run one low-risk live checkout verification if appropriate;
- confirm price remains 29 EUR;
- confirm success route keeps `session_id`.

## Phase 16 — Green / Yellow / Red decision

### Green

Start controlled sales if:

- checkout works;
- paid diagnostic access works;
- CSV upload works;
- report renders clearly;
- mobile is usable;
- no unsafe claim is present.

### Yellow

Start only very cautious sales if:

- minor visual issues remain;
- owner can manually support first customers;
- no payment/diagnostic/upload/report blocker exists;
- risk is documented.

### Red

Do not sell if:

- build fails;
- checkout fails;
- diagnostic is publicly accessible;
- paid customers cannot upload CSV;
- report does not render;
- mobile blocks payment or upload;
- unsafe guarantee is visible.

## Phase 17 — First controlled sale

Use `docs/controlled-first-sales-procedure.md`.

Before sending link, confirm:

- Shopify store;
- product-data warning;
- Shopify product CSV available;
- row-level diagnosis needed;
- no expectation of guaranteed Google result.

After the sale, record:

- warning family;
- upload success;
- report usefulness;
- needs-proof count;
- do-not-change-yet count;
- objection;
- issue after purchase;
- refund request if any;
- next improvement.

## Emergency stop

Stop outreach immediately if:

- a paid customer cannot access diagnostic;
- Stripe payment works but success route fails;
- upload fails repeatedly;
- report is unusable;
- customer misunderstands the offer as guaranteed outcome;
- support load is too high.

Then:

1. pause sales;
2. document issue;
3. fix issue;
4. rerun final launch QA checklist;
5. restart controlled sales only after passing.

## Final launch-day command summary

```bash
git checkout main
git pull origin main
npm install
npm run typecheck
npm run test
npm run build
```

Then:

```text
configure Vercel env vars
preview deploy
preview QA
Stripe test checkout
診ostic gate QA
CSV QA
report QA
mobile QA
production deploy
production smoke test
switch Stripe live only if clean
first controlled sale
```

## Final decision

Until every required phase is completed, the product remains:

```text
PREPARED, NOT YET LIVE-SALES READY
```
