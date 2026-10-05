import { ChefHat, Dumbbell, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WEEK } from '../../features/catalog/data'
import { HeroBannerMobile } from '../../components/HeroBannerMobile'
import { HomeHotZone } from '../../components/HomeHotZone'
import { SizePickCard } from '../../components/SizePickCard'
import { ButtonLink, Card } from '../../ui'

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

      <HomeHotZone zone="menu" className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-[10px] font-bold tracking-[0.24em] text-leaf-900 uppercase">Menu</p>
          <h2 className="mt-1 font-display text-2xl font-black text-leaf-900 sm:text-3xl">This week&apos;s boxes</h2>

          <div
            className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Swipe through this week's boxes"
          >
            {WEEK.map((day, index) => (
              <Link
                key={day.id}
                to={`/menu#${day.id}`}
                className="group relative w-52 shrink-0 snap-start"
                style={{ transform: `rotate(${(index - 2) * 1.5}deg)` }}
              >
                <img
                  src={`${day.images.lean.veg}?v=8`}
                  alt={`${day.name} breakfast box`}
                  className="aspect-[4/3] w-full rounded-[1.4rem] bg-[#f4f1ea] object-contain shadow-lg transition duration-300 group-active:-translate-y-1 group-active:shadow-xl"
                  loading="lazy"
                />
                <div className="absolute right-2 bottom-2 left-2 rounded-2xl bg-cream/95 px-3 py-2.5">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-leaf-900 uppercase">{day.name}</p>
                </div>
              </Link>
            ))}
          </div>

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

      <HomeHotZone zone="pricing" className="bg-cream py-8">
        <div className="mx-auto max-w-md px-4">
          <h2 className="font-display text-2xl font-black text-leaf-900">Pick your box.</h2>
          <div className="mt-5 space-y-4">
            <SizePickCard size="lean" />
            <SizePickCard size="build" />
          </div>
        </div>
      </HomeHotZone>
    </>
  )
}
