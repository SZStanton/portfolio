import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageNav } from './PageNav'

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname } = useLocation()

  // True when the visitor has asked their system to limit animation.
  // Motion sickness and vestibular disorders are real, so movement is
  // dropped for them while the fade stays.
  const reduceMotion = useReducedMotion()

  // Without this a new page opens at whatever scroll position the
  // last one was left at, since no full page load happens.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* LazyMotion with the m component loads only the animation
            features actually used, instead of Motion's whole feature set. */}
        <LazyMotion features={domAnimation}>
          {/* Changing the key remounts this on every route change, which
              replays the fade. Outlet is where the matched page renders. */}
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
