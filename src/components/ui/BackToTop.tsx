import { useEffect, useState } from 'react';
import { LuChevronUp } from 'react-icons/lu';
import { scrollToTop } from '../../hooks/useSmoothScroll';

type Props = {
  // How close to the bottom of the page before it appears; bigger shows it sooner.
  showAt?: number;
};

export function BackToTop({ showAt = 220 }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;

    // Reading scrollHeight forces a layout, and the page only changes height when
    // something loads or the window resizes, so it is cached between those.
    let page = document.documentElement.scrollHeight;

    const measure = () => {
      frame = 0;
      // Nothing worth a button on a page that barely scrolls.
      const scrollable = page > window.innerHeight + showAt;
      const reached = window.scrollY + window.innerHeight >= page - showAt;
      setShown(scrollable && reached);
    };

    // Scroll fires far more often than the screen redraws, so it waits for the
    // next frame and drops the events in between.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const remeasure = () => {
      page = document.documentElement.scrollHeight;
      onScroll();
    };

    // passive tells the browser this handler never blocks the scroll.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);

    // The page grows as screenshots and the lazy contact form arrive.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);

    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', remeasure);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [showAt]);

  return (
    <button
      type="button"
      onClick={scrollToTop}
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
