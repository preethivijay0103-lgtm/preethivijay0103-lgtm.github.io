import { CircleCheck, IndianRupee } from 'lucide-react'
import { LAUNCH_OFF_PERCENT, PLANS, PRICE_PER_DAY, SIZES, formatRupees, planTotal, salePricePerDay } from '../features/catalog/data'
import type { PlanId } from '../features/catalog/data'
import { ButtonLink, Card, Section } from '../ui'

const INCLUDED = [
  'Main, protein, side and salad in one sealed box',
  'That day’s drink in its own bottle',
  'Peanut chutney on Monday, coconut milk on Friday',
  'Gym pickup 7–8 am, or delivery 8–10 am',
]

export function Prices() {
  return (
    <Section
      eyebrow="Prices"
      title="Simple prices, drink included"
      subtitle="Veg and non-veg cost the same. 30% off while we start. Gym pickup 7–8 am, delivery 8–10 am, Choodasandra, Hosur Road."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col p-7">
          <p className="text-xs font-semibold tracking-wide text-ink/50 uppercase">{SIZES.lean.label} — {SIZES.lean.proteinGrams} g protein</p>
          <p className="mt-2 font-display text-6xl leading-none font-black text-leaf-900">{SIZES.lean.proteinGrams} g</p>
          <p className="mt-1 text-sm font-extrabold tracking-[0.16em] text-leaf-900 uppercase">protein</p>
          <p className="mt-3 text-stone-600">{SIZES.lean.blurb}</p>
          <p className="mt-5">
            <span className="mr-2 text-2xl font-semibold text-stone-400 line-through">{formatRupees(PRICE_PER_DAY.lean)}</span>
            <span className="font-display text-5xl font-bold text-leaf-900">{formatRupees(salePricePerDay('lean'))}</span>
          </p>
          <p className="mt-1 text-xs font-extrabold tracking-[0.14em] text-stone-500 uppercase">
            First month {LAUNCH_OFF_PERCENT}% off
          </p>
          <dl className="mt-6 divide-y divide-stone-100 rounded-2xl bg-cream ring-1 ring-stone-200">
            {(Object.keys(PLANS) as PlanId[]).map((plan) => (
              <div key={plan} className="flex items-center justify-between px-4 py-3">
                <dt>
                  <p className="font-semibold text-leaf-900">{PLANS[plan].label}</p>
                  <p className="text-xs text-stone-500">
                    {PLANS[plan].days} x {formatRupees(salePricePerDay('lean'))}. {PLANS[plan].note}
                  </p>
                </dt>
                <dd className="font-display text-2xl font-bold text-leaf-900">
                  {formatRupees(planTotal('lean', plan))}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-stone-700">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <CircleCheck size={18} className="shrink-0 text-leaf-700" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink to="/register" variant="secondary" className="mt-7 w-full">
            Order Lean
          </ButtonLink>
        </Card>

        <Card className="checks-plum flex flex-col p-7 text-cream ring-0">
          <p className="inline-flex w-fit rounded-full bg-spice-800 px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-leaf-900 uppercase">
            {SIZES.build.label} — {SIZES.build.proteinGrams} g protein
          </p>
          <p className="mt-3 font-display text-6xl leading-none font-black text-spice-800">{SIZES.build.proteinGrams} g</p>
          <p className="mt-1 text-sm font-extrabold tracking-[0.16em] text-spice-800 uppercase">protein</p>
          <p className="mt-3 text-cream/80">{SIZES.build.blurb}</p>
          <p className="mt-5">
            <span className="mr-2 text-2xl font-semibold text-cream/40 line-through">{formatRupees(PRICE_PER_DAY.build)}</span>
            <span className="font-display text-5xl font-bold text-spice-800">{formatRupees(salePricePerDay('build'))}</span>
          </p>
          <p className="mt-1 text-xs font-extrabold tracking-[0.14em] text-cream/70 uppercase">
            First month {LAUNCH_OFF_PERCENT}% off
          </p>
          <dl className="mt-6 divide-y divide-white/10 rounded-2xl bg-black/20">
            {(Object.keys(PLANS) as PlanId[]).map((plan) => (
              <div key={plan} className="flex items-center justify-between px-4 py-3">
                <dt>
                  <p className="font-semibold text-cream">{PLANS[plan].label}</p>
                  <p className="text-xs text-cream/70">
                    {PLANS[plan].days} x {formatRupees(salePricePerDay('build'))}. {PLANS[plan].note}
                  </p>
                </dt>
                <dd className="font-display text-2xl font-bold text-spice-800">
                  {formatRupees(planTotal('build', plan))}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-cream/85">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <CircleCheck size={18} className="shrink-0 text-spice-800" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink to="/register" className="mt-7 w-full">
            Order Build
          </ButtonLink>
        </Card>
      </div>

      <p className="mt-8 flex items-start gap-2 rounded-2xl bg-leaf-50 p-4 text-sm text-leaf-900 ring-1 ring-leaf-900/10">
        <IndianRupee size={18} className="mt-0.5 shrink-0" />
        You pay on WhatsApp by UPI after we confirm your order. We start cooking only once payment is
        received. Days you skip in time are not charged.
      </p>
    </Section>
  )
}
