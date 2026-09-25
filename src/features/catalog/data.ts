export type Size = 'lean' | 'build'
export type Diet = 'veg' | 'nonveg'

type BySize = Record<Size, string>

export interface DayMenu {
  id: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  short: string
  name: string
  image: string
  main: BySize
  cup?: string
  protein: Record<Diet, BySize>
  side: BySize
  salad: BySize
  drink: { name: string; ml: Record<Size, number> }
}

export const SIZES: Record<Size, { label: string; blurb: string; compartments: number }> = {
  lean: {
    label: 'Lean',
    blurb: 'Lighter portions for cutting or staying trim.',
    compartments: 4,
  },
  build: {
    label: 'Build',
    blurb: 'Bigger portions and more protein for gaining muscle.',
    compartments: 3,
  },
}

export const DIETS: Record<Diet, { label: string }> = {
  veg: { label: 'Veg' },
  nonveg: { label: 'Non-veg' },
}

export const PRICE_PER_DAY: Record<Size, number> = { lean: 129, build: 159 }

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
    image: '/images/mon.jpg',
    main: { lean: 'Sprout dosa, 2', build: 'Sprout dosa, 3' },
    cup: 'Ginger chutney',
    protein: {
      nonveg: { lean: 'Egg, cooked flat on the tawa, 1', build: 'Egg, cooked flat on the tawa, 2' },
      veg: { lean: 'Paneer tikka, 50 g', build: 'Paneer tikka, 80 g' },
    },
    side: { lean: 'Badam laddu', build: 'Badam laddu' },
    salad: { lean: 'Carrot and cucumber sticks', build: 'Carrot and cucumber' },
    drink: { name: 'Buttermilk', ml: { lean: 200, build: 200 } },
  },
  {
    id: 'tue',
    short: 'Tue',
    name: 'Tuesday',
    image: '/images/tue.jpg',
    main: { lean: 'Paddu, 5', build: 'Paddu, 8' },
    cup: 'Ginger chutney',
    protein: {
      nonveg: { lean: 'Grilled chicken, 75 g', build: 'Grilled chicken, 110 g' },
      veg: { lean: 'Sprouts chaat, ¾ cup', build: 'Sprouts chaat, 1¼ cups' },
    },
    side: { lean: 'Whole fruit, cut', build: 'Whole fruit, cut' },
    salad: { lean: 'Kachumber: onion, tomato, cucumber', build: 'Kachumber' },
    drink: { name: 'Fruit juice', ml: { lean: 150, build: 150 } },
  },
  {
    id: 'wed',
    short: 'Wed',
    name: 'Wednesday',
    image: '/images/wed.jpg',
    main: { lean: 'Ragi idiyappam, 3', build: 'Ragi idiyappam, 5' },
    protein: {
      nonveg: { lean: 'Moringa with egg, 1 egg', build: 'Moringa with egg, 2 eggs' },
      veg: { lean: 'Paneer pepper fry, 50 g', build: 'Paneer pepper fry, 80 g' },
    },
    side: { lean: 'Bottle gourd cutlet, 1', build: 'Bottle gourd cutlet, 2' },
    salad: { lean: 'Cucumber slices', build: 'Cucumber slices' },
    drink: { name: 'Millet kanji', ml: { lean: 200, build: 250 } },
  },
  {
    id: 'thu',
    short: 'Thu',
    name: 'Thursday',
    image: '/images/thu.jpg',
    main: { lean: 'Moong dal dosa, 2', build: 'Moong dal dosa, 3' },
    cup: 'Curd or ginger chutney',
    protein: {
      nonveg: { lean: 'Broccoli omelette, 2 eggs', build: 'Broccoli omelette, 3 eggs' },
      veg: { lean: 'Peanut or chana sundal, ½ cup', build: 'Peanut or chana sundal, ¾ cup' },
    },
    side: { lean: 'Sesame laddu', build: 'Sesame laddu' },
    salad: { lean: 'Beetroot and carrot, grated', build: 'Beetroot and carrot' },
    drink: { name: 'Peanut-badam shake', ml: { lean: 200, build: 250 } },
  },
  {
    id: 'fri',
    short: 'Fri',
    name: 'Friday',
    image: '/images/fri.jpg',
    main: { lean: 'Millet upma, 1 cup', build: 'Millet upma, 1½ cups' },
    protein: {
      nonveg: {
        lean: 'Grilled chicken, 75 g (fish after week 2)',
        build: 'Grilled chicken, 110 g (fish after week 2)',
      },
      veg: { lean: 'Soy pepper, 25 g dry', build: 'Soy pepper, 40 g dry' },
    },
    side: { lean: 'Fruit salad, ½ cup', build: 'Fruit salad, ¾ cup' },
    salad: { lean: 'Cucumber and carrot sticks', build: 'Cucumber and carrot' },
    drink: { name: 'Fruit smoothie', ml: { lean: 200, build: 250 } },
  },
]

export interface Compartment {
  label: string
  items: string[]
}

// Lean has 4 compartments; Build has 3, with the salad packed beside the protein.
export function compartmentsFor(day: DayMenu, size: Size, diet: Diet): Compartment[] {
  const main = day.cup ? [day.main[size], `${day.cup} (lidded cup)`] : [day.main[size]]
  const protein = day.protein[diet][size]
  if (size === 'lean') {
    return [
      { label: 'Main', items: main },
      { label: 'Protein', items: [protein] },
      { label: 'Side', items: [day.side.lean] },
      { label: 'Salad', items: [day.salad.lean] },
    ]
  }
  return [
    { label: 'Main', items: main },
    { label: 'Protein + salad', items: [protein, day.salad.build] },
    { label: 'Side', items: [day.side.build] },
  ]
}

export function planTotal(size: Size, plan: PlanId): number {
  return PRICE_PER_DAY[size] * PLANS[plan].days
}

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
