import { shopifyCsvFields } from "@/lib/shopify-csv-fields";

const priorityTone = {
  Required: "border-red-200 bg-red-50 text-red-800",
  Recommended: "border-amber-200 bg-amber-50 text-amber-900",
  Useful: "border-blue-200 bg-blue-50 text-blue-800"
};

export function ShopifyCsvRequirements() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {shopifyCsvFields.map((item) => (
        <article key={item.field} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="font-black text-slate-950">{item.field}</h3>
            <span className={`w-fit rounded-full border px-2 py-1 text-xs font-black ${priorityTone[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.usedFor}</p>
        </article>
      ))}
    </div>
  );
}
