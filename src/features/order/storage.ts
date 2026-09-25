import type { OrderDetails } from './whatsapp'

const KEY = 'breakfast-order-details'

export type SavedDetails = Pick<
  OrderDetails,
  'name' | 'phone' | 'area' | 'size' | 'diet' | 'eatsEgg' | 'notes'
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
