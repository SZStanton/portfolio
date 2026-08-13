import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { PageLoader } from './components/ui/PageLoader';
import { Home } from './pages/Home';

// Home loads up front, the rest only when visited. Keeps the contact
// form's validation libraries off the landing page.
const Skills = lazy(() =>
  import('./pages/Skills').then(m => ({ default: m.Skills })),
);
const Projects = lazy(() =>
  import('./pages/Projects').then(m => ({ default: m.Projects })),
);
const Contact = lazy(() =>
  import('./pages/Contact').then(m => ({ default: m.Contact })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then(m => ({ default: m.NotFound })),
);

function App() {
  return (
    // Sits above Layout, so the navbar and footer go too and the loader
    // is the only thing on screen.
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* The * catches anything that matched nothing above. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

