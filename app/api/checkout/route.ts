import { NextRequest, NextResponse } from "next/server";

type PlanKey = "fix-pack" | "pro-review";

type CheckoutProduct = {
  name: string;
  description: string;
  unitAmount: number;
};

const products: Record<PlanKey, CheckoutProduct> = {
  "fix-pack": {
    name: "MerchantFix Fix Pack",
    description: "One-time Shopify CSV diagnostic for Google Merchant Center product data issues.",
    unitAmount: 2900
  },
  "pro-review": {
    name: "MerchantFix Pro Review",
    description: "Fix Pack plus priority manual review guidance and deeper resubmission checklist.",
    unitAmount: 7900
  }
};

function getOrigin(request: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return "https://merchantfix-ai.com";
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe checkout is not configured yet. Add STRIPE_SECRET_KEY in Vercel environment variables." },
      { status: 503 }
    );
  }

  let payload: { plan?: PlanKey };

  try {
    payload = (await request.json()) as { plan?: PlanKey };
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const plan = payload.plan;

  if (!plan || !products[plan]) {
    return NextResponse.json({ error: "Unknown checkout plan." }, { status: 400 });
  }

  const product = products[plan];
  const origin = getOrigin(request);
  const body = new URLSearchParams();

  body.append("mode", "payment");
  body.append("success_url", `${origin}/success?session_id={CHECKOUT_SESSION_ID}`);
  body.append("cancel_url", `${origin}/cancel`);
  body.append("allow_promotion_codes", "true");
  body.append("billing_address_collection", "auto");
  body.append("customer_creation", "if_required");
  body.append("metadata[plan]", plan);
  body.append("line_items[0][quantity]", "1");
  body.append("line_items[0][price_data][currency]", "eur");
  body.append("line_items[0][price_data][unit_amount]", String(product.unitAmount));
  body.append("line_items[0][price_data][product_data][name]", product.name);
  body.append("line_items[0][price_data][product_data][description]", product.description);

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const stripePayload = (await stripeResponse.json()) as { url?: string; error?: { message?: string } };

  if (!stripeResponse.ok || !stripePayload.url) {
    return NextResponse.json(
      { error: stripePayload.error?.message || "Stripe checkout could not be created." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: stripePayload.url });
}
