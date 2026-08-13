import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link, useLocation } from 'react-router';
import { pages } from '../../data/navigation';

// Previous and next links at the foot of every page, so moving on
// never means going back up to the navbar.
export function PageNav() {
  const { pathname } = useLocation();
  const index = pages.findIndex(page => page.to === pathname);

  // Anything not in the list, such as the 404, gets no pager.
  if (index === -1) return null;

  const previous = pages[index - 1];
  const next = pages[index + 1];

  const linkStyles =
    'group flex flex-col gap-1 rounded-lg border border-line bg-surface-raised p-5 shadow-card transition-colors hover:border-accent-soft hover:bg-hover active:border-accent';

  return (
    <nav className="grid gap-3 border-t border-line py-12 sm:grid-cols-2">
      {previous ? (
        <Link to={previous.to} className={linkStyles}>
          <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <LuArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="text-lg font-medium text-heading">
            {previous.label}
          </span>
        </Link>
      ) : (
        // Keeps a lone "next" card in the right hand column.
        <span className="hidden sm:block" />
      )}

      {next && (
        <Link
          to={next.to}
          className={`${linkStyles} sm:items-end sm:text-right`}
        >
          <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Next
            <LuArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-lg font-medium text-heading">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
