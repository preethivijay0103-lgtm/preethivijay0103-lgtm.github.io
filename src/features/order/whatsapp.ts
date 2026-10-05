import { brand } from '../../config/brand'
import { DIETS, PLANS, SIZES, formatRupees, planTotal } from '../catalog/data'
import type { Diet, DrinkId, PlanId, Size } from '../catalog/data'
import { formatDay, planDates } from './dates'

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
  notes: string
}

export function orderMessage(order: OrderDetails): string {
  const dates = planDates(order.start, PLANS[order.plan].days)
  const diet = order.diet === 'veg' && order.eatsEgg ? 'Veg (eats egg)' : DIETS[order.diet].label
  return [
    'New order: Breakfast box',
    `Name: ${order.name.trim()}`,
    `Phone: ${order.phone}`,
    `Area: ${order.area.trim()}`,
    `Size: ${SIZES[order.size].label}`,
    `Diet: ${diet}`,
    `Drink: the day's drink`,
    `Plan: ${PLANS[order.plan].label}, ${formatDay(dates[0])} to ${formatDay(dates[dates.length - 1])}`,
    `Total: ${formatRupees(planTotal(order.size, order.plan))}`,
    `Allergies or notes: ${order.notes.trim() || 'none'}`,
    'Cancellation policy: accepted',
  ].join('\n')
}

export function whatsappUrl(text: string, number: string = brand.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
