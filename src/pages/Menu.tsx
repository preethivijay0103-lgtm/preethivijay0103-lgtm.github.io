import { Info, MoveRight, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

import { TabTransition } from '../components/TabTransition'
import { CUSTOMIZATION_ENABLED } from '../config/customization'
import { BoxDiagram } from '../components/BoxDiagram'
import { SLOT_LABEL, SLOTS, addonFor, type Slot } from '../features/catalog/addons'
import { DIETS, SIZES, WEEK, formatRupees, photoFor } from '../features/catalog/data'
import type { DayMenu, Diet, Size } from '../features/catalog/data'
import { customTotals, emptyPicks, togglePick, type CustomPicks } from '../features/order/custom'
import { saveMenuDraft } from '../features/order/storage'
import { MenuWeekContextBar } from '../components/MenuWeekContextBar'
import { HomeSizePicker } from '../components/SizePickCard'
import { isMenuWeekOpen, parseMenuDiet, parseMenuSize } from '../features/menu/weekParams'
import { ButtonLink, Section, Toggle } from '../ui'

type ViewMode = 'box' | 'custom'


function DayTitleRow({
  dayName,
  proteinGrams,
  titleClassName = 'font-serif text-[1.65rem] leading-none font-bold tracking-tight text-leaf-900 sm:text-2xl',
  suffix = '',
}: {
  dayName: string
  proteinGrams: number
  titleClassName?: string
  suffix?: string
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 sm:gap-2.5">
      <h2 className={titleClassName}>{dayName}</h2>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-leaf-900 shadow-[0_4px_14px_rgba(74,29,72,0.12)] ring-1 ring-black/5 sm:px-3.5 sm:py-2 sm:text-base">
        <Zap size={14} className="shrink-0 text-[#c7ec16]" fill="currentColor" aria-hidden />
        <span>
          {proteinGrams} g protein{suffix}
        </span>
      </span>
    </div>
  )
}

function DayCustomPicks({
  day,
  size,
  diet,
  picks,
  onToggle,
}: {
  day: DayMenu
  size: Size
  diet: Diet
  picks: CustomPicks
  onToggle: (dayId: DayMenu['id'], slot: Slot) => void
}) {
  const selected = picks[day.id] ?? []
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {SLOTS.map((slot) => {
        const item = addonFor(day.id, slot, size, diet)
        const on = selected.includes(slot)
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onToggle(day.id, slot)}
            className={`rounded-xl p-3 text-left text-sm ${
              on ? 'bg-[#c7ec16]/30 ring-2 ring-leaf-900' : 'bg-white ring-1 ring-[#eadfd9]'
            }`}
          >
            <p className="font-semibold text-leaf-900">{SLOT_LABEL[slot]}</p>
            <p className="text-leaf-900/60">{item.name}</p>
            <p className="mt-1 text-xs font-semibold text-leaf-900">
              {formatRupees(item.price)} · {item.protein} g protein
            </p>
          </button>
        )
      })}
    </div>
  )
}

function MenuChooseScreen() {
  return (
    <Section className="!px-0 !py-0 md:!py-8">
      <div className="bg-cream pb-24 md:mx-auto md:max-w-lg md:pb-8">
        <HomeSizePicker showDietToggle={false} className="rounded-none bg-transparent" />
      </div>
    </Section>
  )
}

function MenuWeekScreen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const size = parseMenuSize(searchParams.get('size')) ?? 'strong'
  const diet = parseMenuDiet(searchParams.get('diet')) ?? 'nonveg'

  function setDiet(next: Diet) {
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current)
        params.set('diet', next)
        return params
      },
      { replace: true },
    )
  }

  const [view, setView] = useState<ViewMode>(() =>
    CUSTOMIZATION_ENABLED && searchParams.get('view') === 'custom' ? 'custom' : 'box',
  )
  const [picks, setPicks] = useState<CustomPicks>(emptyPicks)

  const { hash } = useLocation()
  const quote = useMemo(
    () => (CUSTOMIZATION_ENABLED ? customTotals(picks, size, diet) : { list: 0, protein: 0 }),
    [picks, size, diet],
  )
  const proteinTarget = SIZES[size].proteinGrams
  const pickerKey = `${diet}-${size}`

  useEffect(() => {
    const id = hash.slice(1)
    if (!WEEK.some((day) => day.id === id)) return
    const targetId = window.matchMedia('(min-width: 768px)').matches ? id : `${id}-mobile`
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  function toggleSlot(dayId: DayMenu['id'], slot: Slot) {
    setPicks((current) => togglePick(current, dayId, slot))
  }

  function goToOrder() {
    if (CUSTOMIZATION_ENABLED) saveMenuDraft({ size, diet, picks })
  }

  const viewToggle = CUSTOMIZATION_ENABLED ? (
    <div className="sticky z-30 border-b border-[#eadfd9] bg-cream/95 px-4 py-2 backdrop-blur-xl md:hidden" style={{ top: 'var(--site-header-offset)' }}>
      <Toggle
        label="View"
        tone="highlight"
        fill
        compact
        className="w-full"
        value={view}
        onChange={setView}
        options={[
          { value: 'box', label: 'Full box' },
          { value: 'custom', label: 'Custom' },
        ]}
      />
    </div>
  ) : null

  return (
    <Section className="!px-0 !py-0 md:!py-12">
      <div className="bg-cream md:hidden">
        <div className="sticky z-30" style={{ top: 'var(--site-header-offset)' }}>
          <MenuWeekContextBar size={size} />
        </div>
        <div className="border-b border-[#eadfd9] bg-cream px-4 py-2.5">
          <Toggle
            label="Diet"
            tone="solid"
            fill
            compact
            className="min-h-9 w-full"
            value={diet}
            onChange={setDiet}
            options={[
              { value: 'nonveg', label: DIETS.nonveg.label },
              { value: 'veg', label: DIETS.veg.label },
            ]}
          />
        </div>
        {viewToggle}

        <TabTransition transitionKey={pickerKey} className="space-y-5 bg-cream pb-[5.5rem]">
          {WEEK.map((day) => {
            const selected = picks[day.id] ?? []
            const dayProtein =
              CUSTOMIZATION_ENABLED && view === 'custom'
                ? Math.round(
                    selected.reduce((sum, slot) => sum + addonFor(day.id, slot, size, diet).protein, 0) * 10,
                  ) / 10
                : proteinTarget
            return (
              <article key={day.id} id={`${day.id}-mobile`} className="scroll-mt-28">
                <div className="mx-4 mt-3 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[#eadfd9]">
                  <img
                    key={`${day.id}-${size}-${diet}`}
                    src={photoFor(day, size, diet)}
                    alt={`${day.name} ${DIETS[diet].label} breakfast`}
                    className="h-[13.5rem] w-full object-cover object-center sm:h-[15rem]"
                  />
                </div>

                <div className="px-4 pt-3">
                  <DayTitleRow
                    dayName={day.name}
                    proteinGrams={dayProtein}
                    suffix={
                      CUSTOMIZATION_ENABLED && view === 'custom' && selected.length === 0 ? ' · tick items' : ''
                    }
                  />
                </div>

                <div className="px-4 pt-3">
                  {CUSTOMIZATION_ENABLED && view === 'custom' ? (
                    <DayCustomPicks day={day} size={size} diet={diet} picks={picks} onToggle={toggleSlot} />
                  ) : (
                    <div className="overflow-hidden rounded-[28px] border-2 border-leaf-900/10 bg-white shadow-[0_10px_30px_rgba(71,26,62,0.08)]">
                      <BoxDiagram day={day} size={size} diet={diet} />
                    </div>
                  )}
                </div>
              </article>
            )
          })}

          <div className="px-4">
            <div className="flex gap-3 rounded-2xl bg-[#c7ec16]/25 p-4 text-base leading-6 text-leaf-900">
              <Info size={18} className="mt-0.5 shrink-0" />
              <p>
                {CUSTOMIZATION_ENABLED
                  ? 'Tap Custom to pick only some items, like Monday protein. Add-on prices are full price. Core, Strong and Elite change portion size.'
                  : 'Core, Strong and Elite change portion size. Every box includes that morning’s drink.'}
              </p>
            </div>
          </div>
        </TabTransition>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eadfd9] bg-cream/95 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl">
          {CUSTOMIZATION_ENABLED && view === 'custom' && (
            <p className="mb-1 text-center text-xs font-semibold text-leaf-900">
              {formatRupees(quote.list)} · {quote.protein} g protein · add-ons at full price
            </p>
          )}
          <Link
            to="/register"
            onClick={goToOrder}
            className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-leaf-900 text-sm font-bold text-spice-800 shadow-[0_8px_25px_rgba(85,16,77,0.18)] hover:bg-leaf-950"
          >
            Order now
            <MoveRight size={18} />
          </Link>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-8 grid grid-cols-[1fr_auto] items-end gap-6">
          <header className="max-w-3xl">
            <p className="mb-2 inline-block rounded-full bg-[#c7ec16] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-leaf-900 uppercase">
              Breakfast box menu
            </p>
            <h2 className="text-4xl font-bold text-leaf-900">Monday to Friday</h2>
            <p className="mt-3 text-lg text-stone-600">
              {CUSTOMIZATION_ENABLED
                ? 'Full box, or Custom — tick only what you want, with add-on price and protein.'
                : 'Full breakfast box, Monday to Friday, with that morning’s drink included.'}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-leaf-900 px-3 py-1 font-display text-sm font-black text-cream">
                {SIZES[size].label}
              </span>
              <span className="rounded-full bg-[#c7ec16] px-2.5 py-1 text-xs font-extrabold text-leaf-900">{DIETS[diet].label}</span>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-leaf-900/75 ring-1 ring-[#eadfd9]">
                {SIZES[size].proteinGrams} g protein
              </span>
              <Link to="/menu" className="ml-1 text-sm font-bold text-leaf-900/70 underline-offset-2 hover:underline">
                Change box
              </Link>
            </div>
          </header>

          <div className="flex flex-wrap justify-end gap-3">
            <Toggle
              label="Diet"
              tone="highlight"
              value={diet}
              onChange={setDiet}
              options={[
                { value: 'nonveg', label: DIETS.nonveg.label },
                { value: 'veg', label: DIETS.veg.label },
              ]}
            />
          {CUSTOMIZATION_ENABLED && (
            <div className="flex justify-end">
              <Toggle
                label="View"
                tone="highlight"
                value={view}
                onChange={setView}
                options={[
                  { value: 'box', label: 'Full box' },
                  { value: 'custom', label: 'Custom' },
                ]}
              />
            </div>
          )}
          </div>
        </div>

        <TabTransition transitionKey={pickerKey} className="space-y-7">
          {WEEK.map((day) => {
            const selected = picks[day.id] ?? []
            const protein =
              CUSTOMIZATION_ENABLED && view === 'custom'
                ? Math.round(
                    selected.reduce((sum, slot) => sum + addonFor(day.id, slot, size, diet).protein, 0) * 10,
                  ) / 10
                : SIZES[size].proteinGrams

            return (
              <article
                key={day.id}
                id={day.id}
                className="scroll-mt-40 overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
              >
                <img
                  key={`${day.id}-${size}-${diet}`}
                  src={photoFor(day, size, diet)}
                  alt={`${day.name} ${DIETS[diet].label} ${SIZES[size].label} breakfast box`}
                  className="h-full min-h-[420px] w-full bg-[#f4f1ea] object-cover"
                />
                <div className="p-8">
                  <DayTitleRow
                    dayName={day.name}
                    proteinGrams={protein}
                    titleClassName="font-serif text-4xl font-bold text-leaf-900"
                    suffix={CUSTOMIZATION_ENABLED && view === 'custom' && selected.length === 0 ? ' · tick items' : ''}
                  />
                  <div className="mt-6">
                    {view === 'custom' ? (
                      <DayCustomPicks day={day} size={size} diet={diet} picks={picks} onToggle={toggleSlot} />
                    ) : (
                      <div className="overflow-hidden rounded-[24px] border border-[#eadfd9]">
                        <BoxDiagram day={day} size={size} diet={diet} />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </TabTransition>

        {CUSTOMIZATION_ENABLED && (
          <p className="mt-8 flex items-start gap-2 rounded-2xl bg-white p-4 text-sm text-leaf-900 shadow-sm ring-1 ring-leaf-900/10">
            <Info size={18} className="mt-0.5 shrink-0" />
            Custom uses weekly-plan add-on prices at full price. Full boxes get the launch discount at order.
          </p>
        )}

        <div className="mt-8 text-center">
          {CUSTOMIZATION_ENABLED && view === 'custom' && (
            <p className="mb-3 text-sm font-semibold text-leaf-900">
              {formatRupees(quote.list)} · {quote.protein} g protein
            </p>
          )}
          <ButtonLink to="/register" className="px-8 py-3.5 text-base" onClick={goToOrder}>
            Register and order
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export function Menu() {
  const [searchParams] = useSearchParams()
  if (!isMenuWeekOpen(searchParams)) return <MenuChooseScreen />
  return <MenuWeekScreen />
}
