import { useEffect } from 'react';
import { projects } from '../data/projects';

// Render's free tier sleeps after ~15 min idle; pinging here gives a wake-up head start.

// Module level to survive page changes; a timestamp lets a later visit re-warm a sleeping instance.
let lastWarmed = 0;
const WARM_AGAIN_AFTER = 10 * 60 * 1000;

// `enabled` holds the pings back until the work is actually on the way in, so a
// visitor who never scrolls that far never fires them.
export function useWarmBackends(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (Date.now() - lastWarmed < WARM_AGAIN_AFTER) return;

    // saveData comes from the Network Information API, which TypeScript has no
    // types for, so it is narrowed here rather than declared globally.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    // Someone on a metered connection, or a prerender nobody is looking at.
    if (connection?.saveData) return;
    if (document.visibilityState === 'hidden') return;

    lastWarmed = Date.now();

    const warm = () => {
      for (const project of projects) {
        if (!project.healthUrl) continue;

        // no-cors, since these APIs don't allow this origin; the opaque response
        // still wakes them. Anything but a 200 back shows as a red error in the
        // visitor's console, which is why these point at health routes.
        fetch(project.healthUrl, { mode: 'no-cors', cache: 'no-store' }).catch(
          () => {},
        );
      }
    };

    // Waits for a quiet moment so three requests don't compete with the page loading.
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warm, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(warm, 1000);
    return () => clearTimeout(id);
  }, [enabled]);
}
