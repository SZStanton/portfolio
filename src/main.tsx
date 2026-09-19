import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';
// Variable fonts, so every weight comes from one file each.
import '@fontsource-variable/josefin-sans';
import '@fontsource-variable/manrope';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/layout/ErrorBoundary.tsx';

// The browser restores the old scroll position a moment after React mounts, which
// lands mid-page with the reveals half played. Start at the top instead.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ?motion=force ignores the OS "reduce motion" setting, for reviewing the design
// on a machine that has it switched on.
if (window.location.search.includes('motion=force')) {
  document.documentElement.dataset.motionForce = 'true';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Outside the router, so it still catches a crash in routing itself. */}
    <ErrorBoundary>
      {/* Wraps the whole app, since anything using routing must sit inside it. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
