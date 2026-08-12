import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageNav } from './PageNav'

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname } = useLocation()

  // Set when the visitor's system asks for less animation. Drop the
  // movement for them, keep the fade.
  const reduceMotion = useReducedMotion()

  // Changing route is not a page load, so the scroll position sticks.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* LazyMotion and m load only the features used, not all of Motion. */}
        <LazyMotion features={domAnimation}>
          {/* New key on each route remounts this, which replays the fade. */}
          <m.div
            key={pathname}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </m.div>
        </LazyMotion>

        <PageNav />
      </main>

      <Footer />
    </>
  )
}
