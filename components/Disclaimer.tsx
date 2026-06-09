type DisclaimerProps = {
  children: React.ReactNode;
};

export function Disclaimer({ children }: DisclaimerProps) {
  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50/85 p-4 text-sm leading-6 text-amber-950">
      {children}
    </aside>
  );
}
