import type { ReactNode } from 'react'

/** A single presentation slide definition. */
export interface SlideDef {
  id: string
  tone: 'dark' | 'light'
  /** Short label shown in the top navigation bar. */
  label: string
  element: ReactNode
}
