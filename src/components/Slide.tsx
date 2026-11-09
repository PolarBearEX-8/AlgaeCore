import type { ReactNode } from 'react'
import { cx } from './ui'

export interface SlideProps {
  active: boolean
  tone: 'dark' | 'light'
  /** Topic outline strip rendered at the top of the slide, above its content. */
  outline?: ReactNode
  children: ReactNode
}

/** A single 16:9 slide surface. Positioned by the deck; animated via `.is-active`. */
export default function Slide({ active, tone, outline, children }: SlideProps) {
  return (
    <section
      className={cx('slide', `slide--${tone}`, active && 'is-active')}
      aria-hidden={!active}
      role="group"
    >
      {outline}
      {children}
    </section>
  )
}
