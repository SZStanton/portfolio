import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// The script in index.html has already decided the theme and set the class,
// so we just read back what it did rather than working it out twice.
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Keep the <html> class and the saved preference in step with the state.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
