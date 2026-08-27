import { useEffect, useRef } from 'react';
import { LuExternalLink, LuX } from 'react-icons/lu';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
  // Set for project screenshots, so the demo is one click from the image.
  liveUrl?: string;
};

export function Lightbox({ src, alt, onClose, liveUrl }: Props) {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Whatever was focused before, so it can be handed back on close.
    const opener = document.activeElement as HTMLElement | null;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // aria-modal only promises this, it does not do it, so Tab is
      // wrapped by hand to keep focus from reaching the page behind.
      const stops =
        dialog.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!stops?.length) return;

      const first = stops[0];
      const last = stops[stops.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);

    // Stop the page behind scrolling while this is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus in, so the dialog is announced and Tab starts inside it.
    dialog.current?.querySelector('button')?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
      opener?.focus();
    };
  }, [onClose]);

  return (
    // Backdrop click closes it; the image stops that click bubbling up.
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      onContextMenu={event => event.preventDefault()}
      className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-md p-2 text-white/70 transition-colors hover:text-white"
      >
        <LuX className="size-6" />
      </button>

      {/* Wrapper stops the click bubbling, so the image or button won't close it. */}
      <div
        onClick={event => event.stopPropagation()}
        className="flex max-h-[86vh] flex-col items-center gap-4"
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-h-[76vh] max-w-full rounded-sm object-contain shadow-2xl"
        />

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent/60 px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            <LuExternalLink className="size-4" />
            Visit live site
          </a>
        )}
      </div>
    </div>
  );
}
