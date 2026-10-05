import { useSyncExternalStore } from 'react'

/** Tailwind v4 defaults — keep in sync with responsive utilities. */
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 } as const

export type Breakpoint = 'base' | keyof typeof BREAKPOINTS

const ORDER: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm']

let queries: MediaQueryList[] | null = null
let cached: Breakpoint = 'base'
let boundMatchMedia: typeof window.matchMedia | null = null
const listeners = new Set<() => void>()

function compute(): Breakpoint {
  for (let i = 0; i < ORDER.length; i++) {
    if (queries![i]!.matches) return ORDER[i]!
  }
  return 'base'
}

function ensureStore(): void {
  if (queries !== null && boundMatchMedia === window.matchMedia) return
  boundMatchMedia = window.matchMedia
  queries = ORDER.map((bp) =>
    window.matchMedia(`(min-width: ${BREAKPOINTS[bp as keyof typeof BREAKPOINTS]}px)`),
  )
  cached = compute()
  const onChange = () => {
    const next = compute()
    if (next !== cached) {
      cached = next
      listeners.forEach((l) => l())
    }
  }
  queries.forEach((q) => q.addEventListener('change', onChange))
}

function subscribe(notify: () => void): () => void {
  ensureStore()
  listeners.add(notify)
  return () => listeners.delete(notify)
}

function snapshot(): Breakpoint {
  ensureStore()
  return cached
}

/** Current breakpoint; server snapshot is `base` (mobile-first). */
export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, snapshot, () => 'base')
}

export { BREAKPOINTS }
