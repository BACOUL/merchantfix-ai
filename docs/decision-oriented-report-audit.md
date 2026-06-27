# MerchantFix.ai — Decision-Oriented Report Audit

Status: P0-08 completed for controlled-sales readiness.

Date: 2026-06-27

## Goal

Make the diagnostic report easier for a non-technical Shopify merchant to act on in under 60 seconds.

The report should answer:

1. What should I do first?
2. What should I not touch yet?
3. What evidence do I need?
4. Which rows are the highest risk?
5. What is safe, manual_review, or blocked?

## Files updated

- `components/MerchantFixReportPanel.tsx`

## Improvements made

### Decision report framing

The report label was changed from a generic preview framing to a decision report framing.

The report now focuses on next action clarity rather than just displaying diagnostic data.

### New decision cards

The report now includes four decision cards before the detailed tables:

1. `Do this first`
2. `Do not touch yet`
3. `Evidence checklist`
4. `Next safe step`

### Do this first

The component now derives top priority actions from:

- invalid input state;
- recommended actions;
- highest-risk row findings.

If the CSV input is invalid, the first action is to fix the upload before interpreting product-data results.

### Do not touch yet

The report now warns merchants not to:

- treat blocked rows as automatic fixes;
- edit manual_review rows before evidence is verified;
- invent, guess, replace, or copy GTIN values;
- copy SKU into MPN unless it is truly the manufacturer part number;
- invent brand values;
- bulk-change `identifier_exists` without proof.

### Evidence checklist

The report now extracts unique evidence requirements from manual_review and blocked findings.

Examples:

- product packaging barcode;
- supplier sheet;
- manufacturer product data;
- brand owner name;
- Shopify admin product data;
- live storefront page.

### Next safe step

The report now gives one clear next step depending on the state:

- invalid input: fix CSV upload first;
- blocked rows: start with blocked rows;
- manual review: collect evidence before editing;
- findings only: review safe notes and keep a backup;
- no findings: keep the report as a baseline.

### Priority row findings

The row table now sorts findings by decision risk:

1. blocked rows;
2. critical rows;
3. manual_review rows;
4. warning rows;
5. informational rows.

The table also shows the suggested action directly beside evidence needed, so the merchant does not need to infer the next step.

### Launch-scope wording

The final delivery layer section now clearly says that PDF export is later and that the current launch scope is:

- on-screen report;
- annotated CSV when safe output is available.

## Safety boundaries preserved

The update does not:

- change diagnosis rules;
- invent product facts;
- change GTIN, MPN, brand, price, image, shipping, tax, or product facts;
- promise approval, traffic, ranking, sales, or account recovery;
- add PDF, ZIP, database, webhook, customer accounts, or public diagnostic access.

## Remaining QA

Still required before broader sales:

- run local tests;
- run typecheck;
- run production build;
- review report output with clean CSV;
- review report output with issue-heavy CSV;
- review report output with invalid CSV;
- verify mobile layout for the new decision cards;
- verify table overflow on Android.

## P0-08 decision

Current decision: Green for controlled-sales report clarity, subject to runtime QA.
