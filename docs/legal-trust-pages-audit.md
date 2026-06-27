# MerchantFix.ai — Legal and Trust Pages Audit

Status: P0-07 completed for controlled-sales readiness.

Date: 2026-06-27

## Goal

Add or verify the minimum legal and trust pages needed before controlled sales, especially because MerchantFix.ai asks customers to upload Shopify product CSV files.

## Pages verified as already existing

- `/privacy`
- `/terms`
- `/legal-notice`

## Pages added

- `/refund-policy`
- `/data-handling`
- `/contact`

## Footer updated

The footer now links to:

- Legal Notice;
- Privacy;
- Terms;
- Refund Policy;
- Data Handling;
- Contact.

## Refund Policy coverage

The refund policy now explains:

- duplicate payment review;
- technical failure before diagnostic access;
- no automatic refund after delivered digital diagnostic output;
- unsupported or bad-fit cases;
- no refund promise for lack of Google approval, ranking, traffic, sales, or account recovery;
- no refund promise for expectations outside the current launch scope such as Shopify app, Google API, PDF, ZIP, or dashboard.

## Data Handling coverage

The data handling page now explains:

- pasted warning handling;
- uploaded Shopify CSV handling;
- current launch scope;
- no customer accounts or long-term report history in the current launch scope;
- no automatic import back into Shopify;
- CSV upload principles;
- product facts MerchantFix does not invent;
- manual_review and blocked row handling;
- future delivery layers such as PDF, ZIP, webhook, magic links, and customer accounts.

## Contact coverage

The contact page now explains support paths for:

- payment or access issue;
- CSV upload problem;
- diagnostic question;
- privacy or deletion request.

It also repeats that MerchantFix.ai does not provide guaranteed Google approval, account recovery, ranking, traffic, sales, legal advice, tax advice, or official Google support.

## Safety boundaries preserved

The update does not:

- add checkout behavior;
- add webhook behavior;
- add PDF or ZIP delivery;
- add customer accounts;
- make `/diagnostic` public;
- promise Google approval;
- promise legal, tax, or official Google advice;
- invent product facts.

## Remaining QA

Still required before broader sales:

- run local typecheck;
- run production build;
- verify all six footer links render correctly;
- review legal pages in browser on mobile;
- confirm support email is consistent across pages;
- review legal/operator information before broad public launch.

## P0-07 decision

Current decision: Green for controlled-sales trust layer, subject to runtime QA and final operator/legal review before broad public launch.
