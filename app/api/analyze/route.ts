import { NextRequest, NextResponse } from "next/server";
import { analyzeShopifyCsv } from "@/lib/analyzeShopifyCsv";
import { generateCorrectedCsv } from "@/lib/generateCorrectedCsv";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const csvFile = formData.get("csvFile");
    const merchantCenterErrorText = String(formData.get("merchantCenterErrorText") ?? "");

    if (!(csvFile instanceof File)) {
      const analysis = analyzeShopifyCsv({
        csvText: "",
        merchantCenterErrorText
      });

      return NextResponse.json(
        {
          error: "No Shopify CSV file was provided.",
          analysis,
          correctedCsvResult: null
        },
        { status: 400 }
      );
    }

    const csvText = await csvFile.text();
    const analysis = analyzeShopifyCsv({
      csvText,
      merchantCenterErrorText
    });
    const correctedCsvResult =
      analysis.status !== "error" && analysis.correctedCsvAvailable
        ? generateCorrectedCsv({
            sessionId: analysis.sessionId,
            products: analysis.normalizedProducts ?? [],
            issues: analysis.issues,
            originalRows: analysis.originalRows ?? [],
            merchantCenterErrorText
          })
        : null;

    return NextResponse.json(
      {
        analysis: {
          ...analysis,
          normalizedProducts: undefined,
          originalRows: undefined
        },
        correctedCsvResult
      },
      { status: analysis.status === "error" ? 400 : 200 }
    );
  } catch {
    const analysis = analyzeShopifyCsv({ csvText: "" });

    return NextResponse.json(
      {
        error: "The uploaded file could not be read.",
        analysis,
        correctedCsvResult: null
      },
      { status: 400 }
    );
  }
}
