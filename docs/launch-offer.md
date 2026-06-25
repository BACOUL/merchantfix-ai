# MerchantFix launch offer

Date: 2026-06-25

Status: first-sales validation offer.

## Active public offer

MerchantFix launches with one free entry point and one paid product:

1. **Free Scan — 0 €**
   - Public Shopify URL surface scan.
   - No login.
   - No Shopify admin access.
   - Good first step when public product data is accessible.

2. **Fix Pack — 29 €**
   - One-time paid Shopify CSV diagnostic.
   - Row-level checks for supported Merchant Center product-data issues.
   - Annotated CSV only when safe notes or deterministic changes are available.
   - Manual review rows when data must not be guessed.

## Inactive during launch

**Pro Review is not sold during first-sales validation.**

Reason: the first commercial test should not create offer confusion. The goal is to validate whether merchants will pay for a simple row-level CSV diagnostic before adding manual review, priority service, subscriptions, or agency packages.

## Checkout rule

`/api/checkout` must accept only:

```json
{ "plan": "fix-pack" }
```

Any other plan must return an error.

## Validation threshold

The offer can be expanded only after at least one of these signals:

- 3 paid Fix Pack purchases from real merchants or agencies.
- 5 serious conversations where the buyer asks for manual/prioritized review.
- Evidence that agencies want recurring or bulk CSV diagnostics.
