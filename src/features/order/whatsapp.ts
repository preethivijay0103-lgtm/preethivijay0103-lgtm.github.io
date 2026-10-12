import { brand } from '../../config/brand'
import { DIETS, PLANS, SIZES, formatRupees } from '../catalog/data'
import type { Diet, DrinkId, PlanId, Size } from '../catalog/data'
import { SLOT_LABEL } from '../catalog/addons'
import { orderQuote, type CustomPicks } from './custom'

export interface OrderDetails {
  name: string
  phone: string
  area: string
  size: Size
  diet: Diet
  eatsEgg: boolean
  drink: DrinkId
  plan: PlanId
  start: string
  picks: CustomPicks
  notes: string
}

export function orderMessage(order: OrderDetails): string {
  const quote = orderQuote(order)
  const diet = order.diet === 'veg' && order.eatsEgg ? 'Veg (eats egg)' : DIETS[order.diet].label
  const itemLines =
    order.plan === 'custom'
      ? quote.lines.map(
          (line) => `${line.dayName} ${SLOT_LABEL[line.slot]}: ${line.name} (${formatRupees(line.price)}, ${line.protein} g)`,
        )
      : []
  return [
    'New order: Breakfast box',
    `Name: ${order.name.trim()}`,
    `Phone: ${order.phone}`,
    `Area: ${order.area.trim()}`,
    `Size: ${SIZES[order.size].label} (${SIZES[order.size].proteinGrams} g)`,
    `Diet: ${diet}`,
    `Plan: ${PLANS[order.plan].label}`,
    `Days: ${quote.days || 'none'}`,
    ...itemLines,
    `Protein: ${quote.protein} g`,
    quote.discountPercent
      ? `List: ${formatRupees(quote.list)}. ${quote.discountPercent}% off. Pay: ${formatRupees(quote.pay)}`
      : `Total: ${formatRupees(quote.pay)} (add-ons, full price)`,
    `Allergies or notes: ${order.notes.trim() || 'none'}`,
    'Cancellation policy: accepted',
  ].join('\n')
}

export function whatsappUrl(text: string, number: string = brand.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
