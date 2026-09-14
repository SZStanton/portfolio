import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

// Owns where the page lands after a route change, and moves the keyboard with it.
export function useHashTarget() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef<string | null>(null);

  // Only fires on arriving at a route. In-page hash clicks scroll themselves, and
  // scrolling again here would cancel the browser's smooth scroll.
  useEffect(() => {
    const arrived = lastPath.current !== pathname;
    lastPath.current = pathname;
    if (!arrived) return;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Two frames, so a freshly mounted route has laid out before we look for the target.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: 'instant' });
      });
    });

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
