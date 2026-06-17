import { gmcErrorSeoPages } from "./gmcErrorSeo";
import { moreGmcErrorSeoPages } from "./gmcErrorSeoMore";

export const combinedGmcErrorSeoPages = [...gmcErrorSeoPages, ...moreGmcErrorSeoPages] as const;

export function getCombinedGmcErrorSeoPage(slug: string) {
  return combinedGmcErrorSeoPages.find((page) => page.slug === slug);
}
