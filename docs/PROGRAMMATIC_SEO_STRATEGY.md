# MerchantFix.ai Programmatic SEO Strategy

This document defines the programmatic SEO strategy for MerchantFix.ai.

The goal is to generate scalable, high-intent SEO pages from a structured error database without creating thin, repetitive, or misleading content.

Programmatic SEO must support the MerchantFix.ai product strategy, not replace it.

## Core principle

One structured error database.

One reusable page template.

Many high-quality, specific SEO pages.

No thin content.

No false promises.

No unsupported product claims.

No confusion between V0.5 surface scan, V1 CSV diagnosis, and V2 paid Fix Pack.

## Strategic purpose

MerchantFix.ai should not manually create hundreds of SEO pages one by one.

Instead, the project should eventually use a structured dataset of Google Merchant Center errors and generate pages dynamically through a reusable Next.js template.

The objective is to capture long-tail searches from users who are already facing Google Merchant Center errors or Shopify Google Shopping product data issues.

## Relationship with SEO Sniper Strategy

The SEO Sniper Strategy defines what to target.

The Programmatic SEO Strategy defines how to generate pages at scale.

SEO_SNIPER_STRATEGY.md answers:

Which errors should MerchantFix.ai target?

PROGRAMMATIC_SEO_STRATEGY.md answers:

How should MerchantFix.ai generate and manage those pages efficiently?

## Relationship with V0.5, V1, and V2

Programmatic SEO must respect the product sequence:

V0: market validation.

V0.5: no-install Shopify URL surface scan.

V1: deeper Shopify CSV diagnostic.

V2: paid Fix Pack after V1 validation.

SEO pages must not make the product look more advanced than it is.

V0.5 pages can promote a quick Shopify URL surface scan.

V1 pages can promote Shopify CSV upload and identifier diagnosis.

V2 pages can promote the paid Fix Pack only after payment and delivery are active.

## Important timing rule

Programmatic SEO must be planned now, but not fully implemented before V1 is stable.

V1 should create one manual SEO page first:

/fix/missing-gtin-google-merchant-center

V0.5 can support one or two hand-built acquisition pages, such as:

/fix/shopify-google-merchant-center-checker

/fix/shopify-google-shopping-audit

After V1 validation, MerchantFix.ai can introduce a small programmatic SEO system with 5 to 10 error pages.

After V2 or V3 validation, this system may expand to 30, 50, or 100 pages.

Do not generate hundreds of pages before the product can support the user intent.

## Why programmatic SEO matters

Merchant Center errors are highly specific.

Users often copy exact error messages into Google.

A single generic article cannot cover every error well.

A programmatic system allows MerchantFix.ai to generate pages for precise problems while maintaining consistent quality, layout, disclaimers, CTAs, and internal linking.

## What programmatic SEO must not become

It must not become thin content.

It must not become AI spam.

It must not create pages for unsupported features as if they are supported.

It must not promise automatic fixes for risky issues.

It must not duplicate the same page with minor keyword changes.

It must not publish low-value pages.

It must not target account recovery claims irresponsibly.

It must not imply that V0.5 is a full Google Merchant Center diagnostic.

It must not imply that a surface scan can replace the deeper V1 CSV diagnostic.

## Recommended future architecture

The future structure may be:

lib/seo/merchantCenterErrors.ts

app/fix/[slug]/page.tsx

The file merchantCenterErrors.ts would contain structured data for each error page.

The route app/fix/[slug]/page.tsx would use the structured data to generate static pages.

In Next.js App Router, the implementation may use generateStaticParams and dynamic metadata.

## Future data file structure

Each error entry should include:

slug

errorName

errorCode

primaryKeyword

secondaryKeywords

searchIntent

supportedVersion

isSupportedInV05

isSupportedInV1

isSupportedInV2

isChecklistOnly

riskLevel

issueCategory

pageTitle

metaTitle

metaDescription

heroIntro

whatItMeans

whyItHappens

shopifySpecificCauses

manualFixSteps

whatNotToDo

howMerchantFixCanHelp

whatMerchantFixCannotGuarantee

faq

relatedPages

ctaLabel

disclaimer

## Example future data shape

Example only. Do not implement until the technical project is ready.

{
  slug: "missing-gtin-google-merchant-center",
  errorName: "Missing GTIN",
  errorCode: "missing_gtin",
  primaryKeyword: "missing GTIN Google Merchant Center",
  secondaryKeywords: [
    "missing GTIN Shopify",
    "Google Merchant Center GTIN error",
    "Shopify missing barcode Google Shopping"
  ],
  searchIntent: "User needs to understand and fix missing GTIN warnings or disapprovals for Shopify products.",
  supportedVersion: "V1",
  isSupportedInV05: false,
  isSupportedInV1: true,
  isSupportedInV2: true,
  isChecklistOnly: false,
  riskLevel: "medium",
  issueCategory: "identifier",
  pageTitle: "Missing GTIN in Google Merchant Center: How to Fix It for Shopify Products",
  metaTitle: "Missing GTIN Google Merchant Center: Shopify Fix Guide | MerchantFix.ai",
  metaDescription: "Learn how to fix missing GTIN errors in Google Merchant Center for Shopify products. Check barcodes, identifier_exists, MPN, brand, and affected CSV rows.",
  ctaLabel: "Scan My Shopify CSV"
}

## V0.5 SEO dataset

The V0.5 dataset should include only pages that match the no-install Shopify URL surface scan.

Initial V0.5 entries:

shopify-google-merchant-center-checker

shopify-google-shopping-audit

shopify-google-shopping-image-issues

shopify-products-missing-price-google-shopping

shopify-products-disapproved-google-merchant-center

These pages must explain that V0.5 is a surface audit only.

They may lead users to:

Check Shopify store URL.

Upload Shopify CSV for deeper diagnosis.

Paste Merchant Center error.

They must not claim that MerchantFix.ai sees the same data as Google Merchant Center.

They must not claim that detected V0.5 issues are guaranteed disapproval causes.

They must not claim full feed diagnosis.

## First V1 programmatic SEO dataset

The first V1 dataset should include only V1-aligned pages.

Initial V1 entries:

missing-gtin-google-merchant-center

incorrect-identifier-exists-shopify

missing-mpn-google-merchant-center

google-merchant-center-gtin-mpn-error

shopify-products-disapproved-google-merchant-center

missing-brand-google-merchant-center

invalid-gtin-google-merchant-center

duplicate-gtin-google-merchant-center

These pages align with the V1 diagnostic engine.

## Pages that must wait

The following pages should not be implemented as product-backed pages before V3:

google-merchant-center-price-mismatch

google-merchant-center-availability-mismatch

google-merchant-center-image-error

google-merchant-center-missing-shipping

google-shopping-products-not-showing

limited-performance-google-merchant-center

google-merchant-center-misrepresentation

They can be written later as manual guides or checklist pages only when the content is accurate and safe.

## Risk classification

Every SEO page must have a risk level.

Recommended values:

low

medium

high

## Low-risk pages

Low-risk pages are mainly explanatory and linked to V1-supported file-level checks.

Examples:

missing GTIN

missing MPN

missing brand

invalid GTIN

duplicate GTIN

incorrect identifier_exists

## Medium-risk pages

Medium-risk pages may involve issues partly outside the CSV.

Examples:

price mismatch

availability mismatch

missing image

products not showing

Shopify Google Shopping audit

Shopify products disapproved

These require careful wording because the issue may depend on website data, sync status, public product data, Merchant Center processing, or Google review.

## High-risk pages

High-risk pages involve account-level or policy-level issues.

Examples:

misrepresentation

false representation

account suspension

website needs improvement

policy violation

These must be checklist-only.

They must not imply automatic recovery.

## Page support status

Every page must define its support status.

Recommended values:

supported_by_v05

supported_by_v1

supported_by_v2

supported_by_v3

checklist_only

future

not_supported

## Page support rule

If a page describes an issue not supported by the current product, it must not imply that MerchantFix.ai can automatically fix it.

For unsupported issues, the CTA must be cautious.

Example:

MerchantFix.ai can help identify product data issues, but this specific problem may require website or account-level review.

## V0.5 page support rule

If a page is supported by V0.5 only, it must say clearly:

The Shopify URL scan is based on publicly available product data when accessible.

It is not a full Google Merchant Center diagnosis.

It does not guarantee that Google sees the same data.

For deeper GTIN, MPN, brand, and identifier_exists checks, upload a Shopify CSV.

## Template structure

Every programmatic SEO page must include:

Hero.

What this error or issue means.

Why Google Merchant Center may show it.

Why it happens on Shopify.

Manual fix checklist.

Common mistakes to avoid.

How MerchantFix.ai can help.

What MerchantFix.ai cannot guarantee.

FAQ.

Related pages.

CTA.

Mandatory disclaimer.

## Template quality rule

The template must have enough specific content per error.

Do not simply swap the error name and reuse the same generic text.

Each error entry must contain unique:

whatItMeans

whyItHappens

manualFixSteps

whatNotToDo

FAQ

MerchantFix limitation notes

CTA logic

Support status

## Manual fix first rule

Every page must give the manual fix first.

This builds trust and prevents the site from looking like a shallow sales funnel.

The page should explain what the user can do manually.

Then MerchantFix.ai becomes the faster and safer diagnostic option.

## CTA rules

The CTA must match what the product actually supports.

For V0.5-supported surface scan pages:

Check My Shopify Store

Run Surface Scan

Upload Shopify CSV for Deeper Diagnosis

For V1-supported identifier pages:

Scan My Shopify CSV

Paste Merchant Center Error

Find Affected Products

For V2 paid Fix Pack pages:

Download Full Fix Pack

Get Corrected CSV

Get Resubmission Checklist

For checklist-only pages:

Review Product Data Issues

Run Product Data Diagnostic

Do not use misleading CTAs like:

Get Approved Now

Recover My Account

Fix Suspension Instantly

Guarantee Approval

## Mandatory disclaimer

Every programmatic page must include this exact disclaimer:

MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google approval is not guaranteed.

## V0.5 surface scan disclaimer

Every V0.5 page must also include this exact disclaimer:

MerchantFix.ai surface scan is based on publicly available product data when accessible. It is not a full Google Merchant Center diagnosis. Google approval is not guaranteed.

## Forbidden claims

Programmatic pages must never claim:

Google approval is guaranteed.

Products will be approved.

Account recovery is guaranteed.

MerchantFix.ai fixes all Merchant Center issues.

MerchantFix.ai fixes misrepresentation automatically.

MerchantFix.ai generates GTIN.

MerchantFix.ai generates MPN.

MerchantFix.ai can replace manufacturer data.

MerchantFix.ai can guarantee Google Shopping visibility.

MerchantFix.ai surface scan is equivalent to Google Merchant Center diagnostics.

MerchantFix.ai URL scan can replace Shopify CSV analysis.

## Metadata strategy

Each page should generate unique metadata.

Each metadata entry should include:

title

description

canonical path

open graph title

open graph description

Do not create duplicate metadata across many pages.

## Internal linking strategy

Programmatic pages must link to related pages.

Example:

Missing GTIN page links to:

incorrect identifier_exists page

missing MPN page

GTIN / MPN hub page

Shopify products disapproved page

Invalid GTIN page

Duplicate GTIN page

Broad hub pages must link to specific error pages.

Specific error pages must link back to relevant hubs.

V0.5 surface scan pages must link toward V1 CSV diagnostic pages.

V1 CSV diagnostic pages may link to V0.5 surface scan pages as a quick first check, but the deeper diagnostic CTA must remain CSV-focused.

## Hub and spoke structure

MerchantFix.ai should use hub and spoke SEO clusters.

## V0.5 Shopify audit cluster

Hub:

/fix/shopify-google-merchant-center-checker

Spokes:

/fix/shopify-google-shopping-audit

/fix/shopify-google-shopping-image-issues

/fix/shopify-products-missing-price-google-shopping

/fix/shopify-products-disapproved-google-merchant-center

## Identifier cluster

Hub:

/fix/google-merchant-center-gtin-mpn-error

Spokes:

/fix/missing-gtin-google-merchant-center

/fix/missing-mpn-google-merchant-center

/fix/incorrect-identifier-exists-shopify

/fix/missing-brand-google-merchant-center

/fix/invalid-gtin-google-merchant-center

/fix/duplicate-gtin-google-merchant-center

## Shopify disapproval cluster

Hub:

/fix/shopify-products-disapproved-google-merchant-center

Spokes:

/fix/shopify-products-not-showing-google-shopping

/fix/google-and-youtube-shopify-products-disapproved

/fix/shopify-google-shopping-feed-errors

## Future mismatch cluster

Hub:

/fix/google-merchant-center-price-availability-errors

Spokes:

/fix/google-merchant-center-price-mismatch

/fix/google-merchant-center-availability-mismatch

/fix/google-shopping-price-not-matching-website

/fix/google-shopping-availability-not-matching-website

## Future policy checklist cluster

Hub:

/fix/google-merchant-center-policy-issues

Spokes:

/fix/google-merchant-center-misrepresentation

/fix/google-merchant-center-account-suspended-misrepresentation

/fix/google-merchant-center-false-representation

/fix/google-merchant-center-website-needs-improvement

These policy pages must stay checklist-only unless a separate validated product exists.

## Static generation strategy

When implemented in Next.js, pages should be statically generated when possible.

This improves speed, reliability, and SEO crawlability.

The future implementation may use:

generateStaticParams

generateMetadata

static error data file

single dynamic route template

This should not require a database in V1 or early V2.

## Why static pages matter

Static pages are fast.

Static pages are reliable.

Static pages are easy for Google to crawl.

Static pages reduce server cost.

Static pages allow one template to scale across many error pages.

## Version timing

## V0.5

Create only limited hand-built acquisition pages if needed:

/fix/shopify-google-merchant-center-checker

/fix/shopify-google-shopping-audit

Do not build the full programmatic system yet.

Do not claim full Merchant Center diagnosis.

## V1

Create only one hand-built SEO page first:

/fix/missing-gtin-google-merchant-center

Do not build the full programmatic system yet unless V1 implementation is stable.

## V2

If the product works and payment is being tested, create the first structured SEO dataset with 5 to 10 pages.

## V3

Expand the dataset to more Merchant Center errors.

Add checklist-only pages for risky categories.

Add more internal linking.

## V4

Add agency-focused programmatic pages if agency usage is validated.

## V5

Add integration and monitoring pages if platform features are validated.

## Programmatic SEO QA

Before publishing any generated page, check:

Does the page target a real search intent?

Is the page specific enough?

Does the page give a real manual fix?

Does the page avoid false promises?

Does the page match the product’s actual support status?

Does the page include the mandatory disclaimer?

Does the page include the V0.5 surface scan disclaimer when relevant?

Does the page include unique metadata?

Does the page link to relevant pages?

Does the page avoid duplicate generic content?

Does the CTA match what MerchantFix.ai can actually do?

Does the page separate V0.5 surface scan from V1 CSV diagnosis?

## Thin content prevention

Do not publish pages that only change:

error name

slug

one paragraph

CTA

Each page must have unique enough content to be useful.

If a page cannot have unique value, do not publish it yet.

## Data source rules

The error dataset must be manually curated at first.

Do not scrape Google pages.

Do not invent official error codes.

Do not claim official Google wording unless verified.

Use cautious names when exact wording is uncertain.

If a Google error message changes, update the dataset.

## Community feedback loop

Community posts can reveal new error phrases.

When a repeated error appears:

Add it to backlog.

Classify it by category.

Decide if it is V0.5, V1, V3, checklist-only, or future.

Create a page only if useful.

Do not create a page just because a keyword exists.

## Product feedback loop

User uploads and diagnostic results should inform SEO expansion.

If many users paste the same error text, create or improve a page for it.

If many users ask the same question, add FAQ content.

If an error causes confusion, add a limitation section.

If an error is unsupported, make that clear.

If many V0.5 users continue to CSV upload, expand V0.5 acquisition pages carefully.

If V0.5 traffic does not convert to CSV upload, reduce V0.5 SEO priority.

## Future file structure

Potential future structure:

lib/seo/merchantCenterErrors.ts

lib/seo/types.ts

lib/seo/getErrorPageBySlug.ts

app/fix/[slug]/page.tsx

components/seo/ErrorHero.tsx

components/seo/ErrorManualFix.tsx

components/seo/ErrorFaq.tsx

components/seo/ErrorCta.tsx

components/seo/ErrorLimitations.tsx

This structure should be introduced only when programmatic SEO is actually implemented.

## Future prompt needed

A future Codex prompt may be created:

prompts/11_PROGRAMMATIC_SEO_SYSTEM.md

This prompt should only be used after V1 is stable.

It would implement:

merchantCenterErrors.ts

dynamic /fix/[slug] route

generateStaticParams

generateMetadata

template components

5 to 10 initial pages

## Initial pages for future prompt

The first programmatic dataset should contain:

missing-gtin-google-merchant-center

incorrect-identifier-exists-shopify

missing-mpn-google-merchant-center

google-merchant-center-gtin-mpn-error

shopify-products-disapproved-google-merchant-center

missing-brand-google-merchant-center

invalid-gtin-google-merchant-center

duplicate-gtin-google-merchant-center

Optional V0.5 pages may be added only if V0.5 proves useful:

shopify-google-merchant-center-checker

shopify-google-shopping-audit

## Important warning

Do not generate programmatic pages for errors that the product cannot support unless they are clearly marked as manual guidance or checklist-only.

Do not build programmatic SEO before the V1 product is technically stable.

Do not allow SEO ambition to create product overpromising.

Do not let V0.5 SEO pages imply full Google Merchant Center diagnosis.

Do not let V0.5 pages replace the deeper CSV diagnostic path.

## Current decision

Current phase: V0 / V0.5 / V1 preparation.

Current product build target: V0.5 no-install Shopify URL surface scan first, then V1 diagnostic MVP.

Current SEO implementation target:

One or two V0.5 hand-built acquisition pages if needed.

One hand-built Missing GTIN page for V1.

Current future SEO target:

Programmatic SEO system after V1 validation.

Current rule:

Plan programmatic SEO now, implement it later.

## Final rule

Programmatic SEO is powerful only if the pages are useful, specific, fast, and honest.

MerchantFix.ai should generate pages at scale only after the first page proves the format and the product can support the promise.

Start with one excellent V1 page.

Use V0.5 pages only as careful acquisition pages.

Then scale the template after validation.
