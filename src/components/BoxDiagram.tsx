import { ChevronDown, Dumbbell, Drumstick, Flame, GlassWater, Heart, Layers, Salad, Soup } from 'lucide-react'
import { useState, type ComponentType } from 'react'
import { compartmentsFor } from '../features/catalog/data'
import { factsFor } from '../features/catalog/itemDetails'
import type { DayMenu, Diet, Size } from '../features/catalog/data'
import type { ItemFacts } from '../features/catalog/itemDetails'

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Main: Layers,
  'Main + Side': Layers,
  Side: Soup,
  Protein: Drumstick,
  Sauce: Soup,
  Salad: Salad,
  Drink: GlassWater,
}

export function BoxDiagram({ day, size, diet }: { day: DayMenu; size: Size; diet: Diet }) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  const rows = compartmentsFor(day, size, diet).map((part) => {
    const facts = factsFor(day, size, diet, part.label)
    const name = part.items.join(', ')
    return {
      key: part.label,
      label: part.label.toUpperCase(),
      value: part.label === 'Drink' && facts?.millilitres ? `${name}, ${facts.millilitres} ml` : name,
      highlights: part.highlights,
      highlight: part.label === 'Main + Side',
      facts,
    }
  })

  return (
    <div className="divide-y divide-[#eadfd9]" aria-label="What is in the box">
      {rows.map((row) => (
        <MenuRow
          key={row.key}
          label={row.label}
          value={row.value}
          highlights={row.highlights}
          highlight={row.highlight}
          iconKey={row.key}
          facts={row.facts}
          open={openKey === row.key}
          onToggle={() => setOpenKey((current) => (current === row.key ? null : row.key))}
        />
      ))}
    </div>
  )
}

function MenuRow({
  label,
  value,
  highlights,
  iconKey,
  highlight,
  facts,
  open,
  onToggle,
}: {
  label: string
  value: string
  highlights: string
  iconKey: string
  highlight: boolean
  facts?: ItemFacts
  open: boolean
  onToggle: () => void
}) {
  const Icon = ICONS[iconKey] ?? Layers

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left md:min-h-16 md:gap-4 md:px-5 md:py-3"
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#c7ec16]/45 text-leaf-900 md:h-11 md:w-11">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-[0.12em] text-leaf-900/55 uppercase">{label}</p>
          <p className={`mt-0.5 leading-tight text-leaf-900 ${highlight ? 'text-lg font-bold' : 'text-base font-semibold'}`}>
            {value}
          </p>
          {!open ? (
            <p className="mt-1 text-xs font-semibold text-leaf-900/55">Tap for protein & kcal</p>
          ) : null}
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-leaf-900 ring-1 ring-[#eadfd9]" aria-hidden>
          <ChevronDown size={20} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (facts || highlights) && (
        <div className="px-3 pb-3 md:px-5">
          <div className="rounded-2xl bg-white px-3.5 py-3.5 ring-1 ring-[#eadfd9]">
            {facts ? (
              <p className="flex items-end justify-between gap-3 text-leaf-900">
                <span className="flex items-baseline gap-1.5">
                  <Dumbbell size={16} className="mb-0.5 shrink-0 text-leaf-900" />
                  <span className="font-display text-[1.65rem] leading-none font-black">
                    {facts.proteinGrams.toFixed(facts.proteinGrams % 1 === 0 ? 0 : 1)} g
                  </span>
                  <span className="text-sm font-semibold">in this</span>
                </span>
                <span className="flex items-baseline gap-1 text-base font-bold">
                  <Flame size={14} className="text-leaf-900" />
                  ~{Math.round(facts.kcal)} kcal
                  {facts.millilitres ? <span className="font-semibold text-leaf-900/55"> · {facts.millilitres} ml</span> : null}
                </span>
              </p>
            ) : null}

            <p className="mt-3 flex items-center gap-1 text-[11px] font-medium text-leaf-900/55">
              <Heart size={11} className="fill-[#c7ec16] text-leaf-900" />
              Made with love, health and care
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {facts?.ingredients?.length
                ? facts.ingredients.map((item, index) => (
                    <span
                      key={`${item.name}-${index}`}
                      className="rounded-full bg-[#fbf6ee] px-2 py-0.5 text-[11px] font-medium text-leaf-900/80"
                    >
                      {item.name}
                    </span>
                  ))
                : highlights
                    .split('·')
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item) => (
                      <span key={item} className="rounded-full bg-[#fbf6ee] px-2 py-0.5 text-[11px] font-medium text-leaf-900/80">
                        {item}
                      </span>
                    ))}
            </div>
            <p className="mt-2.5 text-[11px] leading-5 text-leaf-900/40">
              Cooked fresh every morning. Estimated from our recipe, not a lab test.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
