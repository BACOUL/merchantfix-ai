import Link from "next/link";
import { Disclaimer } from "@/components";

type ResultPageProps = {
  params: {
    sessionId: string;
  };
};

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <Link href="/#csv-diagnostic" className="font-semibold text-blue-700">
        Back to CSV diagnostic
      </Link>
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">No database result shell</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">MerchantFix Diagnostic Result</h1>
        <p className="mt-4 text-slate-700">Session: {params.sessionId}</p>
        <p className="mt-4 leading-7 text-slate-700">
          V1 displays diagnostic results directly after CSV analysis because this version does not add authentication,
          database storage, or persistent file storage. Upload a Shopify CSV from the homepage to run a fresh diagnostic.
        </p>
      </section>
      <Disclaimer>
        MerchantFix.ai helps diagnose and fix product data issues. Some issues may require manual review. Google
        approval is not guaranteed.
      </Disclaimer>
    </main>
  );
}
