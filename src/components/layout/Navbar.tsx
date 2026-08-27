import { LuMoon, LuSun } from 'react-icons/lu';
import { NavLink } from 'react-router';
import { pages } from '../../data/navigation';
import { useTheme } from '../../hooks/useTheme';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  // NavLink flags the current page with a gold underline; others sit a step below.
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      // Josefin runs light, so caps need a heavier weight to hold up.
      // Smaller type and padding below sm, so labels and the toggle fit a 320px phone.
      'relative flex h-full items-center justify-center px-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition-colors sm:px-7 sm:text-sm sm:tracking-[0.14em]',
      'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:transition-colors',
      isActive
        ? 'text-heading after:bg-accent'
        : 'text-body hover:bg-hover hover:text-heading after:bg-transparent hover:after:bg-accent-soft',
    ].join(' ');

  return (
    // The /80 and backdrop-blur let content show softly through as it scrolls under.
    <header className="sticky top-0 z-50 border-b border-line bg-surface-raised/80 backdrop-blur">
      {/* items-stretch makes the whole header strip clickable, not just the text. */}
      {/* Right padding reserves the toggle's corner so links never sit under it. */}
      <div className="relative flex h-14 items-stretch pr-14 sm:h-16 sm:pr-16">
        <nav className="mx-auto flex items-stretch">
          <ul className="flex items-stretch">
            {pages.map(link => (
              <li key={link.to}>
                {/* `end` stops "/" counting as active on every other page. */}
                <NavLink to={link.to} end className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pinned to the corner, out of the flex row, so the links stay centred on the page. */}
        <button
          type="button"
          onClick={toggleTheme}
          // Read out instead of the contents, which are icon only.
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="absolute inset-y-0 right-0 grid w-14 place-items-center transition-colors hover:bg-hover hover:text-heading sm:w-16"
        >
          {/* Shows the mode currently active, not the one it switches to. */}
          {theme === 'dark' ? (
            <LuMoon className="size-5" />
          ) : (
            <LuSun className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}
