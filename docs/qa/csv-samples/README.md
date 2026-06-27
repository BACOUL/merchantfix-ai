# MerchantFix.ai — CSV QA Samples

Status: QA guide for local test files.

## Important rule

Do not commit real customer CSV files.

Do not commit invented product identifiers such as fake GTIN, fake MPN, fake brand values, fake prices, or fake product facts.

The QA process should use:

1. safe repository placeholders for parser recovery tests;
2. local-only CSV files for Shopify product diagnosis tests;
3. real customer CSV files only with permission and never committed to GitHub.

## Files committed in this folder

### `non-shopify-products.csv`

Purpose:

- tests unrecognized columns;
- expected result: `analysis.status === "error"`;
- expected issue: `unrecognized_columns`;
- expected customer action: upload a Shopify product CSV export.

### `empty-file-placeholder.md`

Purpose:

- explains how to create a local zero-byte `empty.csv` file;
- expected result: `analysis.status === "error"`;
- expected issue: `empty_file`.

## Local-only CSV files to create before deployment QA

Create these locally on your computer. Do not commit them.

### 1. `empty.csv`

Create a zero-byte file.

Expected result:

- empty file error;
- no annotated CSV;
- customer-facing recovery steps.

### 2. `header-only-shopify-products.csv`

Create a Shopify-like header row with no product rows.

Expected result:

- header-only error;
- no annotated CSV;
- recovery steps explain that product rows are required.

### 3. `malformed-shopify-products.csv`

Create a CSV with broken quotes or malformed delimiters.

Expected result:

- invalid CSV error;
- no annotated CSV;
- recovery steps ask for a fresh Shopify export.

### 4. `issue-heavy-shopify-products.csv`

Use demo-only rows without real customer data.

Include rows that trigger:

- missing identifier;
- missing image;
- missing price;
- identifier consistency issue;
- custom/handmade review;
- duplicate identifier review only if you use non-customer demo values locally.

Expected result:

- warning or critical status;
- manual_review rows;
- evidence needed;
- annotated CSV available when safe notes or deterministic output exist;
- no invented identifiers.

### 5. `real-customer-case.csv`

Only use after explicit permission from the customer.

Rules:

- never commit it;
- keep it local;
- remove it when no longer needed;
- do not use it as marketing proof without permission.

## QA checklist per CSV

For every local test file, verify:

- report status;
- product count;
- issue counts;
- top issues;
- row-level decisions;
- evidence needed;
- annotated CSV availability;
- no invented product facts;
- no Google approval guarantee.

## Why real CSV samples are not committed

MerchantFix.ai sells trust. The repository should not contain fake product identifiers or real customer exports.

This keeps the project aligned with the public promise:

> no fake identifiers, no invented product facts, no Google approval guarantee.
