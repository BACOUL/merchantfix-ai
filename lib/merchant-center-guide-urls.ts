import type { SupportedMerchantCenterError } from "./merchant-center-errors";

const exactGuideUrlsByIssueId: Record<string, string> = {
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

export function getMerchantCenterGuideUrl(issue: Pick<SupportedMerchantCenterError, "id" | "guideUrl">) {
  return exactGuideUrlsByIssueId[issue.id] ?? issue.guideUrl;
}
