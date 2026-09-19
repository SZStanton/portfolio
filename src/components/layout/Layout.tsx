import { m } from 'motion/react';
import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router';
import { DURATION, EASE } from '../../lib/motion';
import { useHashTarget } from '../../hooks/useHashTarget';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useStill } from '../../hooks/useStill';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

// Kept out of the main bundle; it only loads when ?debug=motion is on the URL.
const MotionDebug = lazy(() =>
  import('../dev/MotionDebug').then(m => ({ default: m.MotionDebug })),
);

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname, search } = useLocation();

  // Set when the OS asks for less motion; drop movement but keep the fade.
  const reduceMotion = useStill();

  // Handles landing position and focus for both route changes and hash jumps.
  useHashTarget();

  useSmoothScroll();

  // Temporary, for diagnosing motion on a specific machine.
  const debugging = new URLSearchParams(search).get('debug') === 'motion';

  return (
    <>
      {/* Hidden until tabbed to, so keyboard users can skip the nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-heading focus:px-5 focus:py-2 focus:font-medium focus:text-surface"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="w-full">
        {/* New key per route remounts this, replaying the fade between pages. */}
        {/* Fade only. A translate here shifts every offset on the page while it
            plays, so a section jumped to lands a few pixels out, and it makes this
            the containing block for anything fixed inside it. */}
        <m.div
          key={pathname}
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <Outlet />
        </m.div>
      </main>

      <Footer />
      {debugging && (
        <Suspense fallback={null}>
          <MotionDebug />
        </Suspense>
      )}
    </>
  );
}
