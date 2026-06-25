# MerchantFix production readiness checklist

Date: 2026-06-25

Status: not launched publicly until all blocking checks are complete.

## 1. Customer-facing trust

- [ ] `contact@merchantfix.ai` exists and receives email.
- [ ] Footer, legal notice, privacy policy, terms, success page, and diagnostic page all use coherent MerchantFix contact wording.
- [ ] Legal operator remains clear: MerchantFix.ai is operated by TimeProofs, Entreprise individuelle, Jeason Alexandre Bacoul.
- [ ] No customer-facing copy says MerchantFix guarantees Google approval, Google Shopping visibility, ranking, traffic, recovery, or sales.
- [ ] No copy says MerchantFix invents GTIN, MPN, brand, price, or product facts.
- [ ] The downloadable output is described as an annotated CSV, not a full automatic fix.

## 2. Public site QA

- [ ] Homepage renders on desktop.
- [ ] Homepage renders on mobile.
- [ ] Paste-error form works client-side.
- [ ] `/supported-errors` renders.
- [ ] `/sample-report` renders and sounds like a real deliverable.
- [ ] `/fix-pack` renders with working checkout button.
- [ ] `/pricing` renders and does not confuse the customer before the first sales test.
- [ ] `/scan` accepts a public Shopify URL and handles failure states cleanly.
- [ ] All important CTAs lead to a useful next step.

## 3. Stripe and Vercel configuration

Required Vercel variables:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL` or `APP_URL`
- `DIAGNOSTIC_TEST_TOKEN`

Checks:

- [ ] `/api/checkout` creates a Stripe Checkout session in test mode.
- [ ] Stripe success URL returns to `/success?session_id=...`.
- [ ] Stripe cancel URL returns to `/cancel`.
- [ ] `/success` includes a working link to `/diagnostic?session_id=...`.
- [ ] `/diagnostic` verifies the paid session before showing CSV upload.
- [ ] `/api/analyze` rejects unpaid calls.

## 4. Diagnostic flow QA

- [ ] `/diagnostic` without `session_id` or `test_token` is locked.
- [ ] `/diagnostic?test_token=wrong` is locked.
- [ ] `/diagnostic?test_token=valid` opens only when `DIAGNOSTIC_TEST_TOKEN` is configured.
- [ ] Valid test token allows CSV upload.
- [ ] Valid paid session allows CSV upload.
- [ ] Empty CSV produces a clear error.
- [ ] Non-Shopify CSV produces a clear error.
- [ ] Valid Shopify CSV produces a diagnostic report.
- [ ] Report shows counts, categories, affected rows, recommended actions, and disclaimer.
- [ ] Annotated CSV download works when safe notes or deterministic changes are available.

## 5. MVP launch rule

MerchantFix can be sold only after this full path works on the intended production deployment:

`/fix-pack` -> Stripe Checkout -> `/success?session_id=...` -> `/diagnostic?session_id=...` -> Shopify CSV upload -> diagnostic report -> annotated CSV download.

## 6. First-sales validation target

- Target: 20 real Shopify merchants or agencies with a current Merchant Center warning.
- Validation threshold: 3 paid Fix Pack purchases or 5 serious manual-review calls.
- If merchants ask for hands-on help instead of self-service, keep Fix Pack at 29 € and add a separate manual review offer only after the first proof of demand.
