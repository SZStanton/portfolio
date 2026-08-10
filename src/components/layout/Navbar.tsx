import { useState } from 'react'
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { NavLink } from 'react-router'
import { pages } from '../../data/navigation'
import { useTheme } from '../../hooks/useTheme'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Shared so the links and both buttons stay identical.
  const itemStyles = 'rounded-md transition-colors hover:bg-hover hover:text-heading'

  // NavLink hands className a flag for whether this is the current page,
  // which is what marks the active link in gold.
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${itemStyles} px-3 py-2 text-sm ${isActive ? 'text-accent' : ''}`

  return (
    // The /80 and backdrop-blur let content show softly through as it scrolls under.
    <header className="sticky top-0 z-50 border-b border-line bg-surface-raised/80 backdrop-blur">
      {/* Same max width as <main>, so the bar and the content line up. */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-semibold text-heading transition-colors hover:opacity-70">
          Sebastian Stanton
        </NavLink>

        <div className="flex items-center gap-1">
          {/* Swaps with the hamburger below: only one is ever visible. */}
          <ul className="hidden md:flex md:items-center md:gap-1">
            {pages.map((link) => (
              <li key={link.to}>
                {/* `end` stops "/" counting as active on every other page. */}
                <NavLink to={link.to} end className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            // Read out instead of the contents, which are icon only.
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 ${itemStyles}`}
          >
            {/* Shows the mode currently active, not the one it switches to. */}
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

      {/* Closed on click, since changing page leaves the menu open otherwise. */}
      {menuOpen && (
        <ul className="border-t border-line px-6 pb-4 md:hidden">
          {pages.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${itemStyles} block px-3 py-2 ${isActive ? 'text-accent' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
