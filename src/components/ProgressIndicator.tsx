import { cx } from './ui'

/** Minimal progress dots — one per slide, clickable. Hidden in print. */
export default function ProgressIndicator({ current, total, onGoTo }: {
  current: number
  total: number
  onGoTo: (n: number) => void
}) {
  return (
    <nav className="progress no-print" aria-label="Slide progress">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={cx('progress__dot', i === current && 'is-current')}
          onClick={() => onGoTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current}
        />
      ))}
    </nav>
  )
}
