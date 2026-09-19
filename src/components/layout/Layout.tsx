import { m, useReducedMotion } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import { DURATION, EASE } from '../../lib/motion';
import { useHashTarget } from '../../hooks/useHashTarget';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname } = useLocation();

  // Set when the OS asks for less motion; drop movement but keep the fade.
  const reduceMotion = useReducedMotion();

  // Handles landing position and focus for both route changes and hash jumps.
  useHashTarget();

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
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <Outlet />
        </m.div>
      </main>

      <Footer />
    </>
  );
}
