import { useEffect, useState } from 'react'
import { Icon } from './icons'
import { cx } from './ui'

/** Keyboard hints shown briefly on load. */
function useHint(): boolean {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 7000)
    return () => window.clearTimeout(t)
  }, [])
  return show
}

export default function SlideControls({ current, total, canPrev, canNext, onPrev, onNext, onToggleFullscreen, isFullscreen }: {
  current: number
  total: number
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
}) {
  const showHint = useHint()

  return (
    <>
      <div className="counter no-print" aria-hidden="true">
        <b>{String(current + 1).padStart(2, '0')}</b>
        <span> / {String(total).padStart(2, '0')}</span>
      </div>

      <div className="pres-controls no-print">
        <button type="button" className="ctl" onClick={onPrev} disabled={!canPrev} aria-label="Previous slide" title="Previous (←)">
          <Icon name="chevronL" size={16} />
        </button>
        <button type="button" className="ctl" onClick={onNext} disabled={!canNext} aria-label="Next slide" title="Next (→)">
          <Icon name="chevronR" size={16} />
        </button>
        <span className="ctl-divider" />
        <button type="button" className="ctl" onClick={onToggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title="Fullscreen (F)">
          <Icon name={isFullscreen ? 'compress' : 'expand'} size={15} />
        </button>
        <button type="button" className="ctl" onClick={() => window.print()} aria-label="Export presentation as PDF" title="Export PDF (Ctrl+P)">
          <Icon name="printer" size={16} />
        </button>
      </div>

      <div className={cx('hint no-print', !showHint && 'is-hidden')} aria-hidden="true">
        <span><kbd>←</kbd><kbd>→</kbd> Navigate</span>
        <span><kbd>F</kbd> Fullscreen</span>
        <span><kbd>Ctrl</kbd><kbd>P</kbd> Save as PDF</span>
      </div>
    </>
  )
}
