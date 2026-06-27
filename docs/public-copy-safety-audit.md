# MerchantFix.ai — Public Copy Safety Audit

Status: P0-05 reviewed and partially remediated.

Date: 2026-06-27

## Goal

Review customer-facing copy and remove wording that could create unsafe expectations around:

- platform approval;
- account recovery;
- ranking, traffic, performance, or sales;
- fake GTIN, MPN, brand, price, shipping, tax, or product facts;
- automatic correction when manual evidence is required;
- deliverables that are not part of the current launch scope.

## Files reviewed

- `app/page.tsx`
- `app/fix-pack/page.tsx`
- `app/pricing/page.tsx`
- `app/supported-errors/page.tsx`
- `app/sample-report/page.tsx`
- `components/SafeDiagnosticNotice.tsx`
- `components/ErrorPasteForm.tsx`
- `components/ErrorDiagnosisPreview.tsx`
- `components/FixPackOutputPreview.tsx`
- `lib/fix-pack-sample-data.ts`
- `lib/merchant-center-errors.ts`

## Result

The main public pages already contain strong safety boundaries:

- no fake identifiers;
- no invented product facts;
- no approval guarantee;
- manual review for uncertain rows;
- blocked status for unsafe automation;
- limited support for broader account or policy cases.

## Remediation completed

The audit found one important launch-scope mismatch: sample/report preview copy referred to PDF-style or separate file deliverables before PDF/ZIP delivery is implemented.

Updated files:

- `lib/fix-pack-sample-data.ts`
- `app/sample-report/page.tsx`

Changes made:

- replaced premature PDF deliverable wording with `On-screen diagnostic report`;
- clarified that PDF export is a later delivery layer;
- kept `merchantfix-annotated-products.csv` as the current downloadable deliverable when safe output is available;
- replaced separate manual-review/checklist file promises with in-report wording;
- kept the core safety position: no invented identifiers, manual review where required, blocked rows where automation is unsafe.

## Remaining follow-up

This audit does not replace full runtime QA. Before selling publicly, still run:

- local build;
- local typecheck;
- local tests;
- page-by-page review in browser;
- Stripe test checkout;
- diagnostic token test;
- CSV upload test;
- Android mobile review.

## P0-05 decision

Current decision: Green for controlled sales copy, subject to final browser QA.
