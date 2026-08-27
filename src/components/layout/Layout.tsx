import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useArrowNavigation } from '../../hooks/useArrowNavigation';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import { EdgeNav } from './EdgeNav';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { PageNav } from './PageNav';

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname } = useLocation();

  // Set when the visitor's system asks for less animation. Drop the
  // movement for them, keep the fade.
  const reduceMotion = useReducedMotion();

  useArrowNavigation();
  useSwipeNavigation();

  // Changing route is not a page load, so the scroll position sticks.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <EdgeNav />

      <main id="main" className="mx-auto max-w-5xl px-6">
        {/* LazyMotion and m load only the features used, not all of Motion. */}
        <LazyMotion features={domAnimation}>
          {/* New key on each route remounts this, which replays the fade.
              Slower and softer than a plain swap, so pages ease in. */}
          <m.div
            key={pathname}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
            <PageNav />
          </m.div>
        </LazyMotion>
      </main>

      <Footer />
    </>
  );
}
