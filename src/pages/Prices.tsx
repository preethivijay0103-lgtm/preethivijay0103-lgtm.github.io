import { CircleCheck, IndianRupee } from 'lucide-react'
import { CUSTOMIZATION_ENABLED } from '../config/customization'
import { LAUNCH_OFF_PERCENT, PLANS, PRICE_PER_DAY, SIZES, formatRupees, planTotal, salePricePerDay } from '../features/catalog/data'
import type { PlanId, Size } from '../features/catalog/data'
import { ButtonLink, Card, Section } from '../ui'

const INCLUDED = [
  'Main, protein, side and salad in one sealed box',
  'That day’s drink in its own bottle',
  'Peanut chutney on Monday, coconut milk on Friday',
  'Gym pickup 7–8 am, or delivery 8–10 am',
]

const PACK_PLANS = (Object.keys(PLANS) as PlanId[]).filter((plan) => plan !== 'custom')
const LEVELS: Size[] = ['core', 'strong', 'elite']

export function Prices() {
  return (
    <Section
      eyebrow="Prices"
      title="Simple prices, drink included"
      subtitle={
        CUSTOMIZATION_ENABLED
          ? 'Veg and non-veg cost the same. Core 25% off, Strong and Elite 30% off on full boxes. Custom add-ons stay full price. Gym pickup 7–8 am, delivery 8–10 am, Choodasandra, Hosur Road.'
          : 'Veg and non-veg cost the same. Core 25% off, Strong and Elite 30% off on full boxes. Gym pickup 7–8 am, delivery 8–10 am, Choodasandra, Hosur Road.'
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {LEVELS.map((size) => {
          const featured = size === 'strong'
          return (
            <Card
              key={size}
              className={`flex flex-col p-7 ${featured ? 'checks-plum text-cream ring-0' : ''}`}
            >
              <p
                className={`text-xs font-semibold tracking-wide uppercase ${
                  featured ? 'text-spice-800' : 'text-ink/50'
                }`}
              >
                {SIZES[size].label} — {SIZES[size].proteinGrams} g protein
              </p>
              <p
                className={`mt-2 font-display text-6xl leading-none font-black ${
                  featured ? 'text-spice-800' : 'text-leaf-900'
                }`}
              >
                {SIZES[size].proteinGrams} g
              </p>
              <p
                className={`mt-1 text-sm font-extrabold tracking-[0.16em] uppercase ${
                  featured ? 'text-spice-800' : 'text-leaf-900'
                }`}
              >
                protein
              </p>
              <p className={`mt-3 ${featured ? 'text-cream/80' : 'text-stone-600'}`}>{SIZES[size].blurb}</p>
              <p className="mt-5">
                <span
                  className={`mr-2 text-2xl font-semibold line-through ${
                    featured ? 'text-cream/40' : 'text-stone-400'
                  }`}
                >
                  {formatRupees(PRICE_PER_DAY[size])}
                </span>
                <span
                  className={`font-display text-5xl font-bold ${featured ? 'text-spice-800' : 'text-leaf-900'}`}
                >
                  {formatRupees(salePricePerDay(size))}
                </span>
              </p>
              <p
                className={`mt-1 text-xs font-extrabold tracking-[0.14em] uppercase ${
                  featured ? 'text-cream/70' : 'text-stone-500'
                }`}
              >
                First month {LAUNCH_OFF_PERCENT[size]}% off
              </p>
              <dl
                className={`mt-6 divide-y rounded-2xl ${
                  featured ? 'divide-white/10 bg-black/20' : 'divide-stone-100 bg-cream ring-1 ring-stone-200'
                }`}
              >
                {PACK_PLANS.map((plan) => (
                  <div key={plan} className="flex items-center justify-between px-4 py-3">
                    <dt>
                      <p className={`font-semibold ${featured ? 'text-cream' : 'text-leaf-900'}`}>
                        {PLANS[plan].label}
                      </p>
                      <p className={`text-xs ${featured ? 'text-cream/70' : 'text-stone-500'}`}>
                        {PLANS[plan].days} x {formatRupees(salePricePerDay(size))}. {PLANS[plan].note}
                      </p>
                    </dt>
                    <dd
                      className={`font-display text-2xl font-bold ${
                        featured ? 'text-spice-800' : 'text-leaf-900'
                      }`}
                    >
                      {formatRupees(planTotal(size, plan))}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className={`mt-6 flex-1 space-y-2 text-sm ${featured ? 'text-cream/85' : 'text-stone-700'}`}>
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CircleCheck size={18} className={`shrink-0 ${featured ? 'text-spice-800' : 'text-leaf-700'}`} />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/register" variant={featured ? 'primary' : 'secondary'} className="mt-7 w-full">
                Order {SIZES[size].label}
              </ButtonLink>
            </Card>
          )
        })}
      </div>

      <p className="mt-8 flex items-start gap-2 rounded-2xl bg-leaf-50 p-4 text-sm text-leaf-900 ring-1 ring-leaf-900/10">
        <IndianRupee size={18} className="mt-0.5 shrink-0" />
        {CUSTOMIZATION_ENABLED
          ? 'Custom orders use weekly-plan add-on prices at full price, with protein added as you tick items. Full boxes get the launch discount. You pay on WhatsApp by UPI after we confirm.'
          : 'Full boxes get the launch discount. You pay on WhatsApp by UPI after we confirm.'}
      </p>
    </Section>
  )
}
