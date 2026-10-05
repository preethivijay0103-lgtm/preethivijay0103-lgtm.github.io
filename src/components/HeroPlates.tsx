import { Link } from 'react-router-dom'
import { LAUNCH_OFF_PERCENT } from '../features/catalog/data'

const PLATES = [
  {
    src: '/images/plates/mon-lean-veg.png',
    className: 'absolute -top-[12%] left-[2%] z-10 w-[58%] origin-center scale-110 rotate-[10deg]',
  },
  {
    src: '/images/plates/tue-lean-veg.png',
    className: 'absolute -top-[14%] left-[52%] z-20 w-[60%] origin-center scale-110 rotate-[15deg]',
  },
  {
    src: '/images/plates/wed-lean-nonveg.png',
    className: 'absolute top-[57%] left-[6%] z-10 w-[64%] origin-center scale-110 -rotate-[4deg]',
  },
  {
    src: '/images/plates/fri-lean-veg.png',
    className: 'absolute top-[64%] left-[60%] z-20 w-[62%] origin-center scale-110 -rotate-[20deg]',
  },
] as const

export function HeroPlates() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[48%]">
      {PLATES.map((plate) => (
        <img
          key={plate.src}
          src={plate.src}
          alt=""
          className={`${plate.className} object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]`}
        />
      ))}
      <Link
        to="/register"
        className="pointer-events-auto absolute top-[47%] left-[69%] z-40 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] place-items-center rounded-full bg-spice-800 text-center leading-none text-leaf-900 shadow-lg transition hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
        aria-label={`${LAUNCH_OFF_PERCENT} percent off on your order`}
      >
        <span>
          <span className="block font-display text-4xl font-black">{LAUNCH_OFF_PERCENT}%</span>
          <span className="mt-0.5 block text-[11px] font-extrabold tracking-wide">off</span>
          <span className="mt-0.5 block font-display text-sm italic font-black">on ur order</span>
        </span>
      </Link>
    </div>
  )
}
