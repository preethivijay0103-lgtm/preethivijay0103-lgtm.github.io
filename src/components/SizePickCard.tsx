import { ChevronRight, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { TabTransition } from './TabTransition'
import { CUSTOMIZATION_ENABLED } from '../config/customization'
import { SIZES } from '../features/catalog/data'
import type { Diet, Size } from '../features/catalog/data'
import { Toggle } from '../ui'

const COPY: Record<Size, string> = {
  core: 'A simple, balanced breakfast box for everyday mornings.',
  strong: 'More protein and a fuller portion for active mornings.',
  elite: 'Our highest-protein box with the biggest portion.',
}

const TRAY: Record<Size, Record<Diet, string>> = {
  core: {
    nonveg: '/images/size-lean-box.png?v=5',
    veg: '/images/plates/mon-lean-veg.png?v=2',
  },
  strong: {
    nonveg: '/images/size-lean-box.png?v=5',
    veg: '/images/plates/tue-lean-veg.png?v=2',
  },
  elite: {
    nonveg: '/images/size-build-box.png?v=5',
    veg: '/images/plates/fri-lean-veg.png?v=2',
  },
}

const THEME: Record<
  Size,
  {
    card: string
    spark: string
  }
> = {
  core: {
    card: 'border-2 border-[#c7ec16]/75 bg-[#f3fae3]',
    spark: 'text-[#b5dc14]',
  },
  strong: {
    card: 'border-2 border-[#ead7a8] bg-[#fff8ea]',
    spark: 'text-[#e8b923]',
  },
  elite: {
    card: 'border-2 border-[#f3b4dc]/85 bg-[#fdf0f7]',
    spark: 'text-[#e59cc9]',
  },
}

function Spark({
  className = '',
  inline = false,
}: {
  className?: string
  inline?: boolean
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={inline ? `shrink-0 ${className}` : `pointer-events-none absolute ${className}`}
    >
      <path
        fill="currentColor"
        d="M12 0.6 13.7 9.1 22.4 10.8 13.7 12.5 12 21.2 10.3 12.5 1.6 10.8 10.3 9.1Z"
      />
    </svg>
  )
}

export function SizePickCard({
  size,
  diet,
  menuLinkWithDiet = true,
}: {
  size: Size
  diet: Diet
  /** Home / size step: link with size only; diet is chosen on the week menu. */
  menuLinkWithDiet?: boolean
}) {
  const spec = SIZES[size]
  const traySrc = TRAY[size][diet]
  const theme = THEME[size]
  const menuTo = menuLinkWithDiet ? `/menu?size=${size}&diet=${diet}` : `/menu?size=${size}`

  return (
    <article className={`relative isolate overflow-hidden rounded-[1.65rem] ${theme.card}`}>
      <Spark className={`right-[46%] top-5 z-20 h-4 w-4 rotate-[18deg] ${theme.spark}`} />
      <Spark className={`right-[51%] top-11 z-20 h-2.5 w-2.5 -rotate-[22deg] ${theme.spark}`} />
      <Spark className={`right-4 bottom-6 z-20 h-3.5 w-3.5 rotate-[8deg] ${theme.spark}`} />

      <div className="relative grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-1 pl-4 pr-2 pt-4 pb-4 sm:pl-6 sm:pr-3 sm:pt-5 sm:pb-5">
        <div className="relative z-10 min-w-0">
          <h3 className="font-display text-[2.15rem] leading-[0.95] font-black tracking-tight text-[#54104d] sm:text-[2.75rem]">
            {spec.label}
          </h3>

          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/80 py-1 pl-1 pr-2.5 text-[#54104d] ring-1 ring-[#54104d]/8">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fff6e0]">
              <Zap size={14} fill="#f5ba22" className="text-[#f5ba22]" />
            </span>
            <span className="whitespace-nowrap text-[12px] font-extrabold sm:text-sm">
              {spec.proteinGrams} g protein
            </span>
          </div>

          <p className="mt-2.5 max-w-[13.5rem] text-[13px] leading-[1.45] font-medium text-[#886985] sm:text-sm">
            {COPY[size]}
          </p>

          <Link
            to={menuTo}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-0.5 rounded-full bg-[#54104d] px-4 py-2.5 text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(84,16,77,0.22)] transition-all duration-200 hover:bg-[#6a1862] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54104d] sm:min-h-10 sm:px-4 sm:text-xs"
          >
            Go to menu
            <ChevronRight size={14} strokeWidth={2.5} className="shrink-0 text-white" />
          </Link>

          {CUSTOMIZATION_ENABLED && (
            <Link
              to={`/menu?view=custom&size=${size}&diet=${diet}`}
              className="mt-2 inline-flex min-h-9 items-center justify-center gap-0.5 rounded-full bg-[#c7ec16] px-3.5 py-2 text-[12px] font-extrabold text-[#54104d] sm:text-xs"
            >
              Build your box
              <ChevronRight size={14} strokeWidth={2.5} className="shrink-0" />
            </Link>
          )}
        </div>

        <div className="relative min-h-[9.5rem] min-w-0 self-stretch sm:min-h-[11rem]">
          <img
            key={`${size}-${diet}`}
            src={traySrc}
            alt={`${spec.label} breakfast box`}
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-[118%] max-w-none object-contain object-right drop-shadow-[0_10px_16px_rgba(74,29,72,0.12)]"
          />
        </div>
      </div>
    </article>
  )
}

export function HomeSizePicker({
  className = '',
  showDietToggle = true,
}: {
  className?: string
  /** When false, only box size is chosen; diet is set on the week menu. */
  showDietToggle?: boolean
}) {
  const [diet, setDiet] = useState<Diet>('nonveg')

  const sizes: Size[] = ['core', 'strong', 'elite']

  return (
    <section className={`bg-[#faf7f1] ${className}`}>
      <div className="px-3 pt-4 text-center sm:px-5">
        <div className="flex items-center justify-center gap-2.5">
          <Spark inline className="h-4 w-4 -rotate-[22deg] text-[#c7ec16]" />
          <h2 className="font-display text-[1.7rem] leading-none font-black tracking-tight text-[#54104d] sm:text-3xl">
            Choose your breakfast
          </h2>
          <Spark inline className="h-4 w-4 rotate-[18deg] text-[#c7ec16]" />
        </div>
        <p className="mt-2 text-[13px] font-medium text-[#886985] sm:text-sm">
          Same menu. Different portions to match your appetite.
        </p>
      </div>

      {showDietToggle ? (
        <div className="px-3 pt-3 sm:px-5">
          <Toggle
            label="Diet"
            tone="highlight"
            fill
            className="min-h-11"
            value={diet}
            onChange={setDiet}
            options={[
              { value: 'nonveg', label: 'Non-veg' },
              { value: 'veg', label: 'Veg' },
            ]}
          />
        </div>
      ) : null}

      <TabTransition
        transitionKey={diet}
        className={`flex flex-col gap-4 px-3 pb-2 sm:gap-4 sm:px-5 sm:pb-6 ${showDietToggle ? 'mt-4 sm:mt-5' : 'mt-6 sm:mt-7'}`}
      >
        {sizes.map((size) => (
          <SizePickCard
            key={size}
            size={size}
            diet={diet}
            menuLinkWithDiet={showDietToggle}
          />
        ))}
      </TabTransition>
    </section>
  )
}
