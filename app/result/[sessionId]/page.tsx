type ResultPageProps = {
  params: {
    sessionId: string;
  };
};

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Placeholder result</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">CSV Diagnostic Result</h1>
        <p className="mt-4 text-slate-700">Session: {params.sessionId}</p>
        <p className="mt-4 leading-7 text-slate-700">
          This placeholder page reserves the future result experience for Shopify CSV identifier diagnosis. No payment,
          authentication, database, API integrations, AI features, PDF export, ZIP export, or monitoring have been added.
        </p>
      </section>
    </main>
  );
}
