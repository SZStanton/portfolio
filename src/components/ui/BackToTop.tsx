import { useEffect, useState } from 'react';
import { LuChevronUp } from 'react-icons/lu';

type Props = {
  // How close to the bottom of the page before it appears; bigger shows it sooner.
  showAt?: number;
};

export function BackToTop({ showAt = 220 }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const page = document.documentElement.scrollHeight;
      // Nothing worth a button on a page that barely scrolls.
      const scrollable = page > window.innerHeight + showAt;
      const reached = window.scrollY + window.innerHeight >= page - showAt;
      setShown(scrollable && reached);
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
  }, [showAt]);

  return (
    <button
      type="button"
      // No behaviour passed on purpose. index.css already sets scroll-behavior on
      // html, so this is smooth normally and instant for anyone who asked for
      // less motion, without checking the preference twice.
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      // Out of the tab order once invisible, so keyboard users do not land on a
      // focus stop they cannot see.
      tabIndex={shown ? undefined : -1}
      className={`fixed bottom-6 right-6 z-40 flex size-[2.7rem] items-center justify-center rounded-sm border border-accent-soft bg-surface-raised text-accent shadow-card transition-all duration-300 hover:border-accent hover:bg-hover active:border-accent active:bg-hover ${
        shown
          ? 'opacity-90 hover:opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <LuChevronUp className="size-5" />
    </button>
  );
}
