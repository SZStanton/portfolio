import { m } from 'motion/react';
import { cornerBracket } from '../../lib/deco';
import { EASE, REVEAL_VIEWPORT } from '../../lib/motion';
import { useStill } from '../../hooks/useStill';

const BRACKET = cornerBracket({ size: 64, lines: 3, gap: 5 });

// Gold at full strength rather than deco opacity, which is why it stays small and
// only ever sits in a corner where there is no text to fight.
const CORNERS = [
  { key: 'tl', className: 'left-0 top-0' },
  { key: 'tr', className: 'right-0 top-0 -scale-x-100' },
  { key: 'bl', className: 'bottom-0 left-0 -scale-y-100' },
  { key: 'br', className: 'bottom-0 right-0 -scale-100' },
];

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square',
} as const;

// Deco corner brackets around a block. The host needs `relative`.
export function CornerFrame({ className }: { className?: string }) {
  const still = useStill();
  const frameClass = `pointer-events-none absolute inset-0 text-accent ${className ?? ''}`;

  const corners = CORNERS.map((corner, i) => (
    <svg
      key={corner.key}
      viewBox="0 0 64 64"
      className={`absolute size-8 sm:size-14 ${corner.className}`}
    >
      {still ? (
        <path d={BRACKET} {...STROKE} opacity={0.7} />
      ) : (
        // Each corner draws itself, starting from the one before it.
        <m.path
          d={BRACKET}
          {...STROKE}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            shown: {
              pathLength: 1,
              opacity: 0.7,
              transition: { duration: 1, delay: i * 0.12, ease: EASE },
            },
          }}
        />
      )}
    </svg>
  ));

  if (still) {
    return (
      <div aria-hidden="true" className={frameClass}>
        {corners}
      </div>
    );
  }

  return (
    // One trigger for the whole frame, on the wrapper. Giving each corner its own
    // meant the bottom pair waited for a line they only cross on a tall window.
    <m.div
      aria-hidden="true"
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
      className={frameClass}
    >
      {corners}
    </m.div>
  );
}
