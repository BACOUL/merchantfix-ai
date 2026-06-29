import { getIssueAction } from "./detectIdentifierIssues";
import { buildGuardrailSummary } from "./guardrails";
import {
  MANDATORY_DISCLAIMER,
  type CorrectedCsvChange,
  type CorrectedCsvResult,
  type IssueCode,
  type NormalizedProduct,
  type ProductIssue,
  type RawCsvRow
} from "./types";

const IDENTIFIER_EXISTS_COLUMNS = new Set([
  "identifier_exists",
  "identifier exists",
  "google identifier exists",
  "google_identifier_exists",
  "google shopping / identifier exists"
]);

const ISSUE_NOTES: Record<IssueCode, string> = {
  missing_gtin: "Missing GTIN. Do not invent a GTIN. Confirm the real product identifier from manufacturer data or packaging.",
  missing_mpn: "Missing MPN and no GTIN found. Confirm whether a real manufacturer part number exists.",
  missing_brand: "Missing brand or vendor. Add real brand or confirm vendor mapping. Do not invent a brand.",
  missing_identifier_exists: "identifier_exists is missing. Review whether product identifiers exist for this product.",
  identifier_exists_conflict:
    "identifier_exists=true but GTIN and MPN are missing. Review product identifier data before resubmitting.",
  invalid_gtin_length: "Invalid-looking GTIN length. Review the identifier from an official source.",
  invalid_gtin_format: "Invalid-looking GTIN format. Review the identifier from an official source.",
  duplicate_gtin: "Duplicate GTIN detected. Confirm whether affected rows are true variants or incorrect duplicates.",
  sku_same_as_mpn: "SKU matches MPN. Confirm SKU is truly the manufacturer part number.",
  possible_custom_product: "Possible custom product. Review whether identifier_exists=no is appropriate.",
  missing_title: "Missing title. Add a clear product title based on the real item. Do not use keyword stuffing or promotional text.",
  invalid_title: "Title needs review. Remove risky formatting or promotional wording and keep the title aligned with the product page.",
  missing_description: "Missing description. Add product-specific description content. Do not invent product specifications.",
  missing_link: "Product link needs review. Check Shopify handle, published status, feed mapping, and live URL access.",
  missing_image: "Missing image. Add a valid product image in Shopify before resubmitting.",
  missing_price: "Missing price. Add a valid product price in Shopify before resubmitting.",
  invalid_availability: "Availability needs review. Check Shopify inventory, storefront state, and feed availability mapping.",
  missing_color: "Missing color. Review product options, category, tags, and feed color mapping. Do not guess color values.",
  missing_size: "Missing size. Review product options, variant titles, and feed size mapping.",
  missing_age_group: "Missing age_group. Review product audience and Google product category before editing.",
  missing_gender: "Missing gender. Review product audience, unisex cases, category, and feed gender mapping.",
  unrecognized_columns: "Unrecognized columns. Upload a Shopify CSV export with recognizable product columns.",
  empty_file: "No product rows were available for correction notes.",
  invalid_csv: "The CSV could not be parsed safely.",
  manual_review_required: "Manual review required before resubmitting."
};

function normalizeColumnName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function escapeCsvValue(value: unknown): string {
  const stringValue = value === null || value === undefined ? "" : String(value);

  if (/[",\r\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function serializeRows(rows: RawCsvRow[], headers: string[]): string {
  const lines = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header] ?? "")).join(","))
  ];

  return lines.join("\n");
}

function findIdentifierExistsColumn(row: RawCsvRow): string | null {
  return Object.keys(row).find((column) => IDENTIFIER_EXISTS_COLUMNS.has(normalizeColumnName(column))) ?? null;
}

function groupIssuesByRow(issues: ProductIssue[]): Map<number, ProductIssue[]> {
  const grouped = new Map<number, ProductIssue[]>();

  issues.forEach((issue) => {
    grouped.set(issue.rowNumber, [...(grouped.get(issue.rowNumber) ?? []), issue]);
  });

  return grouped;
}

function uniqueValues(values: string[]): string {
  return Array.from(new Set(values.filter(Boolean))).join(" | ");
}

function noteForIssues(issues: ProductIssue[]): string {
  if (issues.length === 0) {
    return "No supported V1 correction note needed based on current MerchantFix.ai checks.";
  }

  return Array.from(new Set(issues.map((issue) => ISSUE_NOTES[issue.issueCode]))).join(" ");
}

function actionForIssues(issues: ProductIssue[]): string {
  if (issues.length === 0) {
    return "no_action";
  }

  if (issues.some((issue) => issue.manualReviewRequired || issue.fixType === "manual_review")) {
    return "manual_review";
  }

  return getIssueAction(issues[0].issueCode) || "safe_note_added";
}

function canSafelySetIdentifierExistsNo(product: NormalizedProduct, issues: ProductIssue[], row: RawCsvRow): boolean {
  return Boolean(
    findIdentifierExistsColumn(row) &&
      !product.gtin &&
      !product.mpn &&
      !product.brand &&
      !product.vendor &&
      product.isPossibleCustomProduct &&
      issues.some((issue) => issue.issueCode === "possible_custom_product")
  );
}

export function generateCorrectedCsv(input: {
  sessionId: string;
  products: NormalizedProduct[];
  issues: ProductIssue[];
  originalRows: RawCsvRow[];
  merchantCenterErrorText?: string;
}): CorrectedCsvResult {
  const issuesByRow = groupIssuesByRow(input.issues);
  const headers = Array.from(
    new Set([
      ...input.originalRows.flatMap((row) => Object.keys(row)),
      "merchantfix_notes",
      "merchantfix_action",
      "merchantfix_status",
      "merchantfix_manual_review_reason",
      "merchantfix_evidence_needed"
    ])
  );
  const changes: CorrectedCsvChange[] = [];
  const manualReviewRows: RawCsvRow[] = [];

  if (input.originalRows.length === 0) {
    return {
      sessionId: input.sessionId,
      correctedCsv: serializeRows([], headers.length > 0 ? headers : ["merchantfix_notes", "merchantfix_action", "merchantfix_status"]),
      changes: [],
      manualReviewRows: [],
      notes: [
        "No original rows were available for annotation.",
        "MerchantFix.ai does not generate GTIN or MPN.",
        "Google approval is not guaranteed."
      ],
      disclaimer: MANDATORY_DISCLAIMER
    };
  }

  const correctedRows = input.originalRows.map((row, index) => {
    const product = input.products[index];
    const rowNumber = index + 1;
    const rowIssues = issuesByRow.get(rowNumber) ?? [];
    const rowGuardrails = buildGuardrailSummary(rowIssues);
    const notes = noteForIssues(rowIssues);
    const action = actionForIssues(rowIssues);
    const correctedRow: RawCsvRow = { ...row };
    const productTitle = product?.title ?? row.Title ?? row.title ?? null;
    const manualReviewReason = uniqueValues(rowGuardrails.decisions.map((decision) => decision.reason));
    const evidenceNeeded = uniqueValues(rowGuardrails.decisions.flatMap((decision) => decision.evidenceNeeded));

    if (product && canSafelySetIdentifierExistsNo(product, rowIssues, row)) {
      const identifierExistsColumn = findIdentifierExistsColumn(row);

      if (identifierExistsColumn && String(row[identifierExistsColumn] ?? "").trim().toLowerCase() !== "no") {
        const note =
          "Review required: this product appears custom or handmade. identifier_exists was set to no only because no GTIN or MPN was present and the product appears to have no manufacturer identifier. Confirm before resubmitting.";
        correctedRow[identifierExistsColumn] = "no";
        changes.push({
          rowNumber,
          productTitle,
          field: identifierExistsColumn,
          previousValue: row[identifierExistsColumn] ?? null,
          newValue: "no",
          note,
          safe: true
        });
      }
    }

    correctedRow.merchantfix_notes = notes;
    correctedRow.merchantfix_action = action;
    correctedRow.merchantfix_status = rowGuardrails.status;
    correctedRow.merchantfix_manual_review_reason = manualReviewReason;
    correctedRow.merchantfix_evidence_needed = evidenceNeeded;

    changes.push({
      rowNumber,
      productTitle,
      field: "merchantfix_notes",
      previousValue: row.merchantfix_notes ?? null,
      newValue: notes,
      note: notes,
      safe: !rowIssues.some((issue) => issue.manualReviewRequired)
    });

    if (rowIssues.length > 0) {
      changes.push({
        rowNumber,
        productTitle,
        field: "merchantfix_action",
        previousValue: row.merchantfix_action ?? null,
        newValue: action,
        note: `Action set to ${action}.`,
        safe: true
      });
    }

    if (rowGuardrails.status === "manual_review" || rowGuardrails.status === "blocked") {
      manualReviewRows.push(correctedRow);
    }

    return correctedRow;
  });

  return {
    sessionId: input.sessionId,
    correctedCsv: serializeRows(correctedRows, headers),
    changes,
    manualReviewRows,
    notes: [
      "Annotated CSV preserves original product data.",
      "merchantfix_status tells whether each row is safe_note, manual_review, or blocked.",
      "merchantfix_evidence_needed explains what the merchant must verify before editing Shopify.",
      "MerchantFix.ai does not generate GTIN or MPN.",
      "MerchantFix.ai does not invent brand, title, description, color, size, age_group, gender, availability, price, or link values.",
      "Rows marked manual_review require human verification.",
      "Google approval is not guaranteed."
    ],
    disclaimer: MANDATORY_DISCLAIMER
  };
}