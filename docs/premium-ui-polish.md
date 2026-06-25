# MerchantFix premium UI polish

Date: 2026-06-25

## Goal

Improve the customer-facing perception of MerchantFix so it feels like a credible premium product rather than a generic AI-generated SaaS template.

## Scope

This polish focuses on:

- homepage product narrative;
- Fix Pack sales page;
- pricing page;
- sample report page;
- header/footer finish;
- CTA styling;
- diagnostic module presentation;
- deliverable and sample table presentation.

## Not changed

This PR must not change:

- Stripe price;
- checkout logic;
- `/api/checkout` plan rules;
- `/api/analyze`;
- CSV analyzer logic;
- diagnostic gate logic;
- Shopify or Google integrations;
- launch offer strategy.

## Design direction

- Darker premium hero sections.
- Larger whitespace and stronger hierarchy.
- Fewer generic cards.
- Product-proof sections before long explanations.
- Clearer distinction between free scan and paid Fix Pack.
- Stronger sample report presentation.
- Safety rules remain visible: no fake identifiers, no invented product facts, no Google approval guarantee.
