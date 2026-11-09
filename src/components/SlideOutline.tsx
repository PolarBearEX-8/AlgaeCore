import { Fragment } from 'react'
import { cx } from './ui'

/**
 * In-slide topic outline: a row of pills, one per slide topic (name only).
 * Visited topics are lit, the current one is highlighted, unvisited greys out.
 * Not clickable — navigation stays on the keyboard / controls / progress dots.
 */
export default function SlideOutline({ current, visited, labels }: {
  current: number
  visited: Set<number>
  labels: string[]
}) {
  return (
    <div className="slide-outline no-print">
      {labels.map((label, i) => (
        <Fragment key={label}>
          {i > 0 && <i className="slide-outline__link" />}
          <span
            className={cx(
              'slide-outline__item',
              i === current && 'is-current',
              i !== current && visited.has(i) && 'is-seen',
              i !== current && !visited.has(i) && 'is-unseen',
            )}
          >
            {label}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
