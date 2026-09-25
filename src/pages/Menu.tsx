import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BoxDiagram } from '../components/BoxDiagram'
import { DIETS, PRICE_PER_DAY, SIZES, WEEK, formatRupees } from '../features/catalog/data'
import type { Diet, Size } from '../features/catalog/data'
import { Badge, ButtonLink, Section, Toggle } from '../ui'

export function Menu() {
  const [diet, setDiet] = useState<Diet>('nonveg')
  const [size, setSize] = useState<Size>('lean')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <Section
      eyebrow="Breakfast box menu"
      title="Monday to Friday"
      subtitle={`${SIZES.lean.label} has 4 compartments, ${SIZES.build.label} has 3 bigger ones with the salad beside the protein. Chutney comes in a small lidded cup inside the box.`}
    >
      <div className="sticky top-[61px] z-20 -mx-4 mb-8 flex flex-wrap items-center gap-3 bg-cream/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-full sm:px-3">
        <Toggle
          label="Diet"
          value={diet}
          onChange={setDiet}
          options={[
            { value: 'nonveg', label: DIETS.nonveg.label },
            { value: 'veg', label: DIETS.veg.label },
          ]}
        />
        <Toggle
          label="Size"
          value={size}
          onChange={setSize}
          options={[
            { value: 'lean', label: SIZES.lean.label, hint: formatRupees(PRICE_PER_DAY.lean) },
            { value: 'build', label: SIZES.build.label, hint: formatRupees(PRICE_PER_DAY.build) },
          ]}
        />
      </div>

      <div className="space-y-6">
        {WEEK.map((day) => (
          <article
            key={day.id}
            id={day.id}
            className="scroll-mt-40 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <img src={day.image} alt={`${day.name} breakfast`} className="h-56 w-full object-cover md:h-full" loading="lazy" />
            <div className="p-5 sm:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="mr-2 text-2xl font-bold text-leaf-900">{day.name}</h3>
                <Badge>{DIETS[diet].label}</Badge>
                <Badge tone="spice">
                  {SIZES[size].label}, {formatRupees(PRICE_PER_DAY[size])}
                </Badge>
              </div>
              <BoxDiagram day={day} size={size} diet={diet} />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 flex items-start gap-2 rounded-2xl bg-spice-50 p-4 text-sm text-spice-800 ring-1 ring-spice-800/15">
        <Info size={18} className="mt-0.5 shrink-0" />
        Friday&apos;s chicken becomes fish after your second week. On very hot days we may swap a dish to
        keep the box safe; we will tell you on WhatsApp the evening before.
      </p>

      <div className="mt-8 text-center">
        <ButtonLink to="/register" className="px-8 py-3.5 text-base">
          Register and order
        </ButtonLink>
      </div>
    </Section>
  )
}
