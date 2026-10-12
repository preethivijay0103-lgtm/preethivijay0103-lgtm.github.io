import { Link } from 'react-router-dom'
import { SIZES, WEEK, photoFor } from '../features/catalog/data'

/** Home week preview — Strong box, sample plates (diet chosen on menu). */
const PREVIEW_SIZE = 'strong' as const
const PREVIEW_DIET = 'veg' as const

type Props = {
  className?: string
  imageClassName?: string
}

export function HomeWeekCarousel({ className = '', imageClassName }: Props) {
  const defaultImageClass =
    'aspect-[4/3] w-full rounded-[1.4rem] bg-[#f4f1ea] object-contain shadow-lg transition duration-300'

  return (
    <div
      className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
      aria-label="Swipe through this week's boxes"
    >
      {WEEK.map((day, index) => (
        <Link
          key={day.id}
          to="/menu"
          className="group relative w-52 shrink-0 snap-start sm:w-auto"
          style={{ transform: `rotate(${(index - 2) * 1.5}deg)` }}
        >
          <img
            src={photoFor(day, PREVIEW_SIZE, PREVIEW_DIET)}
            alt={`${day.name} ${SIZES[PREVIEW_SIZE].label} breakfast box`}
            className={`${defaultImageClass} ${imageClassName ?? ''} group-active:-translate-y-1 group-active:shadow-xl sm:group-hover:-translate-y-2 sm:group-hover:rotate-0 sm:group-hover:shadow-xl`}
            loading="lazy"
          />
          <div className="absolute right-2 bottom-2 left-2 rounded-2xl bg-cream/95 px-3 py-2.5">
            <p className="font-display text-sm font-semibold tracking-[0.12em] text-leaf-900 uppercase">{day.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
