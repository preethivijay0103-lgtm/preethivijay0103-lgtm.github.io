import { ArrowRight, ChefHat, Dumbbell, MoonStar, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { HomeWeekCarousel } from '../../components/HomeWeekCarousel'
import { HomeSizePicker } from '../../components/SizePickCard'
import { HeroBannerMobile } from '../../components/HeroBannerMobile'
import { HomeHotZone } from '../../components/HomeHotZone'
import { HomeFaq } from '../../components/HomeFaq'
import { formatRupees, planTotal, salePricePerDay, SIZES } from '../../features/catalog/data'
import type { Size } from '../../features/catalog/data'
import { ButtonLink, Card } from '../../ui'

/** Home week strip (carousel + trial / full-week buttons). Set true to show again. */
const SHOW_HOME_WEEK_PREVIEW = false

const FACTS = [
  { icon: Dumbbell, title: 'Protein-forward', text: 'Keeps you light, strong and ready.' },
  { icon: ChefHat, title: 'Cooked at 4:30 am', text: 'Made fresh every morning.' },
  { icon: MoonStar, title: 'Order by 9 pm', text: 'Wake up to breakfast.' },
]

const TRIAL_SIZES: Size[] = ['core', 'strong', 'elite']

function TrialPickCard() {
  const [size, setSize] = useState<Size>('strong')

  return (
    <div className="rounded-[1.85rem] bg-cream p-2 shadow-[0_8px_0_#4a1d48] ring-4 ring-leaf-900">
      <div className="checks-lime rounded-[1.45rem] px-4 pb-5 pt-6 text-center text-leaf-900">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-900 px-3 py-1 text-[11px] font-bold tracking-wide text-cream">
          <Sparkles size={12} className="text-spice-800" />
          3-day trial
        </span>
        <h3 className="mt-4 font-display text-[2rem] leading-[1.02] font-black">
          Try three
          <span className="block">happy mornings</span>
        </h3>
        <p className="mt-2 text-sm font-medium text-leaf-900/70">Pick your plan for the three days.</p>

        <div className="mt-5" role="radiogroup" aria-label="Trial box size">
          {TRIAL_SIZES.map((id) => {
            const selected = size === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSize(id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition ${
                  selected ? 'bg-cream text-leaf-900 shadow-sm' : 'text-leaf-900'
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ring-2 ring-leaf-900 ${
                    selected ? 'bg-leaf-900' : 'bg-transparent'
                  }`}
                >
                  {selected ? <span className="h-2 w-2 rounded-full bg-spice-800" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.05rem] leading-tight font-bold">{SIZES[id].label}</span>
                  <span className="block text-[11px] font-semibold text-leaf-900/55">
                    {formatRupees(salePricePerDay(id))} a day
                  </span>
                </span>
                <span className="font-display text-xl font-black">{formatRupees(planTotal(id, 'trial'))}</span>
              </button>
            )
          })}
        </div>

        <ButtonLink
          to={`/register?size=${size}`}
          className="mt-4 w-full justify-center py-3.5 text-base font-bold !bg-leaf-900 !text-spice-800 hover:!bg-leaf-950"
        >
          Start trial · {formatRupees(planTotal(size, 'trial'))} <ArrowRight size={16} strokeWidth={2.75} />
        </ButtonLink>
      </div>
    </div>
  )
}

type Props = {
  leanPrice: string
  buildPrice: string
}

export function HomeMobile({ leanPrice, buildPrice }: Props) {
  return (
    <>
      <HomeHotZone zone="hero">
        <HeroBannerMobile leanPrice={leanPrice} buildPrice={buildPrice} />
      </HomeHotZone>

      <HomeHotZone zone="facts" className="checks-pink py-9">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-3 px-4">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="bg-cream px-3 py-5 text-center">
              <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-leaf-100 text-leaf-900">
                <Icon size={18} />
              </span>
              <p className="mt-2 font-display text-sm leading-tight font-bold text-leaf-900">{title}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink/90">{text}</p>
            </Card>
          ))}
        </div>
      </HomeHotZone>

      {SHOW_HOME_WEEK_PREVIEW && (
      <HomeHotZone zone="menu" className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-[10px] font-bold tracking-[0.24em] text-leaf-900 uppercase">This week</p>
          <h2 className="mt-1 font-display text-2xl font-black text-leaf-900 sm:text-3xl">Monday to Friday</h2>
          <p className="mt-2 text-sm text-ink/75">Swipe Strong this week — veg preview.</p>

          <HomeWeekCarousel className="mt-4" />

          <div className="mt-5 grid gap-2">
            <ButtonLink to="/register" className="home-pulse w-full justify-center py-3.5">
              Start a 3-day trial
            </ButtonLink>
            <ButtonLink to="/menu" variant="secondary" className="w-full justify-center py-3">
              See the full week
            </ButtonLink>
          </div>
        </div>
      </HomeHotZone>
      )}

      <HomeHotZone zone="pricing" className="bg-white pt-16 pb-12">
        <div className="mx-auto max-w-md px-3">
          <HomeSizePicker showDietToggle={false} className="rounded-none bg-transparent" />
        </div>
      </HomeHotZone>

      <HomeHotZone zone="faq" className="bg-cream py-10">
        <div className="mx-auto max-w-md px-4">
          <HomeFaq />
        </div>
      </HomeHotZone>

      <HomeHotZone zone="closing" className="bg-cream pb-12 pt-2">
        <div className="mx-auto max-w-md px-4">
          <TrialPickCard />
        </div>
      </HomeHotZone>
    </>
  )
}
