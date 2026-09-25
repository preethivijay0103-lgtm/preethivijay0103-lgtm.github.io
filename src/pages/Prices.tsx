import { CircleCheck, IndianRupee } from 'lucide-react'
import { PLANS, PRICE_PER_DAY, SIZES, formatRupees, planTotal } from '../features/catalog/data'
import type { PlanId, Size } from '../features/catalog/data'
import { ButtonLink, Card, Section } from '../ui'

const INCLUDED = [
  'Main, protein, side and salad in one sealed box',
  'The drink of the day in its own bottle',
  'Chutney or curd in a lidded cup',
  'Ice pack in the bag to keep it cold',
]

export function Prices() {
  return (
    <Section
      eyebrow="Prices"
      title="Simple prices, drink included"
      subtitle="Veg and non-veg cost the same. No hidden charges and no discounts, so everyone pays the same fair price."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {(Object.keys(SIZES) as Size[]).map((size) => (
          <Card key={size} className="flex flex-col p-7">
            <h3 className="text-2xl font-bold text-leaf-900">{SIZES[size].label}</h3>
            <p className="mt-1 text-stone-600">{SIZES[size].blurb}</p>
            <p className="mt-5">
              <span className="font-display text-5xl font-bold text-spice-800">{formatRupees(PRICE_PER_DAY[size])}</span>
              <span className="ml-1 text-stone-500">a day</span>
            </p>

            <dl className="mt-6 divide-y divide-stone-100 rounded-2xl bg-cream ring-1 ring-stone-200">
              {(Object.keys(PLANS) as PlanId[]).map((plan) => (
                <div key={plan} className="flex items-center justify-between px-4 py-3">
                  <dt>
                    <p className="font-semibold text-leaf-900">{PLANS[plan].label}</p>
                    <p className="text-xs text-stone-500">
                      {PLANS[plan].days} x {formatRupees(PRICE_PER_DAY[size])}. {PLANS[plan].note}
                    </p>
                  </dt>
                  <dd className="font-display text-2xl font-bold text-leaf-900">
                    {formatRupees(planTotal(size, plan))}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex-1 space-y-2 text-sm text-stone-700">
              <li className="flex gap-2">
                <CircleCheck size={18} className="shrink-0 text-leaf-700" />
                {SIZES[size].compartments}-compartment box
              </li>
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-2">
                  <CircleCheck size={18} className="shrink-0 text-leaf-700" />
                  {item}
                </li>
              ))}
            </ul>

            <ButtonLink to="/register" className="mt-7 w-full">
              Order {SIZES[size].label}
            </ButtonLink>
          </Card>
        ))}
      </div>

      <p className="mt-8 flex items-start gap-2 rounded-2xl bg-leaf-50 p-4 text-sm text-leaf-900 ring-1 ring-leaf-900/10">
        <IndianRupee size={18} className="mt-0.5 shrink-0" />
        You pay on WhatsApp by UPI after we confirm your order. We start cooking only once payment is
        received. Days you skip in time are not charged.
      </p>
    </Section>
  )
}
