import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { pages } from '../data/navigation';

// Left and right arrows step through the pages, stopping at either end.
export function useArrowNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      // Skips modified shortcuts like alt+left, which is browser back.
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return;

      // Arrows belong to the field while someone is typing.
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]'))
        return;

      const index = pages.findIndex(page => page.to === pathname);
      if (index === -1) return;

      const next = pages[event.key === 'ArrowLeft' ? index - 1 : index + 1];
      if (next) navigate(next.to);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pathname, navigate]);
}
