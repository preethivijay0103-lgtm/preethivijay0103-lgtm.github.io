import { describe, expect, it } from 'vitest'
import { addonFor } from '../features/catalog/addons'
import { WEEK, compartmentsFor, photoFor, planTotal } from '../features/catalog/data'
import { orderQuote } from '../features/order/custom'
import { earliestStart, formatDay, isValidStart, planDates, startOptions } from '../features/order/dates'
import { sheetOrderPayload } from '../features/order/sheet'
import { orderMessage, whatsappUrl } from '../features/order/whatsapp'

// Helper: an instant given as India time.
function ist(y: number, m: number, d: number, h: number, min = 0): Date {
  return new Date(Date.UTC(y, m - 1, d, h, min) - 330 * 60 * 1000)
}

describe('prices', () => {
  it('totals each size and plan, drink included', () => {
    expect(planTotal('core', 'trial')).toBe(357)
    expect(planTotal('strong', 'trial')).toBe(396)
    expect(planTotal('elite', 'week')).toBe(800)
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
  it('shows Core with fewer kcal than Elite on mains', async () => {
    const { factsFor } = await import('../features/catalog/itemDetails')
    const monday = WEEK[0]
    const lean = factsFor(monday, 'core', 'veg', 'Main')
    const build = factsFor(monday, 'elite', 'veg', 'Main')
    expect(lean?.ingredients.map((item) => item.name)).toEqual([
      'Black chickpeas',
      'Green moong',
      'Pearl millet',
      'Toor & urad dal',
      'Roasted peanut chutney',
    ])
    expect(lean?.kcal).toBe(208)
    expect(build?.kcal).toBe(303)
    expect(lean!.kcal).toBeLessThan(build!.kcal)
  })
})

describe('compartments', () => {
  it('lists main, salad, and protein for Core and Elite', () => {
    const monday = WEEK[0]
    expect(compartmentsFor(monday, 'core', 'veg').map((part) => part.label)).toEqual([
      'Main + Side',
      'Protein',
      'Sauce',
      'Salad',
      'Drink',
    ])
    const build = compartmentsFor(monday, 'elite', 'veg')
    expect(build[0].items[0]).toBe('Multigrain Dosa + Peanut Chutney')
    expect(build[1].items).toEqual(['Palak Paneer + Rajma'])
    expect(build[2].items).toEqual(['Roasted Pepper Yogurt Dip'])
    expect(build[3].items).toEqual(['Black Chickpea & Peanut Salad'])
    expect(build[4].items).toEqual(['Fermented Rice'])
  })
})

describe('photos', () => {
  it('changes the photo when diet or size changes', () => {
    const monday = WEEK[0]
    expect(photoFor(monday, 'core', 'veg')).toBe('/images/mon-lean-veg-4.jpg?v=15')
    expect(photoFor(monday, 'strong', 'nonveg')).toBe('/images/mon-lean-nonveg-4.jpg?v=15')
    expect(photoFor(monday, 'elite', 'veg')).toBe('/images/mon-build-veg-4.jpg?v=15')
  })
})

describe.skip('custom add-ons', () => {
  it('prices Monday Core non-veg protein from the weekly plan', () => {
    expect(addonFor('mon', 'protein', 'core', 'nonveg')).toEqual({
      name: 'Black Pepper Chicken',
      price: 100,
      protein: 14,
    })
    const quote = orderQuote(
      { size: 'core', diet: 'nonveg', plan: 'custom', start: '', picks: { mon: ['protein'] } },
      ist(2026, 9, 25, 10),
    )
    expect(quote.pay).toBe(100)
    expect(quote.protein).toBe(14)
    expect(quote.discountPercent).toBe(0)
  })
})

describe('WhatsApp message', () => {
  const order = {
    name: ' Priya ',
    phone: '+91 9876543210',
    area: 'HSR PG',
    size: 'strong' as const,
    diet: 'veg' as const,
    eatsEgg: false,
    drink: 'day' as const,
    plan: 'trial' as const,
    start: '2026-09-29',
    picks: {},
    notes: '',
  }

  it('lists the whole order', () => {
    expect(orderMessage(order)).toBe(
      [
        'New order: Breakfast box',
        'Name: Priya',
        'Phone: +91 9876543210',
        'Area: HSR PG',
        'Size: Strong (40 g)',
        'Diet: Veg',
        'Plan: 3-day trial',
        'Days: Tue 29 Sep, Wed 30 Sep, Thu 1 Oct',
        'Protein: 120 g',
        'List: ₹567. 30% off. Pay: ₹396',
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

describe('Google Sheet payload', () => {
  it('applies 30% off on the list total and sums protein for the plan', () => {
    const payload = sheetOrderPayload(
      {
        name: ' Priya ',
        phone: '+91 9876543210',
        area: 'HSR PG',
        size: 'strong',
        diet: 'veg',
        eatsEgg: false,
        drink: 'day',
        plan: 'trial',
        start: '2026-09-29',
        picks: {},
        notes: '',
      },
      new Date('2026-09-28T12:00:00.000Z'),
    )
    expect(payload.listTotal).toBe(567)
    expect(payload.discountPercent).toBe(30)
    expect(payload.payTotal).toBe(396)
    expect(payload.proteinGramsPerDay).toBe(40)
    expect(payload.proteinGramsTotal).toBe(120)
    expect(payload.days).toBe('Tue 29 Sep, Wed 30 Sep, Thu 1 Oct')
    expect(payload.diet).toBe('veg')
    expect(payload.phone).toBe('91 9876543210')
    expect(payload.phone.startsWith('+')).toBe(false)
  })
})
