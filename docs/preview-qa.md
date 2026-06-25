# MerchantFix preview QA

Date: 2026-06-25

Status: preview QA, not production launch.

## Current rule

Do not communicate the public product as launched until the preview has been manually checked and the paid diagnostic flow has been tested end to end.

## Sales readiness cleanup included in this PR

- Customer-facing copy no longer sounds like an internal product specification.
- Sample report explains what the customer receives after a Fix Pack diagnosis.
- Support/legal contact email is aligned on `contact@merchantfix.ai`.
- The downloadable output is described as an annotated CSV, not a magic automatic correction.
- MerchantFix still states that it does not invent GTIN, MPN, brand, price, or product facts.
- Google approval, ranking, traffic, account recovery, and sales remain explicitly not guaranteed.

## Required preview checks

- Homepage renders on desktop and mobile.
- Paste-error form updates diagnosis client-side.
- `/fix-pack` renders and checkout buttons call `/api/checkout`.
- `/pricing` renders with Fix Pack as the main paid offer.
- `/supported-errors` renders supported Merchant Center warnings.
- `/sample-report` renders row-level output table and customer-facing wording.
- `/scan` calls `/api/surface-scan`.
- `/diagnostic` blocks unpaid access.
- `/diagnostic?test_token=...` works only with the configured private token.
- Stripe test checkout returns to `/success?session_id=...`.
- `/success` links to `/diagnostic?session_id=...`.
- `/api/analyze` rejects unpaid calls.
- `/api/analyze` accepts a valid paid session or private test token.
- A sample Shopify CSV generates a diagnostic report.
- The annotated CSV download works when safe notes or deterministic changes are available.
- No unrelated project reference remains in customer-facing pages.

## Production readiness blockers

- Confirm `contact@merchantfix.ai` exists before relying on it for customer support.
- Confirm Stripe test mode and production mode URLs before real sales.
- Configure `STRIPE_SECRET_KEY` in Vercel.
- Configure `NEXT_PUBLIC_APP_URL` or `APP_URL` with the final public MerchantFix URL.
- Configure `DIAGNOSTIC_TEST_TOKEN` for private QA before public sales.
- Confirm the preview build matches the branch intended for production.
- Run one full checkout-to-diagnostic test before accepting real customers.
