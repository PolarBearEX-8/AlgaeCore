export type IconName =
  | 'leaf' | 'panels' | 'cycle' | 'sensor' | 'co2' | 'o2'
  | 'building' | 'flask' | 'arrowR'
  | 'chevronL' | 'chevronR' | 'expand' | 'compress' | 'printer'
  | 'plus' | 'minus'

const PATHS: Record<IconName, React.ReactNode> = {
  leaf: (
    <>
      <path d="M5.5 18.5C5.5 10.5 11 5.5 19 5c-.4 8-4.5 13.5-11.2 13.5" />
      <path d="M6.5 17.5C9 13.5 11.5 11.2 15 9.6" />
    </>
  ),
  panels: (
    <>
      <rect x="3.5" y="6.5" width="7" height="13" rx="1.5" />
      <rect x="13.5" y="4.5" width="7" height="16" rx="1.5" />
      <circle cx="7" cy="11.5" r="0.9" />
      <circle cx="7" cy="15" r="0.6" />
      <path d="M17 9c-1 2-1 4.5 0 7" />
    </>
  ),
  cycle: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.7 2.9v4.2h-4.2" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="13.5" r="2.4" />
      <path d="M7.6 9.4a6.3 6.3 0 0 0 0 8.2" />
      <path d="M16.4 9.4a6.3 6.3 0 0 1 0 8.2" />
      <path d="M12 18.5v2.5" />
    </>
  ),
  co2: (
    <>
      <path d="M7 17.5h9.5a3.5 3.5 0 0 0 .9-6.9A5.3 5.3 0 0 0 7.6 8.4 4.3 4.3 0 0 0 7 17.5z" />
      <path d="M12 14.5V8.5" />
      <path d="m9.8 12.3 2.2 2.2 2.2-2.2" />
    </>
  ),
  o2: (
    <>
      <circle cx="8.5" cy="16.5" r="2.2" />
      <circle cx="13.5" cy="10.5" r="3" />
      <circle cx="17" cy="5" r="1.7" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2" />
      <path d="M10.5 20v-3.5h3V20" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5h5" />
      <path d="M10.5 3.5v5.2L5.9 16.4a2.2 2.2 0 0 0 1.9 3.3h8.4a2.2 2.2 0 0 0 1.9-3.3L13.5 8.7V3.5" />
      <path d="M8.2 14.5h7.6" />
    </>
  ),
  arrowR: <path d="M3.5 12h16M14.5 6.5 20 12l-5.5 5.5" />,
  chevronL: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  chevronR: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  compress: <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />,
  printer: (
    <>
      <path d="M7 8V3.5h10V8" />
      <rect x="4" y="8" width="16" height="7" rx="1.5" />
      <path d="M7 12.5h10v8H7z" />
    </>
  ),
  plus: <path d="M12 6v12M6 12h12" />,
  minus: <path d="M6 12h12" />,
}

export function Icon({ name, size = 22, strokeWidth = 1.6, className }: {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
