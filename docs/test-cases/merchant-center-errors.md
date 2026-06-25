# Merchant Center warning QA cases

Date: 2026-06-25

Use these copy-paste warnings to test the homepage error-first flow and the messaging around supported Merchant Center issues.

## Case 1 — Missing GTIN

```text
Missing value [gtin]
Some of your products are missing a required product identifier. Add the GTIN value where available before resubmitting the products.
```

Expected result:

- MerchantFix should identify GTIN / barcode as the main field to check.
- It should warn not to invent GTIN values.
- It should route the user toward Fix Pack when affected rows are needed.

## Case 2 — Invalid GTIN

```text
Invalid value [gtin]
The value submitted for GTIN is not valid. Review the product identifier and resubmit accurate data.
```

Expected result:

- MerchantFix should identify GTIN format or length as the likely check.
- It should not suggest generating a replacement GTIN.

## Case 3 — Missing brand

```text
Missing value [brand]
Submit the brand value for your product. The brand should match the manufacturer or official product brand.
```

Expected result:

- MerchantFix should point to brand, vendor, or feed mapping review.
- It should not invent a brand.

## Case 4 — Missing MPN

```text
Missing value [mpn]
A manufacturer part number is required when a GTIN is not available.
```

Expected result:

- MerchantFix should explain that SKU must not be copied into MPN unless it is truly the manufacturer part number.

## Case 5 — identifier_exists conflict

```text
Invalid value [identifier_exists]
The value for identifier_exists conflicts with the product identifiers submitted for this item.
```

Expected result:

- MerchantFix should point to identifier_exists, GTIN, MPN, and brand consistency.
- It should flag custom or handmade products as manual review, not automatic fix.

## Case 6 — Price mismatch

```text
Mismatched value [price]
The price in your product data does not match the landing page price.
```

Expected result:

- MerchantFix should treat this as a CSV/checklist-level indicator.
- It must not claim full Merchant Center validation.

## Case 7 — Availability mismatch

```text
Mismatched value [availability]
The availability in your product data does not match the availability shown on your landing page.
```

Expected result:

- MerchantFix should point to Shopify product status, variant availability, and feed mapping review where supported.
- It must not claim live Google validation.

## Case 8 — Image issue

```text
Image too small or missing image [image_link]
Your product image is missing or does not meet image quality requirements.
```

Expected result:

- MerchantFix should point to image fields and product media review.
- It should route to CSV diagnosis if affected rows are needed.

## Case 9 — Misrepresentation / account-level issue

```text
Misrepresentation
Your account or products may not comply with Shopping ads policies. Review your website, business information, checkout, returns, and product data.
```

Expected result:

- MerchantFix should be cautious.
- It must not present this as an automatic fix or account recovery product.
- It can provide checklist-level guidance only.

## Case 10 — Limited performance

```text
Limited performance due to missing product identifiers
Products may have limited visibility because key product identifiers are missing or incomplete.
```

Expected result:

- MerchantFix should point to GTIN, MPN, brand, identifier_exists, and manual review.
- It should avoid approval or ranking guarantees.
