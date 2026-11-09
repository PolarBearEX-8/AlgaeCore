import type { CSSProperties, ReactNode } from 'react'

/** Class name helper (tiny clsx). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Stagger delay for `data-anim` elements (in steps of ~90ms). */
export function d(step: number): CSSProperties {
  return { '--d': step } as CSSProperties
}

/** Shared slide header: kicker line + display title. */
export function SlideHeader({ step, kicker, title, tone = 'dark' }: {
  step: string
  kicker: string
  title: ReactNode
  tone?: 'dark' | 'light'
}) {
  return (
    <header className={cx('slide-head', tone === 'light' && 'slide-head--light')}>
      <p className="kicker" data-anim style={d(0)}>
        <span>{step}</span>
        {kicker}
      </p>
      <h2 className="slide-title" data-anim style={d(1)}>{title}</h2>
    </header>
  )
}
