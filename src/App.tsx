import { domAnimation, LazyMotion } from 'motion/react';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import { PageLoader } from './components/ui/PageLoader';
import { Home } from './pages/Home';

// Home loads up front; the rest loads on visit, keeping validation libs off it.
const NotFound = lazy(() =>
  import('./pages/NotFound').then(m => ({ default: m.NotFound })),
);
// Speed Insights doesn't know about React Router, so this maps measurements to the correct route.
// Keeping it separate means only this component re-renders when the route changes.
function RoutedSpeedInsights() {
  const { pathname } = useLocation();

  // One scrolling page plus the 404, so the only real route left is "/".
  const route = pathname === '/' ? '/' : '/*';

  return <SpeedInsights route={route} />;
}

function App() {
  return (
    // Wraps Layout, so navbar and footer wait too and the loader is all that shows.
    <>
      {/* strict makes any stray motion.div throw instead of quietly pulling the full bundle. */}
      <LazyMotion features={domAnimation} strict>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              {/* The * catches anything that matched nothing above. */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LazyMotion>
      {/* Both report to /_vercel/, excluded from vercel.json's SPA rewrite.
          Analytics tracks the URL by itself and has no route prop to give it. */}
      <Analytics />
      <RoutedSpeedInsights />
    </>
  );
}

export default App;
