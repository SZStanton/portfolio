import { useEffect } from 'react';
import { projects } from '../data/projects';

// Render's free tier sleeps after ~15 min idle; pinging here gives a wake-up head start.

// Module level to survive page changes; a timestamp lets a later visit re-warm a sleeping instance.
let lastWarmed = 0;
const WARM_AGAIN_AFTER = 10 * 60 * 1000;

export function useWarmBackends() {
  useEffect(() => {
    if (Date.now() - lastWarmed < WARM_AGAIN_AFTER) return;
    lastWarmed = Date.now();

    for (const project of projects) {
      if (!project.healthUrl) continue;

      // no-cors, since these APIs don't allow this origin; the opaque response
      // still wakes them. Anything but a 200 back shows as a red error in the
      // visitor's console, which is why these point at health routes.
      fetch(project.healthUrl, { mode: 'no-cors', cache: 'no-store' }).catch(
        () => {},
      );
    }
  }, []);
}
