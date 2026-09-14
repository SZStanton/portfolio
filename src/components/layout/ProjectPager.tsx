import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';
import { caseStudies } from '../../data/projects';

// Previous/next case study at the foot of the page, so moving on skips the navbar.
export function ProjectPager({ index }: { index: number }) {
  const previous = caseStudies[index - 1];
  const next = caseStudies[index + 1];

  if (!previous && !next) return null;

  const linkStyles =
    'group flex flex-col gap-1 rounded-lg border border-line bg-surface-raised p-5 shadow-card transition-colors hover:border-accent-soft hover:bg-hover active:border-accent';

  return (
    // Labelled because the navbar is a landmark too, and screen readers otherwise
    // announce both as an unhelpful "navigation".
    <nav
      aria-label="Pagination"
      className="container-page grid gap-3 border-t border-line py-12 sm:grid-cols-2"
    >
      {previous ? (
        <Link to={`/projects/${previous.id}`} className={linkStyles}>
          <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <LuArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Previous project
          </span>
          <span className="text-lg font-medium text-heading">
            {previous.title}
          </span>
        </Link>
      ) : (
        // Keeps a lone "next" card in the right hand column.
        <span className="hidden sm:block" />
      )}

      {next && (
        <Link
          to={`/projects/${next.id}`}
          className={`${linkStyles} sm:items-end sm:text-right`}
        >
          <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Next project
            <LuArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-lg font-medium text-heading">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
