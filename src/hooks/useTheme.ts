import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/*
 * Handles the light/dark toggle for the whole site.
 *
 * Tailwind is set up (in index.css) to apply dark styles whenever a `dark`
 * class is present on the <html> element. That element sits above the #root
 * div that React renders into, so React has no way to put a class on it
 * through normal JSX. Reaching for document.documentElement is the supported
 * way to handle this, rather than a shortcut around React.
 *
 * The rule being followed is about timing: touching the DOM while a component
 * is rendering causes problems, but doing it inside useEffect, which runs once
 * React has finished drawing, is fine.
 */

/*
 * A small script in index.html runs before the page is painted, works out
 * which theme to use, and puts the class on <html> straight away. That is what
 * stops a dark mode visitor seeing a white flash while React starts up.
 * Rather than repeat that logic, this just reads back the decision already made.
 */
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    // Keep the page and the saved preference matching whatever state holds.
    // classList.toggle with a second argument adds the class when true and
    // removes it when false, which avoids branching here.
    document.documentElement.classList.toggle('dark', theme === 'dark')

    // Saved so the choice survives a refresh, and so the index.html script
    // has something to read on the next visit.
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    // Updating from the previous value, rather than from `theme` directly,
    // keeps this correct if several updates are processed together.
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
