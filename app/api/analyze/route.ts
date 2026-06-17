import { NextRequest, NextResponse } from "next/server";
import { analyzeShopifyCsv } from "@/lib/analyzeShopifyCsv";
import { generateCorrectedCsv } from "@/lib/generateCorrectedCsv";

type StripeCheckoutSession = {
  status?: string;
  payment_status?: string;
  metadata?: {
    plan?: string;
  };
  error?: {
    message?: string;
  };
};

type AccessGateResult = {
  allowed: boolean;
  error: string | null;
};

function verifyDiagnosticTestToken(testToken: string): AccessGateResult {
  const configuredToken = process.env.DIAGNOSTIC_TEST_TOKEN;

  if (!configuredToken) {
    return {
      allowed: false,
      error: "Diagnostic test mode is not configured yet. Add DIAGNOSTIC_TEST_TOKEN in Vercel before using unpaid API tests."
    };
  }

  if (testToken !== configuredToken) {
    return {
      allowed: false,
      error: "Invalid diagnostic test token."
    };
  }

  return {
    allowed: true,
    error: null
  };
}

async function verifyPaidCheckoutSession(sessionId: string): Promise<AccessGateResult> {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return {
      allowed: false,
      error: "Stripe verification is not configured yet. Add STRIPE_SECRET_KEY in Vercel before using the paid diagnostic area."
    };
  }

  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`
    },
    cache: "no-store"
  });

  const session = (await response.json()) as StripeCheckoutSession;

  if (!response.ok) {
    return {
      allowed: false,
      error: session.error?.message || "Stripe could not verify this checkout session."
    };
  }

  if (session.payment_status !== "paid") {
    return {
      allowed: false,
      error: "This checkout session is not marked as paid yet. Complete payment before generating a CSV diagnostic report."
    };
  }

  if (session.status && session.status !== "complete") {
    return {
      allowed: false,
      error: "This checkout session is not complete yet. Complete checkout before generating a CSV diagnostic report."
    };
  }

  return {
    allowed: true,
    error: null
  };
}

async function verifyDiagnosticAccess(stripeSessionId: string, diagnosticTestToken: string): Promise<AccessGateResult> {
  if (diagnosticTestToken) {
    return verifyDiagnosticTestToken(diagnosticTestToken);
  }

  if (!stripeSessionId) {
    return {
      allowed: false,
      error: "A verified Stripe checkout session or private diagnostic test token is required before generating a CSV diagnostic report."
    };
  }

  return verifyPaidCheckoutSession(stripeSessionId);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const stripeSessionId = String(formData.get("stripeSessionId") ?? "").trim();
    const diagnosticTestToken = String(formData.get("diagnosticTestToken") ?? "").trim();
    const gate = await verifyDiagnosticAccess(stripeSessionId, diagnosticTestToken);

    if (!gate.allowed) {
      return NextResponse.json(
        {
          error: gate.error,
          correctedCsvResult: null
        },
        { status: 402 }
      );
    }

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
