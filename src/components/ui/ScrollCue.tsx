import { useEffect, useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

type Props = {
  href: string;
  label: string;
  // Distance from the bottom before the cue fades; bigger means it lingers longer.
  fadeAt?: number;
  className?: string;
};

export function ScrollCue({ href, label, fadeAt = 160, className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    // Measured off its own position, not page scroll, so every cue fades the same way.
    const update = () => {
      const top = ref.current?.getBoundingClientRect().top;
      if (top === undefined) return;
      setFaded(top < window.innerHeight - fadeAt);
    };

    // passive tells the browser this handler never blocks the scroll.
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [fadeAt]);

  return (
    <a
      ref={ref}
      href={href}
      className={`group flex min-w-64 flex-col items-center gap-1.5 rounded-sm px-16 py-3 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.22em] transition-all duration-300 hover:text-accent ${
        faded ? 'pointer-events-none opacity-0' : 'opacity-50 hover:opacity-100'
      } ${className ?? ''}`}
    >
      {label}
      <LuChevronDown className="size-4 transition-transform group-hover:translate-y-1" />
    </a>
  );
}
