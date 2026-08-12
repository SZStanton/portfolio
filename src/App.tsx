import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'

// Home loads up front, the rest only when visited. Keeps the contact
// form's validation libraries off the landing page.
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })))
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function App() {
  return (
    <Routes>
      {/* Every route nested here renders inside Layout's Outlet,
          so they all share the navbar and footer. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Suspense covers the moment a split page is being fetched.
            The pages are small enough that a spinner would flash, so
            this holds empty space instead. */}
        <Route
          path="/skills"
          element={
            <Suspense fallback={<div className="min-h-[60svh]" />}>
              <Skills />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<div className="min-h-[60svh]" />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<div className="min-h-[60svh]" />}>
              <Contact />
            </Suspense>
          }
        />
        {/* The * catches anything that matched nothing above. */}
        <Route
          path="*"
          element={
            <Suspense fallback={<div className="min-h-[60svh]" />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
