import { m } from 'motion/react';
import { useId } from 'react';
import { fanPath } from '../../lib/deco';
import { EASE, REVEAL_VIEWPORT } from '../../lib/motion';
import { useStill } from '../../hooks/useStill';

// One repeating unit of the fan, tiled by the pattern below.
const UNIT = fanPath({ cx: 12, cy: 15, count: 3, rMin: 2, rMax: 10 });

const SVG_CLASS = 'h-4 w-full origin-center text-accent-soft';

// Repeated arcs between sections, the divider design-notes.md asks for.
export function FanDivider({ className }: { className?: string }) {
  // useId includes colons, which url(#...) will not accept.
  const patternId = `fan-${useId().replace(/:/g, '')}`;
  const still = useStill();

  // Shared, so the still version cannot drift from the animated one.
  const pattern = (
    <>
      <defs>
        <pattern
          id={patternId}
          width="24"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path d={UNIT} fill="none" stroke="currentColor" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </>
  );

  return (
    <div aria-hidden="true" className={`py-10 ${className ?? ''}`}>
      {still ? (
        // Straight to its resting opacity, or it paints full strength and fades.
        <svg className={`${SVG_CLASS} opacity-60`}>{pattern}</svg>
      ) : (
        // Opens out from the middle as it arrives, like a fan actually would.
        <m.svg
          className={SVG_CLASS}
          initial={{ scaleX: 0.2, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.6 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {pattern}
        </m.svg>
      )}
    </div>
  );
}
