# MerchantFix.ai Changelog

This changelog records all important changes made to MerchantFix.ai.

The goal is to keep a clear history of product, documentation, technical, and scope changes.

## Changelog rules

Every meaningful change must be documented.

A change should be added when:

A new document is created.
A product rule is changed.
A version scope is updated.
A Codex prompt is added.
A sample CSV file is added.
A technical module is created.
A major feature is implemented.
A bug is fixed.
A safety rule is updated.
A release is prepared.
A version is validated.

Do not use the changelog for tiny edits, typos, or formatting-only changes unless they affect meaning.

## Format

Each entry should use this format:

Date:
Version:
Type:
Change:
Reason:
Impact:

## Change types

Documentation.
Product.
Scope.
Technical.
Security.
QA.
Acquisition.
Prompt.
Sample.
Bug fix.
Release.

## Unreleased

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created README.md.

Reason: Establish the initial project overview, positioning, roadmap summary, safety rules, technical direction, acquisition direction, and development method.

Impact: MerchantFix.ai now has a clear entry document explaining the project, first MVP scope, roadmap, and mandatory safety rules.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created ROADMAP.md.

Reason: Define the execution path from V0 to V5 and prevent premature complexity.

Impact: The project now has a version-by-version roadmap covering market validation, diagnostic MVP, paid Fix Pack, expanded Merchant Center errors, agency product, and platform features.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/MERCHANTFIX_MASTER_PLAN.md.

Reason: Establish the master execution plan and source of truth for product scope, safety, acquisition, development method, and validation.

Impact: The project now has a central document to prevent scope creep and protect the product from unsafe corrections or false promises.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/VERSION_SCOPE.md.

Reason: Lock the allowed and forbidden features for each version from V0 to V5.

Impact: Each version now has a precise scope, validation criteria, and forbidden feature list.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/PRODUCT_RULES.md.

Reason: Define mandatory product safety rules, correction rules, output rules, and data handling rules.

Impact: MerchantFix.ai now has clear rules preventing fake GTIN, fake MPN, invented brand, unsafe CSV changes, and false Google approval promises.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/QA_CHECKLIST.md.

Reason: Define the quality assurance process for every version.

Impact: The project now has QA rules for documentation, repository safety, Codex outputs, V0 validation, V1 parser checks, V1 diagnostic checks, corrected CSV safety, payment QA, agency QA, and platform QA.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/GO_STOP_CRITERIA.md.

Reason: Define when to proceed, pause, reduce scope, or stop at each version.

Impact: MerchantFix.ai now has clear decision rules before moving from V0 to V1, V1 to V2, V2 to V3, V3 to V4, and V4 to V5.

### 2026-06-06

Version: V0 / V1 preparation

Type: Acquisition

Change: Created docs/ACQUISITION_PLAN.md.

Reason: Define how professionals and merchants will discover MerchantFix.ai.

Impact: The project now has a clear acquisition plan based on long-tail SEO, Shopify Community, Reddit, freelancers, agencies, and product-led sharing through reports.

### 2026-06-06

Version: V0 / V1 preparation

Type: Documentation

Change: Created docs/DECISIONS.md.

Reason: Record important product, technical, commercial, and scope decisions.

Impact: MerchantFix.ai now has a decision log covering Shopify-first scope, identifier-first scope, no approval guarantee, no fake identifiers, no AI in V1, no Stripe in V1, no auth/database in V1, GitHub safety, English-first, intent-led acquisition, V2 Fix Pack pricing, and delayed agency/platform features.

## Planned next changes

Create .env.example.

Create .gitignore.

Create prompts/00_PROJECT_CONTEXT.md.

Create prompts/01_CREATE_PROJECT_STRUCTURE.md.

Create prompts/02_CREATE_TYPES.md.

Create prompts/03_NORMALIZE_COLUMNS.md.

Create prompts/04_DETECT_IDENTIFIER_ISSUES.md.

Create prompts/05_ANALYZE_SHOPIFY_CSV.md.

Create prompts/06_GENERATE_CORRECTED_CSV.md.

Create prompts/07_BUILD_RESULT_PAGE.md.

Create prompts/08_CREATE_TESTS.md.

Create prompts/09_CREATE_SEO_PAGE.md.

Create prompts/10_ADD_STRIPE_V2.md.

Create fictional sample CSV files.

Initialize the Next.js project after documentation, prompts, and samples are ready.

## Release history

No public release yet.

## Current status

Current phase: V0 / V1 preparation.

Current product status: documentation in progress.

Current technical status: no production code yet.

Current next action: create environment and repository safety files, then create Codex prompts.
