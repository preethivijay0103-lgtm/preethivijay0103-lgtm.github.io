import { ArrowRight, ChefHat, Clock, GlassWater, MessageCircle, Snowflake, Sunrise } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { PLANS, PRICE_PER_DAY, SIZES, WEEK, formatRupees, planTotal } from '../features/catalog/data'
import type { Size } from '../features/catalog/data'
import { Badge, ButtonLink, Card, Section } from '../ui'

const FACTS = [
  { icon: ChefHat, title: 'Cooked at 4:30 am', text: 'Fresh every morning in our home kitchen. Nothing from yesterday.' },
  { icon: Snowflake, title: 'Packed chilled', text: 'Sealed box with an ice pack, so it stays fresh till you eat.' },
  { icon: GlassWater, title: 'Drink included', text: 'Buttermilk, juice, millet kanji, a shake or a smoothie, every day.' },
  { icon: Clock, title: `Pickup ${brand.pickupHours}`, text: `From our gate, ${brand.pickupDays}, on your way to the gym.` },
]

const STEPS = [
  { title: 'Register', text: 'Pick Lean or Build, veg or non-veg, and your start day. Takes two minutes.' },
  { title: 'Confirm on WhatsApp', text: 'Your order opens in WhatsApp. We reply, confirm, and you pay by UPI.' },
  { title: 'Collect and train', text: 'Your chilled box is ready at our gate from 6 am. Grab it and go.' },
]

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-leaf-900 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <Badge tone="white">
              <Sunrise size={14} /> Breakfast box, Monday to Friday
            </Badge>
            <h1 className="mt-5 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-leaf-100">
              High-protein South Indian breakfast: sprout dosa, ragi idiyappam, paddu, millet upma,
              with paneer, egg or chicken. Cooked before sunrise, collected on your way to the gym.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/register" className="px-7 py-3.5 text-base">
                Register and order <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink to="/menu" variant="secondary" className="px-7 py-3.5 text-base">
                See this week&apos;s menu
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-leaf-100">
              From <span className="font-semibold text-white">{formatRupees(PRICE_PER_DAY.lean)} a day</span>,
              drink included. Veg and non-veg are the same price.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-spice-600/30 blur-2xl" aria-hidden />
            <img
              src="/images/hero.jpg"
              alt="Breakfast box with sprout dosa, paneer tikka, badam laddu, carrot and cucumber sticks, and buttermilk"
              className="relative aspect-[16/10] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/10"
            />
          </div>
        </div>
      </section>

      <Section className="!py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-5">
              <Icon className="text-spice-800" size={26} />
              <p className="mt-3 font-semibold text-leaf-900">{title}</p>
              <p className="mt-1 text-sm text-stone-600">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="This week"
        title="Five mornings, five different boxes"
        subtitle="Every day has a millet or lentil main, a protein, a side, a fresh salad and a drink."
        className="bg-white"
      >
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {WEEK.map((day) => (
            <Link
              key={day.id}
              to={`/menu#${day.id}`}
              className="group w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-cream ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg sm:w-auto"
            >
              <img src={day.image} alt={day.main.lean} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-spice-800">{day.name}</p>
                <p className="mt-1 font-semibold text-leaf-900">{day.main.lean.split(',')[0]}</p>
                <p className="mt-1 text-sm text-stone-600">with {day.drink.name.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>
        <ButtonLink to="/menu" variant="secondary" className="mt-6">
          Full menu for veg and non-veg <ArrowRight size={16} />
        </ButtonLink>
      </Section>

      <Section eyebrow="Pick your size" title="Lean or Build" subtitle="Same food, different portions. Choose what fits your goal.">
        <div className="grid gap-6 md:grid-cols-2">
          {(Object.keys(SIZES) as Size[]).map((size) => (
            <Card key={size} className={`p-7 ${size === 'build' ? 'ring-2 ring-spice-800/40' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-leaf-900">{SIZES[size].label}</h3>
                  <p className="mt-1 text-stone-600">{SIZES[size].blurb}</p>
                </div>
                <p className="text-right">
                  <span className="font-display text-3xl font-bold text-spice-800">{formatRupees(PRICE_PER_DAY[size])}</span>
                  <span className="block text-xs text-stone-500">a day</span>
                </p>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-stone-700">
                <li>{SIZES[size].compartments}-compartment box plus a drink bottle</li>
                <li>
                  {PLANS.trial.label}: {formatRupees(planTotal(size, 'trial'))}. {PLANS.week.label}:{' '}
                  {formatRupees(planTotal(size, 'week'))}
                </li>
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="How ordering works" title="Three steps, no app to install" className="bg-leaf-50">
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-spice-800 font-display text-lg font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-4 text-lg font-semibold text-leaf-900">{step.title}</p>
              <p className="mt-1 text-stone-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="rounded-[2rem] bg-spice-800 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Start with a 3-day trial</h2>
          <p className="mx-auto mt-3 max-w-xl text-spice-100">
            {formatRupees(planTotal('lean', 'trial'))} for Lean or {formatRupees(planTotal('build', 'trial'))} for Build.
            Order by {brand.orderCutoff}.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/register" variant="secondary" className="px-7 py-3.5 text-base">
              Register and order
            </ButtonLink>
            <ButtonLink to="/how-it-works" variant="ghost" className="px-7 py-3.5 text-base !text-white hover:!bg-white/10">
              <MessageCircle size={18} /> How it works
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
