# MerchantFix world reference SEO layer

## Goal

MerchantFix should not only rank for exact Google Merchant Center error keywords. It should become the practical reference layer for Shopify merchants who need to understand, diagnose, and safely review product-data issues before editing feeds or resubmitting products.

## Strategy

The acquisition model is:

1. Merchant sees a Google Merchant Center warning.
2. Merchant copies the exact warning into Google or an AI search tool.
3. MerchantFix answers the warning with a precise Shopify-focused guide.
4. Merchant recognizes the Shopify fields involved.
5. Merchant pastes the warning into MerchantFix.
6. If many rows are affected, MerchantFix sells the 29 € Fix Pack CSV diagnosis.

## Content architecture

### 1. Short exact-error pages

Routes: `/fix/...-shopify`

Purpose: catch copy-paste and long-tail searches quickly.

Examples:

- `/fix/missing-value-gtin-shopify`
- `/fix/invalid-value-gtin-shopify`
- `/fix/missing-value-brand-shopify`
- `/fix/identifier-exists-conflict-shopify`
- `/fix/shopify-csv-google-merchant-center-errors`

### 2. Detailed exact-error guides

Routes: `/fix/google-merchant-center-errors/...`

Purpose: answer exact Google Merchant Center wording with broader Shopify context and FAQ structure.

### 3. Authority reference pages

Routes: `/reference/...`

Purpose: become the definitive answer for high-intent topics. These pages include:

- direct answer for Google and AI search;
- exact warning phrases;
- root causes;
- Shopify field map;
- CSV diagnostic workflow;
- relevant CSV columns;
- bad fixes to avoid;
- decision table;
- FAQ schema;
- related internal links.

## First authority topics

- Missing value [gtin]
- Invalid value [gtin]
- Missing value [brand]
- identifier_exists
- Shopify CSV diagnosis for Merchant Center errors

## Guardrails

- No promise of Google approval.
- No fake GTINs.
- No invented MPNs.
- No invented brand, price, availability, or product facts.
- No changes to Stripe, checkout, diagnostic engine, CSV analyzer, pricing, or APIs.

## Why this matters

To become the reference, MerchantFix must answer the problem better than:

- generic Shopify forum answers;
- feed app documentation;
- vague Google explanations;
- AI-generated generic checklists;
- merchant trial-and-error.

The product value remains narrow: diagnosis before unsafe edits.
