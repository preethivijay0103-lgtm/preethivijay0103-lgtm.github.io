import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SIZES } from '../features/catalog/data'
import type { Size } from '../features/catalog/data'

type Props = {
  size: Size
}

export function MenuWeekContextBar({ size }: Props) {
  const spec = SIZES[size]

  return (
    <div className="border-b border-[#eadfd9] bg-cream px-4 py-2.5">
      <div className="flex items-center gap-3">
        <Link
          to="/menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-leaf-900 ring-1 ring-[#eadfd9]"
          aria-label="Change box"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-tight font-bold text-leaf-900">This week&apos;s menu</p>
          <p className="mt-0.5 truncate text-sm font-medium text-leaf-900/60">{spec.label} box</p>
        </div>

        <Link
          to="/menu"
          className="inline-flex shrink-0 items-center rounded-lg px-3 py-1.5 text-sm font-medium text-leaf-900 ring-1 ring-[#eadfd9]"
        >
          Change
        </Link>
      </div>
    </div>
  )
}
