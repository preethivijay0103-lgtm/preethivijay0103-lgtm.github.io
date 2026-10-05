export type Size = 'lean' | 'build'
export type Diet = 'veg' | 'nonveg'

type BySize = Record<Size, string>

export interface DayMenu {
  id: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  short: string
  name: string
  images: Record<Size, Record<Diet, string>>
  main: BySize
  protein: Record<Diet, BySize>
  proteinGrams: Record<Diet, Record<Size, number>>
  salad: BySize
  side: Record<Diet, string>
  sauce: string
  drink: { name: string }
}

export const SIZES: Record<Size, { label: string; blurb: string; compartments: number; proteinGrams: number }> = {
  lean: {
    label: 'Lean',
    blurb: 'A lighter, balanced box for everyday mornings.',
    compartments: 4,
    proteinGrams: 40,
  },
  build: {
    label: 'Build',
    blurb: 'A fuller box with more protein and a bigger portion.',
    compartments: 4,
    proteinGrams: 50,
  },
}

export const DIETS: Record<Diet, { label: string }> = {
  veg: { label: 'Veg' },
  nonveg: { label: 'Non-veg' },
}

export const PRICE_PER_DAY: Record<Size, number> = { lean: 189, build: 219 }

/** Launch offer while we start. Checkout uses the sale price. */
export const LAUNCH_OFF_PERCENT = 30

export function salePricePerDay(size: Size): number {
  return Math.round((PRICE_PER_DAY[size] * (100 - LAUNCH_OFF_PERCENT)) / 100)
}

export type DrinkId = 'day' | 'buttermilk' | 'juice' | 'kanji' | 'shake' | 'smoothie'

export const DRINKS: Record<DrinkId, { label: string; note: string }> = {
  day: {
    label: "Follow the day's drink",
    note: 'Mon fermented rice porridge, Tue fruit juice, Wed fermented pearl millet porridge, Thu fermented finger millet porridge, Fri buttermilk.',
  },
  buttermilk: { label: 'Buttermilk', note: 'Every morning. Dairy.' },
  juice: { label: 'Fruit juice', note: 'Every morning.' },
  kanji: { label: 'Fermented millet porridge', note: 'Every morning. Millet drink.' },
  shake: { label: 'Peanut-almond shake', note: 'Every morning. Contains nuts.' },
  smoothie: { label: 'Fruit smoothie', note: 'Every morning. Usually dairy.' },
}

export function drinkLabel(drink: DrinkId): string {
  return drink === 'day' ? DRINKS.day.label : `${DRINKS[drink].label} every day`
}

export type PlanId = 'trial' | 'week'

export const PLANS: Record<PlanId, { label: string; days: number; note: string }> = {
  trial: { label: '3-day trial', days: 3, note: 'Try it for three mornings first.' },
  week: { label: '5-day week', days: 5, note: 'Monday to Friday, one box each morning.' },
}

export const WEEK: DayMenu[] = [
  {
    id: 'mon',
    short: 'Mon',
    name: 'Monday',
    images: {
      lean: { veg: '/images/mon-lean-veg-4.jpg', nonveg: '/images/mon-lean-nonveg-4.jpg' },
      build: { veg: '/images/mon-build-veg-4.jpg', nonveg: '/images/mon-build-nonveg-4.jpg' },
    },
    main: { lean: 'Sprout dosa, 2 dosas', build: 'Sprout dosa, 3 dosas' },
    protein: {
      nonveg: { lean: 'Pepper chicken', build: 'Pepper chicken, boiled egg' },
      veg: { lean: 'Palak paneer', build: 'Palak paneer, rajma' },
    },
    proteinGrams: { nonveg: { lean: 40.7, build: 50.5 }, veg: { lean: 41.0, build: 50.3 } },
    salad: {
      lean: 'Kala chana & peanut salad',
      build: 'Kala chana & peanut salad',
    },
    side: { veg: 'Peanut chutney', nonveg: 'Peanut chutney' },
    sauce: 'Chipotle sauce',
    drink: { name: 'Fermented Rice Porridge' },
  },
  {
    id: 'tue',
    short: 'Tue',
    name: 'Tuesday',
    images: {
      lean: { veg: '/images/tue-lean-veg-4.jpg', nonveg: '/images/tue-lean-nonveg-4.jpg' },
      build: { veg: '/images/tue-build-veg-4.jpg', nonveg: '/images/tue-build-nonveg-4.jpg' },
    },
    main: { lean: 'Millet upma', build: 'Millet upma' },
    protein: {
      nonveg: { lean: 'Chicken tikka', build: 'Chicken tikka' },
      veg: { lean: 'Paneer tikka', build: 'Paneer tikka' },
    },
    proteinGrams: { nonveg: { lean: 42.6, build: 52.9 }, veg: { lean: 40.4, build: 50.2 } },
    salad: {
      lean: 'Sprout & rajma salad',
      build: 'Sprout & rajma salad',
    },
    side: { veg: 'Coconut chutney', nonveg: 'Coconut chutney' },
    sauce: 'Chipotle sauce',
    drink: { name: 'Fruit Juice' },
  },
  {
    id: 'wed',
    short: 'Wed',
    name: 'Wednesday',
    images: {
      lean: { veg: '/images/wed-lean-veg-4.jpg', nonveg: '/images/wed-lean-nonveg-4.jpg' },
      build: { veg: '/images/wed-build-veg-4.jpg', nonveg: '/images/wed-build-nonveg-4.jpg' },
    },
    main: {
      lean: 'Sweet potato pancake, 1',
      build: 'Sweet potato pancake, 3',
    },
    protein: {
      nonveg: { lean: 'Broccoli omelette', build: 'Broccoli omelette' },
      veg: { lean: 'Soya chunks', build: 'Soya chunks' },
    },
    proteinGrams: { nonveg: { lean: 40.4, build: 50.5 }, veg: { lean: 42.5, build: 50.4 } },
    salad: {
      lean: 'Black bean & corn salad',
      build: 'Black bean & corn salad',
    },
    side: { veg: 'Curd', nonveg: 'Curd' },
    sauce: 'Chipotle sauce',
    drink: { name: 'Fermented Pearl Millet Porridge' },
  },
  {
    id: 'thu',
    short: 'Thu',
    name: 'Thursday',
    images: {
      lean: { veg: '/images/thu-lean-veg-4.jpg', nonveg: '/images/thu-lean-nonveg-4.jpg' },
      build: { veg: '/images/thu-build-veg-4.jpg', nonveg: '/images/thu-build-nonveg-4.jpg' },
    },
    main: {
      lean: 'Oats paniyaram, 4',
      build: 'Oats paniyaram, 8',
    },
    protein: {
      nonveg: { lean: 'Boiled eggs', build: 'Boiled eggs' },
      veg: { lean: 'Soya sweet potato cutlet', build: 'Soya sweet potato cutlet' },
    },
    proteinGrams: { nonveg: { lean: 40.7, build: 50.6 }, veg: { lean: 40.3, build: 51.7 } },
    salad: {
      lean: 'Soybean & beetroot salad',
      build: 'Soybean & beetroot salad',
    },
    side: { veg: 'Chutney', nonveg: 'Chutney' },
    sauce: 'Chipotle sauce',
    drink: { name: 'Fermented Finger Millet Porridge' },
  },
  {
    id: 'fri',
    short: 'Fri',
    name: 'Friday',
    images: {
      lean: { veg: '/images/fri-lean-veg-4.jpg', nonveg: '/images/fri-lean-nonveg-4.jpg' },
      build: { veg: '/images/fri-build-veg-4.jpg', nonveg: '/images/fri-build-nonveg-4.jpg' },
    },
    main: { lean: 'Ragi idiyappam, 2', build: 'Ragi idiyappam, 6' },
    protein: {
      nonveg: { lean: 'Grilled chicken', build: 'Grilled chicken' },
      veg: { lean: 'Spinach paneer', build: 'Spinach paneer' },
    },
    proteinGrams: { nonveg: { lean: 41.1, build: 50.5 }, veg: { lean: 40.6, build: 50.3 } },
    salad: {
      lean: 'Sprout & sweet potato salad',
      build: 'Sprout & sweet potato salad',
    },
    side: { veg: 'Coconut milk', nonveg: 'Coconut milk' },
    sauce: 'Chipotle sauce',
    drink: { name: 'Buttermilk' },
  },
]

export interface Compartment {
  label: string
  items: string[]
}

export function photoFor(day: DayMenu, size: Size, diet: Diet): string {
  return `${day.images[size][diet]}?v=15`
}

export function compartmentsFor(day: DayMenu, size: Size, diet: Diet): Compartment[] {
  return [
    { label: 'Main', items: [day.main[size]] },
    { label: 'Side', items: [day.side[diet]] },
    { label: 'Protein', items: [day.protein[diet][size]] },
    { label: 'Sauce', items: [day.sauce] },
    { label: 'Salad', items: [day.salad[size]] },
  ]
}

export function planTotal(size: Size, plan: PlanId): number {
  return salePricePerDay(size) * PLANS[plan].days
}

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
