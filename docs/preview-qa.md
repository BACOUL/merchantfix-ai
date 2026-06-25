# MerchantFix preview QA

Date: 2026-06-25

Status: preview QA, not production launch.

## Current rule

Do not communicate the public product as launched until the preview has been manually checked.

## Required preview checks

- Homepage renders on desktop and mobile.
- Paste-error form updates diagnosis client-side.
- `/fix-pack` renders and checkout buttons call `/api/checkout`.
- `/pricing` renders with Fix Pack as the main paid offer.
- `/supported-errors` renders supported Merchant Center warnings.
- `/sample-report` renders row-level output table.
- `/scan` calls `/api/surface-scan`.
- `/diagnostic` blocks unpaid access.
- `/diagnostic?test_token=...` works only with the configured private token.
- Stripe test checkout returns to `/success?session_id=...`.
- `/success` links to `/diagnostic?session_id=...`.
- No unrelated project reference remains in customer-facing pages.

## Production readiness blockers

- Confirm `contact@merchantfix.ai` exists before relying on it for customer support.
- Confirm Stripe test mode and production mode URLs before real sales.
- Confirm the preview build matches the branch intended for production.
