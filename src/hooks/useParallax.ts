import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { useStill } from './useStill';

// Lags a layer behind the scroll by `drift` pixels either side of centre. Pixels
// rather than percent, so layers of different heights can be compared directly.
export function useParallax(drift: number) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift]);

  return { ref, style: still ? undefined : { y } };
}

// The hero's own content, lifting and fading as the page scrolls past it. Deco at
// 13% opacity drifting is invisible; this is the movement people actually notice.
export function useHeroParallax() {
  const still = useStill();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.1]);

  return still ? undefined : { y, opacity };
}
