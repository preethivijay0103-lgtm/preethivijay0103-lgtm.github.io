import { describe, expect, it } from 'vitest'
import { WEEK, compartmentsFor, photoFor, planTotal } from '../features/catalog/data'
import { earliestStart, formatDay, isValidStart, planDates, startOptions } from '../features/order/dates'
import { orderMessage, whatsappUrl } from '../features/order/whatsapp'

// Helper: an instant given as India time.
function ist(y: number, m: number, d: number, h: number, min = 0): Date {
  return new Date(Date.UTC(y, m - 1, d, h, min) - 330 * 60 * 1000)
}

describe('prices', () => {
  it('totals each size and plan, drink included', () => {
    expect(planTotal('lean', 'trial')).toBe(396)
    expect(planTotal('lean', 'week')).toBe(660)
    expect(planTotal('build', 'trial')).toBe(459)
    expect(planTotal('build', 'week')).toBe(765)
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

describe('item nutrition', () => {
  it('shows Lean with fewer kcal than Build on mains', async () => {
    const { factsFor } = await import('../features/catalog/itemDetails')
    const monday = WEEK[0]
    const lean = factsFor(monday, 'lean', 'veg', 'Main')
    const build = factsFor(monday, 'build', 'veg', 'Main')
    expect(lean?.ingredients.map((item) => item.name)).toEqual([
      'Black chana',
      'Green gram',
      'Pearl millet',
      'Toor dal',
      'Urad dal',
    ])
    expect(lean?.kcal).toBe(208)
    expect(build?.kcal).toBe(303)
    expect(lean!.kcal).toBeLessThan(build!.kcal)
  })
})

describe('compartments', () => {
  it('lists main, salad, and protein for Lean and Build', () => {
    const monday = WEEK[0]
    expect(compartmentsFor(monday, 'lean', 'veg').map((part) => part.label)).toEqual([
      'Main',
      'Side',
      'Protein',
      'Sauce',
      'Salad',
    ])
    const build = compartmentsFor(monday, 'build', 'veg')
    expect(build[0].items[0]).toBe('Sprout dosa, 3 dosas')
    expect(build[1].items).toEqual(['Peanut chutney'])
    expect(build[2].items).toEqual(['Palak paneer, rajma'])
    expect(build[3].items).toEqual(['Chipotle sauce'])
  })
})

describe('photos', () => {
  it('changes the photo when diet or size changes', () => {
    const monday = WEEK[0]
    expect(photoFor(monday, 'lean', 'veg')).toBe('/images/mon-lean-veg-4.jpg?v=15')
    expect(photoFor(monday, 'lean', 'nonveg')).toBe('/images/mon-lean-nonveg-4.jpg?v=15')
    expect(photoFor(monday, 'build', 'veg')).toBe('/images/mon-build-veg-4.jpg?v=15')
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
    drink: 'day' as const,
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
        "Drink: the day's drink",
        'Plan: 3-day trial, Tue 29 Sep to Thu 1 Oct',
        'Total: ₹396',
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
