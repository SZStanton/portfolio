import { m } from 'motion/react';
import { EASE, REVEAL_VIEWPORT } from '../../lib/motion';
import { useStill } from '../../hooks/useStill';

// Each word sits in a clipped box and rises out of it, so the line assembles
// itself rather than fading in as one block.
// 135% rather than 110%, since the box is taller than the word to clear
// descenders and a shorter drop leaves the letter tops showing.
const word = {
  hidden: { y: '135%' },
  shown: { y: '0%', transition: { duration: 0.65, ease: EASE } },
};

type Props = {
  // A newline in the text forces a break, for a heading that has to split in
  // one particular place rather than wherever the box happens to run out.
  text: string;
  className?: string;
  // Seconds between words. Lower for long headings, or the last word lands late.
  gap?: number;
};

export function RevealWords({ text, className, gap = 0.055 }: Props) {
  const still = useStill();
  if (still) {
    return (
      <span className={`whitespace-pre-line ${className ?? ''}`}>{text}</span>
    );
  }

  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
      variants={{ shown: { transition: { staggerChildren: gap } } }}
    >
      {text.split('\n').map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(' ').map((part, i) => (
            // Space after each word, or they run together once inline-block.
            <span
              key={`${part}-${i}`}
              className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
            >
              <m.span variants={word} className="inline-block">
                {part}
                {i < line.split(' ').length - 1 && ' '}
              </m.span>
            </span>
          ))}
        </span>
      ))}
    </m.span>
  );
}
