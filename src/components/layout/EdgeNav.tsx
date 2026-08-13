import { useEffect, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Link, useLocation } from 'react-router';
import { pages } from '../../data/navigation';

// How close to the edge the pointer has to get before the arrow shows.
const EDGE = 90;

export function EdgeNav() {
  const { pathname } = useLocation();
  const [near, setNear] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (event.clientX < EDGE) setNear('left');
      else if (event.clientX > window.innerWidth - EDGE) setNear('right');
      else setNear(null);
    };

    // passive tells the browser we will not block the event.
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const index = pages.findIndex(page => page.to === pathname);
  // Anything not in the list, such as the 404, gets no arrows.
  if (index === -1) return null;

  return (
    <>
      <Arrow page={pages[index - 1]} side="left" visible={near === 'left'} />
      <Arrow page={pages[index + 1]} side="right" visible={near === 'right'} />
    </>
  );
}

type ArrowProps = {
  page: (typeof pages)[number] | undefined;
  side: 'left' | 'right';
  visible: boolean;
};

function Arrow({ page, side, visible }: ArrowProps) {
  // No page that way, so nothing to show.
  if (!page) return null;

  const Icon = side === 'left' ? LuChevronLeft : LuChevronRight;

  return (
    <Link
      to={page.to}
      aria-label={`Go to ${page.label}`}
      // Hidden on small screens, where there is no pointer to track.
      className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 px-4 py-28 text-accent transition-all duration-300 md:flex ${
        side === 'left' ? 'left-1' : 'right-1'
      } ${
        visible
          ? 'opacity-60 hover:opacity-100'
          : 'pointer-events-none translate-x-0 opacity-0'
      }`}
    >
      <Icon className="size-6" />
      <span className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.2em]">
        {page.label}
      </span>
    </Link>
  );
}
