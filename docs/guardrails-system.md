# MerchantFix guardrail system

## Purpose

MerchantFix must protect the merchant and the product owner from unsafe product-data decisions.

The product should not require Jeason or the customer to understand Google Merchant Center deeply before using the Fix Pack. Instead, MerchantFix must classify each issue into a simple operating status.

## Guardrail statuses

### `safe_note`

The system can add a diagnostic note without changing factual product data.

Examples:

- Missing image note.
- Missing price note.
- CSV formatting note.

### `manual_review`

The system detected a likely issue, but the correct value cannot be known from the CSV alone.

Examples:

- Missing GTIN.
- Invalid GTIN.
- Missing MPN.
- Missing brand.
- `identifier_exists` conflict.
- Duplicate GTIN.
- SKU used as MPN.
- Possible custom product.

Manual review means the merchant must verify source evidence before editing Shopify or resubmitting to Google.

### `blocked`

The system must not generate or suggest a direct correction because the case is outside safe automation.

Examples:

- Misrepresentation / account recovery requests.
- Requests to guarantee Google approval.
- Requests to invent product identifiers.
- CSV cannot be parsed.

## Evidence needed

Manual review rows must explain what evidence is needed:

- product packaging;
- supplier sheet;
- manufacturer file;
- real brand confirmation;
- storefront/product page check;
- Shopify admin verification;
- Merchant Center warning context.

## Owner workflow

Jeason does not need to judge every row from scratch.

For early sales, he should only check:

1. Did MerchantFix mark dangerous rows as `manual_review` or `blocked`?
2. Did the report explain the evidence needed?
3. Did the output avoid invented GTIN, MPN, brand, price, availability, or account recovery promises?

If all three are true, the system behaved correctly.

## Product rule

MerchantFix automates diagnosis, classification, notes, and evidence checklists.

MerchantFix does not automate product truth.
