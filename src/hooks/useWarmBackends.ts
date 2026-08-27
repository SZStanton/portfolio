import { useEffect } from 'react';
import { projects } from '../data/projects';

/*
 * Render's free tier puts an instance to sleep after about 15 minutes idle,
 * and waking one takes roughly 30 seconds. Pinging them when the Projects
 * page opens gives them a head start, so a demo is more likely to respond
 * by the time someone actually clicks through to it.
 */

// Module level, so it only fires once however many times the page mounts.
let warmed = false;

export function useWarmBackends() {
  useEffect(() => {
    if (warmed) return;
    warmed = true;

    for (const project of projects) {
      if (!project.apiUrl) continue;

      /*
       * no-cors because these APIs do not allow this origin. The response
       * comes back opaque and unreadable, which is fine: the request still
       * reaches Render and starts the instance. Errors are ignored because
       * there is nothing useful to tell a visitor about a warm-up.
       */
      fetch(project.apiUrl, { mode: 'no-cors', cache: 'no-store' }).catch(
        () => {},
      );
    }
  }, []);
}
