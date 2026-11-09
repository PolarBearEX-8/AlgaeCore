import { useState } from 'react'

/** Real photo (Wikimedia Commons, CC BY-SA 3.0 — BIQ House, Hamburg). */
export const PHOTOS = {
  houseFull: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Algenhaus.jpg',
    credit: 'Photo: Arnoldius, Wikimedia Commons (CC BY-SA 3.0)',
    alt: 'The BIQ House in Hamburg — bright green residential building with algae panels on its left facade',
  },
  facadeWide: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Algenhaus_Fassade_mit_Photobioreaktoren.jpg',
    credit: 'Photo: Martin Künzel, Wikimedia Commons (CC BY-SA 3.0)',
    alt: 'Front facade of the BIQ House covered in aluminium frames holding algae-filled glass panels',
  },
  facadeDetail: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Algenhaus_Photobioreaktoren_im_Detail.jpg',
    credit: 'Photo: Martin Künzel, Wikimedia Commons (CC BY-SA 3.0)',
    alt: 'Close-up of the transparent algae bioreactor panels mounted in front of apartment windows',
  },
} as const

/** A real photograph with optional caption + graceful fallback if loading fails. */
export default function Photo({ photo, caption, className }: {
  photo: { src: string; alt: string; credit: string }
  caption?: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`photo ${className ?? ''}`}>
      {failed ? (
        <div className="photo__fallback" role="img" aria-label={photo.alt}>
          <span>Image unavailable</span>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {(caption || photo.credit) && (
        <figcaption>
          {caption && <span className="photo__caption">{caption}</span>}
          <span className="photo__credit">{photo.credit}</span>
        </figcaption>
      )}
    </figure>
  )
}
