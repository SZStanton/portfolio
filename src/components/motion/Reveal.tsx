import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealVariants, staggerParent } from '../../lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

// Positive bottom margin starts the reveal 120px early, so it has finished by the
// time the text is actually in front of you. A negative value makes you wait for it.
const VIEWPORT = { once: true, margin: '0px 0px 120px 0px' };

// One element fading up as it arrives.
export function Reveal({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <m.div
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={revealVariants}
      className={className}
    >
      {children}
    </m.div>
  );
}

// Wrap a list in this and its RevealItem children come in one after another.
export function RevealGroup({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <m.div
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={staggerParent}
      className={className}
    >
      {children}
    </m.div>
  );
}

// Only `variants` here. Setting initial or whileInView stops the parent's stagger.
export function RevealItem({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <m.div variants={revealVariants} className={className}>
      {children}
    </m.div>
  );
}
