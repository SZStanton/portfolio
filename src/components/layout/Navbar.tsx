import { useState } from 'react'
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { useTheme } from '../../hooks/useTheme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Shared hover/focus styling for every clickable thing in the bar.
  const itemStyles =
    'rounded-md hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-semibold text-slate-900 hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
        >
          Sebastian Stanton
        </a>

        <div className="flex items-center gap-1">
          {/* Full link list, medium screens and up. */}
          <ul className="hidden md:flex md:items-center md:gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`px-3 py-2 text-sm ${itemStyles}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            /* The icon alone can't tell a screen reader what this does. */
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 ${itemStyles}`}
          >
            {theme === 'dark' ? <LuMoon className="size-5" /> : <LuSun className="size-5" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`p-2 md:hidden ${itemStyles}`}
          >
            {menuOpen ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Dropdown for small screens. Tapping a link closes it again. */}
      {menuOpen && (
        <ul className="border-t border-slate-200 px-6 pb-4 md:hidden dark:border-slate-800">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 ${itemStyles}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
