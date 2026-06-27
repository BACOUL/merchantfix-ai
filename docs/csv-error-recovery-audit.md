# MerchantFix.ai — CSV Error Recovery Audit

Status: P0-04 completed for controlled-sales readiness.

Date: 2026-06-27

## Goal

Improve customer-facing CSV failure states so a non-technical Shopify merchant can recover without owner support.

## Files updated

- `lib/analyzeShopifyCsv.ts`
- `components/DiagnosticResultView.tsx`
- `components/AffectedProductsTable.tsx`

## Improvements made

### Empty CSV

The analyzer now explains that MerchantFix needs:

- a Shopify product CSV;
- a header row;
- product rows.

Recovery steps now tell the merchant to export a fresh Shopify product CSV from Shopify admin and upload the original file without renaming, sorting, deleting, or rebuilding columns.

### Invalid CSV

The analyzer now explains that the file may not be a readable CSV or may have broken delimiters/quotes.

Recovery steps now ask for a fresh Shopify product CSV and warn against copying spreadsheet content into a manual text file.

### Unrecognized columns

The analyzer now explains that the uploaded file does not look like a Shopify product CSV.

It gives expected column examples:

- `Title`
- `Handle`
- `Vendor`
- `Variant SKU`
- `Variant Barcode`
- `Variant Price`
- `Image Src`

It also warns the merchant not to upload:

- Google Merchant Center feed export;
- feed-app export;
- order export;
- customer export;
- spreadsheet with renamed columns.

### Diagnostic display

The diagnostic UI now treats `analysis.status === "error"` as a file-recovery state instead of a normal product-data report.

It now shows:

- `CSV upload needs attention` status;
- `Shopify CSV upload recovery` title;
- expected Shopify column examples;
- warning not to edit or rebuild the CSV before upload;
- link to `/how-to-export-shopify-csv`;
- no annotated CSV promise until a valid Shopify CSV is uploaded.

### Affected products table

System-only issues now show:

- `CSV upload issue` instead of normal affected products;
- `Fix the file first` instead of row cleanup language;
- `CSV file` instead of `Untitled product`.

## Safety boundaries preserved

The update does not:

- bypass the diagnostic gate;
- add public access to `/diagnostic`;
- invent GTIN, MPN, brand, price, image, shipping, tax, or product facts;
- promise Google approval;
- add PDF, ZIP, database, webhook, or account features.

## Remaining QA

Still required before broader sales:

- run local tests;
- run typecheck;
- run production build;
- test empty CSV in browser;
- test malformed CSV in browser;
- test non-Shopify CSV in browser;
- test clean Shopify CSV in browser;
- test issue-heavy Shopify CSV in browser;
- verify mobile layout on Android.

## P0-04 decision

Current decision: Green for controlled sales copy and recovery UX, subject to runtime QA.
