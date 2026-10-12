import { ArrowRight, Bike, ChefHat, CupSoda, Dumbbell, Flame, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../ui'

const HERO_TRAYS_SRC = '/images/hero-trays.png?v=1'

const STEPS = [
  { icon: ChefHat, title: 'Cooked fresh', body: 'every morning' },
  { icon: Flame, title: 'Packed hot', body: 'sealed warm' },
  { icon: Bike, title: 'At your door', body: '8–10 am', highlight: true },
] as const

const CHIPS = [
  { icon: CupSoda, label: 'Drink included' },
  { icon: Leaf, label: 'Same price daily' },
  { icon: Dumbbell, label: 'Protein-forward' },
] as const

type Props = {
  leanPrice: string
  buildPrice: string
}

export function HeroBannerMobile({ leanPrice: _leanPrice, buildPrice: _buildPrice }: Props) {
  return (
    <section className="checks-plum relative overflow-hidden pb-11 text-center">
      <div className="relative h-[10rem] w-full overflow-hidden sm:h-[11rem]">
        <img
          src={HERO_TRAYS_SRC}
          alt="Lean veg and fruit sprout breakfast boxes"
          width={1094}
          height={360}
          decoding="async"
          fetchPriority="high"
          className="pointer-events-none absolute left-1/2 top-[44%] h-auto w-[116%] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_36px_rgb(0_0_0/0.32)]"
        />
      </div>

      <div className="px-4">
      <h1 className="mt-7 font-display text-[clamp(40px,11vw,56px)] leading-[0.92] font-black tracking-tight text-cream">
        Wake hungry.
        <span className="mt-1 block italic text-spice-800">Train fed.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-xs font-display text-base leading-snug font-medium text-cream/85">
        Protein-rich breakfasts, cooked fresh every morning and ready when you are.
      </p>

      <ButtonLink to="/register" className="home-pulse mt-7 w-full max-w-sm justify-center py-3.5 text-base">
        Start your 3-day trial <ArrowRight size={18} />
      </ButtonLink>

      <Link to="/menu" className="mt-5 inline-block text-sm font-semibold text-cream underline underline-offset-4">
        See this week&apos;s menu
      </Link>

      <div className="mx-auto mt-8 max-w-sm">
        <div className="flex items-center px-5">
          {STEPS.map(({ icon: Icon, ...rest }, index) => {
            const highlight = 'highlight' in rest && rest.highlight
            return (
              <div key={rest.title} className="flex min-w-0 flex-1 items-center">
                {index > 0 && (
                  <span className="h-px min-w-4 flex-1 border-t border-dashed border-cream/35" aria-hidden />
                )}
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
                    highlight ? 'bg-spice-800 text-leaf-900' : 'bg-transparent ring-1 ring-cream/35'
                  }`}
                >
                  <Icon size={20} className={highlight ? 'text-leaf-900' : 'text-spice-800'} />
                </span>
                {index < STEPS.length - 1 && (
                  <span className="h-px min-w-4 flex-1 border-t border-dashed border-cream/35" aria-hidden />
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {STEPS.map((step) => (
            <p
              key={step.title}
              className={'highlight' in step && step.highlight ? 'text-spice-800' : 'text-cream'}
            >
              <span className="block text-sm font-bold leading-tight">{step.title}</span>
              <span className="mt-0.5 block text-xs font-medium leading-snug opacity-90">{step.body}</span>
            </p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2.5 ring-1 ring-cream/20"
            >
              <Icon size={16} className="shrink-0 text-spice-800" />
              <span className="text-sm font-semibold text-cream">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  )
}
