import type { Diet, Size } from '../catalog/data'

const SIZES: Size[] = ['core', 'strong', 'elite']
const DIETS: Diet[] = ['veg', 'nonveg']

export function parseMenuSize(value: string | null): Size | null {
  return SIZES.includes(value as Size) ? (value as Size) : null
}

export function parseMenuDiet(value: string | null): Diet | null {
  return DIETS.includes(value as Diet) ? (value as Diet) : null
}

/** Week menu opens once a box size is chosen (diet is picked on the week screen). */
export function isMenuWeekOpen(searchParams: URLSearchParams): boolean {
  return parseMenuSize(searchParams.get('size')) !== null
}

export function menuWeekSearch(size: Size, diet: Diet): string {
  const params = new URLSearchParams({ size, diet })
  return `?${params.toString()}`
}
