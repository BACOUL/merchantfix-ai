export function SafeDiagnosticNotice() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em]">Safe diagnostics only</p>
      <h3 className="mt-3 text-2xl font-black tracking-tight">No fake GTINs. No invented product data. No approval guarantee.</h3>
      <p className="mt-3 leading-7 font-semibold">
        MerchantFix helps identify Shopify product data issues and safe next actions. It does not create fake identifiers, does not connect to Google Merchant Center, and does not guarantee approval or sales.
      </p>
    </div>
  );
}
