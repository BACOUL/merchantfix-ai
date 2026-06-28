# MerchantFix.ai — Vercel Environment Setup Checklist

Status: ready to use when Vercel deployment access returns.

Date: 2026-06-28

## Purpose

This checklist prepares the exact environment variables needed for the MerchantFix.ai paid diagnostic funnel.

Do not write real secrets in this file.
Do not commit `.env` files containing real secrets.
Do not paste real Stripe keys or private diagnostic tokens into GitHub issues, commits, screenshots, or public chats.

## Required production variables

| Variable | Required | Where | Purpose |
| --- | --- | --- | --- |
| `STRIPE_SECRET_KEY` | Yes | Vercel server environment | Creates Stripe Checkout sessions and verifies paid sessions. |
| `NEXT_PUBLIC_APP_URL` | Recommended | Vercel environment | Stable app URL used by checkout/success/cancel flows. |
| `APP_URL` | Recommended fallback | Vercel server environment | Server-side fallback for checkout URL generation. |
| `DIAGNOSTIC_TEST_TOKEN` | Yes for owner QA | Vercel server environment | Unlocks private unpaid diagnostic testing for the owner only. |

## Recommended production values

Use real values only inside Vercel.

```text
STRIPE_SECRET_KEY=<paste Stripe live secret key in Vercel only>
NEXT_PUBLIC_APP_URL=https://www.merchantfix.ai
APP_URL=https://www.merchantfix.ai
DIAGNOSTIC_TEST_TOKEN=<generate a long random private token>
```

If the production domain is different, use the real production domain consistently.

## Stripe key rules

### Test mode

Use Stripe test keys for deployment QA before accepting live payments.

Expected prefix examples:

```text
sk_test_...
```

### Live mode

Use live keys only when the funnel has passed QA.

Expected prefix examples:

```text
sk_live_...
```

Do not expose the secret key client-side.
Do not use `NEXT_PUBLIC_` for Stripe secret keys.

## Diagnostic test token rules

The diagnostic token must be:

- long;
- random;
- private;
- server-side only;
- different from any password used elsewhere;
- not shared with customers;
- rotated if accidentally exposed.

Suggested local generation command:

```bash
openssl rand -hex 32
```

Alternative Node.js command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Store the result only in Vercel environment variables or a private password manager.

## Vercel setup steps

1. Open Vercel project settings.
2. Go to Environment Variables.
3. Add `STRIPE_SECRET_KEY`.
4. Add `NEXT_PUBLIC_APP_URL`.
5. Add `APP_URL`.
6. Add `DIAGNOSTIC_TEST_TOKEN`.
7. Scope variables to Production, Preview, and Development only if appropriate.
8. Save variables.
9. Redeploy the latest commit.
10. Run the final launch QA checklist.

## Production vs preview domain

Make sure the URL variables match the environment being tested.

For production:

```text
NEXT_PUBLIC_APP_URL=https://www.merchantfix.ai
APP_URL=https://www.merchantfix.ai
```

For preview QA:

```text
NEXT_PUBLIC_APP_URL=<current Vercel preview URL>
APP_URL=<current Vercel preview URL>
```

Do not leave preview URLs in production environment variables.

## Checkout verification after env setup

After deploy, test:

| Check | Expected result | Status |
| --- | --- | --- |
| `/fix-pack` checkout button | Opens Stripe Checkout | NOT TESTED |
| Price | 29 EUR | NOT TESTED |
| Success URL | Returns to `/success?session_id=...` | NOT TESTED |
| Cancel URL | Returns to `/cancel` | NOT TESTED |
| Unknown plan API call | Rejected | NOT TESTED |
| Missing/invalid Stripe key | Safe setup error, no secret leakage | NOT TESTED |

## Diagnostic verification after env setup

Test:

| Check | Expected result | Status |
| --- | --- | --- |
| `/diagnostic` without session/token | Locked | NOT TESTED |
| `/api/analyze` without session/token | Rejected | NOT TESTED |
| `/diagnostic?test_token=wrong` | Rejected | NOT TESTED |
| `/diagnostic?test_token=<valid>` | Owner QA works | NOT TESTED |
| Fake Stripe session | Rejected | NOT TESTED |
| Paid test session | Allows analysis | NOT TESTED |

## Safe failure messages

If environment variables are missing, the app may show setup errors. That is acceptable for owner QA, but public production should not launch with missing variables.

Safe errors may say:

- checkout is not configured yet;
- Stripe verification is not configured yet;
- diagnostic test mode is not configured yet.

Unsafe errors must not reveal:

- secret keys;
- full tokens;
- private environment values;
- Stripe raw secret response data;
- stack traces to customers.

## Pre-live decision

Do not switch to Stripe live mode until:

- `npm run typecheck` passes;
- `npm run test` passes;
- `npm run build` passes;
- preview checkout works in Stripe test mode;
- diagnostic access gate works;
- CSV upload/report/annotated CSV flow works;
- mobile Android QA is acceptable;
- final launch QA checklist has no unresolved P0 failure.

## Live-mode checklist

Before live sales:

| Check | Expected result | Status |
| --- | --- | --- |
| Live Stripe key set | `STRIPE_SECRET_KEY` uses live key in production only | NOT TESTED |
| Test key removed from production | No `sk_test_` key in production | NOT TESTED |
| Production domain set | URL env vars use final domain | NOT TESTED |
| Test token private | Token not shared publicly | NOT TESTED |
| Checkout live mode | Payment page shows live mode and correct product | NOT TESTED |
| Success route | Keeps `session_id` and opens diagnostic link | NOT TESTED |
| Paid session verification | Only paid/complete sessions unlock analysis | NOT TESTED |

## Emergency rollback

If live checkout or diagnostic access fails:

1. Pause sales messages.
2. Switch checkout button copy or hide paid CTA if necessary.
3. Keep support email visible.
4. Revert to Stripe test mode if payments are not reliable.
5. Document the failure in `docs/final-launch-qa-checklist.md`.
6. Do not continue selling until the failure is fixed.

## Decision

Environment setup is ready to execute, but not complete until variables are configured inside Vercel and the final launch QA checklist is run.
