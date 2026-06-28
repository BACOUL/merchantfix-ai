# MerchantFix.ai — Final Launch QA Checklist

Status: ready to use when Vercel deployment access returns.

Date: 2026-06-28

## Purpose

This checklist decides whether MerchantFix.ai is ready for controlled sales.

A controlled sale means:

- the customer understands the offer;
- checkout works;
- diagnostic access is protected;
- CSV upload works;
- the report renders clearly;
- annotated CSV download works only when safe;
- no unsafe Google, GTIN, MPN, brand, traffic, sales, or account recovery promise appears.

## How to use this checklist

Use one of these status values:

- `PASS` — works as expected;
- `FAIL` — blocks controlled sales;
- `RISK ACCEPTED` — known issue accepted temporarily;
- `NOT TESTED` — not checked yet.

A single unresolved `FAIL` in P0 sections blocks controlled sales.

---

# P0 — Pre-deployment repo checks

| Check | Expected result | Status | Notes |
| --- | --- | --- | --- |
| `npm install` | Dependencies install without critical error | NOT TESTED | Run locally or in deployment environment. |
| `npm run typecheck` | No TypeScript errors | NOT TESTED | Required after content/design edits. |
| `npm run test` | Vitest suite passes | NOT TESTED | CSV analyzer tests were expanded. |
| `npm run build` | Production build succeeds | NOT TESTED | Required before deployment. |
| No secrets committed | No Stripe key or diagnostic token in repo | NOT TESTED | Check `.env`, docs, code comments. |

---

# P0 — Environment variables

| Variable | Expected result | Status | Notes |
| --- | --- | --- | --- |
| `STRIPE_SECRET_KEY` | Set in Vercel, never committed | NOT TESTED | Required for checkout and paid session verification. |
| `NEXT_PUBLIC_APP_URL` or `APP_URL` | Set to production domain | NOT TESTED | Required for stable success/cancel URLs. |
| `DIAGNOSTIC_TEST_TOKEN` | Long private token set server-side only | NOT TESTED | Owner QA only. Never share publicly. |

---

# P0 — Public pages

| Route | Expected result | Status | Notes |
| --- | --- | --- | --- |
| `/` | Homepage loads, hero is clear, paste-warning CTA visible | NOT TESTED | Check desktop and mobile. |
| `/fix-pack` | 29 EUR Fix Pack offer clear, checkout CTA visible | NOT TESTED | No subscription or Pro Review shown as active. |
| `/pricing` | Price matches active 29 EUR launch offer | NOT TESTED | No mismatch with checkout. |
| `/sample-report` | Sample report looks credible and fictional-data disclosure visible | NOT TESTED | Check table overflow on mobile. |
| `/supported-errors` | Supported, partial, and limited errors are clear | NOT TESTED | No account recovery promise. |
| `/how-it-works` | Flow is understandable before purchase | NOT TESTED | Should support sales clarity. |
| `/scan` | Public scan page loads and does not claim full Merchant Center diagnosis | NOT TESTED | Surface scan only. |

---

# P0 — Legal and trust pages

| Route | Expected result | Status | Notes |
| --- | --- | --- | --- |
| `/legal-notice` | Operator/legal information visible | NOT TESTED | Final operator review required. |
| `/privacy` | CSV/data handling expectations clear | NOT TESTED | Must mention uploaded CSV handling. |
| `/terms` | Terms visible and safe | NOT TESTED | No unsafe guarantee. |
| `/refund-policy` | Digital diagnostic refund limits clear | NOT TESTED | No approval-based refund promise. |
| `/data-handling` | Explains CSV upload, no invented facts, no current accounts | NOT TESTED | Important before CSV upload. |
| `/contact` | Support email visible and consistent | NOT TESTED | Must use `contact@merchantfix.ai`. |
| Footer links | All legal/support links work | NOT TESTED | Test every footer link. |

---

# P0 — Paste-warning form

Use examples from `docs/qa/warning-examples.md`.

| Warning example | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Missing value `[gtin]` | Maps to identifier fields and warns not to invent identifiers | NOT TESTED | Strong-fit example. |
| Invalid value `[gtin]` | Requires packaging/supplier/manufacturer verification | NOT TESTED | No replacement generated. |
| Missing value `[brand]` | Warns not to invent brand | NOT TESTED | Maps to vendor/brand context. |
| Missing value `[mpn]` | Warns not to copy SKU unless true manufacturer part number | NOT TESTED | Strong-fit example. |
| `identifier_exists` conflict | Explains consistency issue and custom-product review | NOT TESTED | Strong-fit example. |
| Price mismatch | Partial support clearly explained | NOT TESTED | No live crawl guarantee. |
| Availability mismatch | Requires live storefront verification | NOT TESTED | Partial support. |
| Image issue | Maps to image fields and asks for URL verification | NOT TESTED | Partial support. |
| Misrepresentation | Limited support, no account recovery promise | NOT TESTED | Must be cautious. |
| Account suspension | Limited support, no official Google support promise | NOT TESTED | Should not be sold as Fix Pack by default. |

---

# P0 — Checkout

| Check | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Fix Pack checkout button | Creates Stripe Checkout session | NOT TESTED | Requires `STRIPE_SECRET_KEY`. |
| Price | 29 EUR / 2900 cents | NOT TESTED | Must match public copy. |
| Currency | EUR | NOT TESTED | Required for launch offer. |
| Unknown plan | Rejected by API | NOT TESTED | No inactive plan should checkout. |
| Success URL | Returns to `/success?session_id={CHECKOUT_SESSION_ID}` | NOT TESTED | Verify actual URL. |
| Cancel URL | Returns to `/cancel` | NOT TESTED | Verify actual URL. |
| Missing Stripe key | Customer-facing error does not expose secret details | NOT TESTED | Should return setup error safely. |

---

# P0 — Success and diagnostic access gate

| Check | Expected result | Status | Notes |
| --- | --- | --- | --- |
| `/success?session_id=...` | Shows clear next step to open diagnostic | NOT TESTED | Must preserve session ID. |
| `/diagnostic` without session/token | Locked state | NOT TESTED | Must not allow upload. |
| `/api/analyze` without session/token | Rejected | NOT TESTED | Should return payment-required or forbidden state. |
| `/diagnostic?test_token=wrong` | Rejected | NOT TESTED | Must not expose token details. |
| `/diagnostic?test_token=<valid>` | Owner QA allowed | NOT TESTED | Token must remain private. |
| Paid test session | Allows analysis only if Stripe session is paid/complete | NOT TESTED | Requires Stripe test payment. |
| Fake session ID | Rejected | NOT TESTED | Must not bypass payment. |

---

# P0 — CSV upload and analysis

Use local-only CSV files described in `docs/qa/csv-samples/README.md`.

| CSV case | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Empty CSV | Clear empty-file recovery, no annotated CSV | NOT TESTED | Use zero-byte local file. |
| Header-only Shopify CSV | Clear header/no rows recovery, no annotated CSV | NOT TESTED | Local-only file. |
| Malformed CSV | Clear invalid CSV recovery, no annotated CSV | NOT TESTED | Local-only file. |
| Non-Shopify CSV | Unrecognized columns recovery, no annotated CSV | NOT TESTED | Repo sample available. |
| Clean Shopify CSV | No false critical panic | NOT TESTED | Use local demo or real permitted file. |
| Issue-heavy Shopify CSV | Findings, manual_review, evidence needed | NOT TESTED | Use local demo only. |
| Real customer CSV with permission | Report is useful and safe | NOT TESTED | Never commit file. |

---

# P0 — Report output

| Check | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Decision summary | Shows top priority, unsafe shortcuts, evidence, next safe step | NOT TESTED | P0-08 output. |
| Internal score | Clearly says not a Google score | NOT TESTED | Avoid false authority. |
| Row findings | Sorted by decision risk | NOT TESTED | Blocked/critical/manual review first. |
| Evidence needed | Clear and actionable | NOT TESTED | Packaging/supplier/manufacturer/Shopify/storefront. |
| Limitations | Visible before customer acts | NOT TESTED | No Google approval guarantee. |
| Upload error state | Does not show normal report as success | NOT TESTED | Recovery state only. |

---

# P0 — Annotated CSV output

| Check | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Invalid input | No annotated CSV promised | NOT TESTED | Empty/header/malformed/non-Shopify. |
| Safe output available | Download button appears | NOT TESTED | Only when available. |
| Original data preserved | Original rows and columns remain | NOT TESTED | No silent destructive edits. |
| MerchantFix columns | Notes/action/status/manual-review/evidence columns added | NOT TESTED | Verify output file. |
| No invented facts | No GTIN, MPN, brand, price, image, shipping, tax invented | NOT TESTED | Core safety requirement. |

---

# P0 — Mobile Android QA

| Route / area | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Homepage hero | CTA visible, no broken layout | NOT TESTED | Android Chrome. |
| Paste-warning form | Easy to type and submit | NOT TESTED | Keyboard behavior. |
| Fix Pack page | Checkout CTA visible | NOT TESTED | No overflow. |
| Sample report | Tables scroll horizontally intentionally | NOT TESTED | No page-wide accidental overflow. |
| Diagnostic page | Upload flow readable | NOT TESTED | File picker usable. |
| Report output | Decision cards readable | NOT TESTED | Check vertical spacing. |
| Affected rows table | Horizontal scroll usable | NOT TESTED | Essential. |
| Legal pages | Readable and links clickable | NOT TESTED | Footer links too. |

---

# P0 — Unsafe claims sweep

Search public pages for unsafe or overly broad claims.

| Claim type | Expected result | Status | Notes |
| --- | --- | --- | --- |
| Google approval guarantee | Not present | NOT TESTED | Hard blocker. |
| Account recovery guarantee | Not present | NOT TESTED | Hard blocker. |
| Ranking/traffic/sales guarantee | Not present | NOT TESTED | Hard blocker. |
| Fake GTIN/MPN/brand generation | Not present | NOT TESTED | Hard blocker. |
| Official Google support implication | Not present | NOT TESTED | Hard blocker. |
| Tax/legal advice guarantee | Not present | NOT TESTED | Hard blocker. |
| Full feed app replacement claim | Not present | NOT TESTED | Should be framed carefully. |

---

# Controlled-sales decision

## Green

Controlled sales can start only when:

- all P0 blockers are `PASS` or explicitly `RISK ACCEPTED`;
- checkout works in Stripe test mode;
- diagnostic gate works;
- CSV analysis works;
- report is understandable;
- mobile is usable;
- no unsafe claim is present.

## Yellow

Controlled sales may start with caution if:

- minor copy or mobile spacing issues remain;
- no payment or diagnostic blocker exists;
- owner can manually support first customers;
- risk is documented.

## Red

Do not sell if:

- build fails;
- checkout fails;
- diagnostic can be used without payment/token;
- paid customer cannot upload CSV;
- report does not render;
- unsafe guarantee is present;
- mobile blocks checkout or upload.

## Final sign-off

| Area | Status | Notes |
| --- | --- | --- |
| Build | NOT TESTED |  |
| Stripe | NOT TESTED |  |
| Diagnostic gate | NOT TESTED |  |
| CSV analysis | NOT TESTED |  |
| Report output | NOT TESTED |  |
| Annotated CSV | NOT TESTED |  |
| Mobile | NOT TESTED |  |
| Legal/trust | NOT TESTED |  |
| Unsafe claims | NOT TESTED |  |

Final decision:

```text
NOT READY UNTIL TESTED
```
