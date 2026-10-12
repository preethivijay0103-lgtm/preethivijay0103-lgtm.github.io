import { ArrowRight, ChefHat, Dumbbell, Flame } from 'lucide-react'
import { HomeWeekCarousel } from '../../components/HomeWeekCarousel'
import { HomeSizePicker } from '../../components/SizePickCard'
import { HeroBannerMobile } from '../../components/HeroBannerMobile'
import { HomeHotZone } from '../../components/HomeHotZone'
import { formatRupees, planTotal } from '../../features/catalog/data'
import { ButtonLink, Card } from '../../ui'

/** Home week strip (carousel + trial / full-week buttons). Set true to show again. */
const SHOW_HOME_WEEK_PREVIEW = false

const FACTS = [
  { icon: ChefHat, title: 'Cooked at 4:30 am', text: 'Made fresh every morning.' },
  { icon: Flame, title: 'Packed hot', text: 'Sealed warm for a proper breakfast.' },
  { icon: Dumbbell, title: 'Protein-forward', text: 'Keeps you light, strong and ready.' },
]

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

      <HomeHotZone zone="facts" className="checks-pink py-6">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="bg-cream px-2.5 py-4 text-center">
              <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-leaf-100 text-leaf-900">
                <Icon size={18} />
              </span>
              <p className="mt-2 font-display text-sm leading-tight font-bold text-leaf-900">{title}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink/75">{text}</p>
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

      <HomeHotZone zone="pricing" className="bg-white py-9">
        <div className="mx-auto max-w-md px-3">
          <HomeSizePicker showDietToggle={false} className="rounded-none bg-transparent" />
        </div>
      </HomeHotZone>

      <HomeHotZone zone="closing" className="bg-cream pb-10 pt-2">
        <div className="mx-auto max-w-md px-4">
          <div className="checks-lime rounded-[1.35rem] px-5 py-7 text-center text-leaf-900">
            <h3 className="font-display text-xl font-black">Try three mornings</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed">
              {formatRupees(planTotal('core', 'trial'))} Core · {formatRupees(planTotal('strong', 'trial'))} Strong ·{' '}
              {formatRupees(planTotal('elite', 'trial'))} Elite
            </p>
            <ButtonLink to="/register" className="home-pulse mt-5 w-full justify-center py-3.5 !bg-leaf-900 !text-spice-800">
              Start trial <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </HomeHotZone>
    </>
  )
}
