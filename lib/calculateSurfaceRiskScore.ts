import type { SurfaceRisk } from "./types";

export function calculateSurfaceRiskScore(productCount: number, risks: SurfaceRisk[]): number {
  if (productCount === 0) {
    return 0;
  }

  const penalty = risks.reduce((total, risk) => {
    if (risk.severity === "critical") return total + 10;
    if (risk.severity === "warning") return total + 6;
    return total + 3;
  }, 0);

  return Math.max(0, Math.min(100, 100 - Math.round(penalty / productCount)));
}
