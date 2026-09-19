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
    <header>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xs font-semibold tracking-[0.2em] text-accent">
          {number}
        </span>
        <SectionLabel>{eyebrow}</SectionLabel>
      </div>

      <h2
        id={headingId}
        className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl"
      >
        {title}
      </h2>

      <div className="rule-double mt-6 max-w-24" />
    </header>
  );
}
