import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

// The OS setting is silent, so the dev note below is only said once.
let warned = false;

// True when the visitor asked for less motion, which switches every animation off.
// ?motion=force overrides it, for reviewing on a machine with the setting on.
export function useStill() {
  const reduced = useReducedMotion();
  const forced =
    typeof document !== 'undefined' &&
    document.documentElement.dataset.motionForce === 'true';
  const still = reduced && !forced;

  useEffect(() => {
    if (!import.meta.env.DEV || !still || warned) return;
    warned = true;
    console.info(
      '[motion] Reduced motion is on at OS level, so animations are off. Add ?motion=force to the URL to see them.',
    );
  }, [still]);

  return still;
}
