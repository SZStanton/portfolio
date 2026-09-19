import { useEffect, useRef, useState } from 'react';

// Anything without IntersectionObserver is old enough to just get everything at once.
const SUPPORTED =
  typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Flips true once when the element gets close, and stays true. Used to hold back
// work until it is nearly needed: screenshots, the contact form, backend warm-ups.
export function useNearViewport<T extends HTMLElement>(rootMargin = '600px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(!SUPPORTED);

  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [near, rootMargin]);

  return [ref, near] as const;
}
