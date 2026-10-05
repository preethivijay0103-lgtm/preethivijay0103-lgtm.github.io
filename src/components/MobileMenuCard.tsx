import { Dumbbell, Drumstick, GlassWater, Layers, Leaf, Salad, Soup } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { compartmentsFor, photoFor } from '../features/catalog/data'
import type { DayMenu, Diet, Size } from '../features/catalog/data'

export function MobileMenuCard({ day, size, diet }: { day: DayMenu; size: Size; diet: Diet }) {
  const photo = photoFor(day, size, diet)
  const protein = Math.round(day.proteinGrams[diet][size])
  const rows: { label: string; name: string; icon: LucideIcon }[] = [
    ...compartmentsFor(day, size, diet).map((part) => ({
      label: part.label,
      name: part.items.join(', '),
      icon: iconFor(part.label, diet),
    })),
    { label: 'Drink', name: day.drink.name, icon: GlassWater },
  ]

  return (
    <article id={`${day.id}-mobile`} className="scroll-mt-40 overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5">
      <img src={photo} alt={`${day.name} ${size} breakfast box`} className="h-60 w-full bg-[#f4f1ea] object-contain" />
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-display text-3xl font-bold text-leaf-900">{day.name}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-stone-600">
          <Dumbbell size={16} className="text-leaf-700" aria-hidden />
          <span>{protein} g protein</span>
        </p>
        <ul className="mt-3">
          {rows.map((row) => {
            const Icon = row.icon
            const featured = row.label === 'Main'
            return (
              <li
                key={row.label}
                className={`flex items-center gap-3 ${
                  featured ? 'rounded-2xl bg-[#f6eef4] px-3 py-3' : 'border-b border-stone-100 px-3 py-3 last:border-b-0'
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-leaf-800 ring-1 ring-leaf-900/10">
                  <Icon size={18} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.16em] text-stone-400 uppercase">{row.label}</p>
                  <p className={`leading-snug font-semibold text-leaf-900 ${featured ? 'text-lg' : 'text-base'}`}>{row.name}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}

function iconFor(label: string, diet: Diet): LucideIcon {
  if (label === 'Salad') return Salad
  if (label === 'Protein') return diet === 'nonveg' ? Drumstick : Leaf
  if (label === 'Side') return Soup
  return Layers
}
