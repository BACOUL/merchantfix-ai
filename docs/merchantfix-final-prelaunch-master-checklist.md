# MerchantFix.ai — Final Prelaunch Master Checklist

Status: master checklist for the next production launch window.

Date: 2026-06-29

Primary domain:

```text
https://merchantfix-ai.com
```

Final support email:

```text
contact@merchantfix-ai.com
```

## Purpose

Use this checklist before any public launch, SEO push, Stripe live sale, or controlled customer test.

The goal is not to add features. The goal is to prove that the current MVP can be deployed, tested, purchased, and used without creating unsafe promises or broken customer flows.

## Launch rule

Do not launch publicly unless all critical checks are green:

```text
build green
unit tests green
Stripe checkout green
diagnostic gate green
CSV upload green
report rendering green
annotated CSV green
mobile Android green
robots/sitemap/llms green
support email ready
```

If one critical check fails, stop and fix it before sending traffic.

---

# 1. Local project health

## Commands

Run on PC from the repository root:

```bash
npm install
npm run typecheck
npm run test
npm run build
```

## Pass criteria

- `npm install` completes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.

## Stop rule

If typecheck, tests, or build fail, do not deploy production.

---

# 2. Environment variables

## Required Vercel variables

Confirm the production project has:

```text
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_URL=https://merchantfix-ai.com
APP_URL=https://merchantfix-ai.com
DIAGNOSTIC_TEST_TOKEN
```

## Pass criteria

- No variable points to an old domain.
- No variable points to `merchantfix.ai` or `merchantfix.com`.
- No test Stripe key is used in production mode.
- No live Stripe key is used in local/public screenshots.

## Stop rule

If the domain or Stripe environment is unclear, stop.

---

# 3. Domain and public routing

## URLs to verify

```text
https://merchantfix-ai.com
https://merchantfix-ai.com/scan
https://merchantfix-ai.com/fix-pack
https://merchantfix-ai.com/pricing
https://merchantfix-ai.com/sample-report
https://merchantfix-ai.com/supported-errors
https://merchantfix-ai.com/how-it-works
https://merchantfix-ai.com/how-to-export-shopify-csv
https://merchantfix-ai.com/contact
```

## Pass criteria

- Every URL returns HTTP 200.
- Pages use `merchantfix-ai.com` as the visible/canonical domain.
- No page shows the old support email.
- No page has a visible broken CTA.

---

# 4. Legal, trust, and safety pages

## URLs to verify

```text
https://merchantfix-ai.com/legal-notice
https://merchantfix-ai.com/privacy
https://merchantfix-ai.com/terms
https://merchantfix-ai.com/refund-policy
https://merchantfix-ai.com/data-handling
https://merchantfix-ai.com/security
```

## Pass criteria

- Every URL returns HTTP 200.
- Support email is `contact@merchantfix-ai.com`.
- No page promises Google approval, account recovery, ranking, traffic, sales, or official Google support.
- Refund and data-handling limits are clear.

---

# 5. Stripe checkout

## Test path

```text
/fix-pack -> checkout -> Stripe -> success page
```

## Pass criteria

- Checkout opens correctly.
- Product is the Fix Pack.
- Price is 29 EUR.
- Success URL returns to `/success?session_id=...`.
- Cancel URL returns to `/cancel`.
- Success page does not expose private Stripe details.

## Stop rule

If Stripe checkout fails or the wrong domain appears, stop.

---

# 6. Diagnostic gate

## What to test

Test the diagnostic flow with:

```text
valid Stripe paid session
valid DIAGNOSTIC_TEST_TOKEN
invalid token
missing token
```

## Pass criteria

- Paid/valid access can run the diagnostic.
- Invalid or missing access receives a controlled unauthorized/payment-required response.
- No private token is printed in the UI.
- No free bypass exists on the public paid diagnostic route.

---

# 7. Warning paste flow

## Page to test

```text
/scan
```

## Warnings to paste

Test at least:

```text
Missing value [gtin]
Invalid value [gtin]
Missing value [brand]
Missing value [mpn]
Conflicting identifier_exists
Missing value [title]
Invalid value [title]
Missing value [description]
Missing or invalid value [link]
Missing value [image_link]
Invalid value [availability]
Missing value [color]
Missing value [size]
Missing value [age_group]
Missing value [gender]
Mismatched value [price]
Mismatched value [availability]
Misrepresentation
```

## Pass criteria

- Warning is detected when supported.
- Unsupported warnings are handled gracefully.
- CTA and guidance are clear.
- `Read guide` links point to the correct exact-error page when available.

---

# 8. CSV test files

Prepare these local CSV files before launch:

```text
empty.csv
header-only-shopify-products.csv
clean-shopify-products.csv
issue-heavy-shopify-products.csv
apparel-errors-shopify-products.csv
malformed-shopify-products.csv
```

## issue-heavy-shopify-products.csv should include

```text
missing GTIN
invalid GTIN
duplicate GTIN
missing brand
missing MPN
identifier_exists conflict
missing title
invalid title
missing description
missing image
missing price
invalid availability
missing link when warning context mentions link
```

## apparel-errors-shopify-products.csv should include

```text
missing color
missing size
missing age_group
missing gender
variant option mapping cases
custom product edge cases
```

## Pass criteria

- Empty file is rejected safely.
- Header-only file is handled safely.
- Clean file does not create noisy false positives.
- Issue-heavy file produces useful row-level findings.
- Apparel file only flags apparel/context-sensitive issues when appropriate.
- Malformed file does not crash the app.

---

# 9. Report rendering

## What to verify

After uploading CSV and warning text, check:

```text
summary counts
issue categories
affected rows
evidence fields
recommended actions
manual_review flags
blocked/safe_note statuses
```

## Pass criteria

- Report renders on desktop.
- Report renders on Android mobile.
- No undefined/null technical text appears.
- No category appears with an empty or broken label.
- New categories such as `availability` and `apparel` display cleanly.

---

# 10. Annotated CSV output

## What to verify

Export or download the annotated CSV after diagnosis.

## Pass criteria

- Original product data is preserved.
- MerchantFix columns are added clearly.
- Notes explain the detected issue.
- No GTIN, MPN, brand, title, description, price, image, link, color, size, age_group, gender, shipping, tax, or product fact is invented.
- Manual-review rows are clearly flagged.

## Stop rule

If the app edits or invents product facts automatically, stop.

---

# 11. Supported errors page

## URL

```text
https://merchantfix-ai.com/supported-errors
```

## Expected status

```text
26 mapped families
9 strong CSV support
15 partial support
2 limited support
```

## Pass criteria

- Counts match the actual table.
- New product-data errors are visible.
- Guide links work.
- Limited support is clearly described as limited.

---

# 12. Exact-error SEO pages

## New expanded pages to verify

```text
/fix/google-merchant-center-missing-title
/fix/google-merchant-center-invalid-title
/fix/google-merchant-center-missing-description
/fix/google-merchant-center-invalid-link
/fix/google-merchant-center-missing-image-link
/fix/google-merchant-center-invalid-availability
/fix/google-merchant-center-missing-color
/fix/google-merchant-center-missing-size
/fix/google-merchant-center-missing-age-group
/fix/google-merchant-center-missing-gender
```

## Pass criteria

- Every page returns HTTP 200.
- Each page has useful title/metadata.
- Each page explains safe actions.
- No page promises Google approval.
- Pages link back to scan/fix-pack where appropriate.

---

# 13. Discovery files

## URLs to verify

```text
https://merchantfix-ai.com/robots.txt
https://merchantfix-ai.com/sitemap.xml
https://merchantfix-ai.com/llms.txt
```

## Pass criteria

- `robots.txt` returns HTTP 200.
- `sitemap.xml` returns HTTP 200 and includes public SEO pages.
- `llms.txt` returns HTTP 200 as plain text.
- `llms.txt` lists the main pages, exact-error pages, support boundaries, and correct support email.

---

# 14. Global metadata and social preview

## Known status

A metadata improvement is documented but may not yet be applied in `app/layout.tsx`.

Reference:

```text
docs/global-metadata-ai-social-upgrade.md
```

## Launch check

Verify:

- home page has clear title and description;
- OpenGraph tags exist if the patch has been applied;
- Twitter card tags exist if the patch has been applied;
- no missing OpenGraph image is referenced;
- canonical domain is `merchantfix-ai.com`.

## Note

Do not add fake image metadata until a real production OpenGraph image exists.

---

# 15. Android mobile QA

## Device path

Test with Android Chrome from the user's phone.

## Pages to test

```text
home
scan
fix-pack
pricing
supported-errors
sample-report
exact-error page
success page
```

## Pass criteria

- Header/menu usable.
- CTA buttons visible.
- CSV upload area understandable.
- Tables do not overflow badly.
- Report is readable.
- Stripe redirect works.

---

# 16. Support email readiness

## Final email

```text
contact@merchantfix-ai.com
```

## Pass criteria

- Inbox or forwarding is active.
- Test email can be received.
- Reply can be sent.
- Email is visible on contact/legal/support pages.
- Stripe support email matches or forwards to the same inbox.

## Stop rule

Do not take paid traffic if support email is not reachable.

---

# 17. Customer promise review

Before launch, scan the homepage, pricing, fix-pack, supported-errors, report, and legal pages for unsafe promises.

## Forbidden promises

Do not claim:

```text
guaranteed Google approval
guaranteed account recovery
guaranteed ranking
guaranteed traffic
guaranteed sales
official Google support
automatic correction of product facts
legal/tax/shipping compliance advice
```

## Approved positioning

Use:

```text
Shopify-focused Google Merchant Center product-data diagnostic tool.
Row-level CSV review.
Safe manual-review notes.
No invented product facts.
Merchant must verify facts before editing Shopify or resubmitting to Google.
```

---

# 18. Launch decision

## Green launch

Launch only if:

```text
all critical tests pass
Stripe works
support works
CSV/report works
mobile works
SEO discovery files work
no unsafe promises are present
```

## Yellow launch

Controlled test only if:

```text
minor copy issue exists
non-critical metadata issue exists
OpenGraph is incomplete but pages work
one low-traffic SEO page needs correction
```

## Red launch

Do not launch if:

```text
build fails
Stripe fails
diagnostic gate fails
CSV upload crashes
report does not render
annotated CSV invents facts
support email fails
wrong domain appears
unsafe promise appears
```

---

# 19. Post-launch smoke test

Immediately after deployment, test:

```text
home
scan
fix-pack
Stripe test/live flow depending on environment
success page
supported-errors
one old exact-error page
one new exact-error page
robots.txt
sitemap.xml
llms.txt
contact email
Android mobile
```

Record:

```text
deployment URL
production URL
commit SHA
Stripe mode tested
result green/yellow/red
issues found
fixes needed
```

---

# 20. Next work only after green launch

Do not build these before the current MVP is green:

```text
customer accounts
agency dashboard
subscription billing
Shopify app
Google Merchant Center API integration
PDF/ZIP premium pack
mass SEO generation
full automation layer
```

After green launch, the recommended next product layer is:

```text
Stripe webhook
orders table
reports table
stored annotated CSV/report
magic report link
transactional emails
retrieve my report page
```

This layer supports SEO/passive acquisition without requiring heavy manual delivery.
