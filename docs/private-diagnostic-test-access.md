# Private unpaid diagnostic test access

MerchantFix supports a private unpaid test mode for the owner before PDFShift, live sales, or broader production activation.

The goal is to test the full diagnostic flow without paying through Stripe every time:

```text
/private test URL -> /diagnostic -> upload Shopify CSV -> /api/analyze -> structured report -> annotated CSV
```

## Existing test mode

The production diagnostic area accepts a private query parameter:

```text
/diagnostic?test_token=<DIAGNOSTIC_TEST_TOKEN>
```

The API also accepts the same token through form data:

```text
diagnosticTestToken=<DIAGNOSTIC_TEST_TOKEN>
```

When the token matches the server environment variable, the user can test the diagnostic flow without a paid Stripe session.

## Required environment variable

Set this private server-side variable:

```text
DIAGNOSTIC_TEST_TOKEN=<long-random-private-token>
```

Recommended token format:

```text
merchantfix-test-2026-<at-least-32-random-characters>
```

Do not use a short token such as `test`, `1234`, or `merchantfix`.

## Owner test URL

After setting the variable, use:

```text
https://<production-domain>/diagnostic?test_token=<DIAGNOSTIC_TEST_TOKEN>
```

Example placeholder:

```text
https://merchantfix-ai.vercel.app/diagnostic?test_token=merchantfix-test-2026-change-me
```

Replace the token with the real private value.

## What to test before PDFShift

Run this checklist before adding PDF generation:

1. Open the private diagnostic URL.
2. Confirm the page shows `Test access verified`.
3. Upload `docs/test-cases/shopify-sample-clean.csv`.
4. Upload `docs/test-cases/shopify-sample-issues.csv`.
5. Paste at least one exact Merchant Center warning.
6. Confirm the report panel appears after upload.
7. Confirm the report shows:
   - Product Data Readiness score;
   - report ID;
   - method version;
   - product counts;
   - top issues;
   - row findings;
   - evidence needed;
   - credibility rules;
   - limitations.
8. Confirm annotated CSV download works when available.
9. Confirm manual-review rows do not pretend to be automatically fixed.
10. Confirm the report never says Google approval is guaranteed.

## Security rules

- Never publish the private test URL.
- Never add the real token to GitHub, README examples, screenshots, or public pages.
- Rotate the token if it is accidentally shared.
- Keep test mode for owner QA only, not for customers.
- For real customers, use Stripe checkout access.

## Pass/fail before PDFShift

PDFShift should not be integrated until this test flow passes:

| Check | Required result |
| --- | --- |
| Private test URL opens | Pass |
| Unauthorized `/diagnostic` stays locked | Pass |
| CSV upload works | Pass |
| Report panel appears | Pass |
| Evidence needed appears | Pass |
| Annotated CSV download works where applicable | Pass |
| No fake GTIN/MPN/brand is generated | Pass |
| No Google approval guarantee appears | Pass |

If any item fails, fix the diagnostic/report flow before building PDF export.
