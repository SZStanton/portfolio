import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Variable fonts, so every weight comes from one file each.
import '@fontsource-variable/josefin-sans'
import '@fontsource-variable/manrope'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Has to wrap the whole app, since anything using routing
        needs to sit inside it. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
