# Codex Prompt 09 — Create SEO Error Page

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Create the first SEO error page for MerchantFix.ai.

This task must create a high-intent, long-tail SEO page targeting a specific Google Merchant Center error that matches the V1 product scope.

The first SEO page must target:

Missing GTIN in Google Merchant Center for Shopify products.

Do not implement payment, authentication, database, AI, Shopify API, Google Merchant Center API, PDF, ZIP, subscriptions, monitoring, or Shopify app.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues, starting with GTIN, MPN, brand, and identifier_exists problems.

The SEO strategy is Sniper SEO: target exact error phrases and panic searches instead of broad ecommerce keywords.

The page must be useful even if the visitor does not buy.

The page must provide a manual fix first, then explain how MerchantFix.ai can help.

## Page to create

Create:

app/fix/missing-gtin-google-merchant-center/page.tsx

If the project structure requires a different routing convention, use the correct Next.js App Router structure.

## Target URL

/fix/missing-gtin-google-merchant-center

## Target keyword

missing GTIN Google Merchant Center

## Secondary keywords

missing GTIN Shopify

Google Merchant Center GTIN error

Shopify missing barcode Google Shopping

product identifiers not provided Google Merchant Center

identifier_exists Google Merchant Center

Google Shopping missing GTIN

## Recommended H1

Missing GTIN in Google Merchant Center: How to Fix It for Shopify Products

## Search intent

The visitor has probably seen a Google Merchant Center warning or disapproval related to missing GTIN, product identifiers, or barcode data.

The visitor wants to understand:

What the error means.

Why Google is asking for GTIN.

Whether Shopify has the data.

Whether SKU can be used.

Whether identifier_exists should be changed.

How to avoid making the problem worse.

How MerchantFix.ai can detect affected rows.

## Required page structure

The page must include these sections:

1. Hero section.

2. What this error means.

3. Why Google Merchant Center asks for GTIN.

4. Why this happens on Shopify.

5. Manual fix checklist.

6. What not to do.

7. When identifier_exists may matter.

8. How MerchantFix.ai can help.

9. What MerchantFix.ai cannot guarantee.

10. FAQ.

11. CTA section.

12. Mandatory disclaimer.

## Hero section

Include:

H1:

Missing GTIN in Google Merchant Center: How to Fix It for Shopify Products

Short intro:

If Google Merchant Center is flagging missing GTIN values, your Shopify products may be missing real product identifier data. This guide explains what to check, what not to fake, and how MerchantFix.ai can scan your Shopify CSV for affected rows.

Primary CTA:

Scan My Shopify CSV

Secondary CTA:

Paste Merchant Center Error

## What this error means

Explain in plain English:

GTIN is a real product identifier.

Google may use it to understand branded products.

If GTIN is missing when expected, products may be limited, warned, or disapproved.

The exact outcome depends on product type, account status, country, and Google policies.

Do not claim every missing GTIN causes disapproval.

## Why Google asks for GTIN

Explain:

GTIN helps identify commercial products.

Branded products often have manufacturer identifiers.

Some products may use GTIN, MPN, and brand data.

Custom, handmade, personalized, or made-to-order products may need different identifier logic.

Do not invent GTIN.

## Why this happens on Shopify

Explain likely causes:

Variant Barcode is empty.

Barcode exists in Shopify but was not exported or synced.

The product has SKU but no real barcode.

The product is custom or handmade.

The Google sales channel may send identifier data inconsistently.

identifier_exists may be incorrect.

Vendor or brand data may be missing.

## Manual fix checklist

Include practical steps:

Open the product in Shopify.

Check Variant Barcode.

Confirm whether the product has a real GTIN from packaging or manufacturer data.

Check whether the product has a real MPN.

Check Vendor or Brand.

Review whether the product is custom, handmade, personalized, or made to order.

Do not use SKU as GTIN.

Do not invent barcode values.

Review identifier_exists only when the product truly has no manufacturer identifiers.

Resync or resubmit after correcting data.

## What not to do

Warn clearly:

Do not generate fake GTIN values.

Do not copy SKU into GTIN.

Do not copy SKU into MPN unless it is truly the manufacturer part number.

Do not invent brand.

Do not assume identifier_exists=no is always correct.

Do not expect a CSV change to fix account-level issues.

Do not expect guaranteed Google approval.

## When identifier_exists may matter

Explain:

identifier_exists tells Google whether product identifiers exist.

If a product has real identifiers, they should be provided.

If a product is custom, handmade, personalized, or made to order and truly has no manufacturer identifier, identifier_exists may need review.

Changing identifier_exists incorrectly can create more problems.

MerchantFix.ai can flag rows where identifier_exists conflicts with missing GTIN or MPN.

## How MerchantFix.ai can help

Explain:

MerchantFix.ai can scan a Shopify CSV.

It can detect rows with missing GTIN.

It can detect rows with missing MPN.

It can detect identifier_exists conflicts.

It can detect missing brand or vendor.

It can detect invalid-looking GTIN values.

It can detect duplicate GTIN values.

It can add merchantfix_notes.

It can generate a corrected CSV when the correction is safe.

It marks uncertain rows for manual review.

It does not invent product identifiers.

## What MerchantFix.ai cannot guarantee

Explain:

Google approval is not guaranteed.

Some rows require manual verification.

Some issues are website-level or account-level.

Misrepresentation and suspensions are not fixed by GTIN changes alone.

MerchantFix.ai cannot create real GTIN values.

MerchantFix.ai cannot confirm manufacturer data unless the user provides it.

## FAQ section

Include at least these questions:

What is a GTIN?

Where is GTIN stored in Shopify?

Is Variant Barcode the same as GTIN?

Can I use SKU as GTIN?

Can I use SKU as MPN?

What if my product is handmade or custom?

Should I set identifier_exists to no?

Will fixing GTIN guarantee Google approval?

Can MerchantFix.ai generate a GTIN?

Can MerchantFix.ai find affected rows in my Shopify CSV?

## CTA section

Headline:

Find missing GTIN rows in your Shopify CSV.

Text:

Upload your Shopify product export or paste your Merchant Center error. MerchantFix.ai will identify affected rows, explain what needs review, and generate a corrected CSV when the fix is safe.

CTA:

Scan My Shopify CSV

Secondary CTA:

Paste Merchant Center Error

## Mandatory disclaimer

Display this exact text:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## Internal links

If the target pages do not exist yet, add links carefully or leave TODO comments.

Potential future links:

/fix/incorrect-identifier-exists-shopify

/fix/missing-mpn-google-merchant-center

/fix/google-merchant-center-gtin-mpn-error

/fix/shopify-products-disapproved-google-merchant-center

Do not create those pages in this prompt unless explicitly asked.

## Metadata

Add Next.js metadata if the project supports it.

Title:

Missing GTIN Google Merchant Center: Shopify Fix Guide | MerchantFix.ai

Description:

Learn how to fix missing GTIN errors in Google Merchant Center for Shopify products. Check barcodes, identifier_exists, MPN, brand, and affected CSV rows.

Do not overpromise.

## Design requirements

Use a clean professional B2B layout.

Use readable typography.

Use sections with clear headings.

Use cards or callout boxes for warnings.

Use a clear CTA.

Use responsive design.

Avoid heavy animations.

Avoid aggressive marketing language.

## Forbidden claims

Do not say:

Guaranteed approval.

Get approved now.

Recover your account instantly.

Fix all Merchant Center issues.

Generate GTIN automatically.

MerchantFix.ai will restore Google Shopping.

MerchantFix.ai fixes misrepresentation automatically.

## V1 limitations

The page may mention that MerchantFix.ai V1 focuses on Shopify CSV identifier checks.

Do not claim support for price mismatch, availability mismatch, misrepresentation recovery, Google API, Shopify API, or monitoring unless clearly marked as not part of V1.

## Safety rules

Never invent GTIN.

Never invent MPN.

Never invent brand.

Never guarantee Google approval.

Never promise account recovery.

Never claim automatic misrepresentation recovery.

Manual review must be mentioned for uncertain cases.

## Definition of Done

The SEO page exists at the correct route.

The page targets missing GTIN Google Merchant Center.

The page is useful without requiring purchase.

The page includes manual fix steps.

The page includes what not to do.

The page explains identifier_exists cautiously.

The page explains how MerchantFix.ai can help.

The page includes limitations.

The page includes the mandatory disclaimer.

The page does not add payment.

The page does not add authentication.

The page does not add database.

The page does not add AI.

The page does not add Shopify API.

The page does not add Google API.

The page does not add PDF or ZIP.

The page does not make forbidden claims.

## Output expectation

Return the full created page file.

Return any metadata changes if necessary.

Do not create additional SEO pages.

Do not implement product features.

Do not implement payment, authentication, database, AI, APIs, PDF, ZIP, or monitoring.
