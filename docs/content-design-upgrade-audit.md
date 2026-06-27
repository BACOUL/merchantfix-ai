# MerchantFix.ai — Content and Design Upgrade Audit

Status: commercial content and design clarity upgraded.

Date: 2026-06-27

## Goal

Improve the public site content and perceived design quality without changing product logic, checkout behavior, diagnostic access, or safety guardrails.

The target was to make the site clearer for a stressed Shopify merchant who sees a Google Merchant Center warning and needs to know which Shopify rows to check.

## Files updated

- `app/page.tsx`
- `app/fix-pack/page.tsx`
- `app/sample-report/page.tsx`

## Homepage changes

The homepage was rewritten around a clearer customer pain:

> Find the Shopify rows behind your Merchant Center warning.

Changes made:

- replaced colder positioning with a more direct problem/solution hero;
- added a stronger visual example: warning -> affected row -> Shopify field -> decision -> do not invent GTIN;
- added proof cards: Problem, Input, Output, Price;
- added a simple 3-step flow;
- replaced more technical language with plain decision labels:
  - Fix;
  - Verify;
  - Do not change yet;
- added stronger before/after messaging;
- kept the paste-warning entry point visible;
- kept no-fake-identifiers and no-approval-guarantee messaging.

## Fix Pack page changes

The Fix Pack page was rewritten to sell the concrete result more clearly:

> Get the Shopify rows behind your Merchant Center warning.

Changes made:

- made the hero more benefit-driven;
- added a concrete output card with warning, row, field, decision, and unsafe shortcut;
- made the four deliverables clearer:
  - affected Shopify rows;
  - field to check;
  - what to verify;
  - what not to touch;
- simplified the process to:
  - pay once;
  - upload CSV;
  - read the report;
  - download notes;
- translated technical statuses into plain language:
  - safe_note -> Safe note;
  - manual_review -> Needs proof;
  - blocked -> Do not change yet;
- clarified that PDF and ZIP are later delivery layers;
- kept limits visible before purchase.

## Sample report page changes

The sample report page was made more proof-driven and visual.

Changes made:

- changed the hero to focus on one warning becoming rows, proof, and safe next steps;
- added a before/after hero card with:
  - warning;
  - affected row;
  - Shopify field;
  - what to do;
  - what not to do;
- renamed counters to easier merchant language:
  - Needs proof;
  - Do not change yet;
  - Safe notes;
- made deliverables more precise and launch-scope safe;
- renamed table column from technical-only status to `Decision`;
- kept fictional-data disclosure.

## Safety boundaries preserved

The update does not:

- change checkout logic;
- change `/api/analyze`;
- change diagnostic access;
- make `/diagnostic` public;
- add PDF, ZIP, webhook, database, emails, magic links, or accounts;
- invent product facts;
- promise Google approval, ranking, traffic, sales, or account recovery.

## Expected scoring impact

Before this content/design pass:

- Content: around 8/10;
- Design/perception: around 7/10;
- Content + design average: around 7.5/10.

After this pass, expected source-level score if runtime build is clean:

- Content: around 8.5/10;
- Design/perception: around 7.5/10;
- Content + design average: around 8/10.

## Remaining design work for 9/10

Still needed later:

- real logo beyond `MF` badge;
- stronger brand identity;
- custom product/report illustrations;
- real browser/mobile QA;
- visual screenshots of report output;
- more polished micro-interactions;
- fully responsive table review on Android.

## Remaining QA

Still required:

- run `npm run typecheck`;
- run `npm run test`;
- run `npm run build`;
- review homepage in browser;
- review Fix Pack page in browser;
- review sample report page in browser;
- verify mobile layout on Android;
- check checkout CTA still works;
- check paste-warning form still renders.

## Decision

Current decision: content/design improved for controlled-sales readiness, subject to runtime QA.
