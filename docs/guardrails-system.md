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
- Informational identifier note.

Owner action: no action needed unless the merchant asks for clarification.

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

Owner action: check that the row is clearly marked, that the reason is understandable, and that evidence needed is listed.

### `blocked`

The system must not generate or suggest a direct correction because the case is outside safe automation.

Examples:

- malformed CSV;
- unrecognized Shopify CSV columns;
- unsupported account-level situation;
- request that depends on external truth not present in the file.

Owner action: do not treat the output as an automated correction. Ask for a valid Shopify CSV or explain that the case needs broader merchant review.

## Evidence needed

Manual review rows must explain what evidence is needed:

- product packaging;
- supplier sheet;
- manufacturer file;
- real brand confirmation;
- storefront/product page check;
- Shopify admin verification;
- Merchant Center warning context.

## Output columns

The annotated CSV must include these guardrail columns:

- `merchantfix_status`
- `merchantfix_manual_review_reason`
- `merchantfix_evidence_needed`

These columns are designed to make the next step obvious without requiring deep Merchant Center knowledge.

## Owner workflow during early sales

Jeason does not need to judge every row from scratch.

During the first paid sales, he should only inspect rows where:

- `merchantfix_status = manual_review`
- `merchantfix_status = blocked`

For those rows, he checks:

1. Is the status visible?
2. Is the reason understandable?
3. Is the evidence needed listed?
4. Does the row avoid invented product facts?
5. Does the report avoid approval, ranking, traffic, or sales guarantees?

If those checks pass, the system behaved correctly.

## Merchant workflow

The merchant uses the evidence checklist to verify the product truth.

Examples:

- For a missing GTIN, the merchant checks packaging, supplier data, or manufacturer data.
- For SKU used as MPN, the merchant confirms whether the SKU is truly the manufacturer part number.
- For missing brand, the merchant confirms the real product brand or vendor mapping.
- For a possible custom product, the merchant confirms whether the product truly has no manufacturer identifiers.

## What the system must not do

MerchantFix must not:

- invent GTIN values;
- invent MPN values;
- invent brand values;
- change product truth without evidence;
- present uncertain rows as safe corrections;
- present product-data diagnosis as guaranteed Google approval.

## Early sales operating model

The first sales should be treated as controlled learning, not heavy manual service.

Expected owner time per sale:

- simple CSV: 5 to 10 minutes of QA;
- medium CSV: 10 to 20 minutes of QA;
- complex or blocked case: short explanation or refund decision if outside scope.

The owner should not manually repair the store for the customer at the 29 euro Fix Pack level.

## Product rule

MerchantFix automates diagnosis, classification, notes, and evidence checklists.

MerchantFix does not automate product truth.
