# MerchantFix.ai — World-Class Autonomous Roadmap

This document separates two goals that must not be confused:

1. **Sellable MVP** — get first controlled customers and prove the 29 EUR Fix Pack has demand.
2. **World-class autonomous product** — build a self-service platform that can acquire, sell, deliver, support, and scale globally with minimal owner intervention.

The current repository is already beyond an idea stage. It has a real Next.js product, a diagnostic CSV flow, Stripe Checkout, a guarded diagnostic area, report components, sample output, SEO pages, and launch-readiness documentation.

But a world-class autonomous site requires more than a working diagnostic. It requires automated delivery, storage, email, reporting, trust, analytics, support, and scalable acquisition.

## Product north star

MerchantFix.ai should become:

> The fastest safe diagnostic layer for Shopify merchants facing Google Merchant Center product-data warnings.

The product should help a merchant move from:

```text
I do not understand this Merchant Center warning.
```

to:

```text
I know which Shopify rows and fields need correction, manual evidence, or no automatic change.
```

MerchantFix.ai must never become:

- a fake identifier generator;
- an approval guarantee service;
- a full account recovery agency;
- an unsafe automatic feed editor;
- a vague AI advice tool;
- a heavy manual consulting business by default.

## Guiding principles

1. **Safety before automation** — never invent GTIN, MPN, brand, price, shipping, tax, or product facts.
2. **Diagnostic before correction** — show rows, evidence, and guardrail status before any change.
3. **Self-service first** — the merchant should complete the flow without owner intervention.
4. **No broad promise** — no Google approval, ranking, traffic, sales, or recovery guarantee.
5. **One narrow pain first** — Shopify product-data warnings in Google Merchant Center.
6. **Report quality matters** — the output must feel like a professional product-data audit.
7. **Agencies are the scale path** — one agency can bring multiple merchant cases.
8. **SEO must match exact pain** — exact warning pages should lead to exact diagnostic action.

## Phase 1 — Sellable MVP

Goal:

> A real Shopify merchant with a real Merchant Center warning pays 29 EUR, uploads a CSV, understands the report, downloads the annotated CSV, and says it helped.

### Required before controlled sales

| Item | Required result | Status |
| --- | --- | --- |
| Fix Pack checkout | 29 EUR Stripe Checkout works | TODO |
| Diagnostic access | Paid session or private test token required | TODO |
| CSV upload | Shopify CSV upload works | TODO |
| Report page | Structured report renders after upload | TODO |
| Annotated CSV | Download works when available | TODO |
| Guardrails | manual_review and blocked are clear | TODO |
| Copy safety | No unsafe guarantee appears | TODO |
| Mobile usability | Android/narrow viewport usable | TODO |
| Support email | Visible after payment and on diagnostic limits | TODO |
| First prospects | 10 to 20 controlled leads ready | TODO |

### Do not add in Phase 1

- PDFShift;
- database;
- customer accounts;
- subscriptions;
- app Shopify;
- Google Merchant Center API;
- agency dashboard;
- broad SEO expansion;
- paid ads.

Reason: Phase 1 proves demand and report usefulness. It does not need full platform complexity.

### Phase 1 success criteria

| Metric | Target |
| --- | --- |
| Real warnings collected | 10 |
| CSVs tested | 5 |
| Fix Pack sales | 3 |
| Report understood by customer | 80%+ |
| Refunds or serious dissatisfaction | 0 |
| Unsafe promise required to close sale | 0 |

If this phase fails, improve the diagnostic/report/positioning before building more infrastructure.

## Phase 2 — Autonomous delivery

Goal:

> The customer can pay, upload, receive, and retrieve deliverables without owner intervention.

### Required features

| Feature | Purpose | Priority |
| --- | --- | --- |
| Stripe webhook | Create and update orders reliably after payment | P0 |
| Order record | Store payment, email, plan, status, and timestamps | P0 |
| Report record | Store report metadata and generated output references | P0 |
| Customer email capture | Deliver links and support instructions | P0 |
| Magic report link | Let customer reopen report without an account | P0 |
| Email after payment | Confirm purchase and diagnostic instructions | P0 |
| Email after report generation | Send report/download links | P0 |
| PDF export | Premium downloadable report | P1 |
| ZIP delivery | PDF + annotated CSV + readme | P1 |
| Delivery status | Know if output was generated and sent | P1 |
| Retry/failure handling | Avoid silent delivery failures | P1 |

### Recommended architecture

Keep it simple:

- database: Supabase, Neon Postgres, or similar;
- file storage: Supabase Storage, S3-compatible storage, or equivalent;
- email: Resend, Postmark, or similar;
- PDF: PDFShift or another HTML-to-PDF service;
- auth: magic links first, not full accounts.

### Minimal data model

```text
orders
- id
- stripe_session_id
- stripe_payment_intent_id
- customer_email
- plan
- amount
- currency
- status
- created_at
- paid_at
- refunded_at

reports
- id
- order_id
- report_id
- method_version
- csv_filename
- score
- total_products
- total_findings
- manual_review_count
- blocked_count
- html_report_url
- pdf_url
- annotated_csv_url
- zip_url
- magic_token_hash
- created_at
- expires_at

report_events
- id
- order_id
- report_id
- event_type
- message
- created_at
```

### Phase 2 done means

- customer pays;
- order is created automatically;
- customer receives instructions by email;
- customer uploads CSV;
- report is generated;
- PDF/CSV/ZIP are stored;
- customer receives links;
- customer can reopen the report;
- owner does not need to manually send files.

## Phase 3 — Trust, legal, and data handling

Goal:

> A global customer can trust the product enough to upload a Shopify CSV and pay.

### Required pages

| Page | Purpose | Priority |
| --- | --- | --- |
| Privacy Policy | Explain data collection and CSV handling | P0 |
| Terms of Service | Define digital service, limits, and usage | P0 |
| Refund Policy | Explain refund conditions for digital diagnostic | P0 |
| Data Handling | Explain how CSVs are processed and stored | P0 |
| Contact | Provide support route | P0 |
| Methodology | Explain how diagnostics work | P1 |
| Limitations | Make non-guarantees explicit | P1 |
| Security | Explain basic security practices | P1 |

### Required trust messages

Use these clearly:

```text
MerchantFix.ai helps diagnose Shopify product data issues.
Some rows may require manual review.
Google approval is not guaranteed.
MerchantFix.ai does not invent GTIN, MPN, brand, price, or product facts.
Uploaded CSV data should be reviewed before importing any changes into Shopify.
```

### Data principles

- Do not store raw CSV longer than needed unless clearly disclosed.
- Do not expose report links publicly.
- Do not place secrets or private tokens in GitHub.
- Do not log full customer CSV data in public logs.
- Do not use uploaded data for public examples without permission.
- Provide a support path for deletion requests.

## Phase 4 — Conversion analytics

Goal:

> Know where users arrive, where they click, where they pay, where they fail, and where the report creates value.

### Events to track

| Event | Why it matters |
| --- | --- |
| homepage_view | Acquisition baseline |
| paste_warning_started | Problem awareness |
| paste_warning_analyzed | Free tool activation |
| supported_error_detected | Quality of traffic |
| fix_pack_cta_clicked | Buying intent |
| checkout_started | Funnel start |
| checkout_completed | Revenue |
| diagnostic_opened | Activation after payment |
| csv_upload_started | Product use |
| csv_upload_failed | Friction |
| report_generated | Delivery success |
| annotated_csv_downloaded | Value proof |
| report_reopened | Post-delivery value |
| support_clicked | Confusion or trust need |

### Recommended tools

Use one simple privacy-friendly analytics stack first:

- Plausible;
- Umami;
- PostHog;
- or Vercel Analytics if available.

Do not overbuild analytics before first controlled sales.

## Phase 5 — Global SEO engine

Goal:

> Own exact-intent searches around Shopify + Google Merchant Center product-data warnings.

### SEO structure

| Page type | Example |
| --- | --- |
| Exact warning pages | `Missing value [gtin] Shopify` |
| Field pages | `Shopify Variant Barcode Google Merchant Center` |
| Issue families | `identifier_exists Shopify Google Merchant Center` |
| Comparison pages | `MerchantFix vs feed apps` |
| How-to pages | `How to export Shopify CSV for Merchant Center diagnosis` |
| Safety pages | `Why you should not invent GTINs` |
| Agency pages | `Merchant Center diagnostic for Shopify agencies` |
| Sample pages | `Sample Shopify Merchant Center diagnostic report` |

### SEO rules

- Each page must answer one exact problem.
- Each page must lead to paste-warning or Fix Pack CTA.
- Do not create thin pages.
- Do not promise approval.
- Use real Merchant Center wording where safe.
- Link to sample report.
- Link to supported errors.
- Add FAQ schema only when the page has real FAQ content.

### Phase 5 success criteria

| Metric | Target |
| --- | --- |
| Exact warning pages indexed | 30+ |
| Clicks from exact error searches | Growing month over month |
| Paste-warning use from SEO | Measurable |
| Fix Pack CTA clicks from SEO | Measurable |
| First organic sale | Achieved |

## Phase 6 — Agency product

Goal:

> Turn one-off diagnostics into repeat usage through agencies, freelancers, and feed consultants.

### Possible offers

| Offer | Price idea | When to launch |
| --- | --- | --- |
| Fix Pack | 29 EUR | Now |
| Pro Review | 79-99 EUR | After demand for manual help appears |
| Agency 10-pack | 199 EUR | After several agencies ask for repeat use |
| Agency Monthly | 199-399 EUR/month | After repeat usage is proven |
| White-label reports | 499 EUR/month | After agencies want branded output |

### Agency features

- multi-report history;
- client name field;
- branded PDF;
- report export bundle;
- monthly invoice;
- team access later;
- bulk CSV diagnostics later;
- saved warnings library.

### Do not launch agency subscriptions until

- at least 3 agencies show interest;
- at least 10 reports have been generated;
- repeat usage is observed;
- support burden is understood.

## Phase 7 — Platform integrations

Goal:

> Move from uploaded CSV diagnostics to deeper automation only after the market proves demand.

### Possible integrations

| Integration | Value | Risk |
| --- | --- | --- |
| Shopify Admin API | Direct product data access | App complexity, permissions, review |
| Google Merchant Center API | Direct issue import | OAuth, API complexity, policy expectations |
| Email parser | Import warning emails | Privacy and parsing complexity |
| Feed app integrations | Partner path | Dependency on third parties |
| Monitoring | Alerts when issues return | Requires accounts and persistence |

### Integration rule

Do not integrate until one of these is true:

- customers repeatedly ask for it;
- manual CSV upload blocks sales;
- agencies need repeated diagnostics;
- one-off Fix Pack revenue proves demand.

## Master priority order

### Before first sales

1. Validate current diagnostic flow.
2. Validate Stripe access.
3. Validate report readability.
4. Validate annotated CSV usefulness.
5. Validate no unsafe promise exists.
6. Find first 10-20 leads.
7. Sell 3 Fix Packs.

### After first sales

1. Add Stripe webhook.
2. Add database order/report records.
3. Add email delivery.
4. Add magic report links.
5. Add PDF export.
6. Add ZIP delivery.
7. Add analytics.
8. Improve report based on feedback.

### After repeat demand

1. Build agency workflow.
2. Build report history.
3. Add SEO expansion.
4. Add agency pricing.
5. Consider platform integrations.

## Current strategic decision

MerchantFix.ai should not try to be world-class by adding everything at once.

It should become world-class by moving through strict gates:

```text
Gate 1 — Real merchant pays 29 EUR.
Gate 2 — Report is understood and useful.
Gate 3 — Delivery becomes autonomous.
Gate 4 — SEO brings qualified users.
Gate 5 — Agencies repeat usage.
Gate 6 — Integrations become justified.
```

If a feature does not help pass the next gate, it should wait.

## Final rule

The product wins if it becomes the safest and fastest way for a Shopify merchant to understand Merchant Center product-data warnings before making risky feed edits.

It loses if it becomes a vague AI tool, a fake automatic fixer, or a heavy manual agency before the self-service workflow is proven.
