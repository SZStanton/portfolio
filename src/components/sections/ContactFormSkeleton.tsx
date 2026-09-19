// Stands in while the form chunk loads. Heights are measured off the real form so
// the swap cannot move the page: field 85px, message 168px, button 48px.
export function ContactFormSkeleton() {
  return (
    <div className="space-y-5 md:col-span-3" aria-hidden="true">
      <div className="h-[85px]">
        <div className="h-[19px] w-12 rounded bg-hover" />
        <div className="mt-2 h-[52px] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      <div className="h-[85px]">
        <div className="h-[19px] w-14 rounded bg-hover" />
        <div className="mt-2 h-[52px] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      <div className="h-[168px]">
        <div className="h-[19px] w-20 rounded bg-hover" />
        <div className="mt-2 h-[128px] w-full rounded-lg border border-line bg-surface-raised" />
      </div>
      {/* The real button's box, square cornered rather than a pill. */}
      <div className="h-[48px] w-[193px] rounded-sm bg-hover" />
      {/* Stands in for the aria-live line, which is empty but still takes a gap. */}
      <div className="h-0" />
    </div>
  );
}
