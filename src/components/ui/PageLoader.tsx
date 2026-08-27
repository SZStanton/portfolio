// Shown once per tab while a page chunk downloads, covering the screen underneath.
export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-surface"
      role="status"
    >
      <span className="size-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
