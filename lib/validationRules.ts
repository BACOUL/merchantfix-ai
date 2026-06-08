const validGtinLengths = new Set([8, 12, 13, 14]);

export function isValidLookingGtin(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === value.length && validGtinLengths.has(digits.length);
}
