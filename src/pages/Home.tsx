import { ArrowRight, ChefHat, Clock, Flame, GlassWater, MessageCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { LAUNCH_OFF_PERCENT, PRICE_PER_DAY, WEEK, formatRupees, planTotal, salePricePerDay } from '../features/catalog/data'
import { HeroPlates } from '../components/HeroPlates'
import { HomeHeatmapToggle } from '../components/HomeHeatmapToggle'
import { HomeHotZone } from '../components/HomeHotZone'
import { HomeStickyTrialCta } from '../components/HomeStickyTrialCta'
import { SizePickCard } from '../components/SizePickCard'
import { HomeMobile } from './home/HomeMobile'
import { ButtonLink, Card } from '../ui'

const TICKER = [
  'Packed hot, not chilled',
  'Gym pickup 7–8 am',
  'Delivery 8–10 am',
  'Drink comes with the box',
  'Veg and non-veg, same price',
  '30% off while we start',
  'Order by 9 pm',
  'Monday to Friday only',
  ...WEEK.map((day) => `${day.name}: ${day.main.lean.split(',')[0]}`),
]

const FACTS = [
  { icon: ChefHat, title: 'Cooked at 4:30 am', text: 'Fresh every morning. Nothing from yesterday.' },
  { icon: Flame, title: 'Packed hot', text: 'Sealed warm, so it stays a proper breakfast.' },
  { icon: GlassWater, title: 'Drink is yours', text: 'Buttermilk, fruit juice, porridge, shake or smoothie.' },
  { icon: Clock, title: 'Gym 7–8 am', text: 'Pickup at the gym, or delivery 8–10 am. Choodasandra, Hosur Road.' },
]

const VOICES = [
  {
    initials: 'AK',
    name: 'A. K.',
    place: 'Choodasandra',
    quote:
      'I collect it at 7:10, eat in the car, and I am on the floor by 8. The dosa is still warm. That is the whole point.',
    tag: 'Lean · Veg',
    note: 'Sprout dosa mornings',
  },
  {
    initials: 'RS',
    name: 'R. S.',
    place: 'Koramangala',
    quote: 'Build box after legs day. Paneer and the drink fill me up. No packet food, no waiting for delivery.',
    tag: 'Build · Veg',
    note: '5-day week',
  },
  {
    initials: 'MV',
    name: 'M. V.',
    place: 'Indiranagar',
    quote: 'Egg on Monday, chicken on Tuesday. Same price as veg. I just WhatsApp if I need to skip a day.',
    tag: 'Lean · Non-veg',
    note: 'Pickup before work',
  },
  {
    initials: 'PN',
    name: 'P. N.',
    place: 'BTM Layout',
    quote: 'I used to skip breakfast and train hungry. Now the box is at the gym before I leave. Idli and chutney, still hot.',
    tag: 'Lean · Veg',
    note: 'Early session',
  },
  {
    initials: 'SK',
    name: 'S. K.',
    place: 'Jayanagar',
    quote: 'Build on training days. The compartments stay separate, so the chutney does not soak the dosa.',
    tag: 'Build · Veg',
    note: 'Three-day trial',
  },
  {
    initials: 'DL',
    name: 'D. L.',
    place: 'JP Nagar',
    quote: 'The food stays on the plan, and the day’s drink is already in the bottle.',
    tag: 'Lean · Non-veg',
    note: 'Weekday pickup',
  },
]

export function Home() {
  const ticker = [...TICKER, ...TICKER]
  const leanPrice = formatRupees(salePricePerDay('lean'))
  const buildPrice = formatRupees(salePricePerDay('build'))

  return (
    <>
      <HomeHeatmapToggle />
      <HomeHotZone zone="ticker" className="home-ticker" aria-hidden>
        <div className="home-ticker-track">
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`} className="px-1.5 font-semibold uppercase">
              {item}
              <span className="home-ticker-sep text-leaf-900">●</span>
            </span>
          ))}
        </div>
      </HomeHotZone>

      <div className="lg:hidden">
        <HomeMobile leanPrice={leanPrice} buildPrice={buildPrice} />
      </div>

      <HomeHotZone zone="hero" className="checks-plum relative hidden overflow-hidden lg:block">
        <div className="relative z-20 mx-auto grid max-w-7xl items-center px-4 py-12 sm:px-6 lg:min-h-[32rem] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] lg:py-14">
          <div className="relative max-w-xl pr-4">
            <p className="home-rise mb-4 inline-flex rounded-full bg-spice-800 px-3 py-1 text-xs font-extrabold tracking-[0.18em] text-leaf-900 uppercase">
              {LAUNCH_OFF_PERCENT}% off on ur order
            </p>
            <h1 className="home-rise home-rise-2 font-display text-5xl leading-[0.9] font-black tracking-tight text-cream sm:text-6xl lg:text-7xl">
              Wake hungry.
              <br />
              <span className="italic text-spice-800">Train fed.</span>
            </h1>
            <p className="home-rise home-rise-3 mt-4 max-w-md font-display text-xl leading-snug font-medium text-cream/90">
              We fuel your mornings with protein-rich food that keeps you light, strong, and ready.
            </p>
            <dl className="home-rise home-rise-4 mt-6 flex gap-8">
              <div>
                <dt className="font-display text-3xl font-black text-spice-800">4:30</dt>
                <dd className="text-sm text-cream/80">Cooked fresh</dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-black text-spice-800">7:00</dt>
                <dd className="text-sm text-cream/80">Gym pickup starts</dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-black text-spice-800">10:00</dt>
                <dd className="text-sm text-cream/80">Last delivery</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink to="/register" className="home-pulse px-8 py-4 text-base">
                Start a 3-day trial <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink to="/menu" variant="secondary" className="px-8 py-4 text-base">
                This week&apos;s boxes
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-cream/75">
              Drink included · Veg and non-veg, same price · From {formatRupees(PRICE_PER_DAY.lean)} a morning
            </p>
          </div>
        </div>
        <HeroPlates />
        <HomeStickyTrialCta />
      </HomeHotZone>

      <div className="hidden lg:block">
      <HomeHotZone zone="facts" className="checks-pink py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="flex h-full flex-col bg-cream p-5">
                <Icon className="text-leaf-900" size={22} />
                <p className="mt-3 font-display text-xl leading-tight text-leaf-900">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </HomeHotZone>

      <HomeHotZone zone="menu" className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-leaf-900 uppercase">This week</p>
              <h2 className="mt-1 font-display text-3xl leading-tight text-leaf-900 sm:text-4xl">
                Five mornings. Five different plates.
              </h2>
            </div>
            <ButtonLink to="/menu" variant="secondary">
              Open the full menu <ArrowRight size={16} />
            </ButtonLink>
          </div>
          <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {WEEK.map((day, index) => (
              <Link
                key={day.id}
                to={`/menu#${day.id}`}
                className="group relative w-52 shrink-0 snap-start sm:w-auto"
                style={{ transform: `rotate(${(index - 2) * 1.5}deg)` }}
              >
                <img
                  src={`${day.images.lean.veg}?v=8`}
                  alt={`${day.name} breakfast box`}
                  className="aspect-[4/3] w-full rounded-[1.4rem] bg-[#f4f1ea] object-contain shadow-lg transition duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-xl"
                  loading="lazy"
                />
                <div className="absolute right-2 bottom-2 left-2 rounded-2xl bg-cream/95 px-3 py-2.5">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-leaf-900 uppercase">{day.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </HomeHotZone>

      <HomeHotZone zone="pricing" className="bg-cream py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-leaf-900 uppercase">Pick a size</p>
              <h2 className="mt-1 font-display text-3xl text-leaf-900 sm:text-4xl">Lean, or Build.</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SizePickCard size="lean" />
            <SizePickCard size="build" />
          </div>
        </div>
      </HomeHotZone>

      <HomeHotZone zone="voices" className="bg-cream py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl text-leaf-900 sm:text-4xl">
            What gym mornings <span className="italic text-leaf-900">sound like</span>
          </h2>
          <p className="mt-2 max-w-2xl text-ink/75">
            Sample notes in the voice of people collecting at the gym. Real names and photos come after we start.
          </p>
          <div className="home-voices mt-6">
            <div className="home-voices-track">
              {[0, 1].map((copy) =>
                VOICES.map((voice) => (
                  <article
                    key={`${voice.name}-${copy}`}
                    className={`home-voice w-80 shrink-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-leaf-900/10 ${copy === 1 ? 'home-voices-clone' : ''}`}
                    aria-hidden={copy === 1}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-leaf-900 font-display text-cream">
                        {voice.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-leaf-900">{voice.name}</p>
                        <p className="text-sm text-ink/55">{voice.place}</p>
                        <p className="mt-0.5 flex gap-0.5 text-spice-800" aria-label="5 stars">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/80">{voice.quote}</p>
                    <div className="mt-4 rounded-xl bg-leaf-100 px-3 py-2 text-center">
                      <p className="text-sm font-semibold text-leaf-900">{voice.tag}</p>
                      <p className="text-xs text-ink/60">{voice.note}</p>
                    </div>
                  </article>
                )),
              )}
            </div>
          </div>
        </div>
      </HomeHotZone>

      <HomeHotZone zone="closing" className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="checks-lime relative overflow-hidden rounded-[1.75rem] px-6 py-10 text-center text-leaf-900 sm:px-12 sm:py-12">
            <h2 className="font-display text-3xl font-black sm:text-5xl">Try three mornings first.</h2>
            <p className="mx-auto mt-3 max-w-xl font-medium">
              {formatRupees(planTotal('lean', 'trial'))} Lean · {formatRupees(planTotal('build', 'trial'))} Build.
              Message us by {brand.orderCutoff}.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/register" className="home-pulse !bg-leaf-900 px-8 py-4 text-base !text-spice-800 hover:!bg-leaf-950">
                Register on WhatsApp
              </ButtonLink>
              <ButtonLink to="/how-it-works" variant="ghost" className="px-8 py-4 text-base !text-leaf-900 hover:!bg-white/40">
                <MessageCircle size={18} /> How pickup works
              </ButtonLink>
            </div>
          </div>
        </div>
      </HomeHotZone>
      </div>
    </>
  )
}
