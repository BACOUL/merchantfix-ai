import Link from "next/link";

const navItems = [
  { href: "/fix-pack", label: "Fix Pack" },
  { href: "/pricing", label: "Pricing" },
  { href: "/methodology", label: "Methodology" },
  { href: "/security", label: "Security" },
  { href: "/sample-report", label: "Sample report" },
  { href: "/fix", label: "Guides" }
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8" aria-label="Main navigation">
          <Link href="/" className="flex min-w-0 items-center gap-3 font-black tracking-tight text-slate-950">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-sm text-white">MF</span>
            <span className="hidden sm:inline">MerchantFix.ai</span>
          </Link>

          <div className="hidden items-center gap-4 text-sm font-semibold text-slate-600 xl:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/fix-pack"
            aria-label="View MerchantFix Fix Pack"
            className="shrink-0 rounded-full bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-800 sm:px-4"
          >
            <span className="hidden sm:inline">View Fix Pack</span>
            <span className="sm:hidden">Fix Pack</span>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-5 md:grid-cols-[1fr_auto_auto_auto] md:px-8">
          <div className="min-w-0">
            <p className="font-black text-slate-950">MerchantFix.ai</p>
            <p className="mt-3 max-w-xl leading-6">
              Focused Shopify product data diagnosis for surface risks, GTIN, MPN, brand, and identifier_exists issues.
              Google approval is not guaranteed.
            </p>
          </div>
          <div className="grid min-w-0 gap-2 font-semibold">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Commercial</p>
            <Link href="/fix-pack" className="hover:text-slate-950">
              Fix Pack
            </Link>
            <Link href="/pricing" className="hover:text-slate-950">
              Pricing
            </Link>
            <Link href="/sample-report" className="hover:text-slate-950">
              Sample report
            </Link>
          </div>
          <div className="grid min-w-0 gap-2 font-semibold">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Product</p>
            <Link href="/methodology" className="hover:text-slate-950">
              Methodology
            </Link>
            <Link href="/security" className="hover:text-slate-950">
              Security
            </Link>
            <Link href="/how-to-export-shopify-csv" className="hover:text-slate-950">
              Export Shopify CSV
            </Link>
            <Link href="/#csv-diagnostic" className="hover:text-slate-950">
              Upload Shopify CSV
            </Link>
            <Link href="/scan" className="hover:text-slate-950">
              Scan my Shopify store
            </Link>
            <Link href="/fix" className="hover:text-slate-950">
              Product data guides
            </Link>
          </div>
          <div className="grid min-w-0 gap-2 font-semibold">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Legal</p>
            <Link href="/legal-notice" className="hover:text-slate-950">
              Legal Notice
            </Link>
            <Link href="/privacy" className="hover:text-slate-950">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-950">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">
      {children}
    </p>
  );
}

export function TextBadge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "slate" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    slate: "border-slate-200 bg-white text-slate-700"
  };

  return (
    <span className={`inline-flex max-w-full items-center break-words rounded-full border px-3 py-1 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex max-w-full items-center justify-center whitespace-normal break-words rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-800">
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex max-w-full items-center justify-center whitespace-normal break-words rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
