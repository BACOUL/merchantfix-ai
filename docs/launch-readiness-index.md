# MerchantFix.ai — Launch Readiness Index

Status: index of launch-preparation documents.

Date: 2026-06-28

## Purpose

This file is the navigation index for MerchantFix.ai pre-launch readiness.

Use it to know which document to open depending on the question:

- Are we ready?
- What remains blocked by Vercel?
- What should be tested?
- What should be sold first?
- What should not be built yet?
- What comes after first sales?

## Current global status

```text
Prepared, not yet live-sales ready.
```

Reason:

The repo and launch preparation are strong, but production readiness still requires:

- local typecheck;
- local tests;
- local build;
- Vercel preview;
- Stripe checkout QA;
- diagnostic gate QA;
- CSV upload QA;
- report QA;
- annotated CSV QA;
- mobile Android QA;
- production smoke test.

## Readiness map

| Area | Status | Main document |
| --- | --- | --- |
| Overall status | Prepared, not live-sales ready | `docs/pre-launch-status.md` |
| Launch day sequence | Ready to execute later | `docs/post-vercel-launch-runbook.md` |
| Final QA checklist | Ready | `docs/final-launch-qa-checklist.md` |
| Vercel env setup | Ready | `docs/vercel-env-setup-checklist.md` |
| Source import risk review | Completed source-level review | `docs/source-build-risk-review.md` |
| No-Vercel preparation | Active | `docs/no-vercel-perfecting-plan.md` |
| Warning examples | Ready | `docs/qa/warning-examples.md` |
| CSV QA samples guide | Ready | `docs/qa/csv-samples/README.md` |
| First sales procedure | Ready after QA passes | `docs/controlled-first-sales-procedure.md` |
| First 50 prospects | Preparation ready | `docs/first-50-prospecting-plan.md` |
| Autonomous delivery | Architecture only | `docs/autonomous-delivery-architecture.md` |
| Content/design upgrade | Completed source-level work | `docs/content-design-upgrade-audit.md` |
| Legal/trust pages | Completed source-level work | `docs/legal-trust-pages-audit.md` |
| CSV recovery UX | Completed source-level work | `docs/csv-error-recovery-audit.md` |
| Decision report UX | Completed source-level work | `docs/decision-oriented-report-audit.md` |
| Public copy safety | Completed source-level audit | `docs/public-copy-safety-audit.md` |

## If the question is: Are we ready to sell?

Open:

```text
docs/pre-launch-status.md
docs/final-launch-qa-checklist.md
```

Current answer:

```text
Not yet. Prepared, but not live-sales ready until QA passes.
```

## If the question is: What do we do when Vercel returns?

Open:

```text
docs/post-vercel-launch-runbook.md
docs/vercel-env-setup-checklist.md
docs/final-launch-qa-checklist.md
```

Follow this order:

```text
local commands -> Vercel env -> preview -> Stripe test -> diagnostic gate -> CSV -> report -> mobile -> production -> Stripe live -> first controlled sale
```

## If the question is: What can we do before Vercel returns?

Open:

```text
docs/no-vercel-perfecting-plan.md
docs/source-build-risk-review.md
docs/first-50-prospecting-plan.md
```

Useful work:

- prepare local-only CSV files;
- prepare private diagnostic token outside GitHub;
- prepare Stripe test account settings;
- prepare 20 to 50 prospects;
- review source for obvious build/import risks;
- avoid feature bloat.

## If the question is: What exactly should be tested?

Open:

```text
docs/final-launch-qa-checklist.md
docs/qa/warning-examples.md
docs/qa/csv-samples/README.md
```

Test categories:

- public pages;
- legal pages;
- paste-warning form;
- Stripe checkout;
- success page;
- diagnostic gate;
- CSV upload;
- report output;
- annotated CSV;
- mobile Android;
- unsafe claims.

## If the question is: Who do we sell to first?

Open:

```text
docs/first-50-prospecting-plan.md
docs/controlled-first-sales-procedure.md
```

Priority:

1. Shopify agencies;
2. Google Ads or Merchant Center freelancers;
3. Shopify merchants with product-data warnings.

Start with small batches only after QA passes.

## If the question is: What should we not build yet?

Open:

```text
docs/pre-launch-status.md
docs/autonomous-delivery-architecture.md
```

Do not build yet:

- full customer accounts;
- agency dashboard;
- subscriptions;
- Shopify app;
- Google Merchant Center API;
- broad SEO automation;
- automated product-data edits;
- PDF or ZIP before report-link delivery is proven.

## If the question is: What comes after first sales?

Open:

```text
docs/autonomous-delivery-architecture.md
```

Build order if first sales show demand:

```text
1. Stripe webhook
2. orders table
3. reports table
4. magic report links
5. payment email
6. report-ready email
7. object storage for annotated CSV
8. signed downloads
```

## Current scorecard

| Area | Score | Comment |
| --- | --- | --- |
| Product concept | 8 / 10 | Clear niche and problem. |
| Commercial offer | 8 / 10 | 29 EUR one-time Fix Pack is simple. |
| Public copy | 8 / 10 | Stronger and safer after rewrites. |
| Source-level readiness | 7.5 / 10 | Looks coherent, but build not executed. |
| Runtime readiness | 0 / 10 | Not tested in deployment yet. |
| Controlled-sales readiness | 7.5 / 10 before QA | Could become 8+ after QA passes. |
| Autonomous SaaS readiness | 5 / 10 | Architecture planned, not built. |
| Prospecting readiness | 7 / 10 | Plan ready, list still to build. |

## Final rule

Do not confuse preparation with validation.

MerchantFix.ai is well prepared.

It becomes sales-ready only after the core funnel is proven:

```text
checkout -> diagnostic -> CSV -> report -> customer understands value
```
