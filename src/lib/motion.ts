// Shared motion values, so every animation on the site moves the same way.

// Written as a plain tuple, not `as const`, which Motion's easing type rejects.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.28,
  base: 0.45,
  slow: 0.6,
};

export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

// Children inherit "shown" from this, which is what drives the stagger.
export const staggerParent = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
