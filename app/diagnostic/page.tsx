import type { Metadata } from "next";
import { CsvUploadForm, PrimaryLink, SecondaryLink, TextBadge } from "@/components";
import { SUPPORT_EMAIL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CSV Diagnostic | MerchantFix.ai",
  description: "Upload a Shopify CSV after checkout to generate a MerchantFix.ai diagnostic report.",
  robots: {
    index: false,
    follow: false
  }
};

type DiagnosticPageProps = {
  searchParams?: {
    session_id?: string | string[];
    test_token?: string | string[];
  };
};

type StripeCheckoutSession = {
  id?: string;
  status?: string;
  payment_status?: string;
  metadata?: {
    plan?: string;
  };
};

type SessionGateResult = {
  allowed: boolean;
  reason: string;
  sessionId?: string;
  testToken?: string;
  plan?: string;
  mode?: "stripe" | "test";
};

const uploadChecklist = [
  "Use an original Shopify product export when possible.",
  "Do not sort the CSV before uploading it.",
  "Keep a backup copy before importing any edited file into Shopify.",
  "Do not invent GTIN, MPN, brand, price, or product facts to satisfy a warning."
];

const diagnosticLimits = [
  "This page is intended for customers who completed checkout or for private test access.",
  "The report is a product data diagnostic, not a Google approval guarantee.",
  "Manual review rows require merchant, supplier, or manufacturer verification.",
  `Contact support at ${SUPPORT_EMAIL} if you cannot complete the upload after payment.`
];

function getSearchValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function verifyDiagnosticTestToken(testToken?: string): SessionGateResult | null {
  if (!testToken) {
    return null;
  }

  const configuredToken = process.env.DIAGNOSTIC_TEST_TOKEN;

  if (!configuredToken) {
    return {
      allowed: false,
      testToken,
      mode: "test",
      reason: "Diagnostic test mode is not configured yet. Add DIAGNOSTIC_TEST_TOKEN in Vercel before using unpaid API tests."
    };
  }

  if (testToken !== configuredToken) {
    return {
      allowed: false,
      testToken,
      mode: "test",
      reason: "Invalid diagnostic test token."
    };
  }

  return {
    allowed: true,
    testToken,
    mode: "test",
    plan: "test-mode",
    reason: "Private diagnostic test access verified."
  };
}

async function verifyCheckoutSession(sessionId?: string): Promise<SessionGateResult> {
  if (!sessionId) {
    return {
      allowed: false,
      reason: "Open this page from the payment confirmation screen so MerchantFix.ai can verify your Stripe checkout session."
    };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return {
      allowed: false,
      sessionId,
      mode: "stripe",
      reason: "Stripe verification is not configured yet. Add STRIPE_SECRET_KEY in Vercel before using the paid diagnostic area."
    };
  }

  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      },
      cache: "no-store"
    });

    const session = (await response.json()) as StripeCheckoutSession & { error?: { message?: string } };

    if (!response.ok) {
      return {
        allowed: false,
        sessionId,
        mode: "stripe",
        reason: session.error?.message || "Stripe could not verify this checkout session."
      };
    }

    if (session.payment_status !== "paid") {
      return {
        allowed: false,
        sessionId,
        mode: "stripe",
        reason: "This checkout session is not marked as paid yet. Complete payment before opening the diagnostic area."
      };
    }

    if (session.status && session.status !== "complete") {
      return {
        allowed: false,
        sessionId,
        mode: "stripe",
        reason: "This checkout session is not complete yet. Complete checkout before opening the diagnostic area."
      };
    }

    return {
      allowed: true,
      sessionId,
      mode: "stripe",
      plan: session.metadata?.plan,
      reason: "Payment verified."
    };
  } catch {
    return {
      allowed: false,
      sessionId,
      mode: "stripe",
      reason: "Stripe verification failed. Try again or contact support with your Stripe session ID."
    };
  }
}

async function verifyDiagnosticAccess(searchParams?: DiagnosticPageProps["searchParams"]) {
  const testToken = getSearchValue(searchParams?.test_token);
  const testGate = verifyDiagnosticTestToken(testToken);

  if (testGate) {
    return testGate;
  }

  return verifyCheckoutSession(getSearchValue(searchParams?.session_id));
}

function LockedDiagnostic({ gate }: { gate: SessionGateResult }) {
  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-24">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="amber">Diagnostic locked</TextBadge>
              <TextBadge tone="blue">Access verification required</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Complete checkout or use a private test token before uploading a Shopify CSV.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{gate.reason}</p>
            {gate.sessionId ? (
              <p className="mt-5 max-w-3xl rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-bold leading-6 text-slate-200">
                Stripe session: {gate.sessionId}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/fix-pack">Buy Fix Pack</PrimaryLink>
              <SecondaryLink href="/pricing">Back to pricing</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Support</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Already paid or testing privately?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Contact <a className="font-black text-blue-700 underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your Stripe confirmation email, session ID, or test context.
          </p>
        </div>
      </section>
    </main>
  );
}

export default async function DiagnosticPage({ searchParams }: DiagnosticPageProps) {
  const gate = await verifyDiagnosticAccess(searchParams);

  if (!gate.allowed) {
    return <LockedDiagnostic gate={gate} />;
  }

  const isTestMode = gate.mode === "test";

  return (
    <main className="overflow-x-hidden">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <TextBadge tone="green">{isTestMode ? "Test access verified" : "Payment verified"}</TextBadge>
              <TextBadge tone="blue">Shopify CSV upload</TextBadge>
            </div>
            <h1 className="mt-6 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              Generate your Shopify CSV diagnostic report.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              {isTestMode
                ? "Private test access is verified. Upload a Shopify product export to test the diagnostic API before enabling Stripe payments."
                : "Your Stripe checkout session is verified. Upload a clean Shopify product export to receive a prioritized report with safe fixes and manual review rows."}
            </p>
            {gate.sessionId ? (
              <p className="mt-5 max-w-3xl rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-bold leading-6 text-slate-200">
                Stripe session: {gate.sessionId}{gate.plan ? ` · Plan: ${gate.plan}` : ""}
              </p>
            ) : null}
            {isTestMode ? (
              <p className="mt-5 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
                Test mode is for private validation only. Do not share the test URL publicly.
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SecondaryLink href="/how-to-export-shopify-csv">How to export CSV</SecondaryLink>
              <SecondaryLink href="/methodology">Read methodology</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Before upload</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Use the cleanest CSV you have.</h2>
            <p className="mt-4 leading-7 font-semibold">
              A clean Shopify export reduces false positives and makes manual review easier.
            </p>
          </div>
          <div className="grid gap-3">
            {uploadChecklist.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 font-semibold leading-7 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
        <CsvUploadForm checkoutSessionId={gate.sessionId} diagnosticTestToken={gate.testToken} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Important limits</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Review before changing your feed.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {diagnosticLimits.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-semibold leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
