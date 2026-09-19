// Shared motion values, so every animation on the site moves the same way.

// Written as a plain tuple, not `as const`, which Motion's easing type rejects.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.28,
  base: 0.5,
  slow: 0.62,
};

// Fires 80% of the way down the screen. A ratio like `amount: 0.25` never fires
// for a group taller than the screen, so its children would stay hidden.
// The top margin clears the sliver of the previous section a hash landing leaves.
export const REVEAL_VIEWPORT = {
  once: true,
  margin: '-96px 0px -20% 0px',
};

export const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

// For small things arriving in a group, where a rise reads as a shove.
export const popVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE },
  },
};

// Same rise, over less time. For smaller things that should not hold up a read.

// Cards coming in from the side, alternating down the page.

// Rules and dividers draw themselves out instead of fading in.
export const drawVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  shown: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

// Children inherit `hidden` and `shown` from here, so only the timing lives on the parent.
export function staggerParent(gap: number) {
  return {
    hidden: {},
    shown: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
  };
}
