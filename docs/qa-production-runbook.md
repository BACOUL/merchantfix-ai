# MerchantFix production QA runbook

Date: 2026-06-25

Status: required before public sales.

## Merge order

This QA pack is stacked on top of the launch cleanup branches.

1. `sales-readiness-cleanup`
2. `simplify-launch-offer`
3. `qa-production-pack`

## Required environment variables

Configure these on the intended Vercel deployment before testing:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL` or `APP_URL`
- `DIAGNOSTIC_TEST_TOKEN`

Use Stripe test mode first. Do not switch to real sales until the full diagnostic path works.

## 1. Static route QA

Open these routes in the preview or production target:

- `/`
- `/pricing`
- `/fix-pack`
- `/sample-report`
- `/supported-errors`
- `/scan`
- `/how-to-export-shopify-csv`
- `/terms`
- `/privacy`
- `/legal-notice`
- `/diagnostic`

Expected:

- All public routes render without application errors.
- `/pricing` shows Free Scan and Fix Pack only.
- No Pro Review checkout CTA appears.
- The customer-facing support email is `contact@merchantfix.ai`.
- The copy does not promise Google approval, ranking, traffic, account recovery, or sales.

## 2. Homepage paste-error QA

Use `docs/test-cases/merchant-center-errors.md`.

For each pasted error, verify:

- The UI gives a useful supported-warning explanation.
- The UI points to likely Shopify fields.
- The UI warns against fake identifiers when relevant.
- The UI routes to Fix Pack only when row-level CSV diagnosis is needed.
- Misrepresentation remains cautious and checklist-level only.

## 3. Free scan QA

Test `/scan` with:

- one public Shopify store URL that exposes `/products.json`;
- one invalid URL;
- one non-Shopify URL;
- one Shopify store that blocks or does not expose public product JSON.

Expected:

- Valid public data produces a scan result.
- Invalid or unavailable public data fails gracefully.
- The UI recommends CSV diagnosis when public product data is unavailable or incomplete.

## 4. Checkout QA

### Fix Pack checkout

Send checkout from `/fix-pack` and `/pricing`.

Expected:

- `/api/checkout` receives `{ "plan": "fix-pack" }`.
- Stripe Checkout opens in test mode.
- Price is 29 €.
- Success returns to `/success?session_id=...`.
- Cancel returns to `/cancel`.

### Rejected plan check

Manually test that `/api/checkout` rejects:

```json
{ "plan": "pro-review" }
```

Expected:

- HTTP 400.
- Error message states that Fix Pack is the only active launch offer.

## 5. Diagnostic gate QA

Open:

- `/diagnostic`
- `/diagnostic?test_token=wrong`
- `/diagnostic?test_token=<valid configured token>`
- `/diagnostic?session_id=<valid Stripe test session>`

Expected:

- No token/session: locked.
- Wrong token: locked.
- Valid private token: upload form visible.
- Valid paid session: upload form visible.

## 6. CSV analyzer QA

Use these files:

- `docs/test-cases/shopify-sample-clean.csv`
- `docs/test-cases/shopify-sample-issues.csv`

Expected for clean sample:

- Upload succeeds.
- No critical issues.
- No false unsafe correction.
- Disclaimer remains visible.

Expected for issue-heavy sample:

- Missing GTIN is detected.
- identifier_exists conflict is detected.
- Missing MPN is detected when no GTIN exists.
- Missing brand/vendor is detected where applicable.
- Invalid GTIN format is detected.
- Duplicate GTIN rows are detected.
- Missing image is detected.
- Missing price is detected.
- Manual review rows are clearly separated.
- Annotated CSV download is available when safe notes or deterministic changes are generated.

## 7. Annotated CSV download QA

After uploading `shopify-sample-issues.csv`, download the CSV.

Expected:

- File name starts with `merchantfix-annotated-`.
- Original rows are preserved.
- `merchantfix_notes` exists.
- `merchantfix_action` exists.
- GTIN, MPN, brand, price, and product facts are not invented.
- Rows requiring human verification are marked as manual review.

## 8. Launch decision

Do not sell publicly until all checks above pass on the intended production deployment.

Launch is allowed only after this path works:

`/fix-pack` -> Stripe Checkout -> `/success?session_id=...` -> `/diagnostic?session_id=...` -> CSV upload -> diagnostic report -> annotated CSV download.
