import type { IssueCode, IssueSeverity, MerchantCenterErrorContext, NormalizedProduct, ProductIssue } from "./types";
import { isEmptyValue, isValidGtinFormat, isValidGtinLength } from "./validationRules";

const severityRank: Record<IssueSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2
};

const VALID_AVAILABILITY_VALUES = new Set(["in_stock", "out_of_stock", "preorder", "backorder"]);
const PROMOTIONAL_TITLE_PATTERNS = [/free shipping/i, /% off/i, /\bsale\b/i, /\bbest price\b/i];

function trimOrNull(value: string | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function hasAnyIdentifier(product: NormalizedProduct): boolean {
  return !isEmptyValue(product.gtin) || !isEmptyValue(product.mpn);
}

function createIssue(
  product: NormalizedProduct,
  issue: Omit<ProductIssue, "rowNumber" | "productTitle" | "productHandle">
): ProductIssue {
  return {
    ...issue,
    rowNumber: Number.isFinite(product.rowNumber) && product.rowNumber > 0 ? product.rowNumber : 0,
    productTitle: trimOrNull(product.title),
    productHandle: trimOrNull(product.handle)
  };
}

function sortIssues(issues: ProductIssue[]): ProductIssue[] {
  return [...issues].sort((a, b) => {
    const severityDifference = severityRank[a.severity] - severityRank[b.severity];

    if (severityDifference !== 0) {
      return severityDifference;
    }

    if (a.rowNumber !== b.rowNumber) {
      return a.rowNumber - b.rowNumber;
    }

    return a.issueCode.localeCompare(b.issueCode);
  });
}

function dedupeIssues(issues: ProductIssue[]): ProductIssue[] {
  const seen = new Set<string>();

  return issues.filter((issue) => {
    const key = `${issue.rowNumber}:${issue.issueCode}:${issue.field ?? ""}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function detectDuplicateGtins(products: NormalizedProduct[]): ProductIssue[] {
  const gtinRows = new Map<string, NormalizedProduct[]>();

  products.forEach((product) => {
    const gtin = trimOrNull(product.gtin);
    if (!gtin) {
      return;
    }

    gtinRows.set(gtin, [...(gtinRows.get(gtin) ?? []), product]);
  });

  return Array.from(gtinRows.values()).flatMap((affectedProducts) => {
    if (affectedProducts.length < 2) {
      return [];
    }

    return affectedProducts.map((product) =>
      createIssue(product, {
        issueCode: "duplicate_gtin",
        severity: "warning",
        category: "identifier",
        fixType: "manual_review",
        field: "gtin",
        currentValue: trimOrNull(product.gtin),
        explanation:
          "The same GTIN appears on multiple product rows. This may be valid for variants in some cases, but it can also indicate incorrect product identifier data.",
        suggestedFix:
          "Confirm whether these products are true variants sharing a valid identifier or whether each product should have its own identifier.",
        autoFixable: false,
        manualReviewRequired: true
      })
    );
  });
}

function titleLooksRisky(title: string): boolean {
  return PROMOTIONAL_TITLE_PATTERNS.some((pattern) => pattern.test(title)) || title === title.toUpperCase();
}

export function detectIdentifierIssues(
  products: NormalizedProduct[],
  merchantCenterErrorContext?: MerchantCenterErrorContext
): ProductIssue[] {
  if (products.length === 0) {
    return [];
  }

  const rowIssues = products.flatMap((product) => {
    const issues: ProductIssue[] = [];
    const gtin = trimOrNull(product.gtin);
    const mpn = trimOrNull(product.mpn);
    const brand = trimOrNull(product.brand);
    const vendor = trimOrNull(product.vendor);
    const sku = trimOrNull(product.sku);
    const title = trimOrNull(product.title);
    const description = trimOrNull(product.description);
    const link = trimOrNull(product.link);
    const image = trimOrNull(product.image);
    const price = trimOrNull(product.price);
    const availability = trimOrNull(product.availability)?.toLowerCase() ?? null;
    const color = trimOrNull(product.color);
    const size = trimOrNull(product.size);
    const ageGroup = trimOrNull(product.ageGroup);
    const gender = trimOrNull(product.gender);

    if (product.identifierExists === true && !gtin && !mpn) {
      issues.push(
        createIssue(product, {
          issueCode: "identifier_exists_conflict",
          severity: "critical",
          category: "identifier",
          fixType: "manual_review",
          field: "identifier_exists",
          currentValue: "true",
          explanation:
            "This product declares that product identifiers exist, but no GTIN or MPN is provided. Google Merchant Center may treat this as inconsistent product identifier data.",
          suggestedFix:
            "Provide valid product identifiers if they exist. If the product is custom, handmade, personalized, or made to order and has no manufacturer identifier, review whether identifier_exists should be set to no.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!gtin && !(product.isPossibleCustomProduct && product.identifierExists === false)) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_gtin",
          severity: "warning",
          category: "identifier",
          fixType: "manual_review",
          field: "gtin",
          currentValue: null,
          explanation: "GTIN is missing for this product.",
          suggestedFix:
            "Check the product packaging, manufacturer data, or official product information. Do not invent a GTIN.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!mpn && !gtin) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_mpn",
          severity: "warning",
          category: "identifier",
          fixType: "manual_review",
          field: "mpn",
          currentValue: null,
          explanation: "MPN is missing and no GTIN was found. If the product has a manufacturer part number, it should be provided.",
          suggestedFix:
            "Confirm whether the product has a real manufacturer part number. Do not use an internal SKU as MPN unless it is truly the manufacturer part number.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!brand && !vendor) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_brand",
          severity: "warning",
          category: "brand",
          fixType: "manual_review",
          field: "brand",
          currentValue: null,
          explanation: "Brand or vendor information is missing for this product.",
          suggestedFix: "Add the real brand or confirm whether the Shopify vendor can be used as the brand. Do not invent a brand.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (product.identifierExists === null || product.identifierExists === undefined) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_identifier_exists",
          severity: "info",
          category: "identifier",
          fixType: "informational",
          field: "identifier_exists",
          currentValue: null,
          explanation: "The file does not explicitly say whether product identifiers exist for this product.",
          suggestedFix:
            "Review whether identifier_exists should be true or false based on whether the product has real GTIN, MPN, or brand data.",
          autoFixable: false,
          manualReviewRequired: false
        })
      );
    }

    if (gtin && !isValidGtinFormat(gtin)) {
      issues.push(
        createIssue(product, {
          issueCode: "invalid_gtin_format",
          severity: "warning",
          category: "identifier",
          fixType: "manual_review",
          field: "gtin",
          currentValue: gtin,
          explanation: "The GTIN contains non-numeric characters.",
          suggestedFix:
            "Review the GTIN from the product packaging, manufacturer, or official product data. Do not generate a replacement.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (gtin && isValidGtinFormat(gtin) && !isValidGtinLength(gtin)) {
      issues.push(
        createIssue(product, {
          issueCode: "invalid_gtin_length",
          severity: "warning",
          category: "identifier",
          fixType: "manual_review",
          field: "gtin",
          currentValue: gtin,
          explanation: "The GTIN length does not match common valid GTIN lengths.",
          suggestedFix: "Review the GTIN from the product packaging, manufacturer, or official product data.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (sku && mpn && sku === mpn) {
      issues.push(
        createIssue(product, {
          issueCode: "sku_same_as_mpn",
          severity: "info",
          category: "identifier",
          fixType: "informational",
          field: "mpn",
          currentValue: mpn,
          explanation: "The SKU and MPN are identical. This may be correct only if the SKU is truly the manufacturer part number.",
          suggestedFix: "Confirm whether the SKU is a real manufacturer part number before using it as MPN.",
          autoFixable: false,
          manualReviewRequired: false
        })
      );
    }

    if (product.isPossibleCustomProduct && !hasAnyIdentifier(product)) {
      issues.push(
        createIssue(product, {
          issueCode: "possible_custom_product",
          severity: "info",
          category: "manual_review",
          fixType: "manual_review",
          field: "title",
          currentValue: product.title,
          explanation:
            "This product appears to be custom, handmade, personalized, or made to order based on its title or handle.",
          suggestedFix:
            "If this product truly has no manufacturer identifier, review whether identifier_exists should be set to no. Do not change it automatically without confirmation.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!title) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_title",
          severity: "warning",
          category: "data_quality",
          fixType: "manual_review",
          field: "title",
          currentValue: null,
          explanation: "Product title is missing for this row.",
          suggestedFix: "Add a clear product title that describes the real item. Do not use keyword stuffing or promotional phrases.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (title && merchantCenterErrorContext?.mentionsTitle && titleLooksRisky(title)) {
      issues.push(
        createIssue(product, {
          issueCode: "invalid_title",
          severity: "warning",
          category: "data_quality",
          fixType: "manual_review",
          field: "title",
          currentValue: title,
          explanation: "The title may contain risky formatting or promotional wording for Merchant Center.",
          suggestedFix: "Review the title manually and keep it accurate, readable, and aligned with the product landing page.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!description) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_description",
          severity: "warning",
          category: "data_quality",
          fixType: "manual_review",
          field: "description",
          currentValue: null,
          explanation: "Product description is missing for this row.",
          suggestedFix: "Add a product-specific description based on the real item. Do not invent specifications or paste unrelated boilerplate.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsLink && !link) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_link",
          severity: "warning",
          category: "data_quality",
          fixType: "manual_review",
          field: "link",
          currentValue: null,
          explanation: "Merchant Center warning mentions a product link or landing page, but no product link column was detected in this CSV row.",
          suggestedFix: "Check Shopify handle, published state, online store channel, feed link mapping, and live URL access before resubmitting.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!image) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_image",
          severity: "warning",
          category: "image",
          fixType: "manual_review",
          field: "image",
          currentValue: null,
          explanation: "Image data is missing for this product.",
          suggestedFix: "Add a valid product image URL in Shopify before resubmitting to Google Merchant Center.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (!price) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_price",
          severity: "warning",
          category: "price",
          fixType: "manual_review",
          field: "price",
          currentValue: null,
          explanation: "Price data is missing for this product.",
          suggestedFix: "Add a valid product price in Shopify before resubmitting to Google Merchant Center.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsAvailability && (!availability || !VALID_AVAILABILITY_VALUES.has(availability))) {
      issues.push(
        createIssue(product, {
          issueCode: "invalid_availability",
          severity: "warning",
          category: "availability",
          fixType: "manual_review",
          field: "availability",
          currentValue: availability,
          explanation: "Merchant Center warning mentions availability, but the submitted availability value is missing or not one of the standard supported values.",
          suggestedFix: "Review Shopify inventory, product status, storefront availability, and feed availability mapping before changing this value.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsColor && !color) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_color",
          severity: "warning",
          category: "apparel",
          fixType: "manual_review",
          field: "color",
          currentValue: null,
          explanation: "Merchant Center warning mentions color, but no color value was detected for this row.",
          suggestedFix: "Review product options, title, tags, category, and feed color mapping. Do not guess color values from images alone.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsSize && !size) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_size",
          severity: "warning",
          category: "apparel",
          fixType: "manual_review",
          field: "size",
          currentValue: null,
          explanation: "Merchant Center warning mentions size, but no size value was detected for this row.",
          suggestedFix: "Review product options, variant titles, tags, and feed size mapping. Do not bulk-fill one size across variants.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsAgeGroup && !ageGroup) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_age_group",
          severity: "warning",
          category: "apparel",
          fixType: "manual_review",
          field: "age_group",
          currentValue: null,
          explanation: "Merchant Center warning mentions age_group, but no age group value was detected for this row.",
          suggestedFix: "Review product audience and Google product category before choosing the correct age_group value.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    if (merchantCenterErrorContext?.mentionsGender && !gender) {
      issues.push(
        createIssue(product, {
          issueCode: "missing_gender",
          severity: "warning",
          category: "apparel",
          fixType: "manual_review",
          field: "gender",
          currentValue: null,
          explanation: "Merchant Center warning mentions gender, but no gender value was detected for this row.",
          suggestedFix: "Review product audience, unisex cases, category, tags, and feed gender mapping before editing.",
          autoFixable: false,
          manualReviewRequired: true
        })
      );
    }

    return issues;
  });

  return sortIssues(dedupeIssues([...rowIssues, ...detectDuplicateGtins(products)]));
}

export function getIssueAction(issueCode: IssueCode): string {
  const actions: Record<IssueCode, string> = {
    missing_gtin: "review_gtin",
    missing_mpn: "review_mpn",
    missing_brand: "review_brand",
    missing_identifier_exists: "review_identifier_exists",
    identifier_exists_conflict: "review_identifier_exists",
    invalid_gtin_length: "review_invalid_gtin",
    invalid_gtin_format: "review_invalid_gtin",
    duplicate_gtin: "review_duplicate_gtin",
    sku_same_as_mpn: "review_sku_mpn",
    possible_custom_product: "manual_review",
    missing_title: "review_title",
    invalid_title: "review_title",
    missing_description: "review_description",
    missing_link: "review_link",
    missing_image: "review_image",
    missing_price: "review_price",
    invalid_availability: "review_availability",
    missing_color: "review_color",
    missing_size: "review_size",
    missing_age_group: "review_age_group",
    missing_gender: "review_gender",
    unrecognized_columns: "manual_review",
    empty_file: "manual_review",
    invalid_csv: "manual_review",
    manual_review_required: "manual_review"
  };

  return actions[issueCode];
}