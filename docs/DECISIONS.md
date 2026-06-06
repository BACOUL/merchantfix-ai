# MerchantFix.ai Decisions

This document records important product, technical, commercial, and scope decisions for MerchantFix.ai.

Every significant decision must be documented here to avoid repeating debates, expanding too early, or forgetting why a choice was made.

## Purpose

The purpose of this file is to keep a clear decision history for the project.

MerchantFix.ai must be built with discipline.

Every major choice must answer:

What was decided?
Why was it decided?
Which version does it affect?
What is allowed?
What is forbidden?
When can this decision be revisited?

## Decision format

Each decision should follow this format:

Date:
Decision:
Version concerned:
Reason:
Impact:
Allowed:
Forbidden:
Review condition:

## Decision 001

Date: 2026-06-06

Decision: MerchantFix.ai will start with Shopify merchants only.

Version concerned: V0 and V1

Reason: Shopify is standardized, international, widely used by ecommerce merchants, and strongly connected to Google Merchant Center and Google Shopping use cases. Starting with Shopify reduces technical complexity and improves acquisition focus.

Impact: The first MVP will not support WooCommerce, Prestashop, Magento, Amazon, Meta Catalog, TikTok Shop, or generic product feed platforms.

Allowed: Shopify CSV upload, Shopify column normalization, Shopify-specific examples, Shopify-specific SEO pages.

Forbidden: WooCommerce support, Prestashop support, Magento support, marketplace expansion, generic feed manager positioning.

Review condition: This decision can be reviewed after V2 if paid users repeatedly ask for WooCommerce or another platform.

## Decision 002

Date: 2026-06-06

Decision: MerchantFix.ai V1 will focus only on GTIN, MPN, brand, and identifier_exists issues.

Version concerned: V1

Reason: Product identifier problems are frequent, specific, understandable, and strongly linked to Google Merchant Center product disapprovals. A narrow first scope reduces risk and makes the MVP easier to test.

Impact: The V1 diagnostic engine will not attempt to solve every Merchant Center issue.

Allowed: Missing GTIN detection, missing MPN detection, missing brand detection, identifier_exists inconsistency detection, invalid-looking GTIN detection, duplicate GTIN detection, SKU identical to MPN warning, missing image warning, missing price warning.

Forbidden: Price mismatch engine, availability mismatch engine, shipping engine, tax engine, misrepresentation recovery, account suspension recovery, full policy analysis.

Review condition: This decision can be reviewed in V3 after V2 validates paid demand.

## Decision 003

Date: 2026-06-06

Decision: MerchantFix.ai will not guarantee Google approval.

Version concerned: All versions

Reason: Google Merchant Center approval depends on many factors outside the product file, including account status, website quality, product type, business information, country, shipping, policies, and Google review systems.

Impact: Every important page and report must include a disclaimer.

Allowed: Diagnose product data issues, suggest safe corrections, generate corrected CSV when possible, provide manual review checklist, provide resubmission checklist.

Forbidden: Approval guaranteed, account recovery guaranteed, products will be approved, this will fix all Merchant Center issues, this will restore Google Shopping visibility.

Review condition: This decision is permanent.

## Decision 004

Date: 2026-06-06

Decision: MerchantFix.ai will never invent GTIN, MPN, or brand.

Version concerned: All versions

Reason: GTIN and MPN are real product identifiers. Inventing them would create false product data and damage trust. Brand must not be fabricated either.

Impact: The correction engine must mark missing identifiers for manual review unless a safe non-identifier correction is possible.

Allowed: Detect missing GTIN, detect missing MPN, detect missing brand, explain why manual review is required, suggest reviewing identifier_exists logic, add merchantfix_notes.

Forbidden: Fake GTIN, generated barcode, invented MPN, copied SKU into MPN automatically, invented brand from product title, invented brand from store name.

Review condition: This decision is permanent.

## Decision 005

Date: 2026-06-06

Decision: V1 will use a rule-based engine, not AI.

Version concerned: V1

Reason: GTIN, MPN, brand, and identifier_exists checks must be deterministic, auditable, and safe. AI can hallucinate or infer product data incorrectly.

Impact: The V1 technical engine must use code-based rules for parsing, detection, severity, and CSV correction.

Allowed: TypeScript rules, deterministic validation, static explanations, manual review markers.

Forbidden: OpenAI API in V1, AI-generated corrections in V1, AI as decision maker in V1.

Review condition: AI may be introduced in V3 only as an explanatory layer after the rule-based engine is stable.

## Decision 006

Date: 2026-06-06

Decision: V1 will not include Stripe.

Version concerned: V1

Reason: Payment should not be added before the diagnostic engine is reliable. The first priority is technical validation, not monetization.

Impact: V1 may show a placeholder CTA for a future Fix Pack, but no payment flow will be implemented.

Allowed: Free diagnostic, result page, placeholder CTA, manual feedback collection.

Forbidden: Stripe checkout, paid access, payment gating, subscriptions, pricing logic in code.

Review condition: Stripe can be added in V2 after V1 passes validation criteria.

## Decision 007

Date: 2026-06-06

Decision: V1 will not include authentication or a database.

Version concerned: V1

Reason: The fastest and safest V1 is a no-auth, no-database diagnostic flow. Accounts and databases create complexity, privacy risks, and development overhead before they are necessary.

Impact: V1 should process uploads temporarily and avoid persistent storage.

Allowed: Local session flow, temporary in-memory or short-lived processing, no permanent user account.

Forbidden: Login, registration, Supabase, user dashboard, saved history, persistent customer file storage.

Review condition: Authentication and database can be considered in V4 for agency features or only if V2/V3 proves repeated usage.

## Decision 008

Date: 2026-06-06

Decision: Customer files must never be committed to GitHub.

Version concerned: All versions

Reason: Customer CSV files, screenshots, and product catalog data may contain private business information.

Impact: Only fictional sample CSV files can be committed to the repository.

Allowed: Fictional samples, anonymized examples created manually, test data with fake products.

Forbidden: Real Shopify exports, real Merchant Center screenshots, customer emails, payment data, private catalogs, API credentials.

Review condition: This decision is permanent.

## Decision 009

Date: 2026-06-06

Decision: MerchantFix.ai will use English first.

Version concerned: V0, V1, V2

Reason: The initial market is international, Shopify is global, and most high-intent searches around Google Merchant Center errors are likely to be in English.

Impact: The first landing page, SEO pages, reports, and product interface should be in English.

Allowed: English-first product, English-first SEO, English outreach to agencies and communities.

Forbidden: Building multilingual complexity before validation.

Review condition: French and other languages can be added after the product validates in English or if clear demand appears.

## Decision 010

Date: 2026-06-06

Decision: MerchantFix.ai acquisition will be intent-led, not cold mass prospecting.

Version concerned: All versions

Reason: The product should target users who already have Google Merchant Center errors. The strongest acquisition path is long-tail SEO, communities, freelancers, and agencies already facing the problem.

Impact: The project must build SEO pages and a diagnostic CTA from the beginning.

Allowed: SEO pages around exact errors, Shopify Community answers, Reddit answers, targeted freelancer outreach, targeted agency outreach, free diagnosis offer.

Forbidden: Mass cold calling, broad cold email campaigns, generic ecommerce prospecting, paid ads before validation.

Review condition: Paid ads can be tested later only after conversion data exists.

## Decision 011

Date: 2026-06-06

Decision: The first paid offer will be a single Fix Pack around 79 euros.

Version concerned: V2

Reason: A single offer reduces confusion and helps test willingness to pay. Multiple plans too early would distract from validation.

Impact: V2 pricing should be simple.

Allowed: One-time Fix Pack, corrected CSV when safe, manual review CSV, PDF report, resubmission checklist.

Forbidden: Complex pricing table, subscription, agency plans, white-label plans, multiple tiers in V2 unless strong evidence requires it.

Review condition: Pricing can be reviewed after first paid users and feedback.

## Decision 012

Date: 2026-06-06

Decision: Agency features are postponed to V4.

Version concerned: V4

Reason: Agencies may be a strong market, but dashboards, history, white-label reports, subscriptions, and workspaces should not be built before repeated agency demand is proven.

Impact: Early agency acquisition can happen, but agency software features must wait.

Allowed before V4: free agency diagnostic, agency feedback, simple report, agency interest tracking.

Forbidden before V4: agency dashboard, multi-client workspace, white-label reports, agency subscription, saved history.

Review condition: Proceed to V4 only after V2/V3 show agency demand and repeated usage.

## Decision 013

Date: 2026-06-06

Decision: Shopify API and Google Merchant Center API are V5 features only.

Version concerned: V5

Reason: API integrations add technical complexity, security concerns, token management, maintenance cost, and support. They should be built only if paying users request them.

Impact: CSV upload remains the first input method.

Allowed before V5: CSV upload, pasted error, manual export, manual analysis.

Forbidden before V5: Shopify OAuth, Google OAuth, Merchant Center API connection, automated monitoring, scheduled scans.

Review condition: APIs can be considered in V5 if customers repeatedly request monitoring or direct integration and revenue supports maintenance.

## Decision 014

Date: 2026-06-06

Decision: Misrepresentation will never be treated as an automatic CSV fix.

Version concerned: V3 and later

Reason: Misrepresentation is usually related to website trust, account status, business information, policies, product claims, or Google review systems. It is rarely solved by changing only the product CSV.

Impact: MerchantFix.ai may provide a checklist, but must not promise recovery.

Allowed: Misrepresentation checklist, explanation, site trust checklist, policy checklist, account review guidance.

Forbidden: Automatic misrepresentation fix, CSV recovery promise, guaranteed account approval, claim that MerchantFix.ai can resolve suspension.

Review condition: This decision is permanent unless a separate, carefully scoped product is created later.

## Decision 015

Date: 2026-06-06

Decision: Reports must separate automatic fixes, manual review, and non-file issues.

Version concerned: V2 and later

Reason: Users must clearly understand what the tool corrected, what they need to verify, and what cannot be fixed from a CSV.

Impact: Reports and result pages must have clear categories.

Allowed: Automatically fixable, manual review required, not fixable from product file.

Forbidden: Blending all issues together, implying manual issues are fixed, hiding uncertainty.

Review condition: This decision is permanent.

## Decision 016

Date: 2026-06-06

Decision: MerchantFix.ai will not become a manual agency service.

Version concerned: All versions

Reason: The project goal is an automated or semi-automated software product. Manual service work would reduce scalability and create support burden.

Impact: The product must deliver standardized diagnostics and Fix Packs.

Allowed: Manual review labels, standardized checklist, temporary manual help during V0 validation.

Forbidden: Custom consulting as core offer, manual file correction for every customer, guaranteed human intervention, service-heavy delivery.

Review condition: Limited manual work is allowed only during validation, not as the long-term business model.

## Decision 017

Date: 2026-06-06

Decision: Every new feature must go through scope review.

Version concerned: All versions

Reason: The largest risk is scope creep. Useful ideas must be parked until the correct version.

Impact: New ideas must be assigned to a version or parking lot.

Allowed: Add feature to parking lot, document future feature, revisit after validation.

Forbidden: Adding features immediately because they seem useful.

Review condition: This decision is permanent.

## Decision 018

Date: 2026-06-06

Decision: The project will be built with GitHub as the central source of truth.

Version concerned: All versions

Reason: GitHub will store the code, documentation, prompts, roadmap, decisions, fictional samples, and checklists in one controlled place.

Impact: The repository must remain organized and safe.

Allowed: Code, docs, prompts, fictional samples, tests, QA checklists.

Forbidden: Secrets, customer files, real private data, credentials.

Review condition: This decision is permanent.

## Decision 019

Date: 2026-06-06

Decision: Codex prompts must be narrow and controlled.

Version concerned: All versions

Reason: Broad prompts can cause Codex to add out-of-scope features, modify unrelated files, or skip safety rules.

Impact: Each Codex prompt must specify current version, task, allowed files, forbidden files, forbidden features, Definition of Done, and tests.

Allowed: One focused task per prompt.

Forbidden: Build the whole project in one prompt, add everything, implement full SaaS, add Stripe/auth/API too early.

Review condition: This decision is permanent.

## Decision 020

Date: 2026-06-06

Decision: V1 completion requires sample CSV validation.

Version concerned: V1

Reason: The product is only useful if it handles realistic CSV files safely. It must be tested before payment is added.

Impact: Sample files must exist and pass before V2.

Allowed: clean-shopify.csv, missing-gtin.csv, custom-products.csv, duplicate-gtin.csv, dirty-file.csv, invalid-gtin.csv, sku-as-mpn.csv, missing-brand.csv.

Forbidden: Proceeding to Stripe before samples pass.

Review condition: This decision is permanent for V1.

## Decision log template

Date:

Decision:

Version concerned:

Reason:

Impact:

Allowed:

Forbidden:

Review condition:

## Current open decisions

No open decision at this time.

## Current confirmed status

Product name: MerchantFix.ai.

Domain target: merchantfix-ai.com.

Repository name: merchantfix-ai.

Initial market: English-speaking Shopify merchants using Google Merchant Center.

Initial product scope: Shopify CSV identifier diagnostic.

Initial errors: GTIN, MPN, brand, identifier_exists.

Initial business model: free diagnosis, then V2 paid Fix Pack.

Initial acquisition: long-tail SEO, communities, freelancers, agencies.

Current phase: documentation and V1 preparation.
