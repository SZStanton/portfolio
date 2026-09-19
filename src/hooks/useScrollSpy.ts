import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// A band under the sticky header. Its top sits just above where an anchor jump
// lands, so a section jumped to is clearly inside it rather than on the edge.
const BAND = '-72px 0px -55% 0px';

// Reports which section the reader is in. Given an explicit id list rather than
// querying the DOM, so nested anchors like #experience can never win.
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState('');
  // The navbar outlives every route but the sections do not, so rebuild the
  // observer on each one or it holds detached nodes.
  const { pathname } = useLocation();

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter(element => element !== null);

    // No sections on this route, so nothing to watch.
    if (elements.length === 0) return;

    // Scoped to this observer, so a route change cannot leave stale entries behind.
    const visible = new Map<string, boolean>();

    // The last section cannot always reach the band, because there may not be a
    // screenful of page beneath it. At the bottom it wins by default.
    const atBottom = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;

    const pick = () => {
      if (atBottom()) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      // The last one in page order that is currently in the band, not the first.
      let next = '';
      for (const id of ids) {
        if (visible.get(id)) next = id;
      }

      // Hold the old value when the band is momentarily empty, or it flickers.
      if (next) setActiveId(next);
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        pick();
      },
      { rootMargin: BAND, threshold: 0 },
    );

    for (const element of elements) observer.observe(element);

    // One event per gesture, so no scroll handler running every frame.
    window.addEventListener('scrollend', pick);
    return () => {
      observer.disconnect();
      window.removeEventListener('scrollend', pick);
    };
  }, [ids, pathname]);

  return activeId;
}
