import { useEffect, useRef, useState } from 'react';

// A thin band under the sticky header. The 80px top matches the scroll-mt-20 the
// sections use, so the line that decides "you are here" and the landing point agree.
const BAND = '-80px 0px -68% 0px';

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

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          visible.current.set(entry.target.id, entry.isIntersecting);
        }

        // The last one in page order that is currently in the band, not the first.
        let next = '';
        for (const id of ids) {
          if (visible.current.get(id)) next = id;
        }

        // Hold the old value when the band is momentarily empty, or it flickers.
        if (next) setActiveId(next);
      },
      { rootMargin: BAND, threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
