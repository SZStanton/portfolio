// The small gold label above a page or section heading.
export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}
