import type { Diet, Size } from '../catalog/data'
import type { CustomPicks } from './custom'
import { emptyPicks } from './custom'
import type { OrderDetails } from './whatsapp'

const KEY = 'breakfast-order-details'
const MENU_KEY = 'breakfast-menu-custom'

export type MenuDraft = {
  size: Size
  diet: Diet
  picks: CustomPicks
}

export function saveMenuDraft(draft: MenuDraft): void {
  try {
    sessionStorage.setItem(MENU_KEY, JSON.stringify(draft))
  } catch {
    // Private mode: Register still works without the menu draft.
  }
}

export function loadMenuDraft(): MenuDraft | null {
  try {
    const raw = sessionStorage.getItem(MENU_KEY)
    if (!raw) return null
    const draft = JSON.parse(raw) as Partial<MenuDraft>
    const size = draft.size === 'core' || draft.size === 'strong' || draft.size === 'elite' ? draft.size : 'strong'
    const diet = draft.diet === 'veg' ? 'veg' : 'nonveg'
    const picks = draft.picks ?? emptyPicks()
    return { size, diet, picks }
  } catch {
    return null
  }
}

export type SavedDetails = Pick<
  OrderDetails,
  'name' | 'phone' | 'area' | 'size' | 'diet' | 'eatsEgg' | 'drink' | 'notes'
>

export function loadDetails(): Partial<SavedDetails> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Partial<SavedDetails>) : {}
  } catch {
    return {}
  }
}

export function saveDetails(details: SavedDetails): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(details))
  } catch {
    // Private mode or full storage: the order still goes through, only the prefill is lost.
  }
}
