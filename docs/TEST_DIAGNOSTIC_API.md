# Test MerchantFix CSV diagnostic before payments

This checklist is for private validation before enabling real payments.

## 1. Verify production is updated

Open:

```txt
https://merchantfix-ai.vercel.app/release.txt
```

The file should exist. If it does not exist, Vercel production is still serving an old deployment.

## 2. Add private diagnostic test token in Vercel

Create a long private value, then add it to Vercel environment variables using this variable name:

```txt
DIAGNOSTIC_TEST_TOKEN
```

Apply it to the environment you want to test, then redeploy.

Do not commit this token. Do not share it publicly.

## 3. Open the private diagnostic test URL

```txt
https://merchantfix-ai.vercel.app/diagnostic?test_token=YOUR_PRIVATE_TOKEN
```

Expected result: the page should show test access verified and display the CSV upload form.

## 4. Download the fictional test CSV

```txt
https://merchantfix-ai.vercel.app/samples/merchantfix-test-shopify.csv
```

This file contains fictional Shopify-like product rows with known test cases:

- missing GTIN
- missing brand
- invalid-looking GTIN
- duplicate GTIN
- SKU used as MPN
- missing image
- missing price

## 5. Upload the test CSV

On the private diagnostic page:

1. Paste an optional Merchant Center warning text.
2. Upload `merchantfix-test-shopify.csv`.
3. Generate the diagnostic report.

Expected result: the diagnostic API should return a report with critical issues, warnings, manual review flags, and safe correction guidance.

## 6. Confirm public access is still locked

Open this URL without token:

```txt
https://merchantfix-ai.vercel.app/diagnostic
```

Expected result: diagnostic locked.

Also confirm the homepage anchor is not a public CSV form:

```txt
https://merchantfix-ai.vercel.app/#csv-diagnostic
```

Expected result: Fix Pack CTA block, not upload form.

## 7. Later payment production env

After API test is validated, configure the payment environment variables in Vercel.

Then test the paid flow:

```txt
/pricing -> Buy Fix Pack -> Checkout -> /success?session_id=... -> /diagnostic?session_id=... -> upload CSV -> report
```
