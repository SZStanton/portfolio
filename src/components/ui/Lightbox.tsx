import { useEffect } from 'react';
import { LuExternalLink, LuX } from 'react-icons/lu';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
  // Set for project screenshots, so the demo is one click from the image.
  liveUrl?: string;
};

export function Lightbox({ src, alt, onClose, liveUrl }: Props) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    // Stop the page behind scrolling while this is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    // The backdrop closes it. The image below stops the click bubbling
    // up, so clicking the image itself does not.
    <div
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

      {/* Wrapper stops the click bubbling, so clicking the image or the
          button does not close the box, but the backdrop still does. */}
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
