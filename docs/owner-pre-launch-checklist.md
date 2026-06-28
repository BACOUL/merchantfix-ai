# MerchantFix.ai — Owner Pre-Launch Checklist

Status: personal preparation checklist.

Date: 2026-06-28

## Purpose

This checklist is for the owner before Vercel launch access returns.

It covers what should be prepared on the owner's computer, Stripe account, Vercel account, local QA files, prospect list, and support workflow.

Do not commit private values, secrets, real customer CSV files, or private tokens to GitHub.

## 1. Local computer preparation

Prepare a clean local environment.

| Task | Status | Notes |
| --- | --- | --- |
| Confirm repo is cloned locally | TODO | `BACOUL/merchantfix-ai` |
| Confirm Node.js installed | TODO | Use a version compatible with Next.js 14. |
| Confirm npm works | TODO | Run `npm -v`. |
| Confirm Git works | TODO | Run `git --version`. |
| Confirm latest main can be pulled | TODO | `git checkout main && git pull origin main` |
| Confirm no private `.env` is committed | TODO | Check before every push. |

## 2. Local commands to run when ready

Run these before Vercel deployment:

```bash
npm install
npm run typecheck
npm run test
npm run build
```

Record results in:

```text
docs/final-launch-qa-checklist.md
```

Do not continue to Vercel if any command fails.

## 3. Private values to prepare outside GitHub

Prepare these in a password manager or private note, not in the repo.

| Value | Status | Where to store |
| --- | --- | --- |
| Stripe test secret key | TODO | Password manager / Stripe dashboard only |
| Stripe live secret key | TODO | Password manager / Stripe dashboard only |
| Diagnostic test token | TODO | Password manager only |
| Production domain | TODO | Vercel / DNS dashboard |
| Support email inbox access | TODO | Email provider |

Diagnostic token generation command:

```bash
openssl rand -hex 32
```

Alternative:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Never paste the generated token into GitHub.

## 4. Vercel preparation

Before deployment access returns, know where to set:

```text
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_URL
APP_URL
DIAGNOSTIC_TEST_TOKEN
```

When access returns:

1. set test-mode Stripe key first;
2. set production or preview app URL correctly;
3. set private diagnostic token;
4. redeploy preview;
5. run QA;
6. switch to live Stripe only after clean QA.

## 5. Stripe preparation

Prepare in Stripe:

| Task | Status | Notes |
| --- | --- | --- |
| Confirm account access | TODO | Dashboard login. |
| Confirm test mode available | TODO | Use test key first. |
| Confirm live mode eligibility | TODO | Required before paid launch. |
| Confirm business/profile details | TODO | Avoid checkout trust issues. |
| Confirm payment methods | TODO | Card payment at minimum. |
| Confirm support email | TODO | Should match MerchantFix support email. |
| Confirm statement descriptor if needed | TODO | Avoid customer confusion. |

Do not switch live until QA passes.

## 6. Local CSV QA files to create

Create these locally only. Do not commit them.

| Local file | Purpose | Status |
| --- | --- | --- |
| `empty.csv` | Empty file recovery | TODO |
| `header-only-shopify-products.csv` | Header but no product rows | TODO |
| `malformed-shopify-products.csv` | Invalid CSV recovery | TODO |
| `issue-heavy-shopify-products.csv` | Report and row findings QA | TODO |
| `clean-shopify-products.csv` | No false panic QA | TODO |
| `real-customer-case.csv` | Only with explicit permission | TODO |

Use:

```text
docs/qa/csv-samples/README.md
```

## 7. Warning examples to prepare

Use:

```text
docs/qa/warning-examples.md
```

Prepare copy/paste examples for:

- product identifier warning;
- brand/vendor warning;
- product image warning;
- product price warning;
- product availability warning;
- limited-fit account-level warning.

## 8. Prospect list preparation

Prepare 20 to 50 prospects before launch QA is complete.

Use:

```text
docs/first-50-prospecting-plan.md
docs/prospecting-tracker-template.csv
```

Prioritize:

1. Shopify agencies;
2. Google Ads or Merchant Center freelancers;
3. Shopify merchants with product-data warnings.

Minimum tracker fields:

```text
Name
Type
Website
Contact
Country
Shopify evidence
Merchant Center evidence
Warning type
Message sent
Response
Warning collected
CSV possible
Fix Pack sold
Notes
Follow-up date
```

## 9. Outreach preparation

Do not send messages until product QA is Green or acceptable Yellow.

Before outreach, prepare:

- agency/freelancer message;
- merchant message;
- fit confirmation message;
- refusal message for bad-fit cases;
- post-sale message;
- feedback questions.

Use:

```text
docs/controlled-first-sales-procedure.md
```

## 10. Support preparation

Prepare a simple support workflow.

| Task | Status | Notes |
| --- | --- | --- |
| Confirm support email inbox works | TODO | `contact@merchantfix.ai` if configured. |
| Prepare reply for payment issue | TODO | Keep calm and factual. |
| Prepare reply for CSV upload issue | TODO | Ask for fresh Shopify export. |
| Prepare reply for report confusion | TODO | Explain needs-proof and do-not-change-yet. |
| Prepare refund policy link | TODO | Use public page. |
| Prepare data deletion reply | TODO | Use privacy/data handling pages. |

## 11. Mobile device preparation

Prepare an Android QA device.

Check:

- Chrome installed;
- stable internet;
- ability to upload local CSV file;
- access to preview URL;
- access to production URL later;
- screenshots possible for bugs.

## 12. Launch-day documents to open

On launch day, keep these open:

```text
docs/post-vercel-launch-runbook.md
docs/final-launch-qa-checklist.md
docs/vercel-env-setup-checklist.md
docs/qa/warning-examples.md
docs/qa/csv-samples/README.md
docs/controlled-first-sales-procedure.md
docs/first-50-prospecting-plan.md
```

## 13. Do not do before QA passes

Do not:

- contact the full prospect list;
- switch Stripe live too early;
- sell broad public traffic;
- promise Google approval;
- promise account recovery;
- promise PDF/ZIP delivery as current scope;
- build accounts/dashboard/subscriptions first;
- upload real customer CSV files to GitHub.

## 14. First sales rule

First sales should be controlled.

Start with:

```text
5 prospects
```

Then review:

- did they understand the offer?
- did they send real warning text?
- could they export CSV?
- did checkout work?
- did diagnostic work?
- did the report help?
- did they ask for something outside scope?

Only then increase to the next batch.

## Final status

Owner preparation target:

```text
Ready before Vercel returns.
```

Product launch target:

```text
Only after build, Stripe, diagnostic, CSV, report, and mobile QA pass.
```
