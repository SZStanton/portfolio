import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
// Variable fonts, so every weight comes from one file each.
import '@fontsource-variable/josefin-sans';
import '@fontsource-variable/manrope';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/layout/ErrorBoundary.tsx';

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
