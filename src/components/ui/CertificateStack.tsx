import { useState } from 'react'

export type Certificate = {
  src: string
  alt: string
  label?: string
  // Taller than it is wide, so it gets the upright box.
  portrait?: boolean
}

type Props = {
  images: Certificate[]
  onOpen: (image: Certificate) => void
}

// Two standard boxes, one per orientation, so nothing is letterboxed
// into a shape that does not suit it. No padding, so the picture fills
// the frame, and no overflow clip, so it can grow past it on hover.
const box =
  'group relative block rounded-md border border-line bg-surface-raised shadow-card transition-colors duration-300 hover:z-10 hover:border-accent-soft active:z-10 active:border-accent'

export function CertificateStack({ images, onOpen }: Props) {
  // Which one is on top. The first in the list starts in front.
  const [index, setIndex] = useState(0)
  const current = images[index]
  const size = current.portrait ? 'h-52 w-40' : 'h-36 w-52'

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <div className="relative">
        {/* Sits behind and slightly rotated, so a stack of two reads as
            a stack rather than as one thumbnail. */}
        {images.length > 1 && (
          <span
            aria-hidden="true"
            className={`absolute inset-0 -rotate-2 rounded-md border border-line bg-surface-raised shadow-card ${size}`}
          />
        )}

        <button
          type="button"
          onClick={() => onOpen(current)}
          aria-label={`View ${current.alt}`}
          className={`${box} ${size}`}
        >
          {/* The box holds still and the picture grows out past it. */}
          <img
            src={current.src}
            alt={current.alt}
            loading="lazy"
            draggable={false}
            onContextMenu={event => event.preventDefault()}
            className="size-full rounded-md object-contain shadow-card transition-transform duration-300 group-hover:scale-[1.14] group-active:scale-[1.14]"
          />
        </button>
      </div>

      {/* Gold diamonds to switch, one per certificate. */}
      {images.length > 1 && (
        // Negative margin keeps the padded hit areas from pushing the
        // diamonds apart visually.
        <div className="-m-2 flex items-center">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${image.label ?? image.alt}`}
              aria-current={i === index}
              // Padding is the click target, the diamond inside is the visual.
              className="group grid place-items-center p-3"
            >
              <span
                className={`size-2.5 rotate-45 border border-accent transition-colors ${
                  i === index
                    ? 'bg-accent'
                    : 'bg-transparent group-hover:bg-accent-soft group-active:bg-accent-soft'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
