import { VALID_GTIN_LENGTHS } from "./types";

const TRUE_VALUES = new Set(["true", "yes", "1", "y"]);
const FALSE_VALUES = new Set(["false", "no", "0", "n"]);

export function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || String(value).trim() === "";
}

export function normalizeIdentifierExistsValue(value: unknown): boolean | null {
  if (isEmptyValue(value)) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();

  if (TRUE_VALUES.has(normalized)) {
    return true;
  }

  if (FALSE_VALUES.has(normalized)) {
    return false;
  }

  return null;
}

export function isValidGtinFormat(gtin: string): boolean {
  const trimmed = gtin.trim();
  return trimmed.length > 0 && /^\d+$/.test(trimmed);
}

export function isValidGtinLength(gtin: string): boolean {
  const trimmed = gtin.trim();
  return VALID_GTIN_LENGTHS.includes(trimmed.length as (typeof VALID_GTIN_LENGTHS)[number]);
}

export function isValidLookingGtin(value: string): boolean {
  return isValidGtinFormat(value) && isValidGtinLength(value);
}
