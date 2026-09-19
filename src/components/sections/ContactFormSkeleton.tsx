// Stands in while the form chunk loads. Heights match the real fields, so the page
// does not jump when it swaps in and a #contact deep link lands where it should.
export function ContactFormSkeleton() {
  return (
    <div className="space-y-6 md:col-span-3" aria-hidden="true">
      <div>
        <div className="h-5 w-12 rounded bg-hover" />
        <div className="mt-2 h-[3.25rem] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      <div>
        <div className="h-5 w-14 rounded bg-hover" />
        <div className="mt-2 h-[3.25rem] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      <div>
        <div className="h-5 w-20 rounded bg-hover" />
        <div className="mt-2 h-[10.5rem] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      <div className="h-12 w-40 rounded-full bg-hover" />
    </div>
  );
}
