import { useId } from 'react';
import { sunburstPath } from '../../lib/deco';

// A sun coming up from behind the skyline, so the rays fan upward off the horizon
// instead of converging at the top of the screen, which reads as perspective lines.
const RAYS = sunburstPath({
  cx: 100,
  cy: 86,
  radius: 150,
  count: 16,
  from: 188,
  to: 352,
  duty: 0.4,
  alternate: 0.7,
});

export function Sunburst() {
  // Mask ids are document-global, so two of these would otherwise collide.
  const maskId = `sunburst-${useId().replace(/:/g, '')}`;

  return (
    <svg
      viewBox="0 0 200 120"
      // slice fills the box and crops the overflow; none would skew the wedges.
      preserveAspectRatio="xMidYMax slice"
      className="size-full"
    >
      <defs>
        {/* Light falls away from the sun rather than stopping dead at the edge. */}
        <radialGradient id={`${maskId}-fade`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="50%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="200"
            height="120"
            fill={`url(#${maskId}-fade)`}
          />
        </mask>
      </defs>

      {/* Sits under the layer's own opacity, so the rays end up quieter than
          the rest of the deco. */}
      <g mask={`url(#${maskId})`} opacity="0.72">
        <path d={RAYS} fill="currentColor" />
      </g>
    </svg>
  );
}
