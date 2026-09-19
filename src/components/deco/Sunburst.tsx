import { sunburstPath } from '../../lib/deco';

// Built once at module scope, since the shape never changes.
const RAYS = sunburstPath({
  cx: 100,
  cy: 0,
  radius: 155,
  count: 26,
  from: 14,
  to: 166,
});

// Two periods that do not divide into each other, so the loop never visibly repeats.
const DRIFT = {
  animation:
    'deco-sway 48s ease-in-out infinite alternate, deco-breathe 31s ease-in-out infinite',
  transformBox: 'fill-box',
  transformOrigin: '50% 0%',
  willChange: 'transform',
} as const;

type SunburstProps = {
  // Where the apex sits across the box, as a percentage of its width.
  originX?: number;
  className?: string;
};

export function Sunburst({ originX = 50, className }: SunburstProps) {
  // The viewBox is 200 wide, so one percent of it is two units.
  const shift = (originX - 50) * 2;

  return (
    <svg
      viewBox="0 0 200 120"
      // slice fills the box and crops the overflow; none would skew the wedges.
      preserveAspectRatio="xMidYMin slice"
      className={`size-full ${className ?? ''}`}
    >
      <g transform={`translate(${shift} 0)`}>
        <g style={DRIFT}>
          <path d={RAYS} fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
