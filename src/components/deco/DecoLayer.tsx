import type { ReactNode } from 'react';

type DecoLayerProps = {
  children: ReactNode;
  className?: string;
};

// Background geometry for one section. The host section must be `relative isolate
// overflow-x-clip`, or this escapes to the root and paints under the page gradient.
export function DecoLayer({ children, className }: DecoLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 text-deco-ink opacity-[var(--deco-opacity)] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
