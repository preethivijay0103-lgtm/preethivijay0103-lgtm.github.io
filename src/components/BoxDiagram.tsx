import { GlassWater } from 'lucide-react'
import { compartmentsFor } from '../features/catalog/data'
import type { DayMenu, Diet, Size } from '../features/catalog/data'

export function BoxDiagram({ day, size, diet }: { day: DayMenu; size: Size; diet: Diet }) {
  const compartments = compartmentsFor(day, size, diet)
  const grid =
    size === 'lean' ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2 grid-rows-2 [&>*:first-child]:row-span-2'

  return (
    <div className="flex items-stretch gap-3">
      <div
        className={`grid flex-1 gap-2 rounded-2xl bg-stone-100 p-2 ring-1 ring-stone-200 ${grid}`}
        aria-label={`${compartments.length}-compartment box`}
      >
        {compartments.map((compartment, index) => (
          <div key={compartment.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-spice-800">
              {index + 1}. {compartment.label}
            </p>
            <ul className="mt-1 space-y-0.5 text-sm text-ink">
              {compartment.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-leaf-50 p-2 text-center ring-1 ring-leaf-900/10">
        <GlassWater className="text-leaf-700" size={26} />
        <p className="mt-1 text-xs font-semibold leading-tight text-leaf-900">{day.drink.name}</p>
        <p className="text-xs text-stone-500">{day.drink.ml[size]} ml</p>
      </div>
    </div>
  )
}
