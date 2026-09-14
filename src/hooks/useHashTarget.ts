import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

// Give up rather than poll forever if the target never turns up.
const MAX_FRAMES = 30;

// Owns where the page lands after a route change, and moves the keyboard with it.
export function useHashTarget() {
  const { pathname, hash } = useLocation();
  // The last location this handled, so a re-render cannot make it act twice.
  const handled = useRef('');

  useEffect(() => {
    const here = pathname + hash;
    if (handled.current === here) return;

    const cameFrom = handled.current.split('#')[0];
    handled.current = here;

    // An in-page hash click, which the browser scrolls itself. Scrolling again
    // here would cancel its smooth scroll halfway.
    if (cameFrom === pathname) return;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const land = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      target.scrollIntoView({ behavior: 'instant' });
      return true;
    };

    // Usually the target is already there, so do not wait a frame for nothing.
    if (land()) return;

    // Otherwise the new route has not painted yet, so try again each frame.
    let frame = 0;
    let tries = 0;
    const retry = () => {
      if (land()) return;
      if (tries++ < MAX_FRAMES) frame = requestAnimationFrame(retry);
    };

    frame = requestAnimationFrame(retry);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  // A hash jump scrolls but leaves focus behind, so Tab would carry on from the
  // header rather than from inside the section you just asked for.
  useEffect(() => {
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    target.setAttribute('tabindex', '-1');
    // preventScroll, or focus snaps the viewport and undoes the scroll-mt offset.
    target.focus({ preventScroll: true });

    // Dropped again on blur, so the section is not left as a permanent tab stop.
    const drop = () => target.removeAttribute('tabindex');
    target.addEventListener('blur', drop, { once: true });
    return () => target.removeEventListener('blur', drop);
  }, [hash]);
}
