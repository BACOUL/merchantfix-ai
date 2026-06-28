# MerchantFix.ai — Autonomous Delivery Architecture

Status: architecture plan only. Do not build before first controlled sales prove demand.

Date: 2026-06-28

## Purpose

This document defines the next product layer after controlled sales:

```text
customer pays -> order is recorded -> customer uploads CSV -> report is generated -> customer receives a secure link -> customer can reopen the report without owner intervention
```

The goal is not to create full customer accounts immediately.

The recommended first autonomy layer is:

```text
Stripe webhook + order record + report record + magic report link + transactional emails
```

## Current state

Current launch flow:

- public pages explain the Fix Pack;
- customer starts Stripe Checkout;
- success page receives a Stripe `session_id`;
- diagnostic access is allowed with a paid Stripe session or private owner test token;
- customer uploads a Shopify CSV;
- report is generated in the browser flow;
- annotated CSV is available only when safe output exists.

Current limits:

- no persistent order record;
- no persistent report record;
- no automatic post-payment email;
- no automatic report email;
- no magic report link;
- no customer account;
- no PDF or ZIP delivery;
- no storage layer for generated outputs.

## Principle

Build the smallest autonomy layer that removes manual owner work after payment.

Do not start with full accounts.
Do not start with an agency dashboard.
Do not start with a Shopify app.
Do not start with Google Merchant Center API.

Start with secure delivery and traceability.

## Phase A — Stripe webhook

### Goal

Record a paid checkout reliably without relying only on the browser returning to the success page.

### New route

```text
POST /api/stripe/webhook
```

### Required environment variable

```text
STRIPE_WEBHOOK_SECRET=<set in Vercel only>
```

### Events to handle first

| Stripe event | Purpose |
| --- | --- |
| `checkout.session.completed` | Create or update paid order. |
| `checkout.session.expired` | Mark unpaid session expired if recorded. |
| `charge.refunded` or refund event equivalent | Mark order refunded when needed. |

### Requirements

- verify Stripe signature;
- reject unsigned events;
- make processing idempotent;
- never expose webhook secret;
- store raw event ID to avoid duplicate processing;
- do not unlock diagnostic if payment is not paid/complete.

## Phase B — Database

### Recommended providers

Keep it simple:

- Supabase Postgres;
- Neon Postgres;
- Vercel Postgres or equivalent;
- another managed Postgres provider.

Avoid overbuilding.

### Minimal tables

#### `orders`

```text
id
stripe_session_id
stripe_payment_intent_id
customer_email
plan
amount
currency
status
created_at
paid_at
refunded_at
last_stripe_event_id
```

Status examples:

```text
created
paid
expired
refunded
failed
```

#### `reports`

```text
id
order_id
report_id
method_version
csv_filename
score
total_products
total_findings
needs_proof_count
do_not_change_yet_count
annotated_csv_available
html_report_url
annotated_csv_url
magic_token_hash
created_at
expires_at
```

#### `report_events`

```text
id
order_id
report_id
event_type
message
created_at
```

Event examples:

```text
order_paid
diagnostic_opened
csv_uploaded
report_generated
annotated_csv_generated
email_sent
email_failed
report_opened
```

## Phase C — Magic report links

### Goal

Let the customer reopen the report without creating a password account.

### Route

```text
/report/[reportId]?token=<private-token>
```

### Token rules

- generate random token server-side;
- store only token hash;
- send full token by email only;
- use expiration date;
- rotate token if leaked;
- do not expose customer email or raw token in logs.

### Access behavior

Valid token:

- show report summary;
- show row findings;
- show limitations;
- allow annotated CSV download if available.

Invalid token:

- show generic access error;
- do not reveal whether report exists.

Expired token:

- show expired link message;
- provide support contact.

## Phase D — Transactional emails

### Provider options

Use one simple provider:

- Resend;
- Postmark;
- SendGrid;
- Mailgun.

Recommended first choice: Resend or Postmark.

### Required email types

#### 1. Payment received

Trigger:

```text
checkout.session.completed
```

Purpose:

- confirm payment;
- explain next step;
- link to diagnostic area;
- remind customer to use a Shopify product CSV export;
- repeat no-guarantee/no-invented-facts boundary.

#### 2. Report ready

Trigger:

```text
report_generated
```

Purpose:

- provide magic report link;
- explain where to start;
- highlight needs-proof and do-not-change-yet rows;
- provide support email.

#### 3. Failure / support needed

Trigger:

```text
csv_upload_error or report_generation_error
```

Purpose:

- explain what failed;
- ask for a fresh Shopify product CSV if relevant;
- provide contact.

## Phase E — Storage

### What to store first

Store only what is required for customer delivery and support.

First layer:

- report metadata;
- report summary;
- row findings;
- annotated CSV if generated;
- report events.

Later layer:

- PDF report;
- ZIP package;
- customer history;
- agency exports.

### Storage options

- database for structured report data;
- object storage for CSV/PDF/ZIP files;
- signed URLs for downloads;
- expiration policy for sensitive files.

## Phase F — Security and privacy

### Rules

- never store raw diagnostic tokens;
- never commit secrets;
- never expose report links publicly;
- avoid logging full CSV contents;
- delete or expire uploaded/generated files according to data policy;
- keep customer support contact visible;
- do not store more product data than needed.

### Customer-facing boundaries

Every stored report must preserve:

- no Google approval guarantee;
- no account recovery guarantee;
- no invented product facts;
- no official Google support claim;
- manual review required where evidence is missing.

## Phase G — Implementation order

Build only after first controlled sales provide enough signal.

Recommended order:

1. Add database client and schema.
2. Add `orders` table.
3. Add Stripe webhook route.
4. Record paid orders from webhook.
5. Link success page to order lookup.
6. Add `reports` table.
7. Store generated report metadata.
8. Add magic token generation and hashing.
9. Add `/report/[reportId]` route.
10. Add payment received email.
11. Add report ready email.
12. Add basic retry/error logging.
13. Add object storage for annotated CSV.
14. Add signed download URLs.

Do not start with PDF or ZIP.

## Phase H — Acceptance tests

### Webhook

- valid Stripe signature accepted;
- invalid signature rejected;
- duplicate event does not create duplicate order;
- unpaid session does not unlock diagnostic;
- paid session creates paid order.

### Order record

- records correct plan;
- records correct amount and currency;
- records customer email when available;
- records paid timestamp;
- records refund status.

### Report record

- created after report generation;
- linked to order;
- stores counts and method version;
- stores whether annotated CSV exists;
- never stores fake product facts.

### Magic link

- valid token opens report;
- invalid token fails generically;
- expired token fails safely;
- token hash stored, raw token not stored.

### Emails

- payment email sent once;
- report email sent once;
- support/failure email safe;
- no secret or private token exposed except intended magic link.

## What not to build yet

Do not build until later:

- full user account system;
- password login;
- agency dashboard;
- subscriptions;
- multi-store history;
- Shopify app;
- Google Merchant Center API connection;
- public report gallery;
- automated product edits;
- bulk SEO generation around reports;
- PDF and ZIP before report-link delivery works.

## Decision gates

### Build Phase A/B only if

- first controlled sales show real value;
- payment and diagnostic flow work;
- customers ask to receive or reopen reports;
- manual delivery would slow the owner.

### Build email and magic links if

- customers need to return to reports;
- agencies want to forward/share output;
- report delivery by manual support becomes repetitive.

### Build PDF/ZIP later if

- customers specifically ask for downloadable evidence;
- agencies want client-facing deliverables;
- on-screen report is already working reliably.

## Final recommendation

After the first controlled sales, build in this order:

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

This creates the first real autonomous product layer without forcing full accounts too early.
