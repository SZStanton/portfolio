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
      if (!project.apiUrl) continue;

      // sendBeacon rather than fetch: these APIs have no route at their root, so a
      // fetch logged a red 404 in everyone's console. A beacon ignores the response
      // entirely and logs nothing, and waking the container is all we're after.
      navigator.sendBeacon(project.apiUrl);
    }
  }, []);
}
