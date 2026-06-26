# MerchantFix.ai Final Launch Readiness Checklist

This checklist decides whether MerchantFix.ai is ready for the first controlled merchant tests.

It is not a general roadmap. It is a pass/fail launch gate for the current paid MVP:

> Paste Merchant Center warning -> buy Fix Pack -> open diagnostic -> upload Shopify CSV -> receive safe row-level diagnosis and annotated CSV when allowed by guardrails.

## Launch decision rule

Use the result at the end of this document.

| Result | Meaning | Action |
| --- | --- | --- |
| Green | No blocking issue found | Start 10-20 controlled merchant tests |
| Yellow | Minor issue found, no payment/data risk | Fix before public SEO push, but small internal tests may continue |
| Red | Payment, access, CSV, privacy, or promise risk | Do not launch |

A single Red item blocks launch.

## 1. Production build gate

| Check | Expected result | Status |
| --- | --- | --- |
| Vercel production build passes | Build succeeds with no TypeScript or runtime error | TODO |
| Homepage loads | `/` returns 200 and renders desktop/mobile | TODO |
| Sitemap builds | Sitemap includes public routes and no broken generated routes | TODO |
| No preview noindex leakage in production | Production domain is indexable unless intentionally blocked | TODO |
| No console-breaking client error | Browser console has no blocker on main pages | TODO |

Decision: Green / Yellow / Red

## 2. Public page QA

Test on desktop and mobile.

| Route | Expected result | Status |
| --- | --- | --- |
| `/` | Hero, paste-error block, CTAs, and value proposition render clearly | TODO |
| `/scan` | Public Shopify scan page renders and can submit a public Shopify URL | TODO |
| `/fix-pack` | 29 EUR Fix Pack offer renders with clear deliverables and guarded claims | TODO |
| `/pricing` | Fix Pack is the only active paid product and Pro Review is not sold | TODO |
| `/sample-report` | Annotated CSV preview, statuses, evidence, and actions are visible | TODO |
| `/supported-errors` | 15 mapped families render with Strong / Partial / Limited badges | TODO |
| `/merchantfix-vs-feed-apps` | Differentiation is clear: diagnostic layer, not feed app | TODO |
| `/how-it-works` | Flow is understandable from warning to CSV diagnosis | TODO |
| `/reference` | Authority reference index renders | TODO |
| `/reference/level-2` | Level 2 reference index renders | TODO |

Decision: Green / Yellow / Red

## 3. Paste-error diagnosis QA

Test the homepage paste-error block.

| Warning to paste | Expected result | Status |
| --- | --- | --- |
| `Missing value [gtin]` | Detects Missing GTIN, recommends Shopify barcode/identifier checks | TODO |
| `Invalid value [gtin]` | Detects Invalid GTIN, warns not to invent GTIN | TODO |
| `Duplicate value [gtin]` | Detects Duplicate GTIN, recommends row-level duplicate review | TODO |
| `Missing value [brand]` | Detects Missing brand, warns not to invent brand | TODO |
| `Missing value [mpn]` | Detects Missing MPN, warns not to copy SKU blindly | TODO |
| `identifier_exists conflict` | Detects identifier_exists conflict and recommends row-level review | TODO |
| `Duplicate item ID` | Detects duplicate item ID as partial support | TODO |
| `Mismatched value [price]` | Detects price mismatch as partial support | TODO |
| `Mismatched value [availability]` | Detects availability mismatch as partial support | TODO |
| `Image issue` | Detects image issue as partial support | TODO |
| `Image not retrieved` | Detects image retrieval/crawl issue as partial support | TODO |
| `Missing value [shipping]` | Detects shipping issue as partial support | TODO |
| `Missing or invalid value [tax]` | Detects tax issue and avoids tax advice promises | TODO |
| `Invalid value [google_product_category]` | Detects product category issue as partial support | TODO |
| `Landing page not available` | Detects landing page issue as limited support | TODO |
| `Misrepresentation` | Detects limited support and avoids account-recovery promise | TODO |

UX checks:

- Diagnosis does not run while typing.
- Example chips only fill the textarea.
- Analyze button triggers the result.
- Result panel is visible on desktop.
- Result panel is easy to see after scroll on mobile.
- Unsupported warnings show a clear fallback without pretending support.

Decision: Green / Yellow / Red

## 4. Stripe checkout QA

Use Stripe test mode first.

| Check | Expected result | Status |
| --- | --- | --- |
| Fix Pack checkout button | Calls `/api/checkout` with `fix-pack` | TODO |
| Stripe session created | Session currency is EUR and amount matches current offer | TODO |
| Success URL | Stripe returns to `/success?session_id=...` | TODO |
| Cancel URL | Stripe returns to `/cancel` | TODO |
| Unknown product rejected | `/api/checkout` rejects unsupported products | TODO |
| Pro Review blocked | `/api/checkout` rejects `pro-review` | TODO |
| No secret exposed client-side | Stripe secret key never appears in browser/client bundle | TODO |

Red blockers:

- Checkout fails for Fix Pack.
- Wrong price/currency.
- Pro Review or another inactive product can be purchased.
- Secret key leaks client-side.

Decision: Green / Yellow / Red

## 5. Success and diagnostic access gate

| Check | Expected result | Status |
| --- | --- | --- |
| `/success` with valid session | Shows success and routes user toward `/diagnostic` | TODO |
| `/success` without session | Does not unlock diagnostic by itself | TODO |
| `/diagnostic` without session/test token | Blocks access | TODO |
| `/diagnostic?session_id=valid` | Unlocks when Stripe verification passes | TODO |
| `/diagnostic?test_token=valid_private_token` | Unlocks only with configured private token | TODO |
| Wrong test token | Rejected | TODO |
| Missing environment variables | Fails safely, not openly | TODO |

Red blockers:

- Unpaid diagnostic access is possible.
- A wrong test token works.
- A missing/invalid Stripe session unlocks paid features.

Decision: Green / Yellow / Red

## 6. CSV analyzer QA

Use repository test cases first:

- `docs/test-cases/shopify-sample-clean.csv`
- `docs/test-cases/shopify-sample-issues.csv`

| Check | Expected result | Status |
| --- | --- | --- |
| Clean CSV upload | No false critical result that would scare the merchant | TODO |
| Issue-heavy CSV upload | Flags missing identifiers, weak rows, and manual-review rows | TODO |
| CSV parser accepts Shopify export | Expected Shopify columns are normalized correctly | TODO |
| Affected row table renders | User can see what rows need attention | TODO |
| Annotated CSV download appears when allowed | Download is available only when safe notes or deterministic changes exist | TODO |
| Guardrail columns present | `merchantfix_status`, `merchantfix_manual_review_reason`, `merchantfix_evidence_needed` exist | TODO |
| Notes/action columns present | `merchantfix_notes`, `merchantfix_action` exist | TODO |
| Manual review rows are clear | Evidence needed is understandable for merchant/supplier/manufacturer verification | TODO |
| Blocked rows are blocked | No automated correction is delivered for unsafe rows | TODO |

Decision: Green / Yellow / Red

## 7. Guardrail and claims QA

Search public pages and generated output for unsafe claims.

| Forbidden claim | Expected result | Status |
| --- | --- | --- |
| Google approval guarantee | Must not appear | TODO |
| Account recovery guarantee | Must not appear | TODO |
| Ranking, traffic, sales guarantee | Must not appear | TODO |
| Automatic GTIN invention | Must not appear | TODO |
| Automatic MPN invention | Must not appear | TODO |
| Automatic brand invention | Must not appear | TODO |
| Tax compliance guarantee | Must not appear | TODO |
| Shipping compliance guarantee | Must not appear | TODO |
| Legal or policy advice promise | Must not appear | TODO |
| Full feed app replacement claim | Must not appear | TODO |

Required safety language:

- MerchantFix helps diagnose Shopify product data issues.
- Some rows may require manual review.
- Google approval is not guaranteed.
- Product facts must be verified from merchant, supplier, manufacturer, packaging, or live store evidence.

Decision: Green / Yellow / Red

## 8. Customer-facing copy and support QA

| Check | Expected result | Status |
| --- | --- | --- |
| Price is consistent | Current Fix Pack price is consistent across homepage, pricing, and fix-pack page | TODO |
| Offer is clear | One paid offer only during first-sales validation | TODO |
| Refund/digital-service wording | Terms do not conflict with the paid digital service offer | TODO |
| Support email | Customer-facing support address is correct and not from another project | TODO |
| TimeProofs references | No unrelated TimeProofs project reference appears on public sales pages unless intentional legal ownership text | TODO |
| Download language | Annotated CSV is positioned as diagnosis/support, not guaranteed Google repair | TODO |
| Sample report | Sample output matches the actual CSV output columns | TODO |

Decision: Green / Yellow / Red

## 9. Mobile QA

Test on Android and a narrow browser viewport.

| Check | Expected result | Status |
| --- | --- | --- |
| Homepage | No broken hero, no hidden CTA | TODO |
| Paste-error form | Textarea, example chips, button, and result are usable | TODO |
| `/supported-errors` | Tables scroll horizontally without breaking layout | TODO |
| `/sample-report` | CSV preview/table remains readable with horizontal scroll | TODO |
| `/fix-pack` | Checkout CTA remains visible and credible | TODO |
| `/diagnostic` | CSV upload and results are usable enough for first tests | TODO |

Decision: Green / Yellow / Red

## 10. First controlled launch scope

Only start with controlled tests if the final decision is Green.

Recommended first test scope:

- 10 to 20 Shopify merchants.
- Focus on merchants with Merchant Center warnings involving GTIN, brand, MPN, identifier_exists, price, availability, images, category, or duplicate identifiers.
- Avoid leading with account suspension or misrepresentation cases.
- Do not run paid ads yet.
- Do not claim broad Google Merchant Center account recovery.
- Collect examples of real warnings and CSV structures.

## 11. Final decision

| Gate | Result |
| --- | --- |
| Production build | TODO |
| Public pages | TODO |
| Paste-error diagnosis | TODO |
| Stripe checkout | TODO |
| Success/diagnostic gate | TODO |
| CSV analyzer | TODO |
| Guardrails/claims | TODO |
| Customer-facing copy | TODO |
| Mobile QA | TODO |

Final result: Green / Yellow / Red

Owner decision:

- Green: start 10-20 controlled merchant tests.
- Yellow: fix listed issues, then retest the affected gates.
- Red: do not launch until blockers are fixed.
