import { ArrowRight, Crown, Leaf } from 'lucide-react'
import {
  LAUNCH_OFF_PERCENT,
  PRICE_PER_DAY,
  SIZES,
  formatRupees,
  salePricePerDay,
} from '../features/catalog/data'
import type { Size } from '../features/catalog/data'
import { ButtonLink } from '../ui'

const PHOTOS: Record<Size, string> = {
  lean: '/images/size-lean-box.png?v=4',
  build: '/images/size-build-box.png?v=4',
}

function Spark({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`pointer-events-none absolute ${className}`}>
      <path
        fill="currentColor"
        d="M12 0.6 13.7 9.1 22.4 10.8 13.7 12.5 12 21.2 10.3 12.5 1.6 10.8 10.3 9.1Z"
      />
    </svg>
  )
}

export function SizePickCard({ size }: { size: Size }) {
  const isBuild = size === 'build'
  const spec = SIZES[size]

  return (
    <article
      className={
        isBuild
          ? 'relative overflow-hidden rounded-[1.75rem] bg-leaf-900 p-5 text-cream shadow-[0_18px_40px_rgba(70,25,67,0.22)] sm:p-6'
          : 'relative overflow-hidden rounded-[1.75rem] border-2 border-leaf-900 bg-[#f6efe4] px-5 pt-5 pb-4 text-leaf-900 sm:px-6 sm:pt-6 sm:pb-4'
      }
    >
      {isBuild && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
          viewBox="0 0 400 320"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 210 C 80 170 140 250 220 200 S 340 150 400 190 V 320 H 0 Z" fill="#5c2a58" />
          <path d="M0 250 C 90 210 160 280 250 230 S 350 200 400 240 V 320 H 0 Z" fill="#3a1638" />
        </svg>
      )}

      <div className="relative z-10 grid grid-cols-[1.15fr_0.85fr] items-start gap-x-3 gap-y-4">
        <div className="min-w-0">
          {isBuild && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-spice-800 px-3 py-1.5 text-[10px] font-black tracking-[0.1em] text-leaf-900 uppercase">
              <Crown size={13} strokeWidth={2.5} />
              Most Popular
            </div>
          )}

          <h3
            className={`font-display font-black leading-none ${
              isBuild ? 'text-[2.35rem] text-cream sm:text-5xl' : 'text-[2.1rem] text-leaf-900 sm:text-4xl'
            }`}
          >
            {spec.label}
          </h3>

          <p
            className={`mt-3 max-w-[13.5rem] leading-snug ${
              isBuild ? 'text-[15px] text-cream/90' : 'text-sm text-ink/70'
            }`}
          >
            {spec.blurb}
          </p>

          <p
            className={`mt-3 flex items-start gap-2 ${
              isBuild ? 'text-sm font-medium text-cream/90' : 'text-sm text-leaf-900'
            }`}
          >
            <Leaf
              size={isBuild ? 20 : 18}
              strokeWidth={2.2}
              className={isBuild ? 'mt-0.5 text-spice-800' : 'mt-0.5 text-[#5a8a2a]'}
            />
            <span className="leading-snug">
              Veg & non-veg
              <br />
              same price
            </span>
          </p>

          <ButtonLink
            to="/register"
            variant={isBuild ? 'primary' : 'secondary'}
            className={
              isBuild
                ? 'mt-4 !bg-spice-800 !px-6 !py-3 !text-sm !font-black !text-leaf-900 !shadow-none hover:!bg-spice-600'
                : 'mt-4 border-2 border-leaf-900 !bg-[#f6efe4] !px-5 !py-2.5 !text-sm !font-bold !text-leaf-900 hover:!bg-leaf-900 hover:!text-spice-800'
            }
          >
            Choose {spec.label} <ArrowRight size={isBuild ? 18 : 16} strokeWidth={2.5} />
          </ButtonLink>
        </div>

        <div className="relative text-right">
          {isBuild && (
            <>
              <Spark className="top-[6.4rem] -left-1 h-4 w-4 rotate-[18deg] text-spice-800" />
              <Spark className="top-[7.2rem] -right-0.5 h-3.5 w-3.5 -rotate-[12deg] text-spice-800" />
            </>
          )}

          <span className={`block text-sm line-through ${isBuild ? 'text-cream/45' : 'text-ink/35'}`}>
            {formatRupees(PRICE_PER_DAY[size])}
          </span>
          <span
            className={`font-display mt-0.5 block font-black leading-none ${
              isBuild ? 'text-[2.6rem] text-spice-800 sm:text-5xl' : 'text-[2.15rem] text-leaf-900 sm:text-4xl'
            }`}
          >
            {formatRupees(salePricePerDay(size))}
          </span>
          <span
            className={`mt-1.5 block text-[9px] font-extrabold tracking-[0.16em] uppercase whitespace-nowrap ${
              isBuild ? 'text-cream/75' : 'text-ink/45'
            }`}
          >
            First month {LAUNCH_OFF_PERCENT}% off
          </span>

          {isBuild ? (
            <div className="mt-3 flex items-end justify-end gap-1">
              <span className="font-display text-[3.7rem] leading-[0.8] font-black text-spice-800 sm:text-6xl">
                {spec.proteinGrams}
              </span>
              <div className="pb-1 text-left">
                <span className="font-display block text-3xl leading-none font-black text-spice-800">g</span>
                <span className="mt-0.5 block text-[10px] font-black tracking-[0.12em] text-spice-800 uppercase">
                  Protein
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-1 font-display text-[1.85rem] leading-none font-black whitespace-nowrap text-leaf-900">
              {spec.proteinGrams} g{' '}
              <span className="text-xs font-extrabold tracking-[0.14em] uppercase">Protein</span>
            </p>
          )}

          <img
            src={PHOTOS[size]}
            alt={`${spec.label} breakfast box`}
            className={
              isBuild
                ? '-mt-5 -mr-2 ml-auto block h-48 w-[12.5rem] object-contain object-right sm:-mt-6 sm:h-56 sm:w-[14rem]'
                : '-mt-3 -mb-1 -mr-2 ml-auto block h-36 w-[11rem] object-contain object-right sm:h-40 sm:w-[12rem]'
            }
          />
        </div>
      </div>
    </article>
  )
}
