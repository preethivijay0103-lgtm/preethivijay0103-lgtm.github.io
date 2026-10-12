export type Size = 'core' | 'strong' | 'elite'
export type PhotoSize = 'lean' | 'build'
export type Diet = 'veg' | 'nonveg'

export interface DishCopy {
  name: string
  kitchen: string
  highlights: string
}

function dish(name: string, kitchen: string, highlights: string): DishCopy {
  return { name, kitchen, highlights }
}

export interface DayMenu {
  id: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  short: string
  name: string
  images: Record<PhotoSize, Record<Diet, string>>
  main: DishCopy
  salad: DishCopy
  drink: DishCopy
  sauce: DishCopy
  protein: Record<Diet, DishCopy>
}

export const SIZES: Record<Size, { label: string; blurb: string; compartments: number; proteinGrams: number }> = {
  core: {
    label: 'Core',
    blurb: 'About 30 g protein. A lighter box for everyday mornings.',
    compartments: 4,
    proteinGrams: 30,
  },
  strong: {
    label: 'Strong',
    blurb: 'About 40 g protein. A balanced box for training days.',
    compartments: 4,
    proteinGrams: 40,
  },
  elite: {
    label: 'Elite',
    blurb: 'About 50 g protein. A fuller box when you need more.',
    compartments: 4,
    proteinGrams: 50,
  },
}

export const DIETS: Record<Diet, { label: string }> = {
  veg: { label: 'Veg' },
  nonveg: { label: 'Non-veg' },
}

export const PRICE_PER_DAY: Record<Size, number> = { core: 159, strong: 189, elite: 229 }

/** First-month launch: Core 25% off, Strong and Elite 30% off. Add-on items stay full price. */
export const LAUNCH_OFF_PERCENT: Record<Size, number> = { core: 25, strong: 30, elite: 30 }

export function salePricePerDay(size: Size): number {
  return Math.round((PRICE_PER_DAY[size] * (100 - LAUNCH_OFF_PERCENT[size])) / 100)
}

export type DrinkId = 'day' | 'buttermilk' | 'juice' | 'kanji' | 'shake' | 'smoothie'

export const DRINKS: Record<DrinkId, { label: string; note: string }> = {
  day: {
    label: "Follow the day's drink",
    note: 'Mon fermented rice, Tue watermelon cooler, Wed fermented pearl millet, Thu fermented finger millet, Fri spiced buttermilk.',
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

export type PlanId = 'trial' | 'week' | 'custom'

export const PLANS: Record<PlanId, { label: string; days: number; note: string }> = {
  trial: { label: '3-day trial', days: 3, note: 'Try it for three mornings first.' },
  week: { label: '5-day week', days: 5, note: 'Monday to Friday, one full box each morning.' },
  custom: { label: 'Custom', days: 0, note: 'Pick days and items — Monday protein only, if you want.' },
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
    main: dish(
      'Multigrain Dosa + Peanut Chutney',
      'Multigrain dosa + peanut chutney',
      'Black chickpeas · Green moong · Pearl millet · Toor & urad dal · Roasted peanut chutney',
    ),
    salad: dish(
      'Black Chickpea & Peanut Salad',
      'Kala chana & peanut salad',
      'Black chickpeas · Roasted peanuts · Cucumber · Carrot · Tomato · Lime',
    ),
    drink: dish(
      'Fermented Rice',
      'Pazhaya sadam kanji',
      'Overnight-fermented rice · Buttermilk · Shallots · Naturally probiotic',
    ),
    sauce: dish(
      'Roasted Pepper Yogurt Dip',
      'Hung curd sauce',
      'Hung curd · Roasted red bell pepper · Honey · Thyme',
    ),
    protein: {
      nonveg: dish(
        'Black Pepper Chicken',
        'Pepper chicken',
        'Chicken breast · Crushed black pepper · Curry leaves · Ginger-garlic · Lime',
      ),
      veg: dish(
        'Palak Paneer + Rajma',
        'Palak paneer + rajma',
        'Paneer · Spinach · Rajma · Garlic · Tomato',
      ),
    },
  },
  {
    id: 'tue',
    short: 'Tue',
    name: 'Tuesday',
    images: {
      lean: { veg: '/images/tue-lean-veg-4.jpg', nonveg: '/images/tue-lean-nonveg-4.jpg' },
      build: { veg: '/images/tue-build-veg-4.jpg', nonveg: '/images/tue-build-nonveg-4.jpg' },
    },
    main: dish(
      'Foxtail Millet Upma + Coconut Chutney',
      'Millet upma + coconut chutney',
      'Foxtail millet · Toor & moong dal · Green peas · Carrot · Fresh coconut chutney',
    ),
    salad: dish(
      'Sprouts & Kidney Bean Salad',
      'Sprout & rajma salad',
      '8-legume sprouts · Rajma · Cabbage · Capsicum · Lime',
    ),
    drink: dish(
      'Watermelon Cooler',
      'Watermelon cooler',
      'Fresh watermelon · No added sugar',
    ),
    sauce: dish(
      'Chickpea Sauce',
      'Chickpea sauce (low fat)',
      'Chickpeas · Hung curd · Lemon · Roasted cumin · No oil',
    ),
    protein: {
      nonveg: dish(
        'Chicken Tikka',
        'Chicken tikka',
        'Chicken breast · Tikka spices · Ginger-garlic · Lime · Onion & tomato',
      ),
      veg: dish(
        'Paneer Tikka + Bean & Sprout Chaat',
        'Paneer tikka + rajma-sprout chaat',
        'Paneer · Tikka spices · Rajma · Sprouts · Lime',
      ),
    },
  },
  {
    id: 'wed',
    short: 'Wed',
    name: 'Wednesday',
    images: {
      lean: { veg: '/images/wed-lean-veg-4.jpg', nonveg: '/images/wed-lean-nonveg-4.jpg' },
      build: { veg: '/images/wed-build-veg-4.jpg', nonveg: '/images/wed-build-nonveg-4.jpg' },
    },
    main: dish(
      'Sweet Potato Pancakes with Thick Yogurt',
      'Sweet potato pancake + hung curd',
      'Sweet potato · Chickpea flour (besan) · Thick hung curd · Green chilli',
    ),
    salad: dish(
      'Black Bean & Corn Salad',
      'Black bean & corn salad',
      'Black beans · Sweet corn · Capsicum · Tomato · Lime',
    ),
    drink: dish(
      'Fermented Pearl Millet',
      'Kambu kanji',
      'Pearl millet (kambu) · Buttermilk · Shallots · Naturally probiotic',
    ),
    sauce: dish(
      'Roasted Red Pepper Sauce',
      'Red bell pepper sauce',
      'Fire-roasted red peppers · Garlic · Lemon · Chilli flakes',
    ),
    protein: {
      nonveg: dish(
        'Broccoli Omelette + Herb & Lemon Chicken Bites',
        'Broccoli omelette + chicken herb & lemon bites',
        'Whole egg · Broccoli · Chicken breast · Lemon · Coriander · Black pepper',
      ),
      veg: dish(
        'Spiced Soy Chunks',
        'Soya chunks masala',
        'Soy chunks · Onion-tomato masala · Ginger-garlic · Lime',
      ),
    },
  },
  {
    id: 'thu',
    short: 'Thu',
    name: 'Thursday',
    images: {
      lean: { veg: '/images/thu-lean-veg-4.jpg', nonveg: '/images/thu-lean-nonveg-4.jpg' },
      build: { veg: '/images/thu-build-veg-4.jpg', nonveg: '/images/thu-build-nonveg-4.jpg' },
    },
    main: dish(
      'Oats Paddu + Chutney',
      'Oats paddu + chutney',
      'Rolled oats · Curd · Sweet corn · Carrot · Capsicum · Onion-tomato chutney',
    ),
    salad: dish(
      'Soybean & Beetroot Salad',
      'Soybean & beetroot salad',
      'Soybeans · Beetroot · Carrot · Cucumber · Lime',
    ),
    drink: dish(
      'Fermented Finger Millet',
      'Ragi koozh',
      'Ragi (finger millet) · Buttermilk · Shallots · Naturally probiotic',
    ),
    sauce: dish(
      'Chickpea Sauce',
      'Chickpea sauce (low fat)',
      'Chickpeas · Hung curd · Lemon · Roasted cumin · No oil',
    ),
    protein: {
      nonveg: dish(
        'Boiled Egg Salad + Chicken Garlic & Curd Roast',
        'Boiled egg salad + chicken garlic & curd roast',
        'Boiled egg · Chicken breast · Garlic · Curd · Lemon · Black pepper',
      ),
      veg: dish(
        'Soy & Sweet Potato Cutlet',
        'Soya sweet potato cutlet',
        'Soy granules · Sweet potato · Chickpea flour · Ginger · Coriander',
      ),
    },
  },
  {
    id: 'fri',
    short: 'Fri',
    name: 'Friday',
    images: {
      lean: { veg: '/images/fri-lean-veg-4.jpg', nonveg: '/images/fri-lean-nonveg-4.jpg' },
      build: { veg: '/images/fri-build-veg-4.jpg', nonveg: '/images/fri-build-nonveg-4.jpg' },
    },
    main: dish(
      'Ragi Idiyappam + Coconut Milk',
      'Ragi idiyappam + coconut milk',
      'Ragi (finger millet) · Steamed, not fried · Fresh coconut milk',
    ),
    salad: dish(
      'Sprouts & Sweet Potato Salad',
      'Sprout & sweet potato salad',
      '8-legume sprouts · Sweet potato · Cucumber · Carrot · Lime',
    ),
    drink: dish(
      'Spiced Buttermilk',
      'Buttermilk (mor)',
      'Fresh curd · Ginger · Curry leaves',
    ),
    sauce: dish(
      'Roasted Pepper Yogurt Dip',
      'Hung curd sauce',
      'Hung curd · Roasted red bell pepper · Honey · Thyme',
    ),
    protein: {
      nonveg: dish(
        'Spiced Grilled Chicken',
        'Grilled chicken',
        'Chicken breast · Cinnamon, cloves & bay leaf · Black pepper · Cumin · Lemon',
      ),
      veg: dish(
        'Spinach Paneer with Soy Mince',
        'Spinach paneer + soy granules',
        'Paneer · Spinach · Soy granules · Whole spices · Lemon',
      ),
    },
  },
]

export interface Compartment {
  label: string
  items: string[]
  highlights: string
}

export function photoKey(size: Size): PhotoSize {
  return size === 'elite' ? 'build' : 'lean'
}

export function photoFor(day: DayMenu, size: Size, diet: Diet): string {
  return `${day.images[photoKey(size)][diet]}?v=15`
}

export function compartmentsFor(day: DayMenu, size: Size, diet: Diet): Compartment[] {
  void size
  return [
    { label: 'Main + Side', items: [day.main.name], highlights: day.main.highlights },
    { label: 'Protein', items: [day.protein[diet].name], highlights: day.protein[diet].highlights },
    { label: 'Sauce', items: [day.sauce.name], highlights: day.sauce.highlights },
    { label: 'Salad', items: [day.salad.name], highlights: day.salad.highlights },
    { label: 'Drink', items: [day.drink.name], highlights: day.drink.highlights },
  ]
}

export function planTotal(size: Size, plan: PlanId): number {
  if (plan === 'custom') return 0
  return salePricePerDay(size) * PLANS[plan].days
}

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
