/** Centralized navigation + 16:9 scaling + input handling. */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { SlideDef } from '../types'
import Slide from './Slide'
import ProgressIndicator from './ProgressIndicator'
import SlideControls from './SlideControls'
import SlideOutline from './SlideOutline'

/** Authoring resolution — every slide is designed at 1280 × 720 (16:9). */
export const STAGE_W = 1280
export const STAGE_H = 720

function clampSlide(n: number, total: number): number {
  return Math.max(0, Math.min(total - 1, n))
}

export default function Presentation({ slides }: { slides: SlideDef[] }) {
  const total = slides.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  /* Topics already shown in this session — the outline greys out the rest. */
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    setVisited((seen) => {
      if (seen.has(index)) return seen
      const nextSeen = new Set(seen)
      nextSeen.add(index)
      return nextSeen
    })
  }, [index])

  /* Keep the 1280×720 stage scaled to fit the viewport. */
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      const s = Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H)
      if (s > 0) setScale(s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void document.documentElement.requestFullscreen().catch(() => undefined)
    }
  }, [])

  const next = useCallback(() => {
    setDir(1)
    setIndex((i) => Math.min(i + 1, total - 1))
  }, [total])

  const prev = useCallback(() => {
    setDir(-1)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const goTo = useCallback(
    (n: number) => {
      setIndex((current) => {
        const target = clampSlide(n, total)
        setDir(target >= current ? 1 : -1)
        return target
      })
    },
    [total],
  )

  /* Keyboard navigation. Ctrl/Cmd+P is intentionally left to the browser. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(total - 1)
          break
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault()
            toggleFullscreen()
          }
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, total, toggleFullscreen])

  return (
    <div className="deck" ref={viewportRef} style={{ '--dir': dir } as CSSProperties}>
      <div className="deck__stage" style={{ transform: `scale(${scale})` }}>
        {slides.map((slide, i) => (
          <Slide
            key={slide.id}
            active={i === index}
            tone={slide.tone}
            outline={
              <SlideOutline
                current={index}
                visited={visited}
                labels={slides.map((s) => s.label)}
              />
            }
          >
            {slide.element}
          </Slide>
        ))}
      </div>

      {/* Edge click zones (Keynote-style: click left/back, right/advance). */}
      <button type="button" className="deck__zone deck__zone--prev no-print" onClick={prev} aria-label="Previous slide" tabIndex={-1} />
      <button type="button" className="deck__zone deck__zone--next no-print" onClick={next} aria-label="Next slide" tabIndex={-1} />

      <ProgressIndicator current={index} total={total} onGoTo={goTo} />
      <SlideControls
        current={index}
        total={total}
        canPrev={index > 0}
        canNext={index < total - 1}
        onPrev={prev}
        onNext={next}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  )
}
