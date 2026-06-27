# MerchantFix.ai — Implementation Backlog

This backlog turns the strategic roadmap into executable tasks.

It must be used in order. Do not jump to P2 or P3 work before the P0 launch blockers are resolved.

## Priority definitions

| Priority | Meaning | Rule |
| --- | --- | --- |
| P0 | Required before controlled sales | Must be completed or explicitly accepted as risk before selling. |
| P1 | Required for autonomous delivery | Build after first sales prove demand. |
| P2 | Required for world-class trust and conversion | Build after the product is selling and delivery works. |
| P3 | Required for scale | Build after repeat demand is proven. |

## Execution rules

1. Work on one ticket at a time.
2. Each ticket must have a clear acceptance test.
3. No unsafe Google approval, account recovery, ranking, sales, GTIN, MPN, or brand promise may be introduced.
4. Do not add platform complexity before the next gate requires it.
5. Prefer small pull requests.
6. Every code PR must preserve the guarded diagnostic access model.
7. Every customer-facing output must remain clear for a non-technical Shopify merchant.
8. Do not commit secrets or private test tokens.

---

# P0 — Sellable MVP blockers

## P0-01 — Verify Stripe Fix Pack checkout

Objective:

Confirm that the active paid offer is exactly the 29 EUR Fix Pack and that checkout creates the expected Stripe session.

Scope:

- verify `/api/checkout` only accepts the active Fix Pack product;
- verify the amount is 2900 cents;
- verify currency is EUR;
- verify success URL returns to `/success?session_id={CHECKOUT_SESSION_ID}`;
- verify cancel URL returns to `/cancel`;
- verify unknown plans are rejected.

Acceptance tests:

- test checkout starts correctly in Stripe test mode;
- unknown product returns an error;
- success page receives `session_id`;
- no inactive product is accidentally offered.

Do not:

- add subscriptions;
- add Pro Review checkout;
- add agency pricing;
- add coupon complexity.

---

## P0-02 — Verify diagnostic access gate

Objective:

Ensure `/diagnostic` and `/api/analyze` are not usable without a valid paid Stripe session or private `DIAGNOSTIC_TEST_TOKEN`.

Scope:

- verify unpaid access is blocked;
- verify wrong test token is blocked;
- verify correct private test token works;
- verify paid Stripe session works;
- verify expired or fake session is blocked;
- verify error messages are clear.

Acceptance tests:

- `/diagnostic` without token/session shows locked state;
- `/api/analyze` without token/session returns forbidden/payment-required response;
- `/diagnostic?test_token=<valid>` allows owner QA;
- `/diagnostic?test_token=wrong` fails;
- paid session allows analysis.

Do not:

- expose the private test token;
- make `/diagnostic` public;
- bypass Stripe verification for normal customers.

---

## P0-03 — Validate CSV analyzer with repository test files

Objective:

Confirm the analyzer handles clean, issue-heavy, empty, invalid, and non-Shopify CSVs without confusing the customer.

Scope:

- run clean Shopify sample;
- run issue-heavy Shopify sample;
- run empty CSV;
- run non-Shopify CSV;
- run malformed CSV;
- verify summary, counts, issues, report model, and annotated CSV.

Acceptance tests:

- clean CSV does not produce false critical panic;
- issue-heavy CSV detects supported problems;
- empty CSV returns clear error;
- unrecognized CSV returns clear error;
- annotated CSV preserves original data;
- no identifiers are invented.

Do not:

- silently modify customer product data;
- guess GTIN, MPN, brand, price, or image values;
- hide manual-review rows.

---

## P0-04 — Improve customer-facing CSV error messages

Objective:

Make upload failures understandable without owner support.

Scope:

- improve empty CSV message;
- improve unrecognized columns message;
- improve invalid file message;
- add expected Shopify columns examples;
- add a link to the Shopify CSV export guide;
- explain that the customer should upload an unmodified Shopify product export.

Acceptance tests:

- a non-technical merchant understands what went wrong;
- the next action is clear;
- user can recover without emailing support in most cases.

Do not:

- expose technical parser details;
- blame the customer;
- suggest unsafe manual feed edits.

---

## P0-05 — Review all public copy for unsafe claims

Objective:

Guarantee that no page promises Google approval, account recovery, rankings, traffic, sales, or fake automatic fixes.

Scope:

Search public-facing files for risky wording:

- guarantee;
- approve;
- approval;
- recover;
- suspension;
- fix automatically;
- repair GTIN;
- generate GTIN;
- increase sales;
- guaranteed performance;
- tax compliant;
- legal advice.

Acceptance tests:

- all risky wording is removed or safely qualified;
- product positioning remains strong but accurate;
- limitations are visible before and after purchase.

Do not:

- weaken the product into vague language;
- add legalistic overload to every page;
- remove strong but safe value propositions.

---

## P0-06 — Verify mobile experience on key routes

Objective:

Ensure the site is usable on Android and narrow screens.

Scope:

Test:

- `/`;
- `/fix-pack`;
- `/pricing`;
- `/sample-report`;
- `/supported-errors`;
- `/success`;
- `/diagnostic`;
- report output;
- affected products table;
- annotated CSV block.

Acceptance tests:

- no horizontal overflow except deliberate scrollable tables;
- CTAs are visible;
- upload flow is readable;
- report is understandable;
- table scroll is usable.

Do not:

- redesign the full UI;
- add new design system complexity.

---

## P0-07 — Add or verify required legal/trust pages

Objective:

A global customer must be able to understand privacy, terms, refunds, and data handling before uploading a CSV.

Scope:

Required pages:

- `/privacy`;
- `/terms`;
- `/refund-policy`;
- `/data-handling`;
- `/contact`.

Minimum content:

- what data is uploaded;
- what the diagnostic does;
- what MerchantFix does not guarantee;
- support email;
- refund limits for digital diagnostic;
- deletion request route;
- no public sharing of customer CSVs.

Acceptance tests:

- pages exist;
- footer or relevant pages link to them;
- no claim contradicts product guardrails;
- data handling is understandable.

Do not:

- pretend to be legal counsel;
- copy complex legal templates blindly;
- overpromise data deletion if infrastructure is not built yet.

---

## P0-08 — Make report output more decision-oriented

Objective:

Turn the report from a technical result into a merchant-friendly action plan.

Scope:

Add or improve report sections:

- executive summary;
- top 3 actions;
- do this first;
- do not touch yet;
- evidence checklist;
- row findings explanation;
- safe note vs manual review vs blocked explanation.

Acceptance tests:

- merchant understands the next steps in under 60 seconds;
- report does not require technical feed knowledge;
- manual-review rows are not confused with fixes;
- blocked rows are clearly not safe to automate.

Do not:

- add PDF export yet;
- create fake certainty;
- overcomplicate with too many metrics.

---

## P0-09 — Create first prospect tracker template

Objective:

Create a simple CSV template to track agencies, freelancers, merchants, warning examples, and follow-ups.

Scope:

Create:

- `docs/prospecting-tracker-template.csv`

Columns:

- ID;
- Name;
- Type;
- Website;
- Contact;
- Country;
- Shopify evidence;
- Merchant Center evidence;
- Warning type;
- Message sent;
- Response;
- Warning collected;
- CSV possible;
- Fix Pack sold;
- Notes;
- Follow-up date.

Acceptance tests:

- file opens in Google Sheets/Excel;
- columns match `first-sales-playbook.md`;
- no private prospect data is committed.

Do not:

- commit real leads or emails;
- turn the template into a CRM.

---

## P0-10 — Final July 9 deployment runbook

Objective:

Create a strict go/no-go sequence for the first day Vercel is available again.

Scope:

Update or create a runbook covering:

- environment variables;
- deploy;
- Stripe test mode;
- private token diagnostic;
- public page QA;
- mobile QA;
- paid session QA;
- first customer link sharing;
- rollback criteria.

Acceptance tests:

- owner can follow it step by step;
- every step has expected result;
- Red blocker means no sales.

Do not:

- include real secrets;
- assume Vercel preview headers are production-safe.

---

# P1 — Autonomous delivery

## P1-01 — Add Stripe webhook

Objective:

Record orders reliably when payment succeeds, fails, expires, or is refunded.

Scope:

- add `/api/stripe/webhook`;
- verify Stripe signature;
- handle `checkout.session.completed`;
- handle refund/payment events when needed;
- store order status;
- log safe event metadata.

Acceptance tests:

- valid webhook creates/updates order;
- invalid signature rejected;
- duplicate webhook handled safely;
- no secret logged.

Do not:

- trust client-side payment state;
- expose Stripe secret;
- build subscriptions yet.

---

## P1-02 — Add order/report database

Objective:

Persist orders and generated reports so customers can retrieve deliverables.

Scope:

Tables:

- orders;
- reports;
- report_events.

Acceptance tests:

- order exists after paid checkout;
- report record created after successful diagnostic;
- report can be retrieved by internal ID;
- sensitive tokens are hashed or safely stored.

Do not:

- store unnecessary raw CSV forever;
- add complex account auth yet.

---

## P1-03 — Add magic report links

Objective:

Let a customer reopen a report without creating an account.

Scope:

- generate magic token after report creation;
- store token hash;
- create `/report/[reportId]?token=...`;
- enforce expiration or revocation policy;
- show report and downloads if authorized.

Acceptance tests:

- valid token opens report;
- missing token rejected;
- wrong token rejected;
- expired token rejected when expiration is active.

Do not:

- expose reports publicly;
- put customer email or raw CSV in the URL.

---

## P1-04 — Add transactional emails

Objective:

Send automatic customer emails after payment and after report generation.

Scope:

- choose email provider;
- create payment confirmation email;
- create diagnostic instructions email;
- create report ready email;
- include support email;
- include no-guarantee reminder.

Acceptance tests:

- email sent after payment;
- email sent after report generation;
- links work;
- no spammy wording;
- no secret or private token included.

Do not:

- add newsletters;
- add marketing sequences;
- overcomplicate with templates.

---

## P1-05 — Add PDF export

Objective:

Generate a premium PDF report from the structured HTML report.

Scope:

- define PDF-specific report layout;
- integrate PDF service;
- generate PDF after report creation;
- store PDF URL;
- include report ID, date, limitations, evidence checklist;
- keep PDF safe and readable.

Acceptance tests:

- PDF generated for clean report;
- PDF generated for issue-heavy report;
- PDF layout does not break on long product names;
- no invented data appears;
- PDF link is included in report ready email.

Do not:

- generate PDF directly from raw CSV;
- add complex branding options yet.

---

## P1-06 — Add ZIP delivery

Objective:

Provide a single downloadable package containing the customer deliverables.

Scope:

ZIP contents:

- PDF report;
- annotated CSV when available;
- README with next steps and limitations.

Acceptance tests:

- ZIP generated after report;
- ZIP contains expected files;
- ZIP link works;
- customer can understand README.

Do not:

- include raw original CSV unless explicitly required and disclosed;
- include private internal logs.

---

# P2 — Trust, conversion, quality

## P2-01 — Add privacy-friendly analytics

Objective:

Measure funnel conversion and failures.

Scope:

Track:

- page views;
- paste warning analyzed;
- Fix Pack CTA clicked;
- checkout started;
- checkout completed;
- diagnostic opened;
- CSV upload failed;
- report generated;
- annotated CSV downloaded.

Acceptance tests:

- events visible in analytics dashboard;
- no raw CSV data tracked;
- no private tokens tracked;
- conversion drop-offs visible.

Do not:

- add invasive tracking;
- send PII unnecessarily.

---

## P2-02 — Improve sample report page

Objective:

Make the sample report sell the product before checkout.

Scope:

- show realistic scenario;
- show report sections;
- show CSV annotation example;
- show limitations;
- add CTA to Fix Pack;
- explain what customer receives.

Acceptance tests:

- visitor understands output before paying;
- no fake guarantee;
- page supports sales conversation.

Do not:

- use real customer data;
- imply every report produces the same outcome.

---

## P2-03 — Improve supported errors taxonomy

Objective:

Make supported/partial/unsupported cases explicit.

Scope:

Categories:

- supported;
- partially supported;
- not supported;
- manual review required;
- outside current scope.

Acceptance tests:

- customer knows whether their warning fits;
- bad-fit leads are filtered before payment;
- no overpromise.

Do not:

- claim to support full Merchant Center policy recovery.

---

# P3 — Scale and agency

## P3-01 — Build agency 10-pack offer

Objective:

Offer repeat diagnostics to agencies after one-off demand is proven.

Scope:

- pricing page section;
- checkout plan;
- usage counter or manual allocation;
- report client name field;
- agency-specific FAQ.

Acceptance tests:

- agency can buy 10 diagnostics;
- usage is trackable;
- support burden remains manageable.

Do not:

- launch before agencies ask for repeat usage.

---

## P3-02 — Build SEO page expansion system

Objective:

Create high-quality exact-intent pages for Merchant Center warning searches.

Scope:

- structured error data file;
- page template;
- internal links;
- CTA strategy;
- FAQ schema where appropriate;
- sitemap inclusion.

Acceptance tests:

- pages are unique and useful;
- pages do not contain thin duplicated content;
- pages drive paste-warning or Fix Pack CTA.

Do not:

- generate hundreds of low-quality pages at once;
- target warnings outside current diagnostic scope.

---

## P3-03 — Evaluate Shopify app only after demand

Objective:

Avoid prematurely building a Shopify app unless manual CSV upload blocks growth.

Trigger conditions:

- repeated customer requests;
- agencies need direct import;
- CSV upload reduces conversion;
- one-off sales are proven.

Acceptance tests:

- there is evidence that app access improves revenue or usage;
- permissions and review requirements are understood.

Do not:

- start Shopify app work before Phase 1 and Phase 2 proof.

---

# Current recommended next ticket order

1. P0-09 — Create prospect tracker template.
2. P0-05 — Review public copy for unsafe claims.
3. P0-04 — Improve customer-facing CSV error messages.
4. P0-08 — Make report output more decision-oriented.
5. P0-07 — Add or verify legal/trust pages.
6. P0-10 — Final July 9 deployment runbook.
7. P0-01/P0-02/P0-03/P0-06 — Run full QA when local/Vercel access allows.

## Final reminder

The product should not try to look world-class by becoming complex too early.

It becomes world-class by passing each gate:

```text
Paid customer -> useful report -> autonomous delivery -> trusted product -> scalable SEO -> repeat agency usage
```
