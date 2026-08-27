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
    let frame = 0;

    // Measured off its own position, not page scroll, so every cue fades the same way.
    const measure = () => {
      frame = 0;
      const top = ref.current?.getBoundingClientRect().top;
      if (top === undefined) return;
      setFaded(top < window.innerHeight - fadeAt);
    };

    // Scroll fires far more often than the screen redraws and measuring forces a
    // layout, so it waits for the next frame and drops the events in between.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // passive tells the browser this handler never blocks the scroll.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
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
