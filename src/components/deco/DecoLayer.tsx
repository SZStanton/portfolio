import { m } from 'motion/react';
import type { ReactNode } from 'react';
import { useParallax } from '../../hooks/useParallax';

type DecoLayerProps = {
  children: ReactNode;
  className?: string;
  // Pixels the layer lags behind the scroll. Bigger reads as further back.
  speed?: number;
};

// Background geometry for one section. The host section must be `relative isolate
// overflow-x-clip`, or this escapes to the root and paints under the page gradient.
export function DecoLayer({ children, className, speed = 0 }: DecoLayerProps) {
  const { ref, style } = useParallax(speed);

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      style={speed ? style : undefined}
      // Taller than the section when it drifts, so no edge is ever pulled into view.
      className={`pointer-events-none absolute inset-x-0 -z-10 text-deco-ink opacity-[var(--deco-opacity)] ${speed ? '-inset-y-[35%]' : 'inset-y-0'} ${className ?? ''}`}
    >
      {children}
    </m.div>
  );
}
