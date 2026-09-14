import { useId } from 'react';
import { fanPath } from '../../lib/deco';

// One repeating unit of the fan, tiled by the pattern below.
const UNIT = fanPath({ cx: 12, cy: 15, count: 3, rMin: 2, rMax: 10 });

// Repeated arcs between sections, the divider design-notes.md asks for.
export function FanDivider({ className }: { className?: string }) {
  // useId includes colons, which url(#...) will not accept.
  const patternId = `fan-${useId().replace(/:/g, '')}`;

  return (
    <div aria-hidden="true" className={`py-10 ${className ?? ''}`}>
      <svg className="h-4 w-full text-accent-soft opacity-60">
        <defs>
          <pattern
            id={patternId}
            width="24"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={UNIT}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
