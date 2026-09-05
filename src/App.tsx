import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import { PageLoader } from './components/ui/PageLoader';
import { pages } from './data/navigation';
import { Home } from './pages/Home';

// Home loads up front; the rest loads on visit, keeping validation libs off it.
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
// Speed Insights doesn't know about React Router, so this maps measurements to the correct route.
// Keeping it separate means only this component re-renders when the route changes.
function RoutedSpeedInsights() {
  const { pathname } = useLocation();

  // Use the pathname as the route name, or "/*" for unknown paths handled by NotFound.
  const route = pages.some(page => page.to === pathname) ? pathname : '/*';

  return <SpeedInsights route={route} />;
}

function App() {
  return (
    // Wraps Layout, so navbar and footer wait too and the loader is all that shows.
    <>
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
      {/* Both report to /_vercel/, excluded from vercel.json's SPA rewrite.
          Analytics tracks the URL by itself and has no route prop to give it. */}
      <Analytics />
      <RoutedSpeedInsights />
    </>
  );
}

export default App;
