import { brand } from '../../config/brand'
import { PLANS, SIZES } from '../catalog/data'
import { SLOT_LABEL } from '../catalog/addons'
import { orderQuote } from './custom'
import type { OrderDetails } from './whatsapp'

export interface SheetOrderPayload {
  sentAt: string
  name: string
  phone: string
  area: string
  diet: string
  eatsEgg: boolean
  size: string
  proteinGramsPerDay: number
  proteinGramsTotal: number
  plan: string
  start: string
  days: string
  items: string
  listTotal: number
  discountPercent: number
  payTotal: number
  notes: string
}

export function sheetOrderPayload(order: OrderDetails, now = new Date()): SheetOrderPayload {
  const quote = orderQuote(order, now)
  return {
    sentAt: now.toISOString(),
    name: order.name.trim(),
    phone: order.phone.replace(/^\+/, '').replace(/\s+/g, ' ').trim(),
    area: order.area.trim(),
    diet: order.diet === 'veg' && order.eatsEgg ? 'veg (eats egg)' : order.diet,
    eatsEgg: order.eatsEgg,
    size: order.size,
    proteinGramsPerDay: SIZES[order.size].proteinGrams,
    proteinGramsTotal: quote.protein,
    plan: PLANS[order.plan].label,
    start: order.start,
    days: quote.days,
    items: quote.lines.map((line) => `${line.dayName} ${SLOT_LABEL[line.slot]} ${line.name}`).join('; '),
    listTotal: quote.list,
    discountPercent: quote.discountPercent,
    payTotal: quote.pay,
    notes: order.notes.trim(),
  }
}

export function sendToSheet(order: OrderDetails): void {
  if (!brand.sheetWebhookUrl) return
  void fetch(brand.sheetWebhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(sheetOrderPayload(order)),
  }).catch(() => undefined)
}
