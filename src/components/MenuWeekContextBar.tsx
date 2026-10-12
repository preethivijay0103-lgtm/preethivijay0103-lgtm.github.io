import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DIETS, SIZES } from '../features/catalog/data'
import type { Diet, Size } from '../features/catalog/data'

type Props = {
  size: Size
  diet: Diet
}

export function MenuWeekContextBar({ size, diet }: Props) {
  const spec = SIZES[size]

  return (
    <div className="border-b border-[#e8dfd6] bg-gradient-to-b from-[#fffdf8] to-[#fbf8f2] px-4 py-3">
      <div className="flex items-center gap-3">
        <Link
          to="/menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-[#54104d] shadow-[0_4px_14px_rgba(84,16,77,0.08)] ring-1 ring-[#eadfd9] transition active:scale-[0.97]"
          aria-label="Change box"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-extrabold tracking-[0.22em] text-[#54104d]/50 uppercase">This week&apos;s menu</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[#54104d] px-3 py-1 font-display text-[15px] font-black leading-none text-[#faf7f1]">
              {spec.label}
            </span>
            <span className="rounded-full bg-[#c7ec16] px-2.5 py-1 text-[11px] font-extrabold text-[#54104d]">{DIETS[diet].label}</span>
          </div>
        </div>

        <Link
          to="/menu"
          className="shrink-0 rounded-full px-2 py-1 text-[11px] font-extrabold text-[#54104d]/70 underline-offset-2 hover:text-[#54104d] hover:underline"
        >
          Change
        </Link>
      </div>
    </div>
  )
}
