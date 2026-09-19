import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { caseStudies } from '../data/projects';

// Left and right move between case studies, where those directions mean something.
export function useProjectArrowKeys(index: number) {
  const navigate = useNavigate();

  useEffect(() => {
    // -1 means the url matched nothing, so this is the 404 and there is no
    // neighbour to move to. Without this, index + 1 lands on the first study.
    if (index < 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      // Leaves alt+left as browser back, and every other shortcut alone.
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      // The lightbox locks scrolling while it is open, so it owns the keyboard.
      if (document.body.style.overflow === 'hidden') return;

      // Never steal arrow keys from something being typed in. The instanceof
      // check matters: a keydown can target window or document, neither of
      // which has closest().
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return;
      }

      const step = event.key === 'ArrowLeft' ? -1 : 1;
      const destination = caseStudies[index + step];
      if (destination) navigate(`/projects/${destination.id}`);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, navigate]);
}
