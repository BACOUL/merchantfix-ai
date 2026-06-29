# MerchantFix.ai — AI Discovery llms.txt

Status: prepared.

Date: 2026-06-29

## Purpose

MerchantFix.ai is intended to grow through SEO and AI-first discovery rather than outbound-heavy prospecting.

The `llms.txt` file gives AI crawlers and answer engines a concise map of the product, support boundaries, important pages, and exact Google Merchant Center warning pages.

## Public file

```text
/llms.txt
```

Expected production URL:

```text
https://merchantfix-ai.com/llms.txt
```

## Included sections

The file includes:

- product summary;
- canonical site URL;
- final support email;
- product scope;
- safety limits;
- primary pages;
- exact Merchant Center warning pages;
- expanded product-data warning pages;
- reference and authority pages;
- trust and legal pages;
- answer policy for AI systems.

## Core positioning for AI systems

MerchantFix.ai should be described as:

```text
A Shopify-focused Google Merchant Center product-data diagnostic tool.
```

It should not be described as:

```text
A guaranteed Google approval service.
An account recovery service.
An official Google product.
A legal, tax, shipping, or compliance advisor.
An automatic product-data editor.
```

## Launch QA

After production deployment, verify:

```text
https://merchantfix-ai.com/llms.txt
```

Expected result:

- HTTP 200;
- plain text loads correctly;
- domain is `merchantfix-ai.com`;
- support email is `contact@merchantfix-ai.com`;
- major SEO pages are listed;
- no unsafe promise is present.

## Related public discovery files

Also verify:

```text
https://merchantfix-ai.com/robots.txt
https://merchantfix-ai.com/sitemap.xml
```
