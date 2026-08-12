import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// The dark class goes on <html>, which sits outside React's root, so it
// has to be set directly. Doing it in an effect keeps that out of render.

// The script in index.html already worked this out, so just read it back.
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    // Saved so the choice survives a refresh and the index.html script can read it.
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
