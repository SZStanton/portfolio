import { skylinePath } from '../../lib/deco';

// Wide treads, or the stairs read as a jagged edge rather than as deco.
const RIDGE = skylinePath({ width: 200, height: 60, step: 0.11, samples: 70 });

// Cape Town's skyline as deco stairs, sitting still at the foot of the hero while
// the rays move behind it. Caller sets the height; the shape stretches to any width.
export function Skyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className={`w-full ${className ?? ''}`}
    >
      {/* Page colour at full strength, so the rays stop at the ridge instead of
          shining through the mountain. */}
      <path d={RIDGE} fill="var(--surface)" />

      <g style={{ opacity: 'calc(var(--deco-opacity) * 0.88)' }}>
        <path d={RIDGE} fill="currentColor" opacity="0.2" />
        {/* Outline on top of the fill, so the steps still read at low opacity. */}
        <path
          d={RIDGE}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
