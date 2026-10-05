import type { DayMenu, Diet, Size } from './data'
import { MENU_RECIPE, RECIPE_ITEMS } from './recipesSheet'
import type { RecipeLine } from './recipesSheet'

export type IngredientChip = { name: string; amount: string }

export interface ItemFacts {
  ingredients: IngredientChip[]
  proteinGrams: number
  kcal: number
  millilitres?: number
  showGrams: boolean
}

const KITCHEN_MAINS: Partial<Record<DayMenu['id'], string[]>> = {
  mon: ['Black chana', 'Green gram', 'Pearl millet', 'Toor dal', 'Urad dal'],
  tue: [
    'Millet',
    'Curry leaves',
    'Onion',
    'Tomato',
    'Potato',
    'Carrot',
    'Peas',
    'Green chillies',
    'Ginger-garlic paste',
    'Salt',
    'Groundnut',
    'Toor dal',
    'Moong dal',
  ],
  thu: [
    'Oats',
    'Curd',
    'Salt',
    'Green chillies',
    'Coriander',
    'Curry leaves',
    'Dal',
    'Jeera',
    'Carrot',
    'Onion',
    'Corn',
    'Capsicum',
  ],
}

const NOT_MAIN =
  /salt|sesame oil|\boil\b|curry leaves|ginger|garlic|chilli|chili|onion|peanut|spices|cumin|coriander|garam masala|turmeric|soy sauce|cinnamon|black pepper|cloves|bay leaf|lemon|baking soda/i

function isMainIngredient(name: string): boolean {
  return !NOT_MAIN.test(name)
}

function displayName(name: string): string {
  return name
    .replace(/, dry$/i, '')
    .replace(/, raw$/i, '')
    .replace(/, rolled$/i, '')
    .replace(/ \(thinai\)/i, '')
    .replace(/ \(red kidney beans\)/i, '')
    .replace(/, whole$/i, '')
    .trim()
}

function grams(line: RecipeLine, size: Size): number {
  return size === 'lean' ? line.leanG : line.buildG
}

function sliceForSide(dayId: DayMenu['id'], compartment: string, lines: RecipeLine[]): RecipeLine[] | null {
  if (compartment !== 'Side') return null
  if (dayId === 'wed') return lines.filter((line) => line.name === 'Curd')
  if (dayId === 'thu') {
    const soda = lines.findIndex((line) => line.name === 'Baking soda')
    return soda >= 0 ? lines.slice(soda + 1) : lines
  }
  return null
}

function extraBuildEgg(day: DayMenu, diet: Diet, compartment: string, size: Size): RecipeLine[] {
  if (day.id !== 'mon' || diet !== 'nonveg' || compartment !== 'Protein' || size !== 'build') return []
  const tuna = RECIPE_ITEMS['Mon::Tuna + boiled egg']
  const egg = tuna?.lines.find((line) => /egg/i.test(line.name))
  return egg ? [egg] : []
}

export function factsFor(day: DayMenu, size: Size, diet: Diet, compartment: string): ItemFacts | undefined {
  const recipeKey = MENU_RECIPE[`${day.id}:${compartment}:${diet}`] ?? MENU_RECIPE[`${day.id}:${compartment}:any`]

  const kitchen = compartment === 'Main' ? KITCHEN_MAINS[day.id] : undefined
  if (kitchen) {
    const recipe = recipeKey ? RECIPE_ITEMS[recipeKey] : undefined
    return {
      ingredients: kitchen.map((name) => ({ name, amount: '' })),
      proteinGrams: size === 'lean' ? (recipe?.leanProtein ?? 0) : (recipe?.buildProtein ?? 0),
      kcal: size === 'lean' ? (recipe?.leanKcal ?? 0) : (recipe?.buildKcal ?? 0),
      millilitres: undefined,
      showGrams: false,
    }
  }

  if (compartment === 'Sauce') {
    const sauce = RECIPE_ITEMS['All::Hung curd sauce (every pack)']
    return {
      ingredients: [
        { name: 'Chipotle', amount: '' },
        { name: 'Tomato', amount: '' },
      ],
      proteinGrams: sauce?.leanProtein ?? 0.5,
      kcal: sauce?.leanKcal ?? 9,
      millilitres: undefined,
      showGrams: false,
    }
  }

  if (!recipeKey) return undefined
  const recipe = RECIPE_ITEMS[recipeKey]
  if (!recipe) return undefined

  const sliced = sliceForSide(day.id, compartment, recipe.lines)
  const lines = [...(sliced ?? recipe.lines), ...extraBuildEgg(day, diet, compartment, size)].filter(
    (line) => isMainIngredient(line.name) && grams(line, size) > 0,
  )

  const showGrams = compartment === 'Salad' || compartment === 'Protein'
  const mlLines = (sliced ?? recipe.lines).filter((line) => line.unit === 'ml')
  const millilitres = mlLines.length ? Math.round(mlLines.reduce((sum, line) => sum + grams(line, size), 0)) : undefined

  return {
    ingredients: lines.map((line) => {
      const amount = grams(line, size)
      const shown = Number.isInteger(amount) ? String(amount) : amount.toFixed(1)
      return { name: displayName(line.name), amount: `${shown} ${line.unit}` }
    }),
    proteinGrams: size === 'lean' ? recipe.leanProtein : recipe.buildProtein,
    kcal: size === 'lean' ? recipe.leanKcal : recipe.buildKcal,
    millilitres: compartment === 'Drink' ? millilitres : undefined,
    showGrams,
  }
}
