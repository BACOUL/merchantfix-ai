# MerchantFix.ai — Source Build Risk Review

Status: source-level review completed, runtime build not executed.

Date: 2026-06-28

## Purpose

Review obvious source-level build risks introduced during the latest content, design, QA, and documentation work.

This is not a replacement for:

```bash
npm run typecheck
npm run test
npm run build
```

Those commands still need to be executed locally or in the deployment environment.

## Files reviewed

Reviewed source-level dependencies around the latest commercial page edits:

- `app/page.tsx`;
- `app/fix-pack/page.tsx`;
- `app/sample-report/page.tsx`;
- `components/index.ts`;
- `components/SiteChrome.tsx`;
- `components/CheckoutButton.tsx`;
- `lib/fix-pack-sample-data.ts`;
- `lib/aiFirstSeo.ts`;
- `package.json`;
- `tsconfig.json`.

## Homepage import check

`app/page.tsx` imports these from `@/components`:

- `ErrorPasteForm`;
- `FixPackOutputPreview`;
- `PrimaryLink`;
- `SafeDiagnosticNotice`;
- `SecondaryLink`;
- `TextBadge`.

These are exported from `components/index.ts`.

Result:

```text
No obvious missing component export detected for homepage imports.
```

## Fix Pack import check

`app/fix-pack/page.tsx` imports:

- `CheckoutButton` from `@/components/CheckoutButton`;
- `FixPackOutputPreview`;
- `SafeDiagnosticNotice`;
- `SampleReportTable`;
- `SecondaryLink`;
- `ShopifyCsvRequirements`;
- `TextBadge`.

`CheckoutButton` exists as a client component and accepts only the active `fix-pack` plan.

The other components are exported from `components/index.ts`.

Result:

```text
No obvious missing component export detected for Fix Pack imports.
```

## Sample report import check

`app/sample-report/page.tsx` imports:

- `FixPackOutputPreview`;
- `PrimaryLink`;
- `SampleReportTable`;
- `SecondaryLink`;
- `TextBadge`;
- `annotatedCsvPreviewColumns`;
- `annotatedCsvPreviewRows`;
- `beforeAfterRows`.

The components are exported from `components/index.ts`.

The sample data exports exist in `lib/fix-pack-sample-data.ts`.

Result:

```text
No obvious missing component or data export detected for sample report imports.
```

## SEO helper import check

The edited pages import:

- `buildBreadcrumbSchema`;
- `buildFaqPageSchema`;
- `jsonLd`;
- `canonical`.

`buildBreadcrumbSchema`, `buildFaqPageSchema`, and `jsonLd` exist in `lib/aiFirstSeo.ts`.

`canonical` existed previously in the app and remains imported from `lib/seo`.

Result:

```text
No obvious missing SEO helper detected from reviewed files.
```

## Badge tone check

The edited pages use badge tones including:

- `blue`;
- `slate`;
- `green`.

`TextBadge` supports:

- `blue`;
- `green`;
- `amber`;
- `slate`.

Result:

```text
No obvious invalid badge tone detected.
```

## Package script check

`package.json` includes:

```text
npm run build
npm run typecheck
npm run test
```

The exact scripts are:

```text
build -> next build
typecheck -> tsc --noEmit
test -> vitest run --environment node tests
```

Result:

```text
Launch runbook commands match available package scripts.
```

## Remaining risks

This review cannot prove runtime correctness.

Still must test:

- TypeScript compilation;
- Next.js production build;
- Vitest test suite;
- browser rendering;
- client component hydration;
- Stripe checkout behavior;
- diagnostic gate behavior;
- CSV upload behavior;
- annotated CSV download;
- mobile Android layout.

## Source-level decision

Current source-level decision:

```text
No obvious missing-import risk found in reviewed files.
```

Runtime decision remains:

```text
NOT READY UNTIL TYPECHECK, TEST, BUILD, STRIPE, DIAGNOSTIC, CSV, REPORT, AND MOBILE QA PASS.
```
