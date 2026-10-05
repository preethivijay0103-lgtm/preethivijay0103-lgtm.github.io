import { Info, MoveRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { BoxDiagram } from '../components/BoxDiagram'
import { DIETS, PRICE_PER_DAY, SIZES, WEEK, formatRupees, photoFor } from '../features/catalog/data'
import type { Diet, Size } from '../features/catalog/data'
import { ButtonLink, Section, Toggle } from '../ui'

export function Menu() {
  const [diet, setDiet] = useState<Diet>('nonveg')
  const [size, setSize] = useState<Size>('lean')

  const { hash } = useLocation()

  const proteinTarget = size === 'lean' ? 40 : 50

  useEffect(() => {
    const id = hash.slice(1)
    if (!WEEK.some((day) => day.id === id)) return
    const targetId = window.matchMedia('(min-width: 768px)').matches ? id : `${id}-mobile`
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <Section className="!px-0 !py-0 md:!py-12">
      <div className="md:hidden">
        <div
          className="sticky z-30 border-b border-[#ede7df] bg-[#fbf8f2]/95 px-4 py-2 backdrop-blur-xl"
          style={{ top: 'var(--site-header-offset)' }}
        >
          <div className="flex items-center gap-1.5">
            <Toggle
              label="Diet"
              tone="highlight"
              compact
              className="shrink-0"
              value={diet}
              onChange={setDiet}
              options={[
                { value: 'nonveg', label: DIETS.nonveg.label },
                { value: 'veg', label: DIETS.veg.label },
              ]}
            />

            <Toggle
              label="Size"
              tone="highlight"
              fill
              compact
              className="min-w-0 flex-1"
              value={size}
              onChange={setSize}
              options={[
                { value: 'lean', label: SIZES.lean.label, hint: formatRupees(PRICE_PER_DAY.lean) },
                { value: 'build', label: SIZES.build.label, hint: formatRupees(PRICE_PER_DAY.build) },
              ]}
            />
          </div>
        </div>

        <div className="space-y-5 bg-[#faf7f1] pb-32">
          {WEEK.map((day) => (
            <article key={day.id} id={`${day.id}-mobile`} className="scroll-mt-28">
              <div className="mx-4 mt-3 overflow-hidden rounded-[1.75rem] bg-[#eee8de]">
                <img
                  key={`${day.id}-${size}-${diet}`}
                  src={photoFor(day, size, diet)}
                  alt={`${day.name} ${DIETS[diet].label} breakfast`}
                  className="aspect-[4/3] w-full object-cover object-center"
                />
              </div>

              <div className="px-4 pt-3">
                <h2 className="font-serif text-2xl leading-none font-bold tracking-tight text-[#54104d]">{day.name}</h2>

                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f8e8ef] text-sm text-[#54104d]">
                    ⚡
                  </span>
                  <span className="text-sm font-bold text-[#54104d]">{proteinTarget} g protein</span>
                </div>
              </div>

              <div className="px-4 pt-3">
                <div className="overflow-hidden rounded-[28px] border border-[#eadfd9] bg-white shadow-[0_10px_30px_rgba(71,26,62,0.05)]">
                  <BoxDiagram day={day} size={size} diet={diet} />
                </div>
              </div>
            </article>
          ))}

          <div className="px-4">
            <div className="flex gap-3 rounded-2xl bg-[#f3f6e8] p-4 text-sm leading-5 text-[#54104d]">
              <Info size={18} className="mt-0.5 shrink-0" />

              <p>
                Tap the arrow on any item for main ingredients, protein and kcal. Lean is the smaller portion. Very hot
                days may need a swap — we&apos;ll confirm on WhatsApp the evening before.
              </p>
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-[#fbf8f2]/90 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl">
          <ButtonLink
            to="/register"
            className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full !bg-[#c7ec16] text-sm font-bold !text-[#54104d] shadow-[0_8px_25px_rgba(85,16,77,0.18)] hover:!bg-[#b8dc14]"
          >
            Order now
            <MoveRight size={18} />
          </ButtonLink>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-8 grid grid-cols-[1fr_auto] items-end gap-6">
          <header className="max-w-3xl">
            <p className="mb-2 inline-block rounded-full bg-[#c7ec16] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[#54104d] uppercase">
              Breakfast box menu
            </p>

            <h2 className="text-4xl font-bold text-[#54104d]">Monday to Friday</h2>

            <p className="mt-3 text-lg text-stone-600">
              Each box includes a main, salad, protein, side and the day&apos;s drink.
            </p>
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

            <Toggle
              label="Size"
              tone="highlight"
              value={size}
              onChange={setSize}
              options={[
                { value: 'lean', label: SIZES.lean.label, hint: formatRupees(PRICE_PER_DAY.lean) },
                { value: 'build', label: SIZES.build.label, hint: formatRupees(PRICE_PER_DAY.build) },
              ]}
            />
          </div>
        </div>

        <div className="space-y-7">
          {WEEK.map((day) => {
            const protein = size === 'lean' ? 40 : 50

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
                  <h3 className="font-serif text-4xl font-bold text-[#54104d]">{day.name}</h3>

                  <p className="mt-3 text-xl font-bold text-[#54104d]">{protein} g protein</p>

                  <div className="mt-6 overflow-hidden rounded-[24px] border border-[#eadfd9]">
                    <BoxDiagram day={day} size={size} diet={diet} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-8 flex items-start gap-2 rounded-2xl bg-white p-4 text-sm text-[#54104d] shadow-sm ring-1 ring-[#54104d]/10">
          <Info size={18} className="mt-0.5 shrink-0" />
          Tap any row for main ingredients, protein and kcal. Lean uses a smaller portion. On very hot days we may swap
          a dish — we will tell you on WhatsApp the evening before.
        </p>

        <div className="mt-8 text-center">
          <ButtonLink to="/register" className="px-8 py-3.5 text-base">
            Register and order
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
