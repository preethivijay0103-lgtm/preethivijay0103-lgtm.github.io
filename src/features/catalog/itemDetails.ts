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

function recipeBuild(size: Size): boolean {
  return size === 'elite'
}

function grams(line: RecipeLine, size: Size): number {
  return recipeBuild(size) ? line.buildG : line.leanG
}

function highlightChips(line: string): IngredientChip[] {
  return line
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((name) => ({ name, amount: '' }))
}

function recipeCompartment(compartment: string): string {
  return compartment === 'Main + Side' ? 'Main' : compartment
}

function dishCopy(day: DayMenu, diet: Diet, compartment: string) {
  const key = recipeCompartment(compartment)
  if (key === 'Main') return day.main
  if (key === 'Salad') return day.salad
  if (key === 'Drink') return day.drink
  if (key === 'Sauce') return day.sauce
  if (key === 'Protein') return day.protein[diet]
  return undefined
}

export function factsFor(day: DayMenu, size: Size, diet: Diet, compartment: string): ItemFacts | undefined {
  const copy = dishCopy(day, diet, compartment)
  const mapped = recipeCompartment(compartment)
  const recipeKey = MENU_RECIPE[`${day.id}:${mapped}:${diet}`] ?? MENU_RECIPE[`${day.id}:${mapped}:any`]
  const recipe = recipeKey ? RECIPE_ITEMS[recipeKey] : undefined
  if (!copy && !recipe) return undefined

  const mlLines = recipe?.lines.filter((line) => line.unit === 'ml') ?? []
  const millilitres = mlLines.length ? Math.round(mlLines.reduce((sum, line) => sum + grams(line, size), 0)) : undefined

  return {
    ingredients: copy ? highlightChips(copy.highlights) : [],
    proteinGrams: recipeBuild(size) ? (recipe?.buildProtein ?? 0) : (recipe?.leanProtein ?? 0),
    kcal: recipeBuild(size) ? (recipe?.buildKcal ?? 0) : (recipe?.leanKcal ?? 0),
    millilitres: mapped === 'Drink' ? millilitres : undefined,
    showGrams: false,
  }
}
