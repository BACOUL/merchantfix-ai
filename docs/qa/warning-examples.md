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

### Missing title

```text
Missing value [title]
A product title is required for this item.
```

Expected result:

- maps to Shopify title and feed title mapping fields;
- warns not to use keyword stuffing or promotional titles;
- suggests CSV diagnosis if many rows are affected.

### Missing description

```text
Missing value [description]
Add a product description for this item.
```

Expected result:

- maps to Shopify Body (HTML), description, and feed mapping fields;
- warns not to invent product specifications;
- suggests row-level review for empty descriptions.

### Missing image link

```text
Missing value [image_link]
Submit a main product image URL.
```

Expected result:

- maps to Shopify Image Src, Variant Image, and product media fields;
- warns not to use placeholder, private, or unrelated images;
- suggests CSV diagnosis when many rows are affected.

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

### Invalid availability

```text
Invalid value [availability]
The submitted availability value is not supported.
```

Expected result:

- maps to Shopify inventory, status, published state, and feed availability mapping;
- explains that inventory truth must be verified;
- warns not to force every product to in_stock.

### Image issue

```text
Image not retrieved or image link is missing.
```

Expected result:

- maps to image fields;
- asks the merchant to verify product image URLs and live accessibility.

### Product link issue

```text
Invalid value [link]
The product landing page URL is missing or invalid.
```

Expected result:

- maps to Shopify handle, product URL, publishing, and feed link mapping;
- explains that live URL access must be checked manually;
- does not claim the CSV alone proves crawlability.

### Missing color

```text
Missing value [color]
Add color information for apparel products.
```

Expected result:

- maps to Shopify options, titles, tags, and feed color mapping;
- explains that apparel/category context matters;
- warns not to guess color values.

### Missing size

```text
Missing value [size]
Add size information for apparel products.
```

Expected result:

- maps to Shopify options, variant titles, tags, and feed size mapping;
- explains that final size values need merchant confirmation;
- warns not to bulk-fill one size across variants.

### Missing age group

```text
Missing value [age_group]
Add an age group value for this apparel item.
```

Expected result:

- maps to title, product type, category, tags, and feed age_group mapping;
- explains that product audience and category context matter;
- warns not to assume every product is adult by default.

### Missing gender

```text
Missing value [gender]
Add a gender value for this apparel item.
```

Expected result:

- maps to title, product type, category, tags, and feed gender mapping;
- explains that unisex cases need separate review;
- warns not to assign gender automatically from one keyword.

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

### Landing page unavailable

```text
Landing page not available
Google could not access the product page.
```

Expected result:

- explains that Shopify status, handle, publishing, redirects, and public access may be relevant;
- requires live browser and Merchant Center checks;
- does not position this as a guaranteed CSV-only fix.

## Safety checks

For every warning example, verify that the site does not say:

- approval guaranteed;
- account recovery guaranteed;
- traffic, ranking, performance, or sales guaranteed;
- GTIN, MPN, brand, title, description, price, shipping, tax, or product facts can be invented;
- MerchantFix is official Google support.
