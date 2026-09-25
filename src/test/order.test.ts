import { describe, expect, it } from 'vitest'
import { WEEK, compartmentsFor, planTotal } from '../features/catalog/data'
import { earliestStart, formatDay, isValidStart, planDates, startOptions } from '../features/order/dates'
import { orderMessage, whatsappUrl } from '../features/order/whatsapp'

// Helper: an instant given as India time.
function ist(y: number, m: number, d: number, h: number, min = 0): Date {
  return new Date(Date.UTC(y, m - 1, d, h, min) - 330 * 60 * 1000)
}

describe('prices', () => {
  it('totals each size and plan, drink included', () => {
    expect(planTotal('lean', 'trial')).toBe(387)
    expect(planTotal('lean', 'week')).toBe(645)
    expect(planTotal('build', 'trial')).toBe(477)
    expect(planTotal('build', 'week')).toBe(795)
  })
})

describe('dates', () => {
  it('starts tomorrow when ordered before 9 pm IST', () => {
    expect(earliestStart(ist(2026, 9, 29, 20, 59))).toBe('2026-09-30')
  })

  it('starts the day after tomorrow when ordered at or after 9 pm IST', () => {
    expect(earliestStart(ist(2026, 9, 29, 21, 0))).toBe('2026-10-01')
  })

  it('skips Saturday and Sunday', () => {
    expect(earliestStart(ist(2026, 9, 25, 10))).toBe('2026-09-28')
    expect(earliestStart(ist(2026, 9, 27, 20))).toBe('2026-09-28')
    expect(earliestStart(ist(2026, 9, 27, 22))).toBe('2026-09-29')
  })

  it('offers only weekdays', () => {
    const options = startOptions(ist(2026, 9, 25, 10), 6)
    expect(options).toEqual(['2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-05'])
  })

  it('runs a plan over weekdays only', () => {
    expect(planDates('2026-10-01', 3)).toEqual(['2026-10-01', '2026-10-02', '2026-10-05'])
  })

  it('rejects weekends and past-cutoff days', () => {
    const now = ist(2026, 9, 29, 22)
    expect(isValidStart('2026-10-03', now)).toBe(false)
    expect(isValidStart('2026-09-30', now)).toBe(false)
    expect(isValidStart('2026-10-01', now)).toBe(true)
  })

  it('formats a day', () => {
    expect(formatDay('2026-09-29')).toBe('Tue 29 Sep')
  })
})

describe('compartments', () => {
  it('gives Lean 4 compartments and Build 3 with the salad beside the protein', () => {
    const monday = WEEK[0]
    expect(compartmentsFor(monday, 'lean', 'veg')).toHaveLength(4)
    const build = compartmentsFor(monday, 'build', 'veg')
    expect(build).toHaveLength(3)
    expect(build[1].items).toEqual(['Paneer tikka, 80 g', 'Carrot and cucumber'])
  })
})

describe('WhatsApp message', () => {
  const order = {
    name: ' Priya ',
    phone: '+91 9876543210',
    area: 'HSR PG',
    size: 'lean' as const,
    diet: 'veg' as const,
    eatsEgg: false,
    plan: 'trial' as const,
    start: '2026-09-29',
    notes: '',
  }

  it('lists the whole order', () => {
    expect(orderMessage(order)).toBe(
      [
        'New order: Breakfast box',
        'Name: Priya',
        'Phone: +91 9876543210',
        'Area: HSR PG',
        'Size: Lean',
        'Diet: Veg',
        'Plan: 3-day trial, Tue 29 Sep to Thu 1 Oct',
        'Total: ₹387',
        'Allergies or notes: none',
        'Cancellation policy: accepted',
      ].join('\n'),
    )
  })

  it('marks vegetarians who eat egg', () => {
    expect(orderMessage({ ...order, eatsEgg: true })).toContain('Diet: Veg (eats egg)')
  })

  it('builds an encoded wa.me link', () => {
    expect(whatsappUrl('Hi there\n₹387', '919876543210')).toBe(
      'https://wa.me/919876543210?text=Hi%20there%0A%E2%82%B9387',
    )
  })
})
