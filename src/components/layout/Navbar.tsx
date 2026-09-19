import { track } from '@vercel/analytics/react';
import { useEffect, useRef, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Link, useLocation } from 'react-router';
import { navIdFor, navSections, spyElementIds } from '../../data/navigation';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useTheme } from '../../hooks/useTheme';
import { ScrollProgress } from './ScrollProgress';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  // Off the home page those sections do not exist, so the links have to route back.
  const onHome = pathname === '/';
  const spyElementId = useScrollSpy(spyElementIds);
  // More Projects has no nav entry of its own, so it lights Projects instead.
  const spyId = navIdFor(spyElementId);

  // Clicking pins the underline to the target, so it does not slide through
  // every section on the way down.
  const [lockedId, setLockedId] = useState('');
  const unlock = useRef<number | undefined>(undefined);
  const activeId = lockedId || spyId;

  useEffect(() => () => window.clearTimeout(unlock.current), []);

  // Sections used to be pages, so Analytics counted them for free. Hash changes
  // are not pageviews, so each one is reported once per visit instead.
  const reported = useRef(new Set<string>());
  useEffect(() => {
    if (!spyElementId || reported.current.has(spyElementId)) return;
    reported.current.add(spyElementId);
    track('section', { id: spyElementId });
  }, [spyElementId]);

  // Only the underline. useSmoothScroll's delegated handler owns the scroll, the
  // hash and the focus move for every in-page link, this one included.
  const handleClick = (id: string) => () => {
    setLockedId(id);
    window.clearTimeout(unlock.current);
    unlock.current = window.setTimeout(() => setLockedId(''), 800);
  };

  // Marks the current section with a gold underline; others sit a step below.
  const linkClass = (isActive: boolean) =>
    [
      // Josefin runs light, so caps need a heavier weight to hold up.
      // Smaller type and padding below sm: five items and the toggle only just
      // fit a 320px phone.
      'relative flex h-full items-center justify-center px-1 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.01em] transition-colors xs:px-2 xs:text-[0.75rem] xs:tracking-[0.06em] sm:px-6 sm:text-sm sm:tracking-[0.14em]',
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
        <nav aria-label="Main" className="mx-auto flex items-stretch">
          <ul className="flex items-stretch">
            {navSections.map(section => (
              <li key={section.id}>
                {onHome ? (
                  <a
                    href={`#${section.id}`}
                    onClick={handleClick(section.id)}
                    // location, not page: this is a position within one document.
                    aria-current={
                      activeId === section.id ? 'location' : undefined
                    }
                    className={linkClass(activeId === section.id)}
                  >
                    {section.label}
                  </a>
                ) : (
                  <Link to={`/#${section.id}`} className={linkClass(false)}>
                    {section.label}
                  </Link>
                )}
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
      <ScrollProgress />
    </header>
  );
}
