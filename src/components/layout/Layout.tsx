import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageNav } from './PageNav'

// Wraps every page, so the navbar and footer are written once.
export function Layout() {
  const { pathname } = useLocation()

  // Without this a new page opens at whatever scroll position the
  // last one was left at, since no full page load happens.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />

      {/* Outlet is where the matched page gets rendered. */}
      <main className="mx-auto max-w-5xl px-6">
        <Outlet />
        <PageNav />
      </main>

      <Footer />
    </>
  )
}
