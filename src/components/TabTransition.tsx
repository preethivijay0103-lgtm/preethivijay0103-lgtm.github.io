import type { ReactNode } from 'react'

/** Re-mount children with a short fade + slide when `transitionKey` changes (tabs, toggles, routes). */
export function TabTransition({
  transitionKey,
  children,
  className = '',
}: {
  transitionKey: string
  children: ReactNode
  className?: string
}) {
  return (
    <div key={transitionKey} className={`tab-transition ${className}`.trim()}>
      {children}
    </div>
  )
}
