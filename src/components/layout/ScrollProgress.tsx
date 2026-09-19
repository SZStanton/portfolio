import { m, useScroll, useSpring } from 'motion/react';

// Gold hairline along the bottom of the navbar, filling as the page is read.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring, so it eases behind the scroll rather than snapping to it.
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
    />
  );
}
