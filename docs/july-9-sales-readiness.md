# MerchantFix.ai — July 9 Sales Readiness

This document defines what must be completed before the Vercel deployment budget is available again on July 9, 2026.

The objective is simple:

> On July 9, only deploy, configure production variables, run final QA, and start first controlled sales.

This is not a feature roadmap. It is a launch-preparation checklist for the current paid MVP.

## Current launch product

MerchantFix.ai sells one simple paid offer during first-sales validation:

- Product: Fix Pack
- Price: 29 EUR
- Target: Shopify merchants with Google Merchant Center product-data warnings
- Input: pasted Merchant Center warning and Shopify CSV export
- Output: row-level product-data diagnostic, structured report, guardrail status, evidence needed, and annotated CSV when available

MerchantFix.ai must remain positioned as:

- a pre-feed diagnostic layer;
- not a feed management platform;
- not a Shopify app in the current version;
- not a Google Merchant Center connector in the current version;
- not an account recovery service;
- not an approval guarantee.

## Do not add before first controlled sales

Do not add the following before first sales:

- PDFShift integration;
- PDF generation;
- ZIP delivery;
- Shopify app;
- Google Merchant Center API integration;
- customer dashboard;
- subscriptions;
- multilingual support;
- agency accounts;
- advanced monitoring;
- paid ads;
- broad SEO programmatic expansion.

Reason: these features can be useful later, but they are not required to prove that merchants will pay 29 EUR for a safe diagnostic.

## Work that can be completed without Vercel

The following work can be completed locally or in the repository while Vercel credits are unavailable:

- review public copy;
- review commercial positioning;
- prepare first-sales scripts;
- prepare prospect list;
- prepare CSV test cases;
- run local typecheck, tests, and build if a local machine is available;
- check all public pages in local dev mode;
- verify that no unsafe promise appears in customer-facing text;
- prepare private environment variable names and values outside GitHub;
- prepare July 9 deployment checklist.

## Local QA checklist

Run these commands locally when possible:

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run dev
```

Expected result:

- typecheck passes;
- tests pass;
- production build passes;
- local app opens without blocking runtime errors;
- homepage renders on desktop and mobile viewport;
- diagnostic page renders in locked mode without a session or token;
- no obvious broken layout appears on key pages.

## Key routes to verify locally

| Route | Expected result |
| --- | --- |
| `/` | Homepage explains the warning -> CSV -> rows to fix/review/block promise clearly. |
| `/fix-pack` | 29 EUR Fix Pack offer is clear and credible. |
| `/pricing` | Only one active paid offer is visible during launch validation. |
| `/sample-report` | Output preview shows report value before purchase. |
| `/supported-errors` | Supported, partial, and limited cases are clearly separated. |
| `/merchantfix-vs-feed-apps` | Differentiation from feed apps is easy to understand. |
| `/how-it-works` | Merchant understands the full flow. |
| `/scan` | Public scan is not presented as a full Merchant Center diagnosis. |
| `/diagnostic` | Access remains locked without payment or private token. |
| `/reference` | Reference hub renders. |
| `/reference/level-2` | Advanced reference hub renders. |

## CSV diagnostic QA checklist

Use repository sample files first:

- `docs/test-cases/shopify-sample-clean.csv`
- `docs/test-cases/shopify-sample-issues.csv`

Expected behavior:

| Test | Expected result |
| --- | --- |
| Clean Shopify CSV | No false critical result that would scare a merchant. |
| Issue-heavy Shopify CSV | Missing identifiers, weak rows, and manual-review rows are detected. |
| Empty CSV | Clear error. |
| Non-Shopify CSV | Clear unrecognized-columns error. |
| Missing GTIN | Manual review, no invented GTIN. |
| Invalid GTIN | Manual review, no generated replacement. |
| Missing MPN | Manual review, no blind SKU-to-MPN copy. |
| Missing brand/vendor | Manual review, no invented brand. |
| identifier_exists conflict | Clear warning explaining why the row needs review. |
| Missing image | Clear row-level issue. |
| Missing price | Clear row-level issue. |
| Possible custom product | Evidence required before identifier_exists changes. |
| Duplicate GTIN | Manual review, because duplicates can be valid variants or incorrect data. |

## Annotated CSV output checklist

The generated CSV must preserve original merchant data and add only MerchantFix diagnostic columns.

Required columns:

- `merchantfix_notes`
- `merchantfix_action`
- `merchantfix_status`
- `merchantfix_manual_review_reason`
- `merchantfix_evidence_needed`

Expected behavior:

- original product data is preserved;
- row notes are readable by a non-technical merchant;
- manual review rows explain evidence needed;
- blocked rows do not pretend to be fixed;
- no GTIN, MPN, brand, price, shipping, tax, or product fact is invented;
- Google approval is never guaranteed.

## Guardrail QA checklist

Every output must respect these rules:

| Rule | Required result |
| --- | --- |
| GTIN | Never invent, generate, or guess. |
| MPN | Never invent or copy SKU blindly. |
| Brand | Never invent. |
| Price | Never invent. |
| Image | Never invent image URLs. |
| Shipping | Do not guarantee compliance. |
| Tax | Do not provide tax advice or guarantee compliance. |
| Misrepresentation | Do not position as account recovery. |
| Approval | Never guarantee Google approval. |
| Performance | Never guarantee ranking, traffic, sales, or ads performance. |

Required wording across the product:

> MerchantFix.ai helps diagnose Shopify product data issues. Some rows may require manual review. Google approval is not guaranteed.

## Forbidden public claims

Search and remove or rewrite any claim that says or implies:

- Google approval guaranteed;
- Merchant Center account recovery guaranteed;
- automatic GTIN repair;
- automatic MPN repair;
- automatic brand repair;
- guaranteed Google Shopping performance;
- guaranteed ranking;
- guaranteed sales;
- guaranteed tax compliance;
- guaranteed shipping compliance;
- full feed app replacement;
- legal, tax, or official Google advice.

## July 9 Vercel environment checklist

Prepare these values privately before July 9. Do not commit real secrets to GitHub.

| Variable | Required for | Notes |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Stripe checkout and paid diagnostic verification | Server-side only. |
| `NEXT_PUBLIC_APP_URL` | Stable Stripe success/cancel URLs | Use final production domain. |
| `APP_URL` | Server fallback for app URL | Use final production domain if needed. |
| `DIAGNOSTIC_TEST_TOKEN` | Private unpaid owner QA | Long random token. Never publish. |

Token requirement:

- at least 32 random characters;
- not `test`;
- not `1234`;
- not `merchantfix`;
- not included in screenshots, README examples, or public messages.

## July 9 deployment checklist

When Vercel is available again:

1. Confirm latest `main` is clean.
2. Add or verify environment variables in Vercel.
3. Deploy production.
4. Confirm production build passes.
5. Open `/` on production.
6. Open `/fix-pack` on production.
7. Open `/pricing` on production.
8. Open `/sample-report` on production.
9. Open `/supported-errors` on production.
10. Confirm public pages are indexable unless intentionally blocked.
11. Confirm `/diagnostic` remains `noindex` and locked without access.
12. Open `/diagnostic?test_token=<private-token>`.
13. Confirm test access is verified.
14. Upload clean CSV.
15. Upload issue-heavy CSV.
16. Confirm report panel renders.
17. Confirm annotated CSV download works when available.
18. Run Stripe test checkout for Fix Pack.
19. Confirm success URL returns to `/success?session_id=...`.
20. Confirm paid diagnostic opens only after verified payment session.
21. Confirm wrong test token is rejected.
22. Confirm unpaid API access is rejected.
23. Confirm no unsafe promise appears on public pages or output.
24. Test on Android.
25. Decide Green / Yellow / Red.

## Launch decision rule

| Result | Meaning | Action |
| --- | --- | --- |
| Green | No blocking payment, access, diagnostic, privacy, or promise issue | Start 10-20 controlled merchant tests. |
| Yellow | Minor issue, no payment/data/promise risk | Fix before broader public push; limited controlled tests may continue. |
| Red | Payment, access, CSV, privacy, or unsafe promise risk | Do not sell until fixed. |

A single Red item blocks launch.

## First controlled sales scope

Start with 10 to 20 controlled merchant tests.

Best-fit cases:

- Missing value `[gtin]`;
- Invalid value `[gtin]`;
- Missing value `[brand]`;
- Missing value `[mpn]`;
- `identifier_exists` conflict;
- duplicate GTIN;
- duplicate item ID;
- image issue;
- price mismatch;
- availability mismatch;
- category issue.

Avoid leading with:

- account suspension;
- full misrepresentation recovery;
- tax compliance;
- shipping compliance;
- legal/policy disputes;
- cases where the merchant expects guaranteed approval.

## First-sales target list before July 9

Prepare a simple spreadsheet with these columns:

| Column | Purpose |
| --- | --- |
| Name | Agency, merchant, freelancer, or consultant name. |
| Type | Shopify agency, merchant, Google Ads freelancer, feed consultant, forum lead. |
| Website | Public website or profile. |
| Contact | Email, LinkedIn, or form. |
| Evidence of fit | Shopify, GMC, Google Shopping, feed issue, product-data content. |
| Message sent | Yes/No. |
| Response | Interested, not now, no response, rejected. |
| Warning collected | Exact Merchant Center warning if available. |
| CSV possible | Yes/No/Maybe. |
| Follow-up date | When to relaunch. |

Target before July 9:

- 50 Shopify agencies;
- 50 Google Ads or Merchant Center freelancers;
- 50 Shopify merchants;
- 20 forum or community posts involving Merchant Center product-data errors;
- 10 real Merchant Center warning examples.

## First-sales pitch

Short version:

> MerchantFix.ai helps Shopify merchants understand Google Merchant Center product-data warnings before they make risky feed edits. Paste the warning, upload a Shopify CSV, and get the rows to fix, review, or block.

Commercial version:

> If Google Merchant Center flags GTIN, MPN, brand, identifier_exists, image, or price issues, MerchantFix turns the warning and Shopify CSV export into a row-level diagnostic. It shows what can be safely noted, what requires merchant or supplier evidence, and what should not be automated. Google approval is not guaranteed.

## Message to Shopify agencies

```text
Bonjour,

Je prépare MerchantFix.ai, un outil simple pour les marchands Shopify qui reçoivent des erreurs Google Merchant Center : GTIN manquant, brand, MPN, identifier_exists, image, price mismatch.

Le principe : le marchand colle son warning, upload son CSV Shopify, et reçoit un rapport ligne par ligne avec les champs à corriger, vérifier ou ne pas modifier.

Je cherche 10 premiers cas réels à tester début juillet.
Est-ce que vous avez déjà des clients Shopify bloqués ou limités dans Merchant Center ?
```

## Message to Shopify merchants

```text
Bonjour,

J’ai vu que beaucoup de marchands Shopify perdent du temps avec les erreurs Google Merchant Center : GTIN, MPN, brand, identifier_exists, images, prix, etc.

Je lance MerchantFix.ai : vous collez votre warning Google, vous ajoutez votre CSV Shopify, et l’outil vous sort les lignes à corriger, vérifier ou bloquer.

Je cherche quelques premiers marchands pour tester le Fix Pack début juillet.
Vous avez déjà eu ce type d’erreur sur Google Merchant Center ?
```

## Objection handling

### Does this guarantee Google approval?

No. MerchantFix.ai does not guarantee Google approval. It helps diagnose Shopify product data issues and separates safe notes from rows requiring manual evidence.

### Why pay 29 EUR?

Because the merchant gets a row-level worklist instead of guessing which Shopify products caused the warning. The goal is to avoid risky edits, fake identifiers, and wasted time.

### Is this a feed app?

No. It is a pre-feed diagnostic layer. Feed apps push or transform feeds. MerchantFix helps the merchant understand product-data warnings before changing Shopify or feed output.

### Can it fix GTIN automatically?

No. A real GTIN must come from product packaging, the manufacturer, the supplier, or official product data. MerchantFix must never invent one.

### Can it recover suspended accounts?

No. MerchantFix is not an account recovery service. Misrepresentation or suspension cases may require broader manual review outside CSV data.

## Final pre-launch status

| Gate | Status |
| --- | --- |
| README aligned | TODO |
| Local typecheck | TODO |
| Local tests | TODO |
| Local build | TODO |
| Public copy review | TODO |
| CSV clean test | TODO |
| CSV issue-heavy test | TODO |
| Guardrail output review | TODO |
| Sales messages prepared | TODO |
| Prospect list started | TODO |
| Vercel variables prepared privately | TODO |
| July 9 deployment QA | TODO |

Final decision: Green / Yellow / Red
