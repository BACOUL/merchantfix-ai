# MerchantFix launch offer checklist

Date: 2026-06-25

This checklist exists to prevent offer drift before the first real sales test.

## Must remain true before launch

- [ ] `/pricing` shows Free Scan and Fix Pack only.
- [ ] `/pricing` does not show a Pro Review checkout button.
- [ ] `CheckoutButton` accepts only `fix-pack`.
- [ ] `/api/checkout` accepts only `fix-pack`.
- [ ] `/api/checkout` rejects `pro-review`.
- [ ] Fix Pack stays priced at 29 € unless explicitly changed in a dedicated pricing PR.
- [ ] No page promises manual priority review as part of Fix Pack.
- [ ] No page guarantees Google approval, ranking, traffic, recovery, or sales.

## Expansion rule

Do not add Pro Review, subscriptions, agency packages, or manual priority service until there is evidence from real buyers.
