import { useState } from 'react'
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { useTheme } from '../../hooks/useTheme'

// Kept in an array so adding a section is one line, and both the desktop
// bar and the mobile dropdown pick it up.
const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Shared so the links and both buttons stay identical.
  const itemStyles = 'rounded-md transition-colors hover:bg-hover hover:text-heading'

  return (
    // The /80 and backdrop-blur let content show softly through as it scrolls under.
    <header className="sticky top-0 z-50 border-b border-line bg-surface-raised/80 backdrop-blur">
      {/* Same max width as <main>, so the bar and the content line up. */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-semibold text-heading transition-colors hover:opacity-70">
          Sebastian Stanton
        </a>

        <div className="flex items-center gap-1">
          {/* Swaps with the hamburger below: only one is ever visible. */}
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

      {/* Closed on click, since jumping to an anchor is not a page load. */}
      {menuOpen && (
        <ul className="border-t border-line px-6 pb-4 md:hidden">
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
