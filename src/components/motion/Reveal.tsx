import { m } from 'motion/react';
import type { ReactNode } from 'react';
import {
  drawVariants,
  popVariants,
  REVEAL_VIEWPORT,
  revealVariants,
  staggerParent,
} from '../../lib/motion';
import { useStill } from '../../hooks/useStill';

// rise for blocks, pop for small things in a group, draw for rules.
type Move = 'rise' | 'pop' | 'draw';

const moves = {
  rise: revealVariants,
  pop: popVariants,
  draw: drawVariants,
};

// The motion version of each tag these accept, so the wrapper matches the markup.
const tags = { div: m.div, ul: m.ul, ol: m.ol, dl: m.dl, li: m.li };

type Props = {
  children: ReactNode;
  className?: string;
  move?: Move;
};

// One block fading up as it comes into view.
export function Reveal({ children, className, move = 'rise' }: Props) {
  const still = useStill();
  if (still) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      variants={moves[move]}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </m.div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  // Seconds between each child starting.
  gap?: number;
  // ul, ol or dl when the children are list items, or the markup is invalid.
  as?: 'div' | 'ul' | 'ol' | 'dl';
};

// Reveals its children one after another. Pair it with RevealItem, nothing else.
export function RevealGroup({
  children,
  className,
  gap = 0.07,
  as = 'div',
}: GroupProps) {
  const still = useStill();
  const Tag = tags[as];

  if (still) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={staggerParent(gap)}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </Tag>
  );
}

type ItemProps = {
  // Optional, since a plain rule or divider is worth revealing on its own.
  children?: ReactNode;
  className?: string;
  // Matches the wrapper to what the parent layout expects, li inside a ul.
  as?: 'div' | 'li';
  // Hover tooltip, for items that carried one before they were wrapped.
  title?: string;
  move?: Move;
};

// Only `variants` here: setting initial or animate would cut the stagger off.
export function RevealItem({
  children,
  className,
  as = 'div',
  title,
  move = 'rise',
}: ItemProps) {
  const still = useStill();
  const Tag = tags[as];

  if (still) {
    const Plain = as;
    return (
      <Plain className={className} title={title}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} title={title} variants={moves[move]}>
      {children}
    </Tag>
  );
}
