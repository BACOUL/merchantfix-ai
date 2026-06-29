import { describe, expect, it } from "vitest";
import { getMerchantCenterGuideUrl } from "../lib/merchant-center-guide-urls";
import { supportedMerchantCenterErrors } from "../lib/merchant-center-errors";

const expectedExactGuideUrls = {
  "missing-title": "/fix/google-merchant-center-missing-title",
  "invalid-title": "/fix/google-merchant-center-invalid-title",
  "missing-description": "/fix/google-merchant-center-missing-description",
  "link-issue": "/fix/google-merchant-center-invalid-link",
  "missing-image-link": "/fix/google-merchant-center-missing-image-link",
  "invalid-availability": "/fix/google-merchant-center-invalid-availability",
  "missing-color": "/fix/google-merchant-center-missing-color",
  "missing-size": "/fix/google-merchant-center-missing-size",
  "missing-age-group": "/fix/google-merchant-center-missing-age-group",
  "missing-gender": "/fix/google-merchant-center-missing-gender"
};

describe("getMerchantCenterGuideUrl", () => {
  it("routes newly mapped warning families to exact SEO guides", () => {
    for (const [issueId, expectedUrl] of Object.entries(expectedExactGuideUrls)) {
      const issue = supportedMerchantCenterErrors.find((candidate) => candidate.id === issueId);

      expect(issue?.id).toBe(issueId);
      expect(getMerchantCenterGuideUrl(issue!)).toBe(expectedUrl);
    }
  });

  it("falls back to the configured guide URL for unmapped families", () => {
    const issue = supportedMerchantCenterErrors.find((candidate) => candidate.id === "missing-gtin");

    expect(issue?.guideUrl).toBe("/fix/missing-value-gtin-shopify");
    expect(getMerchantCenterGuideUrl(issue!)).toBe("/fix/missing-value-gtin-shopify");
  });
});
