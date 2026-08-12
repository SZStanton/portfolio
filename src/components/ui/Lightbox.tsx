import { useEffect } from 'react'
import { LuX } from 'react-icons/lu'

type Props = {
  src: string
  alt: string
  onClose: () => void
}

export function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    // Stop the page behind scrolling while this is open.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

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

      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={event => event.stopPropagation()}
        className="max-h-[76vh] max-w-[86%] rounded-sm object-contain shadow-2xl"
      />
    </div>
  )
}
