type DisclaimerProps = {
  children: React.ReactNode;
};

export function Disclaimer({ children }: DisclaimerProps) {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      {children}
    </aside>
  );
}
