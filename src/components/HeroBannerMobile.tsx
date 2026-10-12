import { ArrowRight, Bike, CupSoda, Leaf, Salad } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../ui'

const HERO_TRAYS_SRC = '/images/hero-trays.png?v=1'

const PERKS = [
  { icon: CupSoda, label: 'Drink included' },
  { icon: Leaf, label: 'Same price every day' },
  { icon: Salad, label: 'Fresh every morning' },
  { icon: Bike, label: 'We deliver 8–10 am', highlight: true },
] as const

type Props = {
  leanPrice: string
  buildPrice: string
}

export function HeroBannerMobile({ leanPrice: _leanPrice, buildPrice: _buildPrice }: Props) {
  return (
    <section className="checks-plum relative overflow-hidden pb-8 text-center">
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
      <h1 className="mt-6 font-display text-[clamp(40px,11vw,56px)] leading-[0.92] font-black tracking-tight text-cream">
        Wake hungry.
        <span className="mt-1 block italic text-spice-800">Train fed.</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xs font-display text-base leading-snug font-medium text-cream/85">
        Protein-rich breakfasts, cooked fresh every morning and ready when you are.
      </p>

      <ButtonLink to="/register" className="home-pulse mt-6 w-full max-w-sm justify-center py-3.5 text-base">
        Start your 3-day trial <ArrowRight size={18} />
      </ButtonLink>

      <Link to="/menu" className="mt-4 inline-block text-sm font-semibold text-cream underline underline-offset-4">
        See this week&apos;s menu
      </Link>

      <ul className="mt-6 grid grid-cols-4 gap-1.5 text-cream">
        {PERKS.map(({ icon: Icon, label, ...rest }) => {
          const highlight = 'highlight' in rest && rest.highlight
          return (
          <li key={label} className="flex flex-col items-center gap-2">
            <span
              className={`grid h-11 w-11 place-items-center rounded-full ${
                highlight ? 'bg-spice-800 text-leaf-900' : 'bg-cream/10 ring-1 ring-cream/20'
              }`}
            >
              <Icon size={18} className={highlight ? 'text-leaf-900' : 'text-spice-800'} />
            </span>
            <span className={`max-w-[5.5rem] text-[11px] leading-tight font-medium ${highlight ? 'font-extrabold text-spice-800' : ''}`}>
              {label}
            </span>
          </li>
          )
        })}
      </ul>
      </div>
    </section>
  )
}
