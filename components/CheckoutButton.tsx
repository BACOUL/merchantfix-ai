"use client";

import { useState } from "react";

type CheckoutPlan = "fix-pack" | "pro-review";

type CheckoutButtonProps = {
  plan: CheckoutPlan;
  children: React.ReactNode;
  className?: string;
};

export function CheckoutButton({ plan, children, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ plan })
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Checkout could not be started.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Checkout could not be started.");
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className={
          className ||
          "inline-flex max-w-full items-center justify-center whitespace-normal break-words rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        }
      >
        {isLoading ? "Opening secure checkout..." : children}
      </button>
      {errorMessage ? (
        <p className="max-w-sm rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold leading-6 text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
