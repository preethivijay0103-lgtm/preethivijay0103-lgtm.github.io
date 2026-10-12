import type { DayMenu, Diet, Size } from '../catalog/data'
import { PLANS, PRICE_PER_DAY, SIZES, WEEK, salePricePerDay } from '../catalog/data'
import { SLOTS, addonFor, type Slot } from '../catalog/addons'
import { formatDay, nextDateForDay, planDates } from './dates'

export type CustomPicks = Partial<Record<DayMenu['id'], Slot[]>>

export interface CustomLine {
  dayId: DayMenu['id']
  dayName: string
  slot: Slot
  name: string
  price: number
  protein: number
}

export function emptyPicks(): CustomPicks {
  return {}
}

export function hasPicks(picks: CustomPicks): boolean {
  return WEEK.some((day) => (picks[day.id] ?? []).length > 0)
}

export function togglePick(picks: CustomPicks, dayId: DayMenu['id'], slot: Slot): CustomPicks {
  const current = picks[dayId] ?? []
  const next = current.includes(slot) ? current.filter((item) => item !== slot) : [...current, slot]
  return { ...picks, [dayId]: next }
}

export function customLines(picks: CustomPicks, size: Size, diet: Diet): CustomLine[] {
  const lines: CustomLine[] = []
  for (const day of WEEK) {
    for (const slot of SLOTS) {
      if (!(picks[day.id] ?? []).includes(slot)) continue
      const item = addonFor(day.id, slot, size, diet)
      lines.push({
        dayId: day.id,
        dayName: day.name,
        slot,
        name: item.name,
        price: item.price,
        protein: item.protein,
      })
    }
  }
  return lines
}

export function customTotals(picks: CustomPicks, size: Size, diet: Diet) {
  const lines = customLines(picks, size, diet)
  return {
    lines,
    list: lines.reduce((sum, line) => sum + line.price, 0),
    protein: Math.round(lines.reduce((sum, line) => sum + line.protein, 0) * 10) / 10,
  }
}

export function orderQuote(
  order: {
    size: Size
    diet: Diet
    plan: import('../catalog/data').PlanId
    start: string
    picks: CustomPicks
  },
  now = new Date(),
) {
  if (order.plan === 'custom') {
    const totals = customTotals(order.picks, order.size, order.diet)
    const days = WEEK.filter((day) => (order.picks[day.id] ?? []).length > 0)
      .map((day) => {
        const iso = nextDateForDay(day.id, now)
        return iso ? formatDay(iso) : day.name
      })
      .join(', ')
    return {
      list: totals.list,
      pay: totals.list,
      protein: totals.protein,
      discountPercent: 0,
      days,
      lines: totals.lines,
    }
  }
  const dayCount = PLANS[order.plan].days
  const dates = planDates(order.start, dayCount)
  return {
    list: PRICE_PER_DAY[order.size] * dayCount,
    pay: salePricePerDay(order.size) * dayCount,
    protein: SIZES[order.size].proteinGrams * dayCount,
    discountPercent: order.size === 'core' ? 25 : 30,
    days: dates.map(formatDay).join(', '),
    lines: [] as CustomLine[],
  }
}

export { SLOTS, addonFor }
export type { Slot }
