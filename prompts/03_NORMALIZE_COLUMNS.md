# Codex Prompt 03 — Normalize Shopify CSV Columns

## Project

MerchantFix.ai

## Current version

V1 diagnostic MVP

## Objective

Implement the Shopify CSV column normalization module.

This task must create the logic that maps raw Shopify CSV rows into normalized product objects used by the V1 diagnostic engine.

Do not implement the V0.5 URL surface scan in this task.

Do not implement the full analysis engine yet.

Do not implement issue detection yet.

Do not implement corrected CSV generation yet.

Do not implement UI changes unless strictly required for TypeScript compatibility.

## Product context

MerchantFix.ai helps Shopify merchants diagnose Google Merchant Center product data issues.

The product sequence is:

V0.5: no-install Shopify URL surface scan for visible product data risks.

V1: deeper Shopify CSV diagnostic for GTIN, MPN, brand, and identifier_exists issues.

This prompt concerns only the V1 CSV normalization layer.

Before detecting issues, the system must normalize different possible CSV column names into a stable internal structure.

## Files allowed to modify

lib/normalizeColumns.ts

lib/types.ts only if a small type adjustment is strictly required

tests/normalizeColumns.test.ts if tests are already set up

## Files forbidden to modify

app/page.tsx

app/scan/page.tsx

app/result/[sessionId]/page.tsx

app/api/surface-scan/route.ts

app/api/analyze/route.ts

lib/normalizeStoreUrl.ts

lib/fetchPublicShopifyProducts.ts

lib/detectSurfaceRisks.ts

lib/calculateSurfaceRiskScore.ts

lib/analyzeShopifyCsv.ts

lib/detectIdentifierIssues.ts

lib/generateCorrectedCsv.ts

lib/generateSummary.ts

lib/validationRules.ts

Any documentation files

Any prompt files

Any sample files unless explicitly asked

## V1 forbidden features

Do not add Stripe.

Do not add authentication.

Do not add user accounts.

Do not add database.

Do not add Supabase.

Do not add OpenAI or AI calls.

Do not add Shopify API.

Do not add Google Merchant Center API.

Do not add PDF generation.

Do not add ZIP generation.

Do not add subscriptions.

Do not add agency dashboard.

Do not add WooCommerce.

Do not add XML parsing.

Do not add monitoring.

Do not add Shopify app.

Do not add approval guarantee.

Do not claim that CSV normalization guarantees Google approval.

Do not add V0.5 URL scan logic in this task.

## Required function

Create and export a function:

normalizeShopifyRows(rawRows: RawCsvRow[]): {
  products: NormalizedProduct[];
  columnMapping: ColumnMappingResult;
}

## Raw input

The input is an array of raw CSV rows.

Each raw row is an object where keys are original CSV column names and values are strings.

Example:

{
  "Title": "Handmade Bracelet",
  "Handle": "handmade-bracelet",
  "Vendor": "Studio Example",
  "Variant Barcode": "",
  "Variant SKU": "HB-001",
  "Variant Price": "29.90",
  "Image Src": "https://example.com/image.jpg",
  "Google Shopping / Custom Product": "TRUE"
}

## Column normalization requirements

The function must recognize common Shopify and Google feed column variations.

## Title columns

Recognize:

Title

title

Product Title

product_title

name

## Handle columns

Recognize:

Handle

handle

Product Handle

product_handle

## Brand and vendor columns

Recognize brand from:

Brand

brand

google_product_brand

Google Product Brand

Recognize vendor from:

Vendor

vendor

Shopify Vendor

shopify_vendor

If brand is missing but vendor exists, keep vendor in vendor.

Do not automatically copy vendor into brand unless the column mapping clearly identifies vendor as a brand source.

Do not invent brand.

## GTIN columns

Recognize GTIN from:

Variant Barcode

variant_barcode

Barcode

barcode

GTIN

gtin

Product GTIN

product_gtin

Global Trade Item Number

google_gtin

## SKU columns

Recognize SKU from:

Variant SKU

variant_sku

SKU

sku

Product SKU

product_sku

## MPN columns

Recognize MPN from:

MPN

mpn

Manufacturer Part Number

manufacturer_part_number

Google MPN

google_mpn

## Price columns

Recognize price from:

Variant Price

variant_price

Price

price

Product Price

product_price

google_price

## Image columns

Recognize image from:

Image Src

image_src

Image URL

image_url

image_link

Image Link

Google Image Link

google_image_link

## identifier_exists columns

Recognize identifier_exists from:

identifier_exists

Identifier Exists

identifier exists

Google Identifier Exists

google_identifier_exists

Identifier exists

Google Shopping / Identifier Exists

Google Shopping / Custom Product

## Google product category columns

Recognize category from:

Google Product Category

google_product_category

Product Category

product_category

google_category

## NormalizedProduct mapping

For each row, return a NormalizedProduct with:

rowNumber

originalRow

title

handle

brand

vendor

gtin

mpn

sku

price

image

identifierExists

googleProductCategory

isPossibleCustomProduct

customProductSignals

## Row number

rowNumber should be 1-based based on the original CSV data rows, not including the header.

## Original row preservation

originalRow must preserve the original raw row object.

Do not mutate the input row.

## Empty values

Trim whitespace.

Convert empty strings to null or undefined consistently.

Use null for normalized empty values unless the existing type requires undefined.

Do not throw errors for missing optional fields.

## identifierExists normalization

Normalize common values to boolean true:

true

TRUE

True

yes

YES

1

y

Y

Normalize common values to boolean false:

false

FALSE

False

no

NO

0

n

N

If missing, empty, or unknown, set to null.

Important Shopify-specific note:

If a column such as “Google Shopping / Custom Product” is mapped, treat TRUE as meaning the product is custom.

That does not automatically mean identifierExists is false unless the project type explicitly supports that mapping.

If unsure, preserve the raw signal in originalRow and keep identifierExists as null.

Do not over-infer.

## Custom product detection

Set isPossibleCustomProduct to true if title or handle contains one of CUSTOM_PRODUCT_KEYWORDS from lib/types.ts.

Add matched keywords to customProductSignals.

Detection must be case-insensitive.

Do not treat this as proof.

It is only a signal.

Do not automatically change identifierExists based only on custom product signals.

## ColumnMappingResult

Return columnMapping with:

mappedColumns

missingImportantColumns

unrecognizedColumns

warnings

mappedColumns should map normalized field names to original CSV column names.

Example:

{
  title: "Title",
  gtin: "Variant Barcode",
  sku: "Variant SKU"
}

missingImportantColumns should include important fields that were not found, such as:

title

gtin

mpn

brand

identifierExists

price

image

unrecognizedColumns should include original columns that were not mapped.

warnings should include non-blocking mapping warnings.

Examples:

No GTIN column found.

No MPN column found.

No brand column found.

No identifier_exists column found.

No recognizable product identifier columns found.

## Important safety rule

Do not invent missing values.

Do not infer GTIN.

Do not infer MPN.

Do not infer brand from title.

Do not convert SKU into MPN.

Do not change original row data.

Do not decide Google approval.

Do not decide account recovery.

## Error handling

If rawRows is empty, return empty products and a warning.

If no recognizable product columns are found, return empty products and warnings explaining that the file does not appear to contain recognizable Shopify product columns.

Do not throw unless the input is structurally invalid.

If rawRows is not an array, throw a clear TypeScript-safe error.

## Tests to support later

The function should be easy to test with:

clean-shopify.csv

missing-gtin.csv

custom-products.csv

duplicate-gtin.csv

dirty-file.csv

invalid-gtin.csv

sku-as-mpn.csv

missing-brand.csv

## Definition of Done

normalizeShopifyRows is implemented.

The function returns normalized products.

The function returns column mapping details.

Common Shopify column names are recognized.

Google-style column variations are recognized.

identifier_exists values are normalized cautiously.

Custom product signals are detected cautiously.

Original rows are preserved.

Input rows are not mutated.

Missing columns do not crash the function.

Empty values are normalized consistently.

No forbidden features are added.

No external API calls are added.

No V0.5 URL scan logic is added.

No issue detection rules are implemented yet.

No corrected CSV generation is implemented yet.

## Output expectation

Return the full updated lib/normalizeColumns.ts file.

If lib/types.ts requires a minor adjustment, return that file too and explain why.

Do not modify UI files.

Do not implement the full analysis engine.

Do not implement issue detection.

Do not implement corrected CSV generation.

Do not implement URL scan logic.

Do not implement payment, database, API integrations, AI, PDF, or ZIP.
