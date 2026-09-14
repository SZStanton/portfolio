import { useEffect, useRef, useState } from 'react';

// A band under the sticky header. The top sits just above where an anchor jump
// lands, so a section that has just been scrolled to is clearly inside it rather
// than balanced exactly on the edge.
const BAND = '-72px 0px -55% 0px';

// Reports which section the reader is in. Given an explicit id list rather than
// querying the DOM, so nested anchors like #experience can never win.
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState('');
  const visible = useRef(new Map<string, boolean>());

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter(element => element !== null);

    if (elements.length === 0) return;

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
        if (visible.current.get(id)) next = id;
      }

      // Hold the old value when the band is momentarily empty, or it flickers.
      if (next) setActiveId(next);
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          visible.current.set(entry.target.id, entry.isIntersecting);
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
  }, [ids]);

  return activeId;
}
