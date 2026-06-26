import Link from "next/link";

const navItems = [
  { href: "/#paste-error", label: "Paste error" },
  { href: "/fix-pack", label: "Fix Pack" },
  { href: "/merchantfix-vs-feed-apps", label: "Vs feed apps" },
  { href: "/sample-report", label: "Sample report" },
  { href: "/pricing", label: "Pricing" },
  { href: "/fix", label: "Error guides" },
  { href: "/reference", label: "Reference" },
  { href: "/how-it-works", label: "How it works" }
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8" aria-label="Main navigation">
          <Link href="/" className="flex min-w-0 items-center gap-3 font-black tracking-tight text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm text-white shadow-lg shadow-slate-950/15">MF</span>
            <span className="hidden text-base sm:inline">MerchantFix.ai</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 px-2 py-1 text-xs font-bold text-slate-600 lg:flex xl:text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-slate-950 hover:shadow-sm">
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#paste-error"
            aria-label="Paste a Google Merchant Center error"
            className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:px-5"
          >
            <span className="hidden sm:inline">Paste error</span>
            <span className="sm:hidden">Error</span>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-slate-600 sm:px-5 md:grid-cols-[1.2fr_auto_auto_auto] md:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-950 text-xs font-black text-white">MF</span>
              <p className="font-black text-slate-950">MerchantFix.ai</p>
            </div>
            <p className="mt-4 max-w-xl leading-7">
              Shopify CSV diagnosis for Google Merchant Center warnings. MerchantFix helps identify product-data issues before merchants edit or resubmit. Google approval is not guaranteed.
            </p>
          </div>
          <div className="grid min-w-0 gap-2 font-semibold">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Commercial</p>
            <Link href="/fix-pack" className="hover:text-slate-950">
              Fix Pack
            </Link>
            <Link href="/merchantfix-vs-feed-apps" className="hover:text-slate-950">
              MerchantFix vs feed apps
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
            <Link href="/#paste-error" className="hover:text-slate-950">
              Paste error
            </Link>
            <Link href="/fix" className="hover:text-slate-950">
              Error guides
            </Link>
            <Link href="/reference" className="hover:text-slate-950">
              Reference library
            </Link>
            <Link href="/supported-errors" className="hover:text-slate-950">
              Supported errors
            </Link>
            <Link href="/how-it-works" className="hover:text-slate-950">
              How it works
            </Link>
            <Link href="/methodology" className="hover:text-slate-950">
              Methodology
            </Link>
            <Link href="/security" className="hover:text-slate-950">
              Security
            </Link>
            <Link href="/how-to-export-shopify-csv" className="hover:text-slate-950">
              Export Shopify CSV
            </Link>
            <Link href="/scan" className="hover:text-slate-950">
              Scan my Shopify store
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
    slate: "border-slate-200 bg-white/90 text-slate-700"
  };

  return (
    <span className={`inline-flex max-w-full items-center break-words rounded-full border px-3 py-1 text-xs font-black shadow-sm ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex max-w-full items-center justify-center whitespace-normal break-words rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800">
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex max-w-full items-center justify-center whitespace-normal break-words rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
