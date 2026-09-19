import { RevealGroup, RevealItem } from '../motion/Reveal';
import { RevealWords } from '../motion/RevealWords';
import { SectionLabel } from './SectionLabel';

type SectionHeaderProps = {
  // Two digits, deco likes its sections numbered.
  number: string;
  eyebrow: string;
  title: string;
  // Points aria-labelledby at the heading, so jumping here announces the section.
  headingId: string;
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  headingId,
}: SectionHeaderProps) {
  return (
    <RevealGroup gap={0.06}>
      <header>
        <RevealItem className="flex items-baseline gap-3">
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-accent">
            {number}
          </span>
          <SectionLabel>{eyebrow}</SectionLabel>
        </RevealItem>

        <h2
          id={headingId}
          className="measure-heading mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl"
        >
          <RevealWords text={title} />
        </h2>

        <RevealItem
          className="rule-double measure-heading mt-5 origin-left"
          move="draw"
        />
      </header>
    </RevealGroup>
  );
}
