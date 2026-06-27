# MerchantFix.ai — Warning Examples for QA

Status: controlled QA examples only.

Use these warning texts in the paste-warning form and diagnostic context field. They are not customer data.

## Strong-fit examples

### Missing GTIN

```text
Missing value [gtin]
Your product is missing a required product identifier. Add a valid GTIN if one exists.
```

Expected result:

- maps to Shopify identifier fields;
- warns not to invent identifiers;
- suggests CSV diagnosis if multiple products are affected.

### Invalid GTIN

```text
Invalid value [gtin]
The submitted product identifier is not valid.
```

Expected result:

- explains that the value must be checked against packaging, supplier, or manufacturer data;
- does not generate a replacement identifier.

### Missing brand

```text
Missing value [brand]
Add a brand value for this product.
```

Expected result:

- maps to Shopify vendor or brand-like fields;
- warns not to invent a brand.

### Missing MPN

```text
Missing value [mpn]
Add an MPN if the product has a manufacturer part number.
```

Expected result:

- explains that SKU must not be copied into MPN unless it is truly the manufacturer part number.

### Identifier exists conflict

```text
identifier_exists is true, but no GTIN or MPN was submitted.
```

Expected result:

- flags as identifier consistency issue;
- explains custom, handmade, personalized, or made-to-order review;
- requires merchant verification.

## Partial-fit examples

### Price mismatch

```text
Price mismatch between landing page and product data.
```

Expected result:

- explains that MerchantFix can review CSV-level price fields;
- does not guarantee live crawl or checkout verification.

### Availability mismatch

```text
Availability mismatch between landing page and product data.
```

Expected result:

- explains that Shopify status and availability fields can be checked;
- requires live storefront verification.

### Image issue

```text
Image not retrieved or image link is missing.
```

Expected result:

- maps to image fields;
- asks the merchant to verify product image URLs and live accessibility.

## Limited-fit examples

### Misrepresentation

```text
Account issue: misrepresentation.
```

Expected result:

- clearly states this is limited support;
- no account recovery promise;
- no Google approval guarantee.

### Account suspension

```text
Your Merchant Center account is suspended.
```

Expected result:

- not positioned as automatic account recovery;
- direct the user to limitations and manual review.

## Safety checks

For every warning example, verify that the site does not say:

- approval guaranteed;
- account recovery guaranteed;
- traffic, ranking, performance, or sales guaranteed;
- GTIN, MPN, brand, price, shipping, tax, or product facts can be invented;
- MerchantFix is official Google support.
