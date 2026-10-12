import { ChevronDown, Dumbbell, Drumstick, Flame, GlassWater, Layers, Leaf, Salad, Soup } from 'lucide-react'
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
    <div className="divide-y divide-[#eee5e1]" aria-label="What is in the box">
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
    <div className={highlight ? 'bg-[#fcf1f6]' : 'bg-white'}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left md:min-h-16 md:gap-4 md:px-5 md:py-3"
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#faeaf1] text-[#6b245f] md:h-11 md:w-11">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-[0.12em] text-[#6b245f] uppercase">{label}</p>
          <p className={`mt-0.5 leading-tight text-[#54104d] ${highlight ? 'text-lg font-bold' : 'text-base font-semibold'}`}>
            {value}
          </p>
          {highlights ? <p className="mt-1 text-xs leading-5 text-[#8a6278]">{highlights}</p> : null}
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#8a4a7c]">
            Protein & kcal
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#54104d] ring-1 ring-[#eadfd9]" aria-hidden>
          <ChevronDown size={20} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && facts && (
        <div className="px-3 pb-3 md:px-5">
          <div className="rounded-2xl bg-[#fff8f4] px-4 py-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#b0899c] uppercase">
              <Leaf size={12} />
              What&apos;s inside
            </p>
            <div className="mt-2 flex flex-wrap items-center text-[12px] font-medium leading-5 text-[#8a6278]">
              {facts.ingredients.map((item, index) => (
                <span key={`${item.name}-${index}`} className="inline-flex items-center">
                  {index > 0 ? <span className="mx-2 text-[#e2c9d4]" aria-hidden>
                    |
                  </span> : null}
                  <span>
                    {item.name}
                    {facts.showGrams && item.amount ? (
                      <span className="ml-1 text-[11px] font-semibold text-[#6b245f]">{item.amount}</span>
                    ) : null}
                  </span>
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-[#54104d]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#faeaf1] text-[#6b245f]">
                  <Dumbbell size={16} />
                </span>
                {facts.proteinGrams.toFixed(facts.proteinGrams % 1 === 0 ? 0 : 1)} g protein
              </span>
              <span className="hidden h-5 w-px bg-[#ead3c8] sm:block" aria-hidden />
              <span className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-[#54104d]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#faeaf1] text-[#c45c2a]">
                  <Flame size={16} />
                </span>
                ~{Math.round(facts.kcal)} kcal
              </span>
              {facts.millilitres ? (
                <>
                  <span className="hidden h-5 w-px bg-[#ead3c8] sm:block" aria-hidden />
                  <span className="text-base font-bold text-[#54104d]">{facts.millilitres} ml</span>
                </>
              ) : null}
            </div>
            <p className="mt-2 text-[11px] leading-4 text-[#c4a3b2]">Estimated from our recipe, not a lab test.</p>
          </div>
        </div>
      )}
    </div>
  )
}
