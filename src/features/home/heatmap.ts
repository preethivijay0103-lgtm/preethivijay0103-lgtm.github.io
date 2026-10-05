/** Predicted attention / click intensity (1 = low, 5 = peak). Based on F-pattern, imagery, and CTA placement. */
export type HomeZoneId =
  | 'ticker'
  | 'hero'
  | 'facts'
  | 'menu'
  | 'pricing'
  | 'steps'
  | 'voices'
  | 'closing'

export type HomeZoneMeta = {
  intensity: 1 | 2 | 3 | 4 | 5
  label: string
  action: string
}

export const HOME_ZONES: Record<HomeZoneId, HomeZoneMeta> = {
  ticker: {
    intensity: 2,
    label: 'Ticker — peripheral scan',
    action: 'Keep one clear offer; avoid clutter',
  },
  hero: {
    intensity: 5,
    label: 'Hero — hottest zone',
    action: 'Primary trial CTA + headline + food visual',
  },
  facts: {
    intensity: 2,
    label: 'Trust chips',
    action: 'Scan only; keep short',
  },
  menu: {
    intensity: 4,
    label: 'Week menu — high interest',
    action: 'Swipe / click food; link to menu or order',
  },
  pricing: {
    intensity: 5,
    label: 'Lean vs Build — decision point',
    action: 'Both sizes need a register CTA',
  },
  steps: {
    intensity: 3,
    label: 'How it works',
    action: 'Reassurance before commit',
  },
  voices: {
    intensity: 2,
    label: 'Social proof',
    action: 'Lower scroll; optional',
  },
  closing: {
    intensity: 4,
    label: 'Bottom CTA band',
    action: 'Repeat trial offer for scrollers',
  },
}
